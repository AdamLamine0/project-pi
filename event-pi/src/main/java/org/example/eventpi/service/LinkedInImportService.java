package org.example.eventpi.service;

import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.SpeakerCandidateResponse;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Generates speaker candidate profiles locally — no external API or key required.
 *
 * <p>Profiles are assembled from domain-aware title/company/bio templates
 * combined with a pool of diverse, realistic names. The keywords are used to
 * select the most relevant professional domain (AI, Web, Security, Data, …).
 *
 * <p>The public API ({@link #searchSpeakers}) is identical to the former
 * LinkedIn/Groq implementations so no controller changes are needed.
 */
@Slf4j
@Service
public class LinkedInImportService {

    // ── Name pools ────────────────────────────────────────────────────────────

    private static final List<String[]> NAMES = List.of(
            new String[]{"Sophie", "Martin"},    new String[]{"Karim", "Benali"},
            new String[]{"Léa", "Dubois"},       new String[]{"Nadia", "Chérif"},
            new String[]{"Thomas", "Bernard"},   new String[]{"Fatima", "El Idrissi"},
            new String[]{"Lucas", "Moreau"},     new String[]{"Yasmine", "Khalil"},
            new String[]{"Hugo", "Lefebvre"},    new String[]{"Inès", "Rousseau"},
            new String[]{"Adam", "Petit"},       new String[]{"Camille", "Leroy"},
            new String[]{"Mohamed", "Diallo"},   new String[]{"Clara", "Simon"},
            new String[]{"Antoine", "Laurent"},  new String[]{"Sarah", "Nguyen"},
            new String[]{"Pierre", "Garnier"},   new String[]{"Amal", "Mansouri"},
            new String[]{"Julien", "Girard"},    new String[]{"Emma", "Mercier"}
    );

    // ── Domain definitions ────────────────────────────────────────────────────

    private record Domain(
            String[] keywords,
            String[] titles,
            String[][] companies,
            String[] bioTemplates
    ) {}

    private static final List<Domain> DOMAINS = List.of(

            new Domain(
                    new String[]{"ai", "ia", "intelligence artificielle", "machine learning",
                            "deep learning", "llm", "nlp", "neural", "gpt"},
                    new String[]{
                            "Senior AI Research Scientist",
                            "Machine Learning Engineer",
                            "Head of AI & Data Science",
                            "NLP Research Lead",
                            "Applied AI Architect",
                            "AI Product Manager"
                    },
                    new String[][]{
                            {"DeepMind", "Research lab"},
                            {"Mistral AI", "AI startup"},
                            {"Université Paris-Saclay", "Academia"},
                            {"Hugging Face", "Open-source AI"},
                            {"Capgemini", "Consulting"},
                            {"Renault AI Lab", "Automotive R&D"}
                    },
                    new String[]{
                            "%s is specialised in large language models and has contributed to several open-source NLP frameworks. They have published over 20 peer-reviewed papers on transformer architectures.",
                            "%s leads the machine-learning platform team responsible for deploying models at scale. Previously worked on computer-vision pipelines for autonomous vehicles.",
                            "%s researches ethical AI and fairness in algorithmic decision-making. They advise European regulators on AI governance frameworks.",
                            "%s is an applied AI architect helping enterprises adopt generative AI responsibly. Speaker at NeurIPS, ICML, and ICLR.",
                            "%s built the recommendation engine serving 50 M users daily. Expert in reinforcement learning and multi-armed bandit optimisation.",
                            "%s heads a team of 30 researchers focused on multilingual NLP and low-resource language models."
                    }
            ),

            new Domain(
                    new String[]{"web", "frontend", "backend", "javascript", "typescript",
                            "react", "angular", "node", "spring", "java"},
                    new String[]{
                            "Principal Frontend Engineer",
                            "Full-Stack Tech Lead",
                            "Java & Spring Boot Architect",
                            "Open-Source Web Advocate",
                            "Engineering Manager – Web Platform",
                            "DevRel Engineer"
                    },
                    new String[][]{
                            {"Google Chrome Team", "Big Tech"},
                            {"Vercel", "Infrastructure startup"},
                            {"SNCF Digital", "Enterprise"},
                            {"OVHcloud", "Cloud provider"},
                            {"Dassault Systèmes", "Enterprise software"},
                            {"Criteo", "AdTech"}
                    },
                    new String[]{
                            "%s is a core contributor to the Angular framework and author of the popular 'ng-essentials' library. Regular speaker at NgConf and AngularConnect.",
                            "%s specialises in web performance and Core Web Vitals optimisation, helping companies cut load times by 60 %%. Maintainer of several Webpack plugins.",
                            "%s is a Spring Boot expert who has designed microservice architectures for banks and insurance companies across Europe.",
                            "%s advocates for progressive web apps and web accessibility, with a focus on inclusive design for 100 M+ user products.",
                            "%s leads front-end engineering at a major e-commerce platform, overseeing the migration from monolith to micro-frontend architecture.",
                            "%s builds developer tools and creates educational content on modern JavaScript. Their YouTube channel has 200 k subscribers."
                    }
            ),

            new Domain(
                    new String[]{"data", "analytics", "bi", "dataviz", "spark",
                            "hadoop", "sql", "tableau", "power bi", "etl"},
                    new String[]{
                            "Data Engineering Lead",
                            "Principal Data Scientist",
                            "Analytics & BI Manager",
                            "Data Platform Architect",
                            "Chief Data Officer",
                            "DataOps Engineer"
                    },
                    new String[][]{
                            {"Dataiku", "Data platform"},
                            {"BNP Paribas Data Lab", "Finance"},
                            {"Ubisoft Analytics", "Gaming"},
                            {"Météo-France", "Public sector"},
                            {"Decathlon Digital", "Retail"},
                            {"Accor Hotels", "Hospitality"}
                    },
                    new String[]{
                            "%s built the real-time analytics pipeline processing 1 B events per day for a global retail group. Expert in Apache Kafka and Spark Streaming.",
                            "%s is a data scientist specialising in customer lifetime value modelling and churn prediction for subscription businesses.",
                            "%s led the implementation of a modern data lakehouse reducing report generation time from days to minutes.",
                            "%s is passionate about data storytelling and has trained 500+ analysts in effective dashboard design with Tableau and Power BI.",
                            "%s is a CDO helping organisations build data cultures and self-service analytics capabilities at scale.",
                            "%s focuses on data quality and observability, open-source contributor to Great Expectations and dbt."
                    }
            ),

            new Domain(
                    new String[]{"cloud", "devops", "kubernetes", "docker", "aws",
                            "azure", "gcp", "ci/cd", "terraform", "infra"},
                    new String[]{
                            "Cloud Solutions Architect",
                            "Senior DevOps Engineer",
                            "Platform Engineering Lead",
                            "SRE – Site Reliability Engineer",
                            "Kubernetes Specialist",
                            "Cloud Security Architect"
                    },
                    new String[][]{
                            {"AWS EMEA", "Cloud provider"},
                            {"Orange Cloud", "Telco"},
                            {"Société Générale Cloud Guild", "Finance"},
                            {"Airbus OneCloud", "Aerospace"},
                            {"Thales Group", "Defense & tech"},
                            {"Scaleway", "European cloud"}
                    },
                    new String[]{
                            "%s is an AWS Solutions Architect who has migrated 200+ enterprise workloads to the cloud. Holder of 8 AWS and CNCF certifications.",
                            "%s designed the Kubernetes-based internal developer platform adopted by 3 000 engineers across a major European bank.",
                            "%s champions GitOps and infrastructure-as-code practices, contributing to Flux CD and Terraform provider development.",
                            "%s is a site reliability engineer who reduced incident MTTR by 70 %% through chaos engineering and automated runbooks.",
                            "%s focuses on FinOps — optimising cloud costs without sacrificing reliability, saving €2 M annually for her team.",
                            "%s is a cloud-native security expert specialising in zero-trust architecture and supply-chain security for containerised workloads."
                    }
            ),

            new Domain(
                    new String[]{"cyber", "sécurité", "security", "pentest", "hacking",
                            "ctf", "soc", "réseau", "network", "cryptographie"},
                    new String[]{
                            "Offensive Security Engineer",
                            "CISO – Chief Information Security Officer",
                            "Security Researcher",
                            "Threat Intelligence Analyst",
                            "Application Security Lead",
                            "Incident Response Manager"
                    },
                    new String[][]{
                            {"ANSSI", "Gov cybersecurity agency"},
                            {"Thales Cyber Solutions", "Defense"},
                            {"Synacktiv", "Security consultancy"},
                            {"Orange Cyberdefense", "Telco security"},
                            {"HarfangLab", "EDR startup"},
                            {"Airbus CyberSecurity", "Aerospace"}
                    },
                    new String[]{
                            "%s is an ethical hacker who has found critical vulnerabilities in banking systems and government infrastructure. Frequent speaker at SSTIC and Hack.lu.",
                            "%s leads the threat-intelligence team tracking APT groups targeting critical infrastructure across Europe.",
                            "%s specialises in application security and has built SAST/DAST pipelines securing 500+ microservices.",
                            "%s is a CISO who designed the zero-trust security model adopted across a 10 000-employee enterprise.",
                            "%s researches malware reverse engineering and has published analyses of state-sponsored ransomware campaigns.",
                            "%s heads the 24/7 SOC responding to 50 000 security alerts per day using AI-assisted triage."
                    }
            ),

            // Default / generic domain
            new Domain(
                    new String[]{},   // matched as fallback
                    new String[]{
                            "Innovation Director",
                            "Technology Strategist",
                            "Engineering Manager",
                            "Product Lead",
                            "Research Scientist",
                            "Technical Evangelist"
                    },
                    new String[][]{
                            {"Capgemini", "Consulting"},
                            {"BPI France", "Public investment"},
                            {"Station F", "Startup campus"},
                            {"INRIA", "Research institute"},
                            {"La French Tech", "Ecosystem"},
                            {"EDF R&D", "Energy"}
                    },
                    new String[]{
                            "%s is an innovation director with 15 years of experience launching digital products. Mentor at Station F and advisor to 12 startups.",
                            "%s is a technology strategist who helps organisations navigate digital transformation, having led programmes in 20 countries.",
                            "%s is an engineering manager passionate about building high-performing teams and agile delivery. Speaker at Devoxx and Mix-IT.",
                            "%s is a product lead specialising in user-centred design, having shipped products used by millions across Europe.",
                            "%s is a research scientist working at the intersection of academia and industry, with publications in top-tier conferences.",
                            "%s is a technical evangelist sharing best practices through talks, workshops, and an active developer community presence."
                    }
            )
    );

    // ── Public API ────────────────────────────────────────────────────────────

    public List<SpeakerCandidateResponse> searchSpeakers(String keywords) {
        log.info("Local speaker generation for keywords='{}'", keywords);

        Domain domain = detectDomain(keywords.toLowerCase(Locale.ROOT));
        List<String[]> shuffledNames = new ArrayList<>(NAMES);
        Collections.shuffle(shuffledNames);

        List<SpeakerCandidateResponse> results = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            String[] name    = shuffledNames.get(i);
            String fullName  = name[0] + " " + name[1];
            String title     = domain.titles()[i];
            String[] company = domain.companies()[i];
            String bio       = String.format(domain.bioTemplates()[i], fullName);

            results.add(SpeakerCandidateResponse.builder()
                    .fullName(fullName)
                    .title(title)
                    .company(company[0])
                    .bio(bio)
                    .photoUrl(null)
                    .linkedinUrl(null)
                    .build());
        }
        return results;
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private Domain detectDomain(String lowerKeywords) {
        for (Domain domain : DOMAINS) {
            for (String kw : domain.keywords()) {
                if (lowerKeywords.contains(kw)) return domain;
            }
        }
        // Return the last (generic) domain as fallback
        return DOMAINS.get(DOMAINS.size() - 1);
    }
}
