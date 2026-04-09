package org.example.eventpi.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class QrCodeService {

    private static final int QR_SIZE = 160;

    // ── RAW QR IMAGE (used internally) ───────────────────────────────────
    public BufferedImage generateQrImage(String content) {
        try {
            Map<EncodeHintType, Object> hints = new HashMap<>();
            hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
            hints.put(EncodeHintType.MARGIN, 1);

            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix = writer.encode(
                    content, BarcodeFormat.QR_CODE, QR_SIZE, QR_SIZE, hints);

            return MatrixToImageWriter.toBufferedImage(matrix);

        } catch (WriterException e) {
            log.error("Failed to generate QR code for: {}", content, e);
            throw new RuntimeException("QR code generation failed", e);
        }
    }

    // ── DIGITAL BADGE (square PNG with QR + label) ────────────────────────
    public BufferedImage generateBadgeImage(String recipientName,
                                            String eventTitle,
                                            String badgeLabel,
                                            String verificationUrl) {
        int W = 400, H = 400;
        BufferedImage badge = new BufferedImage(W, H, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = badge.createGraphics();

        // Antialiasing
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);
        g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,
                RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

        // ── Background: navy circle ───────────────────────────────────────
        g.setColor(new Color(0x0D, 0x1B, 0x2A));
        g.fillOval(0, 0, W, H);

        // ── Gold ring ─────────────────────────────────────────────────────
        g.setColor(new Color(0xC9, 0xA0, 0x2A));
        g.setStroke(new BasicStroke(6f));
        g.drawOval(8, 8, W - 16, H - 16);

        // ── Inner gold thin ring ──────────────────────────────────────────
        g.setStroke(new BasicStroke(1.5f));
        g.drawOval(18, 18, W - 36, H - 36);

        // ── "FoundersLab" header ──────────────────────────────────────────
        g.setColor(new Color(0xC9, 0xA0, 0x2A));
        g.setFont(new Font("SansSerif", Font.BOLD, 15));
        drawCentered(g, "FoundersLab", W, 52);

        // ── Badge label (e.g. "PARTICIPATION") ───────────────────────────
        g.setColor(Color.WHITE);
        g.setFont(new Font("SansSerif", Font.BOLD, 13));
        drawCentered(g, badgeLabel.toUpperCase(), W, 75);

        // ── QR code centered ──────────────────────────────────────────────
        BufferedImage qr = generateQrImage(verificationUrl);
        BufferedImage qrColored = recolorQr(qr,
                new Color(0x0D, 0x1B, 0x2A),
                new Color(0xC9, 0xA0, 0x2A));
        int qrX = (W - QR_SIZE) / 2;
        g.drawImage(qrColored, qrX, 95, null);

        // ── Event title (truncated) ───────────────────────────────────────
        g.setColor(Color.WHITE);
        g.setFont(new Font("SansSerif", Font.PLAIN, 11));
        String title = truncate(eventTitle, 35);
        drawCentered(g, title, W, 275);

        // ── Recipient name ────────────────────────────────────────────────
        g.setColor(new Color(0xC9, 0xA0, 0x2A));
        g.setFont(new Font("SansSerif", Font.BOLD, 12));
        drawCentered(g, recipientName, W, 295);

        // ── "Scan to verify" footer ───────────────────────────────────────
        g.setColor(new Color(0xAA, 0xAA, 0xAA));
        g.setFont(new Font("SansSerif", Font.PLAIN, 9));
        drawCentered(g, "Scan to verify authenticity", W, 340);

        g.dispose();

        return badge;
    }

    // ── HELPERS ───────────────────────────────────────────────────────────
    private void drawCentered(Graphics2D g, String text, int width, int y) {
        FontMetrics fm = g.getFontMetrics();
        int x = (width - fm.stringWidth(text)) / 2;
        g.drawString(text, x, y);
    }

    private String truncate(String text, int maxLen) {
        if (text == null) return "";
        return text.length() > maxLen
                ? text.substring(0, maxLen - 3) + "..."
                : text;
    }

    private BufferedImage recolorQr(BufferedImage original,
                                    Color darkColor, Color lightColor) {
        int w = original.getWidth(), h = original.getHeight();
        BufferedImage result = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        for (int x = 0; x < w; x++) {
            for (int y = 0; y < h; y++) {
                int pixel = original.getRGB(x, y);
                result.setRGB(x, y, (pixel == 0xFF000000)
                        ? darkColor.getRGB()
                        : lightColor.getRGB());
            }
        }
        return result;
    }
}