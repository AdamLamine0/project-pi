import { Component, inject, signal, ChangeDetectionStrategy, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ProjectService } from "../../core/services/project.service";
import { BmcViewComponent, BMCData } from "./bmc-view.component";
import { SwotViewComponent, SWOTData } from "./swot-view.component";

const ML = "http://localhost:8001/api/ml";
type Tab = "bmc" | "swot" | "budget" | "pitch";
interface Message { role: "user" | "assistant"; content: string; type?: "feedback" | "score" | "normal"; }

@Component({
  selector: "app-playground",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BmcViewComponent, SwotViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./playground.component.html"
})
export class PlaygroundComponent {
  @ViewChild("chatBox") chatBox!: ElementRef;
  private http = inject(HttpClient);
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);

  projects = signal<any[]>([]);
  selectedProjectId = "";
  selectedProject = signal<any>(null);
  messages = signal<Message[]>([]);
  userMessage = "";
  thinking = signal(false);
  error = signal("");
  uploadedFile = signal("");
  uploadedText = signal("");
  uploadedAnalysis = signal<any>(null);
  uploading = signal(false);
  activeTab = signal<Tab>("bmc");
  generating = signal(false);
  rawDocs: Record<Tab, any> = { bmc: null, swot: null, budget: null, pitch: null };

  docTabs = [
    { id: "bmc" as Tab, label: "BMC" },
    { id: "swot" as Tab, label: "SWOT" },
    { id: "budget" as Tab, label: "Budget" },
    { id: "pitch" as Tab, label: "Pitch Deck" },
  ];

  suggestions = [
    "Generate my Business Model Canvas",
    "Analyze my SWOT",
    "Create a budget plan",
    "Build my pitch deck",
    "Give feedback on my uploaded document",
    "What are my main risks?",
  ];

  constructor() {
    this.projectService.listProjects().subscribe({ next: (list) => this.projects.set(list), error: () => {} });
  }

  hasDoc(tab: Tab | string): boolean { return !!this.rawDocs[tab as Tab]; }
  getTabLabel(tab: Tab | string): string { return this.docTabs.find(t => t.id === tab)?.label ?? String(tab); }
  getTabEmoji(tab: Tab | string): string { const m: Record<string,string> = { bmc:"", swot:"", budget:"", pitch:"" }; return m[String(tab)] ?? ""; }
  getTabDescription(tab: Tab | string): string { const m: Record<string,string> = { bmc:"Generate a visual 9-block Business Model Canvas", swot:"Analyze Strengths, Weaknesses, Opportunities and Threats", budget:"Create a financial plan with CAPEX, OPEX and runway", pitch:"Build a structured pitch deck slide by slide" }; return m[String(tab)] ?? ""; }

  bmcData(): BMCData | null {
    const d = this.rawDocs.bmc; if (!d) return null;
    const p = (v: any) => Array.isArray(v) ? v.filter(Boolean) : typeof v === "string" ? v.split("\n").filter(Boolean) : [];
    return { keyPartners: p(d.key_partners??d.keyPartners??[]), keyActivities: p(d.key_activities??d.keyActivities??[]), keyResources: p(d.key_resources??d.keyResources??[]), valueProposition: p(d.value_proposition??d.valuePropositions??d.valueProposition??[]), customerRelationships: p(d.customer_relationships??d.customerRelationships??[]), channels: p(d.channels??[]), customerSegments: p(d.customer_segments??d.customerSegments??[]), costStructure: p(d.cost_structure??d.costStructure??[]), revenueStreams: p(d.revenue_streams??d.revenueStreams??[]) };
  }

  swotData(): SWOTData | null {
    const d = this.rawDocs.swot; if (!d) return null;
    const p = (v: any) => Array.isArray(v) ? v.filter(Boolean) : typeof v === "string" ? v.split("\n").filter(Boolean) : [];
    return { strengths: p(d.strengths??[]), weaknesses: p(d.weaknesses??[]), opportunities: p(d.opportunities??[]), threats: p(d.threats??[]) };
  }

  budgetText(): string { const d = this.rawDocs.budget; if (!d) return ""; return d.document_draft ?? d.assistant_message ?? ""; }
  budgetKPIs() { const d = this.rawDocs.budget; if (!d) return []; return [{ label:"Score", value: d.overall_score ? d.overall_score+"/100" : "" }, { label:"Mode", value: d.mode ?? "AI" }, { label:"Gaps", value: d.gaps?.length ?? "" }]; }

  pitchSlides() {
    const d = this.rawDocs.pitch; if (!d) return [];
    const pitch = d.pitch ?? d;
    if (typeof pitch === "string") return pitch.split("\n\n").filter(Boolean).map((b: string, i: number) => { const lines = b.split("\n"); return { title: lines[0]?.replace(/^#+\s*/,"") || "Slide "+(i+1), content: lines.slice(1).join(" ").trim() }; });
    if (typeof pitch === "object" && !Array.isArray(pitch)) return Object.entries(pitch).filter(([k]) => k !== "success" && k !== "startup_name" && k !== "raw_response").map(([k,v]) => ({ title: k.replace(/_/g," "), content: Array.isArray(v) ? (v as any[]).join("  ") : String(v) }));
    return [];
  }

  onProjectChange(id: string) {
    const p = this.projects().find(proj => String(proj.id) === id);
    this.selectedProject.set(p ?? null);
  }

  validateMessage(msg: string): string | null {
    if (!msg || msg.trim().length < 3) return "Message too short (min 3 characters)";
    if (msg.trim().length > 1000) return "Message too long (max 1000 characters)";
    if (/^(.)\1{10,}$/.test(msg.trim())) return "Please enter a meaningful message";
    return null;
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) { this.error.set("Only PDF files are supported"); return; }
    if (file.size > 10 * 1024 * 1024) { this.error.set("File too large (max 10MB)"); return; }
    this.uploading.set(true); this.uploadedFile.set(file.name); this.error.set("");
    const fd = new FormData(); fd.append("file", file);
    this.http.post<any>(${ML}/documents/pdf/analyze, fd).subscribe({
      next: (res) => {
        this.uploadedAnalysis.set(res?.analysis ?? null);
        const a = res?.analysis;
        const text = res?.text ?? "";
        this.uploadedText.set(text);
        this.uploading.set(false);
        if (a) {
          const msg = this.formatAnalysis(file.name, a);
          this.messages.update(m => [...m, { role: "assistant", content: msg, type: "feedback" }]);
        } else {
          this.http.post<any>(${ML}/documents/pdf/extract, fd).subscribe({
            next: (r2) => { this.uploadedText.set(r2?.text ?? ""); this.uploading.set(false); this.messages.update(m => [...m, { role: "assistant", content:  "" uploaded ( pages). Ask me to analyze it or generate documents based on it. }]); this.scrollChat(); },
            error: () => { this.uploading.set(false); this.error.set("Could not read PDF."); }
          });
        }
        this.scrollChat();
      },
      error: () => { this.uploading.set(false); this.error.set("Could not analyze PDF. Make sure ML service is running."); }
    });
  }

  private formatAnalysis(filename: string, a: any): string {
    const lines: string[] = [ Analysis of "", ""];
    if (a.summary) lines.push( Summary: , "");
    if (a.strengths?.length) { lines.push(" Strengths:"); a.strengths.forEach((s: string) => lines.push(   )); lines.push(""); }
    if (a.weaknesses?.length) { lines.push(" Weaknesses:"); a.weaknesses.forEach((w: string) => lines.push(   )); lines.push(""); }
    if (a.missing_elements?.length) { lines.push(" Missing elements:"); a.missing_elements.forEach((m: string) => lines.push(   )); lines.push(""); }
    if (a.improvement_suggestions?.length) { lines.push(" Suggestions:"); a.improvement_suggestions.forEach((s: string) => lines.push(   )); }
    return lines.join("\n");
  }

  clearFile() { this.uploadedFile.set(""); this.uploadedText.set(""); this.uploadedAnalysis.set(null); }

  sendSuggestion(s: string) { this.userMessage = s; this.send(); }

  send() {
    const msg = this.userMessage.trim();
    const validationError = this.validateMessage(msg);
    if (validationError) { this.error.set(validationError); return; }
    if (this.thinking()) return;

    this.messages.update(m => [...m, { role: "user", content: msg }]);
    this.userMessage = ""; this.thinking.set(true); this.error.set(""); this.scrollChat();

    const lower = msg.toLowerCase();

    // Only trigger doc generation for explicit generation requests, not feedback
    const isFeedbackRequest = lower.includes("feedback") || lower.includes("analyze") || lower.includes("review") || lower.includes("analyse");
    const isGenerateRequest = lower.includes("generat") || lower.includes("creat") || lower.includes("build") || lower.includes("make");

    if (!isFeedbackRequest && isGenerateRequest) {
      if (lower.includes("bmc") || lower.includes("business model") || lower.includes("canvas")) { this.generateDoc("bmc"); return; }
      if (lower.includes("swot")) { this.generateDoc("swot"); return; }
      if (lower.includes("budget") || lower.includes("financial") || lower.includes("capex")) { this.generateDoc("budget"); return; }
      if (lower.includes("pitch")) { this.generateDoc("pitch"); return; }
    }

    const project = this.selectedProject();
    const body: any = {
      userMessage: msg,
      conversation: this.messages().slice(0,-1).map(m => ({ role: m.role, content: m.content })),
      projectId: Number(this.selectedProjectId) || 0,
      title: project?.title ?? "My Startup",
      description: project?.description ?? "",
      sector: project?.sector ?? "",
      stage: project?.stage ?? "",
      bmc: this.rawDocs.bmc ? JSON.stringify(this.rawDocs.bmc) : "",
      swot: this.rawDocs.swot ? JSON.stringify(this.rawDocs.swot) : "",
    };
    if (this.uploadedText()) body.documents = [{ name: this.uploadedFile(), kind: "pdf", content: this.uploadedText().slice(0, 5000) }];

    this.http.post<any>(${ML}/projects//playground, body).subscribe({
      next: (res) => {
        const score = res?.overall_score;
        const reply = res?.assistant_message ?? "Done.";
        const formatted = score != null ? this.formatPlaygroundResponse(res) : reply;
        this.messages.update(m => [...m, { role: "assistant", content: formatted }]);
        this.thinking.set(false); this.scrollChat();
      },
      error: () => { this.error.set("ML service unavailable on port 8001."); this.thinking.set(false); }
    });
  }

  private formatPlaygroundResponse(res: any): string {
    const lines: string[] = [];
    if (res.overall_score != null) lines.push( Score: /100, "");
    if (res.strengths?.length) { lines.push(" Strengths:"); res.strengths.forEach((s: string) => lines.push(   )); lines.push(""); }
    if (res.gaps?.length) { lines.push(" Areas to improve:"); res.gaps.forEach((g: string) => lines.push(   )); lines.push(""); }
    if (res.improvements?.length) { lines.push(" Next steps:"); res.improvements.slice(0,3).forEach((i: string) => lines.push(   )); }
    if (!lines.length) lines.push(res.assistant_message ?? "Analysis complete.");
    return lines.join("\n");
  }

  generateDoc(type: Tab) {
    const project = this.selectedProject();
    const name = project?.title ?? "My Startup";
    const desc = project?.description ?? "";
    const sector = project?.sector ?? "";
    const stage = project?.stage ?? "";

    if (!name || name.length < 2) { this.error.set("Please select a project or enter a valid project name first"); this.thinking.set(false); return; }

    this.activeTab.set(type); this.generating.set(true); this.thinking.set(false);
    let endpoint = ""; let body: any = {};
    if (type === "bmc") { endpoint = ${ML}/documents/bmc/generate; body = { startup_name: name, description: desc, sector, stage }; }
    else if (type === "swot") { endpoint = ${ML}/documents/swot/generate; body = { startup_name: name, description: desc, market_context: sector }; }
    else if (type === "pitch") { endpoint = ${ML}/documents/pitch/generate; body = { startup_name: name, description: desc, sector, team_size: project?.teamSize ?? "1", target_market: sector }; }
    else { endpoint = ${ML}/projects//playground; body = { userMessage: "Generate a detailed budget with CAPEX, OPEX, runway and revenue projections", conversation: [], projectId: Number(this.selectedProjectId)||0, title: name, description: desc, sector, stage }; }

    this.http.post<any>(endpoint, body).subscribe({
      next: (res) => {
        if (type === "bmc") this.rawDocs.bmc = res?.bmc ?? res;
        else if (type === "swot") this.rawDocs.swot = res?.swot ?? res;
        else if (type === "pitch") this.rawDocs.pitch = res;
        else this.rawDocs.budget = res;
        this.generating.set(false);
        this.messages.update(m => [...m, { role: "assistant", content:   generated! View it in the right panel. }]);
        this.scrollChat();
      },
      error: () => { this.generating.set(false); this.error.set("Failed to generate. Is the ML service running on port 8001?"); this.thinking.set(false); }
    });
  }

  exportPDF() {
    const tab = this.activeTab(); const label = this.getTabLabel(tab);
    const el = document.querySelector(".doc-export-area");
    if (!el) { window.print(); return; }
    const w = window.open("","_blank"); if (!w) return;
    w.document.write(<html><head><title> - Export</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#111;font-size:13px;}h2{font-size:18px;margin-bottom:16px;}h3,h4{margin:8px 0 4px;}ul{margin:0;padding-left:18px;}li{margin:3px 0;}.grid{display:grid;gap:6px;}.cell{border:1px solid #ddd;border-radius:6px;padding:10px;}.swot-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}.swot-cell{border-radius:8px;padding:14px;}.green{background:#f0fdf4;border:2px solid #4ade80;}.red{background:#fef2f2;border:2px solid #f87171;}.blue{background:#eff6ff;border:2px solid #60a5fa;}.orange{background:#fff7ed;border:2px solid #fb923c;}</style></head><body><h2></h2></body></html>);
    w.document.close(); w.focus(); setTimeout(() => { w.print(); w.close(); }, 600);
  }

  private scrollChat() { setTimeout(() => { if (this.chatBox?.nativeElement) this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight; }, 50); }
}