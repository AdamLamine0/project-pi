import {
  CertificateService
} from "./chunk-7IY2EMT3.js";
import {
  authGuard
} from "./chunk-KJFIX64G.js";
import {
  ActivatedRoute,
  AuthService,
  BrowserModule,
  FormsModule,
  NgIf,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  catchError,
  inject,
  platformBrowser,
  provideHttpClient,
  throwError,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HBGQ7VAX.js";

// src/app/modules/home/home.component.ts
var HomeComponent = class _HomeComponent {
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 183, vars: 0, consts: [[1, "page"], [1, "hero"], [1, "hero-inner"], [1, "hero-label"], [1, "hero-h1"], [1, "hero-p"], [1, "hero-btns"], ["routerLink", "/auth/register", 1, "btn-dark"], ["routerLink", "/events", 1, "btn-light"], [1, "hero-metrics"], [1, "metric"], [1, "metric-sep"], [1, "hero-visual"], [1, "vis-card", "vc-1"], [1, "vc-dot", 2, "background", "#2563eb"], [1, "vc-name"], [1, "vc-sub"], [1, "vis-card", "vc-2"], [1, "vc-dot", 2, "background", "#059669"], [1, "vis-card", "vc-3"], [1, "vc-dot", 2, "background", "#d97706"], [1, "vis-card", "vc-4"], [1, "vc-dot", 2, "background", "#7c3aed"], [1, "section"], [1, "container"], [1, "sec-label"], [1, "sec-h2"], [1, "actors-grid"], [1, "actor-card"], [1, "actor-icon", 2, "background", "#eff6ff", "color", "#2563eb"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M12 2L2 7l10 5 10-5-10-5z"], ["d", "M2 17l10 5 10-5M2 12l10 5 10-5"], [1, "actor-role", 2, "color", "#2563eb"], [1, "actor-desc"], [1, "actor-icon", 2, "background", "#ecfdf5", "color", "#059669"], ["cx", "12", "cy", "8", "r", "4"], ["d", "M4 20c0-4 3.6-7 8-7s8 3 8 7"], [1, "actor-role", 2, "color", "#059669"], [1, "actor-icon", 2, "background", "#fffbeb", "color", "#d97706"], ["x1", "12", "y1", "1", "x2", "12", "y2", "23"], ["d", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"], [1, "actor-role", 2, "color", "#d97706"], [1, "actor-icon", 2, "background", "#f5f3ff", "color", "#7c3aed"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"], [1, "actor-role", 2, "color", "#7c3aed"], [1, "section", 2, "background", "#fafafa"], [1, "feat-grid"], [1, "feat-row"], [1, "feat-num"], [1, "feat-title"], [1, "feat-desc"], [1, "section-cta"], [1, "cta-inner"], [1, "sec-label", 2, "color", "#93c5fd"], [1, "cta-h2"], [1, "cta-p"], [1, "cta-btns"], ["routerLink", "/auth/register", 1, "btn-blue"], ["routerLink", "/auth/login", 1, "btn-ghost"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275text(4, "\xC9cosyst\xE8me startup \xB7 Tunisie");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 4);
      \u0275\u0275text(6, "La plateforme qui connecte");
      \u0275\u0275element(7, "br");
      \u0275\u0275elementStart(8, "em");
      \u0275\u0275text(9, "entrepreneurs & investisseurs");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "p", 5);
      \u0275\u0275text(11, "Mentors, partenaires et startups tunisiennes r\xE9unis pour acc\xE9l\xE9rer la croissance et le financement des projets innovants.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 6)(13, "a", 7);
      \u0275\u0275text(14, "Cr\xE9er un compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "a", 8);
      \u0275\u0275text(16, "Voir les \xE9v\xE9nements");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9)(18, "div", 10)(19, "strong");
      \u0275\u0275text(20, "500+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span");
      \u0275\u0275text(22, "Startups");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(23, "div", 11);
      \u0275\u0275elementStart(24, "div", 10)(25, "strong");
      \u0275\u0275text(26, "120+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span");
      \u0275\u0275text(28, "Mentors");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(29, "div", 11);
      \u0275\u0275elementStart(30, "div", 10)(31, "strong");
      \u0275\u0275text(32, "80+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span");
      \u0275\u0275text(34, "Investisseurs");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(35, "div", 11);
      \u0275\u0275elementStart(36, "div", 10)(37, "strong");
      \u0275\u0275text(38, "200+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "span");
      \u0275\u0275text(40, "\xC9v\xE9nements / an");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "div", 12)(42, "div", 13);
      \u0275\u0275element(43, "div", 14);
      \u0275\u0275elementStart(44, "div")(45, "div", 15);
      \u0275\u0275text(46, "Startup connect\xE9e");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 16);
      \u0275\u0275text(48, "Seed \xB7 FinTech");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "div", 17);
      \u0275\u0275element(50, "div", 18);
      \u0275\u0275elementStart(51, "div")(52, "div", 15);
      \u0275\u0275text(53, "Mentor assign\xE9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "div", 16);
      \u0275\u0275text(55, "10 ans d'exp\xE9rience");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(56, "div", 19);
      \u0275\u0275element(57, "div", 20);
      \u0275\u0275elementStart(58, "div")(59, "div", 15);
      \u0275\u0275text(60, "Lev\xE9e de fonds");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "div", 16);
      \u0275\u0275text(62, "250 000 TND \xB7 S\xE9rie A");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(63, "div", 21);
      \u0275\u0275element(64, "div", 22);
      \u0275\u0275elementStart(65, "div")(66, "div", 15);
      \u0275\u0275text(67, "\xC9v\xE9nement live");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "div", 16);
      \u0275\u0275text(69, "Pitch Day \xB7 Tunis");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(70, "section", 23)(71, "div", 24)(72, "div", 25);
      \u0275\u0275text(73, "Pour qui ?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "h2", 26);
      \u0275\u0275text(75, "Chaque acteur a sa place");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "div", 27)(77, "div", 28)(78, "div", 29);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(79, "svg", 30);
      \u0275\u0275element(80, "path", 31)(81, "path", 32);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(82, "div", 33);
      \u0275\u0275text(83, "Entrepreneur");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "p", 34);
      \u0275\u0275text(85, "Acc\xE9dez \xE0 des mentors, \xE9v\xE9nements et investisseurs pour scaler votre projet.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(86, "div", 28)(87, "div", 35);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(88, "svg", 30);
      \u0275\u0275element(89, "circle", 36)(90, "path", 37);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(91, "div", 38);
      \u0275\u0275text(92, "Mentor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "p", 34);
      \u0275\u0275text(94, "Partagez votre expertise et accompagnez les startups dans leur d\xE9veloppement.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(95, "div", 28)(96, "div", 39);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(97, "svg", 30);
      \u0275\u0275element(98, "line", 40)(99, "path", 41);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(100, "div", 42);
      \u0275\u0275text(101, "Investisseur");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "p", 34);
      \u0275\u0275text(103, "D\xE9couvrez un deal flow qualifi\xE9 et investissez dans les startups tunisiennes.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(104, "div", 28)(105, "div", 43);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(106, "svg", 30);
      \u0275\u0275element(107, "path", 44)(108, "circle", 45)(109, "path", 46);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(110, "div", 47);
      \u0275\u0275text(111, "Partenaire");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(112, "p", 34);
      \u0275\u0275text(113, "Co-organisez des \xE9v\xE9nements et d\xE9veloppez votre visibilit\xE9 dans l'\xE9cosyst\xE8me.");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(114, "section", 48)(115, "div", 24)(116, "div", 25);
      \u0275\u0275text(117, "Fonctionnalit\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "h2", 26);
      \u0275\u0275text(119, "Tout en un seul endroit");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(120, "div", 49)(121, "div", 50)(122, "span", 51);
      \u0275\u0275text(123, "01");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(124, "div")(125, "div", 52);
      \u0275\u0275text(126, "\xC9v\xE9nements & Networking");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "div", 53);
      \u0275\u0275text(128, "Webinaires, workshops, pitchs, bootcamps \u2014 agenda complet de l'\xE9cosyst\xE8me.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(129, "div", 50)(130, "span", 51);
      \u0275\u0275text(131, "02");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(132, "div")(133, "div", 52);
      \u0275\u0275text(134, "Mentorat intelligent");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(135, "div", 53);
      \u0275\u0275text(136, "Matching selon le secteur, le stade et les objectifs de votre startup.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(137, "div", 50)(138, "span", 51);
      \u0275\u0275text(139, "03");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(140, "div")(141, "div", 52);
      \u0275\u0275text(142, "Acc\xE8s au financement");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(143, "div", 53);
      \u0275\u0275text(144, "Pitchez devant des investisseurs et suivez vos dossiers de financement.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(145, "div", 50)(146, "span", 51);
      \u0275\u0275text(147, "04");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(148, "div")(149, "div", 52);
      \u0275\u0275text(150, "Tableau de bord");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(151, "div", 53);
      \u0275\u0275text(152, "KPIs, rapports et insights pour suivre la croissance de votre projet.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(153, "div", 50)(154, "span", 51);
      \u0275\u0275text(155, "05");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(156, "div")(157, "div", 52);
      \u0275\u0275text(158, "Ressources & Formation");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(159, "div", 53);
      \u0275\u0275text(160, "Templates, guides sectoriels et formations en ligne pour progresser vite.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(161, "div", 50)(162, "span", 51);
      \u0275\u0275text(163, "06");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(164, "div")(165, "div", 52);
      \u0275\u0275text(166, "Communaut\xE9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(167, "div", 53);
      \u0275\u0275text(168, "Forums et espaces de collaboration pour partager et co-cr\xE9er.");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(169, "section", 54)(170, "div", 24)(171, "div", 55)(172, "div", 56);
      \u0275\u0275text(173, "Commencer maintenant");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(174, "h2", 57);
      \u0275\u0275text(175, "Rejoignez l'\xE9cosyst\xE8me startup tunisien");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(176, "p", 58);
      \u0275\u0275text(177, "Cr\xE9ez votre compte en 30 secondes et acc\xE9dez \xE0 toute la plateforme gratuitement.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(178, "div", 59)(179, "a", 60);
      \u0275\u0275text(180, "Cr\xE9er un compte gratuit");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(181, "a", 61);
      \u0275\u0275text(182, "Se connecter");
      \u0275\u0275elementEnd()()()()()();
    }
  }, dependencies: [RouterLink], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@400;600;700&display=swap";\n\n\n\n.page[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  color: #111;\n}\n.hero[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      145deg,\n      #eef4ff 0%,\n      #fdf3ec 60%,\n      #fef9f5 100%);\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  align-items: center;\n  gap: 4rem;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 7rem 1.5rem 5rem;\n}\n.hero-label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin-bottom: 1.25rem;\n}\n.hero-h1[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: clamp(1.9rem, 3.5vw, 2.9rem);\n  font-weight: 700;\n  line-height: 1.15;\n  color: #1e3a6e;\n  letter-spacing: -0.025em;\n  margin: 0 0 1.1rem;\n}\n.hero-h1[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  color: #f97316;\n}\n.hero-p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #5a7396;\n  line-height: 1.75;\n  margin: 0 0 2rem;\n  max-width: 400px;\n  font-weight: 400;\n}\n.hero-btns[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-bottom: 3rem;\n}\n.btn-dark[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background: #1e3a6e;\n  color: #fff;\n  font-size: 13.5px;\n  font-weight: 500;\n  padding: 10px 22px;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: background 0.15s, transform 0.1s;\n  font-family: "Inter", sans-serif;\n}\n.btn-dark[_ngcontent-%COMP%]:hover {\n  background: #16305c;\n  transform: translateY(-1px);\n  color: #fff;\n  text-decoration: none;\n}\n.btn-light[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background: #fff;\n  color: #1e3a6e;\n  border: 1px solid #c7d9f5;\n  font-size: 13.5px;\n  font-weight: 500;\n  padding: 10px 22px;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: background 0.15s, border-color 0.15s;\n  font-family: "Inter", sans-serif;\n}\n.btn-light[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n  border-color: #93c5fd;\n  color: #1e3a6e;\n  text-decoration: none;\n}\n.hero-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n.metric[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.metric[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: #1e3a6e;\n  line-height: 1;\n}\n.metric[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #8aaace;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.metric-sep[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 28px;\n  background: #c7d9f5;\n  flex-shrink: 0;\n}\n.hero-visual[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.vis-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  padding: 16px;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.vis-card[_ngcontent-%COMP%]:hover {\n  border-color: #93c5fd;\n  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.07);\n}\n.vc-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-top: 4px;\n  flex-shrink: 0;\n}\n.vc-name[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #1e3a6e;\n  margin-bottom: 2px;\n}\n.vc-sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #8aaace;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n}\n.section[_ngcontent-%COMP%] {\n  padding: 5.5rem 0;\n  background: #fff;\n}\n.sec-label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #f97316;\n  margin-bottom: 0.75rem;\n}\n.sec-h2[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: clamp(1.5rem, 2.5vw, 2rem);\n  font-weight: 700;\n  color: #1e3a6e;\n  letter-spacing: -0.02em;\n  margin: 0 0 3rem;\n}\n.actors-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1px;\n  background: #dbeafe;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.actor-card[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 1.75rem;\n  transition: background 0.15s;\n}\n.actor-card[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff;\n}\n.actor-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 1rem;\n}\n.actor-role[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  margin-bottom: 0.5rem;\n}\n.actor-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  line-height: 1.65;\n  margin: 0;\n}\n.feat-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 0;\n  border: 1px solid #dbeafe;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.feat-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1.5rem 1.75rem;\n  border-bottom: 1px solid #dbeafe;\n  border-right: 1px solid #dbeafe;\n  background: #fff;\n  transition: background 0.15s;\n}\n.feat-row[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff;\n}\n.feat-num[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #f97316;\n  min-width: 32px;\n  line-height: 1.4;\n  flex-shrink: 0;\n  opacity: 0.5;\n}\n.feat-title[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #1e3a6e;\n  margin-bottom: 4px;\n}\n.feat-desc[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #8aaace;\n  line-height: 1.6;\n}\n.section-cta[_ngcontent-%COMP%] {\n  padding: 5.5rem 0;\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a6e 0%,\n      #1e4d8c 100%);\n}\n.cta-inner[_ngcontent-%COMP%] {\n  max-width: 540px;\n}\n.cta-h2[_ngcontent-%COMP%] {\n  font-family: "Bricolage Grotesque", sans-serif;\n  font-size: clamp(1.6rem, 3vw, 2.2rem);\n  font-weight: 700;\n  color: #fff;\n  letter-spacing: -0.025em;\n  margin: 0.5rem 0 1rem;\n  line-height: 1.2;\n}\n.cta-p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: rgba(255, 255, 255, 0.6);\n  line-height: 1.7;\n  margin: 0 0 2rem;\n}\n.cta-btns[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.btn-blue[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background: #f97316;\n  color: #fff;\n  font-size: 13.5px;\n  font-weight: 500;\n  padding: 10px 22px;\n  border-radius: 8px;\n  text-decoration: none;\n  font-family: "Inter", sans-serif;\n  transition: background 0.15s, transform 0.1s;\n}\n.btn-blue[_ngcontent-%COMP%]:hover {\n  background: #ea6a00;\n  transform: translateY(-1px);\n  color: #fff;\n  text-decoration: none;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  font-size: 13.5px;\n  font-weight: 500;\n  padding: 10px 22px;\n  border-radius: 8px;\n  text-decoration: none;\n  font-family: "Inter", sans-serif;\n  transition: all 0.15s;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n  text-decoration: none;\n}\n.sec-label[style][_ngcontent-%COMP%] {\n  color: #f97316 !important;\n}\n@media (max-width: 768px) {\n  .hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding-top: 6rem;\n  }\n  .hero-visual[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .metric-sep[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .feat-row[_ngcontent-%COMP%] {\n    border-right: none;\n  }\n}\n/*# sourceMappingURL=home.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src\\app\\modules\\home\\home.component.ts", lineNumber: 8 });
})();

// src/app/pages/verify-certificate/verify-certificate.component.ts
function VerifyCertificateComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "div", 5);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "V\xE9rification du certificat...");
    \u0275\u0275elementEnd()();
  }
}
function VerifyCertificateComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 6);
    \u0275\u0275text(2, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 7);
    \u0275\u0275text(4, "Certificat authentique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 9)(8, "div", 10)(9, "span", 11);
    \u0275\u0275text(10, "B\xE9n\xE9ficiaire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 12);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 10)(14, "span", 11);
    \u0275\u0275text(15, "\xC9v\xE9nement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 12);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 10)(19, "span", 11);
    \u0275\u0275text(20, "Date de l'\xE9v\xE9nement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 12);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 10)(24, "span", 11);
    \u0275\u0275text(25, "\xC9mis le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 12);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 10)(29, "span", 11);
    \u0275\u0275text(30, "Token");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 13);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 14);
    \u0275\u0275element(34, "img", 15);
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, "V\xE9rifi\xE9 par ");
    \u0275\u0275elementStart(37, "strong");
    \u0275\u0275text(38, "PIcloud");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.result == null ? null : ctx_r0.result.message);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.result == null ? null : ctx_r0.result.recipientName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.result == null ? null : ctx_r0.result.eventTitle);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatDate((tmp_4_0 = ctx_r0.result == null ? null : ctx_r0.result.eventDate) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : null));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatDate((tmp_5_0 = ctx_r0.result == null ? null : ctx_r0.result.generatedAt) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : null));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.token.substring(0, 8).toUpperCase(), "...");
  }
}
function VerifyCertificateComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 16);
    \u0275\u0275text(2, "\u274C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 17);
    \u0275\u0275text(4, "Certificat invalide");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 18);
    \u0275\u0275text(8, "Retour \xE0 l'accueil");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.result == null ? null : ctx_r0.result.message);
  }
}
var VerifyCertificateComponent = class _VerifyCertificateComponent {
  route;
  certificateService;
  result = null;
  loading = true;
  token = "";
  constructor(route, certificateService) {
    this.route = route;
    this.certificateService = certificateService;
  }
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token") ?? "";
    if (this.token) {
      this.certificateService.verify(this.token).subscribe({
        next: (res) => {
          this.result = res;
          this.loading = false;
        },
        error: () => {
          this.result = {
            valid: false,
            recipientName: null,
            eventTitle: null,
            eventDate: null,
            generatedAt: null,
            message: "Erreur lors de la v\xE9rification."
          };
          this.loading = false;
        }
      });
    }
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
  static \u0275fac = function VerifyCertificateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VerifyCertificateComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(CertificateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VerifyCertificateComponent, selectors: [["app-verify-certificate"]], decls: 5, vars: 3, consts: [[1, "verify-page"], [1, "verify-card"], ["class", "verify-loading", 4, "ngIf"], [4, "ngIf"], [1, "verify-loading"], [1, "spinner-lg"], [1, "verify-icon", "valid"], [1, "verify-title", "valid-text"], [1, "verify-message"], [1, "verify-details"], [1, "detail-row"], [1, "detail-label"], [1, "detail-value"], [1, "detail-value", "token"], [1, "verify-footer"], ["src", "assets/logo.png", "alt", "PIcloud", "onerror", "this.style.display='none'", 1, "verify-logo"], [1, "verify-icon", "invalid"], [1, "verify-title", "invalid-text"], ["routerLink", "/", 1, "btn-home"]], template: function VerifyCertificateComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275template(2, VerifyCertificateComponent_div_2_Template, 4, 0, "div", 2)(3, VerifyCertificateComponent_div_3_Template, 39, 6, "div", 3)(4, VerifyCertificateComponent_div_4_Template, 9, 1, "div", 3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && (ctx.result == null ? null : ctx.result.valid));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !(ctx.result == null ? null : ctx.result.valid));
    }
  }, dependencies: [NgIf, RouterLink], styles: ["\n\n.verify-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #0d1b2a 0%,\n      #1e3a6e 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 16px;\n}\n.verify-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 48px 40px;\n  max-width: 480px;\n  width: 100%;\n  text-align: center;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.verify-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  color: #64748b;\n}\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e2e8f0;\n  border-top-color: #1e3a6e;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.verify-icon[_ngcontent-%COMP%] {\n  font-size: 52px;\n  margin-bottom: 16px;\n}\n.verify-title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin-bottom: 8px;\n}\n.valid-text[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.invalid-text[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.verify-message[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n  margin-bottom: 28px;\n}\n.verify-details[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 28px;\n  text-align: left;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n  border-bottom: 1px solid #e2e8f0;\n}\n.detail-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n  font-weight: 500;\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #0d1b2a;\n  font-weight: 600;\n  text-align: right;\n  max-width: 60%;\n}\n.detail-value.token[_ngcontent-%COMP%] {\n  font-family: monospace;\n  background: #f1f5f9;\n  padding: 2px 8px;\n  border-radius: 4px;\n}\n.verify-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  font-size: 13px;\n  color: #64748b;\n}\n.verify-logo[_ngcontent-%COMP%] {\n  height: 24px;\n}\n.btn-home[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 16px;\n  background: #1e3a6e;\n  color: #fff;\n  padding: 10px 24px;\n  border-radius: 8px;\n  text-decoration: none;\n  font-size: 14px;\n}\n/*# sourceMappingURL=verify-certificate.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VerifyCertificateComponent, { className: "VerifyCertificateComponent", filePath: "src\\app\\pages\\verify-certificate\\verify-certificate.component.ts", lineNumber: 11 });
})();

