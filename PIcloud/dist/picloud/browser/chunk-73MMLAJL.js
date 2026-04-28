import {
  ActivatedRoute,
  AuthService,
  CommonModule,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  HttpClient,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgSelectOption,
  ReactiveFormsModule,
  Router,
  RouterLink,
  RouterModule,
  SelectControlValueAccessor,
  Validators,
  __async,
  __objRest,
  __spreadProps,
  __spreadValues,
  firstValueFrom,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-HBGQ7VAX.js";

// src/app/modules/auth/login/login.component.ts
function LoginComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 30);
    \u0275\u0275element(2, "circle", 31)(3, "line", 32)(4, "line", 33);
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
function LoginComponent_span_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, " Adresse e-mail invalide ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, " Minimum 6 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Se connecter");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275element(1, "span", 36);
    \u0275\u0275text(2, " Connexion... ");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  fb;
  authService;
  router;
  loginForm;
  errorMessage = "";
  isLoading = false;
  constructor(fb, authService, router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/user/profile"]);
    }
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.loginForm.invalid)
        return;
      this.isLoading = true;
      this.errorMessage = "";
      try {
        yield this.authService.login(this.loginForm.value);
        this.router.navigate(["/user/profile"]);
      } catch (error) {
        this.errorMessage = error.error?.error || "Login failed. Please try again.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  loginWithGoogle() {
    window.location.href = "http://localhost:8090/oauth2/authorization/google";
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 62, vars: 11, consts: [[1, "auth-page"], [1, "auth-left"], [1, "brand"], [1, "brand-dot"], [1, "brand-name"], [1, "auth-left-content"], [1, "left-tag"], [1, "left-title"], [1, "left-stats"], [1, "lst"], [1, "auth-right"], [1, "auth-card"], [1, "auth-header"], ["class", "error-box", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["type", "email", "placeholder", "vous@example.com", "formControlName", "email", 1, "form-input"], ["class", "field-error", 4, "ngIf"], [1, "label-row"], ["routerLink", "/auth/forgot-password", 1, "forgot-link"], ["type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "formControlName", "password", 1, "form-input"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "btn-loading", 4, "ngIf"], [1, "divider"], ["type", "button", 1, "btn-google", 3, "click"], ["src", "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg", "alt", "Google", "width", "16", "height", "16"], [1, "auth-redirect"], ["routerLink", "/auth/register", 1, "link-accent"], [1, "error-box"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "field-error"], [1, "btn-loading"], [1, "spinner"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "span", 3);
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5, "PIcloud");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6);
      \u0275\u0275text(8, "\xC9cosyst\xE8me startup \xB7 Tunisie");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h2", 7);
      \u0275\u0275text(10, "Connectez-vous \xE0 l'\xE9cosyst\xE8me entrepreneurial tunisien");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "strong");
      \u0275\u0275text(14, "500+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span");
      \u0275\u0275text(16, "Startups");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9)(18, "strong");
      \u0275\u0275text(19, "120+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span");
      \u0275\u0275text(21, "Mentors");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 9)(23, "strong");
      \u0275\u0275text(24, "80+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span");
      \u0275\u0275text(26, "Investisseurs");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(27, "div", 10)(28, "div", 11)(29, "div", 12)(30, "h1");
      \u0275\u0275text(31, "Bon retour");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p");
      \u0275\u0275text(33, "Connectez-vous \xE0 votre compte");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(34, LoginComponent_div_34_Template, 6, 1, "div", 13);
      \u0275\u0275elementStart(35, "form", 14);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_35_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(36, "div", 15)(37, "label");
      \u0275\u0275text(38, "Adresse e-mail");
      \u0275\u0275elementEnd();
      \u0275\u0275element(39, "input", 16);
      \u0275\u0275template(40, LoginComponent_span_40_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 15)(42, "div", 18)(43, "label");
      \u0275\u0275text(44, "Mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "a", 19);
      \u0275\u0275text(46, "Mot de passe oubli\xE9 ?");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(47, "input", 20);
      \u0275\u0275template(48, LoginComponent_span_48_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 21);
      \u0275\u0275template(50, LoginComponent_span_50_Template, 2, 0, "span", 22)(51, LoginComponent_span_51_Template, 3, 0, "span", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 24)(53, "span");
      \u0275\u0275text(54, "ou");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "button", 25);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_55_listener() {
        return ctx.loginWithGoogle();
      });
      \u0275\u0275element(56, "img", 26);
      \u0275\u0275text(57, " Continuer avec Google ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "p", 27);
      \u0275\u0275text(59, "Pas encore de compte ? ");
      \u0275\u0275elementStart(60, "a", 28);
      \u0275\u0275text(61, "Cr\xE9er un compte");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(34);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("input-error", (ctx.email == null ? null : ctx.email.invalid) && (ctx.email == null ? null : ctx.email.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (ctx.email == null ? null : ctx.email.invalid) && (ctx.email == null ? null : ctx.email.touched));
      \u0275\u0275advance(7);
      \u0275\u0275classProp("input-error", (ctx.password == null ? null : ctx.password.invalid) && (ctx.password == null ? null : ctx.password.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (ctx.password == null ? null : ctx.password.invalid) && (ctx.password == null ? null : ctx.password.touched));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
    }
  }, dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  font-family: "Inter", sans-serif;\n}\n.auth-left[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      145deg,\n      #1e3a6e 0%,\n      #1e4d8c 100%);\n  padding: 2.5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.brand-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #f97316;\n}\n.brand-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: #fff;\n  letter-spacing: -0.01em;\n}\n.auth-left-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 2rem 0;\n}\n.left-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin-bottom: 1.25rem;\n}\n.left-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: clamp(1.4rem, 2.5vw, 1.9rem);\n  font-weight: 700;\n  color: #fff;\n  line-height: 1.25;\n  letter-spacing: -0.02em;\n  margin: 0 0 2.5rem;\n  max-width: 340px;\n}\n.left-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2rem;\n  flex-wrap: wrap;\n}\n.lst[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.lst[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #fff;\n  line-height: 1;\n}\n.lst[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: rgba(255, 255, 255, 0.4);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.auth-right[_ngcontent-%COMP%] {\n  background: #f8faff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 380px;\n}\n.auth-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -0.02em;\n  margin: 0 0 6px;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  color: #7a9abf;\n  margin: 0;\n}\n.error-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #fef2f2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  padding: 10px 14px;\n  font-size: 13px;\n  margin-bottom: 1.25rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.1rem;\n}\n.label-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 6px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12.5px;\n  font-weight: 500;\n  color: #1e3a6e;\n  margin-bottom: 6px;\n}\n.label-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.forgot-link[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #f97316;\n  text-decoration: none;\n  font-weight: 500;\n}\n.forgot-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #fff;\n  border: 1px solid #c7d9f5;\n  border-radius: 8px;\n  padding: 0 12px;\n  font-size: 13.5px;\n  color: #1e3a6e;\n  font-family: "Inter", sans-serif;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: #b0c4de;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-input.input-error[_ngcontent-%COMP%] {\n  border-color: #f87171;\n  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);\n}\n.field-error[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #dc2626;\n  margin-top: 4px;\n  display: block;\n}\n.btn-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #1e3a6e;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 13.5px;\n  font-weight: 500;\n  font-family: "Inter", sans-serif;\n  cursor: pointer;\n  margin-top: 0.5rem;\n  transition: background 0.15s, transform 0.1s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #16305c;\n  transform: translateY(-1px);\n}\n.btn-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 1.25rem 0;\n  color: #b0c4de;\n  font-size: 12px;\n}\n.divider[_ngcontent-%COMP%]::before, \n.divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #dbeafe;\n}\n.btn-google[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #fff;\n  border: 1px solid #c7d9f5;\n  border-radius: 8px;\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #1e3a6e;\n  font-family: "Inter", sans-serif;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  transition: border-color 0.15s, background 0.15s;\n}\n.btn-google[_ngcontent-%COMP%]:hover {\n  border-color: #93c5fd;\n  background: #f0f7ff;\n}\n.auth-redirect[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 13px;\n  color: #7a9abf;\n  margin-top: 1.5rem;\n}\n.link-accent[_ngcontent-%COMP%] {\n  color: #f97316;\n  font-weight: 500;\n  text-decoration: none;\n}\n.link-accent[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n@media (max-width: 768px) {\n  .auth-page[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .auth-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .auth-right[_ngcontent-%COMP%] {\n    padding: 2rem 1.5rem;\n    background: #fff;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\modules\\auth\\login\\login.component.ts", lineNumber: 11 });
})();

