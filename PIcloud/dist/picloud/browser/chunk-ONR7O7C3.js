import {
  CertificateService
} from "./chunk-7IY2EMT3.js";
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
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClient,
  NavigationEnd,
  NgClass,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  Router,
  RouterLink,
  RouterModule,
  SelectControlValueAccessor,
  Validators,
  __async,
  __spreadProps,
  __spreadValues,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
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

// src/app/modules/user/profile/profile.component.ts
function ProfileComponent_button_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "path", 18)(3, "polyline", 19)(4, "line", 27)(5, "line", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Mes dossiers juridiques\n");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.currentUrl.startsWith("/legal-procedures"));
  }
}
function ProfileComponent_button_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "path", 18)(3, "polyline", 19)(4, "line", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Dossiers \xE0 traiter\n");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.currentUrl.startsWith("/legal-procedures"));
  }
}
function ProfileComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 31);
    \u0275\u0275element(2, "path", 32)(3, "polyline", 33);
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
function ProfileComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 31);
    \u0275\u0275element(2, "circle", 35)(3, "line", 36)(4, "line", 37);
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
function ProfileComponent_section_38_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function ProfileComponent_section_38_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.enableEdit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 52);
    \u0275\u0275element(2, "path", 53)(3, "path", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Modifier ");
    \u0275\u0275elementEnd();
  }
}
function ProfileComponent_section_38_div_26_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 59);
  }
}
function ProfileComponent_section_38_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "button", 56);
    \u0275\u0275listener("click", function ProfileComponent_section_38_div_26_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancelEdit());
    });
    \u0275\u0275text(2, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 57);
    \u0275\u0275template(4, ProfileComponent_section_38_div_26_span_4_Template, 1, 0, "span", 58);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.profileForm.invalid || ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isLoading ? "Enregistrement..." : "Enregistrer", " ");
  }
}
function ProfileComponent_section_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "div", 38)(2, "div")(3, "div", 39);
    \u0275\u0275text(4, "Informations personnelles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 40);
    \u0275\u0275text(6, "Votre profil");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, ProfileComponent_section_38_button_7_Template, 5, 0, "button", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "form", 42);
    \u0275\u0275listener("ngSubmit", function ProfileComponent_section_38_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(9, "div", 43)(10, "div", 44)(11, "label");
    \u0275\u0275text(12, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 44)(15, "label");
    \u0275\u0275text(16, "Pr\xE9nom");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 47)(19, "label");
    \u0275\u0275text(20, "Adresse e-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 47)(23, "label");
    \u0275\u0275text(24, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 49);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(26, ProfileComponent_section_38_div_26_Template, 6, 3, "div", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", !ctx_r0.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.profileForm);
    \u0275\u0275advance(5);
    \u0275\u0275attribute("readonly", !ctx_r0.isEditing ? "" : null);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("readonly", !ctx_r0.isEditing ? "" : null);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("readonly", !ctx_r0.isEditing ? "" : null);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("readonly", !ctx_r0.isEditing ? "" : null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEditing);
  }
}
function ProfileComponent_section_39_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 59);
  }
}
function ProfileComponent_section_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "div", 38)(2, "div")(3, "div", 39);
    \u0275\u0275text(4, "S\xE9curit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 40);
    \u0275\u0275text(6, "Changer le mot de passe");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "form", 42);
    \u0275\u0275listener("ngSubmit", function ProfileComponent_section_39_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onChangePassword());
    });
    \u0275\u0275elementStart(8, "div", 43)(9, "div", 47)(10, "label");
    \u0275\u0275text(11, "Mot de passe actuel");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 47)(14, "label");
    \u0275\u0275text(15, "Nouveau mot de passe");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 61);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 55)(18, "button", 56);
    \u0275\u0275listener("click", function ProfileComponent_section_39_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.activeTab = "profile";
      return \u0275\u0275resetView(ctx_r0.showPasswordForm = false);
    });
    \u0275\u0275text(19, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 57);
    \u0275\u0275template(21, ProfileComponent_section_39_span_21_Template, 1, 0, "span", 58);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx_r0.passwordForm);
    \u0275\u0275advance(13);
    \u0275\u0275property("disabled", ctx_r0.passwordForm.invalid || ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isLoading ? "Modification..." : "Changer le mot de passe", " ");
  }
}
var ProfileComponent = class _ProfileComponent {
  fb;
  authService;
  userService;
  router;
  user = null;
  profileForm;
  passwordForm;
  isEditing = false;
  isLoading = false;
  successMessage = "";
  errorMessage = "";
  showPasswordForm = false;
  activeTab = "profile";
  currentUrl = "";
  // ← for sidebar active state
  constructor(fb, authService, userService, router) {
    this.fb = fb;
    this.authService = authService;
    this.userService = userService;
    this.router = router;
    this.profileForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      prenom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      statut: [""]
    });
    this.passwordForm = this.fb.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit() {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects;
      }
    });
    this.loadProfile();
  }
  loadProfile() {
    return __async(this, null, function* () {
      try {
        const userId = this.authService.getUserId();
        this.user = yield this.userService.getUserById(userId);
        this.profileForm.patchValue(this.user);
        this.profileForm.disable();
      } catch (error) {
        this.errorMessage = "Failed to load profile";
      }
    });
  }
  get initials() {
    if (!this.user)
      return "??";
    return `${this.user.name.charAt(0)}${this.user.prenom.charAt(0)}`.toUpperCase();
  }
  enableEdit() {
    this.isEditing = true;
    this.profileForm.enable();
    this.profileForm.get("id")?.disable();
    this.successMessage = "";
    this.errorMessage = "";
  }
  cancelEdit() {
    this.isEditing = false;
    this.profileForm.patchValue(this.user);
    this.profileForm.disable();
    this.successMessage = "";
    this.errorMessage = "";
  }
  // Only profile and password are real tabs — badges/certificates navigate away
  switchTab(tab) {
    this.activeTab = tab;
    this.showPasswordForm = tab === "password";
    this.successMessage = "";
    this.errorMessage = "";
    if (tab === "password" && this.isEditing) {
      this.cancelEdit();
    }
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.profileForm.invalid)
        return;
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";
      try {
        const userId = this.authService.getUserId();
        const payload = __spreadProps(__spreadValues({}, this.profileForm.getRawValue()), {
          role: this.user.role,
          dateInscription: this.user.dateInscription
        });
        const updatedUser = yield this.userService.updateUser(payload, userId);
        this.user = updatedUser;
        this.isEditing = false;
        this.profileForm.patchValue(updatedUser);
        this.profileForm.disable();
        this.successMessage = "Profil mis \xE0 jour avec succ\xE8s !";
      } catch (error) {
        this.errorMessage = error.error?.error || "\xC9chec de la mise \xE0 jour";
      } finally {
        this.isLoading = false;
      }
    });
  }
  getRoleLabel(role) {
    const labels = {
      USER: "\u{1F464} Utilisateur",
      ADMIN: "\u{1F6E1}\uFE0F Administrateur",
      MENTOR: "\u{1F393} Mentor",
      INVESTOR: "\u{1F4B0} Investisseur",
      PARTNER: "\u{1F91D} Partenaire",
      ENTREPRENEUR: "\u{1F680} Entrepreneur",
      EXPERT: "\u2696\uFE0F Expert juridique"
    };
    return labels[role ?? ""] ?? role ?? "\u2014";
  }
  onChangePassword() {
    return __async(this, null, function* () {
      if (this.passwordForm.invalid)
        return;
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";
      try {
        const userId = this.authService.getUserId();
        yield this.userService.changePassword(userId, this.passwordForm.value.oldPassword, this.passwordForm.value.newPassword);
        this.successMessage = "Mot de passe modifi\xE9 avec succ\xE8s !";
        this.passwordForm.reset();
        this.showPasswordForm = false;
        this.activeTab = "profile";
      } catch (error) {
        this.errorMessage = error.error?.error || "\xC9chec du changement de mot de passe";
      } finally {
        this.isLoading = false;
      }
    });
  }
  static \u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], decls: 40, vars: 33, consts: [[1, "profile-page"], [1, "profile-sidebar"], [1, "avatar-wrap"], [1, "avatar"], [1, "avatar-name"], [1, "avatar-email"], [1, "role-badge"], [1, "side-nav"], [1, "side-link", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "8", "r", "4"], ["d", "M4 20c0-4 3.6-7 8-7s8 3 8 7"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], ["routerLink", "/user/badges", 1, "side-link"], ["cx", "12", "cy", "8", "r", "6"], ["d", "M8.21 13.89L7 23l5-3 5 3-1.21-9.12"], ["routerLink", "/user/certificates", 1, "side-link"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["class", "side-link", "routerLink", "/legal-procedures/list", 3, "active", 4, "ngIf"], ["class", "side-link", "routerLink", "/legal-procedures/expert/assigned", 3, "active", 4, "ngIf"], [1, "profile-main"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], [4, "ngIf"], ["routerLink", "/legal-procedures/list", 1, "side-link"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], ["routerLink", "/legal-procedures/expert/assigned", 1, "side-link"], [1, "alert", "alert-success"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "alert", "alert-error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "section-head"], [1, "section-label"], [1, "section-title"], ["class", "btn-edit", 3, "click", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "fields-grid"], [1, "field-group"], ["type", "text", "formControlName", "name", 1, "field-input"], ["type", "text", "formControlName", "prenom", 1, "field-input"], [1, "field-group", "full"], ["type", "email", "formControlName", "email", 1, "field-input"], ["type", "text", "formControlName", "statut", 1, "field-input"], ["class", "form-actions", 4, "ngIf"], [1, "btn-edit", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], [1, "form-actions"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "submit", 1, "btn-save", 3, "disabled"], ["class", "spinner", 4, "ngIf"], [1, "spinner"], ["type", "password", "formControlName", "oldPassword", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "field-input"], ["type", "password", "formControlName", "newPassword", "placeholder", "Minimum 6 caract\xE8res", 1, "field-input"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div")(6, "div", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "span", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "nav", 7)(13, "button", 8);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_13_listener() {
        return ctx.switchTab("profile");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(14, "svg", 9);
      \u0275\u0275element(15, "circle", 10)(16, "path", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " Profil\n");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(18, "button", 8);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_18_listener() {
        return ctx.switchTab("password");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(19, "svg", 9);
      \u0275\u0275element(20, "rect", 12)(21, "path", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275text(22, " Mot de passe\n");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(23, "button", 14);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(24, "svg", 9);
      \u0275\u0275element(25, "circle", 15)(26, "path", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275text(27, " Mes Badges\n");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(28, "button", 17);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(29, "svg", 9);
      \u0275\u0275element(30, "path", 18)(31, "polyline", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275text(32, " Mes Certificats\n");
      \u0275\u0275elementEnd();
      \u0275\u0275template(33, ProfileComponent_button_33_Template, 7, 2, "button", 20)(34, ProfileComponent_button_34_Template, 6, 2, "button", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(35, "main", 22);
      \u0275\u0275template(36, ProfileComponent_div_36_Template, 5, 1, "div", 23)(37, ProfileComponent_div_37_Template, 6, 1, "div", 24)(38, ProfileComponent_section_38_Template, 27, 7, "section", 25)(39, ProfileComponent_section_39_Template, 23, 4, "section", 25);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.initials);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.user == null ? null : ctx.user.name, " ", ctx.user == null ? null : ctx.user.prenom, "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.user == null ? null : ctx.user.email);
      \u0275\u0275advance();
      \u0275\u0275classProp("role-admin", (ctx.user == null ? null : ctx.user.role) === "ADMIN")("role-user", (ctx.user == null ? null : ctx.user.role) === "USER")("role-mentor", (ctx.user == null ? null : ctx.user.role) === "MENTOR")("role-investor", (ctx.user == null ? null : ctx.user.role) === "INVESTOR")("role-partner", (ctx.user == null ? null : ctx.user.role) === "PARTNER")("role-entrepreneur", (ctx.user == null ? null : ctx.user.role) === "ENTREPRENEUR")("role-expert", (ctx.user == null ? null : ctx.user.role) === "EXPERT");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("> ", ctx.user == null ? null : ctx.user.role, " ");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab === "profile");
      \u0275\u0275advance(5);
      \u0275\u0275classProp("active", ctx.activeTab === "password");
      \u0275\u0275advance(5);
      \u0275\u0275classProp("active", ctx.currentUrl === "/user/badges");
      \u0275\u0275advance(5);
      \u0275\u0275classProp("active", ctx.currentUrl === "/user/certificates");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.authService.isEntrepreneur());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.authService.isExpert());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab === "profile");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab === "password");
    }
  }, dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n.profile-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #f0f6ff;\n  display: grid;\n  grid-template-columns: 260px 1fr;\n  gap: 0;\n  font-family: "Inter", sans-serif;\n  padding-top: 56px;\n}\n.profile-sidebar[_ngcontent-%COMP%] {\n  background: #fff;\n  border-right: 1px solid #dbeafe;\n  padding: 2rem 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  min-height: calc(100vh - 56px);\n}\n.avatar-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding-bottom: 1.25rem;\n  border-bottom: 1px solid #e8f0fe;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a6e,\n      #2563eb);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.avatar-name[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #1e3a6e;\n  line-height: 1.3;\n}\n.avatar-email[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #8aaace;\n  margin-top: 1px;\n}\n.role-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  padding: 4px 10px;\n  border-radius: 6px;\n  width: fit-content;\n}\n.role-admin[_ngcontent-%COMP%] {\n  background: #fef3e2;\n  color: #c2410c;\n}\n.role-user[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #1d4ed8;\n}\n.role-mentor[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #047857;\n}\n.role-partner[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  color: #6d28d9;\n}\n.role-entrepreneur[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #c2410c;\n}\n.role-expert[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n}\n.side-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin-top: 0.5rem;\n}\n.side-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #5a7396;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 9px 12px;\n  border-radius: 8px;\n  text-align: left;\n  font-family: "Inter", sans-serif;\n  transition: color 0.15s, background 0.15s;\n  width: 100%;\n}\n.side-link[_ngcontent-%COMP%]:hover {\n  color: #1e3a6e;\n  background: #f0f7ff;\n}\n.side-link.active[_ngcontent-%COMP%] {\n  color: #1e3a6e;\n  background: #eff6ff;\n  font-weight: 600;\n}\n.profile-main[_ngcontent-%COMP%] {\n  padding: 2.5rem 3rem;\n  max-width: 680px;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  padding: 10px 14px;\n  border-radius: 8px;\n  margin-bottom: 1.5rem;\n  border: 1px solid;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border-color: #fecaca;\n}\n.section-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n}\n.section-label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin-bottom: 4px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -0.02em;\n  margin: 0;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: #1e3a6e;\n  background: #fff;\n  border: 1px solid #c7d9f5;\n  padding: 7px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s, border-color 0.15s;\n  flex-shrink: 0;\n}\n.btn-edit[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n  border-color: #93c5fd;\n}\n.fields-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field-group.full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  color: #4b6890;\n  letter-spacing: 0.01em;\n}\n.field-input[_ngcontent-%COMP%] {\n  height: 40px;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 8px;\n  padding: 0 12px;\n  font-size: 13.5px;\n  color: #1e3a6e;\n  font-family: "Inter", sans-serif;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n  width: 100%;\n  box-sizing: border-box;\n}\n.field-input[readonly][_ngcontent-%COMP%] {\n  background: #f8faff;\n  color: #5a7396;\n  cursor: default;\n}\n.field-input[_ngcontent-%COMP%]::placeholder {\n  color: #b0c4de;\n}\n.field-input[_ngcontent-%COMP%]:not([readonly]):focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #5a7396;\n  background: #fff;\n  border: 1px solid #dbeafe;\n  padding: 9px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff;\n}\n.btn-save[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #fff;\n  background: #1e3a6e;\n  border: none;\n  padding: 9px 22px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s, transform 0.1s;\n}\n.btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #16305c;\n  transform: translateY(-1px);\n}\n.btn-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .profile-page[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .profile-sidebar[_ngcontent-%COMP%] {\n    min-height: auto;\n    border-right: none;\n    border-bottom: 1px solid #dbeafe;\n  }\n  .profile-main[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    max-width: 100%;\n  }\n  .fields-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-group.full[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n}\n/*# sourceMappingURL=profile.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src\\app\\modules\\user\\profile\\profile.component.ts", lineNumber: 13 });
})();

