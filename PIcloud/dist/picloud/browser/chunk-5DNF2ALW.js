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
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  FormsModule,
  HttpClient,
  HttpHeaders,
  MaxValidator,
  MinValidator,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  Router,
  RouterModule,
  SelectControlValueAccessor,
  Validators,
  __async,
  __spreadValues,
  firstValueFrom,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction4,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBGQ7VAX.js";

// src/app/models/partenaire.ts
var TypePartenaire;
(function(TypePartenaire2) {
  TypePartenaire2["ACADEMIQUE"] = "ACADEMIQUE";
  TypePartenaire2["INCUBATEUR"] = "INCUBATEUR";
  TypePartenaire2["PUBLIC"] = "PUBLIC";
  TypePartenaire2["ENTREPRISE"] = "ENTREPRISE";
  TypePartenaire2["ASSOCIATIF"] = "ASSOCIATIF";
})(TypePartenaire || (TypePartenaire = {}));
var StatutPartenaire;
(function(StatutPartenaire2) {
  StatutPartenaire2["EN_ATTENTE"] = "EN_ATTENTE";
  StatutPartenaire2["ACTIF"] = "ACTIF";
  StatutPartenaire2["SUSPENDU"] = "SUSPENDU";
  StatutPartenaire2["RESILIER"] = "RESILIER";
})(StatutPartenaire || (StatutPartenaire = {}));

// src/app/services/partenaire.service.ts
var PartenaireService = class _PartenaireService {
  http;
  auth;
  apiUrl = "http://localhost:8090/api/organisations";
  constructor(http, auth) {
    this.http = http;
    this.auth = auth;
  }
  // ── Headers ───────────────────────────────────────────────────────────────
  headers() {
    return new HttpHeaders({
      "X-User-Role": `ROLE_${this.auth.getRole()}`,
      "X-User-Id": String(this.auth.getUserId())
    });
  }
  // ── Public endpoints ──────────────────────────────────────────────────────
  getAll() {
    return firstValueFrom(this.http.get(this.apiUrl, { headers: this.headers() }));
  }
  getById(id) {
    return firstValueFrom(this.http.get(`${this.apiUrl}/${id}`, { headers: this.headers() }));
  }
  getByStatut(statut) {
    return firstValueFrom(this.http.get(`${this.apiUrl}/statut/${statut}`, { headers: this.headers() }));
  }
  // ── PARTNER: find own organisation by scanning all orgs ──────────────────
  // We match by userId because /my-dashboard is not reliable.
  // GET /api/organisations has no role restriction — always works.
  getMyDashboard() {
    return __async(this, null, function* () {
      const myUserId = Number(this.auth.getUserId());
      const all = yield this.getAll();
      const mine = all.find((o) => Number(o.userId) === myUserId);
      if (!mine) {
        throw new Error("Aucune organisation trouv\xE9e pour votre compte. Contactez un administrateur.");
      }
      return mine;
    });
  }
  // ── PARTNER: update contact info ──────────────────────────────────────────
  updateContactInfo(id, request) {
    return firstValueFrom(this.http.put(`${this.apiUrl}/${id}/contact`, request, { headers: this.headers() }));
  }
  // ── ADMIN endpoints ───────────────────────────────────────────────────────
  create(request) {
    return firstValueFrom(this.http.post(this.apiUrl, request, { headers: this.headers() }));
  }
  update(id, request) {
    return firstValueFrom(this.http.put(`${this.apiUrl}/${id}`, request, { headers: this.headers() }));
  }
  updateStatut(id, statut) {
    return firstValueFrom(this.http.patch(`${this.apiUrl}/${id}/statut`, null, { params: { statut }, headers: this.headers() }));
  }
  assignUser(orgId, userId) {
    return firstValueFrom(this.http.put(`${this.apiUrl}/${orgId}/assign-user/${userId}`, null, { headers: this.headers() }));
  }
  delete(id) {
    return firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers() }));
  }
  static \u0275fac = function PartenaireService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartenaireService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(AuthService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PartenaireService, factory: _PartenaireService.\u0275fac, providedIn: "root" });
};

// src/app/services/meeting.service.ts
var MeetingService = class _MeetingService {
  http;
  auth;
  baseUrl = "http://localhost:8090/api/meeting-invitations";
  constructor(http, auth) {
    this.http = http;
    this.auth = auth;
  }
  headers() {
    let headers = new HttpHeaders();
    const role = (this.auth.getRole() || "").trim();
    if (role) {
      const roleHeader = role.startsWith("ROLE_") ? role : `ROLE_${role}`;
      headers = headers.set("X-User-Role", roleHeader);
    }
    const userId = this.auth.getUserId();
    if (Number.isFinite(userId) && userId > 0) {
      headers = headers.set("X-User-Id", String(userId));
    }
    return headers;
  }
  requestMeeting(partenaireId, request) {
    return firstValueFrom(this.http.post(`${this.baseUrl}/partenaire/${partenaireId}`, request, { headers: this.headers() }));
  }
  static \u0275fac = function MeetingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MeetingService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(AuthService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MeetingService, factory: _MeetingService.\u0275fac, providedIn: "root" });
};