// src/app/app-routing.module.ts
var routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () => import("./chunk-73MMLAJL.js").then((m) => m.AuthModule)
  },
  {
    path: "user",
    canActivate: [authGuard],
    loadChildren: () => import("./chunk-ONR7O7C3.js").then((m) => m.UserModule)
  },
  {
    path: "events",
    canActivate: [authGuard],
    loadChildren: () => import("./chunk-6M7K46V7.js").then((m) => m.EventModule)
  },
  {
    path: "legal-procedures",
    canActivate: [authGuard],
    // ← protégé comme les autres modules
    loadChildren: () => import("./chunk-Q6KKSE7V.js").then((m) => m.LegalModule)
  },
  {
    path: "partenariat",
    canActivate: [authGuard],
    loadChildren: () => import("./chunk-5DNF2ALW.js").then((m) => m.PartenaireModule)
  },
  {
    path: "verify/:token",
    component: VerifyCertificateComponent
  },
  {
    path: "partenariat",
    canActivate: [authGuard],
    loadChildren: () => import("./chunk-5DNF2ALW.js").then((m) => m.PartenaireModule)
  },
  {
    path: "verify/:token",
    component: VerifyCertificateComponent
  },
  { path: "**", redirectTo: "" }
];
var AppRoutingModule = class _AppRoutingModule {
  static \u0275fac = function AppRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forRoot(routes), RouterModule] });
};