// src/app/modules/auth/register/register.component.ts
function RegisterComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function RegisterComponent_option_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    \u0275\u0275property("value", r_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r2.label, " ");
  }
}
var RegisterComponent = class _RegisterComponent {
  fb;
  authService;
  router;
  registerForm;
  errorMessage = "";
  isLoading = false;
  // Rôles disponibles à l'inscription
  availableRoles = [
    { value: "", label: "Simple utilisateur (d\xE9couverte)" },
    { value: "ENTREPRENEUR", label: "\u{1F680} Entrepreneur" },
    { value: "MENTOR", label: "\u{1F393} Mentor" },
    { value: "INVESTOR", label: "\u{1F4B0} Investisseur" },
    { value: "PARTNER", label: "\u{1F91D} Partenaire" },
    { value: "EXPERT", label: "\u2696\uFE0F Expert juridique" }
  ];
  constructor(fb, authService, router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/user/profile"]);
    }
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      prenom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
      role: [null]
      // optionnel
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form) {
    const password = form.get("password")?.value;
    const confirm = form.get("confirmPassword")?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
  get name() {
    return this.registerForm.get("name");
  }
  get prenom() {
    return this.registerForm.get("prenom");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.registerForm.invalid)
        return;
      this.isLoading = true;
      this.errorMessage = "";
      const _a = this.registerForm.value, { confirmPassword, role } = _a, rest = __objRest(_a, ["confirmPassword", "role"]);
      try {
        yield this.authService.register(__spreadProps(__spreadValues({}, rest), { role: role || null }));
        this.router.navigate(["/user/profile"]);
      } catch (err) {
        this.errorMessage = err?.error?.error || "Erreur lors de l'inscription.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 79, vars: 3, consts: [[1, "auth-page"], [1, "auth-left"], [1, "brand"], [1, "brand-dot"], [1, "brand-name"], [1, "auth-left-content"], [1, "left-tag"], [1, "left-title"], [1, "left-perks"], [1, "perk-icon", 2, "background", "#fef3e2", "color", "#f97316"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M12 2L2 7l10 5 10-5-10-5z"], ["d", "M2 17l10 5 10-5M2 12l10 5 10-5"], [1, "perk-icon", 2, "background", "#ecfdf5", "color", "#059669"], ["cx", "12", "cy", "8", "r", "4"], ["d", "M4 20c0-4 3.6-7 8-7s8 3 8 7"], [1, "perk-icon", 2, "background", "#eff6ff", "color", "#2563eb"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], [1, "perk-icon", 2, "background", "#f5f3ff", "color", "#7c3aed"], ["x1", "12", "y1", "1", "x2", "12", "y2", "23"], ["d", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"], [1, "auth-right"], [1, "auth-card"], [1, "auth-header"], ["class", "error-box", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "form-group"], ["type", "text", "formControlName", "name", 1, "form-input"], ["type", "text", "formControlName", "prenom", 1, "form-input"], ["type", "email", "formControlName", "email", 1, "form-input"], ["type", "password", "formControlName", "password", 1, "form-input"], ["type", "password", "formControlName", "confirmPassword", 1, "form-input"], ["formControlName", "role", 1, "form-input"], [3, "value", 4, "ngFor", "ngForOf"], [1, "btn-submit"], [1, "auth-redirect"], ["routerLink", "/auth/login", 1, "link-accent"], [1, "error-box"], [3, "value"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "span", 3);
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5, "PIcloud");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6);
      \u0275\u0275text(8, "Rejoignez l'\xE9cosyst\xE8me");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h2", 7);
      \u0275\u0275text(10, " Cr\xE9ez votre compte et acc\xE9l\xE9rez votre startup ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "ul", 8)(12, "li")(13, "span", 9);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(14, "svg", 10);
      \u0275\u0275element(15, "path", 11)(16, "path", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(17, " Acc\xE8s instantan\xE9 \xE0 500+ startups ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(18, "li")(19, "span", 13);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(20, "svg", 10);
      \u0275\u0275element(21, "circle", 14)(22, "path", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(23, " Matching avec des mentors experts ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(24, "li")(25, "span", 16);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(26, "svg", 10);
      \u0275\u0275element(27, "rect", 17)(28, "line", 18)(29, "line", 19)(30, "line", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(31, " 200+ \xE9v\xE9nements par an ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(32, "li")(33, "span", 21);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(34, "svg", 10);
      \u0275\u0275element(35, "line", 22)(36, "path", 23);
      \u0275\u0275elementEnd()();
      \u0275\u0275text(37, " Acc\xE8s aux opportunit\xE9s de financement ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(38, "div", 24)(39, "div", 25)(40, "div", 26)(41, "h1");
      \u0275\u0275text(42, "Cr\xE9er un compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "p");
      \u0275\u0275text(44, "Rejoignez l'\xE9cosyst\xE8me startup tunisien");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(45, RegisterComponent_div_45_Template, 2, 1, "div", 27);
      \u0275\u0275elementStart(46, "form", 28);
      \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_46_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(47, "div", 29)(48, "div", 30)(49, "label");
      \u0275\u0275text(50, "Nom");
      \u0275\u0275elementEnd();
      \u0275\u0275element(51, "input", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 30)(53, "label");
      \u0275\u0275text(54, "Pr\xE9nom");
      \u0275\u0275elementEnd();
      \u0275\u0275element(55, "input", 32);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 30)(57, "label");
      \u0275\u0275text(58, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(59, "input", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 30)(61, "label");
      \u0275\u0275text(62, "Mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275element(63, "input", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 30)(65, "label");
      \u0275\u0275text(66, "Confirmer mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275element(67, "input", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "div", 30)(69, "label");
      \u0275\u0275text(70, "Votre profil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "select", 36);
      \u0275\u0275template(72, RegisterComponent_option_72_Template, 2, 2, "option", 37);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "button", 38);
      \u0275\u0275text(74, " Cr\xE9er mon compte ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "p", 39);
      \u0275\u0275text(76, " D\xE9j\xE0 un compte ? ");
      \u0275\u0275elementStart(77, "a", 40);
      \u0275\u0275text(78, " Se connecter ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(45);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.registerForm);
      \u0275\u0275advance(26);
      \u0275\u0275property("ngForOf", ctx.availableRoles);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap";\n\n\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 40% 60%;\n  font-family: "Inter", sans-serif;\n}\n.auth-left[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      145deg,\n      #1e3a6e 0%,\n      #1e4d8c 100%);\n  padding: 40px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.brand[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 30px;\n  left: 40px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.brand-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #f97316;\n}\n.brand-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: white;\n}\n.auth-left-content[_ngcontent-%COMP%] {\n  max-width: 380px;\n}\n.left-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin-bottom: 14px;\n}\n.left-title[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 26px;\n  color: white;\n  line-height: 1.3;\n  margin-bottom: 30px;\n}\n.left-perks[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.left-perks[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 13px;\n  color: rgba(255, 255, 255, .8);\n}\n.perk-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 7px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.auth-right[_ngcontent-%COMP%] {\n  background: #f8faff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque";\n  font-size: 26px;\n  color: #1e3a6e;\n  margin-bottom: 5px;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7a9abf;\n  margin-bottom: 25px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #1e3a6e;\n  display: block;\n  margin-bottom: 5px;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  border: 1px solid #c7d9f5;\n  border-radius: 8px;\n  padding: 0 12px;\n  font-size: 13px;\n  outline: none;\n  transition: .2s;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, .1);\n}\n.btn-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  background: #1e3a6e;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  margin-top: 8px;\n  cursor: pointer;\n}\n.btn-submit[_ngcontent-%COMP%]:hover {\n  background: #162e58;\n}\n.auth-redirect[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 13px;\n  margin-top: 18px;\n  color: #7a9abf;\n}\n.link-accent[_ngcontent-%COMP%] {\n  color: #f97316;\n  text-decoration: none;\n}\n.link-accent[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.error-box[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n  padding: 10px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 14px;\n}\n@media (max-width: 768px) {\n  .auth-page[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .auth-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .auth-right[_ngcontent-%COMP%] {\n    padding: 30px 20px;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\modules\\auth\\register\\register.component.ts", lineNumber: 11 });
})();

// src/app/modules/auth/oauth2-callback/oauth2-callback.component.ts
var Oauth2CallbackComponent = class _Oauth2CallbackComponent {
  route;
  router;
  authService;
  constructor(route, router, authService) {
    this.route = route;
    this.router = router;
    this.authService = authService;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params["token"];
      const needsPassword = params["needsPassword"] === "true";
      console.log("token:", token);
      console.log("needsPassword:", needsPassword);
      if (token) {
        this.authService.saveToken(token);
        if (needsPassword) {
          this.router.navigate(["/user/set-password"]);
        } else {
          this.router.navigate(["/user/profile"]);
        }
      } else {
        this.router.navigate(["/auth/login"]);
      }
    });
  }
  static \u0275fac = function Oauth2CallbackComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Oauth2CallbackComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Oauth2CallbackComponent, selectors: [["app-oauth2-callback"]], decls: 2, vars: 0, consts: [[2, "text-align", "center", "margin-top", "3rem"]], template: function Oauth2CallbackComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p", 0);
      \u0275\u0275text(1, "Logging in...");
      \u0275\u0275elementEnd();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Oauth2CallbackComponent, { className: "Oauth2CallbackComponent", filePath: "src\\app\\modules\\auth\\oauth2-callback\\oauth2-callback.component.ts", lineNumber: 9 });
})();

// src/app/modules/auth/forgot-password/forgot-password.component.ts
function ForgotPasswordComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 23);
    \u0275\u0275element(2, "path", 24)(3, "polyline", 25);
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
function ForgotPasswordComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 23);
    \u0275\u0275element(2, "circle", 27)(3, "line", 28)(4, "line", 29);
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
function ForgotPasswordComponent_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, " Adresse e-mail invalide ");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Envoyer le lien");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275element(1, "span", 32);
    \u0275\u0275text(2, " Envoi... ");
    \u0275\u0275elementEnd();
  }
}
var ForgotPasswordComponent = class _ForgotPasswordComponent {
  fb;
  http;
  form;
  isLoading = false;
  successMessage = "";
  errorMessage = "";
  constructor(fb, http) {
    this.fb = fb;
    this.http = http;
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
  get email() {
    return this.form.get("email");
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.form.invalid)
        return;
      this.isLoading = true;
      this.successMessage = "";
      this.errorMessage = "";
      try {
        yield firstValueFrom(this.http.post("http://localhost:8090/api/auth/forgot-password", { email: this.form.value.email }, { responseType: "text" }));
        this.successMessage = "Un lien de r\xE9initialisation a \xE9t\xE9 envoy\xE9 \xE0 votre adresse e-mail.";
        this.form.reset();
      } catch (error) {
        this.errorMessage = error.error || "Une erreur est survenue. Veuillez r\xE9essayer.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  static \u0275fac = function ForgotPasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ForgotPasswordComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HttpClient));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForgotPasswordComponent, selectors: [["app-forgot-password"]], decls: 32, vars: 9, consts: [[1, "auth-page"], [1, "auth-left"], [1, "brand"], [1, "brand-dot"], [1, "brand-name"], [1, "auth-left-content"], [1, "left-tag"], [1, "left-title"], [1, "auth-right"], [1, "auth-card"], [1, "auth-header"], ["class", "success-box", 4, "ngIf"], ["class", "error-box", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["type", "email", "placeholder", "vous@example.com", "formControlName", "email", 1, "form-input"], ["class", "field-error", 4, "ngIf"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "btn-loading", 4, "ngIf"], [1, "auth-redirect"], ["routerLink", "/auth/login", 1, "link-accent"], [1, "success-box"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "error-box"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "field-error"], [1, "btn-loading"], [1, "spinner"]], template: function ForgotPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "span", 3);
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5, "PIcloud");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6);
      \u0275\u0275text(8, "S\xE9curit\xE9 du compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h2", 7);
      \u0275\u0275text(10, "R\xE9initialisez votre mot de passe en toute s\xE9curit\xE9");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "div", 10)(14, "h1");
      \u0275\u0275text(15, "Mot de passe oubli\xE9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17, "Entrez votre e-mail pour recevoir un lien de r\xE9initialisation");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, ForgotPasswordComponent_div_18_Template, 5, 1, "div", 11)(19, ForgotPasswordComponent_div_19_Template, 6, 1, "div", 12);
      \u0275\u0275elementStart(20, "form", 13);
      \u0275\u0275listener("ngSubmit", function ForgotPasswordComponent_Template_form_ngSubmit_20_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(21, "div", 14)(22, "label");
      \u0275\u0275text(23, "Adresse e-mail");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "input", 15);
      \u0275\u0275template(25, ForgotPasswordComponent_span_25_Template, 2, 0, "span", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 17);
      \u0275\u0275template(27, ForgotPasswordComponent_span_27_Template, 2, 0, "span", 18)(28, ForgotPasswordComponent_span_28_Template, 3, 0, "span", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "p", 20)(30, "a", 21);
      \u0275\u0275text(31, "\u2190 Retour \xE0 la connexion");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("input-error", (ctx.email == null ? null : ctx.email.invalid) && (ctx.email == null ? null : ctx.email.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (ctx.email == null ? null : ctx.email.invalid) && (ctx.email == null ? null : ctx.email.touched));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
    }
  }, dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.success-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #ecfdf5;\n  color: #059669;\n  border: 1px solid #a7f3d0;\n  border-radius: 8px;\n  padding: 10px 14px;\n  font-size: 0.85rem;\n  margin-bottom: 16px;\n}\n/*# sourceMappingURL=forgot-password.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForgotPasswordComponent, { className: "ForgotPasswordComponent", filePath: "src\\app\\modules\\auth\\forgot-password\\forgot-password.component.ts", lineNumber: 11 });
})();