// src/app/core/models/user.model.ts
var Role;
(function(Role2) {
  Role2["USER"] = "USER";
  Role2["ADMIN"] = "ADMIN";
  Role2["MENTOR"] = "MENTOR";
  Role2["INVESTOR"] = "INVESTOR";
  Role2["PARTNER"] = "PARTNER";
  Role2["ENTREPRENEUR"] = "ENTREPRENEUR";
  Role2["EXPERT"] = "EXPERT";
})(Role || (Role = {}));

// src/app/modules/user/user-list/user-list.component.ts
function UserListComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "path", 23)(3, "polyline", 24);
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
function UserListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "circle", 26)(3, "line", 27)(4, "line", 28);
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
function UserListComponent_option_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    \u0275\u0275property("value", r_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r2);
  }
}
function UserListComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "span", 31);
    \u0275\u0275text(2, " Chargement\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_27_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 38)(3, "div", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 40);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 41);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "span", 42);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275element(13, "span", 43);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td")(16, "div", 44)(17, "button", 45);
    \u0275\u0275listener("click", function UserListComponent_div_27_tr_15_Template_button_click_17_listener() {
      const u_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToEdit(u_r4.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 46);
    \u0275\u0275element(19, "path", 47)(20, "path", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Mise \xE0 jour ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "button", 49);
    \u0275\u0275listener("click", function UserListComponent_div_27_tr_15_Template_button_click_22_listener() {
      const u_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deleteUser(u_r4.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 46);
    \u0275\u0275element(24, "polyline", 50)(25, "path", 51)(26, "path", 52);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const u_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", u_r4.name.charAt(0), "", u_r4.prenom.charAt(0), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", u_r4.name, " ", u_r4.prenom, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r4.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r0.badgeClass(u_r4.role));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r4.role);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("on", u_r4.statut === "active");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", u_r4.statut || "\u2014", " ");
  }
}
function UserListComponent_div_27_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 53);
    \u0275\u0275text(2, "Aucun utilisateur trouv\xE9");
    \u0275\u0275elementEnd()();
  }
}
function UserListComponent_div_27_div_20_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function UserListComponent_div_27_div_20_button_4_Template_button_click_0_listener() {
      const p_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.goToPage(p_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", p_r7 === ctx_r0.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r7);
  }
}
function UserListComponent_div_27_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "button", 55);
    \u0275\u0275listener("click", function UserListComponent_div_27_div_20_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.currentPage - 1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 46);
    \u0275\u0275element(3, "polyline", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, UserListComponent_div_27_div_20_button_4_Template, 2, 3, "button", 57);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "button", 55);
    \u0275\u0275listener("click", function UserListComponent_div_27_div_20_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.currentPage + 1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 46);
    \u0275\u0275element(7, "polyline", 58);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.pageNumbers);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.currentPage === ctx_r0.totalPages);
  }
}
function UserListComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "table")(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Utilisateur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "R\xF4le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, UserListComponent_div_27_tr_15_Template, 27, 10, "tr", 33)(16, UserListComponent_div_27_tr_16_Template, 3, 0, "tr", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 35)(18, "span", 36);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, UserListComponent_div_27_div_20_Template, 8, 3, "div", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r0.paginatedUsers);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.paginatedUsers.length === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.paginatedUsers.length, " / ", ctx_r0.filteredUsers.length, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.totalPages > 1);
  }
}
var UserListComponent = class _UserListComponent {
  userService;
  router;
  users = [];
  filteredUsers = [];
  searchTerm = "";
  selectedRole = "";
  isLoading = false;
  errorMessage = "";
  successMessage = "";
  roles = Object.values(Role);
  currentPage = 1;
  pageSize = 8;
  constructor(userService, router) {
    this.userService = userService;
    this.router = router;
  }
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    return __async(this, null, function* () {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        this.users = yield this.userService.getAllUsers();
        this.applyFilter();
      } catch {
        this.errorMessage = "Impossible de charger les utilisateurs.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  applyFilter() {
    const t = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter((u) => {
      const matchText = (u.name ?? "").toLowerCase().includes(t) || (u.prenom ?? "").toLowerCase().includes(t) || (u.email ?? "").toLowerCase().includes(t);
      const matchRole = !this.selectedRole || u.role === this.selectedRole;
      return matchText && matchRole;
    });
    this.currentPage = 1;
  }
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }
  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  goToPage(p) {
    this.currentPage = p;
  }
  goToCreate() {
    this.router.navigate(["/user/form"]);
  }
  goToEdit(id) {
    if (id == null)
      return;
    this.router.navigate(["/user/form", id]);
  }
  deleteUser(id) {
    return __async(this, null, function* () {
      if (id == null)
        return;
      if (!confirm("Supprimer cet utilisateur ?"))
        return;
      try {
        yield this.userService.deleteUser(id);
        this.users = this.users.filter((u) => u.id !== id);
        this.applyFilter();
        this.flash("Utilisateur supprim\xE9 avec succ\xE8s.");
      } catch {
        this.errorMessage = "\xC9chec de la suppression.";
      }
    });
  }
  flash(msg) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = "", 4e3);
  }
  badgeClass(role) {
    const map = {
      ADMIN: "badge-admin",
      USER: "badge-user",
      MENTOR: "badge-mentor",
      INVESTOR: "badge-investor",
      PARTNER: "badge-partner",
      ENTREPRENEUR: "badge-entrepreneur",
      // NOUVEAU
      EXPERT: "badge-expert"
      // NOUVEAU
    };
    return map[String(role ?? "")] ?? "badge-user";
  }
  static \u0275fac = function UserListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserListComponent)(\u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserListComponent, selectors: [["app-user-list"]], decls: 28, vars: 9, consts: [[1, "ul-page"], [1, "ul-header"], [1, "ul-eyebrow"], [1, "ul-title"], [1, "ul-sub"], [1, "btn-primary", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["class", "alert success", 4, "ngIf"], ["class", "alert error", 4, "ngIf"], [1, "ul-filters"], [1, "search-box"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Rechercher par nom ou e-mail\u2026", 3, "ngModelChange", "input", "ngModel"], [3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "loading-row", 4, "ngIf"], ["class", "table-card", 4, "ngIf"], [1, "alert", "success"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "alert", "error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [3, "value"], [1, "loading-row"], [1, "ring"], [1, "table-card"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "tfoot"], [1, "tfoot-info"], ["class", "pager", 4, "ngIf"], [1, "user-cell"], [1, "avatar"], [1, "uname"], [1, "td-email"], [1, "badge", 3, "ngClass"], [1, "dot"], [1, "action-btns"], ["title", "Modifier", 1, "btn-edit", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], ["title", "Supprimer", 1, "btn-del", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"], ["d", "M10 11v6M14 11v6M9 6V4h6v2"], ["colspan", "5", 1, "empty"], [1, "pager"], [3, "click", "disabled"], ["points", "15 18 9 12 15 6"], [3, "active", "click", 4, "ngFor", "ngForOf"], ["points", "9 18 15 12 9 6"], [3, "click"]], template: function UserListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "p", 2);
      \u0275\u0275text(4, "Administration");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 3);
      \u0275\u0275text(6, "Gestion des utilisateurs");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 5);
      \u0275\u0275listener("click", function UserListComponent_Template_button_click_9_listener() {
        return ctx.goToCreate();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(10, "svg", 6);
      \u0275\u0275element(11, "line", 7)(12, "line", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275text(13, " Cr\xE9er un utilisateur ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(14, UserListComponent_div_14_Template, 5, 1, "div", 9)(15, UserListComponent_div_15_Template, 6, 1, "div", 10);
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(16, "div", 11)(17, "div", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(18, "svg", 13);
      \u0275\u0275element(19, "circle", 14)(20, "line", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(21, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_input_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function UserListComponent_Template_input_input_21_listener() {
        return ctx.applyFilter();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "select", 17);
      \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_select_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedRole, $event) || (ctx.selectedRole = $event);
        return $event;
      });
      \u0275\u0275listener("change", function UserListComponent_Template_select_change_22_listener() {
        return ctx.applyFilter();
      });
      \u0275\u0275elementStart(23, "option", 18);
      \u0275\u0275text(24, "Tous les r\xF4les");
      \u0275\u0275elementEnd();
      \u0275\u0275template(25, UserListComponent_option_25_Template, 2, 2, "option", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(26, UserListComponent_div_26_Template, 3, 0, "div", 20)(27, UserListComponent_div_27_Template, 21, 5, "div", 21);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate2("", ctx.filteredUsers.length, " utilisateur", ctx.filteredUsers.length !== 1 ? "s" : "", "");
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedRole);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.roles);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.ul-page[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 6rem 1.5rem 4rem;\n  min-height: 100vh;\n  color: #111;\n}\n.ul-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-bottom: 1.75rem;\n}\n.ul-eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: .09em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin: 0 0 .4rem;\n}\n.ul-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: clamp(1.55rem, 3vw, 2.1rem);\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -.025em;\n  margin: 0 0 .2rem;\n}\n.ul-sub[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #8aaace;\n  margin: 0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  background: #1e3a6e;\n  color: #fff;\n  font-family: "Inter", sans-serif;\n  font-size: 13.5px;\n  font-weight: 500;\n  padding: 10px 20px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background .15s, transform .1s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #16305c;\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  padding: 10px 14px;\n  border-radius: 8px;\n  margin-bottom: 1.2rem;\n}\n.alert.success[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #059669;\n  border: 1px solid #a7f3d0;\n}\n.alert.error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.ul-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-bottom: 1.1rem;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n  min-width: 200px;\n  padding: 8px 12px;\n  border: 1px solid #c7d9f5;\n  border-radius: 8px;\n  background: #fff;\n  transition: border-color .15s;\n}\n.search-box[_ngcontent-%COMP%]:focus-within {\n  border-color: #2563eb;\n}\n.search-box[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #8aaace;\n  flex-shrink: 0;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  outline: none;\n  width: 100%;\n  font-size: 13px;\n  font-family: "Inter", sans-serif;\n  color: #1e3a6e;\n  background: transparent;\n}\n.ul-filters[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #c7d9f5;\n  border-radius: 8px;\n  font-size: 13px;\n  font-family: "Inter", sans-serif;\n  color: #1e3a6e;\n  background: #fff;\n  outline: none;\n  cursor: pointer;\n  transition: border-color .15s;\n}\n.ul-filters[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n}\n.loading-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: #8aaace;\n  font-size: 13.5px;\n  padding: 3rem 0;\n}\n.ring[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid #dbeafe;\n  border-top-color: #2563eb;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .7s linear infinite;\n}\n.table-card[_ngcontent-%COMP%] {\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  overflow: hidden;\n  background: #fff;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\nthead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: #f8faff;\n  border-bottom: 1px solid #dbeafe;\n}\nth[_ngcontent-%COMP%] {\n  padding: 11px 16px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .07em;\n  color: #8aaace;\n  text-align: left;\n}\ntbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f0f7ff;\n  transition: background .12s;\n}\ntbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\ntbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8faff;\n}\ntd[_ngcontent-%COMP%] {\n  padding: 13px 16px;\n  font-size: 13px;\n  color: #374151;\n  vertical-align: middle;\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #eef4ff,\n      #dbeafe);\n  color: #2563eb;\n  font-size: 11px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-transform: uppercase;\n  flex-shrink: 0;\n}\n.uname[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1e3a6e;\n}\n.email[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 12.5px;\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 3px 9px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: .03em;\n  text-transform: uppercase;\n}\n.badge-admin[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #2563eb;\n}\n.badge-user[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #059669;\n}\n.badge-mentor[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  color: #d97706;\n}\n.badge-investor[_ngcontent-%COMP%] {\n  background: #fef3e2;\n  color: #f97316;\n}\n.badge-partner[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  color: #7c3aed;\n}\n.badge-entrepreneur[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #c2410c;\n}\n.badge-expert[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #15803d;\n}\n.dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #d1d5db;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n.dot.on[_ngcontent-%COMP%] {\n  background: #10b981;\n}\n.btn-del[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 7px;\n  border: 1px solid #fecaca;\n  background: #fef2f2;\n  color: #dc2626;\n  cursor: pointer;\n  transition: background .15s;\n}\n.btn-del[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n}\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #8aaace;\n  padding: 3rem 0;\n  font-size: 13.5px;\n}\n.tfoot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 10px;\n  padding: 11px 16px;\n  border-top: 1px solid #dbeafe;\n  background: #f8faff;\n}\n.tfoot-info[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8aaace;\n}\n.pager[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 30px;\n  height: 30px;\n  padding: 0 6px;\n  border-radius: 7px;\n  border: 1px solid #dbeafe;\n  background: #fff;\n  color: #1e3a6e;\n  font-size: 12.5px;\n  font-family: "Inter", sans-serif;\n  cursor: pointer;\n  transition: all .12s;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #eff6ff;\n  border-color: #93c5fd;\n}\n.pager[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: .35;\n  cursor: default;\n}\n.pager[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #1e3a6e;\n  border-color: #1e3a6e;\n  color: #fff;\n}\n.backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(30, 58, 110, .3);\n  backdrop-filter: blur(3px);\n  z-index: 200;\n  animation: _ngcontent-%COMP%_fadeIn .15s ease;\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: min(540px, calc(100vw - 2rem));\n  max-height: 90vh;\n  overflow-y: auto;\n  background: #fff;\n  border-radius: 16px;\n  border: 1px solid #dbeafe;\n  box-shadow: 0 24px 64px rgba(30, 58, 110, .18);\n  padding: 2rem;\n  z-index: 201;\n  animation: _ngcontent-%COMP%_slideUp .2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translate(-50%, -46%);\n  }\n  to {\n    opacity: 1;\n    transform: translate(-50%, -50%);\n  }\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.modal-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -.02em;\n  margin: 0;\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: 1px solid #dbeafe;\n  background: #f8faff;\n  color: #8aaace;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all .12s;\n  flex-shrink: 0;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n  border-color: #fecaca;\n  color: #dc2626;\n}\n.row-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.fg[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  margin-bottom: 16px;\n}\n.fg[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: #5a7396;\n  text-transform: uppercase;\n  letter-spacing: .06em;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  border: 1px solid #c7d9f5;\n  border-radius: 8px;\n  font-size: 13.5px;\n  font-family: "Inter", sans-serif;\n  color: #1e3a6e;\n  background: #fff;\n  outline: none;\n  width: 100%;\n  transition: border-color .15s, box-shadow .15s;\n  appearance: none;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.fg[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, .09);\n}\n.fg[_ngcontent-%COMP%]   input.err[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   select.err[_ngcontent-%COMP%] {\n  border-color: #fca5a5;\n  background: #fff8f8;\n}\n.sel-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.sel-wrap[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding-right: 32px;\n  cursor: pointer;\n}\n.sel-wrap[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 11px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #8aaace;\n  pointer-events: none;\n}\n.ferr[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #dc2626;\n}\n.modal-foot[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-top: 16px;\n  margin-top: 4px;\n  border-top: 1px solid #f0f7ff;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  padding: 9px 18px;\n  border-radius: 8px;\n  border: 1px solid #c7d9f5;\n  background: #fff;\n  color: #5a7396;\n  font-size: 13px;\n  font-family: "Inter", sans-serif;\n  cursor: pointer;\n  transition: background .12s;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff;\n  border-color: #93c5fd;\n}\n.spin[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  border: 2px solid rgba(255, 255, 255, .35);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .6s linear infinite;\n}\n@media (max-width: 640px) {\n  .ul-page[_ngcontent-%COMP%] {\n    padding-top: 5rem;\n  }\n  .ul-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .row-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(4), \n   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(4) {\n    display: none;\n  }\n}\n/*# sourceMappingURL=user-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserListComponent, { className: "UserListComponent", filePath: "src\\app\\modules\\user\\user-list\\user-list.component.ts", lineNumber: 11 });
})();

// src/app/modules/user/set-password/set-password.component.ts
function SetPasswordComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function SetPasswordComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, " Password must be at least 6 characters ");
    \u0275\u0275elementEnd();
  }
}
function SetPasswordComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, " Passwords do not match ");
    \u0275\u0275elementEnd();
  }
}
var SetPasswordComponent = class _SetPasswordComponent {
  fb;
  authService;
  userService;
  router;
  passwordForm;
  errorMessage = "";
  isLoading = false;
  constructor(fb, authService, userService, router) {
    this.fb = fb;
    this.authService = authService;
    this.userService = userService;
    this.router = router;
    this.passwordForm = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form) {
    const password = form.get("password")?.value;
    const confirm2 = form.get("confirmPassword")?.value;
    return password === confirm2 ? null : { passwordMismatch: true };
  }
  get password() {
    return this.passwordForm.get("password");
  }
  get confirmPassword() {
    return this.passwordForm.get("confirmPassword");
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.passwordForm.invalid)
        return;
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const userId = this.authService.getUserId();
        yield this.userService.setPassword(userId, this.passwordForm.value.password);
        this.router.navigate(["/user/profile"]);
      } catch (error) {
        this.errorMessage = error.error?.error || "Failed to set password";
      } finally {
        this.isLoading = false;
      }
    });
  }
  static \u0275fac = function SetPasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SetPasswordComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SetPasswordComponent, selectors: [["app-set-password"]], decls: 21, vars: 10, consts: [[1, "auth-container"], [1, "auth-card"], [1, "auth-header"], ["class", "error-message", 4, "ngIf"], [1, "auth-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["type", "password", "placeholder", "Create a password", "formControlName", "password", 1, "form-input"], ["class", "field-error", 4, "ngIf"], ["type", "password", "placeholder", "Confirm your password", "formControlName", "confirmPassword", 1, "form-input"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "error-message"], [1, "field-error"]], template: function SetPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Set Your Password");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Create a password for your account");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, SetPasswordComponent_div_7_Template, 2, 1, "div", 3);
      \u0275\u0275elementStart(8, "form", 4);
      \u0275\u0275listener("ngSubmit", function SetPasswordComponent_Template_form_ngSubmit_8_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(9, "div", 5)(10, "label");
      \u0275\u0275text(11, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "input", 6);
      \u0275\u0275template(13, SetPasswordComponent_span_13_Template, 2, 0, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 5)(15, "label");
      \u0275\u0275text(16, "Confirm Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 8);
      \u0275\u0275template(18, SetPasswordComponent_span_18_Template, 2, 0, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 9);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.passwordForm);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("input-error", (ctx.password == null ? null : ctx.password.invalid) && (ctx.password == null ? null : ctx.password.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (ctx.password == null ? null : ctx.password.invalid) && (ctx.password == null ? null : ctx.password.touched));
      \u0275\u0275advance(4);
      \u0275\u0275classProp("input-error", ctx.passwordForm.hasError("passwordMismatch") && (ctx.confirmPassword == null ? null : ctx.confirmPassword.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.passwordForm.hasError("passwordMismatch") && (ctx.confirmPassword == null ? null : ctx.confirmPassword.touched));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.passwordForm.invalid || ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isLoading ? "Setting password..." : "Set Password", " ");
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SetPasswordComponent, { className: "SetPasswordComponent", filePath: "src\\app\\modules\\user\\set-password\\set-password.component.ts", lineNumber: 12 });
})();

