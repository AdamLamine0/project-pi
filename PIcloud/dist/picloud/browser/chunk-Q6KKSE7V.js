import {
  UserService
} from "./chunk-RUCCUJGV.js";
import {
  authGuard
} from "./chunk-KJFIX64G.js";
import {
  ActivatedRoute,
  AuthService,
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClient,
  HttpHeaders,
  Location,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  Router,
  RouterLink,
  RouterModule,
  SelectControlValueAccessor,
  Validators,
  catchError,
  forkJoin,
  of,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBGQ7VAX.js";

// src/app/models/legal-procedure.model.ts
var PROCEDURE_TYPE_LABELS = {
  SARL: "Creation SARL",
  SUARL: "Creation SUARL",
  LABEL_STARTUP: "Label Startup",
  PI: "Propriete Intellectuelle",
  FISCALITE: "Fiscalite",
  CONFORMITE: "Conformite",
  AUTRE: "Autre procedure"
};
var PROCEDURE_TYPE_DESCRIPTIONS = {
  SARL: "Creation d'une Societe a Responsabilite Limitee.",
  SUARL: "Creation d'une Societe Unipersonnelle a Responsabilite Limitee.",
  LABEL_STARTUP: "Obtention du label startup.",
  PI: "Protection de la propriete intellectuelle.",
  FISCALITE: "Assistance fiscale et demarches administratives.",
  CONFORMITE: "Verification de conformite juridique.",
  AUTRE: "Autre procedure juridique."
};
var STATUS_LABELS = {
  BROUILLON: "Brouillon",
  EN_COURS: "En cours",
  EN_ATTENTE_EXPERT: "En attente expert",
  COMPLETE: "Complete",
  REFUSE: "Refuse"
};

// src/app/modules/legal/pages/procedure-home/procedure-home.component.ts
function ProcedureHomeComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "a", 13);
    \u0275\u0275text(2, " Voir mes dossiers ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 14);
    \u0275\u0275text(4, " Cr\xE9er un dossier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function ProcedureHomeComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "a", 15);
    \u0275\u0275text(2, " Dossiers \xE0 traiter ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function ProcedureHomeComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "p", 16);
    \u0275\u0275text(2, " Connectez-vous en tant qu'entrepreneur pour cr\xE9er un dossier. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function ProcedureHomeComponent_div_19_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function ProcedureHomeComponent_div_19_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const type_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createProcedure(type_r2));
    });
    \u0275\u0275text(1, " Cr\xE9er un dossier ");
    \u0275\u0275elementEnd();
  }
}
function ProcedureHomeComponent_div_19_a_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 29);
    \u0275\u0275text(1, " Mes dossiers ");
    \u0275\u0275elementEnd();
  }
}
function ProcedureHomeComponent_div_19_a_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 15);
    \u0275\u0275text(1, " Voir les dossiers assign\xE9s ");
    \u0275\u0275elementEnd();
  }
}
function ProcedureHomeComponent_div_19_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, " Disponible pour les entrepreneurs ");
    \u0275\u0275elementEnd();
  }
}
function ProcedureHomeComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "span", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "p", 22);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 23);
    \u0275\u0275template(12, ProcedureHomeComponent_div_19_button_12_Template, 2, 0, "button", 24)(13, ProcedureHomeComponent_div_19_a_13_Template, 2, 0, "a", 25)(14, ProcedureHomeComponent_div_19_a_14_Template, 2, 0, "a", 26)(15, ProcedureHomeComponent_div_19_span_15_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const type_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getProcedureIcon(type_r2));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.labels[type_r2]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(type_r2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.descriptions[type_r2]);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.auth.isEntrepreneur());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.auth.isEntrepreneur());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.auth.isExpert());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.auth.isEntrepreneur() && !ctx_r2.auth.isExpert());
  }
}
var ProcedureHomeComponent = class _ProcedureHomeComponent {
  router;
  auth;
  procedureTypes = [
    "SARL",
    "SUARL",
    "LABEL_STARTUP",
    "PI",
    "FISCALITE",
    "CONFORMITE",
    "AUTRE"
  ];
  labels = PROCEDURE_TYPE_LABELS;
  descriptions = PROCEDURE_TYPE_DESCRIPTIONS;
  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }
  ngOnInit() {
    if (this.auth.isExpert()) {
      this.router.navigate(["/legal-procedures/expert/assigned"]);
    }
  }
  createProcedure(type) {
    if (!this.auth.isEntrepreneur() && !this.auth.isAdmin()) {
      this.router.navigate(["/legal-procedures/expert/assigned"]);
      return;
    }
    this.router.navigate(["/legal-procedures/new"], { queryParams: { type } });
  }
  getProcedureIcon(type) {
    const icons = {
      SARL: "\u{1F3E2}",
      SUARL: "\u{1F3E2}",
      LABEL_STARTUP: "\u{1F680}",
      PI: "\u{1F4CB}",
      FISCALITE: "\u{1F4DD}",
      CONFORMITE: "\u2705",
      AUTRE: "\u{1F4C1}"
    };
    return icons[type] ?? "\u{1F4C1}";
  }
  static \u0275fac = function ProcedureHomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProcedureHomeComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProcedureHomeComponent, selectors: [["app-procedure-home"]], decls: 20, vars: 4, consts: [[1, "page-container"], [1, "hero", "mb-5"], [1, "hero-card"], [1, "hero-eyebrow"], [1, "hero-title"], [1, "hero-text"], [1, "hero-actions"], [4, "ngIf"], [1, "section-header", "mb-3"], [1, "section-title"], [1, "section-subtitle"], [1, "cards-grid"], ["class", "card-premium", 4, "ngFor", "ngForOf"], ["routerLink", "/legal-procedures/list", 1, "btn", "btn-primary-pro"], ["routerLink", "/legal-procedures/new", 1, "btn", "btn-soft"], ["routerLink", "/legal-procedures/expert/assigned", 1, "btn", "btn-primary-pro"], [1, "text-muted"], [1, "card-premium"], [1, "card-top", "d-flex", "align-items-center", "gap-3", "mb-2"], [1, "icon-tile", 2, "font-size", "24px"], [1, "card-title", "mb-0"], [1, "card-code", "text-muted", "small"], [1, "card-description"], [1, "card-actions", "d-flex", "gap-2", "mt-3"], ["class", "btn btn-primary-pro", 3, "click", 4, "ngIf"], ["class", "btn btn-soft", "routerLink", "/legal-procedures/list", 4, "ngIf"], ["class", "btn btn-primary-pro", "routerLink", "/legal-procedures/expert/assigned", 4, "ngIf"], ["class", "text-muted small", 4, "ngIf"], [1, "btn", "btn-primary-pro", 3, "click"], ["routerLink", "/legal-procedures/list", 1, "btn", "btn-soft"], [1, "text-muted", "small"]], template: function ProcedureHomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275text(4, "Module juridique");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 4);
      \u0275\u0275text(6, "Portail des proc\xE9dures juridiques");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, " Cr\xE9ez vos dossiers, d\xE9posez vos documents et suivez l'avancement de votre proc\xE9dure jusqu'\xE0 l'obtention du document final. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 6);
      \u0275\u0275template(10, ProcedureHomeComponent_ng_container_10_Template, 5, 0, "ng-container", 7)(11, ProcedureHomeComponent_ng_container_11_Template, 3, 0, "ng-container", 7)(12, ProcedureHomeComponent_ng_container_12_Template, 3, 0, "ng-container", 7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 8)(14, "h2", 9);
      \u0275\u0275text(15, "Proc\xE9dures disponibles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p", 10);
      \u0275\u0275text(17, "Choisissez la proc\xE9dure adapt\xE9e \xE0 votre projet.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 11);
      \u0275\u0275template(19, ProcedureHomeComponent_div_19_Template, 16, 8, "div", 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275property("ngIf", ctx.auth.isEntrepreneur());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.auth.isExpert());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.auth.isEntrepreneur() && !ctx.auth.isExpert());
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.procedureTypes);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProcedureHomeComponent, { className: "ProcedureHomeComponent", filePath: "src\\app\\modules\\legal\\pages\\procedure-home\\procedure-home.component.ts", lineNumber: 15 });
})();

// src/app/services/legal-procedure.service.ts
var LegalProcedureService = class _LegalProcedureService {
  http;
  base = "http://localhost:8090/api/legal-procedures";
  usersBase = "http://localhost:8090/api/users";
  constructor(http) {
    this.http = http;
  }
  userHeader(userId) {
    return { headers: new HttpHeaders({ "X-User-Id": String(userId) }) };
  }
  // ── ENTREPRENEUR ─────────────────────────────────────────────────────────────
  create(request, entrepreneurId) {
    return this.http.post(this.base, request, this.userHeader(entrepreneurId));
  }
  getMyProcedures(entrepreneurId) {
    return this.http.get(`${this.base}/my-procedures`, this.userHeader(entrepreneurId));
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  submit(id, entrepreneurId) {
    return this.http.post(`${this.base}/${id}/submit`, {}, this.userHeader(entrepreneurId));
  }
  deleteDraft(id, entrepreneurId) {
    return this.http.delete(`${this.base}/${id}`, this.userHeader(entrepreneurId));
  }
  // ── CHECKLIST & DOCUMENTS ────────────────────────────────────────────────────
  getChecklist(procedureId) {
    return this.http.get(`${this.base}/${procedureId}/checklist`);
  }
  /**
   * Dépose un fichier pour un item de la checklist.
   * expiresAt a été supprimé — ni le back ni le front ne l'utilisent plus.
   */
  uploadDocument(procedureId, requirementCode, file) {
    const formData = new FormData();
    formData.append("requirementCode", requirementCode);
    formData.append("file", file);
    return this.http.post(`${this.base}/${procedureId}/documents`, formData);
  }
  getDocuments(procedureId) {
    return this.http.get(`${this.base}/${procedureId}/documents`);
  }
  deleteDocument(procedureId, documentId) {
    return this.http.delete(`${this.base}/${procedureId}/documents/${documentId}`);
  }
  analyzeWithAi(procedureId) {
    return this.http.post(`${this.base}/${procedureId}/ai-analysis`, {});
  }
  askLegalChat(request) {
    return this.http.post(`${this.base}/ai-chat`, request);
  }
  // ── EXPERT ───────────────────────────────────────────────────────────────────
  getAssignedProcedures(expertId) {
    return this.http.get(`${this.base}/expert/assigned`, this.userHeader(expertId));
  }
  applyExpertDecision(id, request, expertId) {
    return this.http.post(`${this.base}/${id}/expert-decision`, request, this.userHeader(expertId));
  }
  // ── EXPERTS LIST ─────────────────────────────────────────────────────────────
  getExperts() {
    return this.http.get(`${this.usersBase}/experts`);
  }
  static \u0275fac = function LegalProcedureService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LegalProcedureService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LegalProcedureService, factory: _LegalProcedureService.\u0275fac, providedIn: "root" });
};

