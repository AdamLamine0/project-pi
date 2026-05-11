import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrepreneurPlaygroundChatMessage, EntrepreneurPlaygroundDocument, EntrepreneurPlaygroundRequest, EntrepreneurPlaygroundResult, Project } from '../../../../models/project';
import { AuthService } from '../../../../core/services/auth.service';
import { GestionProjetsService } from '../../services/gestion-projets.service';

interface ChatMessageView {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface PromptPreset {
  label: string;
  prompt: string;
}

type DocumentTab = 'pitch' | 'bmc' | 'swot' | 'budget';

@Component({
  selector: 'app-entrepreneur-playground',
  standalone: false,
  templateUrl: './entrepreneur-playground.component.html',
  styleUrls: ['./entrepreneur-playground.component.css']
})
export class EntrepreneurPlaygroundComponent implements OnInit {
  projectId = 0;
  loadingProject = false;
  loading = false;
  project: Project | null = null;
  prompt = '';

  activeTab: DocumentTab = 'pitch';
  documentDrafts: Record<DocumentTab, string> = {
    pitch: '',
    bmc: '',
    swot: '',
    budget: ''
  };
  documentTitles: Record<DocumentTab, string> = {
    pitch: 'Pitch Deck',
    bmc: 'Business Model Canvas',
    swot: 'Analyse SWOT',
    budget: 'Budget et Finances'
  };

  tone = 'concret';
  documents: EntrepreneurPlaygroundDocument[] = [];
  messages: ChatMessageView[] = [];
  result: EntrepreneurPlaygroundResult | null = null;
  error = '';
  selectedPreset = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private projectService: GestionProjetsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id') || 0);
    if (this.projectId) {
      this.loadProject();
    }
  }

  get currentUserRole(): string {
    return this.authService.getRole();
  }

  get isFounder(): boolean {
    return this.currentUserRole === 'USER';
  }

  get isInvestor(): boolean {
    return this.currentUserRole === 'INVESTOR';
  }

  get isMentor(): boolean {
    return this.currentUserRole === 'MENTOR';
  }

  get canEdit(): boolean {
    return this.isFounder || this.currentUserRole === 'ADMIN';
  }

  get rolePresets(): PromptPreset[] {
    if (this.isInvestor) {
      return [
        { label: 'Identifier Risques', prompt: 'Fais une due diligence rapide: quels sont les 3 risques majeurs de ce document ?' },
        { label: 'Analyse Financière', prompt: 'Analyse les projections et le runway. Sont-ils réalistes ?' },
      ];
    }
    if (this.isMentor) {
      return [
        { label: 'Générer Feedback', prompt: 'Génère 3 suggestions d\'amélioration constructives pour le fondateur.' },
        { label: 'Critique Pitch', prompt: 'Le pitch accroche-t-il l\'attention ? Comment l\'améliorer ?' },
      ];
    }
    return [
      { label: 'Structurer le doc', prompt: 'Structure le document sélectionné en sections claires avec des exemples.' },
      { label: 'Expertise IA', prompt: "Analyse ce document comme un investisseur exigeant et propose des améliorations radicales." },
      { label: 'Soyons brefs', prompt: 'Raccourcis ce texte en gardant uniquement l\'essentiel et les chiffres clés.' },
      { label: 'Générer', prompt: "Génère un premier brouillon complet pour cette section." },
    ];
  }

  get hasConversation(): boolean {
    return this.messages.length > 0;
  }

