package org.example.userpi.service;

import org.example.userpi.model.Project;
import org.example.userpi.model.RoadmapStep;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

/**
 * Roadmap Generator Service — builds a rich, category-aware roadmap.
 * Clears existing steps and generates new ones based on project metadata.
 */
@Service
public class RoadmapGeneratorService {

    public List<RoadmapStep> generate(Project project, String userId) {
        List<RoadmapStep> steps = new ArrayList<>();
        String category = project.getCategorie() != null ? project.getCategorie().toLowerCase() : "general";
        String priority = project.getPriorite() != null ? project.getPriorite().toUpperCase() : "MEDIUM";

        long durationDays = project.getDateDebut() != null && project.getDateFin() != null
                ? ChronoUnit.DAYS.between(project.getDateDebut(), project.getDateFin())
                : 90;

        // Choose phase templates based on category
        List<String[]> phaseTemplates = selectPhaseTemplates(category, priority, durationDays);

        for (int i = 0; i < phaseTemplates.size(); i++) {
            String[] phase = phaseTemplates.get(i);
            RoadmapStep step = new RoadmapStep();
            step.setId(UUID.randomUUID().toString());
            step.setTitre(phase[0]);
            step.setDescription(phase[1]);
            step.setStatut("PENDING");
            step.setOrdre(i + 1);
            step.setParent(null);
            step.setDateCreation(LocalDateTime.now());
            step.setDateModification(LocalDateTime.now());
            step.setCreePar(userId);
            steps.add(step);
        }

        return steps;
    }

    private List<String[]> selectPhaseTemplates(String category, String priority, long durationDays) {
        // Base phases shared across all project types
        List<String[]> phases = new ArrayList<>();

        // Phase 1: Discovery & Framing
        phases.add(new String[]{
                "Discovery & Problem Framing",
                "Define the core problem, target users, and success criteria. Conduct stakeholder interviews and document requirements. Deliver a project charter and scope definition."
        });

        // Phase 2: Category-specific research/design
        if (category.contains("tech") || category.contains("software") || category.contains("digital") || category.contains("ai") || category.contains("app")) {
            phases.add(new String[]{
                    "Technical Architecture & Design",
                    "Define system architecture, technology stack, APIs, and data models. Create technical specifications and review with the engineering team."
            });
            phases.add(new String[]{
                    "MVP Development",
                    "Implement core features based on the prioritized backlog. Use iterative sprints (1–2 weeks each). Deliver a functional MVP for internal testing."
            });
            phases.add(new String[]{
                    "QA & User Testing",
                    "Conduct unit, integration, and UAT testing. Fix critical bugs and gather feedback. Validate the product meets the defined acceptance criteria."
            });
            phases.add(new String[]{
                    "Deployment & DevOps",
                    "Set up CI/CD pipeline, deploy to production environment, configure monitoring and alerts. Prepare rollback plan."
            });
        } else if (category.contains("fintech") || category.contains("finance") || category.contains("banking")) {
            phases.add(new String[]{
                    "Regulatory & Compliance Analysis",
                    "Identify applicable financial regulations (PSD2, AML, GDPR). Engage legal counsel and document compliance requirements before development begins."
            });
            phases.add(new String[]{
                    "Financial Model & Architecture",
                    "Build the revenue model, define transaction flows, and architect secure payment infrastructure."
            });
            phases.add(new String[]{
                    "Security & Risk Assessment",
                    "Conduct penetration testing, threat modeling, and implement end-to-end encryption. Define fraud detection policies."
            });
            phases.add(new String[]{
                    "Pilot Launch & Regulatory Approval",
                    "Soft-launch with a controlled user group. Submit for regulatory approval. Iterate based on feedback and compliance review."
            });
        } else if (category.contains("health") || category.contains("medical") || category.contains("biotech") || category.contains("pharma")) {
            phases.add(new String[]{
                    "Clinical & Regulatory Research",
                    "Review applicable regulations (FDA, CE marking, HIPAA). Define clinical validation requirements and engage medical advisors."
            });
            phases.add(new String[]{
                    "Prototype & Clinical Design",
                    "Develop initial prototype, define trial protocol, and assemble clinical team."
            });
            phases.add(new String[]{
                    "Pilot & Validation Study",
                    "Run a controlled pilot study. Collect and analyze clinical data. Document outcomes against success benchmarks."
            });
            phases.add(new String[]{
                    "Certification & Market Entry",
                    "Submit for certification/approval. Develop go-to-market strategy targeting healthcare providers and insurers."
            });
        } else if (category.contains("edu") || category.contains("education") || category.contains("learning") || category.contains("e-learning")) {
            phases.add(new String[]{
                    "Curriculum & Content Design",
                    "Define learning objectives, pedagogical approach, and content structure. Involve subject matter experts in curriculum development."
            });
            phases.add(new String[]{
                    "Platform & Content Development",
                    "Build or configure the e-learning platform. Develop and QA all course content (videos, quizzes, assessments)."
            });
            phases.add(new String[]{
                    "Pilot with Learners",
                    "Recruit a test cohort. Run a 4-week pilot. Collect learning outcome data and user feedback. Iterate."
            });
            phases.add(new String[]{
                    "Launch & Growth",
                    "Open enrollment, integrate marketing funnel, set up learner analytics, and establish partnerships with institutions."
            });
        } else {
            // Generic phases
            phases.add(new String[]{
                    "Research & Market Analysis",
                    "Analyze the market landscape, competitors, and customer segments. Validate assumptions with data. Produce a market opportunity report."
            });
            phases.add(new String[]{
                    "Solution Design & Prototyping",
                    "Create wireframes, prototypes, or proof-of-concepts. Validate with target users through structured feedback sessions."
            });
            phases.add(new String[]{
                    "Build & Iterate",
                    "Develop the core solution in iterative cycles. Maintain a prioritized backlog. Deliver working increments at each milestone."
            });
            phases.add(new String[]{
                    "Testing & Quality Assurance",
                    "Conduct thorough testing against acceptance criteria. Fix issues, optimize performance. Get sign-off from stakeholders."
            });
        }

        // Universal final phases
        phases.add(new String[]{
                "Go-to-Market & Launch",
                "Execute launch plan: marketing push, partner activations, PR. Track KPIs: signups, conversions, revenue (or equivalent business metrics)."
        });

        if (priority.equals("HIGH") || priority.equals("CRITICAL") || durationDays > 180) {
            phases.add(new String[]{
                    "Post-Launch Review & Scaling",
                    "Review performance against goals 30/60/90 days post-launch. Identify growth levers. Plan next phase or scaling strategy."
            });
        }

        return phases;
    }
}