// src/app/modules/partenaire/partenarie-list/partenarie-list.component.ts
function PartenarieListComponent_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.meetingError, " ");
  }
}
function PartenarieListComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function PartenarieListComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMeetingModal(false));
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function PartenarieListComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "h3", 4);
    \u0275\u0275text(4, " Demander une r\xE9union ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, PartenarieListComponent_div_0_div_7_Template, 2, 1, "div", 6);
    \u0275\u0275elementStart(8, "div", 7)(9, "div")(10, "label", 8);
    \u0275\u0275text(11, "Sujet *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function PartenarieListComponent_div_0_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.meetingSubject, $event) || (ctx_r1.meetingSubject = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div")(14, "label", 8);
    \u0275\u0275text(15, "Date et heure *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function PartenarieListComponent_div_0_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.meetingDate, $event) || (ctx_r1.meetingDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "label", 8);
    \u0275\u0275text(19, "Dur\xE9e (minutes)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function PartenarieListComponent_div_0_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.meetingDuration, $event) || (ctx_r1.meetingDuration = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div")(22, "label", 8);
    \u0275\u0275text(23, "Note (optionnel)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 12);
    \u0275\u0275twoWayListener("ngModelChange", function PartenarieListComponent_div_0_Template_textarea_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.meetingNote, $event) || (ctx_r1.meetingNote = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(25, "          ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 13)(27, "button", 14);
    \u0275\u0275listener("click", function PartenarieListComponent_div_0_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMeetingModal(false));
    });
    \u0275\u0275text(28, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 15);
    \u0275\u0275listener("click", function PartenarieListComponent_div_0_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitMeeting());
    });
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedPartnerForMeeting == null ? null : ctx_r1.selectedPartnerForMeeting.nom, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.meetingError);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.meetingSubject);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.meetingDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.meetingDuration);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.meetingNote);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.meetingSending);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.meetingSending ? "Envoi..." : "Envoyer", " ");
  }
}
var PartenarieListComponent = class _PartenarieListComponent {
  partenaireService;
  authService;
  meetingService;
  router;
  organisations = [];
  filtered = [];
  searchTerm = "";
  selectedType = "";
  selectedStatut = "";
  isLoading = false;
  errorMessage = "";
  successMessage = "";
  isAdmin = false;
  canRequestMeeting = false;
  types = Object.values(TypePartenaire);
  statuts = Object.values(StatutPartenaire);
  currentPage = 1;
  pageSize = 9;
  isMeetingModalOpen = false;
  selectedPartnerForMeeting = null;
  // inline meeting form
  meetingSubject = "";
  meetingDate = "";
  meetingDuration = 30;
  meetingNote = "";
  meetingSending = false;
  meetingError = "";
  constructor(partenaireService, authService, meetingService, router) {
    this.partenaireService = partenaireService;
    this.authService = authService;
    this.meetingService = meetingService;
    this.router = router;
  }
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.canRequestMeeting = this.authService.isAdmin() || this.authService.isUser();
    this.load();
  }
  load() {
    return __async(this, null, function* () {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        this.organisations = yield this.partenaireService.getAll();
        this.applyFilter();
      } catch {
        this.errorMessage = "Impossible de charger les organisations.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  applyFilter() {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this.organisations.filter((o) => {
      const matchText = o.nom.toLowerCase().includes(t) || o.contactEmail.toLowerCase().includes(t) || (o.region ?? "").toLowerCase().includes(t);
      const matchType = !this.selectedType || o.type === this.selectedType;
      const matchStatut = !this.selectedStatut || o.statut === this.selectedStatut;
      return matchText && matchType && matchStatut;
    });
    this.currentPage = 1;
  }
  get paginated() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.filtered.length / this.pageSize);
  }
  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  goToPage(p) {
    this.currentPage = p;
  }
  goToCreate() {
    this.router.navigate(["/partenariat/form"]);
  }
  goToDetail(id) {
    this.router.navigate(["/partenariat/form", id]);
  }
  goToView(id) {
    this.router.navigate(["/partenariat/mon-organisation", id]);
  }
  delete(id) {
    return __async(this, null, function* () {
      if (!confirm("Supprimer cette organisation ?"))
        return;
      try {
        yield this.partenaireService.delete(id);
        this.organisations = this.organisations.filter((o) => o.id !== id);
        this.applyFilter();
        this.flash("Organisation supprimee avec succes.");
      } catch {
        this.errorMessage = "Echec de la suppression.";
      }
    });
  }
  flash(msg) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = "", 4e3);
  }
  statutClass(statut) {
    const map = {
      ACTIF: "badge-actif",
      EN_ATTENTE: "badge-attente",
      SUSPENDU: "badge-suspendu",
      RESILIER: "badge-resilier"
    };
    return map[statut] ?? "badge-attente";
  }
  typeIcon(type) {
    const map = {
      ACADEMIQUE: "A",
      INCUBATEUR: "I",
      PUBLIC: "P",
      ENTREPRISE: "E",
      ASSOCIATIF: "S"
    };
    return map[type] ?? "E";
  }
  openMeetingRequestDialog(partner) {
    if (!this.canRequestMeeting) {
      this.errorMessage = "Seuls les utilisateurs et admins peuvent demander une reunion.";
      return;
    }
    this.selectedPartnerForMeeting = partner;
    this.meetingSubject = "";
    this.meetingDate = "";
    this.meetingDuration = 30;
    this.meetingNote = "";
    this.meetingError = "";
    this.isMeetingModalOpen = true;
  }
  closeMeetingModal(sent = false) {
    this.isMeetingModalOpen = false;
    this.selectedPartnerForMeeting = null;
    if (sent)
      this.flash("Invitation de reunion envoyee avec succes.");
  }
  submitMeeting() {
    return __async(this, null, function* () {
      if (!this.selectedPartnerForMeeting || !this.meetingSubject || !this.meetingDate) {
        this.meetingError = "Veuillez remplir tous les champs obligatoires.";
        return;
      }
      this.meetingSending = true;
      this.meetingError = "";
      try {
        const req = {
          requesterName: "Utilisateur",
          subject: this.meetingSubject,
          suggestedDateTime: this.meetingDate,
          durationMinutes: this.meetingDuration,
          note: this.meetingNote
        };
        yield this.meetingService.requestMeeting(this.selectedPartnerForMeeting.id, req);
        this.closeMeetingModal(true);
      } catch {
        this.meetingError = "Erreur lors de l'envoi. Veuillez r\xE9essayer.";
      } finally {
        this.meetingSending = false;
      }
    });
  }
  static \u0275fac = function PartenarieListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartenarieListComponent)(\u0275\u0275directiveInject(PartenaireService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MeetingService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartenarieListComponent, selectors: [["app-partenarie-list"]], decls: 1, vars: 1, consts: [["class", "meeting-overlay", 3, "click", 4, "ngIf"], [1, "meeting-overlay", 3, "click"], [1, "meeting-shell", 3, "click"], [2, "padding", "24px", "min-width", "340px"], [2, "margin", "0 0 4px", "font-size", "15px", "font-weight", "700"], [2, "margin", "0 0 16px", "font-size", "12px", "color", "#6B7280"], ["style", "margin-bottom:12px; padding:8px 12px; background:#FEE2E2; color:#991B1B; border-radius:8px; font-size:12px;", 4, "ngIf"], [2, "display", "flex", "flex-direction", "column", "gap", "12px"], [2, "display", "block", "font-size", "12px", "font-weight", "600", "margin-bottom", "4px"], ["type", "text", "placeholder", "Objet de la r\xE9union", 2, "width", "100%", "padding", "8px 12px", "border", "1px solid #E5E7EB", "border-radius", "8px", "font-size", "13px", 3, "ngModelChange", "ngModel"], ["type", "datetime-local", 2, "width", "100%", "padding", "8px 12px", "border", "1px solid #E5E7EB", "border-radius", "8px", "font-size", "13px", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "15", "max", "180", 2, "width", "100%", "padding", "8px 12px", "border", "1px solid #E5E7EB", "border-radius", "8px", "font-size", "13px", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Message additionnel...", 2, "width", "100%", "padding", "8px 12px", "border", "1px solid #E5E7EB", "border-radius", "8px", "font-size", "13px", "resize", "vertical", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "gap", "8px", "margin-top", "16px", "justify-content", "flex-end"], [2, "padding", "8px 16px", "border", "1px solid #E5E7EB", "border-radius", "8px", "background", "transparent", "font-size", "13px", "cursor", "pointer", 3, "click"], [2, "padding", "8px 16px", "border", "none", "border-radius", "8px", "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "font-size", "13px", "font-weight", "600", "cursor", "pointer", 3, "click", "disabled"], [2, "margin-bottom", "12px", "padding", "8px 12px", "background", "#FEE2E2", "color", "#991B1B", "border-radius", "8px", "font-size", "12px"]], template: function PartenarieListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, PartenarieListComponent_div_0_Template, 31, 8, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.isMeetingModalOpen && ctx.canRequestMeeting);
    }
  }, dependencies: [NgIf, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n\n.pl-page[_ngcontent-%COMP%] {\n  padding: 2rem 2.5rem;\n  max-width: 1280px;\n  margin: 0 auto;\n}\n.pl-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.pl-eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--color-primary, #6c63ff);\n  margin: 0 0 0.3rem;\n}\n.pl-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0;\n}\n.pl-sub[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #888;\n  margin: 0.25rem 0 0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.2rem;\n  background: #6c63ff;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s, transform 0.1s;\n  white-space: nowrap;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #574fd6;\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  margin-bottom: 1.25rem;\n}\n.alert.success[_ngcontent-%COMP%] {\n  background: #e8faf0;\n  color: #1a7a4a;\n  border: 1px solid #a8e6c3;\n}\n.alert.error[_ngcontent-%COMP%] {\n  background: #fef0f0;\n  color: #c0392b;\n  border: 1px solid #f5c6c6;\n}\n.pl-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-bottom: 1.75rem;\n  flex-wrap: wrap;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: #fff;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  padding: 0 0.85rem;\n  flex: 1;\n  min-width: 220px;\n}\n.search-box[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #aaa;\n  flex-shrink: 0;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  outline: none;\n  font-size: 0.875rem;\n  color: #333;\n  width: 100%;\n  padding: 0.6rem 0;\n  background: transparent;\n}\n.pl-filters[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 0.6rem 0.85rem;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  color: #555;\n  background: #fff;\n  cursor: pointer;\n  outline: none;\n}\n.pl-filters[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #6c63ff;\n}\n.loading-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: #888;\n  font-size: 0.9rem;\n  padding: 2rem 0;\n}\n.ring[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid #e0e0e8;\n  border-top-color: #6c63ff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pl-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 1.25rem;\n}\n.org-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ebebf3;\n  border-radius: 14px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  transition: box-shadow 0.2s, transform 0.2s;\n}\n.org-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 24px rgba(108, 99, 255, 0.1);\n  transform: translateY(-2px);\n}\n.card-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.85rem 1rem;\n  background: #f7f7ff;\n  border-bottom: 1px solid #ebebf3;\n}\n.type-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.type-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #6c63ff;\n  flex: 1;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  padding: 0.2rem 0.55rem;\n  border-radius: 20px;\n}\n.badge-actif[_ngcontent-%COMP%] {\n  background: #e8faf0;\n  color: #1a7a4a;\n}\n.badge-attente[_ngcontent-%COMP%] {\n  background: #fff8e1;\n  color: #b07a00;\n}\n.badge-suspendu[_ngcontent-%COMP%] {\n  background: #fef0f0;\n  color: #c0392b;\n}\n.badge-resilier[_ngcontent-%COMP%] {\n  background: #f0f0f5;\n  color: #666;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1rem;\n  flex: 1;\n}\n.org-nom[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0 0 0.4rem;\n}\n.org-desc[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #777;\n  margin: 0 0 0.85rem;\n  line-height: 1.5;\n  line-clamp: 2;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.org-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.org-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.78rem;\n  color: #888;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  border-top: 1px solid #f0f0f5;\n  background: #fafafa;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.btn-site[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.78rem;\n  color: #6c63ff;\n  text-decoration: none;\n  font-weight: 600;\n  transition: opacity 0.15s;\n}\n.btn-site[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.admin-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  margin-left: auto;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.75rem;\n  background: #f0efff;\n  color: #6c63ff;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.btn-edit[_ngcontent-%COMP%]:hover {\n  background: #e0deff;\n}\n.btn-view[_ngcontent-%COMP%], \n.btn-meeting[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.75rem;\n  background: #f0efff;\n  color: #6c63ff;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.btn-view[_ngcontent-%COMP%]:hover, \n.btn-meeting[_ngcontent-%COMP%]:hover {\n  background: #e0deff;\n}\n.btn-del[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  background: #fef0f0;\n  color: #c0392b;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.btn-del[_ngcontent-%COMP%]:hover {\n  background: #fdd;\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 4rem 0;\n  color: #bbb;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  margin: 0;\n}\n.tfoot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.25rem 0 0;\n  margin-top: 0.5rem;\n}\n.tfoot-info[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #aaa;\n}\n.pager[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.3rem;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid #e0e0e8;\n  border-radius: 6px;\n  background: #fff;\n  font-size: 0.82rem;\n  color: #555;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #6c63ff;\n  color: #6c63ff;\n}\n.pager[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #6c63ff;\n  color: #fff;\n  border-color: #6c63ff;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n.meeting-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.meeting-shell[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 580px;\n  background: #fff;\n  border-radius: 12px;\n  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.2);\n  max-height: 90vh;\n  overflow: auto;\n}\n@media (max-width: 640px) {\n  .pl-page[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n  .pl-title[_ngcontent-%COMP%] {\n    font-size: 1.4rem;\n  }\n  .pl-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=partenarie-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartenarieListComponent, { className: "PartenarieListComponent", filePath: "src\\app\\modules\\partenaire\\partenarie-list\\partenarie-list.component.ts", lineNumber: 13 });
})();

// src/app/modules/partenaire/form-organisation/form-organisation.component.ts
function FormOrganisationComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275element(2, "div", 14)(3, "div", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 15)(5, "div", 15)(6, "div", 16);
    \u0275\u0275elementEnd();
  }
}
function FormOrganisationComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 2);
    \u0275\u0275element(2, "path", 18)(3, "polyline", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.successMessage, " ");
  }
}
function FormOrganisationComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 2);
    \u0275\u0275element(2, "circle", 21)(3, "line", 22)(4, "line", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function FormOrganisationComponent_div_17_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1, "Le nom est requis");
    \u0275\u0275elementEnd();
  }
}
function FormOrganisationComponent_div_17_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1, "Minimum 2 caract\xE8res");
    \u0275\u0275elementEnd();
  }
}
function FormOrganisationComponent_div_17_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275property("value", t_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3);
  }
}
function FormOrganisationComponent_div_17_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1, "Le type est requis");
    \u0275\u0275elementEnd();
  }
}
function FormOrganisationComponent_div_17_span_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1, "Le nom du contact est requis");
    \u0275\u0275elementEnd();
  }
}
function FormOrganisationComponent_div_17_span_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1, "L'email est requis");
    \u0275\u0275elementEnd();
  }
}
function FormOrganisationComponent_div_17_span_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1, "Email invalide");
    \u0275\u0275elementEnd();
  }
}
function FormOrganisationComponent_div_17_option_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", u_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", u_r4.name, " ", u_r4.prenom, " \xB7 ", u_r4.email, " ");
  }
}
function FormOrganisationComponent_div_17_span_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1, " Aucun utilisateur PARTNER disponible. ");
    \u0275\u0275elementEnd();
  }
}
function FormOrganisationComponent_div_17_span_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 73);
  }
}
function FormOrganisationComponent_div_17__svg_svg_89__svg_path_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 79);
  }
}
function FormOrganisationComponent_div_17__svg_svg_89__svg_polyline_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "polyline", 80);
  }
}
function FormOrganisationComponent_div_17__svg_svg_89__svg_polyline_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "polyline", 81);
  }
}
function FormOrganisationComponent_div_17__svg_svg_89__svg_line_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 82);
  }
}
function FormOrganisationComponent_div_17__svg_svg_89__svg_line_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 83);
  }
}
function FormOrganisationComponent_div_17__svg_svg_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 2);
    \u0275\u0275template(1, FormOrganisationComponent_div_17__svg_svg_89__svg_path_1_Template, 1, 0, "path", 74)(2, FormOrganisationComponent_div_17__svg_svg_89__svg_polyline_2_Template, 1, 0, "polyline", 75)(3, FormOrganisationComponent_div_17__svg_svg_89__svg_polyline_3_Template, 1, 0, "polyline", 76)(4, FormOrganisationComponent_div_17__svg_svg_89__svg_line_4_Template, 1, 0, "line", 77)(5, FormOrganisationComponent_div_17__svg_svg_89__svg_line_5_Template, 1, 0, "line", 78);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEditMode);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEditMode);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEditMode);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isEditMode);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isEditMode);
  }
}
function FormOrganisationComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "form", 25);
    \u0275\u0275listener("ngSubmit", function FormOrganisationComponent_div_17_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(2, "div", 26)(3, "h3", 27)(4, "span", 28);
    \u0275\u0275text(5, "01");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Identit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 29)(8, "div", 30)(9, "label", 31);
    \u0275\u0275text(10, "Nom de l'organisation");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 32);
    \u0275\u0275template(12, FormOrganisationComponent_div_17_span_12_Template, 2, 0, "span", 33)(13, FormOrganisationComponent_div_17_span_13_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 34)(15, "label", 35);
    \u0275\u0275text(16, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 36)(18, "select", 37)(19, "option", 38);
    \u0275\u0275text(20, "Choisir un type\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, FormOrganisationComponent_div_17_option_21_Template, 2, 2, "option", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(22, "svg", 40);
    \u0275\u0275element(23, "polyline", 41);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(24, FormOrganisationComponent_div_17_span_24_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(25, "div", 34)(26, "label", 42);
    \u0275\u0275text(27, "R\xE9gion");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "input", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 34)(30, "label", 44);
    \u0275\u0275text(31, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "textarea", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 26)(34, "h3", 27)(35, "span", 28);
    \u0275\u0275text(36, "02");
    \u0275\u0275elementEnd();
    \u0275\u0275text(37, " Contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 29)(39, "div", 34)(40, "label", 46);
    \u0275\u0275text(41, "Nom du contact");
    \u0275\u0275elementEnd();
    \u0275\u0275element(42, "input", 47);
    \u0275\u0275template(43, FormOrganisationComponent_div_17_span_43_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 34)(45, "label", 48);
    \u0275\u0275text(46, "Email du contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(48, "svg", 2);
    \u0275\u0275element(49, "path", 50)(50, "polyline", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(51, "input", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275template(52, FormOrganisationComponent_div_17_span_52_Template, 2, 0, "span", 33)(53, FormOrganisationComponent_div_17_span_53_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 34)(55, "label", 53);
    \u0275\u0275text(56, "Site web");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(58, "svg", 2);
    \u0275\u0275element(59, "circle", 21)(60, "line", 54)(61, "path", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(62, "input", 56);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 26)(64, "h3", 27)(65, "span", 28);
    \u0275\u0275text(66, "03");
    \u0275\u0275elementEnd();
    \u0275\u0275text(67, " Utilisateur partenaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 34)(69, "label", 57);
    \u0275\u0275text(70, " Utilisateur partenaire ");
    \u0275\u0275elementStart(71, "span", 58);
    \u0275\u0275text(72, "(optionnel \u2014 peut \xEAtre assign\xE9 plus tard)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 36);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(74, "svg", 2);
    \u0275\u0275element(75, "path", 59)(76, "circle", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(77, "select", 61)(78, "option", 62);
    \u0275\u0275text(79, "\u2014 Aucun utilisateur \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275template(80, FormOrganisationComponent_div_17_option_80_Template, 2, 4, "option", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(81, "svg", 40);
    \u0275\u0275element(82, "polyline", 41);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(83, FormOrganisationComponent_div_17_span_83_Template, 2, 0, "span", 64);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(84, "div", 65)(85, "button", 66);
    \u0275\u0275listener("click", function FormOrganisationComponent_div_17_Template_button_click_85_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goBack());
    });
    \u0275\u0275text(86, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "button", 67);
    \u0275\u0275template(88, FormOrganisationComponent_div_17_span_88_Template, 1, 0, "span", 68)(89, FormOrganisationComponent_div_17__svg_svg_89_Template, 6, 5, "svg", 69);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(10);
    \u0275\u0275classProp("err", ctx_r0.f["nom"].invalid && ctx_r0.f["nom"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["nom"].touched && ctx_r0.f["nom"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["nom"].touched && ctx_r0.f["nom"].hasError("minlength"));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("err", ctx_r0.f["type"].invalid && ctx_r0.f["type"].touched);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.types);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.f["type"].touched && ctx_r0.f["type"].hasError("required"));
    \u0275\u0275advance(18);
    \u0275\u0275classProp("err", ctx_r0.f["contactNom"].invalid && ctx_r0.f["contactNom"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["contactNom"].touched && ctx_r0.f["contactNom"].hasError("required"));
    \u0275\u0275advance(8);
    \u0275\u0275classProp("err", ctx_r0.f["contactEmail"].invalid && ctx_r0.f["contactEmail"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["contactEmail"].touched && ctx_r0.f["contactEmail"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["contactEmail"].touched && ctx_r0.f["contactEmail"].hasError("email"));
    \u0275\u0275advance(25);
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.availablePartners);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.availablePartners.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSubmitting ? ctx_r0.isEditMode ? "Enregistrement\u2026" : "Cr\xE9ation\u2026" : ctx_r0.isEditMode ? "Enregistrer les modifications" : "Cr\xE9er l'organisation", " ");
  }
}
var FormOrganisationComponent = class _FormOrganisationComponent {
  fb;
  partenaireService;
  userService;
  route;
  router;
  form;
  isEditMode = false;
  editId = null;
  isLoading = false;
  isSubmitting = false;
  errorMessage = "";
  successMessage = "";
  types = Object.values(TypePartenaire);
  statuts = Object.values(StatutPartenaire);
  // available PARTNER users not yet linked to any organisation
  availablePartners = [];
  currentUserId = null;
  // keep track of the currently assigned user in edit mode
  constructor(fb, partenaireService, userService, route, router) {
    this.fb = fb;
    this.partenaireService = partenaireService;
    this.userService = userService;
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.editId = Number(id);
      this.loadOrg(this.editId);
    } else {
      this.loadAvailablePartners(null);
    }
  }
  buildForm() {
    this.form = this.fb.group({
      nom: ["", [Validators.required, Validators.minLength(2)]],
      type: ["", Validators.required],
      description: [""],
      siteWeb: [""],
      contactNom: ["", Validators.required],
      contactEmail: ["", [Validators.required, Validators.email]],
      region: [""],
      userId: [null]
    });
  }
  get f() {
    return this.form.controls;
  }
  // Load all PARTNER users that are not already assigned to an organisation.
  // currentAssignedId: the user currently assigned to THIS org (edit mode) —
  // we keep them in the list so the dropdown doesn't appear empty.
  loadAvailablePartners(currentAssignedId) {
    return __async(this, null, function* () {
      try {
        const [allUsers, allOrgs] = yield Promise.all([
          this.userService.getAllUsers(),
          this.partenaireService.getAll()
        ]);
        const takenIds = new Set(allOrgs.map((o) => o.userId).filter((id) => id !== null && id !== void 0));
        this.availablePartners = allUsers.filter((u) => u.role === "PARTNER" && (!takenIds.has(u.id) || u.id === currentAssignedId));
      } catch {
        this.availablePartners = [];
      }
    });
  }
  loadOrg(id) {
    return __async(this, null, function* () {
      this.isLoading = true;
      try {
        const org = yield this.partenaireService.getById(id);
        this.currentUserId = org.userId;
        this.form.patchValue({
          nom: org.nom,
          type: org.type,
          description: org.description,
          siteWeb: org.siteWeb,
          contactNom: org.contactNom,
          contactEmail: org.contactEmail,
          region: org.region,
          userId: org.userId
        });
        yield this.loadAvailablePartners(org.userId);
      } catch {
        this.errorMessage = "Impossible de charger les donn\xE9es de l'organisation.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  onSubmit() {
    return __async(this, null, function* () {
      this.form.markAllAsTouched();
      if (this.form.invalid)
        return;
      this.isSubmitting = true;
      this.errorMessage = "";
      const payload = {
        nom: this.form.value.nom,
        type: this.form.value.type,
        description: this.form.value.description || void 0,
        siteWeb: this.form.value.siteWeb || void 0,
        contactNom: this.form.value.contactNom,
        contactEmail: this.form.value.contactEmail,
        region: this.form.value.region || void 0,
        userId: this.form.value.userId || void 0
      };
      try {
        if (this.isEditMode && this.editId !== null) {
          yield this.partenaireService.update(this.editId, payload);
          this.successMessage = "Organisation mise \xE0 jour avec succ\xE8s !";
        } else {
          yield this.partenaireService.create(payload);
          this.successMessage = "Organisation cr\xE9\xE9e avec succ\xE8s !";
        }
        setTimeout(() => this.router.navigate(["/partenariat/list"]), 1500);
      } catch (err) {
        this.errorMessage = err?.error?.message || err?.error?.error || "Une erreur est survenue.";
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  goBack() {
    this.router.navigate(["/partenariat/list"]);
  }
  static \u0275fac = function FormOrganisationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormOrganisationComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PartenaireService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormOrganisationComponent, selectors: [["app-form-organisation"]], decls: 18, vars: 6, consts: [[1, "fo-page"], ["type", "button", 1, "back-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "15 18 9 12 15 6"], [1, "fo-header"], [1, "fo-eyebrow"], [1, "fo-title"], [1, "fo-sub"], ["class", "skeleton-card", 4, "ngIf"], ["class", "alert success", 4, "ngIf"], ["class", "alert error", 4, "ngIf"], ["class", "fo-card", 4, "ngIf"], [1, "skeleton-card"], [1, "sk-row"], [1, "sk-block"], [1, "sk-block", "full"], [1, "sk-block", "short"], [1, "alert", "success"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "alert", "error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "fo-card"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "section-title"], [1, "section-num"], [1, "row-2"], [1, "fg", "full"], ["for", "fo-nom"], ["id", "fo-nom", "type", "text", "formControlName", "nom", "placeholder", "Ex : Flat6Labs Tunis"], ["class", "ferr", 4, "ngIf"], [1, "fg"], ["for", "fo-type"], [1, "sel-wrap"], ["id", "fo-type", "formControlName", "type"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "chevron"], ["points", "6 9 12 15 18 9"], ["for", "fo-region"], ["id", "fo-region", "type", "text", "formControlName", "region", "placeholder", "Ex : Tunis, Sfax\u2026"], ["for", "fo-desc"], ["id", "fo-desc", "formControlName", "description", "rows", "3", "placeholder", "D\xE9crivez bri\xE8vement l'organisation\u2026"], ["for", "fo-cnom"], ["id", "fo-cnom", "type", "text", "formControlName", "contactNom", "placeholder", "Ex : Ahmed Ben Ali"], ["for", "fo-cemail"], [1, "input-wrap"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], ["id", "fo-cemail", "type", "email", "formControlName", "contactEmail", "placeholder", "contact@organisation.tn"], ["for", "fo-site"], ["x1", "2", "y1", "12", "x2", "22", "y2", "12"], ["d", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"], ["id", "fo-site", "type", "url", "formControlName", "siteWeb", "placeholder", "https://www.organisation.tn"], ["for", "fo-user"], [1, "label-hint"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["id", "fo-user", "formControlName", "userId"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["class", "field-hint", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn-ghost", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "spin", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], [1, "ferr"], [3, "value"], [1, "field-hint"], [1, "spin"], ["d", "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z", 4, "ngIf"], ["points", "17 21 17 13 7 13 7 21", 4, "ngIf"], ["points", "7 3 7 8 15 8", 4, "ngIf"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19", 4, "ngIf"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12", 4, "ngIf"], ["d", "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z"], ["points", "17 21 17 13 7 13 7 21"], ["points", "7 3 7 8 15 8"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"]], template: function FormOrganisationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "form-organisation works!");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 0)(3, "button", 1);
      \u0275\u0275listener("click", function FormOrganisationComponent_Template_button_click_3_listener() {
        return ctx.goBack();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(4, "svg", 2);
      \u0275\u0275element(5, "polyline", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Retour \xE0 la liste ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 4)(8, "p", 5);
      \u0275\u0275text(9, "Administration");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "h1", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 7);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(14, FormOrganisationComponent_div_14_Template, 7, 0, "div", 8)(15, FormOrganisationComponent_div_15_Template, 5, 1, "div", 9)(16, FormOrganisationComponent_div_16_Template, 6, 1, "div", 10)(17, FormOrganisationComponent_div_17_Template, 91, 24, "div", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Modifier l'organisation" : "Ajouter un partenaire", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Modifiez les informations ci-dessous puis enregistrez." : "Remplissez le formulaire pour cr\xE9er une nouvelle organisation partenaire.", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.fo-page[_ngcontent-%COMP%] {\n  padding: 2rem 2.5rem;\n  max-width: 860px;\n  margin: 0 auto;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: none;\n  border: none;\n  color: #888;\n  font-size: 0.82rem;\n  cursor: pointer;\n  padding: 0;\n  margin-bottom: 1.5rem;\n  transition: color 0.15s;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  color: #6c63ff;\n}\n.fo-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.fo-eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: #6c63ff;\n  margin: 0 0 0.3rem;\n}\n.fo-title[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0 0 0.4rem;\n}\n.fo-sub[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #888;\n  margin: 0;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ebebf3;\n  border-radius: 14px;\n  padding: 1.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.sk-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.sk-block[_ngcontent-%COMP%] {\n  height: 42px;\n  background:\n    linear-gradient(\n      90deg,\n      #f0f0f5 25%,\n      #e8e8f0 50%,\n      #f0f0f5 75%);\n  background-size: 200%;\n  border-radius: 8px;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite;\n}\n.sk-block.full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.sk-block.short[_ngcontent-%COMP%] {\n  width: 40%;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  margin-bottom: 1.25rem;\n}\n.alert.success[_ngcontent-%COMP%] {\n  background: #e8faf0;\n  color: #1a7a4a;\n  border: 1px solid #a8e6c3;\n}\n.alert.error[_ngcontent-%COMP%] {\n  background: #fef0f0;\n  color: #c0392b;\n  border: 1px solid #f5c6c6;\n}\n.fo-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ebebf3;\n  border-radius: 14px;\n  padding: 2rem;\n}\n.form-section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0 0 1.25rem;\n  padding-bottom: 0.6rem;\n  border-bottom: 1px solid #f0f0f5;\n}\n.section-num[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.05em;\n  color: #6c63ff;\n  background: #f0efff;\n  padding: 0.2rem 0.45rem;\n  border-radius: 4px;\n}\n.row-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.fg.full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.fg[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  margin-bottom: 1rem;\n}\n.fg[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #555;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.label-hint[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #aaa;\n  font-size: 0.76rem;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.6rem 0.85rem;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  color: #333;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n  background: #fff;\n  resize: vertical;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.fg[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  border-color: #6c63ff;\n  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.08);\n}\n.fg[_ngcontent-%COMP%]   input.err[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   textarea.err[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n.fg[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%] {\n  -moz-appearance: textfield;\n}\n.fg[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button, \n.fg[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n.input-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  padding: 0 0.85rem;\n  background: #fff;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.input-wrap[_ngcontent-%COMP%]:focus-within {\n  border-color: #6c63ff;\n  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.08);\n}\n.input-wrap[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #bbb;\n  flex-shrink: 0;\n}\n.input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  padding: 0.6rem 0;\n  flex: 1;\n  outline: none;\n  font-size: 0.875rem;\n}\n.input-wrap[_ngcontent-%COMP%]   input.err[_ngcontent-%COMP%] {\n  border: none;\n}\n.sel-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.sel-wrap[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.6rem 2.2rem 0.6rem 0.85rem;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  color: #333;\n  background: #fff;\n  outline: none;\n  appearance: none;\n  cursor: pointer;\n  transition: border-color 0.15s;\n}\n.sel-wrap[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #6c63ff;\n}\n.sel-wrap[_ngcontent-%COMP%]   select.err[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n.chevron[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  pointer-events: none;\n  color: #aaa;\n}\n.ferr[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #e74c3c;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #f0f0f5;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  padding: 0.6rem 1.25rem;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  background: #fff;\n  color: #666;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: border-color 0.15s, color 0.15s;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #aaa;\n  color: #333;\n}\n.btn-ghost[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.4rem;\n  background: #6c63ff;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #574fd6;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.spin[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #aaa;\n  margin-top: 0.2rem;\n}\n.sel-wrap[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:first-child {\n  position: absolute;\n  left: 0.75rem;\n  color: #bbb;\n  pointer-events: none;\n}\n.sel-wrap[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding-left: 2.2rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 640px) {\n  .fo-page[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n  .row-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .fo-title[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n}\n/*# sourceMappingURL=form-organisation.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormOrganisationComponent, { className: "FormOrganisationComponent", filePath: "src\\app\\modules\\partenaire\\form-organisation\\form-organisation.component.ts", lineNumber: 18 });
})();

// src/app/modules/partenaire/mon-organisation/mon-organisation.component.ts
var _c0 = (a0, a1, a2, a3) => ({ "badge-actif": a0, "badge-attente": a1, "badge-suspendu": a2, "badge-resilier": a3 });
function MonOrganisationComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function MonOrganisationComponent_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.faireDemandeConvention());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 11);
    \u0275\u0275element(2, "path", 12)(3, "polyline", 13)(4, "line", 14)(5, "line", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Faire une demande de convention ");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "span", 17);
    \u0275\u0275text(2, " Chargement\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_ng_container_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 20);
    \u0275\u0275element(2, "path", 21)(3, "polyline", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.successMessage, " ");
  }
}
function MonOrganisationComponent_ng_container_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 20);
    \u0275\u0275element(2, "circle", 24)(3, "line", 25)(4, "line", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function MonOrganisationComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MonOrganisationComponent_ng_container_10_div_1_Template, 5, 1, "div", 18)(2, MonOrganisationComponent_ng_container_10_div_2_Template, 6, 1, "div", 8);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.successMessage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
  }
}
function MonOrganisationComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 20);
    \u0275\u0275element(2, "circle", 24)(3, "line", 25)(4, "line", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function MonOrganisationComponent_div_12_a_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.org.siteWeb, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.org.siteWeb);
  }
}
function MonOrganisationComponent_div_12_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_12_div_28_a_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", ctx_r1.org.siteWeb, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.org.siteWeb);
  }
}
function MonOrganisationComponent_div_12_div_28_span_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_12_div_28_div_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 52)(2, "p", 53);
    \u0275\u0275text(3, "Int\xE9ress\xE9 par un partenariat ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 10);
    \u0275\u0275listener("click", function MonOrganisationComponent_div_12_div_28_div_43_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.faireDemandeConvention());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 55);
    \u0275\u0275element(8, "path", 12)(9, "polyline", 13)(10, "line", 14)(11, "line", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Faire une demande de convention ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Envoyez une demande de convention \xE0 ", ctx_r1.org.nom, " et d\xE9finissez vos engagements mutuels.");
  }
}
function MonOrganisationComponent_div_12_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44)(2, "div")(3, "p", 45);
    \u0275\u0275text(4, "Coordonn\xE9es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 46);
    \u0275\u0275text(6, "Informations de contact");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 47)(8, "div", 48)(9, "span", 36);
    \u0275\u0275text(10, "Nom de l'organisation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 37);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 48)(14, "span", 36);
    \u0275\u0275text(15, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 37);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 48)(19, "span", 36);
    \u0275\u0275text(20, "R\xE9gion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 37);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 49)(24, "span", 36);
    \u0275\u0275text(25, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 37);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 48)(29, "span", 36);
    \u0275\u0275text(30, "Nom du contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 37);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 48)(34, "span", 36);
    \u0275\u0275text(35, "Email du contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span", 37);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 49)(39, "span", 36);
    \u0275\u0275text(40, "Site web");
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, MonOrganisationComponent_div_12_div_28_a_41_Template, 2, 2, "a", 38)(42, MonOrganisationComponent_div_12_div_28_span_42_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(43, MonOrganisationComponent_div_12_div_28_div_43_Template, 13, 1, "div", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.org.nom || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.org.type || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.org.region || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.org.description || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.org.contactNom || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.org.contactEmail || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.org.siteWeb);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.org.siteWeb);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isUser);
  }
}
function MonOrganisationComponent_div_12_div_29_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 81);
    \u0275\u0275listener("click", function MonOrganisationComponent_div_12_div_29_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.enableEdit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 82);
    \u0275\u0275element(2, "path", 83)(3, "path", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Modifier ");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_12_div_29_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1, "Le nom est requis");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_12_div_29_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    \u0275\u0275property("value", t_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r6);
  }
}
function MonOrganisationComponent_div_12_div_29_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1, "Le type est requis");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_12_div_29_span_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1, " Le nom est requis ");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_12_div_29_span_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1, " L'email est requis ");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_12_div_29_span_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1, " Email invalide ");
    \u0275\u0275elementEnd();
  }
}
function MonOrganisationComponent_div_12_div_29_div_60_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 91);
  }
}
function MonOrganisationComponent_div_12_div_29_div_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87)(1, "button", 88);
    \u0275\u0275listener("click", function MonOrganisationComponent_div_12_div_29_div_60_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEdit());
    });
    \u0275\u0275text(2, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 89);
    \u0275\u0275template(4, MonOrganisationComponent_div_12_div_29_div_60_span_4_Template, 1, 0, "span", 90);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isSubmitting);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isSubmitting || ctx_r1.form.invalid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmitting ? "Enregistrement\u2026" : "Enregistrer", " ");
  }
}
function MonOrganisationComponent_div_12_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44)(2, "div")(3, "p", 45);
    \u0275\u0275text(4, "Coordonn\xE9es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 46);
    \u0275\u0275text(6, "Informations de contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 56);
    \u0275\u0275text(8, "Seules ces informations peuvent \xEAtre modifi\xE9es.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, MonOrganisationComponent_div_12_div_29_button_9_Template, 5, 0, "button", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "form", 58);
    \u0275\u0275listener("ngSubmit", function MonOrganisationComponent_div_12_div_29_Template_form_ngSubmit_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(11, "div", 59)(12, "div", 60)(13, "label");
    \u0275\u0275text(14, "Nom de l'organisation");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 61);
    \u0275\u0275template(16, MonOrganisationComponent_div_12_div_29_span_16_Template, 2, 0, "span", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 63)(18, "label");
    \u0275\u0275text(19, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 64)(21, "select", 65)(22, "option", 66);
    \u0275\u0275text(23, "Choisir un type\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, MonOrganisationComponent_div_12_div_29_option_24_Template, 2, 2, "option", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 68);
    \u0275\u0275element(26, "polyline", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(27, MonOrganisationComponent_div_12_div_29_span_27_Template, 2, 0, "span", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "div", 63)(29, "label");
    \u0275\u0275text(30, "R\xE9gion");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 60)(33, "label");
    \u0275\u0275text(34, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "textarea", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 63)(37, "label");
    \u0275\u0275text(38, "Nom du contact");
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "input", 72);
    \u0275\u0275template(40, MonOrganisationComponent_div_12_div_29_span_40_Template, 2, 0, "span", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 63)(42, "label");
    \u0275\u0275text(43, "Email du contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 73);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(45, "svg", 20);
    \u0275\u0275element(46, "path", 74)(47, "polyline", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(48, "input", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275template(49, MonOrganisationComponent_div_12_div_29_span_49_Template, 2, 0, "span", 62)(50, MonOrganisationComponent_div_12_div_29_span_50_Template, 2, 0, "span", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 60)(52, "label");
    \u0275\u0275text(53, "Site web");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 73);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(55, "svg", 20);
    \u0275\u0275element(56, "circle", 24)(57, "line", 77)(58, "path", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(59, "input", 79);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(60, MonOrganisationComponent_div_12_div_29_div_60_Template, 6, 4, "div", 80);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", !ctx_r1.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("err", ctx_r1.f["nom"].invalid && ctx_r1.f["nom"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["nom"].touched && ctx_r1.f["nom"].hasError("required"));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r1.types);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.f["type"].touched && ctx_r1.f["type"].hasError("required"));
    \u0275\u0275advance(12);
    \u0275\u0275classProp("err", ctx_r1.f["contactNom"].invalid && ctx_r1.f["contactNom"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["contactNom"].touched && ctx_r1.f["contactNom"].hasError("required"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("disabled", !ctx_r1.isEditing);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("err", ctx_r1.f["contactEmail"].invalid && ctx_r1.f["contactEmail"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["contactEmail"].touched && ctx_r1.f["contactEmail"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["contactEmail"].touched && ctx_r1.f["contactEmail"].hasError("email"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("disabled", !ctx_r1.isEditing);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isEditing);
  }
}
function MonOrganisationComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28)(2, "div", 29)(3, "div", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h2", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 32);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 33);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 34)(13, "div", 35)(14, "span", 36);
    \u0275\u0275text(15, "R\xE9gion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 37);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 35)(19, "span", 36);
    \u0275\u0275text(20, "Site web");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, MonOrganisationComponent_div_12_a_21_Template, 2, 2, "a", 38)(22, MonOrganisationComponent_div_12_span_22_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 40)(24, "span", 36);
    \u0275\u0275text(25, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 37);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(28, MonOrganisationComponent_div_12_div_28_Template, 44, 9, "div", 41)(29, MonOrganisationComponent_div_12_div_29_Template, 61, 19, "div", 41);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.org.nom.charAt(0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.org.nom);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.org.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(11, _c0, ctx_r1.org.statut === "ACTIF", ctx_r1.org.statut === "EN_ATTENTE", ctx_r1.org.statut === "SUSPENDU", ctx_r1.org.statut === "RESILIER"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.org.statut);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.org.region || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.org.siteWeb);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.org.siteWeb);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.org.description || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.viewOnly);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.viewOnly);
  }
}
var MonOrganisationComponent = class _MonOrganisationComponent {
  fb;
  route;
  router;
  authService;
  partenaireService;
  org = null;
  form;
  types = Object.values(TypePartenaire);
  viewOnly = false;
  isUser = false;
  isPartner = false;
  isEditing = false;
  isLoading = false;
  isSubmitting = false;
  errorMessage = "";
  successMessage = "";
  constructor(fb, route, router, authService, partenaireService) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.authService = authService;
    this.partenaireService = partenaireService;
  }
  ngOnInit() {
    this.isUser = this.authService.getRole() === "USER";
    this.isPartner = this.authService.getRole() === "PARTNER";
    this.buildForm();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.viewOnly = true;
      this.loadById(+id);
    } else {
      this.viewOnly = false;
      this.loadMyOrg();
    }
  }
  buildForm() {
    this.form = this.fb.group({
      nom: ["", [Validators.required, Validators.minLength(2)]],
      type: ["", Validators.required],
      description: [""],
      region: [""],
      contactNom: ["", Validators.required],
      contactEmail: ["", [Validators.required, Validators.email]],
      siteWeb: [""]
    });
    this.form.disable();
  }
  get f() {
    return this.form.controls;
  }
  // PARTNER: find their org by matching userId from all orgs
  loadMyOrg() {
    return __async(this, null, function* () {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const myUserId = Number(this.authService.getUserId());
        const allOrgs = yield this.partenaireService.getAll();
        const myOrg = allOrgs.find((o) => Number(o.userId) === myUserId) ?? null;
        if (!myOrg) {
          this.errorMessage = "Aucune organisation trouv\xE9e pour votre compte. Contactez un administrateur.";
          return;
        }
        this.org = myOrg;
        this.patchForm(this.org);
      } catch {
        this.errorMessage = "Impossible de charger votre organisation.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  loadById(id) {
    return __async(this, null, function* () {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        this.org = yield this.partenaireService.getById(id);
        this.patchForm(this.org);
      } catch {
        this.errorMessage = "Impossible de charger cette organisation.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  patchForm(org) {
    this.form.patchValue({
      nom: org.nom,
      type: org.type,
      description: org.description,
      region: org.region,
      contactNom: org.contactNom,
      contactEmail: org.contactEmail,
      siteWeb: org.siteWeb
    });
  }
  faireDemandeConvention() {
    if (!this.org)
      return;
    this.router.navigate(["/partenariat/conventions/form"], { queryParams: { orgId: this.org.id } });
  }
  enableEdit() {
    this.isEditing = true;
    this.form.enable();
    this.successMessage = "";
    this.errorMessage = "";
  }
  cancelEdit() {
    this.isEditing = false;
    if (this.org)
      this.patchForm(this.org);
    this.form.disable();
  }
  onSubmit() {
    return __async(this, null, function* () {
      this.form.markAllAsTouched();
      if (this.form.invalid || !this.org)
        return;
      this.isSubmitting = true;
      this.errorMessage = "";
      const payload = {
        nom: this.form.value.nom,
        type: this.form.value.type,
        description: this.form.value.description || void 0,
        region: this.form.value.region || void 0,
        contactNom: this.form.value.contactNom,
        contactEmail: this.form.value.contactEmail,
        siteWeb: this.form.value.siteWeb || void 0
      };
      try {
        const updated = yield this.partenaireService.updateContactInfo(this.org.id, payload);
        this.org = __spreadValues(__spreadValues({}, this.org), updated);
        this.isEditing = false;
        this.form.disable();
        this.successMessage = "Informations de contact mises \xE0 jour !";
      } catch (err) {
        this.errorMessage = err?.error?.message || "\xC9chec de la mise \xE0 jour.";
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  static \u0275fac = function MonOrganisationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MonOrganisationComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(PartenaireService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MonOrganisationComponent, selectors: [["app-mon-organisation"]], decls: 13, vars: 8, consts: [[1, "mo-page"], [1, "mo-header"], [1, "mo-eyebrow"], [1, "mo-title"], [1, "mo-sub"], ["class", "btn-demande", 3, "click", 4, "ngIf"], ["class", "loading-row", 4, "ngIf"], [4, "ngIf"], ["class", "alert error", 4, "ngIf"], ["class", "mo-body", 4, "ngIf"], [1, "btn-demande", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "12", "y1", "11", "x2", "12", "y2", "17"], ["x1", "9", "y1", "14", "x2", "15", "y2", "14"], [1, "loading-row"], [1, "ring"], ["class", "alert success", 4, "ngIf"], [1, "alert", "success"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "alert", "error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "mo-body"], [1, "info-card"], [1, "info-card-header"], [1, "org-icon"], [1, "org-nom"], [1, "type-pill"], [1, "statut-badge", 3, "ngClass"], [1, "info-grid"], [1, "info-item"], [1, "info-label"], [1, "info-val"], ["target", "_blank", "class", "info-link", 3, "href", 4, "ngIf"], ["class", "info-val", 4, "ngIf"], [1, "info-item", "full"], ["class", "contact-card", 4, "ngIf"], ["target", "_blank", 1, "info-link", 3, "href"], [1, "contact-card"], [1, "contact-card-header"], [1, "section-label"], [1, "section-title"], [1, "fields-grid", "view-grid"], [1, "view-item"], [1, "view-item", "full"], ["class", "cta-banner", 4, "ngIf"], [1, "cta-banner"], [1, "cta-banner-text"], [1, "cta-title"], [1, "cta-sub"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], [1, "section-hint"], ["class", "btn-edit", 3, "click", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "fields-grid"], [1, "fg", "full"], ["type", "text", "formControlName", "nom", "placeholder", "Nom de l'organisation"], ["class", "ferr", 4, "ngIf"], [1, "fg"], [1, "sel-wrap"], ["formControlName", "type"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "chevron"], ["points", "6 9 12 15 18 9"], ["type", "text", "formControlName", "region", "placeholder", "Ex : Tunis, Sfax\u2026"], ["formControlName", "description", "rows", "3", "placeholder", "D\xE9crivez bri\xE8vement l'organisation\u2026"], ["type", "text", "formControlName", "contactNom", "placeholder", "Nom du responsable"], [1, "input-wrap"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], ["type", "email", "formControlName", "contactEmail", "placeholder", "email@organisation.tn"], ["x1", "2", "y1", "12", "x2", "22", "y2", "12"], ["d", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"], ["type", "url", "formControlName", "siteWeb", "placeholder", "https://www.organisation.tn"], ["class", "form-actions", 4, "ngIf"], [1, "btn-edit", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], [1, "ferr"], [3, "value"], [1, "form-actions"], ["type", "button", 1, "btn-ghost", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "spin", 4, "ngIf"], [1, "spin"]], template: function MonOrganisationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275template(8, MonOrganisationComponent_button_8_Template, 7, 0, "button", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, MonOrganisationComponent_div_9_Template, 3, 0, "div", 6)(10, MonOrganisationComponent_ng_container_10_Template, 3, 2, "ng-container", 7)(11, MonOrganisationComponent_div_11_Template, 6, 1, "div", 8)(12, MonOrganisationComponent_div_12_Template, 30, 16, "div", 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.viewOnly ? "R\xE9seau partenaire" : "Espace partenaire");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.viewOnly ? (ctx.org == null ? null : ctx.org.nom) || "Organisation" : "Mon organisation");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.viewOnly ? "D\xE9tails de cette organisation partenaire." : "Consultez les informations de votre organisation et mettez \xE0 jour vos coordonn\xE9es.", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.viewOnly && ctx.isUser && ctx.org);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.viewOnly);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.viewOnly && ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.org);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.mo-page[_ngcontent-%COMP%] {\n  padding: 2rem 2.5rem;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.mo-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.mo-eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: #6c63ff;\n  margin: 0 0 0.3rem;\n}\n.mo-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0 0 0.3rem;\n}\n.mo-sub[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #888;\n  margin: 0;\n}\n.loading-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: #888;\n  font-size: 0.9rem;\n  padding: 2rem 0;\n}\n.ring[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid #e0e0e8;\n  border-top-color: #6c63ff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  margin-bottom: 1.25rem;\n}\n.alert.success[_ngcontent-%COMP%] {\n  background: #e8faf0;\n  color: #1a7a4a;\n  border: 1px solid #a8e6c3;\n}\n.alert.error[_ngcontent-%COMP%] {\n  background: #fef0f0;\n  color: #c0392b;\n  border: 1px solid #f5c6c6;\n}\n.mo-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ebebf3;\n  border-radius: 14px;\n  padding: 1.75rem;\n}\n.info-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n}\n.org-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 12px;\n  background: #f0efff;\n  color: #6c63ff;\n  font-size: 1.4rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.org-nom[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0 0 0.3rem;\n}\n.type-pill[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  background: #f0f0f5;\n  color: #666;\n  padding: 0.2rem 0.6rem;\n  border-radius: 20px;\n}\n.statut-badge[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  padding: 0.25rem 0.65rem;\n  border-radius: 20px;\n  margin-left: auto;\n}\n.badge-actif[_ngcontent-%COMP%] {\n  background: #e8faf0;\n  color: #1a7a4a;\n}\n.badge-attente[_ngcontent-%COMP%] {\n  background: #fff8e1;\n  color: #b07a00;\n}\n.badge-suspendu[_ngcontent-%COMP%] {\n  background: #fef0f0;\n  color: #c0392b;\n}\n.badge-resilier[_ngcontent-%COMP%] {\n  background: #f0f0f5;\n  color: #666;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.info-item.full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #aaa;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.info-val[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #333;\n}\n.info-link[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #6c63ff;\n  text-decoration: none;\n}\n.info-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.contact-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ebebf3;\n  border-radius: 14px;\n  padding: 1.75rem;\n}\n.contact-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n  gap: 1rem;\n}\n.section-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #6c63ff;\n  margin: 0 0 0.2rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0 0 0.2rem;\n}\n.section-hint[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #aaa;\n  margin: 0;\n}\n.fields-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.fg[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.fg.full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.fg[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #555;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 0.6rem 0.85rem;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  color: #333;\n  outline: none;\n  transition: border-color 0.15s;\n  background: #fff;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #6c63ff;\n  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.08);\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n  background: #f8f8fb;\n  color: #aaa;\n  cursor: default;\n}\n.fg[_ngcontent-%COMP%]   input.err[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n.ferr[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #e74c3c;\n}\n.input-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  padding: 0 0.85rem;\n  transition: border-color 0.15s;\n}\n.input-wrap[_ngcontent-%COMP%]:focus-within {\n  border-color: #6c63ff;\n  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.08);\n}\n.input-wrap.disabled[_ngcontent-%COMP%] {\n  background: #f8f8fb;\n}\n.input-wrap.disabled[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #ccc;\n}\n.input-wrap[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #bbb;\n  flex-shrink: 0;\n}\n.input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  padding: 0.6rem 0;\n  flex: 1;\n  outline: none;\n  font-size: 0.875rem;\n  background: transparent;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.5rem 1rem;\n  background: #f0efff;\n  color: #6c63ff;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s;\n  white-space: nowrap;\n}\n.btn-edit[_ngcontent-%COMP%]:hover {\n  background: #e0deff;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 1.25rem;\n  border-top: 1px solid #f0f0f5;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  padding: 0.6rem 1.25rem;\n  border: 1px solid #e0e0e8;\n  border-radius: 8px;\n  background: #fff;\n  color: #666;\n  font-size: 0.875rem;\n  cursor: pointer;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #aaa;\n}\n.btn-ghost[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.4rem;\n  background: #6c63ff;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #574fd6;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.spin[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@media (max-width: 640px) {\n  .mo-page[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n  .info-grid[_ngcontent-%COMP%], \n   .fields-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.mo-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 28px;\n}\n.btn-demande[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: #3b5bdb;\n  color: #fff;\n  border: none;\n  border-radius: 9px;\n  padding: 11px 20px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  align-self: flex-start;\n  margin-top: 4px;\n  transition: background .2s, transform .15s;\n  box-shadow: 0 2px 8px rgba(59, 91, 219, .25);\n}\n.btn-demande[_ngcontent-%COMP%]:hover {\n  background: #2f4ac0;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 14px rgba(59, 91, 219, .35);\n}\n.btn-demande[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.cta-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  margin-top: 24px;\n  padding: 18px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #eff2ff 0%,\n      #f0fdf4 100%);\n  border: 1px solid #dbe4ff;\n  border-radius: 12px;\n  flex-wrap: wrap;\n}\n.cta-banner-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.cta-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0 0 4px;\n}\n.cta-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n  margin: 0;\n  line-height: 1.5;\n}\n@media (max-width: 600px) {\n  .mo-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn-demande[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .cta-banner[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .cta-banner[_ngcontent-%COMP%]   .btn-demande[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=mon-organisation.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MonOrganisationComponent, { className: "MonOrganisationComponent", filePath: "src\\app\\modules\\partenaire\\mon-organisation\\mon-organisation.component.ts", lineNumber: 17 });
})();

// src/app/models/convention.ts
var StatutConvention;
(function(StatutConvention2) {
  StatutConvention2["BROUILLON"] = "BROUILLON";
  StatutConvention2["SIGNEE"] = "SIGNEE";
  StatutConvention2["ACTIVE"] = "ACTIVE";
  StatutConvention2["EXPIREE"] = "EXPIREE";
})(StatutConvention || (StatutConvention = {}));
var StatutObjectif;
(function(StatutObjectif2) {
  StatutObjectif2["EN_COURS"] = "EN_COURS";
  StatutObjectif2["ATTEINT"] = "ATTEINT";
  StatutObjectif2["EN_RETARD"] = "EN_RETARD";
  StatutObjectif2["ANNULE"] = "ANNULE";
})(StatutObjectif || (StatutObjectif = {}));
var ResponsableObjectif;
(function(ResponsableObjectif2) {
  ResponsableObjectif2["USER"] = "USER";
  ResponsableObjectif2["PARTENAIRE"] = "PARTENAIRE";
  ResponsableObjectif2["LES_DEUX"] = "LES_DEUX";
})(ResponsableObjectif || (ResponsableObjectif = {}));

// src/app/services/convention.service.ts
var ConventionService = class _ConventionService {
  http;
  auth;
  base = "http://localhost:8090/api/conventions";
  objBase = "http://localhost:8090/api/objectifs";
  constructor(http, auth) {
    this.http = http;
    this.auth = auth;
  }
  // ── Headers ───────────────────────────────────────────────────────────────
  // Backend checks exact strings: "ROLE_USER", "ROLE_PARTNER", "ROLE_ADMIN"
  // These MUST be sent on every request or the backend throws 500/403.
  headers() {
    return new HttpHeaders({
      "X-User-Role": `ROLE_${this.auth.getRole()}`,
      "X-User-Id": String(this.auth.getUserId())
    });
  }
  // ── Conventions ───────────────────────────────────────────────────────────
  getAll() {
    return firstValueFrom(this.http.get(this.base, { headers: this.headers() }));
  }
  getById(id) {
    return firstValueFrom(this.http.get(`${this.base}/${id}`, { headers: this.headers() }));
  }
  getByUser(userId) {
    return firstValueFrom(this.http.get(`${this.base}/user/${userId}`, { headers: this.headers() }));
  }
  getByOrganisation(orgId) {
    return firstValueFrom(this.http.get(`${this.base}/organisation/${orgId}`, { headers: this.headers() }));
  }
  create(req) {
    return firstValueFrom(this.http.post(this.base, req, { headers: this.headers() }));
  }
  update(id, req) {
    return firstValueFrom(this.http.put(`${this.base}/${id}`, req, { headers: this.headers() }));
  }
  updateStatut(id, statut) {
    return firstValueFrom(this.http.patch(`${this.base}/${id}/statut?statut=${statut}`, {}, { headers: this.headers() }));
  }
  delete(id) {
    return firstValueFrom(this.http.delete(`${this.base}/${id}`, { headers: this.headers() }));
  }
  // ── Confirm ───────────────────────────────────────────────────────────────
  confirmer(id, signature) {
    return firstValueFrom(this.http.post(`${this.base}/${id}/confirmer`, signature ? { signature } : {}, { headers: this.headers() }));
  }
  annuler(id) {
    return firstValueFrom(this.http.post(`${this.base}/${id}/annuler`, {}, { headers: this.headers() }));
  }
  // ── Renewal ───────────────────────────────────────────────────────────────
  demanderRenouvellement(id) {
    return firstValueFrom(this.http.patch(`${this.base}/${id}/renouvellement/demander`, {}, { headers: this.headers() }));
  }
  accepterRenouvellement(id, newTerms) {
    return firstValueFrom(this.http.post(`${this.base}/${id}/renouvellement/accepter`, newTerms, { headers: this.headers() }));
  }
  // ── Objectifs ─────────────────────────────────────────────────────────────
  getObjectifs(conventionId) {
    return firstValueFrom(this.http.get(`${this.objBase}/convention/${conventionId}`, { headers: this.headers() }));
  }
  createObjectif(req) {
    return firstValueFrom(this.http.post(this.objBase, req, { headers: this.headers() }));
  }
  updateObjectif(id, req) {
    return firstValueFrom(this.http.put(`${this.objBase}/${id}`, req, { headers: this.headers() }));
  }
  updateObjectifStatut(id, statut, commentaire) {
    let url = `${this.objBase}/${id}/statut?statut=${statut}`;
    if (commentaire)
      url += `&commentaire=${encodeURIComponent(commentaire)}`;
    return firstValueFrom(this.http.patch(url, {}, { headers: this.headers() }));
  }
  deleteObjectif(id) {
    return firstValueFrom(this.http.delete(`${this.objBase}/${id}`, { headers: this.headers() }));
  }
  downloadConventionPdf(id) {
    this.http.get(`${this.base}/${id}/pdf`, {
      headers: this.headers(),
      // ← utilise les mêmes headers que tous les autres appels
      responseType: "blob"
    }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `convention-${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error("Erreur t\xE9l\xE9chargement PDF", err)
    });
  }
  static \u0275fac = function ConventionService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConventionService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(AuthService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ConventionService, factory: _ConventionService.\u0275fac, providedIn: "root" });
};

// src/app/modules/partenaire/convention-list/convention-list.component.ts
function ConventionListComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Mes conventions");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Conventions de mon organisation");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Toutes les conventions");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function ConventionListComponent_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToCreate());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 24);
    \u0275\u0275element(2, "line", 25)(3, "line", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Nouvelle demande ");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 28)(3, "polyline", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.successMessage, " ");
  }
}
function ConventionListComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "circle", 31)(3, "line", 32)(4, "line", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function ConventionListComponent_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", s_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statutLabel(s_r3));
  }
}
function ConventionListComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "span", 36);
    \u0275\u0275text(2, " Chargement des conventions\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_25_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Vous n'avez pas encore de convention.");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_25_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune convention pour votre organisation pour l'instant.");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_25_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune convention dans le syst\xE8me.");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_25_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function ConventionListComponent_div_25_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToCreate());
    });
    \u0275\u0275text(1, " Faire une premi\xE8re demande ");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 38);
    \u0275\u0275element(2, "path", 39)(3, "polyline", 40)(4, "line", 41)(5, "line", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, ConventionListComponent_div_25_p_6_Template, 2, 0, "p", 5)(7, ConventionListComponent_div_25_p_7_Template, 2, 0, "p", 5)(8, ConventionListComponent_div_25_p_8_Template, 2, 0, "p", 5)(9, ConventionListComponent_div_25_button_9_Template, 2, 0, "button", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isPartner);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isUser);
  }
}
function ConventionListComponent_div_26_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 68);
    \u0275\u0275element(2, "circle", 31)(3, "line", 32)(4, "line", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Action requise ");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_26_div_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.numeroConvention);
  }
}
function ConventionListComponent_div_26_div_1_h3_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.organisationPartenaireNom);
  }
}
function ConventionListComponent_div_26_div_1_h3_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r5.numeroConvention || "Convention #" + c_r5.id, " ");
  }
}
function ConventionListComponent_div_26_div_1_div_23_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", ctx_r1.objectifsEnCours(c_r5), " en cours ");
  }
}
function ConventionListComponent_div_26_div_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 72);
    \u0275\u0275element(2, "polyline", 73)(3, "path", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275template(5, ConventionListComponent_div_26_div_1_div_23_span_5_Template, 2, 1, "span", 75);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", c_r5.objectifs.length, " objectif", c_r5.objectifs.length > 1 ? "s" : "", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.objectifsEnCours(c_r5) > 0);
  }
}
function ConventionListComponent_div_26_div_1_p_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Utilisateur #", c_r5.userId, " ");
  }
}
function ConventionListComponent_div_26_div_1_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 78);
    \u0275\u0275listener("click", function ConventionListComponent_div_26_div_1_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToEdit(c_r5.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 79);
    \u0275\u0275element(2, "path", 80)(3, "path", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Modifier ");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_26_div_1_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 82);
    \u0275\u0275listener("click", function ConventionListComponent_div_26_div_1_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToView(c_r5.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 79);
    \u0275\u0275element(2, "path", 83)(3, "circle", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Voir & Confirmer ");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_26_div_1_button_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function ConventionListComponent_div_26_div_1_button_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToView(c_r5.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 79);
    \u0275\u0275element(2, "path", 83)(3, "circle", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Voir ");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_26_div_1_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 86);
    \u0275\u0275listener("click", function ConventionListComponent_div_26_div_1_button_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.delete(c_r5.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 79);
    \u0275\u0275element(2, "polyline", 87)(3, "path", 88)(4, "path", 89);
    \u0275\u0275elementEnd()();
  }
}
function ConventionListComponent_div_26_div_1_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 90);
    \u0275\u0275listener("click", function ConventionListComponent_div_26_div_1_button_30_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.downloadPdf(c_r5.id, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 79);
    \u0275\u0275element(2, "path", 39)(3, "polyline", 40)(4, "line", 91)(5, "line", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " PDF\n");
    \u0275\u0275elementEnd();
  }
}
function ConventionListComponent_div_26_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46)(2, "span", 47);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ConventionListComponent_div_26_div_1_span_4_Template, 6, 0, "span", 48)(5, ConventionListComponent_div_26_div_1_span_5_Template, 2, 1, "span", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 50);
    \u0275\u0275template(7, ConventionListComponent_div_26_div_1_h3_7_Template, 2, 1, "h3", 51)(8, ConventionListComponent_div_26_div_1_h3_8_Template, 2, 1, "h3", 51);
    \u0275\u0275elementStart(9, "div", 52);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 53);
    \u0275\u0275element(11, "rect", 54)(12, "line", 55)(13, "line", 56)(14, "line", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 58);
    \u0275\u0275text(19, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, ConventionListComponent_div_26_div_1_div_23_Template, 6, 3, "div", 59)(24, ConventionListComponent_div_26_div_1_p_24_Template, 2, 1, "p", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 61);
    \u0275\u0275template(26, ConventionListComponent_div_26_div_1_button_26_Template, 5, 0, "button", 62)(27, ConventionListComponent_div_26_div_1_button_27_Template, 5, 0, "button", 63)(28, ConventionListComponent_div_26_div_1_button_28_Template, 5, 0, "button", 64)(29, ConventionListComponent_div_26_div_1_button_29_Template, 5, 0, "button", 65)(30, ConventionListComponent_div_26_div_1_button_30_Template, 7, 0, "button", 66);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("pending", ctx_r1.isPendingMyAction(c_r5));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.statutClass(c_r5.statut));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statutLabel(c_r5.statut));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isPendingMyAction(c_r5));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", c_r5.numeroConvention);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isUser || ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isPartner);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 17, c_r5.dateDebut, "dd/MM/yyyy"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 20, c_r5.dateFin, "dd/MM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", c_r5.objectifs == null ? null : c_r5.objectifs.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.canEdit(c_r5));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isPendingMyAction(c_r5));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.canEdit(c_r5) && !ctx_r1.isPendingMyAction(c_r5));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit(c_r5));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", c_r5.statut === "ACTIVE");
  }
}
function ConventionListComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275template(1, ConventionListComponent_div_26_div_1_Template, 31, 23, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.paginated);
  }
}
function ConventionListComponent_div_27_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 100);
    \u0275\u0275listener("click", function ConventionListComponent_div_27_button_7_Template_button_click_0_listener() {
      const p_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(p_r13));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", p_r13 === ctx_r1.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r13);
  }
}
function ConventionListComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 93)(1, "span", 94);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 95)(4, "button", 96);
    \u0275\u0275listener("click", function ConventionListComponent_div_27_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.currentPage - 1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 79);
    \u0275\u0275element(6, "polyline", 97);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, ConventionListComponent_div_27_button_7_Template, 2, 3, "button", 98);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "button", 96);
    \u0275\u0275listener("click", function ConventionListComponent_div_27_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.currentPage + 1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 79);
    \u0275\u0275element(10, "polyline", 99);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.paginated.length, " / ", ctx_r1.filtered.length, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.pageNumbers);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
  }
}
var ConventionListComponent = class _ConventionListComponent {
  conventionService;
  partenaireService;
  authService;
  router;
  conventions = [];
  filtered = [];
  searchTerm = "";
  selectedStatut = "";
  statuts = Object.values(StatutConvention);
  isLoading = false;
  errorMessage = "";
  successMessage = "";
  isUser = false;
  isPartner = false;
  isAdmin = false;
  myUserId = 0;
  myOrgId = 0;
  currentPage = 1;
  pageSize = 6;
  constructor(conventionService, partenaireService, authService, router) {
    this.conventionService = conventionService;
    this.partenaireService = partenaireService;
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    const role = this.authService.getRole();
    this.myUserId = Number(this.authService.getUserId());
    this.isUser = role === "USER";
    this.isPartner = role === "PARTNER";
    this.isAdmin = role === "ADMIN";
    console.log("Role:", role, "UserId:", this.myUserId);
    this.load();
  }
  load() {
    return __async(this, null, function* () {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        if (this.isAdmin) {
          this.conventions = yield this.conventionService.getAll();
        } else if (this.isUser) {
          this.conventions = yield this.conventionService.getByUser(this.myUserId);
        } else if (this.isPartner) {
          const allOrgs = yield this.partenaireService.getAll();
          console.log("All orgs:", allOrgs);
          console.log("Looking for userId:", this.myUserId);
          const myOrg = allOrgs.find((o) => Number(o.userId) === Number(this.myUserId));
          console.log("Found org:", myOrg);
          if (!myOrg) {
            this.errorMessage = "Aucune organisation trouv\xE9e pour votre compte. Contactez un administrateur.";
            this.conventions = [];
            this.filtered = [];
            this.applyFilter();
            return;
          }
          this.myOrgId = Number(myOrg.id);
          console.log("myOrgId:", this.myOrgId);
          if (!this.myOrgId || isNaN(this.myOrgId)) {
            this.errorMessage = "ID organisation invalide.";
            return;
          }
          this.conventions = yield this.conventionService.getByOrganisation(this.myOrgId);
        }
        this.applyFilter();
      } catch (err) {
        console.error("Load error:", err);
        const msg = err?.error?.message || err?.message || "";
        if (msg.toLowerCase().includes("not found")) {
          this.errorMessage = "Aucune organisation trouv\xE9e pour votre compte.";
          this.conventions = [];
          this.filtered = [];
        } else {
          this.errorMessage = "Impossible de charger les conventions. " + (err?.error?.message || "");
        }
      } finally {
        this.isLoading = false;
      }
    });
  }
  applyFilter() {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this.conventions.filter((c) => {
      const matchText = (c.numeroConvention ?? "").toLowerCase().includes(t) || (c.organisationPartenaireNom ?? "").toLowerCase().includes(t);
      const matchStatut = !this.selectedStatut || c.statut === this.selectedStatut;
      return matchText && matchStatut;
    });
    this.currentPage = 1;
  }
  get paginated() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.filtered.length / this.pageSize);
  }
  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  goToPage(p) {
    this.currentPage = p;
  }
  statutClass(s) {
    const map = {
      BROUILLON: "badge-brouillon",
      SIGNEE: "badge-signee",
      ACTIVE: "badge-active",
      EXPIREE: "badge-expiree"
    };
    return map[s] ?? "badge-brouillon";
  }
  statutLabel(s) {
    const map = {
      BROUILLON: "Brouillon",
      SIGNEE: "Sign\xE9e",
      ACTIVE: "Active",
      EXPIREE: "Expir\xE9e"
    };
    return map[s] ?? s;
  }
  isPendingMyAction(c) {
    return c.statut === StatutConvention.BROUILLON || c.statut === StatutConvention.SIGNEE;
  }
  canEdit(c) {
    return c.statut === StatutConvention.BROUILLON || c.statut === StatutConvention.SIGNEE;
  }
  goToCreate() {
    this.router.navigate(["/partenariat/conventions/form"]);
  }
  goToEdit(id) {
    this.router.navigate(["/partenariat/conventions/form", id]);
  }
  goToView(id) {
    this.router.navigate(["/partenariat/conventions/form", id]);
  }
  delete(id) {
    return __async(this, null, function* () {
      if (!confirm("Supprimer cette convention ?"))
        return;
      try {
        yield this.conventionService.delete(id);
        this.conventions = this.conventions.filter((c) => c.id !== id);
        this.applyFilter();
        this.flash("Convention supprim\xE9e.");
      } catch {
        this.errorMessage = "\xC9chec de la suppression.";
      }
    });
  }
  flash(msg) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = "", 4e3);
  }
  objectifsEnCours(c) {
    return (c.objectifs ?? []).filter((o) => o.statut === "EN_COURS").length;
  }
  downloadPdf(id, event) {
    event.stopPropagation();
    this.conventionService.downloadConventionPdf(id);
  }
  static \u0275fac = function ConventionListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConventionListComponent)(\u0275\u0275directiveInject(ConventionService), \u0275\u0275directiveInject(PartenaireService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConventionListComponent, selectors: [["app-convention-list"]], decls: 28, vars: 17, consts: [[1, "cl-page"], [1, "cl-header"], [1, "cl-header-text"], [1, "cl-eyebrow"], [1, "cl-title"], [4, "ngIf"], [1, "cl-sub"], ["class", "btn-primary", 3, "click", 4, "ngIf"], ["class", "alert success", 4, "ngIf"], ["class", "alert error", 4, "ngIf"], [1, "cl-filters"], [1, "search-box"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", 3, "ngModelChange", "input", "placeholder", "ngModel"], [3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "loading-row", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "cl-grid", 4, "ngIf"], ["class", "tfoot", 4, "ngIf"], [1, "btn-primary", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "alert", "success"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "alert", "error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [3, "value"], [1, "loading-row"], [1, "ring"], [1, "empty-state"], ["width", "44", "height", "44", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], [1, "cl-grid"], ["class", "conv-card", 3, "pending", 4, "ngFor", "ngForOf"], [1, "conv-card"], [1, "card-top"], [1, "badge", 3, "ngClass"], ["class", "pending-pill", 4, "ngIf"], ["class", "conv-num", 4, "ngIf"], [1, "card-body"], ["class", "org-nom", 4, "ngIf"], [1, "conv-dates"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], [1, "dates-arrow"], ["class", "obj-summary", 4, "ngIf"], ["class", "admin-info", 4, "ngIf"], [1, "card-footer"], ["class", "btn-edit", 3, "click", 4, "ngIf"], ["class", "btn-view", 3, "click", 4, "ngIf"], ["class", "btn-view-only", 3, "click", 4, "ngIf"], ["class", "btn-del", "title", "Supprimer", 3, "click", 4, "ngIf"], ["class", "btn-pdf-small", "title", "T\xE9l\xE9charger le PDF", 3, "click", 4, "ngIf"], [1, "pending-pill"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], [1, "conv-num"], [1, "org-nom"], [1, "obj-summary"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "9 11 12 14 22 4"], ["d", "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"], ["class", "obj-pending", 4, "ngIf"], [1, "obj-pending"], [1, "admin-info"], [1, "btn-edit", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], [1, "btn-view", 3, "click"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], [1, "btn-view-only", 3, "click"], ["title", "Supprimer", 1, "btn-del", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"], ["d", "M10 11v6M14 11v6M9 6V4h6v2"], ["title", "T\xE9l\xE9charger le PDF", 1, "btn-pdf-small", 3, "click"], ["x1", "12", "y1", "18", "x2", "12", "y2", "12"], ["x1", "9", "y1", "15", "x2", "15", "y2", "15"], [1, "tfoot"], [1, "tfoot-info"], [1, "pager"], [3, "click", "disabled"], ["points", "15 18 9 12 15 6"], [3, "active", "click", 4, "ngFor", "ngForOf"], ["points", "9 18 15 12 9 6"], [3, "click"]], template: function ConventionListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "p", 3);
      \u0275\u0275text(4, "Partenariat");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 4);
      \u0275\u0275template(6, ConventionListComponent_span_6_Template, 2, 0, "span", 5)(7, ConventionListComponent_span_7_Template, 2, 0, "span", 5)(8, ConventionListComponent_span_8_Template, 2, 0, "span", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(11, ConventionListComponent_button_11_Template, 5, 0, "button", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, ConventionListComponent_div_12_Template, 5, 1, "div", 8)(13, ConventionListComponent_div_13_Template, 6, 1, "div", 9);
      \u0275\u0275elementStart(14, "div", 10)(15, "div", 11);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 12);
      \u0275\u0275element(17, "circle", 13)(18, "line", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(19, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function ConventionListComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function ConventionListComponent_Template_input_input_19_listener() {
        return ctx.applyFilter();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "select", 16);
      \u0275\u0275twoWayListener("ngModelChange", function ConventionListComponent_Template_select_ngModelChange_20_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedStatut, $event) || (ctx.selectedStatut = $event);
        return $event;
      });
      \u0275\u0275listener("change", function ConventionListComponent_Template_select_change_20_listener() {
        return ctx.applyFilter();
      });
      \u0275\u0275elementStart(21, "option", 17);
      \u0275\u0275text(22, "Tous les statuts");
      \u0275\u0275elementEnd();
      \u0275\u0275template(23, ConventionListComponent_option_23_Template, 2, 2, "option", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(24, ConventionListComponent_div_24_Template, 3, 0, "div", 19)(25, ConventionListComponent_div_25_Template, 10, 4, "div", 20)(26, ConventionListComponent_div_26_Template, 2, 1, "div", 21)(27, ConventionListComponent_div_27_Template, 11, 5, "div", 22);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.isUser);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isPartner);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isAdmin);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate3(" ", ctx.filtered.length, " convention", ctx.filtered.length !== 1 ? "s" : "", " trouv\xE9e", ctx.filtered.length !== 1 ? "s" : "", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isUser);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance(6);
      \u0275\u0275property("placeholder", ctx.isPartner ? "Rechercher par num\xE9ro\u2026" : "Rechercher par num\xE9ro, organisation\u2026");
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatut);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.statuts);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.errorMessage && ctx.paginated.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.paginated.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.totalPages > 1);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ['\n\n.cl-page[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 32px 24px 60px;\n  font-family:\n    "Segoe UI",\n    system-ui,\n    sans-serif;\n  color: #1a1a2e;\n}\n.cl-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.cl-eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: .08em;\n  color: #3b5bdb;\n  text-transform: uppercase;\n  margin: 0 0 4px;\n}\n.cl-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  margin: 0 0 4px;\n  color: #0f172a;\n}\n.cl-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n  margin: 0;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 20px;\n}\n.alert.success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #166534;\n  border: 1px solid #bbf7d0;\n}\n.alert.error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #991b1b;\n  border: 1px solid #fecaca;\n}\n.cl-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 8px 12px;\n  background: #fff;\n  flex: 1;\n  min-width: 200px;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  outline: none;\n  font-size: 13px;\n  flex: 1;\n  color: #1e293b;\n}\n.search-box[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  flex-shrink: 0;\n}\n.cl-filters[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 8px 12px;\n  font-size: 13px;\n  color: #1e293b;\n  background: #fff;\n  outline: none;\n  cursor: pointer;\n}\n.loading-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: #64748b;\n  font-size: 13px;\n  padding: 20px 0;\n}\n.ring[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid #e2e8f0;\n  border-top-color: #3b5bdb;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.cl-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 16px;\n}\n.conv-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition: box-shadow .2s;\n}\n.conv-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 20px rgba(0, 0, 0, .07);\n}\n.conv-card.pending[_ngcontent-%COMP%] {\n  border-color: #93c5fd;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, .08);\n}\n.card-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.conv-num[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 11px;\n  color: #94a3b8;\n  font-family: monospace;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n}\n.badge-brouillon[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.badge-signee[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.badge-active[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.badge-expiree[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.pending-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 10px;\n  font-weight: 600;\n  padding: 3px 8px;\n  border-radius: 20px;\n  animation: _ngcontent-%COMP%_pulse 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: .7;\n  }\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 16px;\n  flex: 1;\n}\n.org-nom[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0 0 10px;\n}\n.conv-dates[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: #64748b;\n  margin-bottom: 10px;\n}\n.conv-dates[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dates-arrow[_ngcontent-%COMP%] {\n  color: #cbd5e1;\n}\n.obj-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  color: #64748b;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border-top: 1px solid #f1f5f9;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  background: #3b5bdb;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 9px 18px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background .2s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #2f4ac0;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: #eff2ff;\n  color: #3b5bdb;\n  border: none;\n  border-radius: 7px;\n  padding: 7px 14px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background .2s;\n}\n.btn-edit[_ngcontent-%COMP%]:hover {\n  background: #dbe4ff;\n}\n.btn-view[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: #f0fdf4;\n  color: #166534;\n  border: none;\n  border-radius: 7px;\n  padding: 7px 14px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background .2s;\n}\n.btn-view[_ngcontent-%COMP%]:hover {\n  background: #dcfce7;\n}\n.btn-del[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #94a3b8;\n  padding: 7px;\n  border-radius: 6px;\n  transition: color .2s, background .2s;\n  margin-left: auto;\n}\n.btn-del[_ngcontent-%COMP%]:hover {\n  color: #ef4444;\n  background: #fef2f2;\n}\n.btn-view-only[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: #f8fafc;\n  color: #64748b;\n  border: 1px solid #e2e8f0;\n  border-radius: 7px;\n  padding: 7px 14px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background .2s;\n}\n.btn-view-only[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.admin-info[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #94a3b8;\n  margin: 6px 0 0;\n}\n.obj-pending[_ngcontent-%COMP%] {\n  color: #d97706;\n  font-weight: 600;\n}\n.btn-pdf-small[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s, border-color 0.2s;\n}\n.btn-pdf-small[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n  border-color: #f87171;\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 60px 20px;\n  color: #94a3b8;\n  text-align: center;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n.tfoot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 24px;\n  font-size: 12px;\n  color: #64748b;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.pager[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  color: #475569;\n  transition: background .15s;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f1f5f9;\n}\n.pager[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #3b5bdb;\n  color: #fff;\n  border-color: #3b5bdb;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: .4;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=convention-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConventionListComponent, { className: "ConventionListComponent", filePath: "src\\app\\modules\\partenaire\\convention-list\\convention-list.component.ts", lineNumber: 13 });
})();

// src/app/modules/partenaire/form-convention/form-convention.component.ts
var _c02 = (a0, a1, a2, a3) => ({ "badge-brouillon": a0, "badge-signee": a1, "badge-active": a2, "badge-expiree": a3 });
function FormConventionComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, " D\xE9finissez les dates et les engagements que vous attendez du partenaire. ");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(2, _c02, ctx_r0.existing.statut === "BROUILLON", ctx_r0.existing.statut === "SIGNEE", ctx_r0.existing.statut === "ACTIVE", ctx_r0.existing.statut === "EXPIREE"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.existing.statut);
  }
}
function FormConventionComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "span", 18);
    \u0275\u0275text(2, " Chargement\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.successMessage);
  }
}
function FormConventionComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function FormConventionComponent_div_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46)(2, "span", 47);
    \u0275\u0275text(3, "Num\xE9ro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 46)(7, "span", 47);
    \u0275\u0275text(8, "Organisation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 48);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 46)(12, "span", 47);
    \u0275\u0275text(13, "P\xE9riode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 48);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.existing.numeroConvention || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.existing.organisationPartenaireNom);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(16, 4, ctx_r0.existing.dateDebut, "dd/MM/yyyy"), " \u2192 ", \u0275\u0275pipeBind2(17, 7, ctx_r0.existing.dateFin, "dd/MM/yyyy"), "");
  }
}
function FormConventionComponent_div_16_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.confirmationStatusMessage, " ");
  }
}
function FormConventionComponent_div_16_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 51);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 52);
    \u0275\u0275element(3, "polyline", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 51);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 52);
    \u0275\u0275element(7, "polyline", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("confirmed", ctx_r0.existing.confirmeParUser);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Porteur de projet ", ctx_r0.existing.confirmeParUser ? "(confirm\xE9 \u2705)" : "(en attente)", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("confirmed", ctx_r0.existing.confirmeParPartenaire);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Partenaire ", ctx_r0.existing.confirmeParPartenaire ? "(confirm\xE9 \u2705)" : "(en attente)", " ");
  }
}
function FormConventionComponent_div_16_div_15_option_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r3 = ctx.$implicit;
    \u0275\u0275property("value", o_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r3.nom);
  }
}
function FormConventionComponent_div_16_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "label");
    \u0275\u0275text(2, "Organisation partenaire ");
    \u0275\u0275elementStart(3, "span", 34);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 55)(6, "select", 56)(7, "option", 57);
    \u0275\u0275text(8, "Choisir une organisation\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, FormConventionComponent_div_16_div_15_option_9_Template, 2, 2, "option", 58);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.organisations);
  }
}
function FormConventionComponent_div_16_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "label");
    \u0275\u0275text(2, "Organisation partenaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.existing.organisationPartenaireNom);
  }
}
function FormConventionComponent_div_16_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1, " La date de d\xE9but doit \xEAtre au minimum demain ");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1, " La date de fin doit \xEAtre au moins 3 mois apr\xE8s la date de d\xE9but ");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_div_31_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "le partenaire");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_div_31_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "le porteur de projet");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_div_31_div_13_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1, "Vous devez faire");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_div_31_div_13_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1, "Vous devez faire");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_div_31_div_13_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r4.description);
  }
}
function FormConventionComponent_div_16_div_31_div_13_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 76);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xC9ch\xE9ance : ", \u0275\u0275pipeBind2(2, 1, o_r4.dateEcheance, "dd/MM/yyyy"), " ");
  }
}
function FormConventionComponent_div_16_div_31_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66);
    \u0275\u0275template(2, FormConventionComponent_div_16_div_31_div_13_span_2_Template, 2, 0, "span", 67)(3, FormConventionComponent_div_16_div_31_div_13_span_3_Template, 2, 0, "span", 68);
    \u0275\u0275elementStart(4, "span", 69);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 70);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, FormConventionComponent_div_16_div_31_div_13_p_8_Template, 2, 1, "p", 71)(9, FormConventionComponent_div_16_div_31_div_13_p_9_Template, 3, 4, "p", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", o_r4.responsable === "USER");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r4.responsable === "PARTENAIRE");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "statut-" + o_r4.statut.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r4.statut);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r4.titre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r4.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r4.dateEcheance);
  }
}
function FormConventionComponent_div_16_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "div", 28);
    \u0275\u0275text(3, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h2", 29);
    \u0275\u0275text(6, " Ce que ");
    \u0275\u0275template(7, FormConventionComponent_div_16_div_31_span_7_Template, 2, 0, "span", 62)(8, FormConventionComponent_div_16_div_31_span_8_Template, 2, 0, "span", 62);
    \u0275\u0275text(9, " attend de vous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 30);
    \u0275\u0275text(11, " Lisez ces engagements avant de confirmer. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 63);
    \u0275\u0275template(13, FormConventionComponent_div_16_div_31_div_13_Template, 10, 7, "div", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r0.isUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isPartner);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r0.otherPartyObjectifs);
  }
}
function FormConventionComponent_div_16_div_32_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "le partenaire");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_div_32_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "le porteur de projet");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_div_32_div_18_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1, " Le titre est requis ");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_div_32_div_18_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 90);
    \u0275\u0275listener("click", function FormConventionComponent_div_16_div_32_div_18_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const i_r7 = \u0275\u0275nextContext().index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeObjectif(i_r7));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 3);
    \u0275\u0275element(2, "polyline", 91)(3, "path", 92);
    \u0275\u0275elementEnd()();
  }
}
function FormConventionComponent_div_16_div_32_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 85)(4, "div", 54)(5, "label");
    \u0275\u0275text(6, "Titre de l'engagement ");
    \u0275\u0275elementStart(7, "span", 34);
    \u0275\u0275text(8, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "input", 86);
    \u0275\u0275template(10, FormConventionComponent_div_16_div_32_div_18_span_10_Template, 2, 0, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 54)(12, "label");
    \u0275\u0275text(13, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "textarea", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 33)(16, "label");
    \u0275\u0275text(17, "Date d'\xE9ch\xE9ance");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, FormConventionComponent_div_16_div_32_div_18_button_19_Template, 4, 0, "button", 89);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctrl_r8 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("formGroupName", i_r7);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r7 + 1);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ((tmp_7_0 = ctrl_r8.get("titre")) == null ? null : tmp_7_0.touched) && ((tmp_7_0 = ctrl_r8.get("titre")) == null ? null : tmp_7_0.hasError("required")));
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r0.objectifsArray.length > 1);
  }
}
function FormConventionComponent_div_16_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "div", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h2", 29);
    \u0275\u0275text(6, " Ce que ");
    \u0275\u0275template(7, FormConventionComponent_div_16_div_32_span_7_Template, 2, 0, "span", 62)(8, FormConventionComponent_div_16_div_32_span_8_Template, 2, 0, "span", 62);
    \u0275\u0275text(9, " doit faire ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 30);
    \u0275\u0275text(11, "D\xE9finissez les engagements que vous attendez de l'autre partie.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 77);
    \u0275\u0275listener("click", function FormConventionComponent_div_16_div_32_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addObjectif());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 78);
    \u0275\u0275element(14, "line", 79)(15, "line", 80);
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Ajouter ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div", 81);
    \u0275\u0275template(18, FormConventionComponent_div_16_div_32_div_18_Template, 20, 4, "div", 82);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.existing && ctx_r0.otherPartyObjectifs.length > 0 ? "3" : "2");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.isUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isPartner);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r0.objectifsArray.controls);
  }
}
function FormConventionComponent_div_16_div_33_div_10_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r10.description);
  }
}
function FormConventionComponent_div_16_div_33_div_10_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 76);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xC9ch\xE9ance : ", \u0275\u0275pipeBind2(2, 1, o_r10.dateEcheance, "dd/MM/yyyy"), " ");
  }
}
function FormConventionComponent_div_16_div_33_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "span", 93);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 94);
    \u0275\u0275listener("change", function FormConventionComponent_div_16_div_33_div_10_Template_select_change_4_listener($event) {
      const o_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.updateObjectifStatut(o_r10.id, $event.target.value));
    });
    \u0275\u0275elementStart(5, "option", 95);
    \u0275\u0275text(6, "En cours");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 96);
    \u0275\u0275text(8, "Atteint");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 97);
    \u0275\u0275text(10, "En retard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 98);
    \u0275\u0275text(12, "Annul\xE9");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "p", 70);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, FormConventionComponent_div_16_div_33_div_10_p_15_Template, 2, 1, "p", 71)(16, FormConventionComponent_div_16_div_33_div_10_p_16_Template, 3, 4, "p", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r10 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r10.responsable);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "statut-" + o_r10.statut.toLowerCase())("value", o_r10.statut);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(o_r10.titre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r10.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", o_r10.dateEcheance);
  }
}
function FormConventionComponent_div_16_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "div", 28);
    \u0275\u0275text(3, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h2", 29);
    \u0275\u0275text(6, "Suivi des objectifs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 30);
    \u0275\u0275text(8, "Mettez \xE0 jour le statut des objectifs dont vous \xEAtes responsable.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 63);
    \u0275\u0275template(10, FormConventionComponent_div_16_div_33_div_10_Template, 17, 6, "div", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r0.existing.objectifs);
  }
}
function FormConventionComponent_div_16_button_35_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 101);
  }
}
function FormConventionComponent_div_16_button_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 99);
    \u0275\u0275template(1, FormConventionComponent_div_16_button_35_span_1_Template, 1, 0, "span", 100);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting || ctx_r0.form.invalid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSubmitting ? "Enregistrement\u2026" : ctx_r0.conventionId ? "Enregistrer les modifications" : "Envoyer la demande", " ");
  }
}
function FormConventionComponent_div_16_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 102);
    \u0275\u0275listener("click", function FormConventionComponent_div_16_button_36_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openSignatureModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 3);
    \u0275\u0275element(2, "path", 103)(3, "polyline", 104);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Confirmer la convention ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
  }
}
function FormConventionComponent_div_16_button_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 105);
    \u0275\u0275listener("click", function FormConventionComponent_div_16_button_37_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.downloadPdf());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 3);
    \u0275\u0275element(2, "path", 106)(3, "polyline", 107)(4, "line", 108)(5, "line", 109);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " T\xE9l\xE9charger la convention (PDF) ");
    \u0275\u0275elementEnd();
  }
}
function FormConventionComponent_div_16_button_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 110);
    \u0275\u0275listener("click", function FormConventionComponent_div_16_button_38_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.annulerConvention());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 3);
    \u0275\u0275element(2, "circle", 111)(3, "line", 112)(4, "line", 113);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Annuler la convention\n");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
  }
}
function FormConventionComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275template(1, FormConventionComponent_div_16_div_1_Template, 18, 10, "div", 22)(2, FormConventionComponent_div_16_div_2_Template, 2, 1, "div", 23)(3, FormConventionComponent_div_16_div_3_Template, 9, 6, "div", 24);
    \u0275\u0275elementStart(4, "form", 25);
    \u0275\u0275listener("ngSubmit", function FormConventionComponent_div_16_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(5, "div", 26)(6, "div", 27)(7, "div", 28);
    \u0275\u0275text(8, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "h2", 29);
    \u0275\u0275text(11, "Informations de la convention");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 30);
    \u0275\u0275text(13, "P\xE9riode et organisation partenaire");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 31);
    \u0275\u0275template(15, FormConventionComponent_div_16_div_15_Template, 10, 2, "div", 32)(16, FormConventionComponent_div_16_div_16_Template, 5, 1, "div", 32);
    \u0275\u0275elementStart(17, "div", 33)(18, "label");
    \u0275\u0275text(19, "Date de d\xE9but ");
    \u0275\u0275elementStart(20, "span", 34);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "input", 35);
    \u0275\u0275listener("change", function FormConventionComponent_div_16_Template_input_change_22_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDateDebutChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, FormConventionComponent_div_16_span_23_Template, 2, 0, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 33)(25, "label");
    \u0275\u0275text(26, "Date de fin ");
    \u0275\u0275elementStart(27, "span", 34);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(29, "input", 37);
    \u0275\u0275template(30, FormConventionComponent_div_16_span_30_Template, 2, 0, "span", 36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(31, FormConventionComponent_div_16_div_31_Template, 14, 3, "div", 38)(32, FormConventionComponent_div_16_div_32_Template, 19, 4, "div", 38)(33, FormConventionComponent_div_16_div_33_Template, 11, 1, "div", 38);
    \u0275\u0275elementStart(34, "div", 39);
    \u0275\u0275template(35, FormConventionComponent_div_16_button_35_Template, 3, 3, "button", 40)(36, FormConventionComponent_div_16_button_36_Template, 5, 1, "button", 41)(37, FormConventionComponent_div_16_button_37_Template, 7, 0, "button", 42)(38, FormConventionComponent_div_16_button_38_Template, 6, 1, "button", 43);
    \u0275\u0275elementStart(39, "button", 44);
    \u0275\u0275listener("click", function FormConventionComponent_div_16_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goBack());
    });
    \u0275\u0275text(40, " Retour \xE0 la liste ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_12_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.existing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.existing && ctx_r0.confirmationStatusMessage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.existing);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r0.isUser && !ctx_r0.conventionId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.existing);
    \u0275\u0275advance(6);
    \u0275\u0275property("min", ctx_r0.minDateDebut)("readonly", !ctx_r0.isEditable());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx_r0.form.get("dateDebut")) == null ? null : tmp_9_0.touched) && ((tmp_9_0 = ctx_r0.form.get("dateDebut")) == null ? null : tmp_9_0.invalid));
    \u0275\u0275advance(6);
    \u0275\u0275property("min", ctx_r0.minDateFin)("readonly", !ctx_r0.isEditable());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_12_0 = ctx_r0.form.get("dateFin")) == null ? null : tmp_12_0.touched) && ((tmp_12_0 = ctx_r0.form.get("dateFin")) == null ? null : tmp_12_0.invalid));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.existing && ctx_r0.otherPartyObjectifs.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEditable());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.existing && ctx_r0.existing.statut === "ACTIVE");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.isEditable());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.conventionId && ctx_r0.canConfirm());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.existing == null ? null : ctx_r0.existing.statut) === "ACTIVE");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.existing && ctx_r0.canAnnuler());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
  }
}
function FormConventionComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114);
    \u0275\u0275listener("click", function FormConventionComponent_div_17_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancelSignature());
    });
    \u0275\u0275elementStart(1, "div", 115);
    \u0275\u0275listener("click", function FormConventionComponent_div_17_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "h2", 116);
    \u0275\u0275text(3, "Votre signature");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 117);
    \u0275\u0275text(5, "Dessinez votre signature dans le cadre ci-dessous");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "canvas", 118);
    \u0275\u0275listener("mousedown", function FormConventionComponent_div_17_Template_canvas_mousedown_6_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.startDraw($event));
    })("mousemove", function FormConventionComponent_div_17_Template_canvas_mousemove_6_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.draw($event));
    })("mouseup", function FormConventionComponent_div_17_Template_canvas_mouseup_6_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.stopDraw());
    })("mouseleave", function FormConventionComponent_div_17_Template_canvas_mouseleave_6_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.stopDraw());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 119)(8, "button", 120);
    \u0275\u0275listener("click", function FormConventionComponent_div_17_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearSignature());
    });
    \u0275\u0275text(9, "Effacer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 121);
    \u0275\u0275listener("click", function FormConventionComponent_div_17_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancelSignature());
    });
    \u0275\u0275text(11, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 122);
    \u0275\u0275listener("click", function FormConventionComponent_div_17_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmSignature());
    });
    \u0275\u0275text(13, " Confirmer la convention ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r0.signatureIsEmpty);
  }
}
var FormConventionComponent = class _FormConventionComponent {
  fb;
  route;
  router;
  auth;
  conventionService;
  partenaireService;
  form;
  conventionId = null;
  existing = null;
  isUser = false;
  isPartner = false;
  isAdmin = false;
  myUserId = 0;
  myRole = "";
  organisations = [];
  isLoading = false;
  isSubmitting = false;
  errorMessage = "";
  successMessage = "";
  // ── Signature modal ───────────────────────────────────────────────────────
  showSignatureModal = false;
  signatureIsEmpty = true;
  sigCanvas;
  sigCtx;
  sigDrawing = false;
  minDateDebut = "";
  minDateFin = "";
  constructor(fb, route, router, auth, conventionService, partenaireService) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.auth = auth;
    this.conventionService = conventionService;
    this.partenaireService = partenaireService;
  }
  ngOnInit() {
    const role = this.auth.getRole();
    this.myUserId = this.auth.getUserId();
    this.myRole = `ROLE_${role}`;
    this.isUser = role === "USER";
    this.isPartner = role === "PARTNER";
    this.isAdmin = role === "ADMIN";
    this.buildForm();
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDateDebut = tomorrow.toISOString().split("T")[0];
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      this.conventionId = +idParam;
      this.loadExisting(this.conventionId);
    } else {
      if (this.isUser) {
        this.loadOrganisations().then(() => {
          const orgIdParam = this.route.snapshot.queryParamMap.get("orgId");
          if (orgIdParam)
            this.form.patchValue({ organisationPartenaireId: +orgIdParam });
        });
      }
      this.addObjectif();
    }
  }
  buildForm() {
    this.form = this.fb.group({
      organisationPartenaireId: [null, Validators.required],
      dateDebut: ["", Validators.required],
      dateFin: ["", Validators.required],
      objectifs: this.fb.array([])
    });
  }
  get objectifsArray() {
    return this.form.get("objectifs");
  }
  objectifGroup() {
    return this.fb.group({
      titre: ["", Validators.required],
      description: [""],
      dateEcheance: [""]
    });
  }
  addObjectif() {
    this.objectifsArray.push(this.objectifGroup());
  }
  removeObjectif(i) {
    this.objectifsArray.removeAt(i);
  }
  loadOrganisations() {
    return __async(this, null, function* () {
      try {
        this.organisations = yield this.partenaireService.getAll();
      } catch {
        this.errorMessage = "Impossible de charger les organisations.";
      }
    });
  }
  loadExisting(id) {
    return __async(this, null, function* () {
      this.isLoading = true;
      try {
        this.existing = yield this.conventionService.getById(id);
        this.form.patchValue({
          organisationPartenaireId: this.existing.organisationPartenaireId,
          dateDebut: this.existing.dateDebut,
          dateFin: this.existing.dateFin
        });
        const myObjectifs = this.existing.objectifs.filter((o) => this.isUser ? o.responsable === ResponsableObjectif.PARTENAIRE : o.responsable === ResponsableObjectif.USER);
        this.objectifsArray.clear();
        myObjectifs.forEach((o) => {
          this.objectifsArray.push(this.fb.group({
            id: [o.id],
            titre: [o.titre, Validators.required],
            description: [o.description],
            dateEcheance: [o.dateEcheance]
          }));
        });
        if (this.objectifsArray.length === 0)
          this.addObjectif();
      } catch {
        this.errorMessage = "Impossible de charger la convention.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  get otherPartyObjectifs() {
    if (!this.existing)
      return [];
    return this.existing.objectifs.filter((o) => this.isUser ? o.responsable === ResponsableObjectif.USER : o.responsable === ResponsableObjectif.PARTENAIRE);
  }
  get myWrittenObjectifs() {
    if (!this.existing)
      return [];
    return this.existing.objectifs.filter((o) => this.isUser ? o.responsable === ResponsableObjectif.PARTENAIRE : o.responsable === ResponsableObjectif.USER);
  }
  get myResponsable() {
    return this.isUser ? ResponsableObjectif.PARTENAIRE : ResponsableObjectif.USER;
  }
  isEditable() {
    if (!this.existing)
      return true;
    return this.existing.statut !== StatutConvention.ACTIVE && this.existing.statut !== StatutConvention.EXPIREE;
  }
  canConfirm() {
    if (!this.existing)
      return false;
    if (this.existing.statut === StatutConvention.ACTIVE)
      return false;
    if (this.existing.statut === StatutConvention.EXPIREE)
      return false;
    if (this.isUser && this.existing.confirmeParUser)
      return false;
    if (this.isPartner && this.existing.confirmeParPartenaire)
      return false;
    if (this.existing.modifieParRole === this.myRole) {
      const otherConfirmed = this.isUser ? this.existing.confirmeParPartenaire : this.existing.confirmeParUser;
      return !!otherConfirmed;
    }
    return true;
  }
  get confirmationStatusMessage() {
    if (!this.existing)
      return "";
    if (this.existing.statut === StatutConvention.ACTIVE)
      return "\u2705 Convention activ\xE9e \u2014 les deux parties ont confirm\xE9.";
    if (this.existing.modifieParRole === this.myRole) {
      const otherConfirmed = this.isUser ? this.existing.confirmeParPartenaire : this.existing.confirmeParUser;
      if (!otherConfirmed) {
        const other = this.isUser ? "le partenaire" : "le porteur de projet";
        return `\u23F3 Vous avez modifi\xE9 la convention \u2014 attendez que ${other} confirme d'abord.`;
      }
      return `\u{1F446} L'autre partie a confirm\xE9 \u2014 c'est votre tour de confirmer.`;
    }
    if (this.isUser && this.existing.confirmeParUser)
      return "\u23F3 Vous avez confirm\xE9 \u2014 en attente de la confirmation du partenaire.";
    if (this.isPartner && this.existing.confirmeParPartenaire)
      return "\u23F3 Vous avez confirm\xE9 \u2014 en attente de la confirmation du porteur de projet.";
    if (this.existing.modifieParRole && this.existing.modifieParRole !== this.myRole) {
      const who = this.isUser ? "Le partenaire" : "Le porteur de projet";
      return `\u{1F446} ${who} a modifi\xE9 la convention \u2014 veuillez la confirmer.`;
    }
    if (!this.existing.modifieParRole)
      return "\u23F3 En attente de la premi\xE8re confirmation.";
    return "";
  }
  // ── Submit ────────────────────────────────────────────────────────────────
  onSubmit() {
    return __async(this, null, function* () {
      this.form.markAllAsTouched();
      if (this.form.invalid)
        return;
      this.isSubmitting = true;
      this.errorMessage = "";
      try {
        const conventionPayload = {
          organisationPartenaireId: this.form.value.organisationPartenaireId,
          userId: this.myUserId,
          dateDebut: this.form.value.dateDebut,
          dateFin: this.form.value.dateFin
        };
        let convention;
        if (this.conventionId) {
          convention = yield this.conventionService.update(this.conventionId, conventionPayload);
        } else {
          convention = yield this.conventionService.create(conventionPayload);
        }
        for (const o of this.objectifsArray.value) {
          const payload = {
            conventionId: convention.id,
            titre: o.titre,
            description: o.description || void 0,
            responsable: this.myResponsable,
            dateEcheance: o.dateEcheance || void 0
          };
          if (o.id)
            yield this.conventionService.updateObjectif(o.id, payload);
          else
            yield this.conventionService.createObjectif(payload);
        }
        this.successMessage = this.conventionId ? "Convention mise \xE0 jour." : "Demande envoy\xE9e. Le partenaire doit maintenant confirmer.";
        setTimeout(() => this.router.navigate(["/partenariat/conventions"]), 1800);
      } catch (err) {
        this.errorMessage = err?.error?.message || "Une erreur est survenue.";
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  // ── Signature modal ───────────────────────────────────────────────────────
  openSignatureModal() {
    if (!this.existing)
      return;
    this.showSignatureModal = true;
    this.signatureIsEmpty = true;
    setTimeout(() => {
      this.sigCanvas = document.getElementById("sigCanvas");
      this.sigCtx = this.sigCanvas.getContext("2d");
      this.sigCtx.strokeStyle = "#1e293b";
      this.sigCtx.lineWidth = 2.5;
      this.sigCtx.lineCap = "round";
      this.sigCtx.lineJoin = "round";
    }, 50);
  }
  startDraw(e) {
    this.sigDrawing = true;
    const p = this.getSigPos(e);
    this.sigCtx.beginPath();
    this.sigCtx.moveTo(p.x, p.y);
  }
  draw(e) {
    if (!this.sigDrawing)
      return;
    const p = this.getSigPos(e);
    this.sigCtx.lineTo(p.x, p.y);
    this.sigCtx.stroke();
    this.signatureIsEmpty = false;
  }
  stopDraw() {
    this.sigDrawing = false;
  }
  getSigPos(e) {
    const rect = this.sigCanvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (this.sigCanvas.width / rect.width),
      y: (e.clientY - rect.top) * (this.sigCanvas.height / rect.height)
    };
  }
  clearSignature() {
    this.sigCtx.clearRect(0, 0, this.sigCanvas.width, this.sigCanvas.height);
    this.signatureIsEmpty = true;
  }
  confirmSignature() {
    return __async(this, null, function* () {
      const dataUrl = this.sigCanvas.toDataURL("image/png");
      this.showSignatureModal = false;
      yield this.confirmer(dataUrl);
    });
  }
  onCancelSignature() {
    this.showSignatureModal = false;
  }
  confirmer(signature) {
    return __async(this, null, function* () {
      if (!this.existing)
        return;
      this.isSubmitting = true;
      this.errorMessage = "";
      try {
        const updated = yield this.conventionService.confirmer(this.existing.id, signature);
        this.existing = updated;
        if (updated.statut === StatutConvention.ACTIVE) {
          this.successMessage = "\u2705 Convention activ\xE9e ! Les deux parties ont confirm\xE9.";
        } else if (this.isUser) {
          this.successMessage = "\u2705 Confirmation enregistr\xE9e. En attente du partenaire.";
        } else {
          this.successMessage = "\u2705 Confirmation enregistr\xE9e. En attente du porteur de projet.";
        }
      } catch (err) {
        this.errorMessage = err?.error?.message || "\xC9chec de la confirmation.";
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  downloadPdf() {
    if (!this.existing)
      return;
    this.conventionService.downloadConventionPdf(this.existing.id);
  }
  onDateDebutChange() {
    const dateDebut = this.form.value.dateDebut;
    if (dateDebut) {
      const minFin = new Date(dateDebut);
      minFin.setMonth(minFin.getMonth() + 3);
      this.minDateFin = minFin.toISOString().split("T")[0];
      const currentFin = this.form.value.dateFin;
      if (currentFin && currentFin < this.minDateFin) {
        this.form.patchValue({ dateFin: "" });
      }
    }
  }
  // Ajouter la méthode annuler
  annulerConvention() {
    return __async(this, null, function* () {
      if (!this.existing)
        return;
      if (!confirm("\xCAtes-vous s\xFBr de vouloir annuler cette convention ? Cette action est irr\xE9versible."))
        return;
      this.isSubmitting = true;
      this.errorMessage = "";
      try {
        const updated = yield this.conventionService.annuler(this.existing.id);
        this.existing = updated;
        this.successMessage = "\u2705 Convention annul\xE9e.";
      } catch (err) {
        this.errorMessage = err?.error?.message || "\xC9chec de l'annulation.";
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  // Ajouter getter pour savoir si on peut annuler
  canAnnuler() {
    if (!this.existing)
      return false;
    return this.existing.statut === StatutConvention.ACTIVE || this.existing.statut === StatutConvention.SIGNEE || this.existing.statut === StatutConvention.BROUILLON;
  }
  updateObjectifStatut(objectifId, statut) {
    return __async(this, null, function* () {
      try {
        yield this.conventionService.updateObjectifStatut(objectifId, statut);
        if (this.existing) {
          this.existing = yield this.conventionService.getById(this.existing.id);
        }
      } catch (err) {
        this.errorMessage = err?.error?.message || "\xC9chec de la mise \xE0 jour du statut.";
      }
    });
  }
  goBack() {
    this.router.navigate(["/partenariat/conventions"]);
  }
  static \u0275fac = function FormConventionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormConventionComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ConventionService), \u0275\u0275directiveInject(PartenaireService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormConventionComponent, selectors: [["app-form-convention"]], decls: 18, vars: 8, consts: [[1, "fc-page"], [1, "fc-header"], [1, "btn-back", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "15 18 9 12 15 6"], [1, "fc-header-text"], [1, "fc-eyebrow"], [1, "fc-title"], ["class", "fc-sub", 4, "ngIf"], ["class", "statut-badge", 3, "ngClass", 4, "ngIf"], ["class", "loading-row", 4, "ngIf"], ["class", "alert success", 4, "ngIf"], ["class", "alert error", 4, "ngIf"], ["class", "fc-body", 4, "ngIf"], ["class", "sig-overlay", 3, "click", 4, "ngIf"], [1, "fc-sub"], [1, "statut-badge", 3, "ngClass"], [1, "loading-row"], [1, "ring"], [1, "alert", "success"], [1, "alert", "error"], [1, "fc-body"], ["class", "info-banner", 4, "ngIf"], ["class", "confirm-status-banner", 4, "ngIf"], ["class", "confirm-indicators", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "fc-card"], [1, "fc-card-header"], [1, "section-num"], [1, "section-title"], [1, "section-sub"], [1, "fields-grid"], ["class", "fg full", 4, "ngIf"], [1, "fg"], [1, "req"], ["type", "date", "formControlName", "dateDebut", 3, "change", "min", "readonly"], ["class", "ferr", 4, "ngIf"], ["type", "date", "formControlName", "dateFin", 3, "min", "readonly"], ["class", "fc-card", 4, "ngIf"], [1, "fc-actions"], ["type", "submit", "class", "btn-primary", 3, "disabled", 4, "ngIf"], ["type", "button", "class", "btn-confirm", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "btn-pdf", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn-annuler", 3, "disabled", "click", 4, "ngIf"], ["type", "button", 1, "btn-ghost", 3, "click", "disabled"], [1, "info-banner"], [1, "info-banner-row"], [1, "ib-label"], [1, "ib-val"], [1, "confirm-status-banner"], [1, "confirm-indicators"], [1, "ci-item"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["points", "20 6 9 17 4 12"], [1, "fg", "full"], [1, "sel-wrap"], ["formControlName", "organisationPartenaireId"], ["disabled", "", 3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "ro-field"], [1, "ferr"], [4, "ngIf"], [1, "objectifs-ro-list"], ["class", "obj-ro-item", 4, "ngFor", "ngForOf"], [1, "obj-ro-item"], [1, "obj-ro-header"], ["class", "obj-ro-badge resp-user", 4, "ngIf"], ["class", "obj-ro-badge resp-partenaire", 4, "ngIf"], [1, "obj-ro-statut", 3, "ngClass"], [1, "obj-ro-titre"], ["class", "obj-ro-desc", 4, "ngIf"], ["class", "obj-ro-date", 4, "ngIf"], [1, "obj-ro-badge", "resp-user"], [1, "obj-ro-badge", "resp-partenaire"], [1, "obj-ro-desc"], [1, "obj-ro-date"], ["type", "button", 1, "btn-add-obj", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["formArrayName", "objectifs", 1, "objectifs-list"], ["class", "objectif-row", 3, "formGroupName", 4, "ngFor", "ngForOf"], [1, "objectif-row", 3, "formGroupName"], [1, "obj-index"], [1, "obj-fields"], ["type", "text", "formControlName", "titre", "placeholder", "Ex : Fournir 30 stages PFE par an"], ["formControlName", "description", "rows", "2", "placeholder", "D\xE9tails\u2026"], ["type", "date", "formControlName", "dateEcheance"], ["type", "button", "class", "btn-del-obj", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn-del-obj", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"], [1, "obj-ro-badge"], [1, "statut-select", 3, "change", "ngClass", "value"], ["value", "EN_COURS"], ["value", "ATTEINT"], ["value", "EN_RETARD"], ["value", "ANNULE"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "spin", 4, "ngIf"], [1, "spin"], ["type", "button", 1, "btn-confirm", 3, "click", "disabled"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], ["type", "button", 1, "btn-pdf", 3, "click"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "12", "y1", "18", "x2", "12", "y2", "12"], ["x1", "9", "y1", "15", "x2", "15", "y2", "15"], ["type", "button", 1, "btn-annuler", 3, "click", "disabled"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "15", "y1", "9", "x2", "9", "y2", "15"], ["x1", "9", "y1", "9", "x2", "15", "y2", "15"], [1, "sig-overlay", 3, "click"], [1, "sig-modal", 3, "click"], [1, "sig-title"], [1, "sig-sub"], ["id", "sigCanvas", "width", "500", "height", "180", 1, "sig-canvas", 3, "mousedown", "mousemove", "mouseup", "mouseleave"], [1, "sig-actions"], ["type", "button", 1, "btn-clear", 3, "click"], ["type", "button", 1, "btn-cancel-sig", 3, "click"], ["type", "button", 1, "btn-confirm-sig", 3, "click", "disabled"]], template: function FormConventionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function FormConventionComponent_Template_button_click_2_listener() {
        return ctx.goBack();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "polyline", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " Retour ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(6, "div", 5)(7, "p", 6);
      \u0275\u0275text(8, "Partenariat");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h1", 7);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275template(11, FormConventionComponent_p_11_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, FormConventionComponent_span_12_Template, 2, 7, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275template(13, FormConventionComponent_div_13_Template, 3, 0, "div", 10)(14, FormConventionComponent_div_14_Template, 2, 1, "div", 11)(15, FormConventionComponent_div_15_Template, 2, 1, "div", 12)(16, FormConventionComponent_div_16_Template, 41, 20, "div", 13)(17, FormConventionComponent_div_17_Template, 14, 1, "div", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1(" ", ctx.conventionId ? "Convention" : "Nouvelle demande de convention", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.conventionId);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.existing);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showSignatureModal);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormGroupName, FormArrayName, DatePipe], styles: ['\n\n.fc-page[_ngcontent-%COMP%] {\n  max-width: 820px;\n  margin: 0 auto;\n  padding: 32px 24px 60px;\n  font-family:\n    "Segoe UI",\n    system-ui,\n    sans-serif;\n  color: #1a1a2e;\n}\n.btn-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  color: #64748b;\n  font-size: 13px;\n  cursor: pointer;\n  padding: 0;\n  margin-bottom: 16px;\n  transition: color .2s;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  color: #3b5bdb;\n}\n.fc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 28px;\n  flex-wrap: wrap;\n}\n.fc-header-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.fc-eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: .08em;\n  color: #3b5bdb;\n  text-transform: uppercase;\n  margin: 0 0 4px;\n}\n.fc-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  margin: 0 0 6px;\n  color: #0f172a;\n}\n.fc-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n  margin: 0;\n}\n.statut-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  align-self: flex-start;\n  margin-top: 4px;\n}\n.badge-brouillon[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.badge-signee[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.badge-active[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.badge-expiree[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 20px;\n}\n.alert.success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #166534;\n  border: 1px solid #bbf7d0;\n}\n.alert.error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #991b1b;\n  border: 1px solid #fecaca;\n}\n.loading-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: #64748b;\n  font-size: 13px;\n  padding: 20px 0;\n}\n.ring[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid #e2e8f0;\n  border-top-color: #3b5bdb;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.info-banner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px 28px;\n  background: #f8faff;\n  border: 1px solid #dbe4ff;\n  border-radius: 10px;\n  padding: 14px 18px;\n  margin-bottom: 20px;\n}\n.info-banner-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.ib-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  color: #94a3b8;\n}\n.ib-val[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #1e293b;\n}\n.fc-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 24px;\n  margin-bottom: 20px;\n}\n.fc-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 14px;\n  margin-bottom: 20px;\n}\n.section-num[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: #eff2ff;\n  color: #3b5bdb;\n  font-size: 13px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0 0 3px;\n}\n.section-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n  margin: 0;\n}\n.fc-card-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-of-type {\n  flex: 1;\n}\n.fields-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.fg[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.fg.full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.fg[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #475569;\n}\n.req[_ngcontent-%COMP%] {\n  color: #e11d48;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 9px 12px;\n  font-size: 13px;\n  color: #1e293b;\n  background: #fff;\n  outline: none;\n  transition: border-color .2s, box-shadow .2s;\n  font-family: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.fg[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus, \n.fg[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #3b5bdb;\n  box-shadow: 0 0 0 3px rgba(59, 91, 219, .08);\n}\n.fg[_ngcontent-%COMP%]   input.err[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   select.err[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n}\n.fg[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.ferr[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #ef4444;\n}\n.sel-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.sel-wrap[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  appearance: none;\n  padding-right: 32px;\n}\n.sel-wrap[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n  color: #94a3b8;\n}\n.ro-field[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 9px 12px;\n  font-size: 13px;\n  color: #64748b;\n}\n.btn-add-obj[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: #eff2ff;\n  color: #3b5bdb;\n  border: none;\n  border-radius: 8px;\n  padding: 7px 14px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  align-self: flex-start;\n  margin-left: auto;\n  transition: background .2s;\n}\n.btn-add-obj[_ngcontent-%COMP%]:hover {\n  background: #dbe4ff;\n}\n.objectifs-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.objectif-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  padding: 16px;\n}\n.obj-index[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: #3b5bdb;\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.obj-fields[_ngcontent-%COMP%] {\n  flex: 1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.obj-fields[_ngcontent-%COMP%]   .fg.full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.btn-del-obj[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #94a3b8;\n  padding: 4px;\n  border-radius: 6px;\n  transition: color .2s, background .2s;\n  flex-shrink: 0;\n}\n.btn-del-obj[_ngcontent-%COMP%]:hover {\n  color: #ef4444;\n  background: #fef2f2;\n}\n.objectifs-ro-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.obj-ro-item[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  padding: 14px 16px;\n}\n.obj-ro-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.obj-ro-badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: .05em;\n}\n.resp-user[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.resp-partenaire[_ngcontent-%COMP%] {\n  background: #fce7f3;\n  color: #9d174d;\n}\n.resp-les_deux[_ngcontent-%COMP%] {\n  background: #ede9fe;\n  color: #5b21b6;\n}\n.obj-ro-statut[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: .05em;\n  margin-left: auto;\n  padding: 3px 8px;\n  border-radius: 12px;\n}\n.statut-en_cours[_ngcontent-%COMP%] {\n  background: #fef9c3;\n  color: #92400e;\n}\n.statut-atteint[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.statut-en_retard[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.statut-annule[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.obj-ro-titre[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0 0 4px;\n}\n.obj-ro-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n  margin: 0 0 6px;\n}\n.obj-ro-date[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  color: #94a3b8;\n  margin: 0;\n}\n.empty-obj[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #94a3b8;\n  text-align: center;\n  padding: 20px 0;\n}\n.fc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: #3b5bdb;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 10px 22px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background .2s, opacity .2s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #2f4ac0;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: #166534;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 10px 22px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background .2s, opacity .2s;\n}\n.btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #14532d;\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid #e2e8f0;\n  color: #64748b;\n  border-radius: 8px;\n  padding: 10px 18px;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background .2s;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n}\n.spin[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border: 2px solid rgba(255, 255, 255, .3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .7s linear infinite;\n  display: inline-block;\n}\n.btn-pdf[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: #dc2626;\n  color: #fff;\n  border: none;\n  padding: 10px 18px;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-pdf[_ngcontent-%COMP%]:hover {\n  background: #b91c1c;\n}\n.sig-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.sig-modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 28px;\n  width: 560px;\n  max-width: 95vw;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\n}\n.sig-title[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 1.1rem;\n  font-weight: 600;\n}\n.sig-sub[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.sig-canvas[_ngcontent-%COMP%] {\n  border: 2px dashed #d1d5db;\n  border-radius: 8px;\n  cursor: crosshair;\n  width: 100%;\n  display: block;\n  background: #fafafa;\n}\n.sig-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n  justify-content: flex-end;\n}\n.btn-clear[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  border: 1px solid #e5e7eb;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e5e7eb;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.btn-confirm-sig[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 8px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n}\n.btn-confirm-sig[_ngcontent-%COMP%]:disabled {\n  background: #93c5fd;\n  cursor: not-allowed;\n}\n.sig-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.sig-modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 28px;\n  width: 560px;\n  max-width: 95vw;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);\n}\n.sig-title[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 1.1rem;\n  font-weight: 600;\n}\n.sig-sub[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.sig-canvas[_ngcontent-%COMP%] {\n  border: 2px dashed #d1d5db;\n  border-radius: 8px;\n  cursor: crosshair;\n  width: 100%;\n  display: block;\n  background: #fafafa;\n}\n.sig-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n  justify-content: flex-end;\n}\n.btn-clear[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  border: 1px solid #e5e7eb;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.btn-cancel-sig[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e5e7eb;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.btn-confirm-sig[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 8px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n}\n.btn-confirm-sig[_ngcontent-%COMP%]:disabled {\n  background: #93c5fd;\n  cursor: not-allowed;\n}\n.btn-pdf[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: #dc2626;\n  color: #fff;\n  border: none;\n  padding: 10px 18px;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-pdf[_ngcontent-%COMP%]:hover {\n  background: #b91c1c;\n}\n@media (max-width: 600px) {\n  .fields-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .fg.full[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n  .obj-fields[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .obj-fields[_ngcontent-%COMP%]   .fg.full[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n}\n/*# sourceMappingURL=form-convention.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormConventionComponent, { className: "FormConventionComponent", filePath: "src\\app\\modules\\partenaire\\form-convention\\form-convention.component.ts", lineNumber: 18 });
})();

// src/app/modules/partenaire/partenaire-routing.module.ts
var routes = [
  { path: "list", component: PartenarieListComponent, canActivate: [authGuard] },
  { path: "mon-organisation", component: MonOrganisationComponent, canActivate: [authGuard], data: { role: "PARTNER" } },
  { path: "mon-organisation/:id", component: MonOrganisationComponent, canActivate: [authGuard] },
  { path: "form", component: FormOrganisationComponent, canActivate: [authGuard], data: { role: "ADMIN" } },
  { path: "form/:id", component: FormOrganisationComponent, canActivate: [authGuard], data: { role: "ADMIN" } },
  { path: "conventions", component: ConventionListComponent, canActivate: [authGuard] },
  { path: "conventions/form", component: FormConventionComponent, canActivate: [authGuard] },
  { path: "conventions/form/:id", component: FormConventionComponent, canActivate: [authGuard] }
];
var PartenaireRoutingModule = class _PartenaireRoutingModule {
  static \u0275fac = function PartenaireRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartenaireRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _PartenaireRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};

// src/app/modules/partenaire/partenarie-details/partenarie-details.component.ts
var PartenarieDetailsComponent = class _PartenarieDetailsComponent {
  static \u0275fac = function PartenarieDetailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartenarieDetailsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartenarieDetailsComponent, selectors: [["app-partenarie-details"]], decls: 2, vars: 0, template: function PartenarieDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "partenarie-details works!");
      \u0275\u0275elementEnd();
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartenarieDetailsComponent, { className: "PartenarieDetailsComponent", filePath: "src\\app\\modules\\partenaire\\partenarie-details\\partenarie-details.component.ts", lineNumber: 8 });
})();

// src/app/modules/partenaire/partenaire.module.ts
var PartenaireModule = class _PartenaireModule {
  static \u0275fac = function PartenaireModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartenaireModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _PartenaireModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    PartenaireRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ] });
};
export {
  PartenaireModule
};
//# sourceMappingURL=chunk-5DNF2ALW.js.map
