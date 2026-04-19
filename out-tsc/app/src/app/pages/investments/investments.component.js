import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideTrendingUp, lucidePlus, lucideFilter, lucideSearch, lucideDollarSign, lucideBuilding, lucideCheck, lucideX, lucideClock, lucideEye, lucideMessageSquare, lucideStar, } from '@ng-icons/lucide';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.name;
const _forTrack2 = ($index, $item) => $item.startup + $item.investor;
function InvestmentsComponent_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "p", 20);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.value);
} }
function InvestmentsComponent_For_23_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const f_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(f_r2);
} }
function InvestmentsComponent_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 22)(2, "div", 23)(3, "div", 24);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "p", 25);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 26);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 27);
    i0.ɵɵelement(11, "ng-icon", 28);
    i0.ɵɵelementStart(12, "span", 29);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 30);
    i0.ɵɵrepeaterCreate(15, InvestmentsComponent_For_23_For_16_Template, 2, 1, "span", 31, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 32)(18, "span", 33);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 34);
    i0.ɵɵtext(21, " Express Interest ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const inv_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("background", inv_r3.color + "22")("color", inv_r3.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", inv_r3.initials, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(inv_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(inv_r3.type);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "12");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", inv_r3.matched, " matches");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(inv_r3.focus);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("Ticket: ", inv_r3.ticketMin, " \u2013 ", inv_r3.ticketMax);
} }
function InvestmentsComponent_For_30_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function InvestmentsComponent_For_30_Template_button_click_0_listener() { const status_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.statusFilter = status_r5); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r5 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", ctx_r5.statusFilter === status_r5 ? "var(--chip-active-bg)" : "var(--chip-inactive-bg)")("color", ctx_r5.statusFilter === status_r5 ? "var(--chip-active-text)" : "var(--chip-inactive-text)")("border-color", ctx_r5.statusFilter === status_r5 ? "var(--chip-active-border)" : "transparent");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(status_r5);
} }
function InvestmentsComponent_For_33_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 43);
} if (rf & 2) {
    i0.ɵɵproperty("size", "10");
} }
function InvestmentsComponent_For_33_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 44);
} if (rf & 2) {
    i0.ɵɵproperty("size", "10");
} }
function InvestmentsComponent_For_33_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 45);
} if (rf & 2) {
    i0.ɵɵproperty("size", "10");
} }
function InvestmentsComponent_For_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "div", 36)(2, "div", 37)(3, "p", 38);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 26);
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 39);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 23)(10, "span", 26);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 40);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 41)(15, "span", 42);
    i0.ɵɵconditionalCreate(16, InvestmentsComponent_For_33_Conditional_16_Template, 1, 1, "ng-icon", 43)(17, InvestmentsComponent_For_33_Conditional_17_Template, 1, 1, "ng-icon", 44)(18, InvestmentsComponent_For_33_Conditional_18_Template, 1, 1, "ng-icon", 45);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 46);
    i0.ɵɵelement(21, "ng-icon", 47);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const req_r7 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(req_r7.startup);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(req_r7.investor);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(req_r7.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(req_r7.amount);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", req_r7.status === "Accepted" ? "var(--badge-green-bg)" : req_r7.status === "Declined" ? "var(--badge-red-bg)" : "var(--badge-amber-bg)")("color", req_r7.status === "Accepted" ? "var(--badge-green-text)" : req_r7.status === "Declined" ? "var(--badge-red-text)" : "var(--badge-amber-text)");
    i0.ɵɵadvance();
    i0.ɵɵconditional(req_r7.status === "Accepted" ? 16 : req_r7.status === "Declined" ? 17 : 18);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", req_r7.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "13");
} }
export class InvestmentsComponent {
    statusFilter = 'All';
    statusFilters = ['All', 'Pending', 'Accepted', 'Declined'];
    investStats = [
        { label: 'Active Investors', value: '34' },
        { label: 'Total Committed', value: '$4.2M' },
        { label: 'Pending Requests', value: '12' },
        { label: 'Deals Closed', value: '8' },
    ];
    investors = [
        { name: 'North Africa Ventures', type: 'VC Fund', focus: ['FinTech', 'HealthTech', 'SaaS'], ticketMin: '$100K', ticketMax: '$500K', initials: 'NAV', color: '#1C4FC3', matched: 6 },
        { name: 'Tech Africa Fund', type: 'Corporate VC', focus: ['EdTech', 'AgriTech', 'Logistics'], ticketMin: '$50K', ticketMax: '$300K', initials: 'TAF', color: '#1D1384', matched: 4 },
        { name: 'Green Capital Partners', type: 'Impact Fund', focus: ['CleanTech', 'AgriTech'], ticketMin: '$200K', ticketMax: '$1M', initials: 'GCP', color: '#059669', matched: 3 },
        { name: 'Atlas Angel Network', type: 'Angel Network', focus: ['Pre-seed', 'Seed', 'Any sector'], ticketMin: '$20K', ticketMax: '$100K', initials: 'AAN', color: '#D97706', matched: 5 },
    ];
    requests = [
        { startup: 'MedConnect', investor: 'North Africa Ventures', status: 'Accepted', date: 'Apr 2, 2026', amount: '$400K' },
        { startup: 'TechFlow', investor: 'Atlas Angel Network', status: 'Pending', date: 'Apr 3, 2026', amount: '$80K' },
        { startup: 'GreenVenture', investor: 'Green Capital Partners', status: 'Pending', date: 'Mar 28, 2026', amount: '$250K' },
        { startup: 'LogiTrack', investor: 'Tech Africa Fund', status: 'Accepted', date: 'Mar 20, 2026', amount: '$200K' },
        { startup: 'AgriSmart', investor: 'Green Capital Partners', status: 'Declined', date: 'Mar 15, 2026', amount: '$120K' },
        { startup: 'EduHub', investor: 'Tech Africa Fund', status: 'Pending', date: 'Apr 1, 2026', amount: '$150K' },
        { startup: 'SecureID', investor: 'North Africa Ventures', status: 'Accepted', date: 'Feb 28, 2026', amount: '$300K' },
    ];
    static ɵfac = function InvestmentsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InvestmentsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InvestmentsComponent, selectors: [["app-investments"]], features: [i0.ɵɵProvidersFeature([provideIcons({
                    lucideTrendingUp, lucidePlus, lucideFilter, lucideSearch,
                    lucideDollarSign, lucideBuilding, lucideCheck, lucideX,
                    lucideClock, lucideEye, lucideMessageSquare, lucideStar,
                })])], decls: 34, vars: 2, consts: [[1, "page-shell"], [1, "page-header"], [1, "text-lg", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.02em"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-secondary)"], [1, "page-header-actions"], [1, "flex", "w-full", "items-center", "justify-center", "gap-1.5", "rounded-lg", "border-none", "text-xs", "font-semibold", "cursor-pointer", "sm:w-auto", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px 16px"], ["name", "lucidePlus", 3, "size"], [1, "stats-grid", "stats-grid--4"], [1, "rounded-xl", "border", "p-4", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "split-grid", "split-grid--equal"], [1, "rounded-xl", "border", "overflow-hidden", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "flex", "items-center", "justify-between", "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "text-sm", "font-bold", 2, "color", "var(--text-primary)"], [1, "text-xs", "font-medium", "px-2", "py-0.5", "rounded-full", 2, "background", "var(--badge-purple-bg)", "color", "#1C4FC3"], [1, "divide-y", 2, "divide-color", "var(--border-subtle)"], [1, "px-5", "py-4", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", "cursor-pointer"], [1, "flex", "flex-col", "gap-3", "px-5", "py-4", "sm:flex-row", "sm:items-center", "sm:justify-between", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "chip-scroll"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "3px 10px", 3, "background", "color", "border-color"], [1, "flex", "flex-col", "gap-3", "px-5", "py-3.5", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", "sm:flex-row", "sm:items-center", "sm:gap-4"], [1, "text-xs", "font-medium", "mb-1", 2, "color", "var(--text-secondary)"], [1, "text-2xl", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.03em"], [1, "flex", "items-start", "justify-between", "mb-2"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "justify-center", "rounded-xl", "flex-shrink-0", 2, "width", "38px", "height", "38px", "font-size", "11px", "font-weight", "700"], [1, "text-sm", "font-semibold", 2, "color", "var(--text-primary)"], [1, "text-xs", 2, "color", "var(--text-muted)"], [1, "flex", "items-center", "gap-1"], ["name", "lucideStar", 2, "color", "var(--badge-amber-text)", 3, "size"], [1, "text-xs", "font-semibold", 2, "color", "var(--badge-amber-text)"], [1, "flex", "flex-wrap", "gap-1.5", "mb-2"], [1, "text-xs", "px-1.5", "py-0.5", "rounded", 2, "background", "var(--surface-subtle)", "color", "var(--text-body)", "font-weight", "500"], [1, "flex", "items-center", "justify-between"], [1, "text-xs", 2, "color", "var(--text-secondary)"], [1, "text-xs", "font-semibold", "rounded-lg", 2, "background", "var(--badge-purple-bg)", "color", "#1C4FC3", "border", "none", "cursor", "pointer", "padding", "4px 10px"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "3px 10px", 3, "click"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2", "mb-0.5"], [1, "text-sm", "font-semibold", "truncate", 2, "color", "var(--text-primary)"], [1, "text-xs", "font-medium", "truncate", 2, "color", "var(--text-secondary)"], [1, "text-xs", "font-semibold", 2, "color", "var(--badge-green-text)"], [1, "flex", "items-center", "gap-2", "flex-shrink-0", "sm:self-center"], [1, "text-xs", "font-medium", "px-2", "py-0.5", "rounded-full", "flex", "items-center", "gap-1"], ["name", "lucideCheck", 3, "size"], ["name", "lucideX", 3, "size"], ["name", "lucideClock", 3, "size"], [1, "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-gray-100", "dark:hover:bg-gray-800", "transition-colors", 2, "width", "26px", "height", "26px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "var(--text-muted)"], ["name", "lucideEye", 3, "size"]], template: function InvestmentsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "Investment Management");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Track investor matching and funding opportunities");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵelement(9, "ng-icon", 6);
            i0.ɵɵtext(10, " Set Investment Criteria ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 7);
            i0.ɵɵrepeaterCreate(12, InvestmentsComponent_For_13_Template, 5, 2, "div", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "h3", 12);
            i0.ɵɵtext(18, "Investor Profiles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span", 13);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 14);
            i0.ɵɵrepeaterCreate(22, InvestmentsComponent_For_23_Template, 22, 11, "div", 15, _forTrack1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 10)(25, "div", 16)(26, "h3", 12);
            i0.ɵɵtext(27, "Interest Requests");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 17);
            i0.ɵɵrepeaterCreate(29, InvestmentsComponent_For_30_Template, 2, 7, "button", 18, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 14);
            i0.ɵɵrepeaterCreate(32, InvestmentsComponent_For_33_Template, 22, 11, "div", 19, _forTrack2);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.investStats);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", ctx.investors.length, " investors ");
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.investors);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.statusFilters);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.requests);
        } }, dependencies: [NgIconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InvestmentsComponent, [{
        type: Component,
        args: [{
                selector: 'app-investments',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [NgIconComponent],
                providers: [provideIcons({
                        lucideTrendingUp, lucidePlus, lucideFilter, lucideSearch,
                        lucideDollarSign, lucideBuilding, lucideCheck, lucideX,
                        lucideClock, lucideEye, lucideMessageSquare, lucideStar,
                    })],
                template: `
    <div class="page-shell">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h2 class="text-lg font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">Investment Management</h2>
          <p class="text-xs mt-0.5" style="color:var(--text-secondary);">Track investor matching and funding opportunities</p>
        </div>
        <div class="page-header-actions">
          <button class="flex w-full items-center justify-center gap-1.5 rounded-lg border-none text-xs font-semibold cursor-pointer sm:w-auto"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;">
            <ng-icon name="lucidePlus" [size]="'14'" />
            Set Investment Criteria
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid stats-grid--4">
        @for (s of investStats; track s.label) {
          <div class="rounded-xl border p-4"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <p class="text-xs font-medium mb-1" style="color:var(--text-secondary);">{{ s.label }}</p>
            <p class="text-2xl font-bold" style="color:var(--text-primary); letter-spacing:-0.03em;">{{ s.value }}</p>
          </div>
        }
      </div>

      <!-- Two column -->
      <div class="split-grid split-grid--equal">

        <!-- Investor profiles -->
        <div class="rounded-xl border overflow-hidden"
          style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
            <h3 class="text-sm font-bold" style="color:var(--text-primary);">Investor Profiles</h3>
            <span class="text-xs font-medium px-2 py-0.5 rounded-full" style="background:var(--badge-purple-bg); color:#1C4FC3;">
              {{ investors.length }} investors
            </span>
          </div>
          <div class="divide-y" style="divide-color:var(--border-subtle);">
            @for (inv of investors; track inv.name) {
              <div class="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center rounded-xl flex-shrink-0"
                      [style.background]="inv.color + '22'"
                      [style.color]="inv.color"
                      style="width:38px; height:38px; font-size:11px; font-weight:700;">
                      {{ inv.initials }}
                    </div>
                    <div>
                      <p class="text-sm font-semibold" style="color:var(--text-primary);">{{ inv.name }}</p>
                      <p class="text-xs" style="color:var(--text-muted);">{{ inv.type }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-1">
                    <ng-icon name="lucideStar" [size]="'12'" style="color:var(--badge-amber-text);" />
                    <span class="text-xs font-semibold" style="color:var(--badge-amber-text);">{{ inv.matched }} matches</span>
                  </div>
                </div>
                <!-- Focus sectors -->
                <div class="flex flex-wrap gap-1.5 mb-2">
                  @for (f of inv.focus; track f) {
                    <span class="text-xs px-1.5 py-0.5 rounded" style="background:var(--surface-subtle); color:var(--text-body); font-weight:500;">{{ f }}</span>
                  }
                </div>
                <!-- Ticket -->
                <div class="flex items-center justify-between">
                  <span class="text-xs" style="color:var(--text-secondary);">Ticket: {{ inv.ticketMin }} – {{ inv.ticketMax }}</span>
                  <button class="text-xs font-semibold rounded-lg"
                    style="background:var(--badge-purple-bg); color:#1C4FC3; border:none; cursor:pointer; padding:4px 10px;">
                    Express Interest
                  </button>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Interest requests -->
        <div class="rounded-xl border overflow-hidden"
          style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
          <div class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between" style="border-bottom:1px solid var(--border-subtle);">
            <h3 class="text-sm font-bold" style="color:var(--text-primary);">Interest Requests</h3>
            <div class="chip-scroll">
              @for (status of statusFilters; track status) {
                <button
                  (click)="statusFilter = status"
                  class="text-xs font-medium rounded-lg cursor-pointer border transition-colors"
                  [style.background]="statusFilter === status ? 'var(--chip-active-bg)' : 'var(--chip-inactive-bg)'"
                  [style.color]="statusFilter === status ? 'var(--chip-active-text)' : 'var(--chip-inactive-text)'"
                  [style.border-color]="statusFilter === status ? 'var(--chip-active-border)' : 'transparent'"
                  style="padding:3px 10px;">{{ status }}</button>
              }
            </div>
          </div>
          <div class="divide-y" style="divide-color:var(--border-subtle);">
            @for (req of requests; track req.startup + req.investor) {
              <div class="flex flex-col gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors sm:flex-row sm:items-center sm:gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <p class="text-sm font-semibold truncate" style="color:var(--text-primary);">{{ req.startup }}</p>
                    <span class="text-xs" style="color:var(--text-muted);">×</span>
                    <p class="text-xs font-medium truncate" style="color:var(--text-secondary);">{{ req.investor }}</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-xs" style="color:var(--text-muted);">{{ req.date }}</span>
                    <span class="text-xs font-semibold" style="color:var(--badge-green-text);">{{ req.amount }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0 sm:self-center">
                  <span class="text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                    [style.background]="req.status === 'Accepted' ? 'var(--badge-green-bg)' : req.status === 'Declined' ? 'var(--badge-red-bg)' : 'var(--badge-amber-bg)'"
                    [style.color]="req.status === 'Accepted' ? 'var(--badge-green-text)' : req.status === 'Declined' ? 'var(--badge-red-text)' : 'var(--badge-amber-text)'">
                    @if (req.status === 'Accepted') {
                      <ng-icon name="lucideCheck" [size]="'10'" />
                    } @else if (req.status === 'Declined') {
                      <ng-icon name="lucideX" [size]="'10'" />
                    } @else {
                      <ng-icon name="lucideClock" [size]="'10'" />
                    }
                    {{ req.status }}
                  </span>
                  <button class="flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    style="width:26px; height:26px; background:transparent; border:none; cursor:pointer; color:var(--text-muted);">
                    <ng-icon name="lucideEye" [size]="'13'" />
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InvestmentsComponent, { className: "InvestmentsComponent", filePath: "src/app/pages/investments/investments.component.ts", lineNumber: 159 }); })();