// src/app/core/components/navbar/navbar.component.ts
var _c0 = () => ({ exact: true });
function NavbarComponent_ng_container_6_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "li")(2, "a", 14);
    \u0275\u0275text(3, "Mon organisation");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "li")(5, "a", 15);
    \u0275\u0275text(6, "Conventions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
}
function NavbarComponent_ng_container_6_li_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 15);
    \u0275\u0275text(2, "Mes conventions");
    \u0275\u0275elementEnd()();
  }
}
function NavbarComponent_ng_container_6_li_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 15);
    \u0275\u0275text(2, "Conventions");
    \u0275\u0275elementEnd()();
  }
}
function NavbarComponent_ng_container_6_li_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 16);
    \u0275\u0275text(2, "Utilisateurs");
    \u0275\u0275elementEnd()();
  }
}
function NavbarComponent_ng_container_6_li_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 17);
    \u0275\u0275text(2, "Validation");
    \u0275\u0275elementEnd()();
  }
}
function NavbarComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "li")(2, "a", 7);
    \u0275\u0275text(3, "Accueil");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "li")(5, "a", 8);
    \u0275\u0275text(6, "\xC9v\xE9nements");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "li")(8, "a", 9);
    \u0275\u0275text(9, "Proc\xE9dures");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "li")(11, "a", 10);
    \u0275\u0275text(12, "Partenaires");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, NavbarComponent_ng_container_6_ng_container_13_Template, 7, 0, "ng-container", 11)(14, NavbarComponent_ng_container_6_li_14_Template, 3, 0, "li", 11)(15, NavbarComponent_ng_container_6_li_15_Template, 3, 0, "li", 11);
    \u0275\u0275elementStart(16, "li")(17, "a", 12);
    \u0275\u0275text(18, "Profil");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, NavbarComponent_ng_container_6_li_19_Template, 3, 0, "li", 11)(20, NavbarComponent_ng_container_6_li_20_Template, 3, 0, "li", 11);
    \u0275\u0275elementStart(21, "li")(22, "button", 13);
    \u0275\u0275listener("click", function NavbarComponent_ng_container_6_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275text(23, "D\xE9connexion");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r1.authService.getRole() === "PARTNER");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.authService.getRole() === "USER");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.authService.isAdmin());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.authService.isAdmin());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.authService.isAdmin());
  }
}
function NavbarComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 7);
    \u0275\u0275text(2, "Accueil");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "li")(4, "a", 18);
    \u0275\u0275text(5, "Connexion");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "li")(7, "a", 19);
    \u0275\u0275text(8, "Commencer");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(1, _c0));
  }
}
var NavbarComponent = class _NavbarComponent {
  authService;
  router;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  logout() {
    this.authService.logout();
  }
  static \u0275fac = function NavbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NavbarComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NavbarComponent, selectors: [["app-navbar"]], decls: 9, vars: 2, consts: [["loggedOut", ""], [1, "nav"], [1, "nav-inner"], ["routerLink", "/", 1, "nav-logo"], [1, "logo-dot"], [1, "nav-links"], [4, "ngIf", "ngIfElse"], ["routerLink", "/", "routerLinkActive", "active", 1, "nl", 3, "routerLinkActiveOptions"], ["routerLink", "/events", "routerLinkActive", "active", 1, "nl"], ["routerLink", "/legal-procedures", "routerLinkActive", "active", 1, "nl"], ["routerLink", "/partenariat/list", "routerLinkActive", "active", 1, "nl"], [4, "ngIf"], ["routerLink", "/user/profile", "routerLinkActive", "active", 1, "nl"], [1, "nav-btn-logout", 3, "click"], ["routerLink", "/partenariat/mon-organisation", "routerLinkActive", "active", 1, "nl"], ["routerLink", "/partenariat/conventions", "routerLinkActive", "active", 1, "nl"], ["routerLink", "/user/list", "routerLinkActive", "active", 1, "nl"], ["routerLink", "/events/pending", "routerLinkActive", "active", 1, "nl"], ["routerLink", "/auth/login", 1, "nl"], ["routerLink", "/auth/register", 1, "nav-btn-register"]], template: function NavbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "nav", 1)(1, "div", 2)(2, "a", 3);
      \u0275\u0275element(3, "span", 4);
      \u0275\u0275text(4, "PIcloud ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "ul", 5);
      \u0275\u0275template(6, NavbarComponent_ng_container_6_Template, 24, 7, "ng-container", 6)(7, NavbarComponent_ng_template_7_Template, 9, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const loggedOut_r3 = \u0275\u0275reference(8);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.authService.isLoggedIn())("ngIfElse", loggedOut_r3);
    }
  }, dependencies: [NgIf, RouterLink, RouterLinkActive], styles: ['@import "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";\n\n\n\n.nav[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 100;\n  background: rgba(255, 255, 255, 0.92);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border-bottom: 1px solid #e0eaff;\n  font-family: "Inter", sans-serif;\n}\n.nav-inner[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.nav-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 600;\n  color: #1e3a6e;\n  text-decoration: none;\n  letter-spacing: -0.01em;\n}\n.logo-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #f97316;\n  flex-shrink: 0;\n}\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.nl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #4b6890;\n  text-decoration: none;\n  padding: 6px 12px;\n  border-radius: 8px;\n  transition: color 0.15s, background 0.15s;\n}\n.nl[_ngcontent-%COMP%]:hover, \n.nl.active[_ngcontent-%COMP%] {\n  color: #1e3a6e;\n  background: #eff6ff;\n  text-decoration: none;\n}\n.nav-btn-logout[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 500;\n  color: #4b6890;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 6px 12px;\n  border-radius: 8px;\n  font-family: "Inter", sans-serif;\n  transition: color 0.15s, background 0.15s;\n}\n.nav-btn-logout[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n  background: #fef2f2;\n}\n.nav-btn-register[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 13px;\n  font-weight: 500;\n  color: #fff;\n  background: #f97316;\n  text-decoration: none;\n  padding: 7px 16px;\n  border-radius: 8px;\n  transition: background 0.15s, transform 0.1s;\n  margin-left: 4px;\n}\n.nav-btn-register[_ngcontent-%COMP%]:hover {\n  background: #ea6a00;\n  color: #fff;\n  text-decoration: none;\n  transform: translateY(-1px);\n}\n/*# sourceMappingURL=navbar.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NavbarComponent, { className: "NavbarComponent", filePath: "src\\app\\core\\components\\navbar\\navbar.component.ts", lineNumber: 10 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  title = "PIcloud";
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "router-outlet");
    }
  }, dependencies: [RouterOutlet, NavbarComponent] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 8 });
})();

// src/app/core/interceptors/jwt.interceptor.ts
var jwtInterceptor = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  console.log("TOKEN =", token);
  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;
  return next(authReq).pipe(catchError((error) => {
    if (error.status === 401) {
      authService.logout();
      router.navigate(["/auth/login"]);
    }
    return throwError(() => error);
  }));
};

// src/app/app.module.ts
var AppModule = class _AppModule {
  static \u0275fac = function AppModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppModule, bootstrap: [AppComponent] });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ], imports: [
    BrowserModule,
    // ← includes CommonModule (*ngIf, *ngFor)
    AppRoutingModule,
    RouterModule,
    FormsModule
  ] });
};

// src/main.ts
platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
}).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
