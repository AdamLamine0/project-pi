import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { AuthService } from '../../../../core/services/auth.service';
import {
  LegalProcedureResponse,
  ChecklistResponse,
  ChecklistItem,
  LegalAiAnalysisResponse,
  LegalChatResponse,
  STATUS_LABELS,
  PROCEDURE_TYPE_LABELS,
} from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-legal-procedure-detail',
  templateUrl: './legal-procedure-detail.component.html',
  standalone: false,
  styleUrls: ['./legal-procedure-detail.component.css']
})
export class LegalProcedureDetailComponent implements OnInit {

  procedure?: LegalProcedureResponse;
  checklist?: ChecklistResponse;
  aiResult?: LegalAiAnalysisResponse;
  selectedFiles: Record<string, File> = {};
  chatQuestion = '';
  chatMessages: Array<{ role: 'user' | 'assistant'; text: string; disclaimer?: string }> = [];
  chatOpen = false;

  loading = false;
  analyzingAi = false;
  chatSending = false;
  uploadingCode: string | null = null;
  errorMessage = '';
  successMessage = '';

  readonly statusLabels = STATUS_LABELS;
  readonly procedureTypeLabels = PROCEDURE_TYPE_LABELS;

  private readonly userId: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: LegalProcedureService,
    private readonly location: Location,
    private readonly auth: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.userId = this.auth.getUserId();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const navigationState = history.state?.['procedure'] as LegalProcedureResponse | undefined;

    if (id && navigationState?.id === id) {
      this.procedure = navigationState;
      this.loading = false;
      this.loadChecklist(id);
      this.cdr.detectChanges();
      this.refreshProcedure(id);
      return;
    }

