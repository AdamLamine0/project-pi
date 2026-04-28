package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import jakarta.annotation.PostConstruct;
import nu.pattern.OpenCV;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfDouble;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class OpenCvDocumentVisionService {

    private static final Logger log = LoggerFactory.getLogger(OpenCvDocumentVisionService.class);
    private static final Set<String> SUPPORTED_EXTENSIONS = Set.of("png", "jpg", "jpeg", "bmp", "tif", "tiff");

    private final AiProperties properties;
    private boolean openCvLoaded;

    public OpenCvDocumentVisionService(AiProperties properties) {
        this.properties = properties;
    }

    @PostConstruct
    void loadOpenCv() {
        if (!properties.getVision().isEnabled()) {
            return;
        }
        try {
            OpenCV.loadLocally();
            openCvLoaded = true;
        } catch (RuntimeException e) {
            log.warn("OpenCV unavailable: {}", e.getMessage());
            openCvLoaded = false;
        }
    }

    public VisionResult analyze(Path file) {
        if (!properties.getVision().isEnabled()) {
            return new VisionResult(false, null, false, "Vision disabled");
        }
        if (!openCvLoaded) {
            return new VisionResult(false, null, false, "OpenCV runtime unavailable");
        }
        if (file == null || !Files.exists(file)) {
            return new VisionResult(false, null, false, "Uploaded file not found");
        }
        if (!isSupportedImage(file)) {
            return new VisionResult(false, null, false, "OpenCV blur detection supports image files only");
        }

        Mat image = Imgcodecs.imread(file.toAbsolutePath().toString(), Imgcodecs.IMREAD_GRAYSCALE);
        if (image.empty()) {
            return new VisionResult(false, null, false, "OpenCV could not read the image");
        }

        Mat laplacian = new Mat();
        MatOfDouble mean = new MatOfDouble();
        MatOfDouble stddev = new MatOfDouble();
        Imgproc.Laplacian(image, laplacian, CvType.CV_64F);
        Core.meanStdDev(laplacian, mean, stddev);

        double sigma = stddev.toArray()[0];
        double variance = sigma * sigma;
        List<String> findings = new ArrayList<>();
        if (hasSuspiciousDiagonalOverlay(image)) {
            findings.add("Suspicious diagonal overlay line detected.");
        }

        boolean blurred = variance < properties.getVision().getBlurThreshold();
        return new VisionResult(true, round(variance), blurred, null, findings);
    }

    private boolean hasSuspiciousDiagonalOverlay(Mat image) {
        Mat edges = new Mat();
        Imgproc.Canny(image, edges, 60, 180);

        Mat lines = new Mat();
        double minLineLength = Math.min(image.cols(), image.rows()) * 0.42;
        Imgproc.HoughLinesP(edges, lines, 1, Math.PI / 180, 120, minLineLength, 12);

        for (int i = 0; i < lines.rows(); i++) {
            double[] line = lines.get(i, 0);
            if (line == null || line.length < 4) {
                continue;
            }
            double angle = Math.toDegrees(Math.atan2(line[3] - line[1], line[2] - line[0]));
            double absAngle = Math.abs(angle);
            if (absAngle >= 18 && absAngle <= 72) {
                return true;
            }
        }
        return false;
    }

    private boolean isSupportedImage(Path file) {
        String name = file.getFileName().toString();
        int index = name.lastIndexOf('.');
        if (index < 0) {
            return false;
        }
        return SUPPORTED_EXTENSIONS.contains(name.substring(index + 1).toLowerCase(Locale.ROOT));
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    public record VisionResult(
            boolean available,
            Double blurScore,
            boolean blurred,
            String error,
            List<String> findings
    ) {
        public VisionResult(boolean available, Double blurScore, boolean blurred, String error) {
            this(available, blurScore, blurred, error, List.of());
        }
    }
}
