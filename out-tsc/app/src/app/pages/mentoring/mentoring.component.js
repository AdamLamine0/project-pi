import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideGraduationCap, lucidePlus, lucideCalendar, lucideClock, lucideMessageSquare, lucideCheck, lucideTarget, lucideStar, lucideUser, lucideVideo, lucideChevronRight, } from '@ng-icons/lucide';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.mentor;
const _forTrack2 = ($index, $item) => $item.date + $item.mentor;
function MentoringComponent_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "p", 19);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 20);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.value);
} }
function MentoringComponent_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 21)(2, "div", 22)(3, "div", 23);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "p", 24);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 25);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 26);
    i0.ɵɵelement(11, "ng-icon", 27);
    i0.ɵɵelementStart(12, "span", 28);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 29)(15, "div", 30)(16, "span", 31);
    i0.ɵɵelement(17, "ng-icon", 32);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 33);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 34);
    i0.ɵɵelement(22, "div", 35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 36)(24, "div", 37);
    i0.ɵɵelement(25, "ng-icon", 38);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 39);
    i0.ɵɵelement(28, "ng-icon", 40);
    i0.ɵɵtext(29, " Join ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const rel_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("background", rel_r2.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", rel_r2.initials, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(rel_r2.mentor);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(rel_r2.expertise);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "12");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(rel_r2.rating);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Goals: ", rel_r2.goalsCompleted, "/", rel_r2.goals, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.Math.round(rel_r2.goalsCompleted / rel_r2.goals * 100), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", rel_r2.goalsCompleted / rel_r2.goals * 100, "%");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", rel_r2.sessions, " sessions \u00B7 Next: ", rel_r2.nextSession, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "12");
} }
function MentoringComponent_For_28_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵlistener("click", function MentoringComponent_For_28_Template_button_click_0_listener() { const f_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.sessionFilter = f_r5); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const f_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", ctx_r2.sessionFilter === f_r5 ? "var(--chip-active-bg)" : "var(--chip-inactive-bg)")("color", ctx_r2.sessionFilter === f_r5 ? "var(--chip-active-text)" : "var(--chip-inactive-text)")("border-color", ctx_r2.sessionFilter === f_r5 ? "var(--chip-active-border)" : "transparent");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(f_r5);
} }
function MentoringComponent_For_31_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 43);
} if (rf & 2) {
    i0.ɵɵproperty("size", "16");
} }
function MentoringComponent_For_31_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 44);
} if (rf & 2) {
    i0.ɵɵproperty("size", "16");
} }
function MentoringComponent_For_31_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 45);
} if (rf & 2) {
    i0.ɵɵproperty("size", "16");
} }
function MentoringComponent_For_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "div", 42);
    i0.ɵɵconditionalCreate(2, MentoringComponent_For_31_Conditional_2_Template, 1, 1, "ng-icon", 43)(3, MentoringComponent_For_31_Conditional_3_Template, 1, 1, "ng-icon", 44)(4, MentoringComponent_For_31_Conditional_4_Template, 1, 1, "ng-icon", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 46)(6, "p", 24);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 47);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 47);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "span", 48);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const session_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", session_r6.status === "Scheduled" ? "var(--badge-blue-bg)" : session_r6.status === "Completed" ? "var(--badge-green-bg)" : "var(--badge-red-bg)");
    i0.ɵɵadvance();
    i0.ɵɵconditional(session_r6.status === "Scheduled" ? 2 : session_r6.status === "Completed" ? 3 : 4);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(session_r6.topic);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", session_r6.mentor, " \u00D7 ", session_r6.mentee, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", session_r6.date, " \u00B7 ", session_r6.time, " ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", session_r6.status === "Scheduled" ? "var(--badge-blue-bg)" : session_r6.status === "Completed" ? "var(--badge-green-bg)" : "var(--badge-red-bg)")("color", session_r6.status === "Scheduled" ? "var(--badge-blue-text)" : session_r6.status === "Completed" ? "var(--badge-green-text)" : "var(--badge-red-text)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", session_r6.status, " ");
} }
export class MentoringComponent {
    Math = Math;
    sessionFilter = 'All';
    sessionFilters = ['All', 'Scheduled', 'Completed'];
    mentoringStats = [
        { label: 'Active Mentors', value: '3' },
        { label: 'Total Sessions', value: '24' },
        { label: 'Goals Completed', value: '14' },
        { label: 'Avg. Session Score', value: '4.8' },
    ];
    mentorRelations = [
        { mentor: 'Sarah Chen', expertise: 'Investment & Fundraising', sessions: 8, nextSession: 'Apr 8', initials: 'SC', color: '#1C4FC3', rating: 4.9, goals: 5, goalsCompleted: 4 },
        { mentor: 'Ahmed Belkacemi', expertise: 'Product Strategy & Tech', sessions: 10, nextSession: 'Apr 12', initials: 'AB', color: '#1D1384', rating: 4.8, goals: 6, goalsCompleted: 5 },
        { mentor: 'Marie Leclerc', expertise: 'Legal & Compliance', sessions: 6, nextSession: 'Apr 20', initials: 'ML', color: '#059669', rating: 4.7, goals: 4, goalsCompleted: 3 },
    ];
    sessions = [
        { mentor: 'Sarah Chen', mentee: 'TechFlow', date: 'Apr 8, 2026', time: '14:00', topic: 'Preparing for Series A pitch deck', status: 'Scheduled' },
        { mentor: 'Ahmed Belkacemi', mentee: 'EduHub', date: 'Apr 12, 2026', time: '10:00', topic: 'Product roadmap prioritization Q2', status: 'Scheduled' },
        { mentor: 'Marie Leclerc', mentee: 'MedConnect', date: 'Apr 20, 2026', time: '16:00', topic: 'GDPR compliance for health data', status: 'Scheduled' },
        { mentor: 'Sarah Chen', mentee: 'LogiTrack', date: 'Mar 28, 2026', time: '14:00', topic: 'Investor relations and KPIs', status: 'Completed' },
        { mentor: 'Ahmed Belkacemi', mentee: 'TechFlow', date: 'Mar 21, 2026', time: '11:00', topic: 'API architecture review session', status: 'Completed' },
        { mentor: 'Marie Leclerc', mentee: 'GreenVenture', date: 'Mar 15, 2026', time: '15:00', topic: 'Environmental permit requirements', status: 'Completed' },
        { mentor: 'Sarah Chen', mentee: 'AgriSmart', date: 'Mar 10, 2026', time: '09:00', topic: 'Cancelled by mentor', status: 'Cancelled' },
    ];
    static ɵfac = function MentoringComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MentoringComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MentoringComponent, selectors: [["app-mentoring"]], features: [i0.ɵɵProvidersFeature([provideIcons({
                    lucideGraduationCap, lucidePlus, lucideCalendar, lucideClock,
                    lucideMessageSquare, lucideCheck, lucideTarget, lucideStar,
                    lucideUser, lucideVideo, lucideChevronRight,
                })])], decls: 32, vars: 1, consts: [[1, "page-shell"], [1, "page-header"], [1, "text-lg", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.02em"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-secondary)"], [1, "page-header-actions"], [1, "flex", "w-full", "items-center", "justify-center", "gap-1.5", "rounded-lg", "border-none", "text-xs", "font-semibold", "cursor-pointer", "sm:w-auto", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px 16px"], ["name", "lucidePlus", 3, "size"], [1, "stats-grid", "stats-grid--4"], [1, "rounded-xl", "border", "p-4", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "split-grid", "split-grid--equal"], [1, "rounded-xl", "border", "overflow-hidden", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "text-sm", "font-bold", 2, "color", "var(--text-primary)"], [1, "divide-y", 2, "divide-color", "var(--border-subtle)"], [1, "px-5", "py-4", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", "cursor-pointer"], [1, "flex", "flex-col", "gap-3", "px-5", "py-4", "sm:flex-row", "sm:items-center", "sm:justify-between", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "chip-scroll"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "3px 10px", 3, "background", "color", "border-color"], [1, "flex", "flex-col", "gap-3", "px-5", "py-3.5", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", "sm:flex-row", "sm:items-start", "sm:gap-4"], [1, "text-xs", "font-medium", "mb-1", 2, "color", "var(--text-secondary)"], [1, "text-2xl", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.03em"], [1, "flex", "items-start", "justify-between", "mb-3"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "justify-center", "rounded-full", "flex-shrink-0", 2, "width", "40px", "height", "40px", "color", "#fff", "font-size", "13px", "font-weight", "700"], [1, "text-sm", "font-semibold", 2, "color", "var(--text-primary)"], [1, "text-xs", 2, "color", "var(--text-muted)"], [1, "flex", "items-center", "gap-1"], ["name", "lucideStar", 2, "color", "var(--badge-amber-text)", 3, "size"], [1, "text-xs", "font-bold", 2, "color", "var(--badge-amber-text)"], [1, "mb-3"], [1, "flex", "items-center", "justify-between", "mb-1"], [1, "text-xs", 2, "color", "var(--text-secondary)"], ["name", "lucideTarget", 2, "display", "inline", 3, "size"], [1, "text-xs", "font-semibold", 2, "color", "#1C4FC3"], [2, "height", "4px", "background", "var(--surface-subtle)", "border-radius", "99px", "overflow", "hidden"], [2, "height", "100%", "border-radius", "99px", "background", "linear-gradient(90deg,#1C4FC3,#1D1384)"], [1, "flex", "flex-col", "gap-3", "sm:flex-row", "sm:items-center", "sm:justify-between"], [1, "flex", "items-center", "gap-1", "text-xs", 2, "color", "var(--text-secondary)"], ["name", "lucideCalendar", 3, "size"], [1, "flex", "items-center", "gap-1", "text-xs", "font-semibold", 2, "color", "#1C4FC3", "background", "transparent", "border", "none", "cursor", "pointer"], ["name", "lucideVideo", 3, "size"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "3px 10px", 3, "click"], [1, "flex", "items-center", "justify-center", "rounded-lg", "flex-shrink-0", 2, "width", "38px", "height", "38px"], ["name", "lucideCalendar", 2, "color", "var(--badge-blue-text)", 3, "size"], ["name", "lucideCheck", 2, "color", "var(--badge-green-text)", 3, "size"], ["name", "lucideClock", 2, "color", "var(--badge-red-text)", 3, "size"], [1, "flex-1", "min-w-0"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-muted)"], [1, "text-xs", "font-medium", "px-2", "py-0.5", "rounded-full", "flex-shrink-0", "sm:self-start"]], template: function MentoringComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "Mentoring Sessions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Manage your mentoring relationships and sessions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵelement(9, "ng-icon", 6);
            i0.ɵɵtext(10, " Schedule Session ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 7);
            i0.ɵɵrepeaterCreate(12, MentoringComponent_For_13_Template, 5, 2, "div", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "h3", 12);
            i0.ɵɵtext(18, "My Mentors");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 13);
            i0.ɵɵrepeaterCreate(20, MentoringComponent_For_21_Template, 30, 17, "div", 14, _forTrack1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 10)(23, "div", 15)(24, "h3", 12);
            i0.ɵɵtext(25, "Session History");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 16);
            i0.ɵɵrepeaterCreate(27, MentoringComponent_For_28_Template, 2, 7, "button", 17, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 13);
            i0.ɵɵrepeaterCreate(30, MentoringComponent_For_31_Template, 14, 13, "div", 18, _forTrack2);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.mentoringStats);
            i0.ɵɵadvance(8);
            i0.ɵɵrepeater(ctx.mentorRelations);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.sessionFilters);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.sessions);
        } }, dependencies: [NgIconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MentoringComponent, [{
        type: Component,
        args: [{
                selector: 'app-mentoring',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [NgIconComponent],
                providers: [provideIcons({
                        lucideGraduationCap, lucidePlus, lucideCalendar, lucideClock,
                        lucideMessageSquare, lucideCheck, lucideTarget, lucideStar,
                        lucideUser, lucideVideo, lucideChevronRight,
                    })],
                template: `
    <div class="page-shell">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h2 class="text-lg font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">Mentoring Sessions</h2>
          <p class="text-xs mt-0.5" style="color:var(--text-secondary);">Manage your mentoring relationships and sessions</p>
        </div>
        <div class="page-header-actions">
          <button class="flex w-full items-center justify-center gap-1.5 rounded-lg border-none text-xs font-semibold cursor-pointer sm:w-auto"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;">
            <ng-icon name="lucidePlus" [size]="'14'" />
            Schedule Session
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid stats-grid--4">
        @for (s of mentoringStats; track s.label) {
          <div class="rounded-xl border p-4"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <p class="text-xs font-medium mb-1" style="color:var(--text-secondary);">{{ s.label }}</p>
            <p class="text-2xl font-bold" style="color:var(--text-primary); letter-spacing:-0.03em;">{{ s.value }}</p>
          </div>
        }
      </div>

      <!-- Two column -->
      <div class="split-grid split-grid--equal">

        <!-- My Mentors -->
        <div class="rounded-xl border overflow-hidden"
          style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
          <div class="px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
            <h3 class="text-sm font-bold" style="color:var(--text-primary);">My Mentors</h3>
          </div>
          <div class="divide-y" style="divide-color:var(--border-subtle);">
            @for (rel of mentorRelations; track rel.mentor) {
              <div class="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center rounded-full flex-shrink-0"
                      [style.background]="rel.color"
                      style="width:40px; height:40px; color:#fff; font-size:13px; font-weight:700;">
                      {{ rel.initials }}
                    </div>
                    <div>
                      <p class="text-sm font-semibold" style="color:var(--text-primary);">{{ rel.mentor }}</p>
                      <p class="text-xs" style="color:var(--text-muted);">{{ rel.expertise }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-1">
                    <ng-icon name="lucideStar" [size]="'12'" style="color:var(--badge-amber-text);" />
                    <span class="text-xs font-bold" style="color:var(--badge-amber-text);">{{ rel.rating }}</span>
                  </div>
                </div>

                <!-- Goals progress -->
                <div class="mb-3">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs" style="color:var(--text-secondary);">
                      <ng-icon name="lucideTarget" [size]="'11'" style="display:inline;" />
                      Goals: {{ rel.goalsCompleted }}/{{ rel.goals }}
                    </span>
                    <span class="text-xs font-semibold" style="color:#1C4FC3;">{{ Math.round((rel.goalsCompleted/rel.goals)*100) }}%</span>
                  </div>
                  <div style="height:4px; background:var(--surface-subtle); border-radius:99px; overflow:hidden;">
                    <div style="height:100%; border-radius:99px; background:linear-gradient(90deg,#1C4FC3,#1D1384);"
                      [style.width.%]="(rel.goalsCompleted/rel.goals)*100">
                    </div>
                  </div>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex items-center gap-1 text-xs" style="color:var(--text-secondary);">
                    <ng-icon name="lucideCalendar" [size]="'11'" />
                    {{ rel.sessions }} sessions · Next: {{ rel.nextSession }}
                  </div>
                  <button class="flex items-center gap-1 text-xs font-semibold"
                    style="color:#1C4FC3; background:transparent; border:none; cursor:pointer;">
                    <ng-icon name="lucideVideo" [size]="'12'" /> Join
                  </button>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Sessions history -->
        <div class="rounded-xl border overflow-hidden"
          style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
          <div class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between" style="border-bottom:1px solid var(--border-subtle);">
            <h3 class="text-sm font-bold" style="color:var(--text-primary);">Session History</h3>
            <div class="chip-scroll">
              @for (f of sessionFilters; track f) {
                <button
                  (click)="sessionFilter = f"
                  class="text-xs font-medium rounded-lg cursor-pointer border transition-colors"
                  [style.background]="sessionFilter === f ? 'var(--chip-active-bg)' : 'var(--chip-inactive-bg)'"
                  [style.color]="sessionFilter === f ? 'var(--chip-active-text)' : 'var(--chip-inactive-text)'"
                  [style.border-color]="sessionFilter === f ? 'var(--chip-active-border)' : 'transparent'"
                  style="padding:3px 10px;">{{ f }}</button>
              }
            </div>
          </div>
          <div class="divide-y" style="divide-color:var(--border-subtle);">
            @for (session of sessions; track session.date + session.mentor) {
              <div class="flex flex-col gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors sm:flex-row sm:items-start sm:gap-4">
                <div class="flex items-center justify-center rounded-lg flex-shrink-0"
                  style="width:38px; height:38px;"
                  [style.background]="session.status === 'Scheduled' ? 'var(--badge-blue-bg)' : session.status === 'Completed' ? 'var(--badge-green-bg)' : 'var(--badge-red-bg)'">
                  @if (session.status === 'Scheduled') {
                    <ng-icon name="lucideCalendar" [size]="'16'" style="color:var(--badge-blue-text);" />
                  } @else if (session.status === 'Completed') {
                    <ng-icon name="lucideCheck" [size]="'16'" style="color:var(--badge-green-text);" />
                  } @else {
                    <ng-icon name="lucideClock" [size]="'16'" style="color:var(--badge-red-text);" />
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold" style="color:var(--text-primary);">{{ session.topic }}</p>
                  <p class="text-xs mt-0.5" style="color:var(--text-muted);">
                    {{ session.mentor }} × {{ session.mentee }}
                  </p>
                  <p class="text-xs mt-0.5" style="color:var(--text-muted);">
                    {{ session.date }} · {{ session.time }}
                  </p>
                </div>
                <span class="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 sm:self-start"
                  [style.background]="session.status === 'Scheduled' ? 'var(--badge-blue-bg)' : session.status === 'Completed' ? 'var(--badge-green-bg)' : 'var(--badge-red-bg)'"
                  [style.color]="session.status === 'Scheduled' ? 'var(--badge-blue-text)' : session.status === 'Completed' ? 'var(--badge-green-text)' : 'var(--badge-red-text)'">
                  {{ session.status }}
                </span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MentoringComponent, { className: "MentoringComponent", filePath: "src/app/pages/mentoring/mentoring.component.ts", lineNumber: 164 }); })();