// src/app/modules/auth/reset-password/reset-password.component.ts
function ResetPasswordComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 15);
    \u0275\u0275element(2, "path", 16)(3, "polyline", 17);
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
function ResetPasswordComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 15);
    \u0275\u0275element(2, "circle", 19)(3, "line", 20)(4, "line", 21);
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
function ResetPasswordComponent_form_20_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, " Minimum 6 caract\xE8res ");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_20_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, " Les mots de passe ne correspondent pas ");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_20_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "R\xE9initialiser");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_20_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275element(1, "span", 34);
    \u0275\u0275text(2, " R\xE9initialisation... ");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 22);
    \u0275\u0275listener("ngSubmit", function ResetPasswordComponent_form_20_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 23)(2, "label");
    \u0275\u0275text(3, "Nouveau mot de passe");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 24);
    \u0275\u0275template(5, ResetPasswordComponent_form_20_span_5_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 23)(7, "label");
    \u0275\u0275text(8, "Confirmer le mot de passe");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 26);
    \u0275\u0275template(10, ResetPasswordComponent_form_20_span_10_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 27);
    \u0275\u0275template(12, ResetPasswordComponent_form_20_span_12_Template, 2, 0, "span", 28)(13, ResetPasswordComponent_form_20_span_13_Template, 3, 0, "span", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 30)(15, "a", 31);
    \u0275\u0275text(16, "\u2190 Retour \xE0 la connexion");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("input-error", (ctx_r0.newPassword == null ? null : ctx_r0.newPassword.invalid) && (ctx_r0.newPassword == null ? null : ctx_r0.newPassword.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.newPassword == null ? null : ctx_r0.newPassword.invalid) && (ctx_r0.newPassword == null ? null : ctx_r0.newPassword.touched));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("input-error", ctx_r0.form.hasError("passwordMismatch") && (ctx_r0.confirmPassword == null ? null : ctx_r0.confirmPassword.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.form.hasError("passwordMismatch") && (ctx_r0.confirmPassword == null ? null : ctx_r0.confirmPassword.touched));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.form.invalid || ctx_r0.isLoading || !ctx_r0.token);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isLoading);
  }
}
var ResetPasswordComponent = class _ResetPasswordComponent {
  fb;
  http;
  route;
  router;
  form;
  isLoading = false;
  successMessage = "";
  errorMessage = "";
  token = "";
  constructor(fb, http, route, router) {
    this.fb = fb;
    this.http = http;
    this.route = route;
    this.router = router;
    this.form = this.fb.group({
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token") || "";
    if (!this.token) {
      this.errorMessage = "Lien invalide ou expir\xE9.";
    }
  }
  passwordMatchValidator(form) {
    const p = form.get("newPassword")?.value;
    const c = form.get("confirmPassword")?.value;
    return p === c ? null : { passwordMismatch: true };
  }
  get newPassword() {
    return this.form.get("newPassword");
  }
  get confirmPassword() {
    return this.form.get("confirmPassword");
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.form.invalid || !this.token)
        return;
      this.isLoading = true;
      this.successMessage = "";
      this.errorMessage = "";
      try {
        yield firstValueFrom(this.http.post("http://localhost:8090/api/auth/reset-password", { token: this.token, newPassword: this.form.value.newPassword }, { responseType: "text" }));
        this.successMessage = "Mot de passe r\xE9initialis\xE9 avec succ\xE8s !";
        setTimeout(() => this.router.navigate(["/auth/login"]), 2500);
      } catch (error) {
        this.errorMessage = error.error || "Lien invalide ou expir\xE9.";
      } finally {
        this.isLoading = false;
      }
    });
  }
  static \u0275fac = function ResetPasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResetPasswordComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResetPasswordComponent, selectors: [["app-reset-password"]], decls: 21, vars: 3, consts: [[1, "auth-page"], [1, "auth-left"], [1, "brand"], [1, "brand-dot"], [1, "brand-name"], [1, "auth-left-content"], [1, "left-tag"], [1, "left-title"], [1, "auth-right"], [1, "auth-card"], [1, "auth-header"], ["class", "success-box", 4, "ngIf"], ["class", "error-box", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "success-box"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "error-box"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["type", "password", "placeholder", "Minimum 6 caract\xE8res", "formControlName", "newPassword", 1, "form-input"], ["class", "field-error", 4, "ngIf"], ["type", "password", "placeholder", "R\xE9p\xE9tez votre mot de passe", "formControlName", "confirmPassword", 1, "form-input"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "btn-loading", 4, "ngIf"], [1, "auth-redirect"], ["routerLink", "/auth/login", 1, "link-accent"], [1, "field-error"], [1, "btn-loading"], [1, "spinner"]], template: function ResetPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "span", 3);
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5, "PIcloud");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6);
      \u0275\u0275text(8, "S\xE9curit\xE9 du compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h2", 7);
      \u0275\u0275text(10, "Choisissez un nouveau mot de passe s\xE9curis\xE9");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "div", 10)(14, "h1");
      \u0275\u0275text(15, "Nouveau mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17, "Entrez et confirmez votre nouveau mot de passe");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, ResetPasswordComponent_div_18_Template, 5, 1, "div", 11)(19, ResetPasswordComponent_div_19_Template, 6, 1, "div", 12)(20, ResetPasswordComponent_form_20_Template, 17, 10, "form", 13);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.successMessage);
    }
  }, dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResetPasswordComponent, { className: "ResetPasswordComponent", filePath: "src\\app\\modules\\auth\\reset-password\\reset-password.component.ts", lineNumber: 12 });
})();

// src/app/modules/auth/auth-routing.module.ts
var routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "oauth2/callback", component: Oauth2CallbackComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  // ← ajouter
  { path: "reset-password", component: ResetPasswordComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }
];
var AuthRoutingModule = class _AuthRoutingModule {
  static \u0275fac = function AuthRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};

// src/app/modules/auth/auth.module.ts
var AuthModule = class _AuthModule {
  static \u0275fac = function AuthModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ] });
};
export {
  AuthModule
};
//# sourceMappingURL=chunk-73MMLAJL.js.map
