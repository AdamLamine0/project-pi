package com.example.demo.config;

import com.example.demo.entity.ProcedureDocumentRequirement;
import com.example.demo.enums.ProcedureType;
import com.example.demo.repository.ProcedureDocumentRequirementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProcedureDocumentRequirementRepository repository;

    @Override
    public void run(String... args) {

        // SARL
        saveOrUpdate(ProcedureType.SARL, "CIN", "National ID copy",
                "Copy of the manager's national identity document.", true);
        saveOrUpdate(ProcedureType.SARL, "STATUTS", "Signed bylaws",
                "Signed legal bylaws of the company.", true);
        saveOrUpdate(ProcedureType.SARL, "SIEGE", "Registered office proof",
                "Lease agreement, domiciliation certificate, or ownership title.", true);
        saveOrUpdate(ProcedureType.SARL, "CAPITAL", "Capital deposit certificate",
                "Bank certificate related to the share capital.", true);

        // SUARL
        saveOrUpdate(ProcedureType.SUARL, "CIN", "National ID copy",
                "Copy of the sole shareholder's national identity document.", true);
        saveOrUpdate(ProcedureType.SUARL, "STATUTS", "Bylaws",
                "Signed SUARL bylaws.", true);
        saveOrUpdate(ProcedureType.SUARL, "SIEGE", "Registered office proof",
                "Lease agreement, domiciliation certificate, or ownership title.", true);
        saveOrUpdate(ProcedureType.SUARL, "CAPITAL", "Capital deposit certificate",
                "Bank certificate related to the share capital.", true);

        // LABEL_STARTUP
        saveOrUpdate(ProcedureType.LABEL_STARTUP, "FORMULAIRE_LABEL", "Startup Label application form",
                "Official Startup Label application form.", true);
        saveOrUpdate(ProcedureType.LABEL_STARTUP, "PITCH_DECK", "Pitch deck",
                "Project or startup presentation deck.", true);
        saveOrUpdate(ProcedureType.LABEL_STARTUP, "DEMO_PRODUIT", "Product demo / POC",
                "Proof of concept or functional product demonstration.", true);
        saveOrUpdate(ProcedureType.LABEL_STARTUP, "STATUTS", "Company bylaws",
                "Bylaws if the company has already been incorporated.", false);
        saveOrUpdate(ProcedureType.LABEL_STARTUP, "RNE", "RNE extract",
                "Recent extract from the National Business Register.", false);

        // Intellectual property
        saveOrUpdate(ProcedureType.PI, "FORMULAIRE_DEPOT", "Filing form",
                "Official intellectual property filing form.", true);
        saveOrUpdate(ProcedureType.PI, "QUITTANCE", "Payment receipt",
                "Proof of payment of the filing fees.", true);
        saveOrUpdate(ProcedureType.PI, "POUVOIR", "Representative power of attorney",
                "Required if the filing is handled by a representative.", false);
        saveOrUpdate(ProcedureType.PI, "DESCRIPTION", "Technical description",
                "Technical description or memorandum depending on the filing type.", false);

        // Tax support
        saveOrUpdate(ProcedureType.FISCALITE, "RNE", "Recent RNE extract",
                "Recent extract from the National Business Register.", true);
        saveOrUpdate(ProcedureType.FISCALITE, "CIN_REPRESENTANT", "Legal representative ID",
                "Copy of the legal representative's identity document.", true);
        saveOrUpdate(ProcedureType.FISCALITE, "DECLARATIONS_FISCALES", "Tax declarations",
                "Tax declarations or statements relevant to the case.", true);
        saveOrUpdate(ProcedureType.FISCALITE, "NOTE_EXPLICATIVE", "Explanatory note",
                "Summary of the tax need or request.", true);

        // Compliance
        saveOrUpdate(ProcedureType.CONFORMITE, "RNE", "Recent RNE extract",
                "Recent extract from the National Business Register.", true);
        saveOrUpdate(ProcedureType.CONFORMITE, "STATUTS", "Updated bylaws",
                "Current version of the company bylaws.", true);
        saveOrUpdate(ProcedureType.CONFORMITE, "JUSTIFICATIFS", "Compliance supporting documents",
                "Documents proving compliance or explaining identified gaps.", true);
        saveOrUpdate(ProcedureType.CONFORMITE, "RAPPORT_AUDIT", "Audit report",
                "Audit report or diagnostic document, if available.", false);
    }

    private void saveOrUpdate(ProcedureType procedureType, String code, String label, String description, boolean required) {
        ProcedureDocumentRequirement requirement = repository
                .findByProcedureTypeAndCode(procedureType, code)
                .orElseGet(() -> ProcedureDocumentRequirement.builder()
                        .procedureType(procedureType)
                        .code(code)
                        .build());

        requirement.setLabel(label);
        requirement.setDescription(description);
        requirement.setRequired(required);
        repository.save(requirement);
    }
}
