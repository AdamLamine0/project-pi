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
        saveIfNotExists(ProcedureType.SARL, "CIN", "Copie de la CIN",
                "Copie de la pièce d'identité du gérant.", true);
        saveIfNotExists(ProcedureType.SARL, "STATUTS", "Statuts signés",
                "Statuts juridiques signés de la société.", true);
        saveIfNotExists(ProcedureType.SARL, "SIEGE", "Justificatif de siège",
                "Contrat de location, domiciliation ou titre de propriété.", true);
        saveIfNotExists(ProcedureType.SARL, "CAPITAL", "Attestation dépôt de capital",
                "Attestation bancaire liée au capital social.", true);

        // SUARL
        saveIfNotExists(ProcedureType.SUARL, "CIN", "Copie CIN",
                "Copie de la pièce d'identité de l'associé unique.", true);
        saveIfNotExists(ProcedureType.SUARL, "STATUTS", "Statuts",
                "Statuts signés de la SUARL.", true);
        saveIfNotExists(ProcedureType.SUARL, "SIEGE", "Justificatif de siège",
                "Contrat de location, domiciliation ou titre de propriété.", true);
        saveIfNotExists(ProcedureType.SUARL, "CAPITAL", "Attestation dépôt de capital",
                "Attestation bancaire liée au capital social.", true);

        // LABEL_STARTUP
        saveIfNotExists(ProcedureType.LABEL_STARTUP, "FORMULAIRE_LABEL", "Formulaire de demande Label",
                "Formulaire de demande du Label Startup.", true);
        saveIfNotExists(ProcedureType.LABEL_STARTUP, "PITCH_DECK", "Pitch deck",
                "Présentation du projet ou de la startup.", true);
        saveIfNotExists(ProcedureType.LABEL_STARTUP, "DEMO_PRODUIT", "Démo produit / POC",
                "Preuve de concept ou démonstration fonctionnelle.", true);
        saveIfNotExists(ProcedureType.LABEL_STARTUP, "STATUTS", "Statuts de la société",
                "Statuts si la société est déjà créée.", false);
        saveIfNotExists(ProcedureType.LABEL_STARTUP, "RNE", "Extrait RNE",
                "Extrait récent du Registre National des Entreprises.", false);

        // PI
        saveIfNotExists(ProcedureType.PI, "FORMULAIRE_DEPOT", "Formulaire de dépôt",
                "Formulaire officiel de dépôt PI.", true);
        saveIfNotExists(ProcedureType.PI, "QUITTANCE", "Quittance de paiement",
                "Preuve de paiement des frais de dépôt.", true);
        saveIfNotExists(ProcedureType.PI, "POUVOIR", "Pouvoir du mandataire",
                "À fournir si le dépôt est effectué par un mandataire.", false);
        saveIfNotExists(ProcedureType.PI, "DESCRIPTION", "Description technique",
                "Description technique ou mémoire selon le type de dépôt.", false);

        // FISCALITE
        saveIfNotExists(ProcedureType.FISCALITE, "RNE", "Extrait RNE récent",
                "Extrait récent du Registre National des Entreprises.", true);
        saveIfNotExists(ProcedureType.FISCALITE, "CIN_REPRESENTANT", "CIN du représentant légal",
                "Copie de la pièce d'identité du représentant légal.", true);
        saveIfNotExists(ProcedureType.FISCALITE, "DECLARATIONS_FISCALES", "Déclarations fiscales",
                "Déclarations ou relevés fiscaux utiles au dossier.", true);
        saveIfNotExists(ProcedureType.FISCALITE, "NOTE_EXPLICATIVE", "Note explicative",
                "Résumé du besoin ou de la demande fiscale.", true);

        // CONFORMITE
        saveIfNotExists(ProcedureType.CONFORMITE, "RNE", "Extrait RNE récent",
                "Extrait récent du Registre National des Entreprises.", true);
        saveIfNotExists(ProcedureType.CONFORMITE, "STATUTS", "Statuts à jour",
                "Version à jour des statuts.", true);
        saveIfNotExists(ProcedureType.CONFORMITE, "JUSTIFICATIFS", "Justificatifs de conformité",
                "Pièces démontrant la conformité ou les écarts.", true);
        saveIfNotExists(ProcedureType.CONFORMITE, "RAPPORT_AUDIT", "Rapport d'audit",
                "Rapport d'audit ou diagnostic si disponible.", false);

    }

    private void saveIfNotExists(ProcedureType procedureType, String code, String label, String description, boolean required) {
        if (!repository.existsByProcedureTypeAndCode(procedureType, code)) {
            repository.save(
                    ProcedureDocumentRequirement.builder()
                            .procedureType(procedureType)
                            .code(code)
                            .label(label)
                            .description(description)
                            .required(required)
                            .build()
            );
        }
    }
}