  loadProject(): void {
    this.loadingProject = true;
    this.projectService.getProject(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.cdr.detectChanges();
        this.loadPersistedDocuments(project);
      },
      error: () => {
        this.loadingProject = false;
        this.error = 'Impossible de charger le projet pour le playground.';
        this.cdr.detectChanges();
      },
    });
  }

  private loadPersistedDocuments(project: Project): void {
    this.projectService.getProjectDocuments(this.projectId).subscribe({
      next: (docs) => {
        // Map persisted documents to drafts
        const pitchDoc = docs.find(d => d.type === 'PITCH_DECK');
        const bmcDoc = docs.find(d => d.type === 'BUSINESS_MODEL_CANVAS');
        const swotDoc = docs.find(d => d.type === 'SWOT_ANALYSIS');

        this.documentDrafts['pitch'] = pitchDoc ? pitchDoc.content : this.buildDefaultDraft(project, 'pitch');
        this.documentDrafts['bmc'] = bmcDoc ? bmcDoc.content : this.buildDefaultDraft(project, 'bmc');
        this.documentDrafts['swot'] = swotDoc ? swotDoc.content : this.buildDefaultDraft(project, 'swot');
        this.documentDrafts['budget'] = this.buildDefaultDraft(project, 'budget');

        // Store original IDs for updates
        if (pitchDoc) this.docIds['pitch'] = pitchDoc.id;
        if (bmcDoc) this.docIds['bmc'] = bmcDoc.id;
        if (swotDoc) this.docIds['swot'] = swotDoc.id;

        this.messages = [
          {
            role: 'assistant',
            content: this.buildWelcomeMessage(project),
            timestamp: new Date().toISOString(),
          },
        ];
        this.loadingProject = false;
        this.cdr.detectChanges();
      },
      error: () => {
        // Fallback to default drafts if loading fails
        this.documentDrafts['pitch'] = this.buildDefaultDraft(project, 'pitch');
        this.documentDrafts['bmc'] = this.buildDefaultDraft(project, 'bmc');
        this.documentDrafts['swot'] = this.buildDefaultDraft(project, 'swot');
        this.documentDrafts['budget'] = this.buildDefaultDraft(project, 'budget');
        this.loadingProject = false;
        this.cdr.detectChanges();
      }
    });
  }

  private docIds: Record<string, number> = {};

  saveCurrentDocument(): void {
    if (!this.project || !this.canEdit) return;
    
    const typeMap: Record<DocumentTab, string> = {
      pitch: 'PITCH_DECK',
      bmc: 'BUSINESS_MODEL_CANVAS',
      swot: 'SWOT_ANALYSIS',
      budget: 'OTHER'
    };

    const payload = {
      projectId: this.projectId,
      title: this.documentTitles[this.activeTab],
      type: typeMap[this.activeTab],
      content: this.documentDrafts[this.activeTab]
    };

    const docId = this.docIds[this.activeTab];
    const obs = docId 
      ? this.projectService.updateDocument(docId, payload)
      : this.projectService.saveDocument(payload);

    obs.subscribe({
      next: (res) => {
        this.docIds[this.activeTab] = res.id;
        alert('Document enregistré avec succès !');
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Erreur lors de l\'enregistrement.');
        this.cdr.detectChanges();
      }
    });
  }

  onDocumentsSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) {
      return;
    }

    const readers = Array.from(files).map((file) => this.readFileAsText(file));
    Promise.all(readers).then((docs) => {
      this.documents = [...this.documents, ...docs];
      if (!this.documentDrafts[this.activeTab].trim() && docs.length > 0) {
        this.documentDrafts[this.activeTab] = this.buildDocumentContextFromFiles(docs);
      }
    });

    input.value = '';
  }

  removeDocument(index: number): void {
    if (!this.canEdit) {
      return;
    }
    this.documents.splice(index, 1);
  }

  usePreset(preset: PromptPreset): void {
    this.selectedPreset = preset.label;
    this.prompt = preset.prompt;
    this.sendMessage();
  }

  resetWorkspace(): void {
    if (!this.project) {
      return;
    }

    this.messages = [
      {
        role: 'assistant',
        content: this.buildWelcomeMessage(this.project),
        timestamp: new Date().toISOString(),
      },
    ];
    this.prompt = '';
    this.documentDrafts['pitch'] = this.buildDefaultDraft(this.project, 'pitch');
    this.documentDrafts['bmc'] = this.buildDefaultDraft(this.project, 'bmc');
    this.documentDrafts['swot'] = this.buildDefaultDraft(this.project, 'swot');
    this.documentDrafts['budget'] = this.buildDefaultDraft(this.project, 'budget');
    this.result = null;
    this.error = '';
  }

  sendMessage(): void {
    const userMessage = (this.prompt || '').trim();
    if (!this.project || !userMessage || this.loading) {
      return;
    }

    const nextMessages: ChatMessageView[] = [
      ...this.messages,
      {
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
      },
    ];

    this.messages = nextMessages;
    this.prompt = '';
    this.loading = true;
    this.error = '';

    const payload: EntrepreneurPlaygroundRequest = {
      title: this.project.title,
      description: this.project.description,
      sector: this.project.sector,
      stage: this.project.stage,
      budget: this.project.budget,
      revenueModel: this.project.revenueModel,
      teamSize: this.project.teamSize,
      bmc: this.documentDrafts['bmc'],
      swot: this.documentDrafts['swot'],
      budgetNotes: this.documentDrafts['budget'],
      goals: [],
      documents: this.documents,
      userMessage: `[Sur la section: ${this.documentTitles[this.activeTab]}] ` + userMessage,
      documentTitle: this.documentTitles[this.activeTab],
      documentDraft: this.documentDrafts[this.activeTab],
      tone: this.tone,
      conversation: this.messages.map((message) => ({ role: message.role, content: message.content })),
    };

    this.projectService.analyzeEntrepreneurPlayground(this.projectId, payload).subscribe({
      next: (res) => {
        this.result = res;
        this.documentTitles[this.activeTab] = res.documentTitle || this.documentTitles[this.activeTab];
        this.documentDrafts[this.activeTab] = res.documentDraft || this.documentDrafts[this.activeTab];
        const assistantMessage = res.assistantMessage || 'Je viens de mettre a jour le document.';
        this.messages = [
          ...nextMessages,
          {
            role: 'assistant',
            content: assistantMessage,
            timestamp: new Date().toISOString(),
          },
        ];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Playground error:', err);
        this.error = 'Le copilote OpenRouter est indisponible pour le moment. Mode local actif: le brouillon reste editable.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applySuggestedEdit(content: string): void {
    this.documentDrafts[this.activeTab] = content;
    this.prompt = `Integre cette version dans la section ${this.documentTitles[this.activeTab]} et propose ensuite une prochaine version plus forte.`;
  }

  describeDocument(): void {
    this.prompt = `Analyse le brouillon actuel de ${this.documentTitles[this.activeTab]} et propose les prochaines modifications prioritaires.`;
    this.sendMessage();
  }

  setTab(tab: DocumentTab): void {
    this.activeTab = tab;
  }

  clearDocuments(): void {
    this.documents = [];
  }

  exportCurrentDocument(): void {
    if (!this.project) {
      return;
    }

    const popup = window.open('', '_blank', 'width=1200,height=900');
    if (!popup) {
      return;
    }

    popup.document.write(this.buildPrintableDocument(this.activeTab));
    popup.document.close();
    popup.focus();
    popup.onafterprint = () => popup.close();
    setTimeout(() => popup.print(), 200);
  }

  getDocTitle(): string {
    return this.documentTitles[this.activeTab];
  }

  getDocCharCount(): number {
    return (this.documentDrafts[this.activeTab] || '').length;
  }

  getResultStrengthCount(): number {
    return this.result?.strengths?.length || 0;
  }

  getResultGapCount(): number {
    return this.result?.gaps?.length || 0;
  }

  hasResultDimensions(): boolean {
    return !!this.result?.dimensions?.length;
  }

  getPitchPreview(): { problem: string; solution: string; market: string; model: string; team: string } {
    return {
      problem: this.extractSection('pitch', 'Problème') || 'À préciser avec le besoin principal du marché.',
      solution: this.extractSection('pitch', 'Solution') || this.project?.description || 'À affiner avec une proposition de valeur plus nette.',
      market: this.extractSection('pitch', 'Marché & Traction') || this.extractSection('pitch', 'Traction') || 'Ajoutez des signaux de marché, des clients pilotes ou des usages actifs.',
      model: this.extractBulletValue('pitch', 'Modele de revenu') || this.extractBulletValue('pitch', 'Modèle de revenu') || this.project?.revenueModel || 'À définir.',
      team: this.extractBulletValue('pitch', 'Competences') || this.extractBulletValue('pitch', 'Compétences') || this.project?.teamSize || 'Équipe à détailler.',
    };
  }

  getBmcPreview(): Array<{ label: string; value: string; tone: string }> {
    return [
      { label: 'Segments de clientèle', value: this.extractBulletValue('bmc', 'Segments de clientèle') || 'Décrivez les premiers clients ciblés.', tone: 'blue' },
      { label: 'Proposition de valeur', value: this.extractBulletValue('bmc', 'Proposition de valeur') || 'Expliquez ce qui rend le produit incontournable.', tone: 'emerald' },
      { label: 'Canaux', value: this.extractBulletValue('bmc', 'Canaux') || 'Précisez comment le produit est livré et découvert.', tone: 'amber' },
      { label: 'Relations clients', value: this.extractBulletValue('bmc', 'Relations clients') || 'Automatisation, accompagnement ou self-service.', tone: 'violet' },
      { label: 'Flux de revenus', value: this.extractBulletValue('bmc', 'Flux de revenus') || this.project?.revenueModel || 'Abonnement, licence ou service.', tone: 'rose' },
      { label: 'Ressources clés', value: this.extractBulletValue('bmc', 'Ressources clés') || 'Équipe, données, IP ou distribution.', tone: 'slate' },
      { label: 'Activités clés', value: this.extractBulletValue('bmc', 'Activités clés') || 'Ce qui doit être exécuté chaque semaine.', tone: 'cyan' },
      { label: 'Partenaires clés', value: this.extractBulletValue('bmc', 'Partenaires clés') || 'Partenaires, fournisseurs et intégrations.', tone: 'green' },
      { label: 'Structure de coûts', value: this.extractBulletValue('bmc', 'Structure de coûts') || 'Coûts fixes, variables et outils.', tone: 'orange' },
    ];
  }

  getSwotPreview(): Array<{ label: string; value: string; tone: string }> {
    return [
      { label: 'Forces', value: this.extractSection('swot', 'Forces') || 'Avantages internes à mettre en avant.', tone: 'emerald' },
      { label: 'Faiblesses', value: this.extractSection('swot', 'Faiblesses') || 'Points faibles à assumer et corriger.', tone: 'rose' },
      { label: 'Opportunités', value: this.extractSection('swot', 'Opportunités') || 'Fenêtres de marché ou niches à saisir.', tone: 'blue' },
      { label: 'Menaces', value: this.extractSection('swot', 'Menaces') || 'Risques externes et barrières à prévoir.', tone: 'amber' },
    ];
  }

  getBudgetPreview(): { budget: string; capex: string; opex: string; runway: string; assumptions: string } {
    const budgetValue = this.project?.budget != null ? `${this.project.budget.toLocaleString('fr-FR')} MAD` : 'À préciser';
    return {
      budget: budgetValue,
      capex: this.extractSection('budget', 'CAPEX') || 'Investissements initiaux, matériel et setup.',
      opex: this.extractSection('budget', 'OPEX') || 'Coûts récurrents de fonctionnement.',
      runway: this.extractSection('budget', 'Runway') || 'Précisez la durée de trésorerie visée.',
      assumptions: this.extractSection('budget', 'Hypothèses') || 'Ajoutez les hypothèses de croissance et de marge.',
    };
  }

  private buildPrintableDocument(tab: DocumentTab): string {
    const title = this.escapeHtml(this.documentTitles[tab]);
    const subtitle = this.escapeHtml(`${this.project?.title || 'Project'} · ${this.project?.sector || 'No sector'} · ${this.project?.stage || 'No stage'}`);
    const body = this.buildPrintableBody(tab);

    return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, "Segoe UI", Arial, sans-serif;
      color: #0f172a;
      background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      padding: 20px;
    }
    .cover {
      border-radius: 24px;
      padding: 24px;
      color: #fff;
      background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #0f766e 100%);
      margin-bottom: 18px;
    }
    .cover h1 { margin: 0 0 8px; font-size: 28px; letter-spacing: -0.04em; }
    .cover p { margin: 0; opacity: 0.92; }
    .meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0 20px; }
    .meta div, .card, .canvas-cell, .swot-card, .budget-card {
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      background: #fff;
      padding: 14px;
      box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
    }
    .meta span, .label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #64748b; margin-bottom: 6px; }
    .meta strong, .card strong, .budget-card strong { font-size: 16px; color: #0f172a; }
    .stack { display: grid; gap: 14px; }
    .card p, .swot-card p, .budget-card p, .canvas-cell p { margin: 0; line-height: 1.6; color: #334155; }
    .canvas-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .canvas-cell h3, .swot-card h3, .budget-card h3 { margin: 0 0 8px; font-size: 14px; }
    .canvas-cell.blue { background: linear-gradient(180deg, #eff6ff, #fff); }
    .canvas-cell.emerald { background: linear-gradient(180deg, #ecfdf5, #fff); }
    .canvas-cell.amber { background: linear-gradient(180deg, #fffbeb, #fff); }
    .canvas-cell.violet { background: linear-gradient(180deg, #f5f3ff, #fff); }
    .canvas-cell.rose { background: linear-gradient(180deg, #fff1f2, #fff); }
    .canvas-cell.orange { background: linear-gradient(180deg, #fff7ed, #fff); }
    .canvas-cell.cyan { background: linear-gradient(180deg, #ecfeff, #fff); }
    .canvas-cell.green { background: linear-gradient(180deg, #f0fdf4, #fff); }
    .canvas-cell.slate { background: linear-gradient(180deg, #f8fafc, #fff); }
    .swot-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .swot-card.emerald { background: linear-gradient(180deg, #f0fdf4, #fff); }
    .swot-card.rose { background: linear-gradient(180deg, #fff1f2, #fff); }
    .swot-card.blue { background: linear-gradient(180deg, #eff6ff, #fff); }
    .swot-card.amber { background: linear-gradient(180deg, #fffbeb, #fff); }
    .budget-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 14px; }
    .budget-card { min-height: 120px; }
    .budget-card .value { font-size: 24px; font-weight: 800; letter-spacing: -0.03em; }
    ul { margin: 0; padding-left: 18px; }
    li { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="page">
    <div class="cover">
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>
    ${body}
  </div>
</body>
</html>`;
  }

  private buildPrintableBody(tab: DocumentTab): string {
    if (tab === 'pitch') {
      const data = this.getPitchPreview();
      return `
        <div class="meta">
          <div><span>Secteur</span><strong>${this.escapeHtml(this.project?.sector || 'À préciser')}</strong></div>
          <div><span>Stage</span><strong>${this.escapeHtml(this.project?.stage || 'À préciser')}</strong></div>
          <div><span>Budget</span><strong>${this.escapeHtml(this.getBudgetPreview().budget)}</strong></div>
        </div>
        <div class="stack">
          <div class="card"><span class="label">Problème</span><p>${this.escapeHtml(data.problem).replace(/\n/g, '<br>')}</p></div>
          <div class="card"><span class="label">Solution</span><p>${this.escapeHtml(data.solution).replace(/\n/g, '<br>')}</p></div>
          <div class="card"><span class="label">Marché & Traction</span><p>${this.escapeHtml(data.market).replace(/\n/g, '<br>')}</p></div>
          <div class="card"><span class="label">Modèle de revenu</span><p>${this.escapeHtml(data.model).replace(/\n/g, '<br>')}</p></div>
          <div class="card"><span class="label">Équipe</span><p>${this.escapeHtml(data.team).replace(/\n/g, '<br>')}</p></div>
        </div>`;
    }

    if (tab === 'bmc') {
      const blocks = this.getBmcPreview();
      return `
        <div class="canvas-grid">
          ${blocks.map((block) => `
            <div class="canvas-cell ${block.tone}">
              <h3>${this.escapeHtml(block.label)}</h3>
              <p>${this.escapeHtml(block.value).replace(/\n/g, '<br>')}</p>
            </div>
          `).join('')}
        </div>`;
    }

    if (tab === 'swot') {
      const blocks = this.getSwotPreview();
      return `
        <div class="swot-grid">
          ${blocks.map((block) => `
            <div class="swot-card ${block.tone}">
              <h3>${this.escapeHtml(block.label)}</h3>
              <p>${this.escapeHtml(block.value).replace(/\n/g, '<br>')}</p>
            </div>
          `).join('')}
        </div>`;
    }

    const data = this.getBudgetPreview();
    return `
      <div class="budget-grid">
        <div class="budget-card"><span class="label">Budget estimé</span><div class="value">${this.escapeHtml(data.budget)}</div></div>
        <div class="budget-card"><span class="label">CAPEX</span><p>${this.escapeHtml(data.capex).replace(/\n/g, '<br>')}</p></div>
        <div class="budget-card"><span class="label">OPEX</span><p>${this.escapeHtml(data.opex).replace(/\n/g, '<br>')}</p></div>
        <div class="budget-card"><span class="label">Runway</span><p>${this.escapeHtml(data.runway).replace(/\n/g, '<br>')}</p></div>
      </div>
      <div class="card"><span class="label">Hypothèses</span><p>${this.escapeHtml(data.assumptions).replace(/\n/g, '<br>')}</p></div>`;
  }

  private extractSection(tab: DocumentTab, heading: string): string {
    const draft = this.normalizeDraftForParsing(this.documentDrafts[tab] || '');
    const pattern = new RegExp(`(?:^|\\n)#{1,3}\\s*${this.escapeRegExp(heading)}\\s*\\n([\\s\\S]*?)(?=\\n#{1,3}\\s*[^\\n]+\\n|$)`, 'i');
    const match = draft.match(pattern);
    return match ? this.normalizeText(match[1]) : '';
  }

  private extractBulletValue(tab: DocumentTab, label: string): string {
    const draft = this.normalizeDraftForParsing(this.documentDrafts[tab] || '');
    const lines = draft.split(/\r?\n/);
    const normalizedLabel = label.toLowerCase();
    for (const line of lines) {
      const normalizedLine = line.toLowerCase();
      if (normalizedLine.includes(normalizedLabel) && normalizedLine.includes(':')) {
        return this.normalizeText(line.split(':').slice(1).join(':'));
      }
    }
    return this.extractSection(tab, label);
  }

  private normalizeDraftForParsing(value: string): string {
    return value
      .replace(/\r/g, '\n')
      .replace(/\s*##\s*/g, '\n## ')
      .replace(/\s*#\s*/g, '\n# ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  private normalizeText(value: string): string {
    return value
      .replace(/^[-*\s]+/gm, '')
      .replace(/\s+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  private escapeHtml(value: string): string {
    return (value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private readFileAsText(file: File): Promise<{ name: string; content: string; kind?: string; uploadedAt: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          kind: file.type || 'text',
          content: String(reader.result || '').slice(0, 10000),
          uploadedAt: new Date().toISOString(),
        });
      };
      reader.onerror = () => reject(new Error('read_error'));
      reader.readAsText(file);
    });
  }

  private buildWelcomeMessage(project: Project): string {
    if (this.isInvestor) {
      return `Bienvenue dans la Data Room de ${project.title}. Je suis votre Analyste IA. Demandez-moi une évaluation des risques ou du modèle financier sans modifier le document original.`;
    }
    if (this.isMentor) {
      return `Mode Coaching actif pour ${project.title}. Utilisez-moi pour générer des retours constructifs et challenger le fondateur.`;
    }
    return [
      `Je peux transformer ${project.title} en document AI exploitable.`,
      'Donne-moi une intention, un angle métier ou une section a reformuler et je mets a jour le brouillon.',
      'Tu peux aussi ajouter des documents pour enrichir le contexte.',
    ].join(' ');
  }

  private buildDefaultDraft(project: Project, tab: DocumentTab): string {
    if (tab === 'pitch') {
      return [
        `# ${project.title} - Pitch`,
        '',
        '## Problème',
        'À définir.',
        '',
        '## Solution',
        project.description || 'À définir.',
        '',
        '## Marché & Traction',
        '- Secteur: ' + (project.sector || 'À préciser'),
        '- Stade: ' + (project.stage || 'À préciser'),
      ].join('\n');
    }
    if (tab === 'bmc') {
      return `# ${project.title} - Business Model Canvas\n\n- Segments de clientèle:\n- Proposition de valeur:\n- Canaux:\n- Relations clients:\n- Flux de revenus: ${project.revenueModel || ''}\n- Ressources clés:\n- Activités clés:\n- Partenaires clés:\n- Structure de coûts:`;
    }
    if (tab === 'swot') {
      return `# Analyse SWOT - ${project.title}\n\n## Forces\n\n## Faiblesses\n\n## Opportunités\n\n## Menaces`;
    }
    if (tab === 'budget') {
      return `# Plan Financier - ${project.title}\n\nBudget estimé: ${project.budget || 0} MAD\n\n## CAPEX\n\n## OPEX\n\n## Runway`;
    }
    return '';
  }

  private buildDocumentContextFromFiles(docs: EntrepreneurPlaygroundDocument[]): string {
    return docs
      .map((doc) => `## ${doc.name}\n${doc.content.slice(0, 1200)}`)
      .join('\n\n')
      .slice(0, 4000);
  }
}
