import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideRocket, lucidePlus, lucideSearch, lucideFilter, lucideStar, lucideEye, lucideEdit, lucideChevronRight, lucideArrowUp, lucideArrowDown, lucideTrendingUp, } from '@ng-icons/lucide';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.name;
function ProjectsComponent_For_17_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function ProjectsComponent_For_17_Template_button_click_0_listener() { const f_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.stageFilter.set(f_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const f_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", ctx_r2.stageFilter() === f_r2 ? "var(--chip-active-bg)" : "var(--chip-inactive-bg)")("color", ctx_r2.stageFilter() === f_r2 ? "var(--chip-active-text)" : "var(--chip-inactive-text)")("border-color", ctx_r2.stageFilter() === f_r2 ? "var(--chip-active-border)" : "var(--chip-inactive-border)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(f_r2);
} }
function ProjectsComponent_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 16)(2, "div", 17)(3, "div", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h3", 19);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 20);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "span", 21);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "p", 22);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 23)(15, "span", 24);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 25);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 20);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 26)(22, "div", 27)(23, "span", 28);
    i0.ɵɵtext(24, "AI Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 29);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 30);
    i0.ɵɵelement(28, "div", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 32)(30, "span", 33);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 34)(33, "button", 35);
    i0.ɵɵelement(34, "ng-icon", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "button", 37);
    i0.ɵɵelement(36, "ng-icon", 38);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const s_r4 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("background", s_r4.color + "22")("color", s_r4.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r4.initials, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r4.founder);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", ctx_r2.statusBg(s_r4.status))("color", ctx_r2.statusColor(s_r4.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r4.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r4.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r4.sector);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r4.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u00B7 Team: ", s_r4.team);
    i0.ɵɵadvance(5);
    i0.ɵɵstyleProp("color", s_r4.score >= 80 ? "var(--badge-green-text)" : s_r4.score >= 65 ? "var(--badge-amber-text)" : "var(--badge-red-text)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r4.score, "/100 ");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", s_r4.score, "%")("background", s_r4.score >= 80 ? "linear-gradient(90deg,#059669,#34D399)" : s_r4.score >= 65 ? "linear-gradient(90deg,#D97706,#FBBF24)" : "linear-gradient(90deg,#DC2626,#F87171)");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r4.raised);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", "View " + s_r4.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", "14");
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "Edit " + s_r4.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", "14");
} }
export class ProjectsComponent {
    searchQuery = signal('', ...(ngDevMode ? [{ debugName: "searchQuery" }] : /* istanbul ignore next */ []));
    stageFilter = signal('All', ...(ngDevMode ? [{ debugName: "stageFilter" }] : /* istanbul ignore next */ []));
    stageFilters = ['All', 'Pre-seed', 'Seed', 'Series A'];
    startups = [
        { name: 'TechFlow', founder: 'Karim Bensalem', sector: 'FinTech', stage: 'Seed', score: 87, status: 'Active', description: 'AI-powered financial management platform for SMEs, automating invoicing, cash flow forecasting, and compliance reporting.', team: 6, raised: '$240K raised', initials: 'TF', color: '#1C4FC3' },
        { name: 'GreenVenture', founder: 'Amira Tounsi', sector: 'CleanTech', stage: 'Pre-seed', score: 72, status: 'Review', description: 'Decentralized solar energy marketplace connecting producers and consumers across North Africa using blockchain technology.', team: 4, raised: '$80K raised', initials: 'GV', color: '#059669' },
        { name: 'MedConnect', founder: 'Sofia Mansouri', sector: 'HealthTech', stage: 'Series A', score: 91, status: 'Funded', description: 'Telemedicine platform bridging rural healthcare access gaps with AI diagnosis assistance and specialist video consultations.', team: 14, raised: '$1.2M raised', initials: 'MC', color: '#1D1384' },
        { name: 'AgriSmart', founder: 'Yacine Hamdi', sector: 'AgriTech', stage: 'Pre-seed', score: 64, status: 'Review', description: 'IoT sensor network for smart irrigation and crop monitoring, reducing water usage by 40% for smallholder farmers.', team: 3, raised: '$45K raised', initials: 'AS', color: '#D97706' },
        { name: 'EduHub', founder: 'Nadia Cherouk', sector: 'EdTech', stage: 'Seed', score: 78, status: 'Active', description: 'Adaptive learning platform for STEM education in underserved communities, with offline-first mobile experience.', team: 8, raised: '$190K raised', initials: 'EH', color: '#EC4899' },
        { name: 'LogiTrack', founder: 'Omar Ladraa', sector: 'Logistics', stage: 'Series A', score: 85, status: 'Active', description: 'Last-mile delivery optimization SaaS for e-commerce businesses, reducing delivery costs by 35% through AI routing.', team: 11, raised: '$780K raised', initials: 'LT', color: '#0891B2' },
        { name: 'SecureID', founder: 'Meriem Bouzid', sector: 'Cybersecurity', stage: 'Seed', score: 89, status: 'Active', description: 'Biometric identity verification API for financial institutions, reducing fraud while improving onboarding UX.', team: 7, raised: '$320K raised', initials: 'SI', color: '#1C4FC3' },
        { name: 'AquaMonitor', founder: 'Riad Ferhat', sector: 'CleanTech', stage: 'Pre-seed', score: 68, status: 'Paused', description: 'Real-time water quality monitoring system for municipal water treatment plants using spectroscopy and machine learning.', team: 5, raised: '$60K raised', initials: 'AM', color: '#059669' },
    ];
    filtered = computed(() => {
        const q = this.searchQuery().toLowerCase();
        const stage = this.stageFilter();
        return this.startups.filter(s => {
            const matchQ = !q || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q) || s.founder.toLowerCase().includes(q);
            const matchStage = stage === 'All' || s.stage === stage;
            return matchQ && matchStage;
        });
    }, ...(ngDevMode ? [{ debugName: "filtered" }] : /* istanbul ignore next */ []));
    statusBg(status) {
        const map = { Active: 'var(--badge-green-bg)', Review: 'var(--badge-amber-bg)', Funded: 'var(--badge-blue-bg)', Paused: 'var(--badge-neutral-bg)' };
        return map[status] ?? 'var(--badge-neutral-bg)';
    }
    statusColor(status) {
        const map = { Active: 'var(--badge-green-text)', Review: 'var(--badge-amber-text)', Funded: 'var(--badge-blue-text)', Paused: 'var(--badge-neutral-text)' };
        return map[status] ?? 'var(--badge-neutral-text)';
    }
    static ɵfac = function ProjectsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProjectsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProjectsComponent, selectors: [["app-projects"]], features: [i0.ɵɵProvidersFeature([provideIcons({
                    lucideRocket, lucidePlus, lucideSearch, lucideFilter,
                    lucideStar, lucideEye, lucideEdit, lucideChevronRight,
                    lucideArrowUp, lucideArrowDown, lucideTrendingUp,
                })])], decls: 21, vars: 4, consts: [[1, "page-shell"], [1, "page-header"], [1, "text-lg", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.02em"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-secondary)"], [1, "page-header-actions"], ["aria-label", "Add new project", 1, "flex", "w-full", "items-center", "justify-center", "gap-1.5", "rounded-lg", "border-none", "text-xs", "font-semibold", "cursor-pointer", "transition-all", "hover:opacity-90", "sm:w-auto", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px 16px"], ["name", "lucidePlus", 3, "size"], [1, "filter-toolbar"], [1, "relative", "filter-toolbar__grow"], ["name", "lucideSearch", 2, "position", "absolute", "left", "9px", "top", "50%", "transform", "translateY(-50%)", "color", "var(--text-muted)", 3, "size"], ["type", "search", "placeholder", "Search startups...", "aria-label", "Search startups", 1, "input-full", "text-xs", "rounded-lg", "border", "focus:outline-none", 2, "padding", "6px 12px 6px 28px", "background", "var(--surface)", "border-color", "var(--border)", "font-family", "var(--font-sans)", 3, "input", "value"], [1, "chip-scroll"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "5px 12px", 3, "background", "color", "border-color"], [1, "card-grid-auto"], [1, "rounded-xl", "border", "transition-all", "hover:shadow-md", "cursor-pointer", "group", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)", "padding", "20px"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "5px 12px", 3, "click"], [1, "flex", "items-start", "justify-between", "mb-3"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "justify-center", "rounded-xl", "flex-shrink-0", 2, "width", "40px", "height", "40px", "font-size", "13px", "font-weight", "700"], [1, "text-sm", "font-bold", "leading-tight", 2, "color", "var(--text-primary)"], [1, "text-xs", 2, "color", "var(--text-muted)"], [1, "text-xs", "font-medium", "px-2", "py-0.5", "rounded-full", "flex-shrink-0"], [1, "text-xs", "leading-relaxed", "mb-4", "line-clamp-2", 2, "color", "var(--text-secondary)"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mb-4"], [1, "text-xs", "px-2", "py-0.5", "rounded-full", 2, "background", "var(--badge-purple-bg)", "color", "#1C4FC3", "font-weight", "500"], [1, "text-xs", "px-2", "py-0.5", "rounded-full", 2, "background", "var(--surface-subtle)", "color", "var(--text-body)", "font-weight", "500"], [1, "mb-4"], [1, "flex", "items-center", "justify-between", "mb-1"], [1, "text-xs", "font-medium", 2, "color", "var(--text-secondary)"], [1, "text-xs", "font-bold"], [2, "height", "5px", "background", "var(--surface-subtle)", "border-radius", "99px", "overflow", "hidden"], [2, "height", "100%", "border-radius", "99px", "transition", "width 0.6s cubic-bezier(.4,0,.2,1)"], [1, "flex", "items-center", "justify-between", 2, "border-top", "1px solid var(--border-subtle)", "padding-top", "12px"], [1, "text-xs", "font-semibold", 2, "color", "var(--badge-green-text)"], [1, "flex", "items-center", "gap-2"], [1, "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-gray-100", "dark:hover:bg-gray-800", "transition-colors", 2, "width", "28px", "height", "28px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "var(--text-muted)"], ["name", "lucideEye", 3, "size"], [1, "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-purple-50", "dark:hover:bg-gray-800", "transition-colors", 2, "width", "28px", "height", "28px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "#1C4FC3"], ["name", "lucideEdit", 3, "size"]], template: function ProjectsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "Startup Projects");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵelement(9, "ng-icon", 6);
            i0.ɵɵtext(10, " New Project ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 7)(12, "div", 8);
            i0.ɵɵelement(13, "ng-icon", 9);
            i0.ɵɵelementStart(14, "input", 10);
            i0.ɵɵlistener("input", function ProjectsComponent_Template_input_input_14_listener($event) { return ctx.searchQuery.set($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 11);
            i0.ɵɵrepeaterCreate(16, ProjectsComponent_For_17_Template, 2, 7, "button", 12, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 13);
            i0.ɵɵrepeaterCreate(19, ProjectsComponent_For_20_Template, 37, 28, "div", 14, _forTrack0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("", ctx.filtered().length, " projects in the ecosystem");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("size", "13");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.searchQuery());
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.stageFilters);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.filtered());
        } }, dependencies: [NgIconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProjectsComponent, [{
        type: Component,
        args: [{
                selector: 'app-projects',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [NgIconComponent],
                providers: [provideIcons({
                        lucideRocket, lucidePlus, lucideSearch, lucideFilter,
                        lucideStar, lucideEye, lucideEdit, lucideChevronRight,
                        lucideArrowUp, lucideArrowDown, lucideTrendingUp,
                    })],
                template: `
    <div class="page-shell">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h2 class="text-lg font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">Startup Projects</h2>
          <p class="text-xs mt-0.5" style="color:var(--text-secondary);">{{ filtered().length }} projects in the ecosystem</p>
        </div>
        <div class="page-header-actions">
          <button
            class="flex w-full items-center justify-center gap-1.5 rounded-lg border-none text-xs font-semibold cursor-pointer transition-all hover:opacity-90 sm:w-auto"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;"
            aria-label="Add new project"
          >
            <ng-icon name="lucidePlus" [size]="'14'" />
            New Project
          </button>
        </div>
      </div>

      <!-- Filters bar -->
      <div class="filter-toolbar">
        <div class="relative filter-toolbar__grow">
          <ng-icon name="lucideSearch" [size]="'13'" style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--text-muted);" />
          <input
            type="search"
            placeholder="Search startups..."
            aria-label="Search startups"
            [value]="searchQuery()"
            (input)="searchQuery.set($any($event.target).value)"
            class="input-full text-xs rounded-lg border focus:outline-none"
            style="padding:6px 12px 6px 28px; background:var(--surface); border-color:var(--border); font-family:var(--font-sans);"
          />
        </div>

        <div class="chip-scroll">
          @for (f of stageFilters; track f) {
            <button
              (click)="stageFilter.set(f)"
              class="text-xs font-medium rounded-lg cursor-pointer border transition-colors"
              [style.background]="stageFilter() === f ? 'var(--chip-active-bg)' : 'var(--chip-inactive-bg)'"
              [style.color]="stageFilter() === f ? 'var(--chip-active-text)' : 'var(--chip-inactive-text)'"
              [style.border-color]="stageFilter() === f ? 'var(--chip-active-border)' : 'var(--chip-inactive-border)'"
              style="padding:5px 12px;"
            >{{ f }}</button>
          }
        </div>
      </div>

      <!-- Project cards grid -->
      <div class="card-grid-auto">
        @for (s of filtered(); track s.name) {
          <div class="rounded-xl border transition-all hover:shadow-md cursor-pointer group"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04); padding:20px;">

            <!-- Card header -->
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center rounded-xl flex-shrink-0"
                  [style.background]="s.color + '22'"
                  style="width:40px; height:40px; font-size:13px; font-weight:700;"
                  [style.color]="s.color">
                  {{ s.initials }}
                </div>
                <div>
                  <h3 class="text-sm font-bold leading-tight" style="color:var(--text-primary);">{{ s.name }}</h3>
                  <p class="text-xs" style="color:var(--text-muted);">{{ s.founder }}</p>
                </div>
              </div>
              <span class="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                [style.background]="statusBg(s.status)"
                [style.color]="statusColor(s.status)">
                {{ s.status }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-xs leading-relaxed mb-4 line-clamp-2" style="color:var(--text-secondary);">{{ s.description }}</p>

            <!-- Sector + Stage -->
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="text-xs px-2 py-0.5 rounded-full" style="background:var(--badge-purple-bg); color:#1C4FC3; font-weight:500;">{{ s.sector }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full" style="background:var(--surface-subtle); color:var(--text-body); font-weight:500;">{{ s.stage }}</span>
              <span class="text-xs" style="color:var(--text-muted);">· Team: {{ s.team }}</span>
            </div>

            <!-- AI Score bar -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-medium" style="color:var(--text-secondary);">AI Score</span>
                <span class="text-xs font-bold" [style.color]="s.score >= 80 ? 'var(--badge-green-text)' : s.score >= 65 ? 'var(--badge-amber-text)' : 'var(--badge-red-text)'">
                  {{ s.score }}/100
                </span>
              </div>
              <div style="height:5px; background:var(--surface-subtle); border-radius:99px; overflow:hidden;">
                <div style="height:100%; border-radius:99px; transition:width 0.6s cubic-bezier(.4,0,.2,1);"
                  [style.width.%]="s.score"
                  [style.background]="s.score >= 80 ? 'linear-gradient(90deg,#059669,#34D399)' : s.score >= 65 ? 'linear-gradient(90deg,#D97706,#FBBF24)' : 'linear-gradient(90deg,#DC2626,#F87171)'">
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between" style="border-top:1px solid var(--border-subtle); padding-top:12px;">
              <span class="text-xs font-semibold" style="color:var(--badge-green-text);">{{ s.raised }}</span>
              <div class="flex items-center gap-2">
                <button class="flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style="width:28px; height:28px; background:transparent; border:none; cursor:pointer; color:var(--text-muted);"
                  [attr.aria-label]="'View ' + s.name">
                  <ng-icon name="lucideEye" [size]="'14'" />
                </button>
                <button class="flex items-center justify-center rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                  style="width:28px; height:28px; background:transparent; border:none; cursor:pointer; color:#1C4FC3;"
                  [attr.aria-label]="'Edit ' + s.name">
                  <ng-icon name="lucideEdit" [size]="'14'" />
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProjectsComponent, { className: "ProjectsComponent", filePath: "src/app/pages/projects/projects.component.ts", lineNumber: 157 }); })();
