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
        this.errorMessage = err?.error?.message || 'Erreur lors du chargement du dossier.';
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
        console.error('Erreur checklist', err);
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
        this.errorMessage = err?.error?.message || 'Erreur lors de la synchronisation du dossier.';
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
        this.successMessage = `"${item.label}" depose avec succes.`;
        this.uploadingCode = null;
        delete this.selectedFiles[item.code];
        this.loadAll(this.procedure!.id);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors du televersement.';
        this.uploadingCode = null;
      }
    });
  }

  deleteDocument(documentId: string): void {
    if (!this.procedure || !confirm('Supprimer ce document ?')) return;
    this.service.deleteDocument(this.procedure.id, documentId).subscribe({
      next: () => {
        this.successMessage = 'Document supprime.';
        this.loadAll(this.procedure!.id);
      },
      error: (err) => this.errorMessage = err?.error?.message || 'Erreur de suppression.'
    });
  }

  submitProcedure(): void {
    if (!this.procedure) return;
    this.service.submit(this.procedure.id, this.userId).subscribe({
      next: (updated) => {
        this.successMessage = 'Dossier soumis avec succes. Analyse IA lancee.';
        this.loadAll(updated.id);
      },
      error: (err) => this.errorMessage = err?.error?.message || 'Erreur lors de la soumission.'
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
        this.successMessage = `Analyse IA terminee : ${result.decision}.`;
        this.analyzingAi = false;
        this.loadAll(result.procedureId);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || err?.error || 'Erreur lors de l analyse IA.';
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
          text: err?.error?.message || 'Le chatbot juridique est momentanement indisponible.'
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
    const problemIndex = source.indexOf('Problemes detectes:');
    if (problemIndex >= 0) {
      return source.substring(0, problemIndex).trim();
    }
    const documentsIndex = source.indexOf('Documents a corriger:');
    if (documentsIndex >= 0) {
      return source.substring(0, documentsIndex).trim();
    }
    return this.aiFindingGroups.length ? 'Analyse IA refusee. Corrigez les documents signales puis resoumettez le dossier.' : source;
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

    const problemIndex = remark.indexOf('Problemes detectes:');
    if (problemIndex >= 0) {
      return remark
        .substring(problemIndex + 'Problemes detectes:'.length)
        .split('|')
        .map(item => item.trim())
        .filter(Boolean);
    }

    const documentsIndex = remark.indexOf('Documents a corriger:');
    if (documentsIndex < 0) {
      return [];
    }

    const findings: string[] = [];
    let currentDocument = '';
    remark
      .substring(documentsIndex + 'Documents a corriger:'.length)
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
        .replace('Document appears expired on ', 'Document expire depuis le ')
        .replace('.', '.');
    }
    const dictionary: Record<string, string> = {
      'Suspicious red or pink watermark overlay detected.': 'Filigrane rouge/rose suspect detecte sur le document.',
      'Suspicious masked or invalid verification code detected.': 'Code de verification masque ou invalide.',
      'Inconsistent company legal form detected: SARL and SA/Societe Anonyme appear together.': 'Incoherence de forme juridique : SARL et SA/Societe Anonyme apparaissent ensemble.',
      'Document issue date appears to be in the future.': 'Date d emission du document dans le futur.',
      'Document image contains repeated horizontal scan lines; quality is degraded.': 'Image degradee : lignes horizontales repetees detectees.',
      'Document image appears blurred.': 'Image floue ou qualite insuffisante.',
      'Suspicious diagonal overlay line detected.': 'Ligne diagonale suspecte detectee sur le document.',
      'Suspicious fraud marker detected in OCR text (for example FALSIFIE/INVALIDE).': 'Marqueur de fraude detecte dans le texte OCR (ex : FALSIFIE / INVALIDE).',
      'OCR text is too short for reliable automatic validation.': 'Texte OCR trop court pour valider automatiquement le document.',
      'No text extracted by OCR.': 'Aucun texte lisible extrait par OCR.'
    };
    return dictionary[normalized] || normalized;
  }

  get chatSuggestions(): string[] {
    const procedureLabel = this.procedure
      ? this.procedureTypeLabels[this.procedure.procedureType]
      : 'ma procedure';
    const missing = this.checklist?.items?.filter(item => item.required && !item.uploaded) || [];

    if (missing.length > 0) {
      return [
        `Quels documents dois-je preparer pour ${procedureLabel} ?`,
        `Explique-moi comment preparer ${missing[0].label}.`,
        'Quelle est la prochaine action pour avancer ?',
        'Pourquoi mon dossier peut etre refuse ?'
      ];
    }

    if (this.procedure?.status === 'COMPLETE') {
      return [
        'Que puis-je faire avec le document final ?',
        'Comment imprimer ou presenter cette attestation ?',
        `Quelles sont les prochaines etapes pour ${procedureLabel} ?`
      ];
    }

    return [
      `Explique-moi la procedure ${procedureLabel}.`,
      'Verifie mon dossier et dis-moi quoi faire ensuite.',
      'Comment eviter un refus par l IA ?',
      'C quoi POC ?'
    ];
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(/_/g, '-')}`;
  }
}


