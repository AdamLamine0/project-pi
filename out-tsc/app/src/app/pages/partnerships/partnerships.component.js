import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideHandshake, lucidePlus, lucideBuilding, lucideUsers, lucideCalendar, lucideCheck, lucideEdit, lucideTrash, lucideArrowUp, lucideExternalLink, lucideRefreshCw, } from '@ng-icons/lucide';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.name;
function PartnershipsComponent_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 11)(2, "p", 12);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 13);
    i0.ɵɵelement(5, "ng-icon", 14);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 15);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "10");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r1.delta, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.value);
} }
function PartnershipsComponent_For_16_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵelement(1, "ng-icon", 37);
    i0.ɵɵelementStart(2, "span", 38);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const benefit_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(benefit_r2);
} }
function PartnershipsComponent_For_16_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵelement(1, "ng-icon", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("aria-label", "Renew partnership with " + p_r3.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", "13");
} }
function PartnershipsComponent_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 16)(2, "div", 17)(3, "div", 18)(4, "div", 19);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "p", 20);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 21);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "span", 22);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 23)(14, "div", 24)(15, "p", 25);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p", 21);
    i0.ɵɵtext(18, "Students");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 24)(20, "p", 25);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 21);
    i0.ɵɵtext(23, "Startups");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "div", 26)(25, "p", 27);
    i0.ɵɵtext(26, "Benefits");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 28);
    i0.ɵɵrepeaterCreate(28, PartnershipsComponent_For_16_For_29_Template, 4, 2, "div", 29, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 30)(31, "div", 21);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 31)(34, "button", 32);
    i0.ɵɵelement(35, "ng-icon", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(36, PartnershipsComponent_For_16_Conditional_36_Template, 2, 2, "button", 34);
    i0.ɵɵelementStart(37, "button", 35);
    i0.ɵɵelement(38, "ng-icon", 36);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const p_r3 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("background", p_r3.color + "22")("color", p_r3.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", p_r3.initials, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(p_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", p_r3.type, " \u00B7 ", p_r3.country);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", p_r3.status === "Active" ? "var(--badge-green-bg)" : p_r3.status === "Pending" ? "var(--badge-amber-bg)" : "var(--badge-red-bg)")("color", p_r3.status === "Active" ? "var(--badge-green-text)" : p_r3.status === "Pending" ? "var(--badge-amber-text)" : "var(--badge-red-text)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", p_r3.status, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r3.students);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(p_r3.startups);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(p_r3.benefits);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" Since ", p_r3.since, " \u00B7 Expires ", p_r3.expires, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", "Edit partnership with " + p_r3.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", "13");
    i0.ɵɵadvance();
    i0.ɵɵconditional(p_r3.status !== "Active" ? 36 : -1);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "View partnership details with " + p_r3.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", "13");
} }
export class PartnershipsComponent {
    partnerStats = [
        { label: 'Active Partners', value: '12', delta: '+2' },
        { label: 'Total Students', value: '847', delta: '+124' },
        { label: 'Linked Startups', value: '34', delta: '+6' },
        { label: 'Conventions Active', value: '8', delta: '+1' },
    ];
    partners = [
        {
            name: 'University of Algiers', type: 'University', country: 'Algeria', status: 'Active',
            since: 'Sep 2024', expires: 'Sep 2026', students: 320, startups: 12,
            initials: 'UA', color: '#1C4FC3',
            benefits: ['Access to innovation lab', 'Startup bootcamp programs', 'Co-mentoring with professors'],
        },
        {
            name: 'ITIC Incubator', type: 'Incubator', country: 'Algeria', status: 'Active',
            since: 'Jan 2025', expires: 'Jan 2027', students: 0, startups: 18,
            initials: 'IT', color: '#1D1384',
            benefits: ['Co-working space access', 'Joint pitch events', 'Shared investor network'],
        },
        {
            name: 'Startup Lab Morocco', type: 'Accelerator', country: 'Morocco', status: 'Active',
            since: 'Mar 2025', expires: 'Mar 2027', students: 85, startups: 9,
            initials: 'MS', color: '#059669',
            benefits: ['Cross-border market access', 'Joint funding rounds', 'Regional network'],
        },
        {
            name: 'Enabel Belgium', type: 'NGO', country: 'Belgium', status: 'Active',
            since: 'Jun 2024', expires: 'Jun 2026', students: 200, startups: 7,
            initials: 'EN', color: '#D97706',
            benefits: ['EU grant access', 'International mentors', 'Tech transfer program'],
        },
        {
            name: 'Tunis Business School', type: 'University', country: 'Tunisia', status: 'Pending',
            since: '—', expires: '—', students: 0, startups: 0,
            initials: 'TB', color: '#0891B2',
            benefits: ['MBA startup track', 'Research collaboration', 'Alumni network'],
        },
        {
            name: 'GreenHub Accelerator', type: 'Accelerator', country: 'Egypt', status: 'Expired',
            since: 'Jan 2024', expires: 'Jan 2025', students: 42, startups: 4,
            initials: 'GH', color: '#9CA3AF',
            benefits: ['CleanTech focus', 'Regional exposure'],
        },
    ];
    static ɵfac = function PartnershipsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PartnershipsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PartnershipsComponent, selectors: [["app-partnerships"]], features: [i0.ɵɵProvidersFeature([provideIcons({
                    lucideHandshake, lucidePlus, lucideBuilding, lucideUsers,
                    lucideCalendar, lucideCheck, lucideEdit, lucideTrash,
                    lucideArrowUp, lucideExternalLink, lucideRefreshCw,
                })])], decls: 17, vars: 1, consts: [[1, "page-shell"], [1, "page-header"], [1, "text-lg", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.02em"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-secondary)"], [1, "page-header-actions"], [1, "flex", "w-full", "items-center", "justify-center", "gap-1.5", "rounded-lg", "border-none", "text-xs", "font-semibold", "cursor-pointer", "sm:w-auto", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px 16px"], ["name", "lucidePlus", 3, "size"], [1, "stats-grid", "stats-grid--4"], [1, "rounded-xl", "border", "p-4", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "card-grid-auto"], [1, "rounded-xl", "border", "overflow-hidden", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "flex", "items-center", "justify-between", "mb-1"], [1, "text-xs", "font-medium", 2, "color", "var(--text-secondary)"], [1, "flex", "items-center", "gap-0.5", "text-xs", 2, "color", "var(--badge-green-text)"], ["name", "lucideArrowUp", 3, "size"], [1, "text-2xl", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.03em"], [1, "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "flex", "items-start", "justify-between"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "justify-center", "rounded-xl", "flex-shrink-0", 2, "width", "42px", "height", "42px", "font-size", "12px", "font-weight", "700"], [1, "text-sm", "font-bold", 2, "color", "var(--text-primary)"], [1, "text-xs", 2, "color", "var(--text-muted)"], [1, "text-xs", "font-medium", "px-2", "py-0.5", "rounded-full", "flex-shrink-0"], [1, "grid", "grid-cols-2", "divide-x", 2, "divide-color", "var(--border-subtle)", "border-bottom", "1px solid var(--border-subtle)"], [1, "px-5", "py-3", "text-center"], [1, "text-lg", "font-bold", 2, "color", "var(--text-primary)"], [1, "px-5", "py-3", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "text-xs", "font-semibold", "mb-2", 2, "color", "var(--text-secondary)"], [1, "flex", "flex-col", "gap-1"], [1, "flex", "items-center", "gap-1.5"], [1, "flex", "flex-col", "gap-3", "px-5", "py-3", "sm:flex-row", "sm:items-center", "sm:justify-between"], [1, "flex", "items-center", "gap-1"], [1, "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-gray-100", "dark:hover:bg-gray-800", "transition-colors", 2, "width", "26px", "height", "26px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "var(--text-muted)"], ["name", "lucideEdit", 3, "size"], [1, "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-green-50", "dark:hover:bg-gray-800", "transition-colors", 2, "width", "26px", "height", "26px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "var(--badge-green-text)"], [1, "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-purple-50", "dark:hover:bg-gray-800", "transition-colors", 2, "width", "26px", "height", "26px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "#1C4FC3"], ["name", "lucideExternalLink", 3, "size"], ["name", "lucideCheck", 2, "color", "var(--badge-green-text)", "flex-shrink", "0", 3, "size"], [1, "text-xs", 2, "color", "var(--text-body)"], ["name", "lucideRefreshCw", 3, "size"]], template: function PartnershipsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "Partnerships");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Manage institutional partnerships and conventions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵelement(9, "ng-icon", 6);
            i0.ɵɵtext(10, " Add Partner ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 7);
            i0.ɵɵrepeaterCreate(12, PartnershipsComponent_For_13_Template, 9, 4, "div", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 9);
            i0.ɵɵrepeaterCreate(15, PartnershipsComponent_For_16_Template, 39, 22, "div", 10, _forTrack1);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.partnerStats);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.partners);
        } }, dependencies: [NgIconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PartnershipsComponent, [{
        type: Component,
        args: [{
                selector: 'app-partnerships',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [NgIconComponent],
                providers: [provideIcons({
                        lucideHandshake, lucidePlus, lucideBuilding, lucideUsers,
                        lucideCalendar, lucideCheck, lucideEdit, lucideTrash,
                        lucideArrowUp, lucideExternalLink, lucideRefreshCw,
                    })],
                template: `
    <div class="page-shell">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h2 class="text-lg font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">Partnerships</h2>
          <p class="text-xs mt-0.5" style="color:var(--text-secondary);">Manage institutional partnerships and conventions</p>
        </div>
        <div class="page-header-actions">
          <button class="flex w-full items-center justify-center gap-1.5 rounded-lg border-none text-xs font-semibold cursor-pointer sm:w-auto"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;">
            <ng-icon name="lucidePlus" [size]="'14'" />
            Add Partner
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid stats-grid--4">
        @for (s of partnerStats; track s.label) {
          <div class="rounded-xl border p-4"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <div class="flex items-center justify-between mb-1">
              <p class="text-xs font-medium" style="color:var(--text-secondary);">{{ s.label }}</p>
              <div class="flex items-center gap-0.5 text-xs" style="color:var(--badge-green-text);">
                <ng-icon name="lucideArrowUp" [size]="'10'" />
                {{ s.delta }}
              </div>
            </div>
            <p class="text-2xl font-bold" style="color:var(--text-primary); letter-spacing:-0.03em;">{{ s.value }}</p>
          </div>
        }
      </div>

      <!-- Partners grid -->
      <div class="card-grid-auto">
        @for (p of partners; track p.name) {
          <div class="rounded-xl border overflow-hidden"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">

            <!-- Card header -->
            <div class="px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center rounded-xl flex-shrink-0"
                    [style.background]="p.color + '22'"
                    [style.color]="p.color"
                    style="width:42px; height:42px; font-size:12px; font-weight:700;">
                    {{ p.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-bold" style="color:var(--text-primary);">{{ p.name }}</p>
                    <p class="text-xs" style="color:var(--text-muted);">{{ p.type }} · {{ p.country }}</p>
                  </div>
                </div>
                <span class="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                  [style.background]="p.status === 'Active' ? 'var(--badge-green-bg)' : p.status === 'Pending' ? 'var(--badge-amber-bg)' : 'var(--badge-red-bg)'"
                  [style.color]="p.status === 'Active' ? 'var(--badge-green-text)' : p.status === 'Pending' ? 'var(--badge-amber-text)' : 'var(--badge-red-text)'">
                  {{ p.status }}
                </span>
              </div>
            </div>

            <!-- Stats row -->
            <div class="grid grid-cols-2 divide-x" style="divide-color:var(--border-subtle); border-bottom:1px solid var(--border-subtle);">
              <div class="px-5 py-3 text-center">
                <p class="text-lg font-bold" style="color:var(--text-primary);">{{ p.students }}</p>
                <p class="text-xs" style="color:var(--text-muted);">Students</p>
              </div>
              <div class="px-5 py-3 text-center">
                <p class="text-lg font-bold" style="color:var(--text-primary);">{{ p.startups }}</p>
                <p class="text-xs" style="color:var(--text-muted);">Startups</p>
              </div>
            </div>

            <!-- Benefits -->
            <div class="px-5 py-3" style="border-bottom:1px solid var(--border-subtle);">
              <p class="text-xs font-semibold mb-2" style="color:var(--text-secondary);">Benefits</p>
              <div class="flex flex-col gap-1">
                @for (benefit of p.benefits; track benefit) {
                  <div class="flex items-center gap-1.5">
                    <ng-icon name="lucideCheck" [size]="'11'" style="color:var(--badge-green-text); flex-shrink:0;" />
                    <span class="text-xs" style="color:var(--text-body);">{{ benefit }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Footer -->
            <div class="flex flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="text-xs" style="color:var(--text-muted);">
                Since {{ p.since }} · Expires {{ p.expires }}
              </div>
              <div class="flex items-center gap-1">
                <button class="flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style="width:26px; height:26px; background:transparent; border:none; cursor:pointer; color:var(--text-muted);"
                  [attr.aria-label]="'Edit partnership with ' + p.name">
                  <ng-icon name="lucideEdit" [size]="'13'" />
                </button>
                @if (p.status !== 'Active') {
                  <button class="flex items-center justify-center rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
                    style="width:26px; height:26px; background:transparent; border:none; cursor:pointer; color:var(--badge-green-text);"
                    [attr.aria-label]="'Renew partnership with ' + p.name">
                    <ng-icon name="lucideRefreshCw" [size]="'13'" />
                  </button>
                }
                <button class="flex items-center justify-center rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                  style="width:26px; height:26px; background:transparent; border:none; cursor:pointer; color:#1C4FC3;"
                  [attr.aria-label]="'View partnership details with ' + p.name">
                  <ng-icon name="lucideExternalLink" [size]="'13'" />
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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PartnershipsComponent, { className: "PartnershipsComponent", filePath: "src/app/pages/partnerships/partnerships.component.ts", lineNumber: 152 }); })();
