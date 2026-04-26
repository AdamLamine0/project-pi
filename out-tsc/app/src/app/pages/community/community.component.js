import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideUsers, lucideMessageSquare, lucideHeart, lucideEye, lucidePlus, lucideArrowRight, lucideStar, lucideBriefcase, lucideMapPin, lucideCalendar, lucideThumbsUp, } from '@ng-icons/lucide';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.title;
const _forTrack2 = ($index, $item) => $item.name;
function CommunityComponent_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "p", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 3);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.label);
} }
function CommunityComponent_For_21_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function CommunityComponent_For_21_Template_button_click_0_listener() { const cat_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.selectedCategory = cat_r3); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", ctx_r3.selectedCategory === cat_r3 ? "var(--chip-active-bg)" : "var(--chip-inactive-bg)")("color", ctx_r3.selectedCategory === cat_r3 ? "var(--chip-active-text)" : "var(--chip-inactive-text)")("border-color", ctx_r3.selectedCategory === cat_r3 ? "var(--chip-active-border)" : "transparent");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cat_r3);
} }
function CommunityComponent_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 24);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 25)(4, "div", 26)(5, "span", 27);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 28);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "h4", 29);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 30);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 31)(14, "div", 32);
    i0.ɵɵelement(15, "ng-icon", 33);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 32);
    i0.ɵɵelement(18, "ng-icon", 34);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const f_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", f_r5.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", f_r5.initials, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(f_r5.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(f_r5.time);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(f_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("by ", f_r5.author);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", "12");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", f_r5.replies, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "12");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", f_r5.views, " ");
} }
function CommunityComponent_For_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "div", 24);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 25)(4, "p", 35);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 36);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 37);
    i0.ɵɵelement(9, "ng-icon", 38);
    i0.ɵɵelementStart(10, "span", 39);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const m_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", m_r6.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", m_r6.initials, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(m_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r6.role);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r6.rating);
} }
function CommunityComponent_For_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 40)(2, "span", 41);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 28);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p", 42);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 43)(9, "span", 28);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 44);
    i0.ɵɵelement(12, "ng-icon", 45);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const o_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", o_r7.type === "Job" ? "var(--badge-blue-bg)" : o_r7.type === "Internship" ? "var(--badge-green-bg)" : "var(--badge-purple-bg)")("color", o_r7.type === "Job" ? "var(--badge-blue-text)" : o_r7.type === "Internship" ? "var(--badge-green-text)" : "var(--badge-purple-text)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", o_r7.type, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(o_r7.tag);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(o_r7.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(o_r7.company);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "10");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", o_r7.location, " ");
} }
export class CommunityComponent {
    selectedCategory = 'All';
    categories = ['All', 'FinTech', 'CleanTech', 'EdTech'];
    communityStats = [
        { label: 'Members', value: '1,247' },
        { label: 'Discussions', value: '384' },
        { label: 'Resources', value: '156' },
        { label: 'Events', value: '28' },
    ];
    forums = [
        { title: 'How to structure your first angel round?', category: 'FinTech', replies: 24, views: 312, author: 'Karim B.', initials: 'KB', color: '#1C4FC3', time: '2h ago' },
        { title: 'Best practices for solar project permitting in DZ', category: 'CleanTech', replies: 11, views: 178, author: 'Amira T.', initials: 'AT', color: '#059669', time: '5h ago' },
        { title: 'Adaptive learning vs. gamification for retention', category: 'EdTech', replies: 18, views: 240, author: 'Nadia C.', initials: 'NC', color: '#EC4899', time: '1d ago' },
        { title: 'Tips for navigating the startup label process', category: 'All', replies: 32, views: 445, author: 'Riad F.', initials: 'RF', color: '#1D1384', time: '2d ago' },
        { title: 'Cybersecurity fundamentals for non-tech founders', category: 'All', replies: 9, views: 130, author: 'Meriem B.', initials: 'MB', color: '#0891B2', time: '3d ago' },
    ];
    topMembers = [
        { name: 'Sarah Chen', role: 'Investment Advisor', company: 'NA Ventures', initials: 'SC', color: '#1C4FC3', rating: 4.9 },
        { name: 'Ahmed Belkacemi', role: 'Tech Strategist', company: 'TechHub DZ', initials: 'AB', color: '#1D1384', rating: 4.8 },
        { name: 'Marie Leclerc', role: 'Legal Consultant', company: 'LexAfrica', initials: 'ML', color: '#059669', rating: 4.7 },
        { name: 'Omar Ladraa', role: 'Startup Founder', company: 'LogiTrack', initials: 'OL', color: '#D97706', rating: 4.6 },
    ];
    opportunities = [
        { title: 'Full-Stack Developer', type: 'Job', company: 'TechFlow', location: 'Algiers', tag: 'Remote OK' },
        { title: 'Product Design Intern', type: 'Internship', company: 'EduHub', location: 'Tunis', tag: '3 months' },
        { title: 'Growth Partnership', type: 'Partner', company: 'GreenVenture', location: 'Casablanca', tag: 'CleanTech' },
    ];
    static ɵfac = function CommunityComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommunityComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommunityComponent, selectors: [["app-community"]], features: [i0.ɵɵProvidersFeature([provideIcons({
                    lucideUsers, lucideMessageSquare, lucideHeart, lucideEye,
                    lucidePlus, lucideArrowRight, lucideStar, lucideBriefcase,
                    lucideMapPin, lucideCalendar, lucideThumbsUp,
                })])], decls: 40, vars: 1, consts: [[1, "page-shell"], [1, "page-header"], [1, "text-lg", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.02em"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-secondary)"], [1, "page-header-actions"], [1, "flex", "w-full", "items-center", "justify-center", "gap-1.5", "rounded-lg", "border-none", "text-xs", "font-semibold", "cursor-pointer", "sm:w-auto", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px 16px"], ["name", "lucidePlus", 3, "size"], [1, "stats-grid", "stats-grid--4"], [1, "rounded-xl", "border", "p-4", "text-center", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "split-grid", "split-grid--sidebar"], [1, "rounded-xl", "border", "overflow-hidden", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "flex", "flex-col", "gap-3", "px-5", "py-4", "sm:flex-row", "sm:items-center", "sm:justify-between", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "text-sm", "font-bold", 2, "color", "var(--text-primary)"], [1, "chip-scroll"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "3px 10px", 3, "background", "color", "border-color"], [1, "divide-y", 2, "divide-color", "var(--border-subtle)"], [1, "flex", "flex-col", "gap-3", "px-5", "py-4", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", "cursor-pointer", "sm:flex-row", "sm:items-start", "sm:gap-4"], [1, "flex", "flex-col", "gap-4"], [1, "rounded-xl", "border", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "flex", "items-center", "gap-3", "px-5", "py-3", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors"], [1, "px-5", "py-3", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", "cursor-pointer"], [1, "text-2xl", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.03em"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "3px 10px", 3, "click"], [1, "flex", "items-center", "justify-center", "rounded-full", "flex-shrink-0", 2, "width", "34px", "height", "34px", "color", "#fff", "font-size", "11px", "font-weight", "700"], [1, "flex-1", "min-w-0"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mb-0.5"], [1, "text-xs", "font-medium", "px-1.5", "py-0.5", "rounded", 2, "background", "var(--badge-purple-bg)", "color", "#1C4FC3"], [1, "text-xs", 2, "color", "var(--text-muted)"], [1, "text-sm", "font-semibold", "truncate", 2, "color", "var(--text-primary)"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-muted)"], [1, "flex", "items-center", "gap-4", "flex-shrink-0", "sm:self-center"], [1, "flex", "items-center", "gap-1", "text-xs", 2, "color", "var(--text-muted)"], ["name", "lucideMessageSquare", 3, "size"], ["name", "lucideEye", 3, "size"], [1, "text-xs", "font-semibold", "leading-tight", "truncate", 2, "color", "var(--text-primary)"], [1, "text-xs", "truncate", 2, "color", "var(--text-muted)"], [1, "flex", "items-center", "gap-0.5", "flex-shrink-0"], ["name", "lucideStar", 2, "color", "var(--badge-amber-text)", 3, "size"], [1, "text-xs", "font-semibold", 2, "color", "var(--badge-amber-text)"], [1, "flex", "items-center", "gap-1.5", "mb-1"], [1, "text-xs", "font-medium", "px-1.5", "py-0.5", "rounded"], [1, "text-xs", "font-semibold", 2, "color", "var(--text-primary)"], [1, "flex", "items-center", "gap-2", "mt-0.5"], [1, "text-xs", "flex", "items-center", "gap-0.5", 2, "color", "var(--text-muted)"], ["name", "lucideMapPin", 3, "size"]], template: function CommunityComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "Community & Network");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Connect, share and grow with the ecosystem");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵelement(9, "ng-icon", 6);
            i0.ɵɵtext(10, " New Discussion ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 7);
            i0.ɵɵrepeaterCreate(12, CommunityComponent_For_13_Template, 5, 2, "div", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "h3", 12);
            i0.ɵɵtext(18, "Forum Discussions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13);
            i0.ɵɵrepeaterCreate(20, CommunityComponent_For_21_Template, 2, 7, "button", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 15);
            i0.ɵɵrepeaterCreate(23, CommunityComponent_For_24_Template, 20, 11, "div", 16, _forTrack1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 17)(26, "div", 18)(27, "div", 19)(28, "h3", 12);
            i0.ɵɵtext(29, "Top Members");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 15);
            i0.ɵɵrepeaterCreate(31, CommunityComponent_For_32_Template, 12, 7, "div", 20, _forTrack2);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 18)(34, "div", 19)(35, "h3", 12);
            i0.ɵɵtext(36, "Opportunities");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 15);
            i0.ɵɵrepeaterCreate(38, CommunityComponent_For_39_Template, 14, 10, "div", 21, _forTrack1);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.communityStats);
            i0.ɵɵadvance(8);
            i0.ɵɵrepeater(ctx.categories);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.forums);
            i0.ɵɵadvance(8);
            i0.ɵɵrepeater(ctx.topMembers);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.opportunities);
        } }, dependencies: [NgIconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommunityComponent, [{
        type: Component,
        args: [{
                selector: 'app-community',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [NgIconComponent],
                providers: [provideIcons({
                        lucideUsers, lucideMessageSquare, lucideHeart, lucideEye,
                        lucidePlus, lucideArrowRight, lucideStar, lucideBriefcase,
                        lucideMapPin, lucideCalendar, lucideThumbsUp,
                    })],
                template: `
    <div class="page-shell">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h2 class="text-lg font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">Community &amp; Network</h2>
          <p class="text-xs mt-0.5" style="color:var(--text-secondary);">Connect, share and grow with the ecosystem</p>
        </div>
        <div class="page-header-actions">
          <button class="flex w-full items-center justify-center gap-1.5 rounded-lg border-none text-xs font-semibold cursor-pointer sm:w-auto"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;">
            <ng-icon name="lucidePlus" [size]="'14'" />
            New Discussion
          </button>
        </div>
      </div>

      <!-- Stats row -->
      <div class="stats-grid stats-grid--4">
        @for (s of communityStats; track s.label) {
          <div class="rounded-xl border p-4 text-center"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <p class="text-2xl font-bold" style="color:var(--text-primary); letter-spacing:-0.03em;">{{ s.value }}</p>
            <p class="text-xs mt-0.5" style="color:var(--text-secondary);">{{ s.label }}</p>
          </div>
        }
      </div>

      <!-- Two column layout -->
      <div class="split-grid split-grid--sidebar">

        <!-- Forum discussions -->
        <div class="rounded-xl border overflow-hidden"
          style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
          <div class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between" style="border-bottom:1px solid var(--border-subtle);">
            <h3 class="text-sm font-bold" style="color:var(--text-primary);">Forum Discussions</h3>
            <div class="chip-scroll">
              @for (cat of categories; track cat) {
                <button
                  (click)="selectedCategory = cat"
                  class="text-xs font-medium rounded-lg cursor-pointer border transition-colors"
                  [style.background]="selectedCategory === cat ? 'var(--chip-active-bg)' : 'var(--chip-inactive-bg)'"
                  [style.color]="selectedCategory === cat ? 'var(--chip-active-text)' : 'var(--chip-inactive-text)'"
                  [style.border-color]="selectedCategory === cat ? 'var(--chip-active-border)' : 'transparent'"
                  style="padding:3px 10px;">{{ cat }}</button>
              }
            </div>
          </div>
          <div class="divide-y" style="divide-color:var(--border-subtle);">
            @for (f of forums; track f.title) {
              <div class="flex flex-col gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer sm:flex-row sm:items-start sm:gap-4">
                <div class="flex items-center justify-center rounded-full flex-shrink-0"
                  [style.background]="f.color"
                  style="width:34px; height:34px; color:#fff; font-size:11px; font-weight:700;">
                  {{ f.initials }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-0.5">
                    <span class="text-xs font-medium px-1.5 py-0.5 rounded" style="background:var(--badge-purple-bg); color:#1C4FC3;">{{ f.category }}</span>
                    <span class="text-xs" style="color:var(--text-muted);">{{ f.time }}</span>
                  </div>
                  <h4 class="text-sm font-semibold truncate" style="color:var(--text-primary);">{{ f.title }}</h4>
                  <p class="text-xs mt-0.5" style="color:var(--text-muted);">by {{ f.author }}</p>
                </div>
                <div class="flex items-center gap-4 flex-shrink-0 sm:self-center">
                  <div class="flex items-center gap-1 text-xs" style="color:var(--text-muted);">
                    <ng-icon name="lucideMessageSquare" [size]="'12'" />
                    {{ f.replies }}
                  </div>
                  <div class="flex items-center gap-1 text-xs" style="color:var(--text-muted);">
                    <ng-icon name="lucideEye" [size]="'12'" />
                    {{ f.views }}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Right column: Members + Opportunities -->
        <div class="flex flex-col gap-4">

          <!-- Top Members -->
          <div class="rounded-xl border"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <div class="px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
              <h3 class="text-sm font-bold" style="color:var(--text-primary);">Top Members</h3>
            </div>
            <div class="divide-y" style="divide-color:var(--border-subtle);">
              @for (m of topMembers; track m.name) {
                <div class="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div class="flex items-center justify-center rounded-full flex-shrink-0"
                    [style.background]="m.color"
                    style="width:34px; height:34px; color:#fff; font-size:11px; font-weight:700;">
                    {{ m.initials }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold leading-tight truncate" style="color:var(--text-primary);">{{ m.name }}</p>
                    <p class="text-xs truncate" style="color:var(--text-muted);">{{ m.role }}</p>
                  </div>
                  <div class="flex items-center gap-0.5 flex-shrink-0">
                    <ng-icon name="lucideStar" [size]="'11'" style="color:var(--badge-amber-text);" />
                    <span class="text-xs font-semibold" style="color:var(--badge-amber-text);">{{ m.rating }}</span>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Opportunities marketplace -->
          <div class="rounded-xl border"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <div class="px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
              <h3 class="text-sm font-bold" style="color:var(--text-primary);">Opportunities</h3>
            </div>
            <div class="divide-y" style="divide-color:var(--border-subtle);">
              @for (o of opportunities; track o.title) {
                <div class="px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <div class="flex items-center gap-1.5 mb-1">
                    <span class="text-xs font-medium px-1.5 py-0.5 rounded"
                      [style.background]="o.type === 'Job' ? 'var(--badge-blue-bg)' : o.type === 'Internship' ? 'var(--badge-green-bg)' : 'var(--badge-purple-bg)'"
                      [style.color]="o.type === 'Job' ? 'var(--badge-blue-text)' : o.type === 'Internship' ? 'var(--badge-green-text)' : 'var(--badge-purple-text)'">
                      {{ o.type }}
                    </span>
                    <span class="text-xs" style="color:var(--text-muted);">{{ o.tag }}</span>
                  </div>
                  <p class="text-xs font-semibold" style="color:var(--text-primary);">{{ o.title }}</p>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs" style="color:var(--text-muted);">{{ o.company }}</span>
                    <span class="text-xs flex items-center gap-0.5" style="color:var(--text-muted);">
                      <ng-icon name="lucideMapPin" [size]="'10'" /> {{ o.location }}
                    </span>
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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommunityComponent, { className: "CommunityComponent", filePath: "src/app/pages/community/community.component.ts", lineNumber: 165 }); })();