// src/app/modules/user/form-user/form-user.component.ts
function FormUserComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275element(2, "div", 14)(3, "div", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "div", 15)(5, "div", 15)(6, "div", 16);
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_15_Template(rf, ctx) {
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
function FormUserComponent_div_16_Template(rf, ctx) {
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
function FormUserComponent_div_17_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " Le nom est requis ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " Minimum 2 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " Le pr\xE9nom est requis ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_span_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " Minimum 2 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_span_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " L'e-mail est requis ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_span_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " Adresse e-mail invalide ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_span_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1, "(laisser vide pour ne pas modifier)");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_span_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " Le mot de passe est requis ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_span_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " Minimum 6 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_option_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r3 = ctx.$implicit;
    \u0275\u0275property("value", r_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r3);
  }
}
function FormUserComponent_div_17_span_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, " Le r\xF4le est requis ");
    \u0275\u0275elementEnd();
  }
}
function FormUserComponent_div_17_div_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "label", 65);
    \u0275\u0275text(2, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 2);
    \u0275\u0275element(5, "circle", 21)(6, "polyline", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "select", 67)(8, "option", 68);
    \u0275\u0275text(9, "Actif");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 69);
    \u0275\u0275text(11, "Inactif");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 54);
    \u0275\u0275element(13, "polyline", 55);
    \u0275\u0275elementEnd()()();
  }
}
function FormUserComponent_div_17_span_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 70);
  }
}
function FormUserComponent_div_17__svg_svg_73__svg_path_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 76);
  }
}
function FormUserComponent_div_17__svg_svg_73__svg_polyline_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "polyline", 77);
  }
}
function FormUserComponent_div_17__svg_svg_73__svg_polyline_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "polyline", 78);
  }
}
function FormUserComponent_div_17__svg_svg_73__svg_line_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 79);
  }
}
function FormUserComponent_div_17__svg_svg_73__svg_line_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 80);
  }
}
function FormUserComponent_div_17__svg_svg_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 2);
    \u0275\u0275template(1, FormUserComponent_div_17__svg_svg_73__svg_path_1_Template, 1, 0, "path", 71)(2, FormUserComponent_div_17__svg_svg_73__svg_polyline_2_Template, 1, 0, "polyline", 72)(3, FormUserComponent_div_17__svg_svg_73__svg_polyline_3_Template, 1, 0, "polyline", 73)(4, FormUserComponent_div_17__svg_svg_73__svg_line_4_Template, 1, 0, "line", 74)(5, FormUserComponent_div_17__svg_svg_73__svg_line_5_Template, 1, 0, "line", 75);
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
function FormUserComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "form", 25);
    \u0275\u0275listener("ngSubmit", function FormUserComponent_div_17_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(2, "div", 26)(3, "h3", 27)(4, "span", 28);
    \u0275\u0275text(5, "01");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Identit\xE9 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 29)(8, "div", 30)(9, "label", 31);
    \u0275\u0275text(10, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 32);
    \u0275\u0275template(12, FormUserComponent_div_17_span_12_Template, 2, 0, "span", 33)(13, FormUserComponent_div_17_span_13_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 30)(15, "label", 34);
    \u0275\u0275text(16, "Pr\xE9nom");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 35);
    \u0275\u0275template(18, FormUserComponent_div_17_span_18_Template, 2, 0, "span", 33)(19, FormUserComponent_div_17_span_19_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 26)(21, "h3", 27)(22, "span", 28);
    \u0275\u0275text(23, "02");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Compte ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 30)(26, "label", 36);
    \u0275\u0275text(27, "Adresse e-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 37);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(29, "svg", 2);
    \u0275\u0275element(30, "path", 38)(31, "polyline", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(32, "input", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, FormUserComponent_div_17_span_33_Template, 2, 0, "span", 33)(34, FormUserComponent_div_17_span_34_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 30)(36, "label", 41);
    \u0275\u0275text(37, " Mot de passe ");
    \u0275\u0275template(38, FormUserComponent_div_17_span_38_Template, 2, 0, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 37);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(40, "svg", 2);
    \u0275\u0275element(41, "rect", 43)(42, "path", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(43, "input", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275template(44, FormUserComponent_div_17_span_44_Template, 2, 0, "span", 33)(45, FormUserComponent_div_17_span_45_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 26)(47, "h3", 27)(48, "span", 28);
    \u0275\u0275text(49, "03");
    \u0275\u0275elementEnd();
    \u0275\u0275text(50, " R\xF4le & Statut ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 29)(52, "div", 30)(53, "label", 46);
    \u0275\u0275text(54, "R\xF4le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(56, "svg", 2);
    \u0275\u0275element(57, "path", 48)(58, "circle", 49)(59, "path", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(60, "select", 51)(61, "option", 52);
    \u0275\u0275text(62, "Choisir un r\xF4le\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(63, FormUserComponent_div_17_option_63_Template, 2, 2, "option", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(64, "svg", 54);
    \u0275\u0275element(65, "polyline", 55);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(66, FormUserComponent_div_17_span_66_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275template(67, FormUserComponent_div_17_div_67_Template, 14, 0, "div", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(68, "div", 57)(69, "button", 58);
    \u0275\u0275listener("click", function FormUserComponent_div_17_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goBack());
    });
    \u0275\u0275text(70, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "button", 59);
    \u0275\u0275template(72, FormUserComponent_div_17_span_72_Template, 1, 0, "span", 60)(73, FormUserComponent_div_17__svg_svg_73_Template, 6, 5, "svg", 61);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(10);
    \u0275\u0275classProp("err", ctx_r0.f["name"].invalid && ctx_r0.f["name"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["name"].touched && ctx_r0.f["name"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["name"].touched && ctx_r0.f["name"].hasError("minlength"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("err", ctx_r0.f["prenom"].invalid && ctx_r0.f["prenom"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["prenom"].touched && ctx_r0.f["prenom"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["prenom"].touched && ctx_r0.f["prenom"].hasError("minlength"));
    \u0275\u0275advance(13);
    \u0275\u0275classProp("err", ctx_r0.f["email"].invalid && ctx_r0.f["email"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["email"].touched && ctx_r0.f["email"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["email"].touched && ctx_r0.f["email"].hasError("email"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.isEditMode);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("err", ctx_r0.f["password"].invalid && ctx_r0.f["password"].touched);
    \u0275\u0275property("placeholder", ctx_r0.isEditMode ? "Nouveau mot de passe (optionnel)" : "Minimum 6 caract\xE8res");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["password"].touched && ctx_r0.f["password"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["password"].touched && ctx_r0.f["password"].hasError("minlength"));
    \u0275\u0275advance(15);
    \u0275\u0275classProp("err", ctx_r0.f["role"].invalid && ctx_r0.f["role"].touched);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.roles);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.f["role"].touched && ctx_r0.f["role"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isEditMode);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSubmitting ? ctx_r0.isEditMode ? "Enregistrement\u2026" : "Cr\xE9ation\u2026" : ctx_r0.isEditMode ? "Enregistrer les modifications" : "Cr\xE9er l'utilisateur", " ");
  }
}
var FormUserComponent = class _FormUserComponent {
  fb;
  userService;
  authService;
  route;
  router;
  form;
  isEditMode = false;
  editUserId = null;
  isLoading = false;
  // loading existing user in edit mode
  isSubmitting = false;
  errorMessage = "";
  successMessage = "";
  roles = Object.values(Role);
  constructor(fb, userService, authService, route, router) {
    this.fb = fb;
    this.userService = userService;
    this.authService = authService;
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.editUserId = Number(id);
      this.loadUser(this.editUserId);
    }
  }
  // ── form ────────────────────────────────────────────────────────
  buildForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      prenom: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      role: ["", Validators.required],
      statut: ["active"]
    });
  }
  // shortcut: f['name'].invalid etc.
  get f() {
    return this.form.controls;
  }
  // ── load user for edit ──────────────────────────────────────────
  loadUser(id) {
    return __async(this, null, function* () {
      this.isLoading = true;
      try {
        const user = yield this.userService.getUserById(id);
        this.form.patchValue({
          name: user.name,
          prenom: user.prenom,
          email: user.email,
          role: user.role,
          statut: user.statut
        });
        this.form.get("password").clearValidators();
        this.form.get("password").updateValueAndValidity();
      } catch {
        this.errorMessage = "Impossible de charger les donn\xE9es de l'utilisateur.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  // ── submit ──────────────────────────────────────────────────────
  onSubmit() {
    return __async(this, null, function* () {
      this.form.markAllAsTouched();
      if (this.form.invalid)
        return;
      this.isSubmitting = true;
      this.errorMessage = "";
      try {
        if (this.isEditMode && this.editUserId !== null) {
          const payload = {
            id: this.editUserId,
            name: this.form.value.name,
            prenom: this.form.value.prenom,
            email: this.form.value.email,
            role: this.form.value.role,
            statut: this.form.value.statut,
            dateInscription: ""
          };
          yield this.userService.updateUser(payload, this.authService.getUserId());
          this.successMessage = "Utilisateur mis \xE0 jour avec succ\xE8s !";
        } else {
          const payload = {
            name: this.form.value.name,
            prenom: this.form.value.prenom,
            email: this.form.value.email,
            password: this.form.value.password,
            role: this.form.value.role
          };
          yield this.userService.createUser(payload);
          this.successMessage = "Utilisateur cr\xE9\xE9 avec succ\xE8s !";
        }
        setTimeout(() => this.router.navigate(["/user/list"]), 1500);
      } catch (err) {
        this.errorMessage = err?.error?.error || err?.error?.message || "Une erreur est survenue.";
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  goBack() {
    this.router.navigate(["/user/list"]);
  }
  static \u0275fac = function FormUserComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormUserComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormUserComponent, selectors: [["app-form-user"]], decls: 18, vars: 6, consts: [[1, "fu-page"], ["type", "button", 1, "back-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "15 18 9 12 15 6"], [1, "fu-header"], [1, "fu-eyebrow"], [1, "fu-title"], [1, "fu-sub"], ["class", "skeleton-card", 4, "ngIf"], ["class", "alert success", 4, "ngIf"], ["class", "alert error", 4, "ngIf"], ["class", "fu-card", 4, "ngIf"], [1, "skeleton-card"], [1, "sk-row"], [1, "sk-block"], [1, "sk-block", "full"], [1, "sk-block", "short"], [1, "alert", "success"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "alert", "error"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "fu-card"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "section-title"], [1, "section-num"], [1, "row-2"], [1, "fg"], ["for", "fu-name"], ["id", "fu-name", "type", "text", "formControlName", "name", "placeholder", "Ex : Dupont"], ["class", "ferr", 4, "ngIf"], ["for", "fu-prenom"], ["id", "fu-prenom", "type", "text", "formControlName", "prenom", "placeholder", "Ex : Jean"], ["for", "fu-email"], [1, "input-wrap"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], ["id", "fu-email", "type", "email", "formControlName", "email", "placeholder", "jean.dupont@example.com"], ["for", "fu-password"], ["class", "label-hint", 4, "ngIf"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], ["id", "fu-password", "type", "password", "formControlName", "password", 3, "placeholder"], ["for", "fu-role"], [1, "sel-wrap"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"], ["id", "fu-role", "formControlName", "role"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "chevron"], ["points", "6 9 12 15 18 9"], ["class", "fg", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn-ghost", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "spin", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], [1, "ferr"], [1, "label-hint"], [3, "value"], ["for", "fu-statut"], ["points", "12 6 12 12 16 14"], ["id", "fu-statut", "formControlName", "statut"], ["value", "active"], ["value", "inactive"], [1, "spin"], ["d", "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z", 4, "ngIf"], ["points", "17 21 17 13 7 13 7 21", 4, "ngIf"], ["points", "7 3 7 8 15 8", 4, "ngIf"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19", 4, "ngIf"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12", 4, "ngIf"], ["d", "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z"], ["points", "17 21 17 13 7 13 7 21"], ["points", "7 3 7 8 15 8"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"]], template: function FormUserComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "form-user works!");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 0)(3, "button", 1);
      \u0275\u0275listener("click", function FormUserComponent_Template_button_click_3_listener() {
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
      \u0275\u0275template(14, FormUserComponent_div_14_Template, 7, 0, "div", 8)(15, FormUserComponent_div_15_Template, 5, 1, "div", 9)(16, FormUserComponent_div_16_Template, 6, 1, "div", 10)(17, FormUserComponent_div_17_Template, 75, 29, "div", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Modifier l'utilisateur" : "Cr\xE9er un utilisateur", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Modifiez les informations ci-dessous puis enregistrez." : "Remplissez le formulaire pour ajouter un nouvel utilisateur.", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.fu-page[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  max-width: 700px;\n  margin: 0 auto;\n  padding: 6rem 1.5rem 4rem;\n  color: #111;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  color: #8aaace;\n  font-family: "Inter", sans-serif;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  padding: 0;\n  margin-bottom: 1.75rem;\n  transition: color .15s;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  color: #1e3a6e;\n}\n.fu-eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: .09em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin: 0 0 .4rem;\n}\n.fu-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: clamp(1.55rem, 3vw, 2.1rem);\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -.025em;\n  margin: 0 0 .4rem;\n}\n.fu-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #8aaace;\n  margin: 0 0 2rem;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.sk-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.sk-block[_ngcontent-%COMP%] {\n  height: 42px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      90deg,\n      #f0f7ff 25%,\n      #e2ecfb 50%,\n      #f0f7ff 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite;\n}\n.sk-block.full[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.sk-block.short[_ngcontent-%COMP%] {\n  width: 140px;\n  height: 36px;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  to {\n    background-position: -200% 0;\n  }\n}\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  padding: 10px 14px;\n  border-radius: 8px;\n  margin-bottom: 1.25rem;\n}\n.alert.success[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #059669;\n  border: 1px solid #a7f3d0;\n}\n.alert.error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.fu-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 16px;\n  overflow: hidden;\n}\n.form-section[_ngcontent-%COMP%] {\n  padding: 1.75rem 2rem;\n  border-bottom: 1px solid #f0f7ff;\n}\n.form-section[_ngcontent-%COMP%]:last-of-type {\n  border-bottom: none;\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 14px;\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -.01em;\n  margin: 0 0 1.25rem;\n}\n.section-num[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 10px;\n  font-weight: 700;\n  font-family: "Inter", sans-serif;\n  flex-shrink: 0;\n}\n.row-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.fg[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  margin-bottom: 16px;\n}\n.fg[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.fg[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11.5px;\n  font-weight: 600;\n  color: #5a7396;\n  text-transform: uppercase;\n  letter-spacing: .06em;\n}\n.label-hint[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 400;\n  color: #a0b4c8;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-wrap[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 11px;\n  color: #8aaace;\n  pointer-events: none;\n  flex-shrink: 0;\n}\n.input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 34px;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #c7d9f5;\n  border-radius: 8px;\n  font-size: 13.5px;\n  font-family: "Inter", sans-serif;\n  color: #1e3a6e;\n  background: #fff;\n  outline: none;\n  transition: border-color .15s, box-shadow .15s;\n  appearance: none;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #b8cce0;\n}\n.fg[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.fg[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, .09);\n}\n.fg[_ngcontent-%COMP%]   input.err[_ngcontent-%COMP%], \n.fg[_ngcontent-%COMP%]   select.err[_ngcontent-%COMP%] {\n  border-color: #fca5a5;\n  background: #fff8f8;\n}\n.fg[_ngcontent-%COMP%]   input.err[_ngcontent-%COMP%]:focus, \n.fg[_ngcontent-%COMP%]   select.err[_ngcontent-%COMP%]:focus {\n  border-color: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, .08);\n}\n.sel-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.sel-wrap[_ngcontent-%COMP%]    > svg[_ngcontent-%COMP%]:first-child {\n  position: absolute;\n  left: 11px;\n  color: #8aaace;\n  pointer-events: none;\n}\n.sel-wrap[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding-left: 34px;\n  padding-right: 32px;\n  cursor: pointer;\n}\n.sel-wrap[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 11px;\n  color: #8aaace;\n  pointer-events: none;\n}\n.ferr[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #dc2626;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 10px;\n  padding: 1.25rem 2rem;\n  background: #f8faff;\n  border-top: 1px solid #dbeafe;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  padding: 9px 20px;\n  border-radius: 8px;\n  border: 1px solid #c7d9f5;\n  background: #fff;\n  color: #5a7396;\n  font-size: 13px;\n  font-family: "Inter", sans-serif;\n  cursor: pointer;\n  transition: background .12s, border-color .12s;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f0f7ff;\n  border-color: #93c5fd;\n}\n.btn-ghost[_ngcontent-%COMP%]:disabled {\n  opacity: .45;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 10px 22px;\n  border-radius: 8px;\n  border: none;\n  background: #1e3a6e;\n  color: #fff;\n  font-size: 13.5px;\n  font-weight: 500;\n  font-family: "Inter", sans-serif;\n  cursor: pointer;\n  transition: background .15s, transform .1s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #16305c;\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n  transform: none;\n}\n.spin[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 13px;\n  height: 13px;\n  border: 2px solid rgba(255, 255, 255, .3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .6s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 600px) {\n  .fu-page[_ngcontent-%COMP%] {\n    padding-top: 5rem;\n  }\n  .row-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-section[_ngcontent-%COMP%] {\n    padding: 1.25rem 1.25rem;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    padding: 1rem 1.25rem;\n    flex-direction: column-reverse;\n  }\n  .btn-ghost[_ngcontent-%COMP%], \n   .btn-primary[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=form-user.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormUserComponent, { className: "FormUserComponent", filePath: "src\\app\\modules\\user\\form-user\\form-user.component.ts", lineNumber: 13 });
})();

// src/app/services/badge.service.ts
var BadgeService = class _BadgeService {
  http;
  api = "http://localhost:8090/api/badges";
  constructor(http) {
    this.http = http;
  }
  getMyBadges() {
    return this.http.get(`${this.api}/me`);
  }
  getUserBadges(userId) {
    return this.http.get(`${this.api}/user/${userId}`);
  }
  getBadgeImageUrl(badgeId) {
    return `http://localhost:8090/api/badges/${badgeId}/image`;
  }
  static \u0275fac = function BadgeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BadgeService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BadgeService, factory: _BadgeService.\u0275fac, providedIn: "root" });
};

// src/app/modules/user/pages/my-badges/my-badges.component.ts
function MyBadgesComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement de vos badges...");
    \u0275\u0275elementEnd()();
  }
}
function MyBadgesComponent_div_9_Template(rf, ctx) {
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
function MyBadgesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275text(2, "\u{1F396}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucun badge pour l'instant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Participez \xE0 des \xE9v\xE9nements et faites-vous checker pour obtenir vos premiers badges.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 15);
    \u0275\u0275text(8, "Voir les \xE9v\xE9nements");
    \u0275\u0275elementEnd()();
  }
}
function MyBadgesComponent_div_11_div_1_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1, " S\xE9rie : ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const badge_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(badge_r2.seriesTag);
  }
}
function MyBadgesComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "span", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 21)(5, "div", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 24);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 25);
    \u0275\u0275element(11, "rect", 26)(12, "line", 27)(13, "line", 28)(14, "line", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, MyBadgesComponent_div_11_div_1_div_16_Template, 4, 1, "div", 30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const badge_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r0.getBadgeColor(badge_r2.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getBadgeIcon(badge_r2.type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(badge_r2.label);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r0.getBadgeColor(badge_r2.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", badge_r2.type.replace("_", " "), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(badge_r2.earnedAt), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", badge_r2.seriesTag);
  }
}
function MyBadgesComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275template(1, MyBadgesComponent_div_11_div_1_Template, 17, 9, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.badges);
  }
}
function MyBadgesComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r0.badges.length, " badge", ctx_r0.badges.length > 1 ? "s" : "", " obtenu", ctx_r0.badges.length > 1 ? "s" : "", "");
  }
}
var MyBadgesComponent = class _MyBadgesComponent {
  badgeService;
  badges = [];
  loading = false;
  error = "";
  constructor(badgeService) {
    this.badgeService = badgeService;
  }
  ngOnInit() {
    this.loading = true;
    this.badgeService.getMyBadges().subscribe({
      next: (data) => {
        this.badges = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Impossible de charger vos badges.";
        this.loading = false;
      }
    });
  }
  getBadgeIcon(type) {
    const icons = {
      PARTICIPATION: "\u{1F3AF}",
      SERIE_COMPLETION: "\u{1F3C6}",
      LEAN_STARTUP_PRACTITIONER: "\u{1F680}",
      INNOVATION_CHAMPION: "\u{1F4A1}",
      NETWORKING_PRO: "\u{1F91D}"
    };
    return icons[type] ?? "\u{1F396}\uFE0F";
  }
  getBadgeColor(type) {
    const colors = {
      PARTICIPATION: "#1e3a6e",
      SERIE_COMPLETION: "#c9a02a",
      LEAN_STARTUP_PRACTITIONER: "#16a34a",
      INNOVATION_CHAMPION: "#7c3aed",
      NETWORKING_PRO: "#0891b2"
    };
    return colors[type] ?? "#64748b";
  }
  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("fr-TN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }
  static \u0275fac = function MyBadgesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MyBadgesComponent)(\u0275\u0275directiveInject(BadgeService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyBadgesComponent, selectors: [["app-my-badges"]], decls: 13, vars: 5, consts: [[1, "badges-page"], [1, "page-header"], [1, "section-label"], [1, "section-title"], [1, "section-sub"], ["class", "loading-wrap", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "badges-grid", 4, "ngIf"], ["class", "badges-summary", 4, "ngIf"], [1, "loading-wrap"], [1, "spinner-lg"], [1, "alert", "alert-error"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/events", 1, "btn-primary"], [1, "badges-grid"], ["class", "badge-card", 4, "ngFor", "ngForOf"], [1, "badge-card"], [1, "badge-circle"], [1, "badge-icon"], [1, "badge-info"], [1, "badge-label"], [1, "badge-type-chip"], [1, "badge-date"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["class", "badge-series", 4, "ngIf"], [1, "badge-series"], [1, "badges-summary"]], template: function MyBadgesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3, "Mes r\xE9compenses");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h2", 3);
      \u0275\u0275text(5, "Mes Badges");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Vos badges obtenus apr\xE8s participation aux \xE9v\xE9nements PIcloud.");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, MyBadgesComponent_div_8_Template, 4, 0, "div", 5)(9, MyBadgesComponent_div_9_Template, 2, 1, "div", 6)(10, MyBadgesComponent_div_10_Template, 9, 0, "div", 7)(11, MyBadgesComponent_div_11_Template, 2, 1, "div", 8)(12, MyBadgesComponent_div_12_Template, 3, 3, "div", 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.badges.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.badges.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.badges.length > 0);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink], styles: ["\n\n.badges-page[_ngcontent-%COMP%] {\n  padding: 32px;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.section-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #c9a02a;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: 4px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: #0d1b2a;\n  margin: 0 0 6px;\n}\n.section-sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n  margin: 0;\n}\n.loading-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 60px;\n  color: #64748b;\n}\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid #e2e8f0;\n  border-top-color: #1e3a6e;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border-radius: 8px;\n  padding: 12px 16px;\n  font-size: 14px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #64748b;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #0d1b2a;\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-bottom: 24px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #1e3a6e;\n  color: #fff;\n  padding: 10px 20px;\n  border-radius: 8px;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #0d1b2a;\n}\n.badges-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 20px;\n}\n.badge-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 16px;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 14px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.badge-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n}\n.badge-circle[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.badge-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.badge-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 100%;\n}\n.badge-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #0d1b2a;\n  line-height: 1.4;\n}\n.badge-type-chip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n}\n.badge-series[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n}\n.badges-summary[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  text-align: center;\n  font-size: 13px;\n  color: #94a3b8;\n}\n/*# sourceMappingURL=my-badges.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyBadgesComponent, { className: "MyBadgesComponent", filePath: "src\\app\\modules\\user\\pages\\my-badges\\my-badges.component.ts", lineNumber: 10 });
})();

// src/app/modules/user/pages/my-certificates/my-certificates.component.ts
function MyCertificatesComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "div", 10);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Chargement de vos certificats...");
    \u0275\u0275elementEnd()();
  }
}
function MyCertificatesComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function MyCertificatesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275text(2, "\u{1F4C4}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Aucun certificat pour l'instant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Vos certificats apparaissent ici apr\xE8s validation de votre pr\xE9sence \xE0 un \xE9v\xE9nement.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 14);
    \u0275\u0275text(8, "Voir les \xE9v\xE9nements");
    \u0275\u0275elementEnd()();
  }
}
function MyCertificatesComponent_div_11_div_1_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 34);
  }
}
function MyCertificatesComponent_div_11_div_1__svg_svg_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 31);
    \u0275\u0275element(1, "path", 35)(2, "polyline", 36)(3, "line", 37);
    \u0275\u0275elementEnd();
  }
}
function MyCertificatesComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275text(2, "\u{1F4DC}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19)(4, "div", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 21)(7, "span");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 22);
    \u0275\u0275element(9, "circle", 23)(10, "polyline", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 25);
    \u0275\u0275text(15, " ID : ");
    \u0275\u0275elementStart(16, "code");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 26)(19, "button", 27);
    \u0275\u0275listener("click", function MyCertificatesComponent_div_11_div_1_Template_button_click_19_listener() {
      const cert_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.download(cert_r3));
    });
    \u0275\u0275template(20, MyCertificatesComponent_div_11_div_1_span_20_Template, 1, 0, "span", 28)(21, MyCertificatesComponent_div_11_div_1__svg_svg_21_Template, 4, 0, "svg", 29);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 30);
    \u0275\u0275listener("click", function MyCertificatesComponent_div_11_div_1_Template_button_click_23_listener() {
      const cert_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyVerifyLink(cert_r3.verificationToken));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 31);
    \u0275\u0275element(25, "rect", 32)(26, "path", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(27, " Copier le lien ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cert_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(cert_r3.eventTitle);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(cert_r3.eventDate), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\xC9mis le ", ctx_r0.formatDate(cert_r3.generatedAt), "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", cert_r3.verificationToken.substring(0, 8).toUpperCase(), "...");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.downloading === cert_r3.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.downloading === cert_r3.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.downloading !== cert_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.downloading === cert_r3.id ? "T\xE9l\xE9chargement..." : "PDF", " ");
  }
}
function MyCertificatesComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275template(1, MyCertificatesComponent_div_11_div_1_Template, 28, 8, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.certificates);
  }
}
var MyCertificatesComponent = class _MyCertificatesComponent {
  certificateService;
  certificates = [];
  loading = false;
  downloading = null;
  error = "";
  constructor(certificateService) {
    this.certificateService = certificateService;
  }
  ngOnInit() {
    this.loading = true;
    this.certificateService.getMyCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Impossible de charger vos certificats.";
        this.loading = false;
      }
    });
  }
  download(cert) {
    this.downloading = cert.id;
    this.certificateService.downloadCertificate(cert.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificat-${cert.eventTitle.replace(/\s+/g, "-")}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.downloading = null;
      },
      error: () => {
        this.downloading = null;
      }
    });
  }
  copyVerifyLink(token) {
    const url = `${window.location.origin}/verify/${token}`;
    navigator.clipboard.writeText(url);
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "\u2014";
    return new Date(dateStr).toLocaleDateString("fr-TN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }
  static \u0275fac = function MyCertificatesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MyCertificatesComponent)(\u0275\u0275directiveInject(CertificateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyCertificatesComponent, selectors: [["app-my-certificates"]], decls: 12, vars: 4, consts: [[1, "certs-page"], [1, "page-header"], [1, "section-label"], [1, "section-title"], [1, "section-sub"], ["class", "loading-wrap", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "certs-list", 4, "ngIf"], [1, "loading-wrap"], [1, "spinner-lg"], [1, "alert", "alert-error"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/events", 1, "btn-primary"], [1, "certs-list"], ["class", "cert-card", 4, "ngFor", "ngForOf"], [1, "cert-card"], [1, "cert-icon"], [1, "cert-info"], [1, "cert-event"], [1, "cert-meta"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "cert-token"], [1, "cert-actions"], [1, "btn-download", 3, "click", "disabled"], ["class", "spinner-sm", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], ["title", "Copier le lien de v\xE9rification", 1, "btn-copy", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "9", "y", "9", "width", "13", "height", "13", "rx", "2"], ["d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"], [1, "spinner-sm"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"]], template: function MyCertificatesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3, "Mes documents");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h2", 3);
      \u0275\u0275text(5, "Mes Certificats");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "T\xE9l\xE9chargez vos certificats PDF ou partagez le lien de v\xE9rification.");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, MyCertificatesComponent_div_8_Template, 4, 0, "div", 5)(9, MyCertificatesComponent_div_9_Template, 2, 1, "div", 6)(10, MyCertificatesComponent_div_10_Template, 9, 0, "div", 7)(11, MyCertificatesComponent_div_11_Template, 2, 1, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.certificates.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.certificates.length > 0);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink], styles: ["\n\n.certs-page[_ngcontent-%COMP%] {\n  padding: 32px;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.section-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #c9a02a;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: 4px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: #0d1b2a;\n  margin: 0 0 6px;\n}\n.section-sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n  margin: 0;\n}\n.loading-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 60px;\n  color: #64748b;\n}\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid #e2e8f0;\n  border-top-color: #1e3a6e;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #b91c1c;\n  border-radius: 8px;\n  padding: 12px 16px;\n  font-size: 14px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #64748b;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #0d1b2a;\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-bottom: 24px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #1e3a6e;\n  color: #fff;\n  padding: 10px 20px;\n  border-radius: 8px;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 500;\n}\n.certs-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.cert-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 20px 24px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  transition: box-shadow 0.2s;\n}\n.cert-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);\n}\n.cert-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  flex-shrink: 0;\n}\n.cert-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.cert-event[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: #0d1b2a;\n  margin-bottom: 6px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.cert-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  font-size: 12px;\n  color: #94a3b8;\n  margin-bottom: 4px;\n}\n.cert-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.cert-token[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #94a3b8;\n}\n.cert-token[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  padding: 1px 6px;\n  border-radius: 4px;\n  font-family: monospace;\n}\n.cert-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.btn-download[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: #1e3a6e;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n  white-space: nowrap;\n}\n.btn-download[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #0d1b2a;\n}\n.btn-download[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-copy[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: #f1f5f9;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 8px 14px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.2s;\n  white-space: nowrap;\n}\n.btn-copy[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n/*# sourceMappingURL=my-certificates.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyCertificatesComponent, { className: "MyCertificatesComponent", filePath: "src\\app\\modules\\user\\pages\\my-certificates\\my-certificates.component.ts", lineNumber: 10 });
})();

// src/app/modules/user/user-routing.module.ts
var routes = [
  { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
  { path: "set-password", component: SetPasswordComponent },
  { path: "badges", component: MyBadgesComponent },
  { path: "certificates", component: MyCertificatesComponent },
  {
    path: "list",
    component: UserListComponent,
    canActivate: [authGuard],
    data: { role: "ADMIN" }
  },
  {
    // create mode  →  /user/form
    path: "form",
    component: FormUserComponent,
    canActivate: [authGuard],
    data: { role: "ADMIN" }
  },
  {
    // edit mode  →  /user/form/42
    path: "form/:id",
    component: FormUserComponent,
    canActivate: [authGuard],
    data: { role: "ADMIN" }
  },
  { path: "", redirectTo: "profile", pathMatch: "full" }
];
var UserRoutingModule = class _UserRoutingModule {
  static \u0275fac = function UserRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UserRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};

// src/app/modules/user/user.module.ts
var UserModule = class _UserModule {
  static \u0275fac = function UserModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UserModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ] });
};
export {
  UserModule
};
//# sourceMappingURL=chunk-ONR7O7C3.js.map
