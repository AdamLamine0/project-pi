package com.example.demo.services;

import com.example.demo.entity.LegalProcedure;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
public class FinalLegalDocumentService {

    public static final String TEMPLATE_VERSION = "ADMIN_V3_PRINT";

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    private final FileStorageService fileStorageService;
    private final UserDirectoryService userDirectoryService;

    public String generate(LegalProcedure procedure) {
        String entrepreneurName = userDirectoryService.fullName(procedure.getEntrepreneurId());
        String expertName = userDirectoryService.fullName(procedure.getExpertId());
        LocalDateTime now = LocalDateTime.now();
        String generatedAt = now.format(DATE_TIME_FORMAT);
        String documentNumber = documentNumber(procedure);
        AdministrativeTemplate template = templateFor(procedure);
        String signature = signature(procedure, entrepreneurName, expertName, generatedAt, documentNumber);

        String html = render(procedure, template, entrepreneurName, expertName, generatedAt, documentNumber, signature);
        return fileStorageService.storeGenerated(
                "document-final-" + procedure.getProcedureType().name().toLowerCase(),
                ".html",
                html.getBytes(StandardCharsets.UTF_8)
        );
    }

    private AdministrativeTemplate templateFor(LegalProcedure procedure) {
        return switch (procedure.getProcedureType()) {
            case SARL -> new AdministrativeTemplate(
                    "Attestation de constitution - Societe a Responsabilite Limitee",
                    "Constitution d'une SARL",
                    "Service juridique - Formalites des societes",
                    "Atteste que le dossier de constitution de la SARL a ete examine et juge complet au regard des pieces transmises.",
                    "Le controle a porte notamment sur l'identification du fondateur, les statuts, le siege social, le capital social et les elements de gouvernance declares.",
                    "En consequence, le dossier est declare recevable sur le plan documentaire par l'expert validateur.",
                    "Sous reserve des controles effectues par les administrations competentes, le dossier peut etre utilise pour la poursuite des formalites de creation, d'immatriculation et de depot administratif.",
                    "La presente attestation ne se substitue pas aux actes originaux, aux decisions de l'administration fiscale ou du registre competent."
            );
            case SUARL -> new AdministrativeTemplate(
                    "Attestation de constitution - Societe Unipersonnelle a Responsabilite Limitee",
                    "Constitution d'une SUARL",
                    "Service juridique - Formalites des societes",
                    "Atteste que le dossier de constitution de la SUARL a ete examine et juge complet au regard des pieces transmises.",
                    "Le controle a porte notamment sur l'identite de l'associe unique, les statuts, le siege social, le capital social et les declarations obligatoires.",
                    "En consequence, le dossier est declare recevable sur le plan documentaire par l'expert validateur.",
                    "Sous reserve des controles effectues par les administrations competentes, le dossier peut etre utilise pour la poursuite des formalites de creation, d'immatriculation et de depot administratif.",
                    "La presente attestation ne se substitue pas aux actes originaux, aux decisions de l'administration fiscale ou du registre competent."
            );
            case LABEL_STARTUP -> new AdministrativeTemplate(
                    "Attestation de dossier Label Startup",
                    "Demande de Label Startup",
                    "Service juridique - Innovation et accompagnement",
                    "Atteste que le dossier de demande de Label Startup a ete controle et valide par l'expert assigne.",
                    "Le controle a porte notamment sur le formulaire de demande, la presentation du projet, la preuve de concept, les documents d'identification et les pieces justificatives requises.",
                    "En consequence, le dossier est declare recevable pour la phase administrative suivante de la procedure Label Startup.",
                    "Le dossier peut etre transmis pour la poursuite de la procedure de labellisation selon les criteres applicables.",
                    "La presente attestation confirme la recevabilite documentaire du dossier et ne vaut pas decision definitive de l'autorite de labellisation."
            );
            case PI -> new AdministrativeTemplate(
                    "Attestation de synthese - Propriete Intellectuelle",
                    "Accompagnement en propriete intellectuelle",
                    "Service juridique - Propriete intellectuelle",
                    "Atteste que les elements transmis pour la procedure de propriete intellectuelle ont ete examines et consolides.",
                    "Le controle a porte notamment sur l'identification du porteur de projet, la description de l'actif, les preuves disponibles, les supports transmis et les informations utiles a la protection.",
                    "En consequence, le dossier est declare exploitable pour la preparation des demarches de protection indiquees.",
                    "Le dossier peut servir de base a la preparation d'un depot, d'une declaration ou d'une consultation specialisee selon la nature de l'actif protege.",
                    "La presente synthese ne remplace pas l'avis d'un conseil specialise ni la decision d'un office de propriete intellectuelle."
            );
            case FISCALITE -> new AdministrativeTemplate(
                    "Attestation de synthese fiscale",
                    "Assistance et suivi fiscal",
                    "Service juridique - Fiscalite et conformite",
                    "Atteste que le dossier fiscal transmis a ete examine et que les pieces utiles a l'analyse administrative ont ete consolidees.",
                    "Le controle a porte notamment sur l'identification du demandeur, les documents fiscaux transmis, la coherence des informations declarees et les justificatifs disponibles.",
                    "En consequence, le dossier est declare exploitable pour la preparation du traitement fiscal demande.",
                    "Le dossier peut etre utilise pour la preparation d'une demarche fiscale, d'une demande d'assistance ou d'un suivi administratif.",
                    "La presente synthese ne constitue pas une decision fiscale opposable et ne remplace pas les notifications de l'administration competente."
            );
            case CONFORMITE -> new AdministrativeTemplate(
                    "Attestation de verification de conformite",
                    "Controle de conformite documentaire",
                    "Service juridique - Controle et conformite",
                    "Atteste que les documents transmis ont ete verifies dans le cadre d'un controle de conformite documentaire.",
                    "Le controle a porte notamment sur la presence des pieces requises, la lisibilite des documents, la coherence des informations et la validite apparente des elements fournis.",
                    "En consequence, le dossier est declare conforme aux exigences documentaires controlees par l'expert validateur.",
                    "Le dossier est considere exploitable pour la poursuite du traitement administratif ou contractuel concerne.",
                    "La presente attestation est etablie sur la base des documents communiques et ne couvre pas les faits non declares ou non documentes."
            );
            case AUTRE -> new AdministrativeTemplate(
                    "Document juridique final",
                    "Procedure juridique",
                    "Service juridique",
                    "Atteste que le dossier transmis a ete examine et valide par l'expert assigne.",
                    "Le controle a porte sur les pieces communiquees, la coherence des informations et la recevabilite documentaire du dossier.",
                    "En consequence, le dossier est declare recevable pour la poursuite de la procedure concernee.",
                    "Le dossier peut etre utilise pour la poursuite de la procedure concernee.",
                    "Le present document est etabli sur la base des informations transmises par le demandeur."
            );
        };
    }