// src/app/modules/legal/pages/legal-procedure-list/legal-procedure-list.component.ts
var _c0 = (a0) => ["/legal-procedures", a0];
function LegalProcedureListComponent_option_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", s_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabels[s_r1]);
  }
}
function LegalProcedureListComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function LegalProcedureListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, "Chargement...");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureListComponent_table_16_tr_16_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function LegalProcedureListComponent_table_16_tr_16_button_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submit(p_r4.id));
    });
    \u0275\u0275text(1, " Soumettre ");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureListComponent_table_16_tr_16_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function LegalProcedureListComponent_table_16_tr_16_button_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteDraft(p_r4.id));
    });
    \u0275\u0275text(1, " Supprimer ");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureListComponent_table_16_tr_16_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1, " Voir remarque ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", p_r4.remark);
  }
}
function LegalProcedureListComponent_table_16_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 18);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 19)(14, "a", 20);
    \u0275\u0275text(15, " D\xE9tail ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, LegalProcedureListComponent_table_16_tr_16_button_16_Template, 2, 0, "button", 21)(17, LegalProcedureListComponent_table_16_tr_16_button_17_Template, 2, 0, "button", 22)(18, LegalProcedureListComponent_table_16_tr_16_span_18_Template, 2, 1, "span", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.projectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.procedureType);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getStatusClass(p_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusLabels[p_r4.status], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r4.completionRate, " %");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 10, p_r4.createdAt, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, p_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", p_r4.status === "BROUILLON");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r4.status === "BROUILLON");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r4.status === "REFUSE" && p_r4.remark);
  }
}
function LegalProcedureListComponent_table_16_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27);
    \u0275\u0275text(2, "Aucun dossier trouv\xE9.");
    \u0275\u0275elementEnd()();
  }
}
function LegalProcedureListComponent_table_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 15)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Projet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Progression");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Cr\xE9\xE9 le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, LegalProcedureListComponent_table_16_tr_16_Template, 19, 15, "tr", 16)(17, LegalProcedureListComponent_table_16_tr_17_Template, 3, 0, "tr", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.filteredProcedures);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filteredProcedures.length === 0);
  }
}
var LegalProcedureListComponent = class _LegalProcedureListComponent {
  service;
  router;
  auth;
  procedures = [];
  filteredProcedures = [];
  selectedStatus = "";
  loading = false;
  errorMessage = "";
  statuses = [
    "BROUILLON",
    "EN_COURS",
    "EN_ATTENTE_EXPERT",
    "COMPLETE",
    "REFUSE"
  ];
  statusLabels = STATUS_LABELS;
  userId;
  constructor(service, router, auth) {
    this.service = service;
    this.router = router;
    this.auth = auth;
    this.userId = this.auth.getUserId();
  }
  ngOnInit() {
    this.loadProcedures();
  }
  loadProcedures() {
    this.loading = true;
    this.errorMessage = "";
    this.service.getMyProcedures(this.userId).subscribe({
      next: (data) => {
        this.procedures = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur lors du chargement.";
        this.loading = false;
      }
    });
  }
  applyFilter() {
    this.filteredProcedures = this.selectedStatus ? this.procedures.filter((p) => p.status === this.selectedStatus) : [...this.procedures];
  }
  openCreate() {
    this.router.navigate(["/legal-procedures/new"]);
  }
  submit(id) {
    this.service.submit(id, this.userId).subscribe({
      next: () => this.loadProcedures(),
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur lors de la soumission.";
      }
    });
  }
  deleteDraft(id) {
    if (!confirm("Supprimer ce dossier en brouillon ?"))
      return;
    this.service.deleteDraft(id, this.userId).subscribe({
      next: () => this.loadProcedures(),
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur lors de la suppression.";
      }
    });
  }
  getStatusClass(status) {
    return `status-${status.toLowerCase().replace(/_/g, "-")}`;
  }
  static \u0275fac = function LegalProcedureListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LegalProcedureListComponent)(\u0275\u0275directiveInject(LegalProcedureService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LegalProcedureListComponent, selectors: [["app-legal-procedure-list"]], decls: 17, vars: 5, consts: [[1, "container", "py-4"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "btn", "btn-primary", 3, "click"], [1, "row", "mb-3"], [1, "col-md-4"], [1, "form-label"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-info", 4, "ngIf"], ["class", "table table-striped table-bordered", 4, "ngIf"], [3, "value"], [1, "alert", "alert-danger"], [1, "alert", "alert-info"], [1, "table", "table-striped", "table-bordered"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "badge", 3, "ngClass"], [1, "d-flex", "gap-2", "flex-wrap"], [1, "btn", "btn-sm", "btn-outline-primary", 3, "routerLink"], ["class", "btn btn-sm btn-success", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-outline-danger", 3, "click", 4, "ngIf"], ["class", "badge bg-warning text-dark", 3, "title", 4, "ngIf"], [1, "btn", "btn-sm", "btn-success", 3, "click"], [1, "btn", "btn-sm", "btn-outline-danger", 3, "click"], [1, "badge", "bg-warning", "text-dark", 3, "title"], ["colspan", "6", 1, "text-center", "text-muted"]], template: function LegalProcedureListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Mes dossiers juridiques");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function LegalProcedureListComponent_Template_button_click_4_listener() {
        return ctx.openCreate();
      });
      \u0275\u0275text(5, "+ Nouveau dossier");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "div", 4)(8, "label", 5);
      \u0275\u0275text(9, "Filtrer par statut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "select", 6);
      \u0275\u0275twoWayListener("ngModelChange", function LegalProcedureListComponent_Template_select_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
        return $event;
      });
      \u0275\u0275listener("change", function LegalProcedureListComponent_Template_select_change_10_listener() {
        return ctx.applyFilter();
      });
      \u0275\u0275elementStart(11, "option", 7);
      \u0275\u0275text(12, "Tous");
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, LegalProcedureListComponent_option_13_Template, 2, 2, "option", 8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(14, LegalProcedureListComponent_div_14_Template, 2, 1, "div", 9)(15, LegalProcedureListComponent_div_15_Template, 2, 0, "div", 10)(16, LegalProcedureListComponent_table_16_Template, 18, 2, "table", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.statuses);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink, DatePipe] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LegalProcedureListComponent, { className: "LegalProcedureListComponent", filePath: "src\\app\\modules\\legal\\pages\\legal-procedure-list\\legal-procedure-list.component.ts", lineNumber: 16 });
})();

