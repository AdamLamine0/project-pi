import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideRocket, lucideUsers, lucideTrendingUp, lucideCalendar, lucideArrowUp, lucideArrowRight, lucideMapPin, lucideVideo, lucideActivity, lucideMessageSquare, lucideStar, } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmProgressImports } from '@spartan-ng/helm/progress';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.name;
const _forTrack2 = ($index, $item) => $item.title;
const _forTrack3 = ($index, $item) => $item.time;
function HomeComponent_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 28)(2, "span", 29);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 30);
    i0.ɵɵelement(5, "ng-icon", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 32)(7, "span", 33);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 34);
    i0.ɵɵelement(10, "ng-icon", 35);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(stat_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", stat_r1.bg);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", stat_r1.color);
    i0.ɵɵproperty("name", stat_r1.icon)("size", "16");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(stat_r1.value);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", stat_r1.up ? "var(--badge-green-text)" : "var(--badge-red-text)");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("transform", stat_r1.up ? "" : "rotate(180deg)");
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", stat_r1.delta, " ");
} }
function HomeComponent_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 20)(1, "td", 36)(2, "div")(3, "p", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 38);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "td", 39)(8, "span", 40);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td", 41);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 39)(13, "div", 42)(14, "span", 43);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 44);
    i0.ɵɵelement(17, "div", 45);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "td", 39)(19, "span", 46);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r2 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(s_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r2.founder);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", s_r2.sector, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r2.stage);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("color", s_r2.score >= 80 ? "var(--badge-green-text)" : s_r2.score >= 65 ? "var(--badge-amber-text)" : "var(--badge-red-text)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r2.score, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", s_r2.score, "%")("background", s_r2.score >= 80 ? "var(--badge-green-text)" : s_r2.score >= 65 ? "var(--badge-amber-text)" : "var(--badge-red-text)");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", s_r2.status === "Active" ? "var(--badge-green-bg)" : s_r2.status === "Review" ? "var(--badge-amber-bg)" : "var(--badge-blue-bg)")("color", s_r2.status === "Active" ? "var(--badge-green-text)" : s_r2.status === "Review" ? "var(--badge-amber-text)" : "var(--badge-blue-text)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r2.status, " ");
} }
function HomeComponent_For_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "div", 47);
    i0.ɵɵelement(2, "ng-icon", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 49)(4, "p", 50);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 51);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 52);
    i0.ɵɵelement(9, "ng-icon", 53);
    i0.ɵɵelementStart(10, "span", 38);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "span", 54);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const event_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", event_r3.icon)("size", "16");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(event_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", event_r3.date, " \u00B7 ", event_r3.time);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "10");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", event_r3.attendees, " registered");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r3.type);
} }
function HomeComponent_For_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 55);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 49)(4, "p", 56)(5, "span", 57);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 51);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const a_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", a_r4.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", a_r4.initials, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(a_r4.user);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", a_r4.action, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r4.time);
} }
export class HomeComponent {
    stats = [
        { label: 'Total Startups', value: '48', delta: '+3 this month', up: true, icon: 'lucideRocket', color: 'var(--badge-purple-text)', bg: 'var(--badge-purple-bg)' },
        { label: 'Active Mentors', value: '127', delta: '+8 this month', up: true, icon: 'lucideUsers', color: 'var(--badge-blue-text)', bg: 'var(--badge-blue-bg)' },
        { label: 'Investments Matched', value: '23', delta: '+2 this week', up: true, icon: 'lucideTrendingUp', color: 'var(--badge-green-text)', bg: 'var(--badge-green-bg)' },
        { label: 'Events This Month', value: '12', delta: '-1 vs last', up: false, icon: 'lucideCalendar', color: 'var(--badge-amber-text)', bg: 'var(--badge-amber-bg)' },
    ];
    startups = [
        { name: 'TechFlow', sector: 'FinTech', stage: 'Seed', score: 87, status: 'Active', founder: 'Karim Bensalem' },
        { name: 'GreenVenture', sector: 'CleanTech', stage: 'Pre-seed', score: 72, status: 'Review', founder: 'Amira Tounsi' },
        { name: 'MedConnect', sector: 'HealthTech', stage: 'Series A', score: 91, status: 'Active', founder: 'Sofia Mansouri' },
        { name: 'AgriSmart', sector: 'AgriTech', stage: 'Pre-seed', score: 64, status: 'Review', founder: 'Yacine Hamdi' },
        { name: 'EduHub', sector: 'EdTech', stage: 'Seed', score: 78, status: 'Active', founder: 'Nadia Cherouk' },
        { name: 'LogiTrack', sector: 'Logistics', stage: 'Series A', score: 85, status: 'Active', founder: 'Omar Ladraa' },
    ];
    upcomingEvents = [
        { title: 'Pitch Day Spring 2026', type: 'Pitch', date: 'Apr 10', time: '14:00', attendees: 87, icon: 'lucideRocket' },
        { title: 'Fundraising Workshop', type: 'Workshop', date: 'Apr 15', time: '10:00', attendees: 42, icon: 'lucideActivity' },
        { title: 'AI in Startups Webinar', type: 'Webinar', date: 'Apr 20', time: '18:00', attendees: 134, icon: 'lucideVideo' },
    ];
    activity = [
        { user: 'Karim B.', action: 'submitted a new project update for TechFlow.', time: '2 min ago', initials: 'KB', color: '#1C4FC3' },
        { user: 'Sarah C.', action: 'scheduled a mentoring session with EduHub.', time: '18 min ago', initials: 'SC', color: '#1D1384' },
        { user: 'Na Ventures', action: 'expressed interest in MedConnect.', time: '1h ago', initials: 'NV', color: '#059669' },
        { user: 'Amira T.', action: 'posted in the CleanTech community forum.', time: '3h ago', initials: 'AT', color: '#D97706' },
    ];
    static ɵfac = function HomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeComponent, selectors: [["app-home"]], features: [i0.ɵɵProvidersFeature([provideIcons({
                    lucideRocket, lucideUsers, lucideTrendingUp, lucideCalendar,
                    lucideArrowUp, lucideArrowRight, lucideMapPin, lucideVideo,
                    lucideActivity, lucideMessageSquare, lucideStar,
                })])], decls: 57, vars: 3, consts: [[1, "page-shell"], [1, "page-header"], [1, "text-xl", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.02em"], [1, "text-sm", "mt-0.5", 2, "color", "var(--text-secondary)"], [1, "page-header-actions"], ["routerLink", "/projects", 1, "flex", "w-full", "items-center", "justify-center", "gap-1.5", "rounded-lg", "text-xs", "font-semibold", "transition-all", "hover:shadow-md", "sm:w-auto", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px 16px"], ["name", "lucideRocket", 3, "size"], [1, "stats-grid", "stats-grid--4"], [1, "rounded-xl", "p-5", "border", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "split-grid", "split-grid--dashboard"], [1, "rounded-xl", "border", "overflow-hidden", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "flex", "items-center", "justify-between", "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "text-sm", "font-bold", 2, "color", "var(--text-primary)"], ["routerLink", "/projects", 1, "text-xs", "font-semibold", "flex", "items-center", "gap-1", 2, "color", "#1C4FC3"], ["name", "lucideArrowRight", 3, "size"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [2, "background", "var(--surface-subtle)"], [1, "text-left", "px-5", "py-2.5", "text-xs", "font-semibold", 2, "color", "var(--text-secondary)"], [1, "text-left", "px-3", "py-2.5", "text-xs", "font-semibold", 2, "color", "var(--text-secondary)"], [1, "border-t", "transition-colors", "hover:bg-gray-50", "dark:hover:bg-gray-800", 2, "border-color", "var(--border-subtle)"], [1, "flex", "flex-col", "gap-4"], [1, "rounded-xl", "border", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], ["routerLink", "/events", 1, "text-xs", "font-semibold", "flex", "items-center", "gap-1", 2, "color", "#1C4FC3"], [1, "divide-y", 2, "divide-color", "var(--border-subtle)"], [1, "flex", "gap-3", "px-5", "py-3", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors"], [1, "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "flex", "items-start", "gap-3", "px-5", "py-3"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-xs", "font-medium", 2, "color", "var(--text-secondary)"], [1, "flex", "items-center", "justify-center", "rounded-lg", 2, "width", "34px", "height", "34px"], [3, "name", "size"], [1, "flex", "items-end", "gap-2"], [1, "text-2xl", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.03em"], [1, "text-xs", "font-medium", "mb-0.5", "flex", "items-center", "gap-0.5"], ["name", "lucideArrowUp", 3, "size"], [1, "px-5", "py-3"], [1, "text-xs", "font-semibold", 2, "color", "var(--text-primary)"], [1, "text-xs", 2, "color", "var(--text-muted)"], [1, "px-3", "py-3"], [1, "text-xs", "px-2", "py-0.5", "rounded-full", 2, "background", "var(--badge-purple-bg)", "color", "var(--badge-purple-text)", "font-weight", "500"], [1, "px-3", "py-3", "text-xs", 2, "color", "var(--text-secondary)", "font-weight", "500"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "font-bold"], [2, "width", "40px", "height", "4px", "background", "var(--surface-subtle)", "border-radius", "99px", "overflow", "hidden"], [2, "height", "100%", "border-radius", "99px", "transition", "width 0.3s"], [1, "text-xs", "font-medium", "px-2", "py-0.5", "rounded-full"], [1, "flex", "items-center", "justify-center", "rounded-lg", "flex-shrink-0", 2, "width", "36px", "height", "36px", "background", "var(--badge-purple-bg)"], [2, "color", "var(--badge-purple-text)", 3, "name", "size"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-semibold", "leading-tight", "truncate", 2, "color", "var(--text-primary)"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-muted)"], [1, "flex", "items-center", "gap-1", "mt-0.5"], ["name", "lucideUsers", 2, "color", "var(--text-muted)", 3, "size"], [1, "text-xs", "font-medium", "px-1.5", "py-0.5", "rounded", "self-start", "flex-shrink-0", 2, "background", "var(--badge-purple-bg)", "color", "var(--badge-purple-text)"], [1, "flex", "items-center", "justify-center", "rounded-full", "flex-shrink-0", 2, "width", "28px", "height", "28px", "color", "#fff", "font-size", "10px", "font-weight", "700"], [1, "text-xs", "leading-snug", 2, "color", "var(--text-body)"], [1, "font-semibold", 2, "color", "var(--text-primary)"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, " Welcome back, Mohamed Slimane \uD83D\uDC4B ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Here's what's happening across your ecosystem today.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "a", 5);
            i0.ɵɵelement(9, "ng-icon", 6);
            i0.ɵɵtext(10, " New Project ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 7);
            i0.ɵɵrepeaterCreate(12, HomeComponent_For_13_Template, 12, 14, "div", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "h3", 12);
            i0.ɵɵtext(18, "Recent Startups");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "a", 13);
            i0.ɵɵtext(20, " View all ");
            i0.ɵɵelement(21, "ng-icon", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 15)(23, "table", 16)(24, "thead")(25, "tr", 17)(26, "th", 18);
            i0.ɵɵtext(27, "Startup");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "th", 19);
            i0.ɵɵtext(29, "Sector");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "th", 19);
            i0.ɵɵtext(31, "Stage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "th", 19);
            i0.ɵɵtext(33, "AI Score");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "th", 19);
            i0.ɵɵtext(35, "Status");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(36, "tbody");
            i0.ɵɵrepeaterCreate(37, HomeComponent_For_38_Template, 21, 16, "tr", 20, _forTrack1);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(39, "div", 21)(40, "div", 22)(41, "div", 11)(42, "h3", 12);
            i0.ɵɵtext(43, "Upcoming Events");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "a", 23);
            i0.ɵɵtext(45, " View all ");
            i0.ɵɵelement(46, "ng-icon", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "div", 24);
            i0.ɵɵrepeaterCreate(48, HomeComponent_For_49_Template, 14, 8, "div", 25, _forTrack2);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 22)(51, "div", 26)(52, "h3", 12);
            i0.ɵɵtext(53, "Recent Activity");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "div", 24);
            i0.ɵɵrepeaterCreate(55, HomeComponent_For_56_Template, 10, 6, "div", 27, _forTrack3);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.stats);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "12");
            i0.ɵɵadvance(16);
            i0.ɵɵrepeater(ctx.startups);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "12");
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.upcomingEvents);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.activity);
        } }, dependencies: [NgIconComponent, RouterLink], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeComponent, [{
        type: Component,
        args: [{
                selector: 'app-home',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [NgIconComponent, RouterLink, HlmBadgeImports, HlmProgressImports],
                providers: [provideIcons({
                        lucideRocket, lucideUsers, lucideTrendingUp, lucideCalendar,
                        lucideArrowUp, lucideArrowRight, lucideMapPin, lucideVideo,
                        lucideActivity, lucideMessageSquare, lucideStar,
                    })],
                template: `
    <div class="page-shell">
      <!-- Welcome -->
      <div class="page-header">
        <div>
          <h2 class="text-xl font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">
            Welcome back, Mohamed Slimane 👋
          </h2>
          <p class="text-sm mt-0.5" style="color:var(--text-secondary);">Here's what's happening across your ecosystem today.</p>
        </div>
        <div class="page-header-actions">
          <a routerLink="/projects"
            class="flex w-full items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-all hover:shadow-md sm:w-auto"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;">
            <ng-icon name="lucideRocket" [size]="'14'" />
            New Project
          </a>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="stats-grid stats-grid--4">
        @for (stat of stats; track stat.label) {
          <div class="rounded-xl p-5 border"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-medium" style="color:var(--text-secondary);">{{ stat.label }}</span>
              <div class="flex items-center justify-center rounded-lg"
                style="width:34px; height:34px;"
                [style.background]="stat.bg">
                <ng-icon [name]="stat.icon" [size]="'16'" [style.color]="stat.color" />
              </div>
            </div>
            <div class="flex items-end gap-2">
              <span class="text-2xl font-bold" style="color:var(--text-primary); letter-spacing:-0.03em;">{{ stat.value }}</span>
              <span class="text-xs font-medium mb-0.5 flex items-center gap-0.5"
                [style.color]="stat.up ? 'var(--badge-green-text)' : 'var(--badge-red-text)'">
                <ng-icon name="lucideArrowUp" [size]="'11'" [style.transform]="stat.up ? '' : 'rotate(180deg)'" />
                {{ stat.delta }}
              </span>
            </div>
          </div>
        }
      </div>

      <!-- Two column layout -->
      <div class="split-grid split-grid--dashboard">

        <!-- Startups table -->
        <div class="rounded-xl border overflow-hidden"
          style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
            <h3 class="text-sm font-bold" style="color:var(--text-primary);">Recent Startups</h3>
            <a routerLink="/projects" class="text-xs font-semibold flex items-center gap-1" style="color:#1C4FC3;">
              View all <ng-icon name="lucideArrowRight" [size]="'12'" />
            </a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr style="background:var(--surface-subtle);">
                  <th class="text-left px-5 py-2.5 text-xs font-semibold" style="color:var(--text-secondary);">Startup</th>
                  <th class="text-left px-3 py-2.5 text-xs font-semibold" style="color:var(--text-secondary);">Sector</th>
                  <th class="text-left px-3 py-2.5 text-xs font-semibold" style="color:var(--text-secondary);">Stage</th>
                  <th class="text-left px-3 py-2.5 text-xs font-semibold" style="color:var(--text-secondary);">AI Score</th>
                  <th class="text-left px-3 py-2.5 text-xs font-semibold" style="color:var(--text-secondary);">Status</th>
                </tr>
              </thead>
              <tbody>
                @for (s of startups; track s.name) {
                  <tr class="border-t transition-colors hover:bg-gray-50 dark:hover:bg-gray-800" style="border-color:var(--border-subtle);">
                    <td class="px-5 py-3">
                      <div>
                        <p class="text-xs font-semibold" style="color:var(--text-primary);">{{ s.name }}</p>
                        <p class="text-xs" style="color:var(--text-muted);">{{ s.founder }}</p>
                      </div>
                    </td>
                    <td class="px-3 py-3">
                      <span class="text-xs px-2 py-0.5 rounded-full" style="background:var(--badge-purple-bg); color:var(--badge-purple-text); font-weight:500;">
                        {{ s.sector }}
                      </span>
                    </td>
                    <td class="px-3 py-3 text-xs" style="color:var(--text-secondary); font-weight:500;">{{ s.stage }}</td>
                    <td class="px-3 py-3">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold" [style.color]="s.score >= 80 ? 'var(--badge-green-text)' : s.score >= 65 ? 'var(--badge-amber-text)' : 'var(--badge-red-text)'">
                          {{ s.score }}
                        </span>
                        <div style="width:40px; height:4px; background:var(--surface-subtle); border-radius:99px; overflow:hidden;">
                          <div style="height:100%; border-radius:99px; transition:width 0.3s;"
                            [style.width.%]="s.score"
                            [style.background]="s.score >= 80 ? 'var(--badge-green-text)' : s.score >= 65 ? 'var(--badge-amber-text)' : 'var(--badge-red-text)'">
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-3">
                      <span class="text-xs font-medium px-2 py-0.5 rounded-full"
                        [style.background]="s.status === 'Active' ? 'var(--badge-green-bg)' : s.status === 'Review' ? 'var(--badge-amber-bg)' : 'var(--badge-blue-bg)'"
                        [style.color]="s.status === 'Active' ? 'var(--badge-green-text)' : s.status === 'Review' ? 'var(--badge-amber-text)' : 'var(--badge-blue-text)'">
                        {{ s.status }}
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right column -->
        <div class="flex flex-col gap-4">

          <!-- Upcoming events -->
          <div class="rounded-xl border"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
              <h3 class="text-sm font-bold" style="color:var(--text-primary);">Upcoming Events</h3>
              <a routerLink="/events" class="text-xs font-semibold flex items-center gap-1" style="color:#1C4FC3;">
                View all <ng-icon name="lucideArrowRight" [size]="'12'" />
              </a>
            </div>
            <div class="divide-y" style="divide-color:var(--border-subtle);">
              @for (event of upcomingEvents; track event.title) {
                <div class="flex gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div class="flex items-center justify-center rounded-lg flex-shrink-0"
                    style="width:36px; height:36px; background:var(--badge-purple-bg);">
                    <ng-icon [name]="event.icon" [size]="'16'" style="color:var(--badge-purple-text);" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold leading-tight truncate" style="color:var(--text-primary);">{{ event.title }}</p>
                    <p class="text-xs mt-0.5" style="color:var(--text-muted);">{{ event.date }} · {{ event.time }}</p>
                    <div class="flex items-center gap-1 mt-0.5">
                      <ng-icon name="lucideUsers" [size]="'10'" style="color:var(--text-muted);" />
                      <span class="text-xs" style="color:var(--text-muted);">{{ event.attendees }} registered</span>
                    </div>
                  </div>
                  <span class="text-xs font-medium px-1.5 py-0.5 rounded self-start flex-shrink-0"
                    style="background:var(--badge-purple-bg); color:var(--badge-purple-text);">{{ event.type }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Community activity -->
          <div class="rounded-xl border"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <div class="px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
              <h3 class="text-sm font-bold" style="color:var(--text-primary);">Recent Activity</h3>
            </div>
            <div class="divide-y" style="divide-color:var(--border-subtle);">
              @for (a of activity; track a.time) {
                <div class="flex items-start gap-3 px-5 py-3">
                  <div class="flex items-center justify-center rounded-full flex-shrink-0"
                    [style.background]="a.color"
                    style="width:28px; height:28px; color:#fff; font-size:10px; font-weight:700;">
                    {{ a.initials }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs leading-snug" style="color:var(--text-body);">
                      <span class="font-semibold" style="color:var(--text-primary);">{{ a.user }}</span>
                      {{ a.action }}
                    </p>
                    <p class="text-xs mt-0.5" style="color:var(--text-muted);">{{ a.time }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/pages/home/home.component.ts", lineNumber: 200 }); })();
