import { Component, OnInit } from '@angular/core';
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
    private projectService: GestionProjetsService
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
        this.loadPersistedDocuments(project);
      },
      error: () => {
        this.loadingProject = false;
        this.error = 'Impossible de charger le projet pour le playground.';
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
      },
      error: () => {
        // Fallback to default drafts if loading fails
        this.documentDrafts['pitch'] = this.buildDefaultDraft(project, 'pitch');
        this.documentDrafts['bmc'] = this.buildDefaultDraft(project, 'bmc');
        this.documentDrafts['swot'] = this.buildDefaultDraft(project, 'swot');
        this.documentDrafts['budget'] = this.buildDefaultDraft(project, 'budget');
        this.loadingProject = false;
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
      },
      error: () => alert('Erreur lors de l\'enregistrement.')
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
      },
      error: (err) => {
        console.error('Playground error:', err);
        this.error = 'Le copilote OpenRouter est indisponible pour le moment. Mode local actif: le brouillon reste editable.';
        this.loading = false;
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
