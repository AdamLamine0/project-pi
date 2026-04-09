package org.example.partenariatpi.service;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.enums.ResponsableObjectif;
import org.example.partenariatpi.model.Convention;
import org.example.partenariatpi.model.Objectif;
import org.example.partenariatpi.repository.ConventionRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConventionPdfService {

    private final ConventionRepository conventionRepository;
    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public byte[] generateConventionPdf(Integer conventionId) {
        Convention convention = conventionRepository.findById(conventionId)
                .orElseThrow(() -> new RuntimeException("Convention not found: " + conventionId));

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document doc = new Document(pdf, PageSize.A4);
            doc.setMargins(50, 50, 50, 50);

            PdfFont bold   = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
            PdfFont normal = PdfFontFactory.createFont(StandardFonts.HELVETICA);

            // ── HEADER ──────────────────────────────────────────────────────
            Paragraph header = new Paragraph("CONVENTION DE PARTENARIAT")
                    .setFont(bold).setFontSize(20)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(ColorConstants.DARK_GRAY)
                    .setMarginBottom(4);
            doc.add(header);

            doc.add(new Paragraph(convention.getNumeroConvention())
                    .setFont(normal).setFontSize(11)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(ColorConstants.GRAY)
                    .setMarginBottom(20));

            // horizontal line
            doc.add(new LineSeparator(
                    new com.itextpdf.kernel.pdf.canvas.draw.SolidLine(1f))
                    .setMarginBottom(20));

            // ── DATES ────────────────────────────────────────────────────────
            doc.add(sectionTitle("Période de la convention", bold));
            Table datesTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .setWidth(UnitValue.createPercentValue(100))
                    .setMarginBottom(20);
            datesTable.addCell(cell("Date de début", bold));
            datesTable.addCell(cell("Date de fin", bold));
            datesTable.addCell(cell(
                    convention.getDateDebut() != null
                            ? convention.getDateDebut().format(DATE_FMT) : "—", normal));
            datesTable.addCell(cell(
                    convention.getDateFin() != null
                            ? convention.getDateFin().format(DATE_FMT) : "—", normal));
            doc.add(datesTable);

            // ── PARTIES ──────────────────────────────────────────────────────
            doc.add(sectionTitle("Les parties", bold));
            Table partiesTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .setWidth(UnitValue.createPercentValue(100))
                    .setMarginBottom(20);

            // Column headers
            partiesTable.addHeaderCell(headerCell("Porteur de projet (Utilisateur)", bold));
            partiesTable.addHeaderCell(headerCell("Organisation partenaire", bold));

            // Porteur de projet
            String porteurInfo = "ID Utilisateur : " + convention.getUserId();
            partiesTable.addCell(cell(porteurInfo, normal));

            // Organisation partenaire
            var org = convention.getOrganisationPartenaire();
            String orgInfo = org.getNom()
                    + "\nType : " + (org.getType() != null ? org.getType().name() : "—")
                    + "\nContact : " + (org.getContactNom() != null ? org.getContactNom() : "—")
                    + "\nEmail : " + (org.getContactEmail() != null ? org.getContactEmail() : "—")
                    + "\nRégion : " + (org.getRegion() != null ? org.getRegion() : "—");
            partiesTable.addCell(cell(orgInfo, normal));
            doc.add(partiesTable);

            // ── OBJECTIFS ────────────────────────────────────────────────────
            doc.add(sectionTitle("Objectifs", bold));

            List<Objectif> objectifs = convention.getObjectifs();

            if (objectifs == null || objectifs.isEmpty()) {
                doc.add(new Paragraph("Aucun objectif défini pour cette convention.")
                        .setFont(normal).setFontSize(10).setFontColor(ColorConstants.GRAY)
                        .setMarginBottom(20));
            } else {
                // Porteur de projet objectifs
                addObjectifsTable(doc, objectifs, ResponsableObjectif.USER,
                        "Objectifs du Porteur de projet", bold, normal);

                // Organisation partenaire objectifs
                addObjectifsTable(doc, objectifs, ResponsableObjectif.PARTENAIRE,
                        "Objectifs de l'Organisation partenaire", bold, normal);

                // Shared objectifs
                addObjectifsTable(doc, objectifs, ResponsableObjectif.LES_DEUX,
                        "Objectifs communs (Les deux parties)", bold, normal);
            }

            // ── SIGNATURES ───────────────────────────────────────────────────
            doc.add(new LineSeparator(
                    new com.itextpdf.kernel.pdf.canvas.draw.SolidLine(1f))
                    .setMarginTop(20).setMarginBottom(20));

            doc.add(sectionTitle("Signatures", bold));

            Table sigTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .setWidth(UnitValue.createPercentValue(100))
                    .setMarginBottom(20);

            sigTable.addCell(signatureCellWithImage(
                    "Porteur de projet",
                    convention.getSignatureUser(),
                    bold, normal));

            sigTable.addCell(signatureCellWithImage(
                    org.getNom() + (org.getContactNom() != null ? " — " + org.getContactNom() : ""),
                    convention.getSignaturePartenaire(),
                    bold, normal));

            doc.add(sigTable);

            if (convention.getSignedAt() != null) {
                doc.add(new Paragraph("Signé le : " + convention.getSignedAt().format(DATE_FMT))
                        .setFont(normal).setFontSize(9)
                        .setFontColor(ColorConstants.GRAY)
                        .setTextAlignment(TextAlignment.CENTER));
            }

            doc.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du PDF : " + e.getMessage(), e);
        }
    }

    // ── HELPERS ──────────────────────────────────────────────────────────────

    private void addObjectifsTable(Document doc,
                                   List<Objectif> all,
                                   ResponsableObjectif responsable,
                                   String sectionLabel,
                                   PdfFont bold,
                                   PdfFont normal) {
        List<Objectif> filtered = all.stream()
                .filter(o -> o.getResponsable() == responsable)
                .toList();

        if (filtered.isEmpty()) return;

        doc.add(new Paragraph(sectionLabel)
                .setFont(bold).setFontSize(11)
                .setFontColor(ColorConstants.DARK_GRAY)
                .setMarginTop(10).setMarginBottom(6));

        Table table = new Table(UnitValue.createPercentArray(new float[]{2, 3, 2, 1.5f}))
                .setWidth(UnitValue.createPercentValue(100))
                .setMarginBottom(14);

        // Headers
        table.addHeaderCell(headerCell("Titre", bold));
        table.addHeaderCell(headerCell("Description", bold));
        table.addHeaderCell(headerCell("Échéance", bold));
        table.addHeaderCell(headerCell("Statut", bold));

        for (Objectif o : filtered) {
            table.addCell(cell(o.getTitre() != null ? o.getTitre() : "—", normal));
            table.addCell(cell(o.getDescription() != null ? o.getDescription() : "—", normal));
            table.addCell(cell(
                    o.getDateEcheance() != null
                            ? o.getDateEcheance().format(DATE_FMT) : "—", normal));
            table.addCell(cell(
                    o.getStatut() != null ? o.getStatut().name() : "—", normal));
        }

        doc.add(table);
    }

    private Paragraph sectionTitle(String text, PdfFont bold) {
        return new Paragraph(text)
                .setFont(bold).setFontSize(13)
                .setFontColor(ColorConstants.DARK_GRAY)
                .setMarginBottom(8)
                .setMarginTop(10);
    }

    private Cell cell(String text, PdfFont font) {
        return new Cell().add(new Paragraph(text)
                        .setFont(font).setFontSize(9))
                .setPadding(6);
    }

    private Cell headerCell(String text, PdfFont bold) {
        return new Cell().add(new Paragraph(text)
                        .setFont(bold).setFontSize(9))
                .setBackgroundColor(new com.itextpdf.kernel.colors.DeviceRgb(230, 230, 250))
                .setPadding(6);
    }

    private Cell signatureCellWithImage(String party, String signatureBase64,
                                        PdfFont bold, PdfFont normal) {
        Cell cell = new Cell().setPadding(12).setMinHeight(100);
        cell.add(new Paragraph(party).setFont(bold).setFontSize(9).setMarginBottom(6));

        if (signatureBase64 != null && !signatureBase64.isBlank()) {
            try {
                String base64Data = signatureBase64.contains(",")
                        ? signatureBase64.split(",")[1]
                        : signatureBase64;
                byte[] imageBytes = java.util.Base64.getDecoder().decode(base64Data);
                com.itextpdf.io.image.ImageData imageData =
                        com.itextpdf.io.image.ImageDataFactory.create(imageBytes);
                com.itextpdf.layout.element.Image sigImage =
                        new com.itextpdf.layout.element.Image(imageData)
                                .setMaxWidth(180).setMaxHeight(70);
                cell.add(sigImage);
            } catch (Exception e) {
                cell.add(new Paragraph("_______________________")
                        .setFont(normal).setFontSize(9));
            }
        } else {
            cell.add(new Paragraph("\n\n_______________________")
                    .setFont(normal).setFontSize(9));
        }
        return cell;
    }
}