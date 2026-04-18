package com.projectmentor.communityservice.marketplace.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectmentor.communityservice.marketplace.model.Opportunity;
import com.projectmentor.communityservice.marketplace.model.OpportunityApplication;
import com.projectmentor.communityservice.marketplace.model.Quiz;
import com.projectmentor.communityservice.marketplace.model.QuizQuestion;
import com.projectmentor.communityservice.marketplace.repository.ApplicationRepository;
import com.projectmentor.communityservice.marketplace.repository.QuizRepository;
import com.projectmentor.communityservice.messaging.model.ChatMessage;
import com.projectmentor.communityservice.messaging.model.MessageType;
import com.projectmentor.communityservice.messaging.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuizService {

    private final QuizRepository quizRepository;
    private final GroqService groqService;
    private final ApplicationRepository applicationRepository;
    private final ChatService chatService;
    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @org.springframework.scheduling.annotation.Async
    public void generateAndSendQuiz(OpportunityApplication application, Opportunity opportunity) {
        try {
            String quizJson = groqService.generateQuizJson(
                opportunity.getTitle(),
                opportunity.getDescription(),
                opportunity.getSkillsRequired()
            );

            if (quizJson != null && !quizJson.isBlank()) {
                List<QuizQuestion> questions = objectMapper.readValue(quizJson, new TypeReference<List<QuizQuestion>>() {});
                
                Quiz quiz = Quiz.builder()
                        .opportunityId(opportunity.getId())
                        .applicationId(application.getId())
                        .candidateId(application.getCandidateId())
                        .questions(questions)
                        .createdAt(LocalDateTime.now())
                        .completed(false)
                        .build();

                Quiz savedQuiz = quizRepository.save(quiz);
                
                application.setQuizId(savedQuiz.getId());
                applicationRepository.save(application);
                
                sendQuizLinkToCandidate(application, savedQuiz.getId());
            }
        } catch (Exception e) {
            log.error("Error in generateAndSendQuiz for application {}", application.getId(), e);
        }
    }

    private void sendQuizLinkToCandidate(OpportunityApplication application, String quizId) {
        String quizLink = "/community/marketplace/quiz/" + quizId;
        String messageContent = String.format(
            "Félicitations ! Votre candidature a été acceptée. Veuillez compléter ce quiz technique pour continuer : CLIQUEZ ICI %s",
            quizLink
        );

        ChatMessage message = ChatMessage.builder()
                .senderId("SYSTEM")
                .receiverId(application.getCandidateId())
                .content(messageContent)
                .sentAt(LocalDateTime.now())
                .read(false)
                .type(MessageType.PRIVATE)
                .build();

        ChatMessage saved = chatService.savePrivateMessage(message);
        
        // WebSocket push notification
        messagingTemplate.convertAndSend(
                "/topic/user/" + application.getCandidateId(),
                saved
        );
    }

    public Quiz getQuiz(String quizId) {
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found: " + quizId));
    }

    public Quiz submitQuiz(String quizId, List<Integer> answers) {
        Quiz quiz = getQuiz(quizId);
        if (quiz.isCompleted()) {
            throw new RuntimeException("Quiz already completed");
        }

        List<QuizQuestion> questions = quiz.getQuestions();
        if (answers.size() != questions.size()) {
            throw new RuntimeException("Invalid number of answers");
        }

        int correctCount = 0;
        for (int i = 0; i < questions.size(); i++) {
            QuizQuestion question = questions.get(i);
            Integer candidateAnswer = answers.get(i);
            question.setCandidateAnswerIndex(candidateAnswer);
            if (candidateAnswer != null && candidateAnswer.equals(question.getCorrectAnswerIndex())) {
                correctCount++;
            }
        }

        double score = (double) correctCount / questions.size() * 100.0;
        quiz.setScore(score);
        quiz.setCompleted(true);
        quiz.setCompletedAt(LocalDateTime.now());

        Quiz savedQuiz = quizRepository.save(quiz);

        // Update application with score
        OpportunityApplication application = applicationRepository.findById(quiz.getApplicationId())
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setQuizScore(score);
        applicationRepository.save(application);

        return savedQuiz;
    }
}