    private String render(
            LegalProcedure procedure,
            AdministrativeTemplate template,
            String entrepreneurName,
            String expertName,
            String generatedAt,
            String documentNumber,
            String signature
    ) {
        String validationDate = procedure.getCompletedAt() == null
                ? LocalDate.now().format(DATE_FORMAT)
                : procedure.getCompletedAt().format(DATE_FORMAT);

        return """
                <!doctype html>
                <html lang="fr">
                <head>
                  <meta charset="utf-8">
                  <title>%s</title>
                  <style>
                    * { box-sizing: border-box; }
                    body { margin: 0; background: #eef2f7; color: #111827; font-family: Arial, Helvetica, sans-serif; line-height: 1.55; }
                    .print-toolbar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: center; padding: 14px; background: rgba(238, 242, 247, .94); border-bottom: 1px solid #d1d5db; }
                    .print-button { border: 0; border-radius: 6px; padding: 10px 18px; background: #111827; color: #fff; font-weight: 700; cursor: pointer; }
                    .print-button:hover { background: #374151; }
                    .page { width: 210mm; min-height: 297mm; margin: 24px auto; padding: 24mm 22mm; background: #fff; box-shadow: 0 10px 30px rgba(15, 23, 42, .12); }
                    .topline { display: flex; justify-content: space-between; gap: 24px; border-bottom: 2px solid #111827; padding-bottom: 18px; margin-bottom: 28px; }
                    .brand { text-transform: uppercase; font-size: 13px; font-weight: 700; letter-spacing: .04em; }
                    .authority { margin-top: 6px; color: #4b5563; font-size: 13px; }
                    .reference { text-align: right; font-size: 12px; color: #4b5563; }
                    h1 { margin: 34px 0 8px; text-align: center; font-size: 25px; text-transform: uppercase; letter-spacing: .03em; }
                    .subtitle { text-align: center; color: #374151; margin-bottom: 32px; font-weight: 700; }
                    .section-title { margin: 28px 0 10px; font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #d1d5db; padding-bottom: 6px; }
                    .grid { display: grid; grid-template-columns: 70mm 1fr; border: 1px solid #d1d5db; margin: 18px 0 24px; }
                    .grid div { padding: 9px 12px; border-bottom: 1px solid #e5e7eb; }
                    .grid div:nth-child(odd) { background: #f9fafb; font-weight: 700; color: #374151; border-right: 1px solid #e5e7eb; }
                    .grid div:nth-last-child(-n+2) { border-bottom: 0; }
                    p { margin: 0 0 13px; text-align: justify; }
                    .decision { border-left: 4px solid #2563eb; padding: 14px 16px; background: #f8fafc; margin-top: 12px; }
                    .footer { margin-top: 42px; display: grid; grid-template-columns: 1fr 70mm; gap: 24px; align-items: end; }
                    .signature-box { border-top: 1px solid #111827; padding-top: 10px; text-align: center; }
                    .signature-title { font-weight: 700; }
                    .hash { margin-top: 18px; padding: 10px; border: 1px solid #d1d5db; background: #f9fafb; font-family: Consolas, monospace; font-size: 11px; word-break: break-all; }
                    .notice { color: #4b5563; font-size: 12px; margin-top: 16px; }
                    @page { size: A4; margin: 0; }
                    @media print {
                      body { background: #fff; }
                      .print-toolbar { display: none; }
                      .page { width: auto; min-height: auto; margin: 0; box-shadow: none; }
                    }
                  </style>
                </head>
                <body>
                  <div class="print-toolbar">
                    <button class="print-button" type="button" onclick="window.print()">Imprimer le document</button>
                  </div>
                  <main class="page">
                    <header class="topline">
                      <div>
                        <div class="brand">Plateforme d'accompagnement juridique</div>
                        <div class="authority">%s</div>
                      </div>
                      <div class="reference">
                        <div>Reference : %s</div>
                        <div>Generation : %s</div>
                        <div>Version : %s</div>
                      </div>
                    </header>

                    <h1>%s</h1>
                    <div class="subtitle">%s</div>

                    <section>
                      <div class="section-title">Identification du dossier</div>
                      <div class="grid">
                        <div>Entrepreneur</div><div>%s</div>
                        <div>Projet / dossier</div><div>%s</div>
                        <div>Procedure</div><div>%s</div>
                        <div>Date de validation</div><div>%s</div>
                        <div>Expert validateur</div><div>%s</div>
                      </div>
                    </section>

                    <section>
                      <div class="section-title">Constatations</div>
                      <p>%s</p>
                      <p>%s</p>
                    </section>

                    <section>
                      <div class="section-title">Decision administrative</div>
                      <div class="decision">
                        <p>%s</p>
                        <p>%s</p>
                      </div>
                    </section>

                    <section>
                      <div class="section-title">Reserve et portee</div>
                      <p>%s</p>
                    </section>

                    <footer class="footer">
                      <div>
                        <p>Document etabli electroniquement le %s.</p>
                        <p class="notice">La signature numerique ci-dessous permet d'identifier le dossier, la date de generation et l'expert validateur.</p>
                      </div>
                      <div class="signature-box">
                        <div class="signature-title">%s</div>
                        <div>Expert validateur</div>
                      </div>
                    </footer>

                    <div class="hash">%s</div>
                  </main>
                </body>
                </html>
                """.formatted(
                template.title(),
                template.authority(),
                escape(documentNumber),
                escape(generatedAt),
                TEMPLATE_VERSION,
                template.title(),
                template.subtitle(),
                escape(entrepreneurName),
                escape(procedure.getProjectName()),
                escape(displayProcedureName(procedure)),
                escape(validationDate),
                escape(expertName),
                template.certification(),
                template.legalBasis(),
                template.decision(),
                template.effects(),
                template.reservations(),
                escape(generatedAt),
                escape(expertName),
                escape(signature)
        );
    }

