package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import com.ai.ai_service.dto.DocumentAnalysisRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DocumentRuleAnalysisService {

    private static final String DATE_REGEX = "(\\d{1,2}[./\\-\\s]\\d{1,2}[./\\-\\s]\\d{2,4}|\\d{4}[./\\-\\s]\\d{1,2}[./\\-\\s]\\d{1,2})";
    private static final Pattern DATE_PATTERN = Pattern.compile("\\b" + DATE_REGEX + "\\b");
    private static final Pattern DIRECT_EXPIRATION_PATTERN = Pattern.compile(
            "(?:expire(?:\\s+le)?|expiration|expires|expiry|validite|fin\\s+de\\s+validite|date\\s+de\\s+validite|valable\\s+jusqu(?:au|a)?|valid\\s+until|date\\s+d.?expiration)\\D{0,45}\\b"
                    + DATE_REGEX
                    + "\\b",
            Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE
    );
    private static final Pattern EXPIRATION_CONTEXT = Pattern.compile(
            "(expire|expiration|expires|expiry|validite|fin de validite|date de validite|valable jusqu|valid until|date d.expiration|date d.expiration)",
            Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE
    );
    private static final Pattern BIRTH_DATE_CONTEXT = Pattern.compile(
            "(date\\s+de\\s+naissance|naissance|n[eé]\\s+le|n[eé]e\\s+le|birth|date\\s+of\\s+birth|dob)",
            Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE
    );
    private static final Pattern SUSPICIOUS_KEYWORD_PATTERN = Pattern.compile(
            "(falsifi[eé]|faux|forg[eé]|fraude|frauduleux|invalide|invalid|document\\s+alt[eé]r[eé])",
            Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE
    );
    private static final Pattern MASKED_VERIFICATION_CODE_PATTERN = Pattern.compile(
            "(code\\s+de\\s+v[eé]rification|verification\\s+code|code)[\\s\\S]{0,80}(x{3,}|\\?{3,}|0{4,}|-{3,})",
            Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE
    );
    private static final Pattern FRENCH_TEXT_DATE_PATTERN = Pattern.compile(
            "\\b(\\d{1,2})\\s+(janvier|fevrier|f[eé]vrier|mars|avril|mai|juin|juillet|aout|ao[uû]t|septembre|octobre|novembre|decembre|d[eé]cembre)\\s+(\\d{4})\\b",
            Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE
    );
    private static final Pattern ISSUE_DATE_CONTEXT = Pattern.compile(
            "(delivre|d[eé]livr[eé]|emis|[eé]mis|date\\s+d.?emission|date\\s+du\\s+document|fait\\s+le)",
            Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE
    );
    private static final List<DateTimeFormatter> DATE_FORMATS = List.of(
            DateTimeFormatter.ofPattern("d/M/uuuu"),
            DateTimeFormatter.ofPattern("d-M-uuuu"),
            DateTimeFormatter.ofPattern("d/M/uu"),
            DateTimeFormatter.ofPattern("d-M-uu"),
            DateTimeFormatter.ofPattern("uuuu-M-d"),
            DateTimeFormatter.ofPattern("uuuu/M/d")
    );

    private final AiProperties properties;

    public DocumentRuleAnalysisService(AiProperties properties) {
        this.properties = properties;
    }

    public RuleResult analyze(DocumentAnalysisRequest document, String text, boolean blurred) {
        List<String> findings = new ArrayList<>();
        LocalDate expirationDate = null;

        if (blurred) {
            findings.add("Document image appears blurred.");
        }

        if (text == null || text.isBlank()) {
            findings.add("No text extracted by OCR.");
        } else if (text.length() < properties.getOcr().getMinTextLength()) {
            findings.add("OCR text is too short for reliable automatic validation.");
        }

        boolean suspiciousContent = text != null
                && !text.isBlank()
                && detectSuspiciousContent(text, findings);

        if (document.expiresAt() != null) {
            expirationDate = document.expiresAt().toLocalDate();
        } else {
            expirationDate = detectExpirationDate(text).orElse(null);
        }

        boolean expired = expirationDate != null && expirationDate.isBefore(LocalDate.now());
        if (expired) {
            findings.add("Document appears expired on " + expirationDate + ".");
        }

        boolean requiresReview = blurred
                || text == null
                || text.length() < properties.getOcr().getMinTextLength()
                || suspiciousContent
                || expired;

        return new RuleResult(expirationDate, expired, requiresReview, findings);
    }

    private Optional<LocalDate> detectExpirationDate(String text) {
        if (text == null || text.isBlank()) {
            return Optional.empty();
        }

        String normalizedText = normalize(text);
        Optional<LocalDate> directExpirationDate = detectDirectExpirationDate(normalizedText);
        if (directExpirationDate.isPresent()) {
            return directExpirationDate;
        }

        LocalDate bestCandidate = null;
        Matcher matcher = DATE_PATTERN.matcher(normalizedText);
        while (matcher.find()) {
            String candidate = matcher.group(1);
            String before = normalizedText.substring(Math.max(0, matcher.start() - 70), matcher.start());
            String after = normalizedText.substring(matcher.end(), Math.min(normalizedText.length(), matcher.end() + 45));
            String context = before + " " + after;

            if (BIRTH_DATE_CONTEXT.matcher(context).find()) {
                continue;
            }
            if (!EXPIRATION_CONTEXT.matcher(context).find()) {
                continue;
            }

            LocalDate parsed = parseDate(candidate);
            if (parsed != null) {
                if (bestCandidate == null || parsed.isAfter(bestCandidate)) {
                    bestCandidate = parsed;
                }
            }
        }
        return Optional.ofNullable(bestCandidate);
    }

    private Optional<LocalDate> detectDirectExpirationDate(String normalizedText) {
        LocalDate bestCandidate = null;
        Matcher matcher = DIRECT_EXPIRATION_PATTERN.matcher(normalizedText);
        while (matcher.find()) {
            LocalDate parsed = parseDate(matcher.group(1));
            if (parsed != null && (bestCandidate == null || parsed.isAfter(bestCandidate))) {
                bestCandidate = parsed;
            }
        }
        return Optional.ofNullable(bestCandidate);
    }

    private boolean detectSuspiciousContent(String text, List<String> findings) {
        String normalized = normalize(text);
        boolean suspicious = false;

        if (SUSPICIOUS_KEYWORD_PATTERN.matcher(normalized).find()) {
            findings.add("Suspicious fraud marker detected in OCR text (for example FALSIFIE/INVALIDE).");
            suspicious = true;
        }
        if (MASKED_VERIFICATION_CODE_PATTERN.matcher(normalized).find()) {
            findings.add("Suspicious masked or invalid verification code detected.");
            suspicious = true;
        }
        if (normalized.contains("sarl") && (normalized.contains("societe anonyme") || normalized.contains("sa)"))) {
            findings.add("Inconsistent company legal form detected: SARL and SA/Societe Anonyme appear together.");
            suspicious = true;
        }
        if (hasFutureIssueDate(text)) {
            findings.add("Document issue date appears to be in the future.");
            suspicious = true;
        }

        return suspicious;
    }

    private boolean hasFutureIssueDate(String text) {
        Matcher numericMatcher = DATE_PATTERN.matcher(text);
        while (numericMatcher.find()) {
            int start = Math.max(0, numericMatcher.start() - 70);
            int end = Math.min(text.length(), numericMatcher.end() + 70);
            if (!ISSUE_DATE_CONTEXT.matcher(normalize(text.substring(start, end))).find()) {
                continue;
            }
            LocalDate parsed = parseDate(numericMatcher.group(1));
            if (parsed != null && parsed.isAfter(LocalDate.now().plusDays(1))) {
                return true;
            }
        }

        Matcher frenchMatcher = FRENCH_TEXT_DATE_PATTERN.matcher(text);
        while (frenchMatcher.find()) {
            int start = Math.max(0, frenchMatcher.start() - 70);
            int end = Math.min(text.length(), frenchMatcher.end() + 70);
            if (!ISSUE_DATE_CONTEXT.matcher(normalize(text.substring(start, end))).find()) {
                continue;
            }
            LocalDate parsed = parseFrenchTextDate(frenchMatcher);
            if (parsed != null && parsed.isAfter(LocalDate.now().plusDays(1))) {
                return true;
            }
        }

        return false;
    }

    private LocalDate parseFrenchTextDate(Matcher matcher) {
        try {
            int day = Integer.parseInt(matcher.group(1));
            int month = frenchMonth(matcher.group(2));
            int year = Integer.parseInt(matcher.group(3));
            return month <= 0 ? null : LocalDate.of(year, month, day);
        } catch (RuntimeException e) {
            return null;
        }
    }

    private int frenchMonth(String value) {
        String month = normalize(value);
        return switch (month) {
            case "janvier" -> 1;
            case "fevrier" -> 2;
            case "mars" -> 3;
            case "avril" -> 4;
            case "mai" -> 5;
            case "juin" -> 6;
            case "juillet" -> 7;
            case "aout" -> 8;
            case "septembre" -> 9;
            case "octobre" -> 10;
            case "novembre" -> 11;
            case "decembre" -> 12;
            default -> 0;
        };
    }

    private LocalDate parseDate(String value) {
        String normalized = value.trim()
                .replace('-', '/')
                .replace('.', '/')
                .replaceAll("\\s+", "/");
        for (DateTimeFormatter formatter : DATE_FORMATS) {
            try {
                return LocalDate.parse(normalized, formatter);
            } catch (DateTimeParseException ignored) {
                // Try the next format.
            }
        }
        return null;
    }

    private String normalize(String value) {
        return java.text.Normalizer.normalize(value, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replace('é', 'e')
                .replace('è', 'e')
                .replace('ê', 'e')
                .replace('à', 'a');
    }

    public record RuleResult(
            LocalDate expirationDate,
            boolean expired,
            boolean requiresReview,
            List<String> findings
    ) {}
}
