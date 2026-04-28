import {
  authGuard
} from "./chunk-KJFIX64G.js";
import {
  ActivatedRoute,
  AuthService,
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  EventEmitter,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClient,
  HttpParams,
  MinValidator,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  ReactiveFormsModule,
  Router,
  RouterLink,
  RouterModule,
  SelectControlValueAccessor,
  SlicePipe,
  Subject,
  Validators,
  __spreadProps,
  __spreadValues,
  distinctUntilChanged,
  takeUntil,
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
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HBGQ7VAX.js";

// src/app/services/event.service.ts
var EventService = class _EventService {
  http;
  api = "http://localhost:8090/api/events";
  constructor(http) {
    this.http = http;
  }
  getAll(filters) {
    let params = new HttpParams();
    if (filters?.status)
      params = params.set("status", filters.status);
    if (filters?.type)
      params = params.set("type", filters.type);
    if (filters?.organizerId)
      params = params.set("organizerId", String(filters.organizerId));
    return this.http.get(this.api, { params });
  }
  getById(id) {
    return this.http.get(`${this.api}/${id}`);
  }
  create(event) {
    return this.http.post(this.api, event);
  }
  update(id, event) {
    return this.http.put(`${this.api}/${id}`, event);
  }
  delete(id) {
    return this.http.delete(`${this.api}/${id}`);
  }
  submit(id) {
    return this.http.patch(`${this.api}/${id}/submit`, {});
  }
  publish(id) {
    return this.http.patch(`${this.api}/${id}/publish`, {});
  }
  getPending() {
    return this.http.get(`${this.api}/pending`);
  }
  approve(id) {
    return this.http.patch(`${this.api}/${id}/approve`, {});
  }
  reject(id, reason) {
    return this.http.patch(`${this.api}/${id}/reject`, { reason });
  }
  uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.api}/upload-image`, formData);
  }
  generateDescription(title, date, eventType) {
    return this.http.post(`${this.api}/generate-description`, { title, date, eventType });
  }
  static \u0275fac = function EventService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EventService, factory: _EventService.\u0275fac, providedIn: "root" });
};

// src/app/modules/event/components/event-card/event-card.component.ts
var _c0 = (a0) => ["/events", a0];
var _c1 = (a0) => ["/events", a0, "edit"];
function EventCardComponent_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 16);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.event.coverImageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r0.event.title);
  }
}
function EventCardComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 18);
    \u0275\u0275element(2, "rect", 19)(3, "circle", 20)(4, "polyline", 21);
    \u0275\u0275elementEnd()();
  }
}
function EventCardComponent_p_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.event.description);
  }
}
function EventCardComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 24);
    \u0275\u0275element(2, "rect", 25)(3, "line", 26)(4, "line", 27)(5, "line", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(ctx_r0.event.startDate), " ");
  }
}
function EventCardComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 24);
    \u0275\u0275element(2, "path", 29)(3, "circle", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.event.locationType, " ");
  }
}
function EventCardComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 24);
    \u0275\u0275element(2, "path", 31)(3, "circle", 32)(4, "path", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.event.capacityMax, " places ");
  }
}
function EventCardComponent_div_17_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r2);
  }
}
function EventCardComponent_div_17_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", ctx_r0.event.targetSector.length - 3, " ");
  }
}
function EventCardComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275template(1, EventCardComponent_div_17_span_1_Template, 2, 1, "span", 35);
    \u0275\u0275pipe(2, "slice");
    \u0275\u0275template(3, EventCardComponent_div_17_span_3_Template, 2, 1, "span", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pipeBind3(2, 2, ctx_r0.event.targetSector, 0, 3));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.event.targetSector.length > 3);
  }
}
function EventCardComponent_div_21_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function EventCardComponent_div_21_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDelete());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 24);
    \u0275\u0275element(2, "polyline", 45)(3, "path", 46)(4, "path", 47);
    \u0275\u0275elementEnd()();
  }
}
function EventCardComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "a", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 24);
    \u0275\u0275element(3, "path", 41)(4, "path", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, EventCardComponent_div_21_button_5_Template, 5, 0, "button", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c1, ctx_r0.event.id));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.isAdmin);
  }
}
var EventCardComponent = class _EventCardComponent {
  authService;
  event;
  deleted = new EventEmitter();
  constructor(authService) {
    this.authService = authService;
  }
  get canEdit() {
    const role = this.authService.getRole();
    return ["ROLE_ADMIN", "ADMIN", "ROLE_MENTOR", "MENTOR", "ROLE_PARTENAIRE", "PARTENAIRE"].includes(role);
  }
  get isAdmin() {
    const role = this.authService.getRole();
    return role === "ADMIN" || role === "ROLE_ADMIN";
  }
  get statusClass() {
    switch (this.event.status) {
      case "PUBLIE":
        return "status-publie";
      case "ANNULE":
        return "status-annule";
      case "TERMINE":
        return "status-termine";
      default:
        return "status-brouillon";
    }
  }
  get statusLabel() {
    switch (this.event.status) {
      case "PUBLIE":
        return "Publi\xE9";
      case "ANNULE":
        return "Annul\xE9";
      case "TERMINE":
        return "Termin\xE9";
      default:
        return "Brouillon";
    }
  }
  formatDate(date) {
    if (!date)
      return "\u2014";
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  onDelete() {
    if (confirm(`Supprimer "${this.event.title}" ?`)) {
      this.deleted.emit(this.event.id);
    }
  }
  static \u0275fac = function EventCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventCardComponent)(\u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventCardComponent, selectors: [["app-event-card"]], inputs: { event: "event" }, outputs: { deleted: "deleted" }, decls: 22, vars: 17, consts: [[1, "card"], [1, "card-cover"], ["class", "cover-img", 3, "src", "alt", 4, "ngIf"], ["class", "cover-placeholder", 4, "ngIf"], [1, "cover-badges"], [1, "type-pill"], [1, "status-pill", 3, "ngClass"], [1, "card-body"], [1, "card-title"], ["class", "card-desc", 4, "ngIf"], [1, "card-meta"], ["class", "meta-item", 4, "ngIf"], ["class", "card-tags", 4, "ngIf"], [1, "card-footer"], [1, "btn-view", 3, "routerLink"], ["class", "card-actions", 4, "ngIf"], [1, "cover-img", 3, "src", "alt"], [1, "cover-placeholder"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2"], ["cx", "8.5", "cy", "8.5", "r", "1.5"], ["points", "21 15 16 10 5 21"], [1, "card-desc"], [1, "meta-item"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], [1, "card-tags"], ["class", "tag", 4, "ngFor", "ngForOf"], ["class", "tag tag-more", 4, "ngIf"], [1, "tag"], [1, "tag", "tag-more"], [1, "card-actions"], ["title", "Modifier", 1, "btn-icon", "btn-icon-edit", 3, "routerLink"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], ["class", "btn-icon btn-icon-delete", "title", "Supprimer", 3, "click", 4, "ngIf"], ["title", "Supprimer", 1, "btn-icon", "btn-icon-delete", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v6M14 11v6"]], template: function EventCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275template(2, EventCardComponent_img_2_Template, 1, 2, "img", 2)(3, EventCardComponent_div_3_Template, 5, 0, "div", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "span", 5);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span", 6);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 7)(10, "h3", 8);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, EventCardComponent_p_12_Template, 2, 1, "p", 9);
      \u0275\u0275elementStart(13, "div", 10);
      \u0275\u0275template(14, EventCardComponent_div_14_Template, 7, 1, "div", 11)(15, EventCardComponent_div_15_Template, 5, 1, "div", 11)(16, EventCardComponent_div_16_Template, 6, 1, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, EventCardComponent_div_17_Template, 4, 6, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 13)(19, "a", 14);
      \u0275\u0275text(20, "Voir");
      \u0275\u0275elementEnd();
      \u0275\u0275template(21, EventCardComponent_div_21_Template, 6, 4, "div", 15);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classProp("no-cover", !ctx.event.coverImageUrl);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.event.coverImageUrl);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.event.coverImageUrl);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.event.type);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.statusClass);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.statusLabel);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.event.title);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.event.description);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.event.startDate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.event.locationType);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.event.capacityMax);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.event.targetSector == null ? null : ctx.event.targetSector.length);
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(15, _c0, ctx.event.id));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.canEdit);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, RouterLink, SlicePipe], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n.card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 14px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  font-family: "Inter", sans-serif;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.card[_ngcontent-%COMP%]:hover {\n  border-color: #93c5fd;\n  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.07);\n}\n.card-cover[_ngcontent-%COMP%] {\n  position: relative;\n  height: 160px;\n  background: #f0f6ff;\n  overflow: hidden;\n}\n.card-cover.no-cover[_ngcontent-%COMP%] {\n  background: #f8faff;\n}\n.cover-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  transition: transform 0.3s;\n}\n.card[_ngcontent-%COMP%]:hover   .cover-img[_ngcontent-%COMP%] {\n  transform: scale(1.03);\n}\n.cover-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #c7d9f5;\n}\n.cover-badges[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  display: flex;\n  gap: 6px;\n}\n.type-pill[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  background: rgba(255, 255, 255, 0.92);\n  color: #1d4ed8;\n  padding: 3px 9px;\n  border-radius: 5px;\n  backdrop-filter: blur(4px);\n}\n.status-pill[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 600;\n  padding: 3px 9px;\n  border-radius: 5px;\n  backdrop-filter: blur(4px);\n}\n.status-publie[_ngcontent-%COMP%] {\n  background: rgba(240, 253, 244, 0.92);\n  color: #15803d;\n}\n.status-brouillon[_ngcontent-%COMP%] {\n  background: rgba(248, 250, 255, 0.92);\n  color: #4b6890;\n}\n.status-annule[_ngcontent-%COMP%] {\n  background: rgba(254, 242, 242, 0.92);\n  color: #b91c1c;\n}\n.status-termine[_ngcontent-%COMP%] {\n  background: rgba(245, 243, 255, 0.92);\n  color: #6d28d9;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.1rem 1.25rem 0.75rem;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  color: #1e3a6e;\n  margin: 0;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.card-desc[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #8aaace;\n  line-height: 1.6;\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.card-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: #5a7396;\n  font-weight: 500;\n}\n.meta-item[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #93c5fd;\n}\n.card-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 2px;\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  background: #eff6ff;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n  padding: 2px 8px;\n  border-radius: 4px;\n}\n.tag-more[_ngcontent-%COMP%] {\n  background: #f8faff;\n  color: #8aaace;\n  border-color: #dbeafe;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1.25rem;\n  border-top: 1px solid #f0f6ff;\n  gap: 8px;\n}\n.btn-view[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 13px;\n  font-weight: 500;\n  color: #2563eb;\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  padding: 6px 16px;\n  border-radius: 7px;\n  text-decoration: none;\n  transition: background 0.15s, border-color 0.15s;\n}\n.btn-view[_ngcontent-%COMP%]:hover {\n  background: #dbeafe;\n  border-color: #93c5fd;\n  color: #1d4ed8;\n  text-decoration: none;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: 1px solid;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background 0.15s;\n  text-decoration: none;\n  background: none;\n}\n.btn-icon-edit[_ngcontent-%COMP%] {\n  color: #4b6890;\n  border-color: #dbeafe;\n}\n.btn-icon-edit[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n  color: #1e3a6e;\n  border-color: #93c5fd;\n}\n.btn-icon-delete[_ngcontent-%COMP%] {\n  color: #dc2626;\n  border-color: #fecaca;\n}\n.btn-icon-delete[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n}\n/*# sourceMappingURL=event-card.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventCardComponent, { className: "EventCardComponent", filePath: "src\\app\\modules\\event\\components\\event-card\\event-card.component.ts", lineNumber: 10 });
})();

// src/app/modules/event/pages/event-list/event-list.component.ts
function EventListComponent_a_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 18);
    \u0275\u0275element(2, "line", 19)(3, "line", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Nouvel \xE9v\xE9nement ");
    \u0275\u0275elementEnd();
  }
}
function EventListComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 23);
    \u0275\u0275element(3, "circle", 24)(4, "polyline", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "File de validation admin");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "a", 26);
    \u0275\u0275text(8, " Voir les \xE9v\xE9nements en attente ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 27);
    \u0275\u0275element(10, "path", 28);
    \u0275\u0275elementEnd()()();
  }
}
function EventListComponent_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    \u0275\u0275property("value", t_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1);
  }
}
function EventListComponent_div_17_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    \u0275\u0275property("value", s_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r4);
  }
}
function EventListComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "label");
    \u0275\u0275text(2, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 8);
    \u0275\u0275twoWayListener("ngModelChange", function EventListComponent_div_17_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedStatus, $event) || (ctx_r2.selectedStatus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function EventListComponent_div_17_Template_select_change_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFilterChange());
    });
    \u0275\u0275elementStart(4, "option", 9);
    \u0275\u0275text(5, "Tous les statuts");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, EventListComponent_div_17_option_6_Template, 2, 2, "option", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedStatus);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.eventStatuses);
  }
}
function EventListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r2.events.length, " \xE9v\xE9nement", ctx_r2.events.length !== 1 ? "s" : "", " ");
  }
}
function EventListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "div", 32);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Chargement des \xE9v\xE9nements...");
    \u0275\u0275elementEnd()();
  }
}
function EventListComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 34);
    \u0275\u0275element(2, "circle", 24)(3, "line", 35)(4, "line", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r2.error, " ");
  }
}
function EventListComponent_div_21_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 46);
    \u0275\u0275text(1, "Cr\xE9ez votre premier \xE9v\xE9nement pour commencer.");
    \u0275\u0275elementEnd();
  }
}
function EventListComponent_div_21_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 46);
    \u0275\u0275text(1, "Aucun \xE9v\xE9nement publi\xE9 pour le moment.");
    \u0275\u0275elementEnd();
  }
}
function EventListComponent_div_21_a_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 17);
    \u0275\u0275text(1, "Cr\xE9er un \xE9v\xE9nement");
    \u0275\u0275elementEnd();
  }
}
function EventListComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 39);
    \u0275\u0275element(3, "rect", 40)(4, "line", 41)(5, "line", 42)(6, "line", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "p", 44);
    \u0275\u0275text(8, "Aucun \xE9v\xE9nement trouv\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, EventListComponent_div_21_p_9_Template, 2, 0, "p", 45)(10, EventListComponent_div_21_p_10_Template, 2, 0, "p", 45)(11, EventListComponent_div_21_a_11_Template, 2, 0, "a", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r2.canCreate());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.canCreate());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.canCreate());
  }
}
function EventListComponent_div_22_app_event_card_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-event-card", 49);
    \u0275\u0275listener("deleted", function EventListComponent_div_22_app_event_card_1_Template_app_event_card_deleted_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDelete($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r6 = ctx.$implicit;
    \u0275\u0275property("event", event_r6);
  }
}
function EventListComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, EventListComponent_div_22_app_event_card_1_Template, 1, 1, "app-event-card", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.events);
  }
}
var EventListComponent = class _EventListComponent {
  eventService;
  authService;
  route;
  events = [];
  loading = false;
  error = "";
  selectedType = "";
  selectedStatus = "";
  eventTypes = ["WEBINAIRE", "WORKSHOP", "PITCH", "BOOTCAMP", "CONFERENCE"];
  eventStatuses = [
    "BROUILLON",
    "EN_ATTENTE_VALIDATION",
    "APPROUVE",
    "PUBLIE",
    "REJETE",
    "ANNULE",
    "TERMINE"
  ];
  destroy$ = new Subject();
  constructor(eventService, authService, route) {
    this.eventService = eventService;
    this.authService = authService;
    this.route = route;
  }
  ngOnInit() {
    this.route.queryParams.pipe(distinctUntilChanged((a, b) => a["refresh"] === b["refresh"]), takeUntil(this.destroy$)).subscribe(() => {
      this.loadEvents();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadEvents() {
    this.loading = true;
    this.error = "";
    const filters = __spreadValues(__spreadValues({}, this.selectedType && { type: this.selectedType }), this.selectedStatus && { status: this.selectedStatus });
    const effectiveFilters = this.canCreate() ? filters : __spreadProps(__spreadValues({}, filters), { status: "PUBLIE" });
    this.eventService.getAll(effectiveFilters).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Impossible de charger les \xE9v\xE9nements. Veuillez r\xE9essayer.";
        this.loading = false;
        console.error("[EventList] load error:", err);
      }
    });
  }
  onFilterChange() {
    this.loadEvents();
  }
  onDelete(id) {
    this.eventService.delete(id).subscribe({
      next: () => {
        this.events = this.events.filter((e) => e.id !== id);
      },
      error: () => {
        this.error = "Impossible de supprimer cet \xE9v\xE9nement.";
      }
    });
  }
  isAdmin() {
    return this.authService.getRole() === "ADMIN";
  }
  canCreate() {
    const role = this.authService.getRole();
    return ["ADMIN", "MENTOR", "PARTENAIRE"].includes(role);
  }
  static \u0275fac = function EventListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventListComponent)(\u0275\u0275directiveInject(EventService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventListComponent, selectors: [["app-event-list"]], decls: 23, vars: 10, consts: [[1, "list-page"], [1, "list-header"], [1, "page-label"], [1, "page-title"], ["routerLink", "/events/new", "class", "btn-new", 4, "ngIf"], ["class", "admin-banner", 4, "ngIf"], [1, "filters-bar"], [1, "filter-group"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "filter-group", 4, "ngIf"], ["class", "filter-count", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "alert-error", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "events-grid", 4, "ngIf"], ["routerLink", "/events/new", 1, "btn-new"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "admin-banner"], [1, "admin-banner-left"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], ["routerLink", "/events/pending", 1, "btn-pending"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M5 12h14M12 5l7 7-7 7"], [3, "value"], [1, "filter-count"], [1, "loading-state"], [1, "spinner-lg"], [1, "alert-error"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "empty-state"], [1, "empty-icon"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], [1, "empty-title"], ["class", "empty-sub", 4, "ngIf"], [1, "empty-sub"], [1, "events-grid"], [3, "event", "deleted", 4, "ngFor", "ngForOf"], [3, "deleted", "event"]], template: function EventListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2);
      \u0275\u0275text(4, "Plateforme PIcloud");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 3);
      \u0275\u0275text(6, "\xC9v\xE9nements");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, EventListComponent_a_7_Template, 5, 0, "a", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(8, EventListComponent_div_8_Template, 11, 0, "div", 5);
      \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "label");
      \u0275\u0275text(12, "Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function EventListComponent_Template_select_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedType, $event) || (ctx.selectedType = $event);
        return $event;
      });
      \u0275\u0275listener("change", function EventListComponent_Template_select_change_13_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(14, "option", 9);
      \u0275\u0275text(15, "Tous les types");
      \u0275\u0275elementEnd();
      \u0275\u0275template(16, EventListComponent_option_16_Template, 2, 2, "option", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(17, EventListComponent_div_17_Template, 7, 2, "div", 11)(18, EventListComponent_div_18_Template, 2, 2, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275template(19, EventListComponent_div_19_Template, 4, 0, "div", 13)(20, EventListComponent_div_20_Template, 6, 1, "div", 14)(21, EventListComponent_div_21_Template, 12, 3, "div", 15)(22, EventListComponent_div_22_Template, 2, 1, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.canCreate());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isAdmin());
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedType);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.eventTypes);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.canCreate());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.events.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.events.length > 0);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, EventCardComponent], styles: [`@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";



.list-page[_ngcontent-%COMP%] {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  padding-top: calc(56px + 2rem);
  font-family: "Inter", sans-serif;
  min-height: 100vh;
}
.list-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.page-label[_ngcontent-%COMP%] {
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f97316;
  margin-bottom: 4px;
}
.page-title[_ngcontent-%COMP%] {
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e3a6e;
  letter-spacing: -0.02em;
  margin: 0;
}
.btn-new[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #1e3a6e;
  color: #fff;
  font-size: 13.5px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 9px;
  text-decoration: none;
  font-family: "Inter", sans-serif;
  transition: background 0.15s, transform 0.1s;
  flex-shrink: 0;
}
.btn-new[_ngcontent-%COMP%]:hover {
  background: #16305c;
  transform: translateY(-1px);
  color: #fff;
  text-decoration: none;
}
.filters-bar[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 1rem 1.25rem;
  background: #fff;
  border: 1px solid #dbeafe;
  border-radius: 12px;
}
.filter-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8aaace;
}
.filter-select[_ngcontent-%COMP%] {
  height: 36px;
  background: #f8faff;
  border: 1px solid #dbeafe;
  border-radius: 8px;
  padding: 0 32px 0 12px;
  font-size: 13px;
  color: #1e3a6e;
  font-family: "Inter", sans-serif;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238aaace' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  transition: border-color 0.15s;
  min-width: 160px;
}
.filter-select[_ngcontent-%COMP%]:focus {
  border-color: #3b82f6;
}
.filter-count[_ngcontent-%COMP%] {
  font-size: 12.5px;
  color: #8aaace;
  font-weight: 500;
  margin-left: auto;
  align-self: center;
}
.loading-state[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem 0;
  color: #8aaace;
  font-size: 14px;
}
.spinner-lg[_ngcontent-%COMP%] {
  width: 30px;
  height: 30px;
  border: 3px solid #dbeafe;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.alert-error[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 13.5px;
  margin-bottom: 1.5rem;
}
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 5rem 0;
  text-align: center;
}
.empty-icon[_ngcontent-%COMP%] {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #eff6ff;
  color: #93c5fd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.empty-title[_ngcontent-%COMP%] {
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e3a6e;
  margin: 0;
}
.empty-sub[_ngcontent-%COMP%] {
  font-size: 13.5px;
  color: #8aaace;
  margin: 0 0 1rem;
}
.events-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}
@media (max-width: 768px) {
  .list-page[_ngcontent-%COMP%] {
    padding: 1rem 1rem 3rem;
    padding-top: calc(56px + 1rem);
  }
  .events-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .filter-count[_ngcontent-%COMP%] {
    display: none;
  }
}
/*# sourceMappingURL=event-list.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventListComponent, { className: "EventListComponent", filePath: "src\\app\\modules\\event\\pages\\event-list\\event-list.component.ts", lineNumber: 14 });
})();

// src/app/services/speaker.service.ts
var SpeakerService = class _SpeakerService {
  http;
  api = "http://localhost:8090/api";
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(`${this.api}/speakers`);
  }
  getById(id) {
    return this.http.get(`${this.api}/speakers/${id}`);
  }
  getByEvent(eventId) {
    return this.http.get(`${this.api}/events/${eventId}/speakers`);
  }
  create(request) {
    return this.http.post(`${this.api}/speakers`, request);
  }
  update(id, request) {
    return this.http.put(`${this.api}/speakers/${id}`, request);
  }
  delete(id) {
    return this.http.delete(`${this.api}/speakers/${id}`);
  }
  linkToEvent(eventId, speakerId) {
    return this.http.post(`${this.api}/events/${eventId}/speakers/${speakerId}`, {});
  }
  unlinkFromEvent(eventId, speakerId) {
    return this.http.delete(`${this.api}/events/${eventId}/speakers/${speakerId}`);
  }
  uploadPhoto(speakerId, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.api}/speakers/${speakerId}/upload-photo`, formData);
  }
  static \u0275fac = function SpeakerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpeakerService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SpeakerService, factory: _SpeakerService.\u0275fac, providedIn: "root" });
};

// src/app/services/program.service.ts
var ProgramService = class _ProgramService {
  http;
  api = "http://localhost:8090/api/events";
  constructor(http) {
    this.http = http;
  }
  getByEvent(eventId) {
    return this.http.get(`${this.api}/${eventId}/program`);
  }
  create(eventId, request) {
    return this.http.post(`${this.api}/${eventId}/program`, request);
  }
  update(eventId, slotId, request) {
    return this.http.put(`${this.api}/${eventId}/program/${slotId}`, request);
  }
  delete(eventId, slotId) {
    return this.http.delete(`${this.api}/${eventId}/program/${slotId}`);
  }
  static \u0275fac = function ProgramService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProgramService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProgramService, factory: _ProgramService.\u0275fac, providedIn: "root" });
};

// src/app/services/registration.service.ts
var RegistrationService = class _RegistrationService {
  http;
  api = "http://localhost:8090/api/events";
  constructor(http) {
    this.http = http;
  }
  register(eventId) {
    return this.http.post(`${this.api}/${eventId}/register`, {});
  }
  cancel(eventId) {
    return this.http.delete(`${this.api}/${eventId}/register`);
  }
  getByEvent(eventId) {
    return this.http.get(`${this.api}/${eventId}/registrations`);
  }
  getMyRegistrations() {
    return this.http.get(`${this.api}/my-registrations`);
  }
  checkIn(registrationId) {
    return this.http.patch(`${this.api}/registrations/${registrationId}/checkin`, {});
  }
  static \u0275fac = function RegistrationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegistrationService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RegistrationService, factory: _RegistrationService.\u0275fac, providedIn: "root" });
};

// src/app/modules/event/pages/event-detail/event-detail.component.ts
var _c02 = () => ["/events/speakers"];
var _c12 = (a0) => ({ eventId: a0 });
function EventDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 6);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Chargement...");
    \u0275\u0275elementEnd()();
  }
}
function EventDetailComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 8);
    \u0275\u0275listener("click", function EventDetailComponent_div_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(4, "Retour aux \xE9v\xE9nements");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function EventDetailComponent_div_3_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "circle", 37)(3, "line", 38)(4, "line", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Rejet\xE9 : ", ctx_r1.event.rejectionReason, " ");
  }
}
function EventDetailComponent_div_3_div_6_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_6_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.submitForValidation());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "line", 41)(3, "polygon", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.isSubmitting);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmitting ? "Soumission..." : "Soumettre pour validation", " ");
  }
}
function EventDetailComponent_div_3_div_6_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_6_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.publishEvent());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "path", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.isPublishing);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isPublishing ? "Publication..." : "Publier", " ");
  }
}
function EventDetailComponent_div_3_div_6_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_6_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmDelete());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "polyline", 46)(3, "path", 47)(4, "path", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Supprimer ");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_div_3_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275template(1, EventDetailComponent_div_3_div_6_div_1_Template, 6, 1, "div", 28)(2, EventDetailComponent_div_3_div_6_button_2_Template, 5, 2, "button", 29)(3, EventDetailComponent_div_3_div_6_button_3_Template, 4, 2, "button", 30);
    \u0275\u0275elementStart(4, "button", 31);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_6_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editEvent());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 32);
    \u0275\u0275element(6, "path", 33)(7, "path", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Modifier ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, EventDetailComponent_div_3_div_6_button_9_Template, 6, 0, "button", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.status === "REJETE" && ctx_r1.event.rejectionReason);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canSubmit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canPublish());
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function EventDetailComponent_div_3_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "img", 50)(2, "div", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.event.coverImageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r1.event.title);
  }
}
function EventDetailComponent_div_3_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.successMessage);
  }
}
function EventDetailComponent_div_3_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function EventDetailComponent_div_3_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.program.length);
  }
}
function EventDetailComponent_div_3_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.speakers.length);
  }
}
function EventDetailComponent_div_3_button_27_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.registrations.length);
  }
}
function EventDetailComponent_div_3_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeTab = "inscriptions");
    });
    \u0275\u0275text(1, " Inscriptions ");
    \u0275\u0275template(2, EventDetailComponent_div_3_button_27_span_2_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "inscriptions");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.registrations.length);
  }
}
function EventDetailComponent_div_3_div_28_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.event.description);
  }
}
function EventDetailComponent_div_3_div_28_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "div", 74);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 75);
    \u0275\u0275element(3, "rect", 76)(4, "line", 77)(5, "line", 78)(6, "line", 79);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div")(8, "div", 80);
    \u0275\u0275text(9, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 81);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.event.startDate));
  }
}
function EventDetailComponent_div_3_div_28_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "div", 74);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 75);
    \u0275\u0275element(3, "path", 82)(4, "circle", 83);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div")(6, "div", 80);
    \u0275\u0275text(7, "Format");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 81);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.event.locationType);
  }
}
function EventDetailComponent_div_3_div_28_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "div", 74);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 75);
    \u0275\u0275element(3, "path", 84)(4, "circle", 85)(5, "path", 86);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div")(7, "div", 80);
    \u0275\u0275text(8, "Capacit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 81);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r1.event.capacityMax, " participants");
  }
}
function EventDetailComponent_div_3_div_28_div_8_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r9);
  }
}
function EventDetailComponent_div_3_div_28_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "div", 88);
    \u0275\u0275text(2, "Secteurs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 89);
    \u0275\u0275template(4, EventDetailComponent_div_3_div_28_div_8_span_4_Template, 2, 1, "span", 90);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.event.targetSector);
  }
}
function EventDetailComponent_div_3_div_28_div_9_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r10);
  }
}
function EventDetailComponent_div_3_div_28_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "div", 88);
    \u0275\u0275text(2, "Stades");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 89);
    \u0275\u0275template(4, EventDetailComponent_div_3_div_28_div_9_span_4_Template, 2, 1, "span", 92);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.event.targetStage);
  }
}
function EventDetailComponent_div_3_div_28_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "span", 66);
    \u0275\u0275text(2, "Format");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.event.locationType);
  }
}
function EventDetailComponent_div_3_div_28_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "span", 66);
    \u0275\u0275text(2, "Places");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.event.capacityMax);
  }
}
function EventDetailComponent_div_3_div_28_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "span", 66);
    \u0275\u0275text(2, "Soumis le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.event.submittedAt));
  }
}
function EventDetailComponent_div_3_div_28_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "span", 66);
    \u0275\u0275text(2, "Valid\xE9 le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.event.validatedAt));
  }
}
function EventDetailComponent_div_3_div_28_ng_container_33_div_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 97);
  }
}
function EventDetailComponent_div_3_div_28_ng_container_33_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "button", 95);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_28_ng_container_33_div_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.register());
    });
    \u0275\u0275template(2, EventDetailComponent_div_3_div_28_ng_container_33_div_1_span_2_Template, 1, 0, "span", 96);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isRegistering);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isRegistering);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isRegistering ? "Inscription..." : "S'inscrire \xE0 l'\xE9v\xE9nement", " ");
  }
}
function EventDetailComponent_div_3_div_28_ng_container_33_div_2_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 101);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_28_ng_container_33_div_2_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.cancelRegistration());
    });
    \u0275\u0275text(1, " Annuler mon inscription ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", ctx_r1.isRegistering);
  }
}
function EventDetailComponent_div_3_div_28_ng_container_33_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 98)(1, "div", 99);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, EventDetailComponent_div_3_div_28_ng_container_33_div_2_button_3_Template, 2, 1, "button", 100);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getRegistrationStatusClass(ctx_r1.myRegistration.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.myRegistration.status === "LISTE_ATTENTE" ? "Sur la liste d'attente" : ctx_r1.myRegistration.status === "PRESENT" ? "Pr\xE9sence confirm\xE9e" : ctx_r1.myRegistration.status === "ANNULE" ? "Inscription annul\xE9e" : "Inscrit", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.myRegistration.status === "INSCRIT" || ctx_r1.myRegistration.status === "LISTE_ATTENTE");
  }
}
function EventDetailComponent_div_3_div_28_ng_container_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, EventDetailComponent_div_3_div_28_ng_container_33_div_1_Template, 4, 3, "div", 3)(2, EventDetailComponent_div_3_div_28_ng_container_33_div_2_Template, 4, 3, "div", 94);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.myRegistration);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.myRegistration);
  }
}
function EventDetailComponent_div_3_div_28_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 103);
    \u0275\u0275element(2, "circle", 37)(3, "polyline", 104);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " En attente de validation par un administrateur. ");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_div_3_div_28_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 103);
    \u0275\u0275element(2, "polyline", 106);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Approuv\xE9 ! Vous pouvez maintenant publier l'\xE9v\xE9nement. ");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_div_3_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 56)(2, "div", 57);
    \u0275\u0275template(3, EventDetailComponent_div_3_div_28_p_3_Template, 2, 1, "p", 58);
    \u0275\u0275elementStart(4, "div", 59);
    \u0275\u0275template(5, EventDetailComponent_div_3_div_28_div_5_Template, 12, 1, "div", 60)(6, EventDetailComponent_div_3_div_28_div_6_Template, 10, 1, "div", 60)(7, EventDetailComponent_div_3_div_28_div_7_Template, 11, 1, "div", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, EventDetailComponent_div_3_div_28_div_8_Template, 5, 1, "div", 61)(9, EventDetailComponent_div_3_div_28_div_9_Template, 5, 1, "div", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "aside", 62)(11, "div", 63)(12, "div", 64);
    \u0275\u0275text(13, "D\xE9tails");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 65)(15, "span", 66);
    \u0275\u0275text(16, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 67);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, EventDetailComponent_div_3_div_28_div_19_Template, 5, 1, "div", 68)(20, EventDetailComponent_div_3_div_28_div_20_Template, 5, 1, "div", 68);
    \u0275\u0275elementStart(21, "div", 65)(22, "span", 66);
    \u0275\u0275text(23, "Intervenants");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 69);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 65)(27, "span", 66);
    \u0275\u0275text(28, "Cr\xE9neaux");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 69);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(31, EventDetailComponent_div_3_div_28_div_31_Template, 5, 1, "div", 68)(32, EventDetailComponent_div_3_div_28_div_32_Template, 5, 1, "div", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, EventDetailComponent_div_3_div_28_ng_container_33_Template, 3, 2, "ng-container", 3)(34, EventDetailComponent_div_3_div_28_div_34_Template, 5, 0, "div", 70)(35, EventDetailComponent_div_3_div_28_div_35_Template, 4, 0, "div", 71);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.event.description);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.event.startDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.locationType);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.capacityMax);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.targetSector == null ? null : ctx_r1.event.targetSector.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.targetStage == null ? null : ctx_r1.event.targetStage.length);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngClass", ctx_r1.getStatusClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.locationType);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.capacityMax);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.speakers.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.program.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.submittedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.validatedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.status === "PUBLIE");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.status === "EN_ATTENTE_VALIDATION");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.status === "APPROUVE" && !ctx_r1.isAdmin);
  }
}
function EventDetailComponent_div_3_div_29_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 114);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_29_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openAddSlot());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "line", 115)(3, "line", 116);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Ajouter un cr\xE9neau ");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_div_3_div_29_div_5_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 130);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r15 = ctx.$implicit;
    \u0275\u0275property("value", t_r15);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r15);
  }
}
function EventDetailComponent_div_3_div_29_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 117)(1, "div", 118)(2, "div", 119)(3, "label");
    \u0275\u0275text(4, "Titre *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 120);
    \u0275\u0275twoWayListener("ngModelChange", function EventDetailComponent_div_3_div_29_div_5_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.programForm.title, $event) || (ctx_r1.programForm.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 121)(7, "label");
    \u0275\u0275text(8, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 122);
    \u0275\u0275twoWayListener("ngModelChange", function EventDetailComponent_div_3_div_29_div_5_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.programForm.type, $event) || (ctx_r1.programForm.type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(10, EventDetailComponent_div_3_div_29_div_5_option_10_Template, 2, 2, "option", 123);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 121)(12, "label");
    \u0275\u0275text(13, "Ordre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 124);
    \u0275\u0275twoWayListener("ngModelChange", function EventDetailComponent_div_3_div_29_div_5_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.programForm.orderIndex, $event) || (ctx_r1.programForm.orderIndex = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 121)(16, "label");
    \u0275\u0275text(17, "D\xE9but");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 125);
    \u0275\u0275twoWayListener("ngModelChange", function EventDetailComponent_div_3_div_29_div_5_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.programForm.startTime, $event) || (ctx_r1.programForm.startTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 121)(20, "label");
    \u0275\u0275text(21, "Fin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 125);
    \u0275\u0275twoWayListener("ngModelChange", function EventDetailComponent_div_3_div_29_div_5_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.programForm.endTime, $event) || (ctx_r1.programForm.endTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 119)(24, "label");
    \u0275\u0275text(25, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "textarea", 126);
    \u0275\u0275twoWayListener("ngModelChange", function EventDetailComponent_div_3_div_29_div_5_Template_textarea_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.programForm.description, $event) || (ctx_r1.programForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 127)(28, "button", 128);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_29_div_5_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showProgramForm = false);
    });
    \u0275\u0275text(29, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 129);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_29_div_5_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.saveSlot());
    });
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.programForm.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.programForm.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.slotTypes);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.programForm.orderIndex);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.programForm.startTime);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.programForm.endTime);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.programForm.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.editingSlot ? "Mettre \xE0 jour" : "Ajouter");
  }
}
function EventDetailComponent_div_3_div_29_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "p");
    \u0275\u0275text(2, "Aucun cr\xE9neau pour l'instant.");
    \u0275\u0275elementEnd()();
  }
}
function EventDetailComponent_div_3_div_29_div_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatTime(slot_r16.startTime));
  }
}
function EventDetailComponent_div_3_div_29_div_8_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 141);
    \u0275\u0275text(1, "\u2192");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_div_3_div_29_div_8_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatTime(slot_r16.endTime));
  }
}
function EventDetailComponent_div_3_div_29_div_8_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 142)(1, "button", 143);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_29_div_8_div_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r17);
      const slot_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditSlot(slot_r16));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 144);
    \u0275\u0275element(3, "path", 33)(4, "path", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "button", 145);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_29_div_8_div_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r17);
      const slot_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteSlot(slot_r16.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 144);
    \u0275\u0275element(7, "polyline", 46)(8, "path", 47);
    \u0275\u0275elementEnd()()();
  }
}
function EventDetailComponent_div_3_div_29_div_8_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(slot_r16.description);
  }
}
function EventDetailComponent_div_3_div_29_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 132)(1, "div", 133);
    \u0275\u0275template(2, EventDetailComponent_div_3_div_29_div_8_span_2_Template, 2, 1, "span", 3)(3, EventDetailComponent_div_3_div_29_div_8_span_3_Template, 2, 0, "span", 134)(4, EventDetailComponent_div_3_div_29_div_8_span_4_Template, 2, 1, "span", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 135)(6, "div", 136)(7, "span", 137);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, EventDetailComponent_div_3_div_29_div_8_div_9_Template, 9, 0, "div", 138);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 139);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, EventDetailComponent_div_3_div_29_div_8_div_12_Template, 2, 1, "div", 140);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const slot_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", slot_r16.startTime);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", slot_r16.startTime && slot_r16.endTime);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", slot_r16.endTime);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.getSlotTypeColor(slot_r16.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(slot_r16.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(slot_r16.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", slot_r16.description);
  }
}
function EventDetailComponent_div_3_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 107)(2, "h2", 108);
    \u0275\u0275text(3, "Programme");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, EventDetailComponent_div_3_div_29_button_4_Template, 5, 0, "button", 109);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, EventDetailComponent_div_3_div_29_div_5_Template, 32, 8, "div", 110)(6, EventDetailComponent_div_3_div_29_div_6_Template, 3, 0, "div", 111);
    \u0275\u0275elementStart(7, "div", 112);
    \u0275\u0275template(8, EventDetailComponent_div_3_div_29_div_8_Template, 13, 8, "div", 113);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.canEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showProgramForm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.program.length === 0 && !ctx_r1.showProgramForm);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.program);
  }
}
function EventDetailComponent_div_3_div_30_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "p");
    \u0275\u0275text(2, "Aucun intervenant assign\xE9.");
    \u0275\u0275elementEnd()();
  }
}
function EventDetailComponent_div_3_div_30_div_11_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 160);
  }
  if (rf & 2) {
    const speaker_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", speaker_r18.photoUrl, \u0275\u0275sanitizeUrl)("alt", speaker_r18.fullName);
  }
}
function EventDetailComponent_div_3_div_30_div_11_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(speaker_r18.fullName.charAt(0));
  }
}
function EventDetailComponent_div_3_div_30_div_11_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 161);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(speaker_r18.company);
  }
}
function EventDetailComponent_div_3_div_30_div_11_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 162);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(speaker_r18.bio);
  }
}
function EventDetailComponent_div_3_div_30_div_11_a_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 163);
    \u0275\u0275text(1, "LinkedIn");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", speaker_r18.linkedinUrl, \u0275\u0275sanitizeUrl);
  }
}
function EventDetailComponent_div_3_div_30_div_11_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 164);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_30_div_11_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const speaker_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.unlinkSpeaker(speaker_r18.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "line", 165)(3, "line", 166);
    \u0275\u0275elementEnd()();
  }
}
function EventDetailComponent_div_3_div_30_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 150)(1, "div", 151);
    \u0275\u0275template(2, EventDetailComponent_div_3_div_30_div_11_img_2_Template, 1, 2, "img", 152)(3, EventDetailComponent_div_3_div_30_div_11_span_3_Template, 2, 1, "span", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 153)(5, "div", 154);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 155);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, EventDetailComponent_div_3_div_30_div_11_div_9_Template, 2, 1, "div", 156)(10, EventDetailComponent_div_3_div_30_div_11_div_10_Template, 2, 1, "div", 157)(11, EventDetailComponent_div_3_div_30_div_11_a_11_Template, 2, 1, "a", 158);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, EventDetailComponent_div_3_div_30_div_11_button_12_Template, 4, 0, "button", 159);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", speaker_r18.photoUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !speaker_r18.photoUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(speaker_r18.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(speaker_r18.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", speaker_r18.company);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", speaker_r18.bio);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", speaker_r18.linkedinUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit());
  }
}
function EventDetailComponent_div_3_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 107)(2, "h2", 108);
    \u0275\u0275text(3, "Intervenants");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 147);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 32);
    \u0275\u0275element(6, "line", 115)(7, "line", 116);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " G\xE9rer les intervenants ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, EventDetailComponent_div_3_div_30_div_9_Template, 3, 0, "div", 111);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div", 148);
    \u0275\u0275template(11, EventDetailComponent_div_3_div_30_div_11_Template, 13, 8, "div", 149);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(4, _c02))("queryParams", \u0275\u0275pureFunction1(5, _c12, ctx_r1.event.id));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.speakers.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.speakers);
  }
}
function EventDetailComponent_div_3_div_31_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "p");
    \u0275\u0275text(2, "Aucune inscription pour l'instant.");
    \u0275\u0275elementEnd()();
  }
}
function EventDetailComponent_div_3_div_31_div_7_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_div_3_div_31_div_7_div_11_span_9_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 179);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_div_31_div_7_div_11_span_9_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const reg_r21 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.checkIn(reg_r21.id));
    });
    \u0275\u0275text(1, "Check-in");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_div_3_div_31_div_7_div_11_span_9_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 180);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function EventDetailComponent_div_3_div_31_div_7_div_11_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275template(1, EventDetailComponent_div_3_div_31_div_7_div_11_span_9_button_1_Template, 2, 0, "button", 177)(2, EventDetailComponent_div_3_div_31_div_7_div_11_span_9_span_2_Template, 2, 0, "span", 178);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const reg_r21 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !reg_r21.attended && reg_r21.status === "INSCRIT");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", reg_r21.attended);
  }
}
function EventDetailComponent_div_3_div_31_div_7_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 172)(1, "span", 173);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 174);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 175);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 176);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, EventDetailComponent_div_3_div_31_div_7_div_11_span_9_Template, 3, 2, "span", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const reg_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", reg_r21.userId, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getRegistrationStatusClass(reg_r21.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(reg_r21.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(reg_r21.registeredAt));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(reg_r21.attended ? ctx_r1.formatTime(reg_r21.checkInTime) : "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function EventDetailComponent_div_3_div_31_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 169)(1, "div", 170)(2, "span");
    \u0275\u0275text(3, "Utilisateur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Inscription");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Check-in");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, EventDetailComponent_div_3_div_31_div_7_span_10_Template, 2, 0, "span", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, EventDetailComponent_div_3_div_31_div_7_div_11_Template, 10, 6, "div", 171);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.registrations);
  }
}
function EventDetailComponent_div_3_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 107)(2, "h2", 108);
    \u0275\u0275text(3, "Inscriptions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 167);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, EventDetailComponent_div_3_div_31_div_6_Template, 3, 0, "div", 111)(7, EventDetailComponent_div_3_div_31_div_7_Template, 12, 2, "div", 168);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.registrations.length, " inscrits");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.registrations.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.registrations.length > 0);
  }
}
function EventDetailComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 9)(2, "button", 10);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 11);
    \u0275\u0275element(4, "path", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Retour ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, EventDetailComponent_div_3_div_6_Template, 10, 4, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, EventDetailComponent_div_3_div_7_Template, 3, 2, "div", 14)(8, EventDetailComponent_div_3_div_8_Template, 2, 1, "div", 15)(9, EventDetailComponent_div_3_div_9_Template, 2, 1, "div", 16);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div", 17)(11, "div", 18)(12, "span", 19);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 20);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "h1", 21);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 22)(19, "button", 23);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab = "apercu");
    });
    \u0275\u0275text(20, "Aper\xE7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 23);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab = "programme");
    });
    \u0275\u0275text(22, " Programme ");
    \u0275\u0275template(23, EventDetailComponent_div_3_span_23_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 23);
    \u0275\u0275listener("click", function EventDetailComponent_div_3_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab = "intervenants");
    });
    \u0275\u0275text(25, " Intervenants ");
    \u0275\u0275template(26, EventDetailComponent_div_3_span_26_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, EventDetailComponent_div_3_button_27_Template, 3, 3, "button", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, EventDetailComponent_div_3_div_28_Template, 36, 17, "div", 26)(29, EventDetailComponent_div_3_div_29_Template, 9, 4, "div", 26)(30, EventDetailComponent_div_3_div_30_Template, 12, 7, "div", 26)(31, EventDetailComponent_div_3_div_31_Template, 8, 3, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.canEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.event.coverImageUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.successMessage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.event.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getStatusClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.event.title);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "apercu");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "programme");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.program.length);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab === "intervenants");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.speakers.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "apercu");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "programme");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "intervenants");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "inscriptions" && ctx_r1.canEdit());
  }
}
function EventDetailComponent_div_4_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 97);
  }
}
function EventDetailComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 181)(1, "div", 182)(2, "div", 183);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 184);
    \u0275\u0275element(4, "polyline", 46)(5, "path", 47)(6, "path", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "h3", 185);
    \u0275\u0275text(8, "Supprimer cet \xE9v\xE9nement ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 186);
    \u0275\u0275text(10, "Cette action est irr\xE9versible.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 187)(12, "button", 188);
    \u0275\u0275listener("click", function EventDetailComponent_div_4_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275text(13, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 189);
    \u0275\u0275listener("click", function EventDetailComponent_div_4_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteEvent());
    });
    \u0275\u0275template(15, EventDetailComponent_div_4_span_15_Template, 1, 0, "span", 96);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275property("disabled", ctx_r1.isDeleting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isDeleting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isDeleting ? "Suppression..." : "Supprimer", " ");
  }
}
var EventDetailComponent = class _EventDetailComponent {
  route;
  router;
  eventService;
  speakerService;
  programService;
  registrationService;
  authService;
  event = null;
  speakers = [];
  program = [];
  registrations = [];
  myRegistration = null;
  isLoading = true;
  errorMessage = "";
  successMessage = "";
  isAdmin = false;
  isDeleting = false;
  isSubmitting = false;
  isPublishing = false;
  showDeleteConfirm = false;
  isRegistering = false;
  activeTab = "apercu";
  slotTypes = ["PRESENTATION", "KEYNOTE", "WORKSHOP", "QA", "BREAK"];
  showProgramForm = false;
  showSpeakerForm = false;
  editingSlot = null;
  programForm = {
    title: "",
    description: "",
    type: "PRESENTATION",
    startTime: "",
    endTime: "",
    orderIndex: 0
  };
  constructor(route, router, eventService, speakerService, programService, registrationService, authService) {
    this.route = route;
    this.router = router;
    this.eventService = eventService;
    this.speakerService = speakerService;
    this.programService = programService;
    this.registrationService = registrationService;
    this.authService = authService;
  }
  ngOnInit() {
    this.isAdmin = this.authService.getRole() === "ADMIN";
    const id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.loadAll(+id);
  }
  loadAll(id) {
    this.isLoading = true;
    this.eventService.getById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.isLoading = false;
        this.loadSpeakers(id);
        this.loadProgram(id);
        if (this.canEdit())
          this.loadRegistrations(id);
        this.loadMyRegistration(id);
      },
      error: () => {
        this.errorMessage = "\xC9v\xE9nement introuvable.";
        this.isLoading = false;
      }
    });
  }
  loadSpeakers(id) {
    this.speakerService.getByEvent(id).subscribe({ next: (s) => this.speakers = s, error: () => {
    } });
  }
  loadProgram(id) {
    this.programService.getByEvent(id).subscribe({ next: (p) => this.program = p, error: () => {
    } });
  }
  loadRegistrations(id) {
    this.registrationService.getByEvent(id).subscribe({ next: (r) => this.registrations = r, error: () => {
    } });
  }
  loadMyRegistration(id) {
    this.registrationService.getMyRegistrations().subscribe({
      next: (regs) => {
        this.myRegistration = regs.find((r) => r.eventId === id) || null;
      },
      error: () => {
      }
    });
  }
  // ── REGISTRATION ──────────────────────────────────────────────────────
  register() {
    if (!this.event)
      return;
    this.isRegistering = true;
    this.registrationService.register(this.event.id).subscribe({
      next: (reg) => {
        this.myRegistration = reg;
        this.isRegistering = false;
        this.successMessage = reg.status === "LISTE_ATTENTE" ? "Vous \xEAtes sur la liste d'attente." : "Inscription confirm\xE9e !";
        if (this.canEdit())
          this.loadRegistrations(this.event.id);
      },
      error: () => {
        this.errorMessage = "\xC9chec de l'inscription.";
        this.isRegistering = false;
      }
    });
  }
  cancelRegistration() {
    if (!this.event)
      return;
    this.isRegistering = true;
    this.registrationService.cancel(this.event.id).subscribe({
      next: () => {
        this.myRegistration = null;
        this.isRegistering = false;
        this.successMessage = "Inscription annul\xE9e.";
        if (this.canEdit())
          this.loadRegistrations(this.event.id);
      },
      error: () => {
        this.errorMessage = "\xC9chec de l'annulation.";
        this.isRegistering = false;
      }
    });
  }
  checkIn(registrationId) {
    this.registrationService.checkIn(registrationId).subscribe({
      next: (updated) => {
        const idx = this.registrations.findIndex((r) => r.id === registrationId);
        if (idx !== -1)
          this.registrations[idx] = updated;
      },
      error: () => {
        this.errorMessage = "\xC9chec du check-in.";
      }
    });
  }
  // ── PROGRAM ───────────────────────────────────────────────────────────
  openAddSlot() {
    this.editingSlot = null;
    this.programForm = { title: "", description: "", type: "PRESENTATION", startTime: "", endTime: "", orderIndex: this.program.length };
    this.showProgramForm = true;
  }
  openEditSlot(slot) {
    this.editingSlot = slot;
    this.programForm = {
      title: slot.title,
      description: slot.description,
      type: slot.type,
      startTime: slot.startTime ? slot.startTime.substring(0, 16) : "",
      endTime: slot.endTime ? slot.endTime.substring(0, 16) : "",
      orderIndex: slot.orderIndex
    };
    this.showProgramForm = true;
  }
  saveSlot() {
    if (!this.event || !this.programForm.title)
      return;
    const request = __spreadProps(__spreadValues({}, this.programForm), { type: this.programForm.type });
    if (this.editingSlot) {
      this.programService.update(this.event.id, this.editingSlot.id, request).subscribe({
        next: (updated) => {
          const idx = this.program.findIndex((p) => p.id === this.editingSlot.id);
          if (idx !== -1)
            this.program[idx] = updated;
          this.showProgramForm = false;
        },
        error: () => {
          this.errorMessage = "\xC9chec de la mise \xE0 jour du cr\xE9neau.";
        }
      });
    } else {
      this.programService.create(this.event.id, request).subscribe({
        next: (slot) => {
          this.program = [...this.program, slot].sort((a, b) => a.orderIndex - b.orderIndex);
          this.showProgramForm = false;
        },
        error: () => {
          this.errorMessage = "\xC9chec de la cr\xE9ation du cr\xE9neau.";
        }
      });
    }
  }
  deleteSlot(slotId) {
    if (!this.event)
      return;
    this.programService.delete(this.event.id, slotId).subscribe({
      next: () => {
        this.program = this.program.filter((p) => p.id !== slotId);
      },
      error: () => {
        this.errorMessage = "\xC9chec de la suppression.";
      }
    });
  }
  // ── SPEAKERS ──────────────────────────────────────────────────────────
  unlinkSpeaker(speakerId) {
    if (!this.event)
      return;
    this.speakerService.unlinkFromEvent(this.event.id, speakerId).subscribe({
      next: () => {
        this.speakers = this.speakers.filter((s) => s.id !== speakerId);
      },
      error: () => {
        this.errorMessage = "\xC9chec de la dissociation.";
      }
    });
  }
  // ── EVENT WORKFLOW ────────────────────────────────────────────────────
  // role is normalized so no ROLE_ prefix needed anywhere
  canEdit() {
    const role = this.authService.getRole();
    return ["ADMIN", "MENTOR", "PARTENAIRE"].includes(role);
  }
  canSubmit() {
    if (!this.event)
      return false;
    const role = this.authService.getRole();
    const isOwner = this.event.organizerId === this.authService.getUserId();
    return isOwner && ["MENTOR", "PARTENAIRE"].includes(role) && this.event.status === "BROUILLON";
  }
  canPublish() {
    if (!this.event)
      return false;
    const role = this.authService.getRole();
    const isOwner = this.event.organizerId === this.authService.getUserId();
    if (role === "ADMIN") {
      return this.event.status === "BROUILLON" || this.event.status === "APPROUVE";
    }
    return isOwner && this.event.status === "APPROUVE";
  }
  submitForValidation() {
    if (!this.event)
      return;
    this.isSubmitting = true;
    this.errorMessage = "";
    this.eventService.submit(this.event.id).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isSubmitting = false;
        this.successMessage = "\xC9v\xE9nement soumis pour validation. Vous serez notifi\xE9 par email.";
      },
      error: () => {
        this.errorMessage = "\xC9chec de la soumission.";
        this.isSubmitting = false;
      }
    });
  }
  publishEvent() {
    if (!this.event)
      return;
    this.isPublishing = true;
    this.errorMessage = "";
    this.eventService.publish(this.event.id).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isPublishing = false;
        this.successMessage = "\xC9v\xE9nement publi\xE9 avec succ\xE8s !";
      },
      error: () => {
        this.errorMessage = "\xC9chec de la publication.";
        this.isPublishing = false;
      }
    });
  }
  editEvent() {
    this.router.navigate(["/events", this.event?.id, "edit"]);
  }
  confirmDelete() {
    this.showDeleteConfirm = true;
  }
  cancelDelete() {
    this.showDeleteConfirm = false;
  }
  goBack() {
    this.router.navigate(["/events"]);
  }
  deleteEvent() {
    if (!this.event)
      return;
    this.isDeleting = true;
    this.eventService.delete(this.event.id).subscribe({
      next: () => this.router.navigate(["/events"]),
      error: () => {
        this.errorMessage = "\xC9chec de la suppression.";
        this.isDeleting = false;
        this.showDeleteConfirm = false;
      }
    });
  }
  // ── HELPERS ───────────────────────────────────────────────────────────
  getStatusClass() {
    switch (this.event?.status) {
      case "PUBLIE":
        return "status-publie";
      case "ANNULE":
        return "status-annule";
      case "TERMINE":
        return "status-termine";
      case "EN_ATTENTE_VALIDATION":
        return "status-pending";
      case "APPROUVE":
        return "status-approuve";
      case "REJETE":
        return "status-rejete";
      default:
        return "status-brouillon";
    }
  }
  getStatusLabel() {
    switch (this.event?.status) {
      case "PUBLIE":
        return "Publi\xE9";
      case "ANNULE":
        return "Annul\xE9";
      case "TERMINE":
        return "Termin\xE9";
      case "EN_ATTENTE_VALIDATION":
        return "En attente de validation";
      case "APPROUVE":
        return "Approuv\xE9";
      case "REJETE":
        return "Rejet\xE9";
      default:
        return "Brouillon";
    }
  }
  getSlotTypeColor(type) {
    switch (type) {
      case "KEYNOTE":
        return "slot-keynote";
      case "WORKSHOP":
        return "slot-workshop";
      case "BREAK":
        return "slot-break";
      case "QA":
        return "slot-qa";
      default:
        return "slot-presentation";
    }
  }
  getRegistrationStatusClass(status) {
    switch (status) {
      case "PRESENT":
        return "reg-present";
      case "LISTE_ATTENTE":
        return "reg-waitlist";
      case "ANNULE":
        return "reg-annule";
      default:
        return "reg-inscrit";
    }
  }
  formatDate(date) {
    if (!date)
      return "\u2014";
    return new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  formatTime(date) {
    if (!date)
      return "\u2014";
    return new Date(date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }
  getTypeIcon() {
    switch (this.event?.type) {
      case "WEBINAIRE":
        return "M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.889L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z";
      case "WORKSHOP":
        return "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z";
      case "PITCH":
        return "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z";
      case "BOOTCAMP":
        return "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253";
      default:
        return "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4";
    }
  }
  static \u0275fac = function EventDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(EventService), \u0275\u0275directiveInject(SpeakerService), \u0275\u0275directiveInject(ProgramService), \u0275\u0275directiveInject(RegistrationService), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventDetailComponent, selectors: [["app-event-detail"]], decls: 5, vars: 4, consts: [[1, "detail-page"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], [4, "ngIf"], ["class", "modal-backdrop", 4, "ngIf"], [1, "loading-state"], [1, "spinner-lg"], [1, "error-state"], [1, "btn-back", 3, "click"], [1, "detail-header"], [1, "back-btn", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M19 12H5M12 5l-7 7 7 7"], ["class", "header-actions", 4, "ngIf"], ["class", "cover-wrap", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], [1, "event-meta-top"], [1, "meta-badges"], [1, "type-badge"], [1, "status-badge", 3, "ngClass"], [1, "event-title"], [1, "tabs-bar"], [1, "tab-btn", 3, "click"], ["class", "tab-count", 4, "ngIf"], ["class", "tab-btn", 3, "active", "click", 4, "ngIf"], ["class", "tab-content", 4, "ngIf"], [1, "header-actions"], ["class", "rejection-banner", 4, "ngIf"], ["class", "btn-submit-validation", 3, "disabled", "click", 4, "ngIf"], ["class", "btn-publish", 3, "disabled", "click", 4, "ngIf"], [1, "btn-edit", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], ["class", "btn-delete", 3, "click", 4, "ngIf"], [1, "rejection-banner"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "btn-submit-validation", 3, "click", "disabled"], ["x1", "22", "y1", "2", "x2", "11", "y2", "13"], ["points", "22 2 15 22 11 13 2 9 22 2"], [1, "btn-publish", 3, "click", "disabled"], ["d", "M5 12h14M12 5l7 7-7 7"], [1, "btn-delete", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v6M14 11v6"], [1, "cover-wrap"], [1, "cover-img", 3, "src", "alt"], [1, "cover-overlay"], [1, "alert", "alert-success"], [1, "alert", "alert-error"], [1, "tab-count"], [1, "tab-content"], [1, "detail-body"], [1, "detail-left"], ["class", "event-desc", 4, "ngIf"], [1, "info-grid"], ["class", "info-item", 4, "ngIf"], ["class", "tags-section", 4, "ngIf"], [1, "detail-sidebar"], [1, "sidebar-card"], [1, "sidebar-title"], [1, "sidebar-row"], [1, "sr-label"], [1, "status-badge", "sm", 3, "ngClass"], ["class", "sidebar-row", 4, "ngIf"], [1, "sr-value"], ["class", "pending-notice", 4, "ngIf"], ["class", "approved-notice", 4, "ngIf"], [1, "event-desc"], [1, "info-item"], [1, "info-icon"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], [1, "info-label"], [1, "info-value"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], [1, "tags-section"], [1, "tags-label"], [1, "tags-list"], ["class", "tag tag-sector", 4, "ngFor", "ngForOf"], [1, "tag", "tag-sector"], ["class", "tag tag-stage", 4, "ngFor", "ngForOf"], [1, "tag", "tag-stage"], ["class", "my-reg-card", 4, "ngIf"], [1, "btn-register-event", 3, "click", "disabled"], ["class", "spinner-sm", 4, "ngIf"], [1, "spinner-sm"], [1, "my-reg-card"], [1, "my-reg-status", 3, "ngClass"], ["class", "btn-cancel-reg", 3, "disabled", "click", 4, "ngIf"], [1, "btn-cancel-reg", 3, "click", "disabled"], [1, "pending-notice"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "12 6 12 12 16 14"], [1, "approved-notice"], ["points", "20 6 9 17 4 12"], [1, "tab-header"], [1, "tab-title"], ["class", "btn-add", 3, "click", 4, "ngIf"], ["class", "inline-form", 4, "ngIf"], ["class", "empty-tab", 4, "ngIf"], [1, "program-list"], ["class", "program-slot", 4, "ngFor", "ngForOf"], [1, "btn-add", 3, "click"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "inline-form"], [1, "inline-form-grid"], [1, "field-group", "full"], ["type", "text", "placeholder", "Ex: Keynote d'ouverture", 1, "field-input", 3, "ngModelChange", "ngModel"], [1, "field-group"], [1, "field-input", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", "min", "0", 1, "field-input", 3, "ngModelChange", "ngModel"], ["type", "datetime-local", 1, "field-input", 3, "ngModelChange", "ngModel"], ["rows", "2", 1, "field-input", "field-textarea", 3, "ngModelChange", "ngModel"], [1, "inline-form-actions"], [1, "btn-cancel-sm", 3, "click"], [1, "btn-save-sm", 3, "click"], [3, "value"], [1, "empty-tab"], [1, "program-slot"], [1, "slot-time"], ["class", "slot-sep", 4, "ngIf"], [1, "slot-body"], [1, "slot-top"], [1, "slot-type-badge", 3, "ngClass"], ["class", "slot-actions", 4, "ngIf"], [1, "slot-title"], ["class", "slot-desc", 4, "ngIf"], [1, "slot-sep"], [1, "slot-actions"], ["title", "Modifier", 1, "btn-icon-sm", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["title", "Supprimer", 1, "btn-icon-sm", "btn-icon-del", 3, "click"], [1, "slot-desc"], [1, "btn-add", 3, "routerLink", "queryParams"], [1, "speakers-grid"], ["class", "speaker-card", 4, "ngFor", "ngForOf"], [1, "speaker-card"], [1, "speaker-avatar"], [3, "src", "alt", 4, "ngIf"], [1, "speaker-info"], [1, "speaker-name"], [1, "speaker-title"], ["class", "speaker-company", 4, "ngIf"], ["class", "speaker-bio", 4, "ngIf"], ["target", "_blank", "class", "speaker-linkedin", 3, "href", 4, "ngIf"], ["class", "btn-unlink", "title", "Dissocier", 3, "click", 4, "ngIf"], [3, "src", "alt"], [1, "speaker-company"], [1, "speaker-bio"], ["target", "_blank", 1, "speaker-linkedin", 3, "href"], ["title", "Dissocier", 1, "btn-unlink", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "reg-summary"], ["class", "reg-table", 4, "ngIf"], [1, "reg-table"], [1, "reg-row", "reg-header"], ["class", "reg-row", 4, "ngFor", "ngForOf"], [1, "reg-row"], [1, "reg-user"], [1, "reg-status-badge", 3, "ngClass"], [1, "reg-date"], [1, "reg-checkin"], ["class", "btn-checkin", 3, "click", 4, "ngIf"], ["class", "checked-badge", 4, "ngIf"], [1, "btn-checkin", 3, "click"], [1, "checked-badge"], [1, "modal-backdrop"], [1, "modal"], [1, "modal-icon"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], [1, "modal-title"], [1, "modal-desc"], [1, "modal-actions"], [1, "btn-cancel-modal", 3, "click"], [1, "btn-confirm-delete", 3, "click", "disabled"]], template: function EventDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, EventDetailComponent_div_1_Template, 4, 0, "div", 1)(2, EventDetailComponent_div_2_Template, 5, 1, "div", 2)(3, EventDetailComponent_div_3_Template, 32, 21, "div", 3)(4, EventDetailComponent_div_4_Template, 17, 3, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage && !ctx.isLoading && !ctx.event);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.event && !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showDeleteConfirm);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, RouterLink, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n.detail-page[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: 0 auto;\n  padding: 2rem 1.5rem 4rem;\n  padding-top: calc(56px + 2rem);\n  font-family: "Inter", sans-serif;\n  min-height: 100vh;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 6rem 0;\n  color: #8aaace;\n  font-size: 14px;\n}\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #dbeafe;\n  border-top-color: #2563eb;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 6rem 0;\n  color: #8aaace;\n  text-align: center;\n}\n.error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #5a7396;\n}\n.btn-back[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #fff;\n  background: #1e3a6e;\n  border: none;\n  padding: 9px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #4b6890;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 8px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s, color 0.15s;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n  color: #1e3a6e;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #1e3a6e;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 8px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-edit[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n  border-color: #93c5fd;\n}\n.btn-delete[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #dc2626;\n  background: #fff;\n  border: 1px solid #fecaca;\n  padding: 8px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-delete[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n}\n.btn-submit-validation[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: #f97316;\n  color: #fff;\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  padding: 8px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.15s;\n  font-family: "Inter", sans-serif;\n}\n.btn-submit-validation[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #ea6c0a;\n}\n.btn-submit-validation[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-publish[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: #16a34a;\n  color: #fff;\n  border: none;\n  font-size: 13px;\n  font-weight: 500;\n  padding: 8px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.15s;\n  font-family: "Inter", sans-serif;\n}\n.btn-publish[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #15803d;\n}\n.btn-publish[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.rejection-banner[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: #fef2f2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n  font-size: 12.5px;\n  font-weight: 500;\n  padding: 7px 12px;\n  border-radius: 8px;\n  max-width: 320px;\n}\n.cover-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 14px;\n  overflow: hidden;\n  margin-bottom: 2rem;\n  height: 280px;\n}\n.cover-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.cover-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to top,\n      rgba(30, 58, 110, 0.3),\n      transparent);\n}\n.detail-body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 280px;\n  gap: 2rem;\n  align-items: start;\n}\n.detail-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.meta-badges[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 1rem;\n}\n.type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: #eff6ff;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n  font-size: 12px;\n  font-weight: 600;\n  padding: 4px 12px;\n  border-radius: 6px;\n  letter-spacing: 0.02em;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 12px;\n  font-weight: 600;\n  padding: 4px 12px;\n  border-radius: 6px;\n  letter-spacing: 0.02em;\n}\n.status-badge.sm[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 3px 9px;\n}\n.status-publie[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n  border: 1px solid #bbf7d0;\n}\n.status-brouillon[_ngcontent-%COMP%] {\n  background: #f8faff;\n  color: #4b6890;\n  border: 1px solid #dbeafe;\n}\n.status-annule[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.status-termine[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  color: #6d28d9;\n  border: 1px solid #ddd6fe;\n}\n.status-pending[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n  border: 1px solid #fde68a;\n}\n.status-approuve[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n  border: 1px solid #bbf7d0;\n}\n.status-rejete[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fca5a5;\n}\n.event-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: clamp(1.4rem, 2.5vw, 2rem);\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -0.02em;\n  margin: 0 0 1rem;\n  line-height: 1.2;\n}\n.event-desc[_ngcontent-%COMP%] {\n  font-size: 14.5px;\n  color: #5a7396;\n  line-height: 1.75;\n  margin: 0;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1px;\n  background: #dbeafe;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 1.1rem 1.25rem;\n  background: #fff;\n  transition: background 0.15s;\n}\n.info-item[_ngcontent-%COMP%]:hover {\n  background: #f8faff;\n}\n.info-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  background: #eff6ff;\n  color: #2563eb;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #8aaace;\n  margin-bottom: 3px;\n}\n.info-value[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #1e3a6e;\n  line-height: 1.4;\n}\n.tags-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.tags-label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: #8aaace;\n}\n.tags-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  padding: 4px 12px;\n  border-radius: 6px;\n}\n.tag-sector[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.tag-stage[_ngcontent-%COMP%] {\n  background: #fef3e2;\n  color: #c2410c;\n  border: 1px solid #fed7aa;\n}\n.detail-sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.sidebar-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  padding: 1.25rem;\n}\n.sidebar-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #8aaace;\n  margin-bottom: 1rem;\n}\n.sidebar-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n  border-bottom: 1px solid #f0f6ff;\n  gap: 12px;\n}\n.sidebar-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.sr-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8aaace;\n  font-weight: 500;\n}\n.sr-value[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #1e3a6e;\n  font-weight: 500;\n  text-align: right;\n}\n.pending-notice[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #fef3c7;\n  color: #92400e;\n  border: 1px solid #fde68a;\n  border-radius: 10px;\n  padding: 12px;\n  font-size: 12.5px;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.approved-notice[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #dcfce7;\n  color: #16a34a;\n  border: 1px solid #bbf7d0;\n  border-radius: 10px;\n  padding: 12px;\n  font-size: 12.5px;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 200;\n  backdrop-filter: blur(4px);\n}\n.modal[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 16px;\n  padding: 2rem;\n  max-width: 400px;\n  width: 90%;\n  text-align: center;\n  border: 1px solid #dbeafe;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  background: #fef2f2;\n  color: #dc2626;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1.25rem;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  margin: 0 0 0.5rem;\n}\n.modal-desc[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: #5a7396;\n  line-height: 1.6;\n  margin: 0 0 1.5rem;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n}\n.btn-cancel-modal[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #5a7396;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 9px 22px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-cancel-modal[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff;\n}\n.btn-confirm-delete[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #fff;\n  background: #dc2626;\n  border: none;\n  padding: 9px 22px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-confirm-delete[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #b91c1c;\n}\n.btn-confirm-delete[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  padding: 10px 14px;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  border: 1px solid;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border-color: #fecaca;\n}\n.tabs-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  border-bottom: 1px solid #dbeafe;\n  margin: 1.5rem 0 0;\n  padding-bottom: 0;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #5a7396;\n  background: none;\n  border: none;\n  padding: 10px 16px;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  font-family: "Inter", sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: color 0.15s;\n}\n.tab-btn[_ngcontent-%COMP%]:hover {\n  color: #1e3a6e;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  color: #1e3a6e;\n  border-bottom-color: #2563eb;\n  font-weight: 600;\n}\n.tab-count[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 1px 7px;\n  border-radius: 10px;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 1.5rem 0;\n}\n.tab-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n}\n.tab-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  margin: 0;\n}\n.program-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.program-slot[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #f0f6ff;\n  background: #fff;\n  transition: background 0.15s;\n}\n.program-slot[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.program-slot[_ngcontent-%COMP%]:hover {\n  background: #f8faff;\n}\n.slot-time[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n  min-width: 80px;\n  font-size: 12px;\n  font-weight: 500;\n  color: #8aaace;\n  flex-shrink: 0;\n  padding-top: 2px;\n}\n.slot-sep[_ngcontent-%COMP%] {\n  color: #c7d9f5;\n}\n.slot-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.slot-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 4px;\n}\n.slot-type-badge[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 4px;\n  letter-spacing: 0.04em;\n}\n.slot-presentation[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #1d4ed8;\n}\n.slot-keynote[_ngcontent-%COMP%] {\n  background: #fef3e2;\n  color: #c2410c;\n}\n.slot-workshop[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #047857;\n}\n.slot-break[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  color: #6d28d9;\n}\n.slot-qa[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n}\n.slot-title[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #1e3a6e;\n}\n.slot-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8aaace;\n  margin-top: 3px;\n  line-height: 1.5;\n}\n.slot-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.btn-icon-sm[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 6px;\n  border: 1px solid #dbeafe;\n  background: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #4b6890;\n  transition: background 0.15s;\n}\n.btn-icon-sm[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n}\n.btn-icon-del[_ngcontent-%COMP%] {\n  border-color: #fecaca;\n  color: #dc2626;\n}\n.btn-icon-del[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n}\n.inline-form[_ngcontent-%COMP%] {\n  background: #f8faff;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  padding: 1.25rem;\n  margin-bottom: 1.25rem;\n}\n.inline-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.inline-form-grid[_ngcontent-%COMP%]   .full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.inline-form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  margin-top: 1rem;\n}\n.btn-add[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #1e3a6e;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 7px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  text-decoration: none;\n  transition: background 0.15s;\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n  border-color: #93c5fd;\n}\n.btn-save-sm[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #fff;\n  background: #1e3a6e;\n  border: none;\n  padding: 8px 18px;\n  border-radius: 7px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n}\n.btn-cancel-sm[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #5a7396;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 8px 18px;\n  border-radius: 7px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.field-input[_ngcontent-%COMP%] {\n  height: 38px;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 7px;\n  padding: 0 10px;\n  font-size: 13px;\n  color: #1e3a6e;\n  font-family: "Inter", sans-serif;\n  outline: none;\n  width: 100%;\n  box-sizing: border-box;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.field-textarea[_ngcontent-%COMP%] {\n  height: auto;\n  padding: 8px 10px;\n  resize: vertical;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  color: #4b6890;\n}\n.speakers-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 1rem;\n}\n.speaker-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  padding: 1.25rem;\n  display: flex;\n  gap: 12px;\n  position: relative;\n  transition: border-color 0.15s;\n}\n.speaker-card[_ngcontent-%COMP%]:hover {\n  border-color: #93c5fd;\n}\n.speaker-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #eff6ff;\n  color: #2563eb;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.speaker-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.speaker-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.speaker-name[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #1e3a6e;\n}\n.speaker-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #5a7396;\n}\n.speaker-company[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #8aaace;\n}\n.speaker-bio[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8aaace;\n  margin-top: 4px;\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.speaker-linkedin[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #2563eb;\n  text-decoration: none;\n  margin-top: 4px;\n  display: inline-block;\n}\n.btn-unlink[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: 1px solid #fecaca;\n  background: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #dc2626;\n  transition: background 0.15s;\n}\n.btn-unlink[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n}\n.reg-summary[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #8aaace;\n  font-weight: 500;\n}\n.reg-table[_ngcontent-%COMP%] {\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.reg-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 80px 140px 1fr 100px 80px;\n  align-items: center;\n  padding: 10px 1.25rem;\n  border-bottom: 1px solid #f0f6ff;\n  font-size: 13px;\n}\n.reg-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.reg-header[_ngcontent-%COMP%] {\n  background: #f8faff;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #8aaace;\n}\n.reg-user[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1e3a6e;\n}\n.reg-status-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 3px 8px;\n  border-radius: 5px;\n  width: fit-content;\n}\n.reg-inscrit[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #1d4ed8;\n}\n.reg-present[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n}\n.reg-waitlist[_ngcontent-%COMP%] {\n  background: #fef3e2;\n  color: #c2410c;\n}\n.reg-annule[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n}\n.reg-date[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #8aaace;\n}\n.reg-checkin[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #5a7396;\n}\n.btn-checkin[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  color: #fff;\n  background: #059669;\n  border: none;\n  padding: 4px 10px;\n  border-radius: 5px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n}\n.checked-badge[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #059669;\n  font-weight: 600;\n}\n.my-reg-card[_ngcontent-%COMP%] {\n  background: #f8faff;\n  border: 1px solid #dbeafe;\n  border-radius: 10px;\n  padding: 1rem;\n}\n.my-reg-status[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  padding: 6px 12px;\n  border-radius: 7px;\n  margin-bottom: 10px;\n  text-align: center;\n}\n.btn-cancel-reg[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 13px;\n  font-weight: 500;\n  color: #dc2626;\n  background: #fff;\n  border: 1px solid #fecaca;\n  padding: 8px;\n  border-radius: 7px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-cancel-reg[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n}\n.btn-register-event[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  width: 100%;\n  background: #f97316;\n  color: #fff;\n  border: none;\n  padding: 12px;\n  border-radius: 10px;\n  font-size: 13.5px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-register-event[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #ea6a00;\n}\n.btn-register-event[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.empty-tab[_ngcontent-%COMP%] {\n  padding: 3rem 0;\n  text-align: center;\n  color: #8aaace;\n  font-size: 13.5px;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .detail-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .detail-sidebar[_ngcontent-%COMP%] {\n    order: -1;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .detail-page[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 3rem;\n    padding-top: calc(56px + 1rem);\n  }\n  .cover-wrap[_ngcontent-%COMP%] {\n    height: 200px;\n    border-radius: 10px;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=event-detail.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventDetailComponent, { className: "EventDetailComponent", filePath: "src\\app\\modules\\event\\pages\\event-detail\\event-detail.component.ts", lineNumber: 18 });
})();

// src/app/modules/event/pages/event-form/event-form.component.ts
var _c03 = () => ({ standalone: true });
var _c13 = (a0) => ["/events", a0];
function EventFormComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "path", 50)(3, "polyline", 51);
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
function EventFormComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "circle", 53)(3, "line", 54)(4, "line", 55);
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
function EventFormComponent_img_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 56);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.imagePreview, \u0275\u0275sanitizeUrl);
  }
}
function EventFormComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 58);
    \u0275\u0275element(2, "rect", 59)(3, "circle", 60)(4, "polyline", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Cliquez pour ajouter une image");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 62);
    \u0275\u0275text(8, "JPG, PNG, WEBP \xB7 max 5MB");
    \u0275\u0275elementEnd()();
  }
}
function EventFormComponent_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275element(1, "span", 71);
    \u0275\u0275text(2, " T\xE9l\xE9chargement... ");
    \u0275\u0275elementEnd();
  }
}
function EventFormComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275template(1, EventFormComponent_div_23_span_1_Template, 3, 0, "span", 64);
    \u0275\u0275elementStart(2, "button", 65);
    \u0275\u0275listener("click", function EventFormComponent_div_23_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.removeImage());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 66);
    \u0275\u0275element(4, "polyline", 67)(5, "path", 68)(6, "path", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Supprimer ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isUploading);
  }
}
function EventFormComponent_option_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 72);
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
function EventFormComponent_span_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1, " Type requis ");
    \u0275\u0275elementEnd();
  }
}
function EventFormComponent_div_37_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    \u0275\u0275property("value", s_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r4);
  }
}
function EventFormComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "label");
    \u0275\u0275text(2, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 74);
    \u0275\u0275template(4, EventFormComponent_div_37_option_4_Template, 2, 2, "option", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.eventStatuses);
  }
}
function EventFormComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 66);
    \u0275\u0275element(2, "circle", 53)(3, "line", 54)(4, "line", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Pour soumettre l'\xE9v\xE9nement \xE0 la validation, retournez \xE0 la ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "a", 76);
    \u0275\u0275text(7, "page de d\xE9tail");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, ' et cliquez sur "Soumettre pour validation". ');
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c13, ctx_r0.eventId));
  }
}
function EventFormComponent_span_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1, " Titre requis (200 caract\xE8res max) ");
    \u0275\u0275elementEnd();
  }
}
function EventFormComponent_span_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
  }
}
function EventFormComponent__svg_svg_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 66);
    \u0275\u0275element(1, "polygon", 77);
    \u0275\u0275elementEnd();
  }
}
function EventFormComponent_span_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.aiError);
  }
}
function EventFormComponent_label_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 79);
    \u0275\u0275element(1, "input", 80)(2, "span", 81);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r0.form.value.locationType === loc_r5);
    \u0275\u0275advance();
    \u0275\u0275property("value", loc_r5);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", loc_r5 === "PRESENTIEL" ? "#2563eb" : loc_r5 === "DISTANCIEL" ? "#059669" : "#f97316");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", loc_r5, " ");
  }
}
function EventFormComponent_div_84_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 85);
    \u0275\u0275listener("click", function EventFormComponent_div_84_span_1_Template_button_click_2_listener() {
      const s_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeSector(s_r7));
    });
    \u0275\u0275text(3, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r7, " ");
  }
}
function EventFormComponent_div_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275template(1, EventFormComponent_div_84_span_1_Template, 4, 1, "span", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.form.value.targetSector);
  }
}
function EventFormComponent_div_92_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 85);
    \u0275\u0275listener("click", function EventFormComponent_div_92_span_1_Template_button_click_2_listener() {
      const s_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeStage(s_r9));
    });
    \u0275\u0275text(3, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r9, " ");
  }
}
function EventFormComponent_div_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275template(1, EventFormComponent_div_92_span_1_Template, 4, 1, "span", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.form.value.targetStage);
  }
}
function EventFormComponent_span_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
  }
}
var EventFormComponent = class _EventFormComponent {
  fb;
  route;
  router;
  eventService;
  authService;
  form;
  isEdit = false;
  eventId = null;
  isLoading = false;
  isUploading = false;
  isGenerating = false;
  aiError = "";
  successMessage = "";
  errorMessage = "";
  imagePreview = null;
  eventTypes = ["WEBINAIRE", "WORKSHOP", "PITCH", "BOOTCAMP", "CONFERENCE"];
  locationTypes = ["PRESENTIEL", "DISTANCIEL", "HYBRIDE"];
  eventStatuses = [
    "BROUILLON",
    "EN_ATTENTE_VALIDATION",
    "APPROUVE",
    "PUBLIE",
    "REJETE",
    "ANNULE",
    "TERMINE"
  ];
  sectorInput = "";
  stageInput = "";
  constructor(fb, route, router, eventService, authService) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.eventService = eventService;
    this.authService = authService;
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(200)]],
      description: [""],
      type: ["", Validators.required],
      status: ["BROUILLON"],
      startDate: [""],
      locationType: [""],
      capacityMax: [null, [Validators.min(1)]],
      coverImageUrl: [""],
      targetSector: [[]],
      targetStage: [[]]
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEdit = true;
      this.eventId = +id;
      this.loadEvent(this.eventId);
    }
  }
  isAdmin() {
    return this.authService.getRole() === "ADMIN";
  }
  loadEvent(id) {
    this.isLoading = true;
    this.eventService.getById(id).subscribe({
      next: (event) => {
        this.form.patchValue(__spreadProps(__spreadValues({}, event), {
          startDate: event.startDate ? event.startDate.substring(0, 16) : ""
        }));
        if (event.coverImageUrl)
          this.imagePreview = event.coverImageUrl;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Impossible de charger l'\xE9v\xE9nement.";
        this.isLoading = false;
      }
    });
  }
  onFileSelected(event) {
    const input = event.target;
    if (!input.files?.length)
      return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(file);
    this.isUploading = true;
    this.eventService.uploadImage(file).subscribe({
      next: (res) => {
        this.form.patchValue({ coverImageUrl: res.url });
        this.isUploading = false;
      },
      error: () => {
        this.errorMessage = "\xC9chec du t\xE9l\xE9chargement de l'image.";
        this.isUploading = false;
      }
    });
  }
  removeImage() {
    this.imagePreview = null;
    this.form.patchValue({ coverImageUrl: "" });
  }
  addSector() {
    const val = this.sectorInput.trim();
    if (!val)
      return;
    const current = this.form.value.targetSector || [];
    if (!current.includes(val))
      this.form.patchValue({ targetSector: [...current, val] });
    this.sectorInput = "";
  }
  removeSector(s) {
    const current = this.form.value.targetSector || [];
    this.form.patchValue({ targetSector: current.filter((x) => x !== s) });
  }
  addStage() {
    const val = this.stageInput.trim();
    if (!val)
      return;
    const current = this.form.value.targetStage || [];
    if (!current.includes(val))
      this.form.patchValue({ targetStage: [...current, val] });
    this.stageInput = "";
  }
  removeStage(s) {
    const current = this.form.value.targetStage || [];
    this.form.patchValue({ targetStage: current.filter((x) => x !== s) });
  }
  onSectorKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.addSector();
    }
  }
  onStageKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.addStage();
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = "";
    this.successMessage = "";
    const payload = __spreadValues({}, this.form.value);
    const request$ = this.isEdit && this.eventId ? this.eventService.update(this.eventId, payload) : this.eventService.create(payload);
    request$.subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = this.isEdit ? "\xC9v\xE9nement mis \xE0 jour avec succ\xE8s !" : "\xC9v\xE9nement cr\xE9\xE9 avec succ\xE8s !";
        setTimeout(() => {
          this.router.navigate(["/events"], {
            queryParams: { refresh: Date.now() }
          });
        }, 1200);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Une erreur est survenue.";
        this.isLoading = false;
      }
    });
  }
  generateDescription() {
    const title = this.form.get("title")?.value?.trim();
    const date = this.form.get("startDate")?.value;
    const type = this.form.get("type")?.value;
    if (!title) {
      this.aiError = "Renseignez le titre avant de g\xE9n\xE9rer une description.";
      return;
    }
    this.aiError = "";
    this.isGenerating = true;
    this.eventService.generateDescription(title, date || "", type || "").subscribe({
      next: (res) => {
        this.form.patchValue({ description: res.description });
        this.isGenerating = false;
      },
      error: () => {
        this.aiError = "La g\xE9n\xE9ration a \xE9chou\xE9. V\xE9rifiez votre connexion et r\xE9essayez.";
        this.isGenerating = false;
      }
    });
  }
  cancel() {
    this.router.navigate(["/events"]);
  }
  static \u0275fac = function EventFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(EventService), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventFormComponent, selectors: [["app-event-form"]], decls: 99, vars: 36, consts: [[1, "form-page"], [1, "form-header"], [1, "back-btn", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M19 12H5M12 5l-7 7 7 7"], [1, "form-label"], [1, "form-title"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "form-layout"], [1, "form-left"], [1, "card"], [1, "card-label"], [1, "image-upload-area"], ["class", "image-preview", "alt", "cover", 3, "src", 4, "ngIf"], ["class", "upload-placeholder", 4, "ngIf"], ["type", "file", "accept", "image/*", 1, "file-input", 3, "change"], ["class", "upload-actions", 4, "ngIf"], [1, "field-group"], [1, "req"], ["formControlName", "type", 1, "field-input"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "field-error", 4, "ngIf"], ["class", "field-group", 4, "ngIf"], ["class", "workflow-info", 4, "ngIf"], [1, "form-right"], ["type", "text", "formControlName", "title", "placeholder", "Ex: Workshop IA & Startups Tunis 2025", 1, "field-input"], [1, "desc-label-row"], ["type", "button", 1, "btn-ai-generate", 3, "click", "disabled"], ["class", "spinner-sm", 4, "ngIf"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], ["class", "ai-error", 4, "ngIf"], ["formControlName", "description", "placeholder", "D\xE9crivez l'\xE9v\xE9nement, le programme, les intervenants...", "rows", "4", 1, "field-input", "field-textarea"], [1, "fields-row"], ["type", "datetime-local", "formControlName", "startDate", 1, "field-input"], ["type", "number", "formControlName", "capacityMax", "placeholder", "ex: 100", "min", "1", 1, "field-input"], [1, "location-options"], ["class", "location-opt", 3, "selected", 4, "ngFor", "ngForOf"], [1, "tag-input-wrap"], ["type", "text", "placeholder", "Ex: FinTech, AI, SaaS \u2014 Entr\xE9e pour ajouter", 1, "field-input", "tag-input", 3, "ngModelChange", "keydown", "ngModel", "ngModelOptions"], ["type", "button", 1, "tag-add-btn", 3, "click"], ["class", "tags-list", 4, "ngIf"], ["type", "text", "placeholder", "Ex: MVP, Seed, Series A \u2014 Entr\xE9e pour ajouter", 1, "field-input", "tag-input", 3, "ngModelChange", "keydown", "ngModel", "ngModelOptions"], [1, "form-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-save", 3, "disabled"], [1, "alert", "alert-success"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "alert", "alert-error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], ["alt", "cover", 1, "image-preview", 3, "src"], [1, "upload-placeholder"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2"], ["cx", "8.5", "cy", "8.5", "r", "1.5"], ["points", "21 15 16 10 5 21"], [1, "upload-hint"], [1, "upload-actions"], ["class", "uploading-text", 4, "ngIf"], ["type", "button", 1, "btn-remove-img", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14H6L5 6"], ["d", "M10 11v6M14 11v6"], [1, "uploading-text"], [1, "spinner-sm"], [3, "value"], [1, "field-error"], ["formControlName", "status", 1, "field-input"], [1, "workflow-info"], [1, "workflow-link", 3, "routerLink"], ["points", "13 2 3 14 12 14 11 22 21 10 12 10 13 2"], [1, "ai-error"], [1, "location-opt"], ["type", "radio", "formControlName", "locationType", "hidden", "", 3, "value"], [1, "loc-dot"], [1, "tags-list"], ["class", "tag", 4, "ngFor", "ngForOf"], [1, "tag"], ["type", "button", 3, "click"]], template: function EventFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function EventFormComponent_Template_button_click_2_listener() {
        return ctx.cancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " Retour ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(6, "div")(7, "div", 5);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h1", 6);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(11, EventFormComponent_div_11_Template, 5, 1, "div", 7)(12, EventFormComponent_div_12_Template, 6, 1, "div", 8);
      \u0275\u0275elementStart(13, "form", 9);
      \u0275\u0275listener("ngSubmit", function EventFormComponent_Template_form_ngSubmit_13_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(14, "div", 10)(15, "div", 11)(16, "div", 12)(17, "div", 13);
      \u0275\u0275text(18, "Image de couverture");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 14);
      \u0275\u0275template(20, EventFormComponent_img_20_Template, 1, 1, "img", 15)(21, EventFormComponent_div_21_Template, 9, 0, "div", 16);
      \u0275\u0275elementStart(22, "input", 17);
      \u0275\u0275listener("change", function EventFormComponent_Template_input_change_22_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(23, EventFormComponent_div_23_Template, 8, 1, "div", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 12)(25, "div", 13);
      \u0275\u0275text(26, "Classification");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 19)(28, "label");
      \u0275\u0275text(29, "Type d'\xE9v\xE9nement ");
      \u0275\u0275elementStart(30, "span", 20);
      \u0275\u0275text(31, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "select", 21)(33, "option", 22);
      \u0275\u0275text(34, "S\xE9lectionner un type");
      \u0275\u0275elementEnd();
      \u0275\u0275template(35, EventFormComponent_option_35_Template, 2, 2, "option", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275template(36, EventFormComponent_span_36_Template, 2, 0, "span", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275template(37, EventFormComponent_div_37_Template, 5, 1, "div", 25)(38, EventFormComponent_div_38_Template, 9, 3, "div", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div", 27)(40, "div", 12)(41, "div", 13);
      \u0275\u0275text(42, "Informations g\xE9n\xE9rales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 19)(44, "label");
      \u0275\u0275text(45, "Titre ");
      \u0275\u0275elementStart(46, "span", 20);
      \u0275\u0275text(47, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(48, "input", 28);
      \u0275\u0275template(49, EventFormComponent_span_49_Template, 2, 0, "span", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 19)(51, "div", 29)(52, "label");
      \u0275\u0275text(53, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "button", 30);
      \u0275\u0275listener("click", function EventFormComponent_Template_button_click_54_listener() {
        return ctx.generateDescription();
      });
      \u0275\u0275template(55, EventFormComponent_span_55_Template, 1, 0, "span", 31)(56, EventFormComponent__svg_svg_56_Template, 2, 0, "svg", 32);
      \u0275\u0275text(57);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(58, EventFormComponent_span_58_Template, 2, 1, "span", 33);
      \u0275\u0275element(59, "textarea", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 35)(61, "div", 19)(62, "label");
      \u0275\u0275text(63, "Date de d\xE9but");
      \u0275\u0275elementEnd();
      \u0275\u0275element(64, "input", 36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "div", 19)(66, "label");
      \u0275\u0275text(67, "Capacit\xE9 maximale");
      \u0275\u0275elementEnd();
      \u0275\u0275element(68, "input", 37);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "div", 19)(70, "label");
      \u0275\u0275text(71, "Type de lieu");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "div", 38);
      \u0275\u0275template(73, EventFormComponent_label_73_Template, 4, 6, "label", 39);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(74, "div", 12)(75, "div", 13);
      \u0275\u0275text(76, "Ciblage");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "div", 19)(78, "label");
      \u0275\u0275text(79, "Secteurs cibles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 40)(81, "input", 41);
      \u0275\u0275twoWayListener("ngModelChange", function EventFormComponent_Template_input_ngModelChange_81_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.sectorInput, $event) || (ctx.sectorInput = $event);
        return $event;
      });
      \u0275\u0275listener("keydown", function EventFormComponent_Template_input_keydown_81_listener($event) {
        return ctx.onSectorKeydown($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "button", 42);
      \u0275\u0275listener("click", function EventFormComponent_Template_button_click_82_listener() {
        return ctx.addSector();
      });
      \u0275\u0275text(83, "+");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(84, EventFormComponent_div_84_Template, 2, 1, "div", 43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "div", 19)(86, "label");
      \u0275\u0275text(87, "Stades de startup");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "div", 40)(89, "input", 44);
      \u0275\u0275twoWayListener("ngModelChange", function EventFormComponent_Template_input_ngModelChange_89_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.stageInput, $event) || (ctx.stageInput = $event);
        return $event;
      });
      \u0275\u0275listener("keydown", function EventFormComponent_Template_input_keydown_89_listener($event) {
        return ctx.onStageKeydown($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "button", 42);
      \u0275\u0275listener("click", function EventFormComponent_Template_button_click_90_listener() {
        return ctx.addStage();
      });
      \u0275\u0275text(91, "+");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(92, EventFormComponent_div_92_Template, 2, 1, "div", 43);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(93, "div", 45)(94, "button", 46);
      \u0275\u0275listener("click", function EventFormComponent_Template_button_click_94_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(95, "Annuler");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "button", 47);
      \u0275\u0275template(97, EventFormComponent_span_97_Template, 1, 0, "span", 31);
      \u0275\u0275text(98);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_9_0;
      let tmp_11_0;
      let tmp_14_0;
      let tmp_15_0;
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.isEdit ? "Modifier" : "Cr\xE9er");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isEdit ? "Modifier l'\xE9v\xE9nement" : "Nouvel \xE9v\xE9nement");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275classProp("has-image", ctx.imagePreview);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.imagePreview);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.imagePreview);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.imagePreview);
      \u0275\u0275advance(9);
      \u0275\u0275classProp("input-error", ((tmp_9_0 = ctx.form.get("type")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.form.get("type")) == null ? null : tmp_9_0.touched));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.eventTypes);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_11_0 = ctx.form.get("type")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx.form.get("type")) == null ? null : tmp_11_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isEdit && ctx.isAdmin());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isEdit && !ctx.isAdmin());
      \u0275\u0275advance(10);
      \u0275\u0275classProp("input-error", ((tmp_14_0 = ctx.form.get("title")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx.form.get("title")) == null ? null : tmp_14_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_15_0 = ctx.form.get("title")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx.form.get("title")) == null ? null : tmp_15_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.isGenerating);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isGenerating);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isGenerating);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isGenerating ? "G\xE9n\xE9ration..." : "G\xE9n\xE9rer avec IA", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.aiError);
      \u0275\u0275advance(15);
      \u0275\u0275property("ngForOf", ctx.locationTypes);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.sectorInput);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(34, _c03));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.form.value.targetSector == null ? null : ctx.form.value.targetSector.length);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.stageInput);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c03));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.form.value.targetStage == null ? null : ctx.form.value.targetStage.length);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.isLoading || ctx.isUploading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isLoading ? "Enregistrement..." : ctx.isEdit ? "Mettre \xE0 jour" : "Cr\xE9er l'\xE9v\xE9nement", " ");
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, NgModel], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n.form-page[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: 0 auto;\n  padding: 2rem 1.5rem 4rem;\n  padding-top: calc(56px + 2rem);\n  font-family: "Inter", sans-serif;\n}\n.form-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1.25rem;\n  margin-bottom: 2rem;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #4b6890;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 8px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s, color 0.15s;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n  color: #1e3a6e;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin-bottom: 4px;\n}\n.form-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -0.02em;\n  margin: 0;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  padding: 10px 14px;\n  border-radius: 8px;\n  margin-bottom: 1.5rem;\n  border: 1px solid;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border-color: #fecaca;\n}\n.form-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 1.25rem;\n  align-items: start;\n}\n.form-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.form-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #8aaace;\n  margin-bottom: 1.1rem;\n}\n.image-upload-area[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1.5px dashed #c7d9f5;\n  border-radius: 10px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n  min-height: 160px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.image-upload-area[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: #f0f7ff;\n}\n.image-upload-area.has-image[_ngcontent-%COMP%] {\n  border-style: solid;\n  border-color: #dbeafe;\n}\n.upload-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 2rem 1rem;\n  color: #8aaace;\n  text-align: center;\n}\n.upload-placeholder[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n}\n.upload-hint[_ngcontent-%COMP%] {\n  font-size: 11px !important;\n  color: #b0c4de !important;\n  font-weight: 400 !important;\n}\n.image-preview[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 160px;\n  object-fit: cover;\n  display: block;\n}\n.file-input[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n}\n.upload-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 8px;\n}\n.uploading-text[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: #8aaace;\n}\n.btn-remove-img[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  font-weight: 500;\n  color: #dc2626;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-remove-img[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 1rem;\n}\n.field-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.fields-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  color: #4b6890;\n}\n.req[_ngcontent-%COMP%] {\n  color: #f97316;\n}\n.field-input[_ngcontent-%COMP%] {\n  height: 40px;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 8px;\n  padding: 0 12px;\n  font-size: 13.5px;\n  color: #1e3a6e;\n  font-family: "Inter", sans-serif;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n  width: 100%;\n  box-sizing: border-box;\n}\n.field-input[_ngcontent-%COMP%]::placeholder {\n  color: #b0c4de;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.field-input.input-error[_ngcontent-%COMP%] {\n  border-color: #f87171;\n  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);\n}\n.field-textarea[_ngcontent-%COMP%] {\n  height: auto;\n  padding: 10px 12px;\n  resize: vertical;\n  min-height: 100px;\n  line-height: 1.6;\n}\nselect.field-input[_ngcontent-%COMP%] {\n  appearance: none;\n  cursor: pointer;\n}\n.field-error[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #dc2626;\n}\n.location-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.location-opt[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #4b6890;\n  background: #f8faff;\n  border: 1px solid #dbeafe;\n  padding: 7px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.15s;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.location-opt[_ngcontent-%COMP%]:hover {\n  border-color: #93c5fd;\n  color: #1e3a6e;\n}\n.location-opt.selected[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  border-color: #3b82f6;\n  color: #1e3a6e;\n  font-weight: 600;\n}\n.loc-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.tag-input-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.tag-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.tag-add-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  background: #eff6ff;\n  border: 1px solid #dbeafe;\n  border-radius: 8px;\n  font-size: 18px;\n  color: #2563eb;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background 0.15s;\n  font-family: "Inter", sans-serif;\n}\n.tag-add-btn[_ngcontent-%COMP%]:hover {\n  background: #dbeafe;\n}\n.tags-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 8px;\n}\n.tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: #eff6ff;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n  font-size: 12px;\n  font-weight: 500;\n  padding: 4px 10px;\n  border-radius: 6px;\n}\n.tag[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #93c5fd;\n  font-size: 14px;\n  line-height: 1;\n  padding: 0;\n  transition: color 0.15s;\n  font-family: "Inter", sans-serif;\n}\n.tag[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #5a7396;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 10px 22px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff;\n}\n.btn-save[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #fff;\n  background: #1e3a6e;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s, transform 0.1s;\n}\n.btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #16305c;\n  transform: translateY(-1px);\n}\n.btn-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .form-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .fields-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-page[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 3rem;\n    padding-top: calc(56px + 1rem);\n  }\n}\n.workflow-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  background: #eff6ff;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n  border-radius: 8px;\n  padding: 10px 14px;\n  font-size: 13px;\n  line-height: 1.5;\n  margin-top: 8px;\n}\n.workflow-link[_ngcontent-%COMP%] {\n  color: #2563eb;\n  font-weight: 600;\n  text-decoration: underline;\n}\n.desc-label-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.btn-ai-generate[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  color: #7c3aed;\n  background: #f5f3ff;\n  border: 1px solid #ddd6fe;\n  padding: 5px 12px;\n  border-radius: 7px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-ai-generate[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #ede9fe;\n  color: #5b21b6;\n}\n.btn-ai-generate[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.ai-error[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #b91c1c;\n}\n.btn-ai-generate[_ngcontent-%COMP%]   .spinner-sm[_ngcontent-%COMP%] {\n  border-color: rgba(124, 58, 237, 0.25);\n  border-top-color: #7c3aed;\n}\n/*# sourceMappingURL=event-form.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventFormComponent, { className: "EventFormComponent", filePath: "src\\app\\modules\\event\\pages\\event-form\\event-form.component.ts", lineNumber: 13 });
})();

// src/app/modules/event/pages/speaker-list/speaker-list.component.ts
function SpeakerListComponent_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function SpeakerListComponent_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreate());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 16);
    \u0275\u0275element(2, "line", 17)(3, "line", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Nouvel intervenant ");
    \u0275\u0275elementEnd();
  }
}
function SpeakerListComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.successMessage);
  }
}
function SpeakerListComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function SpeakerListComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 16);
    \u0275\u0275element(2, "circle", 22)(3, "line", 23)(4, "line", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Cliquez sur ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7, "Ajouter");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " pour assigner un intervenant \xE0 cet \xE9v\xE9nement, ou sur ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, "Retirer");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" pour le dissocier. ", ctx_r1.eventSpeakers.length, " intervenant(s) actuellement assign\xE9(s). ");
  }
}
function SpeakerListComponent_div_15_img_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 44);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.imagePreview, \u0275\u0275sanitizeUrl);
  }
}
function SpeakerListComponent_div_15_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 46);
    \u0275\u0275element(2, "circle", 47)(3, "path", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Cliquer pour ajouter");
    \u0275\u0275elementEnd()();
  }
}
function SpeakerListComponent_div_15_div_27_button_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 54);
  }
}
function SpeakerListComponent_div_15_div_27_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function SpeakerListComponent_div_15_div_27_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.uploadPhoto(ctx_r1.editingSpeaker.id));
    });
    \u0275\u0275template(1, SpeakerListComponent_div_15_div_27_button_3_span_1_Template, 1, 0, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.isUploadingPhoto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isUploadingPhoto);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isUploadingPhoto ? "T\xE9l\xE9chargement..." : "T\xE9l\xE9charger", " ");
  }
}
function SpeakerListComponent_div_15_div_27_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1, " Upload\xE9e apr\xE8s cr\xE9ation ");
    \u0275\u0275elementEnd();
  }
}
function SpeakerListComponent_div_15_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "span", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, SpeakerListComponent_div_15_div_27_button_3_Template, 3, 3, "button", 51)(4, SpeakerListComponent_div_15_div_27_span_4_Template, 2, 0, "span", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedFile.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingSpeaker);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.editingSpeaker);
  }
}
function SpeakerListComponent_div_15_span_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 54);
  }
}
function SpeakerListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27)(4, "div", 28)(5, "label");
    \u0275\u0275text(6, "Nom complet *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function SpeakerListComponent_div_15_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.fullName, $event) || (ctx_r1.form.fullName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 30)(9, "label");
    \u0275\u0275text(10, "Titre / Poste");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function SpeakerListComponent_div_15_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.title, $event) || (ctx_r1.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 30)(13, "label");
    \u0275\u0275text(14, "Entreprise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function SpeakerListComponent_div_15_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.company, $event) || (ctx_r1.form.company = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 30)(17, "label");
    \u0275\u0275text(18, "LinkedIn URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function SpeakerListComponent_div_15_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.linkedinUrl, $event) || (ctx_r1.form.linkedinUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 30)(21, "label");
    \u0275\u0275text(22, "Photo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 34);
    \u0275\u0275template(24, SpeakerListComponent_div_15_img_24_Template, 1, 1, "img", 35)(25, SpeakerListComponent_div_15_div_25_Template, 6, 0, "div", 36);
    \u0275\u0275elementStart(26, "input", 37);
    \u0275\u0275listener("change", function SpeakerListComponent_div_15_Template_input_change_26_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(27, SpeakerListComponent_div_15_div_27_Template, 5, 3, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 28)(29, "label");
    \u0275\u0275text(30, "Biographie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "textarea", 39);
    \u0275\u0275twoWayListener("ngModelChange", function SpeakerListComponent_div_15_Template_textarea_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.bio, $event) || (ctx_r1.form.bio = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 40)(33, "button", 41);
    \u0275\u0275listener("click", function SpeakerListComponent_div_15_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelForm());
    });
    \u0275\u0275text(34, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 42);
    \u0275\u0275listener("click", function SpeakerListComponent_div_15_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275template(36, SpeakerListComponent_div_15_span_36_Template, 1, 0, "span", 43);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingSpeaker ? "Modifier l'intervenant" : "Nouvel intervenant", " ");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.company);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.linkedinUrl);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("has-photo", ctx_r1.imagePreview);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.imagePreview);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.imagePreview);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.selectedFile);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.bio);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.isSubmitting || !ctx_r1.form.fullName.trim());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmitting ? "Enregistrement..." : ctx_r1.editingSpeaker ? "Mettre \xE0 jour" : "Cr\xE9er", " ");
  }
}
function SpeakerListComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275element(1, "div", 57);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Chargement...");
    \u0275\u0275elementEnd()();
  }
}
function SpeakerListComponent_div_17_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function SpeakerListComponent_div_17_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCreate());
    });
    \u0275\u0275text(1, " Cr\xE9er un intervenant ");
    \u0275\u0275elementEnd();
  }
}
function SpeakerListComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "div", 59);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 60);
    \u0275\u0275element(3, "circle", 47)(4, "path", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "p", 61);
    \u0275\u0275text(6, "Aucun intervenant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 62);
    \u0275\u0275text(8, "Cr\xE9ez votre premier intervenant.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, SpeakerListComponent_div_17_button_9_Template, 2, 0, "button", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r1.canEdit());
  }
}
function SpeakerListComponent_div_18_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 80);
    \u0275\u0275element(2, "polyline", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Assign\xE9 ");
    \u0275\u0275elementEnd();
  }
}
function SpeakerListComponent_div_18_div_1_img_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 82);
  }
  if (rf & 2) {
    const speaker_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", speaker_r6.photoUrl, \u0275\u0275sanitizeUrl)("alt", speaker_r6.fullName);
  }
}
function SpeakerListComponent_div_18_div_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(speaker_r6.fullName.charAt(0).toUpperCase());
  }
}
function SpeakerListComponent_div_18_div_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(speaker_r6.title);
  }
}
function SpeakerListComponent_div_18_div_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 84);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 85);
    \u0275\u0275element(2, "path", 86)(3, "polyline", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", speaker_r6.company, " ");
  }
}
function SpeakerListComponent_div_18_div_1_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 88);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(speaker_r6.bio);
  }
}
function SpeakerListComponent_div_18_div_1_a_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 89);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 90);
    \u0275\u0275element(2, "path", 91)(3, "rect", 92)(4, "circle", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " LinkedIn ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const speaker_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", speaker_r6.linkedinUrl, \u0275\u0275sanitizeUrl);
  }
}
function SpeakerListComponent_div_18_div_1_ng_container_14_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 96);
    \u0275\u0275listener("click", function SpeakerListComponent_div_18_div_1_ng_container_14_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const speaker_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.linkToEvent(speaker_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 97);
    \u0275\u0275element(2, "line", 17)(3, "line", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Ajouter ");
    \u0275\u0275elementEnd();
  }
}
function SpeakerListComponent_div_18_div_1_ng_container_14_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 98);
    \u0275\u0275listener("click", function SpeakerListComponent_div_18_div_1_ng_container_14_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const speaker_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.unlinkFromEvent(speaker_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 97);
    \u0275\u0275element(2, "line", 99)(3, "line", 100);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Retirer ");
    \u0275\u0275elementEnd();
  }
}
function SpeakerListComponent_div_18_div_1_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, SpeakerListComponent_div_18_div_1_ng_container_14_button_1_Template, 5, 0, "button", 94)(2, SpeakerListComponent_div_18_div_1_ng_container_14_button_2_Template, 5, 0, "button", 95);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const speaker_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isLinkedToEvent(speaker_r6));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLinkedToEvent(speaker_r6));
  }
}
function SpeakerListComponent_div_18_div_1_div_15_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 106);
    \u0275\u0275listener("click", function SpeakerListComponent_div_18_div_1_div_15_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const speaker_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.delete(speaker_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 97);
    \u0275\u0275element(2, "polyline", 107)(3, "path", 108);
    \u0275\u0275elementEnd()();
  }
}
function SpeakerListComponent_div_18_div_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 101)(1, "button", 102);
    \u0275\u0275listener("click", function SpeakerListComponent_div_18_div_1_div_15_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const speaker_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEdit(speaker_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 97);
    \u0275\u0275element(3, "path", 103)(4, "path", 104);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, SpeakerListComponent_div_18_div_1_div_15_button_5_Template, 4, 0, "button", 105);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin());
  }
}
function SpeakerListComponent_div_18_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275template(1, SpeakerListComponent_div_18_div_1_div_1_Template, 4, 0, "div", 66);
    \u0275\u0275elementStart(2, "div", 67)(3, "div", 68);
    \u0275\u0275template(4, SpeakerListComponent_div_18_div_1_img_4_Template, 1, 2, "img", 69)(5, SpeakerListComponent_div_18_div_1_span_5_Template, 2, 1, "span", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 71)(7, "div", 72);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, SpeakerListComponent_div_18_div_1_div_9_Template, 2, 1, "div", 73)(10, SpeakerListComponent_div_18_div_1_div_10_Template, 5, 1, "div", 74);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, SpeakerListComponent_div_18_div_1_p_11_Template, 2, 1, "p", 75)(12, SpeakerListComponent_div_18_div_1_a_12_Template, 6, 1, "a", 76);
    \u0275\u0275elementStart(13, "div", 77);
    \u0275\u0275template(14, SpeakerListComponent_div_18_div_1_ng_container_14_Template, 3, 2, "ng-container", 70)(15, SpeakerListComponent_div_18_div_1_div_15_Template, 6, 1, "div", 78);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const speaker_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("linked", ctx_r1.isLinkedToEvent(speaker_r6));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.eventId && ctx_r1.isLinkedToEvent(speaker_r6));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", speaker_r6.photoUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !speaker_r6.photoUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(speaker_r6.fullName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", speaker_r6.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", speaker_r6.company);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", speaker_r6.bio);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", speaker_r6.linkedinUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.eventId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit());
  }
}
function SpeakerListComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275template(1, SpeakerListComponent_div_18_div_1_Template, 16, 12, "div", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.allSpeakers);
  }
}
var SpeakerListComponent = class _SpeakerListComponent {
  speakerService;
  authService;
  route;
  router;
  allSpeakers = [];
  eventSpeakers = [];
  isLoading = true;
  errorMessage = "";
  successMessage = "";
  showForm = false;
  editingSpeaker = null;
  isSubmitting = false;
  eventId = null;
  // ── Photo upload ──────────────────────────────
  selectedFile = null;
  imagePreview = null;
  isUploadingPhoto = false;
  form = {
    fullName: "",
    title: "",
    company: "",
    bio: "",
    photoUrl: "",
    linkedinUrl: ""
  };
  constructor(speakerService, authService, route, router) {
    this.speakerService = speakerService;
    this.authService = authService;
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    const eventIdParam = this.route.snapshot.queryParamMap.get("eventId");
    if (eventIdParam) {
      this.eventId = +eventIdParam;
      this.loadEventSpeakers();
    }
    this.loadAll();
  }
  loadAll() {
    this.isLoading = true;
    this.speakerService.getAll().subscribe({
      next: (speakers) => {
        this.allSpeakers = speakers;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Impossible de charger les intervenants.";
        this.isLoading = false;
      }
    });
  }
  loadEventSpeakers() {
    if (!this.eventId)
      return;
    this.speakerService.getByEvent(this.eventId).subscribe({
      next: (speakers) => this.eventSpeakers = speakers,
      error: () => {
      }
    });
  }
  canEdit() {
    const role = this.authService.getRole();
    return [
      "ROLE_ADMIN",
      "ADMIN",
      "ROLE_MENTOR",
      "MENTOR",
      "ROLE_PARTENAIRE",
      "PARTENAIRE"
    ].includes(role);
  }
  isAdmin() {
    const role = this.authService.getRole();
    return role === "ADMIN" || role === "ROLE_ADMIN";
  }
  isLinkedToEvent(speaker) {
    return this.eventSpeakers.some((s) => s.id === speaker.id);
  }
  // ── FORM ──────────────────────────────────────
  openCreate() {
    this.editingSpeaker = null;
    this.imagePreview = null;
    this.selectedFile = null;
    this.form = {
      fullName: "",
      title: "",
      company: "",
      bio: "",
      photoUrl: "",
      linkedinUrl: ""
    };
    this.showForm = true;
    this.clearMessages();
  }
  openEdit(speaker) {
    this.editingSpeaker = speaker;
    this.imagePreview = speaker.photoUrl || null;
    this.selectedFile = null;
    this.form = {
      fullName: speaker.fullName,
      title: speaker.title || "",
      company: speaker.company || "",
      bio: speaker.bio || "",
      photoUrl: speaker.photoUrl || "",
      linkedinUrl: speaker.linkedinUrl || ""
    };
    this.showForm = true;
    this.clearMessages();
  }
  cancelForm() {
    this.showForm = false;
    this.editingSpeaker = null;
    this.imagePreview = null;
    this.selectedFile = null;
  }
  // ── PHOTO UPLOAD ──────────────────────────────
  onFileSelected(event) {
    const input = event.target;
    if (!input.files?.length)
      return;
    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(this.selectedFile);
  }
  uploadPhoto(speakerId) {
    if (!this.selectedFile)
      return;
    this.isUploadingPhoto = true;
    this.speakerService.uploadPhoto(speakerId, this.selectedFile).subscribe({
      next: (res) => {
        this.form.photoUrl = res.url;
        this.isUploadingPhoto = false;
        this.selectedFile = null;
        this.successMessage = "Photo t\xE9l\xE9charg\xE9e.";
      },
      error: () => {
        this.errorMessage = "\xC9chec du t\xE9l\xE9chargement de la photo.";
        this.isUploadingPhoto = false;
      }
    });
  }
  // ── SUBMIT ────────────────────────────────────
  submit() {
    if (!this.form.fullName.trim())
      return;
    this.isSubmitting = true;
    const request$ = this.editingSpeaker ? this.speakerService.update(this.editingSpeaker.id, this.form) : this.speakerService.create(this.form);
    request$.subscribe({
      next: (saved) => {
        if (!this.editingSpeaker && this.selectedFile) {
          this.speakerService.uploadPhoto(saved.id, this.selectedFile).subscribe({
            next: (res) => {
              saved.photoUrl = res.url;
              this.allSpeakers = [...this.allSpeakers, saved];
            },
            error: () => {
              this.allSpeakers = [...this.allSpeakers, saved];
            }
          });
        } else if (this.editingSpeaker) {
          const idx = this.allSpeakers.findIndex((s) => s.id === this.editingSpeaker.id);
          if (idx !== -1)
            this.allSpeakers[idx] = saved;
        } else {
          this.allSpeakers = [...this.allSpeakers, saved];
        }
        this.successMessage = this.editingSpeaker ? "Intervenant mis \xE0 jour." : "Intervenant cr\xE9\xE9.";
        this.showForm = false;
        this.editingSpeaker = null;
        this.imagePreview = null;
        this.selectedFile = null;
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = "\xC9chec de l'enregistrement.";
        this.isSubmitting = false;
      }
    });
  }
  // ── DELETE ────────────────────────────────────
  delete(speaker) {
    if (!confirm(`Supprimer "${speaker.fullName}" ?`))
      return;
    this.speakerService.delete(speaker.id).subscribe({
      next: () => {
        this.allSpeakers = this.allSpeakers.filter((s) => s.id !== speaker.id);
        this.eventSpeakers = this.eventSpeakers.filter((s) => s.id !== speaker.id);
        this.successMessage = "Intervenant supprim\xE9.";
      },
      error: () => {
        this.errorMessage = "\xC9chec de la suppression.";
      }
    });
  }
  // ── LINK / UNLINK ─────────────────────────────
  linkToEvent(speaker) {
    if (!this.eventId)
      return;
    this.speakerService.linkToEvent(this.eventId, speaker.id).subscribe({
      next: () => {
        this.eventSpeakers = [...this.eventSpeakers, speaker];
        this.successMessage = `${speaker.fullName} ajout\xE9 \xE0 l'\xE9v\xE9nement.`;
      },
      error: () => {
        this.errorMessage = "\xC9chec de l'ajout.";
      }
    });
  }
  unlinkFromEvent(speaker) {
    if (!this.eventId)
      return;
    this.speakerService.unlinkFromEvent(this.eventId, speaker.id).subscribe({
      next: () => {
        this.eventSpeakers = this.eventSpeakers.filter((s) => s.id !== speaker.id);
        this.successMessage = `${speaker.fullName} retir\xE9 de l'\xE9v\xE9nement.`;
      },
      error: () => {
        this.errorMessage = "\xC9chec de la dissociation.";
      }
    });
  }
  // ── NAVIGATION ────────────────────────────────
  goBack() {
    if (this.eventId) {
      this.router.navigate(["/events", this.eventId]);
    } else {
      this.router.navigate(["/events"]);
    }
  }
  clearMessages() {
    this.successMessage = "";
    this.errorMessage = "";
  }
  static \u0275fac = function SpeakerListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpeakerListComponent)(\u0275\u0275directiveInject(SpeakerService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpeakerListComponent, selectors: [["app-speaker-list"]], decls: 19, vars: 10, consts: [[1, "speaker-page"], [1, "page-header"], [1, "back-btn", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M19 12H5M12 5l-7 7 7 7"], [1, "page-label"], [1, "page-title"], ["class", "btn-new", 3, "click", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], ["class", "event-banner", 4, "ngIf"], ["class", "speaker-form-card", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "speakers-grid", 4, "ngIf"], [1, "btn-new", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "alert", "alert-success"], [1, "alert", "alert-error"], [1, "event-banner"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "speaker-form-card"], [1, "form-card-title"], [1, "form-grid"], [1, "field-group", "full"], ["type", "text", "placeholder", "Ex: Ahmed Ben Ali", 1, "field-input", 3, "ngModelChange", "ngModel"], [1, "field-group"], ["type", "text", "placeholder", "Ex: CTO & Co-founder", 1, "field-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Ex: TechTN", 1, "field-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "https://linkedin.com/in/...", 1, "field-input", 3, "ngModelChange", "ngModel"], [1, "photo-upload-area"], ["class", "photo-preview", "alt", "preview", 3, "src", 4, "ngIf"], ["class", "upload-placeholder", 4, "ngIf"], ["type", "file", "accept", "image/*", 1, "file-input", 3, "change"], ["class", "photo-actions", 4, "ngIf"], ["placeholder", "Quelques mots sur l'intervenant...", "rows", "3", 1, "field-input", "field-textarea", 3, "ngModelChange", "ngModel"], [1, "form-actions"], [1, "btn-cancel-sm", 3, "click"], [1, "btn-save-sm", 3, "click", "disabled"], ["class", "spinner-sm", 4, "ngIf"], ["alt", "preview", 1, "photo-preview", 3, "src"], [1, "upload-placeholder"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["cx", "12", "cy", "8", "r", "4"], ["d", "M4 20c0-4 3.6-7 8-7s8 3 8 7"], [1, "photo-actions"], [1, "photo-filename"], ["type", "button", "class", "btn-upload-photo", 3, "disabled", "click", 4, "ngIf"], ["class", "upload-note", 4, "ngIf"], ["type", "button", 1, "btn-upload-photo", 3, "click", "disabled"], [1, "spinner-sm"], [1, "upload-note"], [1, "loading-state"], [1, "spinner-lg"], [1, "empty-state"], [1, "empty-icon"], ["width", "26", "height", "26", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], [1, "empty-title"], [1, "empty-sub"], [1, "speakers-grid"], ["class", "speaker-card", 3, "linked", 4, "ngFor", "ngForOf"], [1, "speaker-card"], ["class", "linked-badge", 4, "ngIf"], [1, "card-top"], [1, "speaker-avatar"], [3, "src", "alt", 4, "ngIf"], [4, "ngIf"], [1, "speaker-info"], [1, "speaker-name"], ["class", "speaker-role", 4, "ngIf"], ["class", "speaker-company", 4, "ngIf"], ["class", "speaker-bio", 4, "ngIf"], ["class", "speaker-linkedin", "target", "_blank", 3, "href", 4, "ngIf"], [1, "card-footer"], ["class", "card-actions", 4, "ngIf"], [1, "linked-badge"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["points", "20 6 9 17 4 12"], [3, "src", "alt"], [1, "speaker-role"], [1, "speaker-company"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"], ["points", "9 22 9 12 15 12 15 22"], [1, "speaker-bio"], ["target", "_blank", 1, "speaker-linkedin", 3, "href"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"], ["x", "2", "y", "9", "width", "4", "height", "12"], ["cx", "4", "cy", "4", "r", "2"], ["class", "btn-link", 3, "click", 4, "ngIf"], ["class", "btn-unlink-sm", 3, "click", 4, "ngIf"], [1, "btn-link", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], [1, "btn-unlink-sm", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "card-actions"], ["title", "Modifier", 1, "btn-icon-sm", 3, "click"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], ["class", "btn-icon-sm btn-icon-del", "title", "Supprimer", 3, "click", 4, "ngIf"], ["title", "Supprimer", 1, "btn-icon-sm", "btn-icon-del", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14H6L5 6"]], template: function SpeakerListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function SpeakerListComponent_Template_button_click_2_listener() {
        return ctx.goBack();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(6, "div")(7, "div", 5);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h1", 6);
      \u0275\u0275text(10, "Intervenants");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(11, SpeakerListComponent_button_11_Template, 5, 0, "button", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, SpeakerListComponent_div_12_Template, 2, 1, "div", 8)(13, SpeakerListComponent_div_13_Template, 2, 1, "div", 9)(14, SpeakerListComponent_div_14_Template, 12, 1, "div", 10)(15, SpeakerListComponent_div_15_Template, 38, 14, "div", 11)(16, SpeakerListComponent_div_16_Template, 4, 0, "div", 12)(17, SpeakerListComponent_div_17_Template, 10, 1, "div", 13)(18, SpeakerListComponent_div_18_Template, 2, 1, "div", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.eventId ? "Retour \xE0 l'\xE9v\xE9nement" : "Retour", " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.eventId ? "Assigner des intervenants" : "Gestion");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.canEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.eventId);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showForm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.allSpeakers.length === 0 && !ctx.showForm);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.allSpeakers.length > 0);
    }
  }, dependencies: [NgForOf, NgIf, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n.speaker-page[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 2rem 1.5rem 4rem;\n  padding-top: calc(56px + 2rem);\n  font-family: "Inter", sans-serif;\n  min-height: 100vh;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1.25rem;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  color: #4b6890;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 8px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n  color: #1e3a6e;\n}\n.page-label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin-bottom: 4px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -0.02em;\n  margin: 0;\n}\n.btn-new[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  background: #1e3a6e;\n  color: #fff;\n  font-size: 13.5px;\n  font-weight: 500;\n  padding: 9px 18px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  text-decoration: none;\n  transition: background 0.15s;\n  margin-left: auto;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n.btn-new[_ngcontent-%COMP%]:hover {\n  background: #16305c;\n  color: #fff;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  padding: 10px 14px;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  border: 1px solid;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border-color: #fecaca;\n}\n.event-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 10px;\n  padding: 10px 14px;\n  font-size: 13px;\n  color: #1d4ed8;\n  margin-bottom: 1.5rem;\n}\n.speaker-form-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n.form-card-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  margin-bottom: 1.25rem;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 1.25rem;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.field-group.full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  color: #4b6890;\n}\n.field-input[_ngcontent-%COMP%] {\n  height: 38px;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 7px;\n  padding: 0 10px;\n  font-size: 13px;\n  color: #1e3a6e;\n  font-family: "Inter", sans-serif;\n  outline: none;\n  width: 100%;\n  box-sizing: border-box;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.field-textarea[_ngcontent-%COMP%] {\n  height: auto;\n  padding: 8px 10px;\n  resize: vertical;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}\n.btn-save-sm[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #fff;\n  background: #1e3a6e;\n  border: none;\n  padding: 8px 20px;\n  border-radius: 7px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  transition: background 0.15s;\n}\n.btn-save-sm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-cancel-sm[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #5a7396;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 8px 18px;\n  border-radius: 7px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 5rem 0;\n  color: #8aaace;\n  font-size: 14px;\n}\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border: 3px solid #dbeafe;\n  border-top-color: #2563eb;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 5rem 0;\n  text-align: center;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  background: #eff6ff;\n  color: #93c5fd;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 0.5rem;\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  margin: 0;\n}\n.empty-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #8aaace;\n  margin: 0 0 1rem;\n}\n.speakers-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 1.25rem;\n}\n.speaker-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 14px;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  position: relative;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.speaker-card[_ngcontent-%COMP%]:hover {\n  border-color: #93c5fd;\n  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.06);\n}\n.speaker-card.linked[_ngcontent-%COMP%] {\n  border-color: #86efac;\n  background: #f0fdf4;\n}\n.linked-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  background: #dcfce7;\n  color: #15803d;\n  border: 1px solid #86efac;\n  font-size: 10.5px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.card-top[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n.speaker-avatar[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #eff6ff;\n  color: #2563eb;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 17px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.speaker-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.speaker-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.speaker-name[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #1e3a6e;\n  line-height: 1.3;\n}\n.speaker-role[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #5a7396;\n  margin-top: 1px;\n}\n.speaker-company[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11.5px;\n  color: #8aaace;\n  margin-top: 3px;\n}\n.speaker-bio[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #7a9abf;\n  line-height: 1.6;\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.speaker-linkedin[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  font-weight: 500;\n  color: #2563eb;\n  text-decoration: none;\n  width: fit-content;\n}\n.speaker-linkedin[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 10px;\n  border-top: 1px solid #f0f6ff;\n  gap: 8px;\n}\n.btn-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: #059669;\n  background: #f0fdf4;\n  border: 1px solid #86efac;\n  padding: 5px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  background: #dcfce7;\n}\n.btn-unlink-sm[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: #dc2626;\n  background: #fff;\n  border: 1px solid #fecaca;\n  padding: 5px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-unlink-sm[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  margin-left: auto;\n}\n.btn-icon-sm[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 7px;\n  border: 1px solid #dbeafe;\n  background: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #4b6890;\n  transition: background 0.15s;\n}\n.btn-icon-sm[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n}\n.btn-icon-del[_ngcontent-%COMP%] {\n  border-color: #fecaca;\n  color: #dc2626;\n}\n.btn-icon-del[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n}\n@media (max-width: 768px) {\n  .speaker-page[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 3rem;\n    padding-top: calc(56px + 1rem);\n  }\n  .speakers-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-group.full[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n}\n.photo-upload-area[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1.5px dashed #c7d9f5;\n  border-radius: 10px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n  min-height: 120px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.photo-upload-area[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: #f0f7ff;\n}\n.photo-upload-area.has-photo[_ngcontent-%COMP%] {\n  border-style: solid;\n  border-color: #dbeafe;\n}\n.upload-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  padding: 1.5rem;\n  color: #8aaace;\n  text-align: center;\n}\n.upload-placeholder[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 500;\n}\n.photo-preview[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 120px;\n  object-fit: cover;\n  display: block;\n}\n.file-input[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n}\n.photo-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 8px;\n  flex-wrap: wrap;\n}\n.photo-filename[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #5a7396;\n  flex: 1;\n}\n.upload-note[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #8aaace;\n  font-style: italic;\n}\n.btn-upload-photo[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: #fff;\n  background: #2563eb;\n  border: none;\n  padding: 6px 14px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-upload-photo[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n.btn-upload-photo[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=speaker-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpeakerListComponent, { className: "SpeakerListComponent", filePath: "src\\app\\modules\\event\\pages\\speaker-list\\speaker-list.component.ts", lineNumber: 12 });
})();

// src/app/modules/event/pages/pending-events/pending-events.component.ts
var _c04 = (a0) => ["/events", a0];
function PendingEventsComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.events.length, " en attente ");
  }
}
function PendingEventsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Chargement...");
    \u0275\u0275elementEnd()();
  }
}
function PendingEventsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function PendingEventsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 15);
    \u0275\u0275text(4, "Aucun \xE9v\xE9nement en attente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 16);
    \u0275\u0275text(6, "Tous les \xE9v\xE9nements ont \xE9t\xE9 trait\xE9s.");
    \u0275\u0275elementEnd()();
  }
}
function PendingEventsComponent_div_11_div_1_div_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2713 Approuv\xE9");
    \u0275\u0275elementEnd();
  }
}
function PendingEventsComponent_div_11_div_1_div_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2715 Rejet\xE9");
    \u0275\u0275elementEnd();
  }
}
function PendingEventsComponent_div_11_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275template(1, PendingEventsComponent_div_11_div_1_div_1_span_1_Template, 2, 0, "span", 42)(2, PendingEventsComponent_div_11_div_1_div_1_span_2_Template, 2, 0, "span", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.actionSuccess[event_r2.id] === "approved");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.actionSuccess[event_r2.id] === "rejected");
  }
}
function PendingEventsComponent_div_11_div_1_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 ", event_r2.organizerEmail, "");
  }
}
function PendingEventsComponent_div_11_div_1_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 28);
    \u0275\u0275element(2, "circle", 44)(3, "polyline", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Soumis le ", \u0275\u0275pipeBind2(5, 1, event_r2.submittedAt, "dd/MM/yyyy HH:mm"), " ");
  }
}
function PendingEventsComponent_div_11_div_1_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", event_r2.targetSector.join(", "), " ");
  }
}
function PendingEventsComponent_div_11_div_1_div_31_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Confirmer le rejet");
    \u0275\u0275elementEnd();
  }
}
function PendingEventsComponent_div_11_div_1_div_31_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "...");
    \u0275\u0275elementEnd();
  }
}
function PendingEventsComponent_div_11_div_1_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "textarea", 47);
    \u0275\u0275twoWayListener("ngModelChange", function PendingEventsComponent_div_11_div_1_div_31_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const event_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.rejectReason[event_r2.id], $event) || (ctx_r0.rejectReason[event_r2.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(2, "        ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 48)(4, "button", 49);
    \u0275\u0275listener("click", function PendingEventsComponent_div_11_div_1_div_31_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const event_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmReject(event_r2.id));
    });
    \u0275\u0275template(5, PendingEventsComponent_div_11_div_1_div_31_span_5_Template, 2, 0, "span", 42)(6, PendingEventsComponent_div_11_div_1_div_31_span_6_Template, 2, 0, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 50);
    \u0275\u0275listener("click", function PendingEventsComponent_div_11_div_1_div_31_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancelReject());
    });
    \u0275\u0275text(8, "Annuler");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const event_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.rejectReason[event_r2.id]);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.actionLoading[event_r2.id] || !ctx_r0.hasRejectReason(event_r2.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.actionLoading[event_r2.id]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.actionLoading[event_r2.id]);
  }
}
function PendingEventsComponent_div_11_div_1_div_32_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Approuver");
    \u0275\u0275elementEnd();
  }
}
function PendingEventsComponent_div_11_div_1_div_32_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "...");
    \u0275\u0275elementEnd();
  }
}
function PendingEventsComponent_div_11_div_1_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "button", 52);
    \u0275\u0275listener("click", function PendingEventsComponent_div_11_div_1_div_32_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const event_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.approve(event_r2.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 53);
    \u0275\u0275element(3, "polyline", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PendingEventsComponent_div_11_div_1_div_32_span_4_Template, 2, 0, "span", 42)(5, PendingEventsComponent_div_11_div_1_div_32_span_5_Template, 2, 0, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 55);
    \u0275\u0275listener("click", function PendingEventsComponent_div_11_div_1_div_32_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const event_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startReject(event_r2.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 53);
    \u0275\u0275element(8, "line", 56)(9, "line", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Rejeter ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "a", 58);
    \u0275\u0275text(12, "Voir d\xE9tail \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.actionLoading[event_r2.id]);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r0.actionLoading[event_r2.id]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.actionLoading[event_r2.id]);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.actionLoading[event_r2.id]);
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c04, event_r2.id));
  }
}
function PendingEventsComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275template(1, PendingEventsComponent_div_11_div_1_div_1_Template, 3, 2, "div", 20);
    \u0275\u0275elementStart(2, "div", 21)(3, "span", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 24);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "h2", 25);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 26);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 27);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 28);
    \u0275\u0275element(16, "path", 29)(17, "circle", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "span", 31);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 32);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, PendingEventsComponent_div_11_div_1_span_22_Template, 2, 1, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 34)(24, "span", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 28);
    \u0275\u0275element(26, "path", 36)(27, "circle", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, PendingEventsComponent_div_11_div_1_span_29_Template, 6, 4, "span", 38)(30, PendingEventsComponent_div_11_div_1_span_30_Template, 2, 1, "span", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, PendingEventsComponent_div_11_div_1_div_31_Template, 9, 4, "div", 39)(32, PendingEventsComponent_div_11_div_1_div_32_Template, 13, 7, "div", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("card-approved", ctx_r0.actionSuccess[event_r2.id] === "approved")("card-rejected", ctx_r0.actionSuccess[event_r2.id] === "rejected");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.actionSuccess[event_r2.id]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(event_r2.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r2.locationType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 22, event_r2.startDate, "dd MMM yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(event_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r2.description);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", event_r2.organizerName || "Organisateur #" + event_r2.organizerId, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("role-mentor", event_r2.organizerRole.includes("MENTOR"))("role-partner", event_r2.organizerRole.includes("PARTNER") || event_r2.organizerRole.includes("PARTENAIRE"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", event_r2.organizerRole, "\n");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r2.organizerEmail);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", event_r2.capacityMax, " places ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r2.submittedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r2.targetSector == null ? null : event_r2.targetSector.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.rejectingId === event_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.actionSuccess[event_r2.id] && ctx_r0.rejectingId !== event_r2.id);
  }
}
function PendingEventsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275template(1, PendingEventsComponent_div_11_div_1_Template, 33, 25, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.events);
  }
}
var PendingEventsComponent = class _PendingEventsComponent {
  eventService;
  events = [];
  loading = true;
  error = "";
  // Per-card state
  rejectingId = null;
  rejectReason = {};
  actionLoading = {};
  actionSuccess = {};
  constructor(eventService) {
    this.eventService = eventService;
  }
  ngOnInit() {
    this.loadPending();
  }
  loadPending() {
    this.loading = true;
    this.error = "";
    this.eventService.getPending().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Erreur lors du chargement des \xE9v\xE9nements en attente.";
        this.loading = false;
      }
    });
  }
  approve(id) {
    this.actionLoading[id] = true;
    this.eventService.approve(id).subscribe({
      next: () => {
        this.actionSuccess[id] = "approved";
        this.actionLoading[id] = false;
        setTimeout(() => this.events = this.events.filter((e) => e.id !== id), 1200);
      },
      error: () => {
        this.actionLoading[id] = false;
      }
    });
  }
  startReject(id) {
    this.rejectingId = id;
    if (!this.rejectReason[id])
      this.rejectReason[id] = "";
  }
  cancelReject() {
    this.rejectingId = null;
  }
  confirmReject(id) {
    if (!this.rejectReason[id]?.trim())
      return;
    this.actionLoading[id] = true;
    this.eventService.reject(id, this.rejectReason[id]).subscribe({
      next: () => {
        this.actionSuccess[id] = "rejected";
        this.actionLoading[id] = false;
        this.rejectingId = null;
        setTimeout(() => this.events = this.events.filter((e) => e.id !== id), 1200);
      },
      error: () => {
        this.actionLoading[id] = false;
      }
    });
  }
  hasRejectReason(id) {
    return !!(this.rejectReason[id] && this.rejectReason[id].trim());
  }
  static \u0275fac = function PendingEventsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PendingEventsComponent)(\u0275\u0275directiveInject(EventService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PendingEventsComponent, selectors: [["app-pending-events"]], decls: 12, vars: 5, consts: [[1, "pending-page"], [1, "page-header"], [1, "page-label"], [1, "page-title"], ["class", "badge-count", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "alert-error", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "pending-list", 4, "ngIf"], [1, "badge-count"], [1, "loading-state"], [1, "spinner"], [1, "alert-error"], [1, "empty-state"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-sub"], [1, "pending-list"], ["class", "pending-card", 3, "card-approved", "card-rejected", 4, "ngFor", "ngForOf"], [1, "pending-card"], ["class", "success-overlay", 4, "ngIf"], [1, "card-meta"], [1, "tag-type"], [1, "tag-location"], [1, "meta-date"], [1, "card-title"], [1, "card-desc"], [1, "card-organizer"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], [1, "org-name"], [1, "org-role-badge"], ["class", "org-email", 4, "ngIf"], [1, "card-details"], [1, "detail-item"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["class", "detail-item", 4, "ngIf"], ["class", "reject-panel", 4, "ngIf"], ["class", "card-actions", 4, "ngIf"], [1, "success-overlay"], [4, "ngIf"], [1, "org-email"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "reject-panel"], ["placeholder", "Raison du rejet (obligatoire)...", "rows", "3", 1, "reject-input", 3, "ngModelChange", "ngModel"], [1, "reject-actions"], [1, "btn-confirm-reject", 3, "click", "disabled"], [1, "btn-cancel", 3, "click"], [1, "card-actions"], [1, "btn-approve", 3, "click", "disabled"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["points", "20 6 9 17 4 12"], [1, "btn-reject", 3, "click", "disabled"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "btn-view", 3, "routerLink"]], template: function PendingEventsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2);
      \u0275\u0275text(4, "Administration");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 3);
      \u0275\u0275text(6, "Validation des \xE9v\xE9nements");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, PendingEventsComponent_span_7_Template, 2, 1, "span", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(8, PendingEventsComponent_div_8_Template, 4, 0, "div", 5)(9, PendingEventsComponent_div_9_Template, 2, 1, "div", 6)(10, PendingEventsComponent_div_10_Template, 7, 0, "div", 7)(11, PendingEventsComponent_div_11_Template, 2, 1, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error && !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.events.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.events.length > 0);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, DefaultValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n.pending-page[_ngcontent-%COMP%] {\n  max-width: 860px;\n  margin: 0 auto;\n  padding: 2rem 1.5rem 4rem;\n  padding-top: calc(56px + 2rem);\n  font-family: "Inter", sans-serif;\n  min-height: 100vh;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin-bottom: 4px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -0.02em;\n  margin: 0;\n}\n.badge-count[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n  border: 1px solid #fde68a;\n  font-size: 12.5px;\n  font-weight: 600;\n  padding: 6px 14px;\n  border-radius: 20px;\n  align-self: center;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 5rem 0;\n  color: #8aaace;\n  font-size: 14px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 3px solid #dbeafe;\n  border-top-color: #2563eb;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n  border-radius: 10px;\n  padding: 12px 16px;\n  font-size: 13.5px;\n  margin-bottom: 1.5rem;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 5rem 0;\n  text-align: center;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 16px;\n  background: #f0fdf4;\n  color: #16a34a;\n  font-size: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 0.5rem;\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  margin: 0;\n}\n.empty-sub[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: #8aaace;\n  margin: 0;\n}\n.pending-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.pending-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 14px;\n  padding: 1.5rem;\n  position: relative;\n  overflow: hidden;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.pending-card[_ngcontent-%COMP%]:hover {\n  border-color: #93c5fd;\n  box-shadow: 0 2px 12px rgba(30, 58, 110, 0.06);\n}\n.pending-card.card-approved[_ngcontent-%COMP%] {\n  border-color: #86efac;\n  background: #f0fdf4;\n}\n.pending-card.card-rejected[_ngcontent-%COMP%] {\n  border-color: #fca5a5;\n  background: #fef2f2;\n}\n.success-overlay[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 15px;\n  font-weight: 600;\n  padding: 0.75rem;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n}\n.card-approved[_ngcontent-%COMP%]   .success-overlay[_ngcontent-%COMP%] {\n  color: #16a34a;\n  background: #dcfce7;\n}\n.card-rejected[_ngcontent-%COMP%]   .success-overlay[_ngcontent-%COMP%] {\n  color: #b91c1c;\n  background: #fee2e2;\n}\n.card-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 0.75rem;\n}\n.tag-type[_ngcontent-%COMP%], \n.tag-location[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  padding: 3px 9px;\n  border-radius: 6px;\n}\n.tag-type[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #2563eb;\n}\n.tag-location[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  color: #7c3aed;\n}\n.meta-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8aaace;\n  margin-left: auto;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  margin: 0 0 0.4rem;\n  letter-spacing: -0.01em;\n}\n.card-desc[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: #4b6a9b;\n  line-height: 1.55;\n  margin: 0 0 1rem;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.card-details[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  font-size: 12.5px;\n  color: #8aaace;\n  margin-bottom: 1.25rem;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.reject-panel[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  margin-bottom: 1rem;\n}\n.reject-input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid #fca5a5;\n  border-radius: 8px;\n  padding: 10px 12px;\n  font-size: 13.5px;\n  font-family: "Inter", sans-serif;\n  color: #1e3a6e;\n  background: #fff7f7;\n  resize: vertical;\n  outline: none;\n  transition: border-color 0.15s;\n  margin-bottom: 0.75rem;\n}\n.reject-input[_ngcontent-%COMP%]:focus {\n  border-color: #ef4444;\n}\n.reject-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.btn-approve[_ngcontent-%COMP%], \n.btn-reject[_ngcontent-%COMP%], \n.btn-confirm-reject[_ngcontent-%COMP%], \n.btn-cancel[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  font-family: "Inter", sans-serif;\n  padding: 8px 16px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.btn-approve[_ngcontent-%COMP%] {\n  background: #16a34a;\n  color: #fff;\n}\n.btn-approve[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #15803d;\n}\n.btn-approve[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-reject[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.btn-reject[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fee2e2;\n}\n.btn-reject[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-confirm-reject[_ngcontent-%COMP%] {\n  background: #b91c1c;\n  color: #fff;\n}\n.btn-confirm-reject[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #991b1b;\n}\n.btn-confirm-reject[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n}\n.btn-view[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #2563eb;\n  text-decoration: none;\n  margin-left: auto;\n  font-weight: 500;\n  transition: color 0.15s;\n}\n.btn-view[_ngcontent-%COMP%]:hover {\n  color: #1d4ed8;\n  text-decoration: underline;\n}\n@media (max-width: 600px) {\n  .pending-page[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 3rem;\n    padding-top: calc(56px + 1rem);\n  }\n  .card-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .btn-view[_ngcontent-%COMP%] {\n    margin-left: 0;\n    text-align: center;\n  }\n}\n.card-organizer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  flex-wrap: wrap;\n  font-size: 12.5px;\n  color: #4b6a9b;\n  margin-bottom: 0.75rem;\n  padding: 8px 12px;\n  background: #f8faff;\n  border: 1px solid #dbeafe;\n  border-radius: 8px;\n}\n.org-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1e3a6e;\n}\n.org-role-badge[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 5px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  background: #eff6ff;\n  color: #2563eb;\n}\n.role-mentor[_ngcontent-%COMP%] {\n  background: #fef3e2;\n  color: #c2410c;\n}\n.role-partner[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  color: #7c3aed;\n}\n.org-email[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #8aaace;\n}\n/*# sourceMappingURL=pending-events.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PendingEventsComponent, { className: "PendingEventsComponent", filePath: "src\\app\\modules\\event\\pages\\pending-events\\pending-events.component.ts", lineNumber: 10 });
})();

// src/app/modules/event/event-routing.module.ts
var routes = [
  { path: "", component: EventListComponent },
  {
    path: "new",
    component: EventFormComponent,
    canActivate: [authGuard],
    data: { roles: ["ADMIN", "MENTOR", "PARTENAIRE"] }
  },
  {
    path: "speakers",
    component: SpeakerListComponent,
    canActivate: [authGuard],
    data: { roles: ["ADMIN", "MENTOR", "PARTENAIRE"] }
  },
  {
    path: "pending",
    component: PendingEventsComponent,
    canActivate: [authGuard],
    data: { role: "ADMIN" }
  },
  { path: ":id", component: EventDetailComponent },
  { path: ":id/edit", component: EventFormComponent }
];
var EventRoutingModule = class _EventRoutingModule {
  static \u0275fac = function EventRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EventRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};

// src/app/modules/event/components/speaker-card/speaker-card.component.ts
var SpeakerCardComponent = class _SpeakerCardComponent {
  static \u0275fac = function SpeakerCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpeakerCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpeakerCardComponent, selectors: [["app-speaker-card"]], decls: 2, vars: 0, template: function SpeakerCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "speaker-card works!");
      \u0275\u0275elementEnd();
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpeakerCardComponent, { className: "SpeakerCardComponent", filePath: "src\\app\\modules\\event\\components\\speaker-card\\speaker-card.component.ts", lineNumber: 8 });
})();

// src/app/modules/event/components/speaker-form/speaker-form.component.ts
var SpeakerFormComponent = class _SpeakerFormComponent {
  static \u0275fac = function SpeakerFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpeakerFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpeakerFormComponent, selectors: [["app-speaker-form"]], decls: 2, vars: 0, template: function SpeakerFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "speaker-form works!");
      \u0275\u0275elementEnd();
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpeakerFormComponent, { className: "SpeakerFormComponent", filePath: "src\\app\\modules\\event\\components\\speaker-form\\speaker-form.component.ts", lineNumber: 8 });
})();

// src/app/modules/event/components/program-slot/program-slot.component.ts
var ProgramSlotComponent = class _ProgramSlotComponent {
  static \u0275fac = function ProgramSlotComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProgramSlotComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProgramSlotComponent, selectors: [["app-program-slot"]], decls: 2, vars: 0, template: function ProgramSlotComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "program-slot works!");
      \u0275\u0275elementEnd();
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProgramSlotComponent, { className: "ProgramSlotComponent", filePath: "src\\app\\modules\\event\\components\\program-slot\\program-slot.component.ts", lineNumber: 8 });
})();

// src/app/modules/event/components/program-form/program-form.component.ts
var ProgramFormComponent = class _ProgramFormComponent {
  static \u0275fac = function ProgramFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProgramFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProgramFormComponent, selectors: [["app-program-form"]], decls: 2, vars: 0, template: function ProgramFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "program-form works!");
      \u0275\u0275elementEnd();
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProgramFormComponent, { className: "ProgramFormComponent", filePath: "src\\app\\modules\\event\\components\\program-form\\program-form.component.ts", lineNumber: 8 });
})();

// src/app/modules/event/components/registration-list/registration-list.component.ts
var RegistrationListComponent = class _RegistrationListComponent {
  static \u0275fac = function RegistrationListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegistrationListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegistrationListComponent, selectors: [["app-registration-list"]], decls: 2, vars: 0, template: function RegistrationListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "registration-list works!");
      \u0275\u0275elementEnd();
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegistrationListComponent, { className: "RegistrationListComponent", filePath: "src\\app\\modules\\event\\components\\registration-list\\registration-list.component.ts", lineNumber: 8 });
})();

// src/app/modules/event/event.module.ts
var EventModule = class _EventModule {
  static \u0275fac = function EventModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EventModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ] });
};
export {
  EventModule
};
//# sourceMappingURL=chunk-6M7K46V7.js.map