    if (id) this.loadAll(id);
  }

  goBack(): void { this.location.back(); }

  toggleChat(): void {
    this.chatOpen = !this.chatOpen;
  }

  closeChat(): void {
    this.chatOpen = false;
  }

  get chatMissingDocuments(): ChecklistItem[] {
    return this.checklist?.items?.filter(item => item.required && !item.uploaded) || [];
  }

  get chatUploadedDocuments(): ChecklistItem[] {
    return this.checklist?.items?.filter(item => item.uploaded) || [];
  }

  askSuggestion(question: string): void {
    this.chatQuestion = question;
    this.askLegalChat();
  }

  loadAll(id: string): void {
    this.loading = !this.procedure;
    this.errorMessage = '';
    this.service.getById(id).subscribe({
      next: (data) => {
        this.procedure = data;
        this.loading = false;
        this.loadChecklist(id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'An error occurred while loading the case.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadChecklist(id: string): void {
    this.service.getChecklist(id).subscribe({
      next: (data) => {
        this.checklist = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Checklist error', err);
        this.cdr.detectChanges();
      }
    });
  }

  private refreshProcedure(id: string): void {
    this.service.getById(id).subscribe({
      next: (data) => {
        this.procedure = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'An error occurred while syncing the case.';
        this.cdr.detectChanges();
      }
    });
  }

  onFileSelected(event: Event, code: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.selectedFiles[code] = input.files[0];
  }

  uploadDocument(item: ChecklistItem): void {
    if (!this.procedure || !this.selectedFiles[item.code]) return;
    this.errorMessage = '';
    this.successMessage = '';
    this.uploadingCode = item.code;

    this.service.uploadDocument(
      this.procedure.id, item.code, this.selectedFiles[item.code]
    ).subscribe({
      next: () => {
        this.successMessage = `"${item.label}" uploaded successfully.`;
        this.uploadingCode = null;
        delete this.selectedFiles[item.code];
        this.loadAll(this.procedure!.id);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'An error occurred while uploading.';
        this.uploadingCode = null;
      }
    });
  }

  deleteDocument(documentId: string): void {
    if (!this.procedure || !confirm('Delete this document?')) return;
    this.service.deleteDocument(this.procedure.id, documentId).subscribe({
      next: () => {
        this.successMessage = 'Document deleted.';
        this.loadAll(this.procedure!.id);
      },
      error: (err) => this.errorMessage = err?.error?.message || 'An error occurred while deleting.'
    });
  }

  submitProcedure(): void {
    if (!this.procedure) return;
    this.service.submit(this.procedure.id, this.userId).subscribe({
      next: (updated) => {
        this.successMessage = 'Case submitted successfully. AI analysis started.';
        this.loadAll(updated.id);
      },
      error: (err) => this.errorMessage = err?.error?.message || 'An error occurred while submitting the case.'
    });
  }

  runAiAnalysis(): void {
    if (!this.procedure) return;
    this.errorMessage = '';
    this.successMessage = '';
    this.analyzingAi = true;

    this.service.analyzeWithAi(this.procedure.id).subscribe({
      next: (result) => {
        this.aiResult = result;
        this.successMessage = `AI analysis completed: ${result.decision}.`;
        this.analyzingAi = false;
        this.loadAll(result.procedureId);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || err?.error || 'An error occurred during AI analysis.';
        this.analyzingAi = false;
      }
    });
  }

  askLegalChat(): void {
    if (!this.procedure || !this.chatQuestion.trim()) return;
    const question = this.chatQuestion.trim();
    this.chatQuestion = '';
    this.chatSending = true;
    this.chatMessages.push({ role: 'user', text: question });

    const requiredDocuments = this.checklist?.items
      .filter(item => item.required)
      .map(item => item.label) || [];
    const uploadedDocuments = this.checklist?.items
      .filter(item => item.uploaded)
      .map(item => item.label) || [];
    const missingDocuments = this.checklist?.items
      .filter(item => item.required && !item.uploaded)
      .map(item => item.label) || [];
    const history = this.chatMessages
      .slice(0, -1)
      .slice(-8)
      .map(message => ({
        role: message.role,
        text: message.text
      }));

    this.service.askLegalChat({
      procedureId: this.procedure.id,
      procedureType: this.procedure.procedureType,
      procedureStatus: this.procedure.status,
      projectName: this.procedure.projectName,
      question,
      requiredDocuments,
      uploadedDocuments,
      missingDocuments,
      history
    }).subscribe({
      next: (response: LegalChatResponse) => {
        this.chatMessages.push({
          role: 'assistant',
          text: response.answer,
          disclaimer: response.disclaimer
        });
        this.chatSending = false;
      },
      error: (err) => {
        this.chatMessages.push({
          role: 'assistant',
          text: err?.error?.message || 'The legal chatbot is temporarily unavailable.'
        });
        this.chatSending = false;
      }
    });
  }

  get allRequiredUploaded(): boolean {
    return !!this.checklist &&
      this.checklist.requiredCount > 0 &&
      this.checklist.uploadedCount >= this.checklist.requiredCount;
  }

  get canEditDocuments(): boolean {
    return this.procedure?.status === 'BROUILLON' || this.procedure?.status === 'REFUSE';
  }

  get aiRemarkSummary(): string {
    const source = this.aiResult?.remark || this.procedure?.remark || '';
    if (!source) {
      return '';
    }
    const problemIndex = source.indexOf('Detected issues:');
    if (problemIndex >= 0) {
      return source.substring(0, problemIndex).trim();
    }
    const documentsIndex = source.indexOf('Documents to fix:');
    if (documentsIndex >= 0) {
      return source.substring(0, documentsIndex).trim();
    }
    return this.aiFindingGroups.length ? 'AI analysis rejected the case. Fix the flagged documents, then resubmit the case.' : source;
  }

  get aiFindingGroups(): Array<{ document: string; findings: string[] }> {
    const findings = this.aiResult?.technicalFindings?.length
      ? this.aiResult.technicalFindings
      : this.extractFindingsFromRemark(this.procedure?.remark || '');

    const grouped = new Map<string, string[]>();
    findings.forEach(rawFinding => {
      const separator = rawFinding.indexOf(':');
      const document = separator > 0 ? rawFinding.substring(0, separator).trim() : 'Document';
      const finding = separator > 0 ? rawFinding.substring(separator + 1).trim() : rawFinding.trim();
      if (!finding) return;
      if (!grouped.has(document)) {
        grouped.set(document, []);
      }
      grouped.get(document)!.push(this.translateAiFinding(finding));
    });

    return Array.from(grouped.entries()).map(([document, groupedFindings]) => ({
      document,
      findings: groupedFindings
    }));
  }

  private extractFindingsFromRemark(remark: string): string[] {
    if (!remark) {
      return [];
    }

    const problemMarker = 'Detected issues:';
    const problemIndex = remark.indexOf(problemMarker);
    if (problemIndex >= 0) {
      return remark
        .substring(problemIndex + problemMarker.length)
        .split('|')
        .map(item => item.trim())
        .filter(Boolean);
    }

    const documentsMarker = 'Documents to fix:';
    const documentsIndex = remark.indexOf(documentsMarker);
    if (documentsIndex < 0) {
      return [];
    }

    const findings: string[] = [];
    let currentDocument = '';
    remark
      .substring(documentsIndex + documentsMarker.length)
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .forEach(line => {
        if (line.startsWith('- ') && line.endsWith(':')) {
          currentDocument = line.substring(2, line.length - 1).trim();
          return;
        }
        if (line.startsWith('- ') && currentDocument) {
          findings.push(`${currentDocument}: ${line.substring(2).trim()}`);
        }
      });
    return findings;
  }

  private translateAiFinding(finding: string): string {
    const normalized = finding.trim();
    if (normalized.startsWith('Document appears expired on ')) {
      return normalized
        .replace('Document appears expired on ', 'Document appears expired on ')
        .replace('.', '.');
    }
    const dictionary: Record<string, string> = {
      'Suspicious red or pink watermark overlay detected.': 'Suspicious red or pink watermark overlay detected.',
      'Suspicious masked or invalid verification code detected.': 'Suspicious masked or invalid verification code detected.',
      'Inconsistent company legal form detected: SARL and SA/Societe Anonyme appear together.': 'Inconsistent company legal form detected: SARL and SA/Societe Anonyme appear together.',
      'Document issue date appears to be in the future.': 'Document issue date appears to be in the future.',
      'Document image contains repeated horizontal scan lines; quality is degraded.': 'Document image contains repeated horizontal scan lines; quality is degraded.',
      'Document image appears blurred.': 'Document image appears blurred.',
      'Suspicious diagonal overlay line detected.': 'Suspicious diagonal overlay line detected.',
      'Suspicious fraud marker detected in OCR text (for example FALSIFIE/INVALIDE).': 'Suspicious fraud marker detected in OCR text (for example FALSIFIE/INVALIDE).',
      'OCR text is too short for reliable automatic validation.': 'OCR text is too short for reliable automatic validation.',
      'No text extracted by OCR.': 'No text extracted by OCR.'
    };
    return dictionary[normalized] || normalized;
  }

  get chatSuggestions(): string[] {
    const procedureLabel = this.procedure
      ? this.procedureTypeLabels[this.procedure.procedureType]
      : 'my procedure';
    const missing = this.checklist?.items?.filter(item => item.required && !item.uploaded) || [];

    if (missing.length > 0) {
      return [
        `What documents should I prepare for ${procedureLabel}?`,
        `Explain how to prepare ${missing[0].label}.`,
        'What is the next action to move forward?',
        'Why could my case be rejected?'
      ];
    }

    if (this.procedure?.status === 'COMPLETE') {
      return [
        'What can I do with the final document?',
        'How should I print or present this certificate?',
        `What are the next steps for ${procedureLabel}?`
      ];
    }

    return [
      `Explain the procedure ${procedureLabel}.`,
      'Review my case and tell me what to do next.',
      'How can I avoid an AI rejection?',
      'What is a POC?'
    ];
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(/_/g, '-')}`;
  }
}