    private String displayProcedureName(LegalProcedure procedure) {
        return switch (procedure.getProcedureType()) {
            case SARL -> "Constitution SARL";
            case SUARL -> "Constitution SUARL";
            case LABEL_STARTUP -> "Label Startup";
            case PI -> "Propriete intellectuelle";
            case FISCALITE -> "Fiscalite";
            case CONFORMITE -> "Conformite";
            case AUTRE -> "Autre procedure juridique";
        };
    }

    private String documentNumber(LegalProcedure procedure) {
        String idPart = procedure.getId() == null
                ? "SANSID"
                : procedure.getId().toString().substring(0, 8).toUpperCase();
        return "DOC-" + procedure.getProcedureType().name() + "-" + idPart;
    }

    private String signature(
            LegalProcedure procedure,
            String entrepreneurName,
            String expertName,
            String generatedAt,
            String documentNumber
    ) {
        try {
            String value = TEMPLATE_VERSION + "|" + documentNumber + "|" + procedure.getId() + "|"
                    + entrepreneurName + "|" + procedure.getProjectName() + "|" + expertName + "|" + generatedAt;
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8));
            return "SIGNATURE NUMERIQUE : SIG-" + HexFormat.of().formatHex(digest).toUpperCase();
        } catch (Exception e) {
            return "SIGNATURE NUMERIQUE : SIG-NON-DISPONIBLE";
        }
    }

    private String escape(String value) {
        if (value == null) {
            return "";
        }
        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;");
    }

    private record AdministrativeTemplate(
            String title,
            String subtitle,
            String authority,
            String certification,
            String legalBasis,
            String decision,
            String effects,
            String reservations
    ) {
    }
}
