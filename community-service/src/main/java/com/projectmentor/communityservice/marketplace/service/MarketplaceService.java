package com.projectmentor.communityservice.marketplace.service;

import com.projectmentor.communityservice.marketplace.dto.ApplyDTO;
import com.projectmentor.communityservice.marketplace.dto.CreateOpportunityDTO;
import com.projectmentor.communityservice.marketplace.model.*;
import com.projectmentor.communityservice.marketplace.repository.ApplicationRepository;
import com.projectmentor.communityservice.marketplace.repository.OpportunityRepository;
import com.projectmentor.communityservice.messaging.model.ChatMessage;
import com.projectmentor.communityservice.messaging.model.MessageType;
import com.projectmentor.communityservice.messaging.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MarketplaceService {

    private static final long MAX_CV_FILE_SIZE = 10 * 1024 * 1024;

    private final OpportunityRepository opportunityRepository;
    private final ApplicationRepository applicationRepository;
    private final FileStorageService fileStorageService;
    private final QuizService quizService;
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    // ── Opportunities ──────────────────────────────

    public Opportunity createOpportunity(CreateOpportunityDTO dto) {
        Opportunity opp = Opportunity.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .publisherId(dto.getPublisherId())
                .type(OpportunityType.valueOf(dto.getType()))
                .skillsRequired(dto.getSkillsRequired())
                .sector(dto.getSector())
                .location(dto.getLocation())
                .status(OpportunityStatus.OPEN)
                .viewsCount(0)
                .applicationsCount(0)
                .positionsAvailable(dto.getPositionsAvailable() != null ? dto.getPositionsAvailable() : 1)
                .quizSentCount(0)
                .finalisedCount(0)
                .expiresAt(dto.getExpiresAt())
                .createdAt(LocalDateTime.now())
                .deleted(false)
                .build();
        return opportunityRepository.save(opp);
    }

    public Page<Opportunity> getAllOpportunities(Pageable pageable) {
        return opportunityRepository.findByDeletedFalse(pageable);
    }

    public List<Opportunity> getOpportunitiesBySector(String sector) {
        return opportunityRepository.findBySectorAndDeletedFalse(sector);
    }

    public List<Opportunity> getOpportunitiesByType(String type) {
        return opportunityRepository.findByTypeAndDeletedFalse(OpportunityType.valueOf(type));
    }

    public List<Opportunity> getMyOpportunities(String publisherId) {
        return opportunityRepository.findByPublisherIdAndDeletedFalse(publisherId);
    }

    // soft delete
    public void deleteOpportunity(String id) {
        Opportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));
        opp.setDeleted(true);
        opportunityRepository.save(opp);
    }

    // update status
    public Opportunity updateStatus(String id, String status) {
        Opportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));
        opp.setStatus(OpportunityStatus.valueOf(status));
        return opportunityRepository.save(opp);
    }

    // ── Applications ───────────────────────────────

    public OpportunityApplication apply(String opportunityId, ApplyDTO dto) {
        Opportunity opp = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));

        if (opp.getPublisherId().equals(dto.getCandidateId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vous ne pouvez pas postuler à votre propre offre");
        }
        if (applicationRepository.existsByOpportunityIdAndCandidateId(opportunityId, dto.getCandidateId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vous avez déjà postulé à cette offre");
        }

        OpportunityApplication application = OpportunityApplication.builder()
                .opportunityId(opportunityId)
                .candidateId(dto.getCandidateId())
                .cvUrl(dto.getCvUrl())
                .coverLetter(dto.getCoverLetter())
                .status(ApplicationStatus.SENT)
                .appliedAt(LocalDateTime.now())
                .build();

        // incrémenter le compteur
        opp.setApplicationsCount(opp.getApplicationsCount() + 1);
        opportunityRepository.save(opp);

        return applicationRepository.save(application);
    }

    public OpportunityApplication applyWithFile(String opportunityId, ApplyDTO dto, MultipartFile file) throws IOException {
        Opportunity opp = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));

        if (opp.getPublisherId().equals(dto.getCandidateId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vous ne pouvez pas postuler à votre propre offre");
        }
        if (applicationRepository.existsByOpportunityIdAndCandidateId(opportunityId, dto.getCandidateId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vous avez déjà postulé à cette offre");
        }
        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Seuls les CV PDF sont autorisés.");
        }
        if (file.getSize() > MAX_CV_FILE_SIZE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le fichier CV doit faire moins de 10MB.");
        }

        String fileName = fileStorageService.storeFile(file);

        OpportunityApplication application = OpportunityApplication.builder()
                .opportunityId(opportunityId)
                .candidateId(dto.getCandidateId())
                .cvUrl("/api/community/marketplace/files/cv/" + fileName)
                .coverLetter(dto.getCoverLetter())
                .status(ApplicationStatus.SENT)
                .appliedAt(LocalDateTime.now())
                .build();

        // incrémenter le compteur
        opp.setApplicationsCount(opp.getApplicationsCount() + 1);
        opportunityRepository.save(opp);

        return applicationRepository.save(application);
    }

    // dashboard candidat
    public List<OpportunityApplication> getMyApplications(String candidateId) {
        return applicationRepository.findByCandidateId(candidateId);
    }

    // dashboard publieur
    public List<OpportunityApplication> getApplicationsForOpportunity(String opportunityId) {
        return applicationRepository.findByOpportunityId(opportunityId);
    }

    // update statut candidature
    public OpportunityApplication updateApplicationStatus(String applicationId, String status) {
        OpportunityApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        ApplicationStatus newStatus = ApplicationStatus.valueOf(status.trim().toUpperCase());
        app.setStatus(newStatus);
        
        // Trigger quiz generation if application is accepted
        if (newStatus == ApplicationStatus.ACCEPTED) {
            Opportunity opportunity = opportunityRepository.findById(app.getOpportunityId())
                    .orElseThrow(() -> new RuntimeException("Opportunity not found"));
            
            try {
                quizService.generateAndSendQuiz(app, opportunity);
            } catch (Exception e) {
                log.error("Error during quizService call: {}", e.getMessage());
            }
        }
        
        return applicationRepository.save(app);
    }

    // retirer candidature
    public void withdrawApplication(String applicationId) {
        OpportunityApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(ApplicationStatus.WITHDRAWN);
        applicationRepository.save(app);
    }

    // ── Quiz Workflow ─────────────────────────────

    public List<OpportunityApplication> sendQuizToTopCandidates(String opportunityId, int count) {
        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));

        if (count <= 0) {
            count = opportunity.getPositionsAvailable() * 3;
        }

        List<OpportunityApplication> applications = applicationRepository.findByOpportunityId(opportunityId);

        applications.sort((a, b) -> {
            Double scoreA = a.getQuizScore();
            Double scoreB = b.getQuizScore();
            if (scoreA == null && scoreB == null) return 0;
            if (scoreA == null) return 1;
            if (scoreB == null) return -1;
            return scoreB.compareTo(scoreA);
        });

        List<OpportunityApplication> topCandidates = applications.stream()
                .filter(app -> app.getQuizId() == null)
                .limit(count)
                .toList();

        for (OpportunityApplication app : topCandidates) {
            app.setStatus(ApplicationStatus.ACCEPTED);
            applicationRepository.save(app);
            quizService.generateAndSendQuiz(app, opportunity);
        }

        opportunity.setQuizSentCount(opportunity.getQuizSentCount() + topCandidates.size());
        if (opportunity.getStatus() == OpportunityStatus.OPEN) {
            opportunity.setStatus(OpportunityStatus.IN_PROGRESS);
        }
        opportunityRepository.save(opportunity);

        return topCandidates;
    }

    public OpportunityApplication finaliseApplication(String applicationId) {
        OpportunityApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        Opportunity opportunity = opportunityRepository.findById(app.getOpportunityId())
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));

        app.setStatus(ApplicationStatus.INTERVIEW);
        OpportunityApplication savedApp = applicationRepository.save(app);

        opportunity.setFinalisedCount(opportunity.getFinalisedCount() + 1);

        if (opportunity.getFinalisedCount() >= opportunity.getPositionsAvailable()) {
            opportunity.setStatus(OpportunityStatus.CLOSED);
        }
        opportunityRepository.save(opportunity);

        sendCongratulationsMessage(app, opportunity);

        return savedApp;
    }

    private void sendCongratulationsMessage(OpportunityApplication app, Opportunity opportunity) {
        String messageContent = String.format(
                "Félicitations ! Votre candidature pour le poste de \"%s\" a été retenue. Nous avons le plaisir de vous informer que vous avez été sélectionné(e) pour la prochaine étape du processus de recrutement.",
                opportunity.getTitle()
        );

        ChatMessage message = ChatMessage.builder()
                .senderId("SYSTEM")
                .receiverId(app.getCandidateId())
                .content(messageContent)
                .sentAt(LocalDateTime.now())
                .read(false)
                .type(MessageType.PRIVATE)
                .build();

        ChatMessage saved = chatService.savePrivateMessage(message);
        messagingTemplate.convertAndSend(
                "/topic/user/" + app.getCandidateId(),
                saved
        );
    }

    // ── Helper Methods ─────────────────────────────

    public OpportunityApplication getApplicationById(String applicationId) {
        return applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found: " + applicationId));
    }

    public Opportunity getOpportunityByApplicationId(String applicationId) {
        OpportunityApplication application = getApplicationById(applicationId);
        return opportunityRepository.findById(application.getOpportunityId())
                .orElseThrow(() -> new RuntimeException("Opportunity not found for application: " + applicationId));
    }
}