// src/app/modules/legal/pages/legal-procedure-form/legal-procedure-form.component.ts
function LegalProcedureFormComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function LegalProcedureFormComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.successMessage);
  }
}
function LegalProcedureFormComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " Le nom du projet est obligatoire. ");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureFormComponent_option_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("value", type_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.procedureTypeLabels[type_r2], " ");
  }
}
function LegalProcedureFormComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " Veuillez choisir un type de proc\xE9dure. ");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureFormComponent_option_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const expert_r3 = ctx.$implicit;
    \u0275\u0275property("value", expert_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", expert_r3.fullName, " \u2014 ", expert_r3.email, " ");
  }
}
function LegalProcedureFormComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " Veuillez choisir un expert. ");
    \u0275\u0275elementEnd();
  }
}
var LegalProcedureFormComponent = class _LegalProcedureFormComponent {
  fb;
  service;
  route;
  router;
  location;
  auth;
  form;
  loading = false;
  errorMessage = "";
  successMessage = "";
  experts = [];
  procedureTypes = [
    "SARL",
    "SUARL",
    "LABEL_STARTUP",
    "PI",
    "FISCALITE",
    "CONFORMITE",
    "AUTRE"
  ];
  procedureTypeLabels = PROCEDURE_TYPE_LABELS;
  userId;
  constructor(fb, service, route, router, location, auth) {
    this.fb = fb;
    this.service = service;
    this.route = route;
    this.router = router;
    this.location = location;
    this.auth = auth;
    this.userId = this.auth.getUserId();
  }
  ngOnInit() {
    this.form = this.fb.group({
      projectName: ["", [Validators.required, Validators.maxLength(200)]],
      procedureType: ["", Validators.required],
      expertId: [null, Validators.required]
    });
    const typeFromQuery = this.route.snapshot.queryParamMap.get("type");
    if (typeFromQuery) {
      this.form.patchValue({ procedureType: typeFromQuery });
    }
    this.service.getExperts().subscribe({
      next: (data) => this.experts = data,
      error: () => this.errorMessage = "Impossible de charger la liste des experts."
    });
  }
  goBack() {
    this.location.back();
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage = "";
    this.successMessage = "";
    this.loading = true;
    const raw = this.form.getRawValue();
    this.service.create({
      projectName: raw.projectName,
      procedureType: raw.procedureType,
      expertId: Number(raw.expertId)
    }, this.userId).subscribe({
      next: (created) => {
        this.successMessage = "Dossier cr\xE9\xE9 avec succ\xE8s.";
        this.loading = false;
        setTimeout(() => this.router.navigate(["/legal-procedures", created.id]), 800);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur lors de la cr\xE9ation.";
        this.loading = false;
      }
    });
  }
  static \u0275fac = function LegalProcedureFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LegalProcedureFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(LegalProcedureService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(Location), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LegalProcedureFormComponent, selectors: [["app-legal-procedure-form"]], decls: 41, vars: 10, consts: [[1, "page-container"], [1, "page-header", "d-flex", "justify-content-between", "align-items-start", "mb-4"], [1, "page-title"], [1, "page-subtitle"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "card-custom"], [1, "form-section"], [3, "ngSubmit", "formGroup"], [1, "row", "g-4"], [1, "col-md-6"], [1, "form-label", "fw-semibold"], ["formControlName", "projectName", "placeholder", "Ex: Startup FinTech Tunis", 1, "form-control", "input-modern"], ["class", "text-danger small mt-1", 4, "ngIf"], ["formControlName", "procedureType", 1, "form-select", "select-modern"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "col-md-12"], ["formControlName", "expertId", 1, "form-select", "select-modern"], [1, "d-flex", "gap-2", "mt-4"], ["type", "submit", 1, "btn", "btn-primary-custom", 3, "disabled"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"], [1, "text-danger", "small", "mt-1"], [3, "value"]], template: function LegalProcedureFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Cr\xE9er un dossier juridique");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Renseignez les informations pour ouvrir votre dossier.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function LegalProcedureFormComponent_Template_button_click_7_listener() {
        return ctx.goBack();
      });
      \u0275\u0275text(8, "Retour");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, LegalProcedureFormComponent_div_9_Template, 2, 1, "div", 5)(10, LegalProcedureFormComponent_div_10_Template, 2, 1, "div", 6);
      \u0275\u0275elementStart(11, "div", 7)(12, "div", 8)(13, "form", 9);
      \u0275\u0275listener("ngSubmit", function LegalProcedureFormComponent_Template_form_ngSubmit_13_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(14, "div", 10)(15, "div", 11)(16, "label", 12);
      \u0275\u0275text(17, "Nom du projet *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "input", 13);
      \u0275\u0275template(19, LegalProcedureFormComponent_div_19_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 11)(21, "label", 12);
      \u0275\u0275text(22, "Type de proc\xE9dure *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "select", 15)(24, "option", 16);
      \u0275\u0275text(25, "S\xE9lectionner");
      \u0275\u0275elementEnd();
      \u0275\u0275template(26, LegalProcedureFormComponent_option_26_Template, 2, 2, "option", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275template(27, LegalProcedureFormComponent_div_27_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 18)(29, "label", 12);
      \u0275\u0275text(30, "Expert juridique *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "select", 19)(32, "option", 16);
      \u0275\u0275text(33, "S\xE9lectionner un expert");
      \u0275\u0275elementEnd();
      \u0275\u0275template(34, LegalProcedureFormComponent_option_34_Template, 2, 3, "option", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275template(35, LegalProcedureFormComponent_div_35_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div", 20)(37, "button", 21);
      \u0275\u0275text(38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "button", 4);
      \u0275\u0275listener("click", function LegalProcedureFormComponent_Template_button_click_39_listener() {
        return ctx.goBack();
      });
      \u0275\u0275text(40, " Annuler ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_5_0;
      let tmp_7_0;
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("projectName")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("projectName")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.procedureTypes);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.form.get("procedureType")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("procedureType")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.experts);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.form.get("expertId")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("expertId")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Cr\xE9ation..." : "Cr\xE9er le dossier", " ");
    }
  }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LegalProcedureFormComponent, { className: "LegalProcedureFormComponent", filePath: "src\\app\\modules\\legal\\pages\\legal-procedure-form\\legal-procedure-form.component.ts", lineNumber: 14 });
})();

// src/app/modules/legal/pages/legal-procedure-detail/legal-procedure-detail.component.ts
function LegalProcedureDetailComponent_div_0_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function LegalProcedureDetailComponent_div_0_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.successMessage);
  }
}
function LegalProcedureDetailComponent_div_0_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16);
    \u0275\u0275text(2, "Soumis le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, p_r3.submittedAt, "dd/MM/yyyy HH:mm"));
  }
}
function LegalProcedureDetailComponent_div_0_div_39_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, " Le dossier est en attente d'analyse ou l'analyse automatique n'a pas encore mis a jour le statut. ");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureDetailComponent_div_0_div_39_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.aiRemarkSummary);
  }
}
function LegalProcedureDetailComponent_div_0_div_39_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function LegalProcedureDetailComponent_div_0_div_39_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runAiAnalysis());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.analyzingAi);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.analyzingAi ? "Analyse..." : "Relancer IA", " ");
  }
}
function LegalProcedureDetailComponent_div_0_div_39_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40);
    \u0275\u0275text(3, "Decision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39)(7, "div", 40);
    \u0275\u0275text(8, "Statut applique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 41);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 39)(12, "div", 40);
    \u0275\u0275text(13, "Gemini");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 41);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.aiResult.decision);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.statusLabels[ctx_r1.aiResult.appliedStatus]);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.aiResult.llmAvailable ? "Disponible" : "Indisponible");
  }
}
function LegalProcedureDetailComponent_div_0_div_39_div_9_div_3_li_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const finding_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(finding_r5);
  }
}
function LegalProcedureDetailComponent_div_0_div_39_div_9_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275template(4, LegalProcedureDetailComponent_div_0_div_39_div_9_div_3_li_4_Template, 2, 1, "li", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r6.document);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", group_r6.findings);
  }
}
function LegalProcedureDetailComponent_div_0_div_39_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43);
    \u0275\u0275text(2, "Documents a corriger");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, LegalProcedureDetailComponent_div_0_div_39_div_9_div_3_Template, 5, 2, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.aiFindingGroups);
  }
}
function LegalProcedureDetailComponent_div_0_div_39_div_10_li_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const finding_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(finding_r7);
  }
}
function LegalProcedureDetailComponent_div_0_div_39_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "strong");
    \u0275\u0275text(2, "Incoherences detectees");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 49);
    \u0275\u0275template(4, LegalProcedureDetailComponent_div_0_div_39_div_10_li_4_Template, 2, 1, "li", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.aiResult.llmFindings);
  }
}
function LegalProcedureDetailComponent_div_0_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 32)(2, "div")(3, "h2", 13);
    \u0275\u0275text(4, "Analyse IA");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, LegalProcedureDetailComponent_div_0_div_39_p_5_Template, 2, 0, "p", 22)(6, LegalProcedureDetailComponent_div_0_div_39_p_6_Template, 2, 1, "p", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, LegalProcedureDetailComponent_div_0_div_39_button_7_Template, 2, 2, "button", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, LegalProcedureDetailComponent_div_0_div_39_div_8_Template, 16, 3, "div", 34)(9, LegalProcedureDetailComponent_div_0_div_39_div_9_Template, 4, 1, "div", 35)(10, LegalProcedureDetailComponent_div_0_div_39_div_10_Template, 5, 1, "div", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", p_r3.status === "EN_COURS" && !p_r3.remark);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.aiRemarkSummary);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r3.status === "EN_COURS");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.aiResult);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.aiFindingGroups.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.aiResult == null ? null : ctx_r1.aiResult.llmFindings == null ? null : ctx_r1.aiResult.llmFindings.length);
  }
}
function LegalProcedureDetailComponent_div_0_p_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", ctx_r1.checklist.uploadedCount, " / ", ctx_r1.checklist.requiredCount, " documents obligatoires d\xE9pos\xE9s (", ctx_r1.checklist.completionPercentage, "%) ");
  }
}
function LegalProcedureDetailComponent_div_0_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "div", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r1.checklist.completionPercentage, "%");
  }
}
function LegalProcedureDetailComponent_div_0_div_47_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "Obligatoire");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureDetailComponent_div_0_div_47_div_1_div_9_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function LegalProcedureDetailComponent_div_0_div_47_div_1_div_9_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const item_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteDocument(item_r9.documentId));
    });
    \u0275\u0275text(1, " Supprimer ");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureDetailComponent_div_0_div_47_div_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "a", 64);
    \u0275\u0275text(2, " \u{1F4CE} Voir le document ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, LegalProcedureDetailComponent_div_0_div_47_div_1_div_9_button_3_Template, 2, 0, "button", 65);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("href", item_r9.fileUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.canEditDocuments && item_r9.documentId);
  }
}
function LegalProcedureDetailComponent_div_0_div_47_div_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67)(1, "input", 68);
    \u0275\u0275listener("change", function LegalProcedureDetailComponent_div_0_div_47_div_1_div_10_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event, item_r9.code));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 69);
    \u0275\u0275listener("click", function LegalProcedureDetailComponent_div_0_div_47_div_1_div_10_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r10);
      const item_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.uploadDocument(item_r9));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.selectedFiles[item_r9.code] || ctx_r1.uploadingCode === item_r9.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.uploadingCode === item_r9.code ? "..." : item_r9.uploaded ? "Remplacer" : "D\xE9poser", " ");
  }
}
function LegalProcedureDetailComponent_div_0_div_47_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 54)(2, "div", 55);
    \u0275\u0275element(3, "span", 56);
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, LegalProcedureDetailComponent_div_0_div_47_div_1_span_6_Template, 2, 0, "span", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 58);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, LegalProcedureDetailComponent_div_0_div_47_div_1_div_9_Template, 4, 2, "div", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, LegalProcedureDetailComponent_div_0_div_47_div_1_div_10_Template, 4, 2, "div", 60);
    \u0275\u0275elementStart(11, "span", 61);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("checklist-ok", item_r9.uploaded)("checklist-miss", !item_r9.uploaded);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("dot-ok", item_r9.uploaded)("dot-miss", !item_r9.uploaded);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r9.required);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r9.uploaded && item_r9.fileUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEditDocuments);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r9.uploaded ? "check-tag-ok" : "check-tag-miss");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r9.uploaded ? "\u2713 D\xE9pos\xE9" : "\u2717 Manquant", " ");
  }
}
function LegalProcedureDetailComponent_div_0_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, LegalProcedureDetailComponent_div_0_div_47_div_1_Template, 13, 15, "div", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.checklist.items);
  }
}
function LegalProcedureDetailComponent_div_0_ng_template_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "p");
    \u0275\u0275text(2, "Aucune exigence trouv\xE9e pour ce type de proc\xE9dure.");
    \u0275\u0275elementEnd()();
  }
}
function LegalProcedureDetailComponent_div_0_div_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71)(1, "button", 72);
    \u0275\u0275listener("click", function LegalProcedureDetailComponent_div_0_div_50_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitProcedure());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.allRequiredUploaded);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.allRequiredUploaded ? p_r3.status === "REFUSE" ? "Resoumettre le dossier" : "Soumettre le dossier" : "D\xE9posez tous les documents obligatoires", " ");
  }
}
function LegalProcedureDetailComponent_div_0_div_51_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Genere le ", \u0275\u0275pipeBind2(2, 1, p_r3.finalDocumentGeneratedAt, "dd/MM/yyyy HH:mm"), " ");
  }
}
function LegalProcedureDetailComponent_div_0_div_51_a_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 75);
    \u0275\u0275text(1, " Visualiser le document final ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275property("href", p_r3.finalDocumentUrl, \u0275\u0275sanitizeUrl);
  }
}
function LegalProcedureDetailComponent_div_0_div_51_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76);
    \u0275\u0275text(1, "Le document final est en cours de generation.");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureDetailComponent_div_0_div_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "h3", 13);
    \u0275\u0275text(2, "\u{1F389} Dossier valid\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Votre dossier a \xE9t\xE9 valid\xE9 par l'expert juridique. Le document final est disponible.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, LegalProcedureDetailComponent_div_0_div_51_p_5_Template, 3, 4, "p", 22)(6, LegalProcedureDetailComponent_div_0_div_51_a_6_Template, 2, 1, "a", 74)(7, LegalProcedureDetailComponent_div_0_div_51_ng_template_7_Template, 2, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const finalPending_r12 = \u0275\u0275reference(8);
    const p_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", p_r3.finalDocumentGeneratedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r3.finalDocumentUrl)("ngIfElse", finalPending_r12);
  }
}
function LegalProcedureDetailComponent_div_0_strong_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.chatMessages.length);
  }
}
function LegalProcedureDetailComponent_div_0_aside_56_div_14_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 91);
    \u0275\u0275listener("click", function LegalProcedureDetailComponent_div_0_aside_56_div_14_button_1_Template_button_click_0_listener() {
      const suggestion_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.askSuggestion(suggestion_r15));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const suggestion_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", suggestion_r15, " ");
  }
}
function LegalProcedureDetailComponent_div_0_aside_56_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89);
    \u0275\u0275template(1, LegalProcedureDetailComponent_div_0_aside_56_div_14_button_1_Template, 2, 1, "button", 90);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.chatSuggestions);
  }
}
function LegalProcedureDetailComponent_div_0_aside_56_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275text(1, " Posez une question sur la procedure, les documents ou les prochaines etapes. ");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureDetailComponent_div_0_aside_56_div_17_small_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(message_r16.disclaimer);
  }
}
function LegalProcedureDetailComponent_div_0_aside_56_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "div");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, LegalProcedureDetailComponent_div_0_aside_56_div_17_small_3_Template, 2, 1, "small", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r16 = ctx.$implicit;
    \u0275\u0275classProp("chat-user", message_r16.role === "user")("chat-assistant", message_r16.role === "assistant");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(message_r16.text);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", message_r16.disclaimer);
  }
}
function LegalProcedureDetailComponent_div_0_aside_56_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 94)(1, "div");
    \u0275\u0275text(2, "Analyse du dossier en cours...");
    \u0275\u0275elementEnd()();
  }
}
function LegalProcedureDetailComponent_div_0_aside_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 77)(1, "div", 78)(2, "div")(3, "h2");
    \u0275\u0275text(4, "Assistant juridique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 79);
    \u0275\u0275listener("click", function LegalProcedureDetailComponent_div_0_aside_56_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeChat());
    });
    \u0275\u0275text(8, "x");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 80)(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, LegalProcedureDetailComponent_div_0_aside_56_div_14_Template, 2, 1, "div", 81);
    \u0275\u0275elementStart(15, "div", 82);
    \u0275\u0275template(16, LegalProcedureDetailComponent_div_0_aside_56_div_16_Template, 2, 0, "div", 83)(17, LegalProcedureDetailComponent_div_0_aside_56_div_17_Template, 4, 6, "div", 84)(18, LegalProcedureDetailComponent_div_0_aside_56_div_18_Template, 3, 0, "div", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "form", 86);
    \u0275\u0275listener("ngSubmit", function LegalProcedureDetailComponent_div_0_aside_56_Template_form_ngSubmit_19_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.askLegalChat());
    });
    \u0275\u0275elementStart(20, "input", 87);
    \u0275\u0275twoWayListener("ngModelChange", function LegalProcedureDetailComponent_div_0_aside_56_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.chatQuestion, $event) || (ctx_r1.chatQuestion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 88);
    \u0275\u0275text(22, " Envoyer ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ctx_r1.procedureTypeLabels[p_r3.procedureType], " - ", ctx_r1.statusLabels[p_r3.status], "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", (ctx_r1.checklist == null ? null : ctx_r1.checklist.uploadedCount) || 0, "/", (ctx_r1.checklist == null ? null : ctx_r1.checklist.requiredCount) || 0, " documents");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r3.projectName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.chatMessages.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.chatMessages.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.chatMessages);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.chatSending);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.chatQuestion);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.chatSending || !ctx_r1.chatQuestion.trim());
  }
}
function LegalProcedureDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div")(3, "h1", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 7);
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "span", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "button", 9);
    \u0275\u0275listener("click", function LegalProcedureDetailComponent_div_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(10, "\u2190 Retour");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, LegalProcedureDetailComponent_div_0_div_11_Template, 2, 1, "div", 10)(12, LegalProcedureDetailComponent_div_0_div_12_Template, 2, 1, "div", 11);
    \u0275\u0275elementStart(13, "div", 12)(14, "h2", 13);
    \u0275\u0275text(15, "Informations du dossier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 14)(17, "div", 15)(18, "div", 16);
    \u0275\u0275text(19, "ID dossier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 17);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 15)(23, "div", 16);
    \u0275\u0275text(24, "Expert assign\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 17);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 15)(28, "div", 16);
    \u0275\u0275text(29, "Progression");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 17);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 15)(33, "div", 16);
    \u0275\u0275text(34, "Cr\xE9\xE9 le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 17);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, LegalProcedureDetailComponent_div_0_div_38_Template, 6, 4, "div", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(39, LegalProcedureDetailComponent_div_0_div_39_Template, 11, 6, "div", 19);
    \u0275\u0275elementStart(40, "div", 20)(41, "div", 21)(42, "div")(43, "h2", 13);
    \u0275\u0275text(44, "Checklist documentaire");
    \u0275\u0275elementEnd();
    \u0275\u0275template(45, LegalProcedureDetailComponent_div_0_p_45_Template, 2, 3, "p", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(46, LegalProcedureDetailComponent_div_0_div_46_Template, 2, 2, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(47, LegalProcedureDetailComponent_div_0_div_47_Template, 2, 1, "div", 24)(48, LegalProcedureDetailComponent_div_0_ng_template_48_Template, 3, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(50, LegalProcedureDetailComponent_div_0_div_50_Template, 3, 2, "div", 25)(51, LegalProcedureDetailComponent_div_0_div_51_Template, 9, 3, "div", 26);
    \u0275\u0275elementStart(52, "button", 27);
    \u0275\u0275listener("click", function LegalProcedureDetailComponent_div_0_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleChat());
    });
    \u0275\u0275elementStart(53, "span");
    \u0275\u0275text(54, "Chat juridique");
    \u0275\u0275elementEnd();
    \u0275\u0275template(55, LegalProcedureDetailComponent_div_0_strong_55_Template, 2, 1, "strong", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275template(56, LegalProcedureDetailComponent_div_0_aside_56_Template, 23, 11, "aside", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = ctx.ngIf;
    const noChecklist_r17 = \u0275\u0275reference(49);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r3.projectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.procedureTypeLabels[p_r3.procedureType], " \u2014 ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getStatusClass(p_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusLabels[p_r3.status], " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.successMessage);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(p_r3.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r3.expertId || "Non assign\xE9");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", p_r3.completionRate, " %");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(37, 22, p_r3.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", p_r3.submittedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r3.status === "EN_COURS" || p_r3.remark || ctx_r1.aiResult);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.checklist);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.checklist);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.checklist == null ? null : ctx_r1.checklist.items == null ? null : ctx_r1.checklist.items.length)("ngIfElse", noChecklist_r17);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.canEditDocuments);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r3.status === "COMPLETE");
    \u0275\u0275advance();
    \u0275\u0275classProp("chat-launcher-open", ctx_r1.chatOpen);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r1.chatOpen && ctx_r1.chatMessages.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.chatOpen);
  }
}
function LegalProcedureDetailComponent_ng_template_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Chargement en cours...");
    \u0275\u0275elementEnd();
  }
}
function LegalProcedureDetailComponent_ng_template_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function LegalProcedureDetailComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275template(1, LegalProcedureDetailComponent_ng_template_1_div_1_Template, 2, 0, "div", 28)(2, LegalProcedureDetailComponent_ng_template_1_div_2_Template, 2, 1, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
  }
}
var LegalProcedureDetailComponent = class _LegalProcedureDetailComponent {
  route;
  service;
  location;
  auth;
  procedure;
  checklist;
  aiResult;
  selectedFiles = {};
  chatQuestion = "";
  chatMessages = [];
  chatOpen = false;
  loading = false;
  analyzingAi = false;
  chatSending = false;
  uploadingCode = null;
  errorMessage = "";
  successMessage = "";
  statusLabels = STATUS_LABELS;
  procedureTypeLabels = PROCEDURE_TYPE_LABELS;
  userId;
  constructor(route, service, location, auth) {
    this.route = route;
    this.service = service;
    this.location = location;
    this.auth = auth;
    this.userId = this.auth.getUserId();
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.loadAll(id);
  }
  goBack() {
    this.location.back();
  }
  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }
  closeChat() {
    this.chatOpen = false;
  }
  askSuggestion(question) {
    this.chatQuestion = question;
    this.askLegalChat();
  }
  loadAll(id) {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (data) => {
        this.procedure = data;
        this.loadChecklist(id);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur lors du chargement du dossier.";
        this.loading = false;
      }
    });
  }
  loadChecklist(id) {
    this.service.getChecklist(id).subscribe({
      next: (data) => {
        this.checklist = data;
      },
      error: (err) => console.error("Erreur checklist", err)
    });
  }
  onFileSelected(event, code) {
    const input = event.target;
    if (input.files?.length)
      this.selectedFiles[code] = input.files[0];
  }
  uploadDocument(item) {
    if (!this.procedure || !this.selectedFiles[item.code])
      return;
    this.errorMessage = "";
    this.successMessage = "";
    this.uploadingCode = item.code;
    this.service.uploadDocument(this.procedure.id, item.code, this.selectedFiles[item.code]).subscribe({
      next: () => {
        this.successMessage = `"${item.label}" depose avec succes.`;
        this.uploadingCode = null;
        delete this.selectedFiles[item.code];
        this.loadAll(this.procedure.id);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur lors du televersement.";
        this.uploadingCode = null;
      }
    });
  }
  deleteDocument(documentId) {
    if (!this.procedure || !confirm("Supprimer ce document ?"))
      return;
    this.service.deleteDocument(this.procedure.id, documentId).subscribe({
      next: () => {
        this.successMessage = "Document supprime.";
        this.loadAll(this.procedure.id);
      },
      error: (err) => this.errorMessage = err?.error?.message || "Erreur de suppression."
    });
  }
  submitProcedure() {
    if (!this.procedure)
      return;
    this.service.submit(this.procedure.id, this.userId).subscribe({
      next: (updated) => {
        this.successMessage = "Dossier soumis avec succes. Analyse IA lancee.";
        this.loadAll(updated.id);
      },
      error: (err) => this.errorMessage = err?.error?.message || "Erreur lors de la soumission."
    });
  }
  runAiAnalysis() {
    if (!this.procedure)
      return;
    this.errorMessage = "";
    this.successMessage = "";
    this.analyzingAi = true;
    this.service.analyzeWithAi(this.procedure.id).subscribe({
      next: (result) => {
        this.aiResult = result;
        this.successMessage = `Analyse IA terminee : ${result.decision}.`;
        this.analyzingAi = false;
        this.loadAll(result.procedureId);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || err?.error || "Erreur lors de l analyse IA.";
        this.analyzingAi = false;
      }
    });
  }
  askLegalChat() {
    if (!this.procedure || !this.chatQuestion.trim())
      return;
    const question = this.chatQuestion.trim();
    this.chatQuestion = "";
    this.chatSending = true;
    this.chatMessages.push({ role: "user", text: question });
    const requiredDocuments = this.checklist?.items.filter((item) => item.required).map((item) => item.label) || [];
    const uploadedDocuments = this.checklist?.items.filter((item) => item.uploaded).map((item) => item.label) || [];
    const missingDocuments = this.checklist?.items.filter((item) => item.required && !item.uploaded).map((item) => item.label) || [];
    const history = this.chatMessages.slice(0, -1).slice(-8).map((message) => ({
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
      next: (response) => {
        this.chatMessages.push({
          role: "assistant",
          text: response.answer,
          disclaimer: response.disclaimer
        });
        this.chatSending = false;
      },
      error: (err) => {
        this.chatMessages.push({
          role: "assistant",
          text: err?.error?.message || "Le chatbot juridique est momentanement indisponible."
        });
        this.chatSending = false;
      }
    });
  }
  get allRequiredUploaded() {
    return !!this.checklist && this.checklist.requiredCount > 0 && this.checklist.uploadedCount >= this.checklist.requiredCount;
  }
  get canEditDocuments() {
    return this.procedure?.status === "BROUILLON" || this.procedure?.status === "REFUSE";
  }
  get aiRemarkSummary() {
    const source = this.aiResult?.remark || this.procedure?.remark || "";
    if (!source) {
      return "";
    }
    const problemIndex = source.indexOf("Problemes detectes:");
    if (problemIndex >= 0) {
      return source.substring(0, problemIndex).trim();
    }
    const documentsIndex = source.indexOf("Documents a corriger:");
    if (documentsIndex >= 0) {
      return source.substring(0, documentsIndex).trim();
    }
    return this.aiFindingGroups.length ? "Analyse IA refusee. Corrigez les documents signales puis resoumettez le dossier." : source;
  }
  get aiFindingGroups() {
    const findings = this.aiResult?.technicalFindings?.length ? this.aiResult.technicalFindings : this.extractFindingsFromRemark(this.procedure?.remark || "");
    const grouped = /* @__PURE__ */ new Map();
    findings.forEach((rawFinding) => {
      const separator = rawFinding.indexOf(":");
      const document = separator > 0 ? rawFinding.substring(0, separator).trim() : "Document";
      const finding = separator > 0 ? rawFinding.substring(separator + 1).trim() : rawFinding.trim();
      if (!finding)
        return;
      if (!grouped.has(document)) {
        grouped.set(document, []);
      }
      grouped.get(document).push(this.translateAiFinding(finding));
    });
    return Array.from(grouped.entries()).map(([document, groupedFindings]) => ({
      document,
      findings: groupedFindings
    }));
  }
  extractFindingsFromRemark(remark) {
    if (!remark) {
      return [];
    }
    const problemIndex = remark.indexOf("Problemes detectes:");
    if (problemIndex >= 0) {
      return remark.substring(problemIndex + "Problemes detectes:".length).split("|").map((item) => item.trim()).filter(Boolean);
    }
    const documentsIndex = remark.indexOf("Documents a corriger:");
    if (documentsIndex < 0) {
      return [];
    }
    const findings = [];
    let currentDocument = "";
    remark.substring(documentsIndex + "Documents a corriger:".length).split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((line) => {
      if (line.startsWith("- ") && line.endsWith(":")) {
        currentDocument = line.substring(2, line.length - 1).trim();
        return;
      }
      if (line.startsWith("- ") && currentDocument) {
        findings.push(`${currentDocument}: ${line.substring(2).trim()}`);
      }
    });
    return findings;
  }
  translateAiFinding(finding) {
    const normalized = finding.trim();
    if (normalized.startsWith("Document appears expired on ")) {
      return normalized.replace("Document appears expired on ", "Document expire depuis le ").replace(".", ".");
    }
    const dictionary = {
      "Suspicious red or pink watermark overlay detected.": "Filigrane rouge/rose suspect detecte sur le document.",
      "Suspicious masked or invalid verification code detected.": "Code de verification masque ou invalide.",
      "Inconsistent company legal form detected: SARL and SA/Societe Anonyme appear together.": "Incoherence de forme juridique : SARL et SA/Societe Anonyme apparaissent ensemble.",
      "Document issue date appears to be in the future.": "Date d emission du document dans le futur.",
      "Document image contains repeated horizontal scan lines; quality is degraded.": "Image degradee : lignes horizontales repetees detectees.",
      "Document image appears blurred.": "Image floue ou qualite insuffisante.",
      "Suspicious diagonal overlay line detected.": "Ligne diagonale suspecte detectee sur le document.",
      "Suspicious fraud marker detected in OCR text (for example FALSIFIE/INVALIDE).": "Marqueur de fraude detecte dans le texte OCR (ex : FALSIFIE / INVALIDE).",
      "OCR text is too short for reliable automatic validation.": "Texte OCR trop court pour valider automatiquement le document.",
      "No text extracted by OCR.": "Aucun texte lisible extrait par OCR."
    };
    return dictionary[normalized] || normalized;
  }
  get chatSuggestions() {
    const procedureLabel = this.procedure ? this.procedureTypeLabels[this.procedure.procedureType] : "ma procedure";
    const missing = this.checklist?.items?.filter((item) => item.required && !item.uploaded) || [];
    if (missing.length > 0) {
      return [
        `Quels documents dois-je preparer pour ${procedureLabel} ?`,
        `Comment corriger le document ${missing[0].label} ?`,
        "Pourquoi mon dossier peut etre refuse ?"
      ];
    }
    if (this.procedure?.status === "COMPLETE") {
      return [
        "Que puis-je faire avec le document final ?",
        "Comment imprimer ou presenter cette attestation ?",
        `Quelles sont les prochaines etapes pour ${procedureLabel} ?`
      ];
    }
    return [
      `Explique-moi la procedure ${procedureLabel}`,
      "C quoi POC ?",
      "Comment eviter un refus par l IA ?"
    ];
  }
  getStatusClass(status) {
    return `status-${status.toLowerCase().replace(/_/g, "-")}`;
  }
  static \u0275fac = function LegalProcedureDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LegalProcedureDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(LegalProcedureService), \u0275\u0275directiveInject(Location), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LegalProcedureDetailComponent, selectors: [["app-legal-procedure-detail"]], decls: 3, vars: 2, consts: [["loadingTpl", ""], ["noChecklist", ""], ["finalPending", ""], ["class", "page-container", 4, "ngIf", "ngIfElse"], [1, "page-container"], [1, "section-header", "mb-4"], [1, "section-title"], [1, "section-subtitle"], [1, "badge", 3, "ngClass"], ["type", "button", 1, "btn", "btn-soft", 3, "click"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "info-card", "mb-4"], [1, "section-title", 2, "font-size", "18px"], [1, "info-grid", "mt-3"], [1, "info-item"], [1, "info-item-label"], [1, "info-item-value"], ["class", "info-item", 4, "ngIf"], ["class", "card-premium p-4 mb-4", 4, "ngIf"], [1, "card-premium", "p-4", "mb-4"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], ["class", "section-subtitle", 4, "ngIf"], ["class", "progress", "style", "width:200px; height:10px;", 4, "ngIf"], [4, "ngIf", "ngIfElse"], ["class", "d-flex justify-content-end", 4, "ngIf"], ["class", "card-premium p-4 mt-4", 4, "ngIf"], ["type", "button", 1, "chat-launcher", 3, "click"], [4, "ngIf"], ["class", "chat-popup", 4, "ngIf"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"], [1, "d-flex", "justify-content-between", "align-items-start", "gap-3"], ["class", "btn btn-primary", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["class", "ai-grid mt-3", 4, "ngIf"], ["class", "ai-findings mt-3", 4, "ngIf"], ["class", "mt-3", 4, "ngIf"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "ai-grid", "mt-3"], [1, "ai-item"], [1, "ai-label"], [1, "ai-value"], [1, "ai-findings", "mt-3"], [1, "ai-findings-title"], ["class", "ai-finding-card", 4, "ngFor", "ngForOf"], [1, "ai-finding-card"], [1, "ai-finding-document"], [4, "ngFor", "ngForOf"], [1, "mt-3"], [1, "mb-0"], [1, "progress", 2, "width", "200px", "height", "10px"], [1, "progress-bar", "bg-success"], ["class", "checklist-item mb-3", 3, "checklist-ok", "checklist-miss", 4, "ngFor", "ngForOf"], [1, "checklist-item", "mb-3"], [1, "flex-grow-1"], [1, "d-flex", "align-items-center", "gap-2"], [1, "checklist-dot"], ["class", "badge bg-danger", "style", "font-size:10px;", 4, "ngIf"], [1, "text-muted"], ["class", "mt-1", 4, "ngIf"], ["class", "upload-zone d-flex gap-2 align-items-center", 4, "ngIf"], [3, "ngClass"], [1, "badge", "bg-danger", 2, "font-size", "10px"], [1, "mt-1"], ["target", "_blank", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "href"], ["class", "btn btn-sm btn-outline-danger ms-2", 3, "click", 4, "ngIf"], [1, "btn", "btn-sm", "btn-outline-danger", "ms-2", 3, "click"], [1, "upload-zone", "d-flex", "gap-2", "align-items-center"], ["type", "file", 1, "form-control", "form-control-sm", 2, "width", "220px", 3, "change"], [1, "btn", "btn-sm", "btn-primary", 3, "click", "disabled"], [1, "empty-state"], [1, "d-flex", "justify-content-end"], [1, "btn", "btn-success", "btn-lg", 3, "click", "disabled"], [1, "card-premium", "p-4", "mt-4"], ["class", "btn btn-primary", "target", "_blank", "rel", "noopener", 3, "href", 4, "ngIf", "ngIfElse"], ["target", "_blank", "rel", "noopener", 1, "btn", "btn-primary", 3, "href"], [1, "alert", "alert-info"], [1, "chat-popup"], [1, "chat-popup-header"], ["type", "button", 1, "chat-close", 3, "click"], [1, "chat-context"], ["class", "chat-suggestions", 4, "ngIf"], [1, "chat-box"], ["class", "chat-empty", 4, "ngIf"], ["class", "chat-message", 3, "chat-user", "chat-assistant", 4, "ngFor", "ngForOf"], ["class", "chat-message chat-assistant", 4, "ngIf"], [1, "chat-form", 3, "ngSubmit"], ["type", "text", "name", "chatQuestion", "placeholder", "Posez votre question juridique...", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "chat-suggestions"], ["type", "button", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 3, "click"], [1, "chat-empty"], [1, "chat-message"], [1, "chat-message", "chat-assistant"], [1, "p-5", "text-center"]], template: function LegalProcedureDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, LegalProcedureDetailComponent_div_0_Template, 57, 25, "div", 3)(1, LegalProcedureDetailComponent_ng_template_1_Template, 3, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const loadingTpl_r18 = \u0275\u0275reference(2);
      \u0275\u0275property("ngIf", ctx.procedure)("ngIfElse", loadingTpl_r18);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, DatePipe], styles: ["\n\n.ai-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 12px;\n}\n.ai-item[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  background: #fff;\n}\n.ai-label[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.ai-value[_ngcontent-%COMP%] {\n  color: #111827;\n  font-size: 15px;\n  font-weight: 700;\n  margin-top: 4px;\n}\n.ai-findings[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n.ai-findings-title[_ngcontent-%COMP%] {\n  color: #991b1b;\n  font-size: 13px;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.ai-finding-card[_ngcontent-%COMP%] {\n  border: 1px solid #fecaca;\n  border-left: 4px solid #dc2626;\n  border-radius: 8px;\n  padding: 12px 14px;\n  background: #fff7f7;\n}\n.ai-finding-document[_ngcontent-%COMP%] {\n  color: #7f1d1d;\n  font-size: 14px;\n  font-weight: 800;\n  margin-bottom: 8px;\n}\n.ai-finding-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 18px;\n  color: #374151;\n}\n.ai-finding-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    + li[_ngcontent-%COMP%] {\n  margin-top: 5px;\n}\n.chat-launcher[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 24px;\n  bottom: 24px;\n  z-index: 1040;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 46px;\n  border: 0;\n  border-radius: 999px;\n  padding: 0 18px;\n  background: #111827;\n  color: #fff;\n  font-weight: 700;\n  box-shadow: 0 14px 30px rgba(17, 24, 39, .24);\n}\n.chat-launcher[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-width: 22px;\n  height: 22px;\n  border-radius: 999px;\n  background: #2563eb;\n  font-size: 12px;\n}\n.chat-launcher-open[_ngcontent-%COMP%] {\n  background: #374151;\n}\n.chat-popup[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 24px;\n  bottom: 84px;\n  z-index: 1041;\n  width: min(420px, calc(100vw - 32px));\n  height: min(680px, calc(100vh - 110px));\n  display: grid;\n  grid-template-rows: auto auto auto minmax(0, 1fr) auto;\n  border: 1px solid #dbe3ef;\n  border-radius: 10px;\n  background: #fff;\n  box-shadow: 0 24px 60px rgba(15, 23, 42, .22);\n  overflow: hidden;\n}\n.chat-popup-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 16px 18px;\n  background: #f8fafc;\n  border-bottom: 1px solid #e5e7eb;\n}\n.chat-popup-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 17px;\n  font-weight: 800;\n  color: #111827;\n}\n.chat-popup-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #6b7280;\n  font-size: 13px;\n}\n.chat-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  background: #fff;\n  color: #374151;\n  font-weight: 800;\n}\n.chat-context[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  padding: 12px 18px 0;\n}\n.chat-context[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border: 1px solid #dbe3ef;\n  border-radius: 999px;\n  padding: 5px 9px;\n  background: #f9fafb;\n  color: #374151;\n  font-size: 12px;\n  font-weight: 700;\n}\n.chat-suggestions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  padding: 12px 18px 0;\n}\n.chat-suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #dbe3ef;\n  border-radius: 8px;\n  padding: 9px 10px;\n  background: #fff;\n  color: #1f2937;\n  text-align: left;\n  font-size: 13px;\n}\n.chat-suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: #2563eb;\n  color: #1d4ed8;\n}\n.chat-box[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n  align-content: start;\n  min-height: 0;\n  overflow: auto;\n  border: 0;\n  border-radius: 0;\n  padding: 14px 18px;\n  background: #f8fafc;\n}\n.chat-empty[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.chat-message[_ngcontent-%COMP%] {\n  max-width: 82%;\n  border-radius: 8px;\n  padding: 10px 12px;\n  background: #fff;\n  border: 1px solid #e5e7eb;\n}\n.chat-message[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #6b7280;\n  margin-top: 6px;\n}\n.chat-user[_ngcontent-%COMP%] {\n  justify-self: end;\n  background: #2563eb;\n  color: #fff;\n  border-color: #2563eb;\n}\n.chat-assistant[_ngcontent-%COMP%] {\n  justify-self: start;\n}\n.chat-form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 10px;\n  padding: 14px 18px;\n  border-top: 1px solid #e5e7eb;\n  background: #fff;\n}\n@media (max-width: 576px) {\n  .chat-launcher[_ngcontent-%COMP%] {\n    right: 16px;\n    bottom: 16px;\n  }\n  .chat-popup[_ngcontent-%COMP%] {\n    right: 12px;\n    bottom: 74px;\n    width: calc(100vw - 24px);\n    height: min(640px, calc(100vh - 92px));\n  }\n  .chat-form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=legal-procedure-detail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LegalProcedureDetailComponent, { className: "LegalProcedureDetailComponent", filePath: "src\\app\\modules\\legal\\pages\\legal-procedure-detail\\legal-procedure-detail.component.ts", lineNumber: 21 });
})();

// src/app/modules/legal/pages/expert-procedures/expert-procedures.component.ts
function ExpertProceduresComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function ExpertProceduresComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.successMessage);
  }
}
function ExpertProceduresComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Chargement...");
    \u0275\u0275elementEnd();
  }
}
function ExpertProceduresComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "p");
    \u0275\u0275text(2, "Aucun dossier en attente de decision.");
    \u0275\u0275elementEnd()();
  }
}
function ExpertProceduresComponent_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function ExpertProceduresComponent_button_13_Template_button_click_0_listener() {
      const p_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectProcedure(p_r3));
    });
    \u0275\u0275elementStart(1, "div", 18)(2, "div")(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 20)(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 21);
    \u0275\u0275element(15, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", (ctx_r0.selectedProcedure == null ? null : ctx_r0.selectedProcedure.id) === p_r3.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r3.projectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.procedureTypeLabels[p_r3.procedureType]);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.getStatusClass(p_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabels[p_r3.status], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.entrepreneurName(p_r3.entrepreneurId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r3.completionRate, "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", p_r3.completionRate || 0, "%");
  }
}
function ExpertProceduresComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "p");
    \u0275\u0275text(2, "Selectionnez un dossier pour consulter les documents et prendre une decision.");
    \u0275\u0275elementEnd()();
  }
}
function ExpertProceduresComponent_div_16_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, "Chargement du detail...");
    \u0275\u0275elementEnd();
  }
}
function ExpertProceduresComponent_div_16_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "span");
    \u0275\u0275text(2, "Soumis le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, p_r5.submittedAt, "dd/MM/yyyy HH:mm"));
  }
}
function ExpertProceduresComponent_div_16_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "span");
    \u0275\u0275text(2, "Remarque IA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r5.remark);
  }
}
function ExpertProceduresComponent_div_16_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1, " Aucun document trouve. ");
    \u0275\u0275elementEnd();
  }
}
function ExpertProceduresComponent_div_16_div_42_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.documentDescription(doc_r7));
  }
}
function ExpertProceduresComponent_div_16_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "div")(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ExpertProceduresComponent_div_16_div_42_p_4_Template, 2, 1, "p", 48);
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 49)(9, "span", 50);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 51);
    \u0275\u0275listener("click", function ExpertProceduresComponent_div_16_div_42_Template_button_click_11_listener() {
      const doc_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectDocument(doc_r7));
    });
    \u0275\u0275text(12, " Visualiser ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const doc_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.documentLabel(doc_r7));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.documentDescription(doc_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", doc_r7.requirementCode, " - ", \u0275\u0275pipeBind2(7, 5, doc_r7.uploadedAt, "dd/MM/yyyy HH:mm"), "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(doc_r7.status);
  }
}
function ExpertProceduresComponent_div_16_div_43_iframe_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 58);
  }
  if (rf & 2) {
    const doc_r8 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275property("src", doc_r8.fileUrl, \u0275\u0275sanitizeResourceUrl);
  }
}
function ExpertProceduresComponent_div_16_div_43_img_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 59);
  }
  if (rf & 2) {
    const doc_r8 = \u0275\u0275nextContext().ngIf;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", doc_r8.fileUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r0.documentLabel(doc_r8));
  }
}
function ExpertProceduresComponent_div_16_div_43_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275text(1, " Ce format ne peut pas etre visualise directement ici. ");
    \u0275\u0275elementEnd();
  }
}
function ExpertProceduresComponent_div_16_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 53)(2, "div")(3, "span");
    \u0275\u0275text(4, "Apercu document");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "a", 54);
    \u0275\u0275text(8, " Ouvrir dans un onglet ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, ExpertProceduresComponent_div_16_div_43_iframe_9_Template, 1, 1, "iframe", 55)(10, ExpertProceduresComponent_div_16_div_43_img_10_Template, 1, 2, "img", 56)(11, ExpertProceduresComponent_div_16_div_43_div_11_Template, 2, 0, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r8 = ctx.ngIf;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.documentLabel(doc_r8));
    \u0275\u0275advance();
    \u0275\u0275property("href", doc_r8.fileUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.isPdf(doc_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isImage(doc_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isPdf(doc_r8) && !ctx_r0.isImage(doc_r8));
  }
}
function ExpertProceduresComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23)(2, "div")(3, "h2", 2);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, ExpertProceduresComponent_div_16_div_9_Template, 2, 0, "div", 24);
    \u0275\u0275elementStart(10, "div", 25)(11, "div", 26)(12, "span");
    \u0275\u0275text(13, "Entrepreneur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 26)(17, "span");
    \u0275\u0275text(18, "ID entrepreneur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 26)(22, "span");
    \u0275\u0275text(23, "Procedure");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 26)(27, "span");
    \u0275\u0275text(28, "Progression");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(31, ExpertProceduresComponent_div_16_div_31_Template, 6, 4, "div", 27);
    \u0275\u0275elementStart(32, "div", 26)(33, "span");
    \u0275\u0275text(34, "ID dossier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "strong");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(37, ExpertProceduresComponent_div_16_div_37_Template, 5, 1, "div", 28);
    \u0275\u0275elementStart(38, "div", 29)(39, "h3");
    \u0275\u0275text(40, "Documents du dossier");
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, ExpertProceduresComponent_div_16_div_41_Template, 2, 0, "div", 30)(42, ExpertProceduresComponent_div_16_div_42_Template, 13, 8, "div", 31)(43, ExpertProceduresComponent_div_16_div_43_Template, 12, 5, "div", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "form", 33);
    \u0275\u0275listener("ngSubmit", function ExpertProceduresComponent_div_16_Template_form_ngSubmit_44_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitDecision());
    });
    \u0275\u0275elementStart(45, "h3");
    \u0275\u0275text(46, "Decision expert");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 34)(48, "label", 35);
    \u0275\u0275text(49, "Decision *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "select", 36)(51, "option", 37);
    \u0275\u0275text(52, "Choisir");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "option", 38);
    \u0275\u0275text(54, "Valider definitivement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "option", 39);
    \u0275\u0275text(56, "Refuser");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(57, "div", 34)(58, "label", 35);
    \u0275\u0275text(59, "Remarque");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "textarea", 40);
    \u0275\u0275text(61, "            ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 41)(63, "button", 42);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "button", 43);
    \u0275\u0275listener("click", function ExpertProceduresComponent_div_16_Template_button_click_65_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.selectedProcedure = void 0;
      ctx_r0.selectedChecklist = void 0;
      return \u0275\u0275resetView(ctx_r0.selectedDocument = void 0);
    });
    \u0275\u0275text(66, " Fermer ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r5 = ctx.ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r5.projectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.procedureTypeLabels[p_r5.procedureType]);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.getStatusClass(p_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabels[p_r5.status], " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.detailLoading);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.entrepreneurName(p_r5.entrepreneurId));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r5.entrepreneurId);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.procedureTypeLabels[p_r5.procedureType]);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", p_r5.completionRate, "%");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r5.submittedAt);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r5.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r5.remark);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !(p_r5.documents == null ? null : p_r5.documents.length));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", p_r5.documents);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedDocument);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.decisionForm);
    \u0275\u0275advance(19);
    \u0275\u0275property("disabled", ctx_r0.decisionForm.invalid || ctx_r0.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.submitting ? "Envoi..." : "Confirmer la decision", " ");
  }
}
var ExpertProceduresComponent = class _ExpertProceduresComponent {
  service;
  users;
  fb;
  auth;
  procedures = [];
  selectedProcedure;
  selectedChecklist;
  selectedDocument;
  decisionForm;
  entrepreneurNames = {};
  loading = false;
  detailLoading = false;
  submitting = false;
  errorMessage = "";
  successMessage = "";
  statusLabels = STATUS_LABELS;
  procedureTypeLabels = PROCEDURE_TYPE_LABELS;
  expertId;
  constructor(service, users, fb, auth) {
    this.service = service;
    this.users = users;
    this.fb = fb;
    this.auth = auth;
    this.expertId = this.auth.getUserId();
  }
  ngOnInit() {
    this.decisionForm = this.fb.group({
      approved: [null, Validators.required],
      remark: [""]
    });
    this.loadAssigned();
  }
  loadAssigned() {
    this.loading = true;
    this.errorMessage = "";
    this.service.getAssignedProcedures(this.expertId).subscribe({
      next: (data) => {
        this.procedures = data;
        this.loading = false;
        this.loadEntrepreneurNames(data);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur lors du chargement.";
        this.loading = false;
      }
    });
  }
  selectProcedure(p) {
    this.selectedProcedure = p;
    this.selectedChecklist = void 0;
    this.selectedDocument = void 0;
    this.detailLoading = true;
    this.decisionForm.reset();
    this.errorMessage = "";
    this.successMessage = "";
    forkJoin({
      procedure: this.service.getById(p.id).pipe(catchError(() => of(p))),
      checklist: this.service.getChecklist(p.id).pipe(catchError(() => of(void 0)))
    }).subscribe({
      next: ({ procedure, checklist }) => {
        this.selectedProcedure = procedure;
        this.selectedChecklist = checklist;
        this.selectedDocument = procedure.documents?.[0];
        this.detailLoading = false;
        this.loadEntrepreneurNames([procedure]);
      },
      error: () => {
        this.detailLoading = false;
      }
    });
  }
  submitDecision() {
    if (!this.selectedProcedure || this.decisionForm.invalid)
      return;
    this.submitting = true;
    this.errorMessage = "";
    this.successMessage = "";
    const { approved, remark } = this.decisionForm.value;
    const isApproved = approved === "true" || approved === true;
    this.service.applyExpertDecision(this.selectedProcedure.id, { approved: isApproved, remark: remark || null }, this.expertId).subscribe({
      next: () => {
        this.successMessage = isApproved ? "Dossier valide." : "Dossier refuse.";
        this.submitting = false;
        this.selectedProcedure = void 0;
        this.selectedChecklist = void 0;
        this.selectedDocument = void 0;
        this.loadAssigned();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur lors de la decision.";
        this.submitting = false;
      }
    });
  }
  entrepreneurName(id) {
    return this.entrepreneurNames[id] || `Entrepreneur #${id}`;
  }
  documentLabel(document) {
    const item = this.selectedChecklist?.items.find((i) => i.code === document.requirementCode);
    return item?.label || document.documentType || document.requirementCode;
  }
  documentDescription(document) {
    const item = this.selectedChecklist?.items.find((i) => i.code === document.requirementCode);
    return item?.description || "";
  }
  selectDocument(document) {
    this.selectedDocument = document;
  }
  isPdf(document) {
    return !!document && this.fileExtension(document.fileUrl) === "pdf";
  }
  isImage(document) {
    return !!document && ["png", "jpg", "jpeg", "bmp", "gif", "webp"].includes(this.fileExtension(document.fileUrl));
  }
  getStatusClass(status) {
    return `status-${status.toLowerCase().replace(/_/g, "-")}`;
  }
  loadEntrepreneurNames(procedures) {
    const ids = Array.from(new Set(procedures.map((p) => p.entrepreneurId).filter((id) => !!id && !this.entrepreneurNames[id])));
    ids.forEach((id) => {
      this.users.getUserById(id).then((user) => {
        this.entrepreneurNames[id] = `${user.name || ""} ${user.prenom || ""}`.trim() || user.email || `Entrepreneur #${id}`;
      }).catch(() => {
        this.entrepreneurNames[id] = `Entrepreneur #${id}`;
      });
    });
  }
  fileExtension(url) {
    const cleanUrl = (url || "").split("?")[0].split("#")[0];
    const index = cleanUrl.lastIndexOf(".");
    return index >= 0 ? cleanUrl.substring(index + 1).toLowerCase() : "";
  }
  static \u0275fac = function ExpertProceduresComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExpertProceduresComponent)(\u0275\u0275directiveInject(LegalProcedureService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExpertProceduresComponent, selectors: [["app-expert-procedures"]], decls: 17, vars: 7, consts: [[1, "page-container"], [1, "section-header", "mb-4"], [1, "section-title"], [1, "section-subtitle"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-info", 4, "ngIf"], [1, "expert-layout"], [1, "expert-list"], ["class", "empty-state card-premium p-4", 4, "ngIf"], ["class", "expert-card", "type", "button", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "expert-detail"], ["class", "card-premium p-4", 4, "ngIf"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"], [1, "alert", "alert-info"], [1, "empty-state", "card-premium", "p-4"], ["type", "button", 1, "expert-card", 3, "click"], [1, "expert-card-main"], [1, "badge", 3, "ngClass"], [1, "expert-meta"], [1, "expert-progress"], [1, "card-premium", "p-4"], [1, "detail-header"], ["class", "alert alert-info mt-3", 4, "ngIf"], [1, "detail-grid", "mt-3"], [1, "detail-item"], ["class", "detail-item", 4, "ngIf"], ["class", "ai-remark mt-3", 4, "ngIf"], [1, "documents-section", "mt-4"], ["class", "empty-state p-3", 4, "ngIf"], ["class", "document-row", 4, "ngFor", "ngForOf"], ["class", "document-preview", 4, "ngIf"], [1, "decision-panel", "mt-4", 3, "ngSubmit", "formGroup"], [1, "mb-3"], [1, "form-label", "fw-semibold"], ["formControlName", "approved", 1, "form-select"], ["value", ""], ["value", "true"], ["value", "false"], ["rows", "3", "formControlName", "remark", "placeholder", "Motif de refus, commentaire pour l'entrepreneur...", 1, "form-control"], [1, "d-flex", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "alert", "alert-info", "mt-3"], [1, "ai-remark", "mt-3"], [1, "empty-state", "p-3"], [1, "document-row"], [4, "ngIf"], [1, "document-actions"], [1, "doc-status"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"], [1, "document-preview"], [1, "preview-header"], ["target", "_blank", "rel", "noopener", 1, "btn", "btn-sm", "btn-outline-secondary", 3, "href"], ["class", "preview-frame", "title", "Apercu PDF", 3, "src", 4, "ngIf"], ["class", "preview-image", 3, "src", "alt", 4, "ngIf"], ["class", "preview-unsupported", 4, "ngIf"], ["title", "Apercu PDF", 1, "preview-frame", 3, "src"], [1, "preview-image", 3, "src", "alt"], [1, "preview-unsupported"]], template: function ExpertProceduresComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Dossiers a traiter");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Dossiers valides par l'IA et en attente de decision expert.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(7, ExpertProceduresComponent_div_7_Template, 2, 1, "div", 4)(8, ExpertProceduresComponent_div_8_Template, 2, 1, "div", 5)(9, ExpertProceduresComponent_div_9_Template, 2, 0, "div", 6);
      \u0275\u0275elementStart(10, "div", 7)(11, "section", 8);
      \u0275\u0275template(12, ExpertProceduresComponent_div_12_Template, 3, 0, "div", 9)(13, ExpertProceduresComponent_button_13_Template, 16, 10, "button", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "section", 11);
      \u0275\u0275template(15, ExpertProceduresComponent_div_15_Template, 3, 0, "div", 9)(16, ExpertProceduresComponent_div_16_Template, 67, 18, "div", 12);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", !ctx.loading && ctx.procedures.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.procedures);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.selectedProcedure);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedProcedure);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, DatePipe], styles: ["\n\n.expert-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.4fr);\n  gap: 18px;\n  align-items: start;\n}\n.expert-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n.expert-card[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n  border: 1px solid #e5e7eb;\n  background: #fff;\n  border-radius: 8px;\n  padding: 14px;\n  cursor: pointer;\n}\n.expert-card.selected[_ngcontent-%COMP%] {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);\n}\n.expert-card-main[_ngcontent-%COMP%], \n.detail-header[_ngcontent-%COMP%], \n.expert-meta[_ngcontent-%COMP%], \n.document-row[_ngcontent-%COMP%], \n.document-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.expert-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.document-row[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n}\n.expert-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.document-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.ai-remark[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #64748b;\n}\n.expert-meta[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  color: #475569;\n  font-size: 13px;\n}\n.expert-progress[_ngcontent-%COMP%] {\n  height: 8px;\n  background: #eef2f7;\n  border-radius: 999px;\n  overflow: hidden;\n  margin-top: 8px;\n}\n.expert-progress[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #22c55e;\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n.detail-item[_ngcontent-%COMP%], \n.ai-remark[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  background: #f8fafc;\n}\n.detail-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.ai-remark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #64748b;\n  font-size: 12px;\n  margin-bottom: 4px;\n}\n.documents-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.decision-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 12px;\n}\n.document-row[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  margin-bottom: 10px;\n  background: #fff;\n}\n.document-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.doc-status[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #334155;\n}\n.document-preview[_ngcontent-%COMP%] {\n  border: 1px solid #dbe3ef;\n  border-radius: 8px;\n  background: #f8fafc;\n  padding: 12px;\n  margin-top: 14px;\n}\n.preview-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n.preview-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #64748b;\n  font-size: 12px;\n}\n.preview-frame[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 620px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: #fff;\n}\n.preview-image[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 100%;\n  max-height: 620px;\n  margin: 0 auto;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  background: #fff;\n}\n.preview-unsupported[_ngcontent-%COMP%] {\n  border: 1px dashed #cbd5e1;\n  border-radius: 6px;\n  padding: 24px;\n  text-align: center;\n  color: #64748b;\n  background: #fff;\n}\n@media (max-width: 900px) {\n  .expert-layout[_ngcontent-%COMP%], \n   .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .document-row[_ngcontent-%COMP%], \n   .document-actions[_ngcontent-%COMP%], \n   .preview-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=expert-procedures.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExpertProceduresComponent, { className: "ExpertProceduresComponent", filePath: "src\\app\\modules\\legal\\pages\\expert-procedures\\expert-procedures.component.ts", lineNumber: 22 });
})();

