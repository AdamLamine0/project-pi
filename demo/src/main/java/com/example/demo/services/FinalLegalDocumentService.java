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
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinalLegalDocumentService {

    public static final String TEMPLATE_VERSION = "ADMIN_V4_REALISTIC";

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
                    "SARL Incorporation Closing Memorandum",
                    "Company formation file validated for registration follow-up",
                    "Legal Service - Company Formation Desk",
                    "This memorandum records the review of the incorporation file for a limited liability company and confirms that the file is ready for formal registration follow-up.",
                    "The review covered the shareholders' identity documents, proposed bylaws, registered office evidence, share capital declarations, management appointment information, and consistency of the commercial activity described in the case.",
                    "The validating expert considers the incorporation package complete for administrative filing, subject to final checks performed by the registry, tax office, and any competent public authority.",
                    "The applicant may use this memorandum to continue registration, tax identification, publication, bank account, and corporate records formalities.",
                    "This document is not a public registry extract, tax clearance, notarized deed, or substitute for signed originals. Any authority may request additional evidence before registration is finalized.",
                    List.of(
                            "The founders remain responsible for the accuracy of declared capital, registered office, activity, and beneficial ownership information.",
                            "The proposed manager must keep the signed bylaws, capital subscription evidence, lease or domiciliation document, and identity documents available for inspection.",
                            "Any material change to shareholders, activity, registered office, or share capital before registration requires an updated review."
                    )
            );
            case SUARL -> new AdministrativeTemplate(
                    "SUARL Incorporation Closing Memorandum",
                    "Single-member company formation file validated for registration follow-up",
                    "Legal Service - Company Formation Desk",
                    "This memorandum records the review of the incorporation file for a single-member limited liability company and confirms that the submitted package is coherent for filing.",
                    "The review covered the sole shareholder identity, proposed bylaws, registered office evidence, declared business activity, share capital information, and management appointment details.",
                    "The validating expert considers the file complete for the next administrative steps, subject to final acceptance by the relevant registry and public authorities.",
                    "The applicant may use this memorandum to continue registration, tax identification, bank account opening, publication, and corporate archive formalities.",
                    "This document does not replace signed bylaws, a registry decision, a tax administration response, or any official extract delivered by a public authority.",
                    List.of(
                            "The sole shareholder confirms that the information submitted for the company formation is accurate and complete.",
                            "The proposed manager must preserve signed originals and supporting evidence used for the review.",
                            "Any change to the shareholder, manager, registered office, activity, or capital before filing must be disclosed and reviewed."
                    )
            );
            case LABEL_STARTUP -> new AdministrativeTemplate(
                    "Startup Label Application Review Memorandum",
                    "Innovation eligibility file prepared for committee or authority review",
                    "Legal Service - Innovation and Startup Desk",
                    "This memorandum records the review of the Startup Label application package and confirms that the file is organized for the next evaluation stage.",
                    "The review covered founder identification, company or project information, innovation narrative, proof of concept, market positioning, submitted attachments, and consistency of the claims made in the application.",
                    "The validating expert considers the application ready to be submitted or followed up under the applicable Startup Label criteria.",
                    "The applicant may use this memorandum as an internal legal record supporting submission, follow-up with the competent authority, and preparation of complementary evidence.",
                    "This memorandum does not grant the Startup Label and does not bind the labeling authority, jury, committee, or any public administration.",
                    List.of(
                            "The applicant remains responsible for the truthfulness of innovation, market, traction, and intellectual property statements.",
                            "The file should be updated if the product, company structure, funding status, or intellectual property ownership changes before final decision.",
                            "Confidential technical or business information should only be disclosed through authorized channels and with appropriate access control."
                    )
            );
            case PI -> new AdministrativeTemplate(
                    "Intellectual Property Protection Memorandum",
                    "Evidence and filing preparation record",
                    "Legal Service - Intellectual Property Desk",
                    "This memorandum records the review of the intellectual property file and summarizes the evidence available for protection, filing, or specialized consultation.",
                    "The review covered ownership declarations, asset description, authorship or creation evidence, dates of development or disclosure, supporting files, and information relevant to the requested protection route.",
                    "The validating expert considers the file sufficiently documented to prepare the indicated intellectual property follow-up steps.",
                    "The applicant may use this memorandum to organize a trademark, copyright, patent, design, software, or confidential know-how protection process depending on the asset.",
                    "This memorandum is not a registration certificate, patentability opinion, infringement opinion, or decision by an intellectual property office.",
                    List.of(
                            "The applicant must preserve dated originals, source files, drafts, contracts, assignments, and disclosure records supporting ownership.",
                            "Public disclosure before filing may affect registrability or protection strategy and should be assessed before further publication.",
                            "Where ownership involves employees, contractors, co-founders, or partners, assignment or licensing documentation should be reviewed separately."
                    )
            );
            case FISCALITE -> new AdministrativeTemplate(
                    "Tax Assistance Review Memorandum",
                    "Administrative tax follow-up file prepared for action",
                    "Legal Service - Tax and Compliance Desk",
                    "This memorandum records the review of the submitted tax assistance file and identifies the file as ready for the requested administrative follow-up.",
                    "The review covered taxpayer identification, submitted declarations or notices, declared periods, payment or assessment evidence, supporting documents, and consistency of the information available in the case.",
                    "The validating expert considers the file usable for preparing the requested tax response, support request, rectification, regularization, or administrative follow-up.",
                    "The applicant may use this memorandum as a working record when communicating with the tax administration or preparing complementary documentation.",
                    "This memorandum is not a tax ruling, settlement, discharge, payment receipt, or binding decision from the tax administration.",
                    List.of(
                            "The taxpayer remains responsible for the accuracy of amounts, periods, declarations, invoices, and accounting information submitted.",
                            "Deadlines, penalties, interest, and procedural requirements must be verified against official notices and applicable tax rules.",
                            "Any missing accounting document, payment proof, or official notice may require additional review before submission."
                    )
            );
            case CONFORMITE -> new AdministrativeTemplate(
                    "Document Compliance Review Memorandum",
                    "Compliance file validated for the reviewed document scope",
                    "Legal Service - Compliance Desk",
                    "This memorandum records the compliance review performed on the submitted documents and confirms the result within the reviewed scope.",
                    "The review covered document presence, readability, identity consistency, apparent validity, cross-document coherence, signatures where visible, and alignment with the stated procedure requirements.",
                    "The validating expert considers the reviewed file compliant with the checklist and documentary controls applied through the platform.",
                    "The applicant may use this memorandum to continue administrative, onboarding, contractual, or internal approval processing linked to the reviewed file.",
                    "This memorandum is limited to documents submitted through the platform and does not certify facts that were not documented or independently verified.",
                    List.of(
                            "The applicant must keep original documents available if a public authority, counterparty, auditor, or internal reviewer requests them.",
                            "The review does not cover fraud, hidden alterations, expired documents not visible in the file, or information not submitted.",
                            "Any new document version or material change requires a new compliance review before reliance."
                    )
            );
            case AUTRE -> new AdministrativeTemplate(
                    "Legal Case Closing Memorandum",
                    "Legacy legal procedure file validated for follow-up",
                    "Legal Service",
                    "This memorandum records the review of a legacy legal procedure file and confirms that the submitted case was approved by the assigned expert.",
                    "The review covered submitted documents, consistency of information, applicant identification, and documentary admissibility within the available scope.",
                    "The validating expert considers the file usable for continuing the relevant legal or administrative follow-up.",
                    "The applicant may use this memorandum as a platform-generated record of expert validation.",
                    "This document is based only on information submitted by the applicant and does not replace official decisions, signed contracts, or authority-issued documents.",
                    List.of(
                            "The applicant remains responsible for the completeness and accuracy of the information provided.",
                            "Any missing, outdated, or modified information may require a new review.",
                            "Official authorities and counterparties may require additional documents or original signatures."
                    )
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
        String clauses = renderClauses(template.clauses());

        return """
                <!doctype html>
                <html lang="en">
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
                    .clauses { margin: 12px 0 0; padding-left: 0; list-style: none; counter-reset: clause; }
                    .clauses li { counter-increment: clause; display: grid; grid-template-columns: 28px 1fr; gap: 10px; margin-bottom: 11px; text-align: justify; }
                    .clauses li::before { content: counter(clause, decimal-leading-zero); font-weight: 700; color: #1d4ed8; }
                    .attestation { border: 1px solid #bfdbfe; background: #eff6ff; padding: 14px 16px; margin: 16px 0 0; }
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
                    <button class="print-button" type="button" onclick="window.print()">Print document</button>
                  </div>
                  <main class="page">
                    <header class="topline">
                      <div>
                        <div class="brand">Legal Support Platform</div>
                        <div class="authority">%s</div>
                      </div>
                      <div class="reference">
                        <div>Reference: %s</div>
                        <div>Generated: %s</div>
                        <div>Version : %s</div>
                      </div>
                    </header>

                    <h1>%s</h1>
                    <div class="subtitle">%s</div>

                    <section>
                      <div class="section-title">Case Identification</div>
                      <div class="grid">
                        <div>Entrepreneur</div><div>%s</div>
                        <div>Project / case</div><div>%s</div>
                        <div>Procedure</div><div>%s</div>
                        <div>Validation date</div><div>%s</div>
                        <div>Validating expert</div><div>%s</div>
                      </div>
                    </section>

                    <section>
                      <div class="section-title">Review Scope</div>
                      <p>%s</p>
                      <p>%s</p>
                    </section>

                    <section>
                      <div class="section-title">Expert Determination</div>
                      <div class="decision">
                        <p>%s</p>
                        <p>%s</p>
                      </div>
                    </section>

                    <section>
                      <div class="section-title">Operational Clauses</div>
                      <ol class="clauses">
                        %s
                      </ol>
                    </section>

                    <section>
                      <div class="section-title">Reliance and Reservation</div>
                      <p>%s</p>
                      <div class="attestation">
                        <p>The parties and reviewers may rely on this document only for the case identified above and only in connection with the procedure for which the file was reviewed.</p>
                      </div>
                    </section>

                    <footer class="footer">
                      <div>
                        <p>Document issued electronically on %s.</p>
                        <p class="notice">The digital signature below identifies the case, generation date, and validating expert.</p>
                      </div>
                      <div class="signature-box">
                        <div class="signature-title">%s</div>
                        <div>Validating expert</div>
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
                clauses,
                template.reservations(),
                escape(generatedAt),
                escape(expertName),
                escape(signature)
        );
    }

    private String displayProcedureName(LegalProcedure procedure) {
        return switch (procedure.getProcedureType()) {
            case SARL -> "SARL Incorporation";
            case SUARL -> "SUARL Incorporation";
            case LABEL_STARTUP -> "Label Startup";
            case PI -> "Intellectual Property";
            case FISCALITE -> "Tax Support";
            case CONFORMITE -> "Compliance";
            case AUTRE -> "Legal Procedure";
        };
    }

    private String renderClauses(List<String> clauses) {
        return clauses.stream()
                .map(clause -> "<li>" + escape(clause) + "</li>")
                .reduce("", (left, right) -> left + "\n                        " + right);
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
            return "DIGITAL SIGNATURE: SIG-" + HexFormat.of().formatHex(digest).toUpperCase();
        } catch (Exception e) {
            return "DIGITAL SIGNATURE: SIG-UNAVAILABLE";
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
            String reservations,
            List<String> clauses
    ) {
    }
}
