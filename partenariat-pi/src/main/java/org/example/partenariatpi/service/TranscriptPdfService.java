package org.example.partenariatpi.service;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.partenariatpi.model.TranscriptLine;
import org.example.partenariatpi.repository.TranscriptRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TranscriptPdfService {

    private final TranscriptRepository transcriptRepository;

    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    // One colour per speaker label — cycles if there are more than 5
    private static final List<DeviceRgb> SPEAKER_COLORS = List.of(
            new DeviceRgb(41, 98, 255),   // blue
            new DeviceRgb(0, 150, 136),   // teal
            new DeviceRgb(156, 39, 176),  // purple
            new DeviceRgb(230, 81, 0),    // orange
            new DeviceRgb(21, 101, 192)   // dark-blue
    );

    /**
     * Generate a PDF byte array for a given meeting's transcript.
     *
     * @param meetingId  Zoom meeting ID (same key used in TranscriptLine)
     * @param meetingTitle  Human-readable title for the header (e.g. subject field from MeetingInvitation)
     * @param participant1  Name of the first participant
     * @param participant2  Name of the second participant
     */
    public byte[] generateTranscriptPdf(
            String meetingId,
            String meetingTitle,
            String participant1,
            String participant2
    ) {
        List<TranscriptLine> lines =
                transcriptRepository.findByMeetingIdOrderByStartTimestampAsc(meetingId);

        if (lines.isEmpty()) {
            throw new RuntimeException("No transcript found for meeting: " + meetingId);
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            PdfWriter writer   = new PdfWriter(baos);
            PdfDocument pdf    = new PdfDocument(writer);
            Document    doc    = new Document(pdf, PageSize.A4);
            doc.setMargins(50, 50, 50, 50);

            PdfFont bold   = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
            PdfFont normal = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            PdfFont italic = PdfFontFactory.createFont(StandardFonts.HELVETICA_OBLIQUE);

            // ── HEADER ─────────────────────────────────────────────────────
            doc.add(new Paragraph("MEETING TRANSCRIPT")
                    .setFont(bold).setFontSize(20)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(new DeviceRgb(33, 33, 33))
                    .setMarginBottom(4));

            doc.add(new Paragraph(meetingTitle != null ? meetingTitle : "Meeting " + meetingId)
                    .setFont(italic).setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(ColorConstants.GRAY)
                    .setMarginBottom(16));

            doc.add(new LineSeparator(new SolidLine(1f)).setMarginBottom(16));

            // ── META TABLE ─────────────────────────────────────────────────
            Table meta = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .setWidth(UnitValue.createPercentValue(100))
                    .setMarginBottom(20);

            addMetaCell(meta, "Meeting ID", meetingId, bold, normal);
            addMetaCell(meta, "Generated at", LocalDateTime.now().format(DATE_FMT), bold, normal);
            addMetaCell(meta, "Participant 1", participant1 != null ? participant1 : "—", bold, normal);
            addMetaCell(meta, "Participant 2", participant2 != null ? participant2 : "—", bold, normal);
            addMetaCell(meta, "Total segments", String.valueOf(lines.size()), bold, normal);

            double durationSec = lines.get(lines.size() - 1).getEndTimestamp();
            addMetaCell(meta, "Duration", formatTimestamp(durationSec), bold, normal);

            doc.add(meta);

            // ── SPEAKER LEGEND ─────────────────────────────────────────────
            List<String> speakers = lines.stream()
                    .map(TranscriptLine::getSpeaker)
                    .distinct().sorted().toList();

            Map<String, DeviceRgb> speakerColorMap = new LinkedHashMap<>();
            for (int i = 0; i < speakers.size(); i++) {
                speakerColorMap.put(speakers.get(i),
                        SPEAKER_COLORS.get(i % SPEAKER_COLORS.size()));
            }

            doc.add(new Paragraph("Speakers")
                    .setFont(bold).setFontSize(11)
                    .setFontColor(new DeviceRgb(33, 33, 33))
                    .setMarginBottom(6));

            Table legend = new Table(UnitValue.createPercentArray(new float[]{0.3f, 2f, 3f}))
                    .setWidth(UnitValue.createPercentValue(60))
                    .setMarginBottom(20);

            for (Map.Entry<String, DeviceRgb> entry : speakerColorMap.entrySet()) {
                // colour swatch cell
                Cell swatch = new Cell().setHeight(14).setWidth(14)
                        .setBackgroundColor(entry.getValue())
                        .setBorder(null);
                legend.addCell(swatch);
                legend.addCell(new Cell().add(new Paragraph(entry.getKey())
                        .setFont(bold).setFontSize(9)).setBorder(null).setPadding(2));
                // Map speaker label → participant name where possible
                String mapped = mapSpeakerToParticipant(entry.getKey(), speakers,
                        participant1, participant2);
                legend.addCell(new Cell().add(new Paragraph(mapped)
                        .setFont(normal).setFontSize(9)
                        .setFontColor(ColorConstants.GRAY)).setBorder(null).setPadding(2));
            }
            doc.add(legend);

            doc.add(new LineSeparator(new SolidLine(0.5f)).setMarginBottom(12));

            // ── TRANSCRIPT LINES ───────────────────────────────────────────
            doc.add(new Paragraph("Transcript")
                    .setFont(bold).setFontSize(11)
                    .setFontColor(new DeviceRgb(33, 33, 33))
                    .setMarginBottom(10));

            for (TranscriptLine line : lines) {
                DeviceRgb color = speakerColorMap.getOrDefault(
                        line.getSpeaker(), SPEAKER_COLORS.get(0));

                // Timestamp + speaker header
                String timeRange = formatTimestamp(line.getStartTimestamp())
                        + " → " + formatTimestamp(line.getEndTimestamp());

                Paragraph header = new Paragraph()
                        .add(new Text(line.getSpeaker() + "  ").setFont(bold).setFontSize(9).setFontColor(color))
                        .add(new Text(timeRange).setFont(italic).setFontSize(8)
                                .setFontColor(ColorConstants.GRAY))
                        .setMarginBottom(2).setMarginTop(8);
                doc.add(header);

                // Transcript text
                doc.add(new Paragraph(line.getText())
                        .setFont(normal).setFontSize(10)
                        .setFontColor(new DeviceRgb(33, 33, 33))
                        .setMarginBottom(2)
                        .setMarginLeft(10));
            }

            // ── FOOTER ─────────────────────────────────────────────────────
            doc.add(new LineSeparator(new SolidLine(1f)).setMarginTop(20).setMarginBottom(8));
            doc.add(new Paragraph("This transcript was generated automatically by Whisper AI + Pyannote diarization.")
                    .setFont(italic).setFontSize(8)
                    .setFontColor(ColorConstants.GRAY)
                    .setTextAlignment(TextAlignment.CENTER));

            int pageCount = pdf.getNumberOfPages();
            doc.close();  // flushes all bytes into baos
            log.info("✅ PDF generated for meeting {} — {} pages", meetingId, pageCount);
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate transcript PDF: " + e.getMessage(), e);
        }
    }

    // ── helpers ────────────────────────────────────────────────────────────────

    private void addMetaCell(Table table, String label, String value,
                             PdfFont bold, PdfFont normal) {
        table.addCell(new Cell().add(
                        new Paragraph(label).setFont(bold).setFontSize(9))
                .setBackgroundColor(new DeviceRgb(240, 240, 250))
                .setPadding(5).setBorderBottom(null));
        table.addCell(new Cell().add(
                        new Paragraph(value).setFont(normal).setFontSize(9))
                .setPadding(5).setBorderBottom(null));
    }

    /**
     * Best-effort mapping: first speaker → participant1, second → participant2.
     */
    private String mapSpeakerToParticipant(String speaker, List<String> allSpeakers,
                                           String p1, String p2) {
        int idx = allSpeakers.indexOf(speaker);
        if (idx == 0 && p1 != null) return p1;
        if (idx == 1 && p2 != null) return p2;
        return "";
    }

    private String formatTimestamp(double seconds) {
        int mins = (int) (seconds / 60);
        int secs = (int) (seconds % 60);
        return String.format("%02d:%02d", mins, secs);
    }
}