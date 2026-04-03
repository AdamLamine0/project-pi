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

import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class QrCodeService {

    private static final int QR_SIZE = 200;

    /**
     * Generates a QR code image for the given URL.
     * Returns a BufferedImage ready to be embedded in the PDF.
     */
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
}