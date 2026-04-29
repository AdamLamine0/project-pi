package tn.esprit.backend.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "investment_criteria")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvestmentCriteria {
    @Id
    private String id;

    private String name;
    private String investorId;
    private List<String> sectors;
    private List<String> stage;
    private Boolean active = true;

    private double minBudget;
    private double maxBudget;

    private String location;
    private String presentationPdfUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