// src/app/modules/legal/legal-routing.module.ts
var routes = [
  // ── Page d'accueil commune ─────────────────────────────────────────────────
  {
    path: "",
    component: ProcedureHomeComponent
  },
  // ── ENTREPRENEUR uniquement ────────────────────────────────────────────────
  {
    path: "list",
    component: LegalProcedureListComponent,
    canActivate: [authGuard],
    data: { roles: ["ENTREPRENEUR", "ADMIN"] }
  },
  {
    path: "new",
    component: LegalProcedureFormComponent,
    canActivate: [authGuard],
    data: { roles: ["ENTREPRENEUR", "ADMIN"] }
  },
  {
    path: ":id",
    component: LegalProcedureDetailComponent,
    canActivate: [authGuard],
    data: { roles: ["ENTREPRENEUR", "ADMIN"] }
  },
  // ── EXPERT uniquement ──────────────────────────────────────────────────────
  {
    path: "expert/assigned",
    component: ExpertProceduresComponent,
    canActivate: [authGuard],
    data: { roles: ["EXPERT", "ADMIN"] }
  }
];
var LegalRoutingModule = class _LegalRoutingModule {
  static \u0275fac = function LegalRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LegalRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _LegalRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};

// src/app/modules/legal/legal.module.ts
var LegalModule = class _LegalModule {
  static \u0275fac = function LegalModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LegalModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _LegalModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    LegalRoutingModule
  ] });
};
export {
  LegalModule
};
//# sourceMappingURL=chunk-Q6KKSE7V.js.map
