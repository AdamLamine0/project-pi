import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideScale, lucideCheckCircle, lucideCircle, lucideAlertCircle, lucideFileText, lucideDownload, lucideBell, lucideChevronRight, lucidePlus, lucideExternalLink, } from '@ng-icons/lucide';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.name;
const _forTrack2 = ($index, $item) => $item.title;
function LegalComponent_For_34_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 31);
} if (rf & 2) {
    i0.ɵɵproperty("size", "18");
} }
function LegalComponent_For_34_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 9);
} if (rf & 2) {
    i0.ɵɵproperty("size", "18");
} }
function LegalComponent_For_34_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 32);
} if (rf & 2) {
    i0.ɵɵproperty("size", "18");
} }
function LegalComponent_For_34_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 36);
} if (rf & 2) {
    i0.ɵɵproperty("size", "14");
} }
function LegalComponent_For_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵconditionalCreate(1, LegalComponent_For_34_Conditional_1_Template, 1, 1, "ng-icon", 31)(2, LegalComponent_For_34_Conditional_2_Template, 1, 1, "ng-icon", 9)(3, LegalComponent_For_34_Conditional_3_Template, 1, 1, "ng-icon", 32);
    i0.ɵɵelementStart(4, "div", 33)(5, "p", 34);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 35);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(9, LegalComponent_For_34_Conditional_9_Template, 1, 1, "ng-icon", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(step_r1.done ? 1 : step_r1.alert ? 2 : 3);
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("color", step_r1.done ? "var(--text-muted)" : "var(--text-primary)")("text-decoration", step_r1.done ? "line-through" : "none");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", step_r1.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", step_r1.alert ? "var(--badge-amber-text)" : "var(--text-muted)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Due: ", step_r1.due, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!step_r1.done ? 9 : -1);
} }
function LegalComponent_For_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28)(1, "div", 37);
    i0.ɵɵelement(2, "ng-icon", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 33)(4, "p", 39);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 40);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 41)(9, "span", 40);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 42);
    i0.ɵɵelement(12, "ng-icon", 43);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const doc_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", "16");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(doc_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", doc_r2.type, " \u00B7 ", doc_r2.date);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(doc_r2.size);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "Download " + doc_r2.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", "13");
} }
function LegalComponent_For_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 44);
    i0.ɵɵelement(2, "ng-icon", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 33)(4, "p", 46);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 47);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 48);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const alert_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", alert_r3.urgent ? "var(--badge-amber-bg)" : "var(--badge-purple-bg)");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", alert_r3.urgent ? "var(--badge-amber-text)" : "var(--badge-purple-text)");
    i0.ɵɵproperty("size", "12");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(alert_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(alert_r3.date);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", alert_r3.urgent ? "var(--badge-amber-bg)" : "var(--badge-purple-bg)")("color", alert_r3.urgent ? "var(--badge-amber-text)" : "var(--badge-purple-text)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", alert_r3.urgent ? "Urgent" : "Info", " ");
} }
export class LegalComponent {
    steps = [
        { label: 'Choose business structure (SARL, SPA...)', done: true, alert: false, due: 'Completed' },
        { label: 'Register trade name with CNRC', done: true, alert: false, due: 'Completed' },
        { label: 'Obtain NIF (Tax ID)', done: true, alert: false, due: 'Completed' },
        { label: 'Open corporate bank account', done: true, alert: false, due: 'Completed' },
        { label: 'Apply for Startup Label (ANSS)', done: false, alert: true, due: 'Apr 30, 2026' },
        { label: 'Register for social security (CNAS)', done: false, alert: false, due: 'May 15, 2026' },
        { label: 'File initial VAT return', done: false, alert: false, due: 'Jun 1, 2026' },
        { label: 'Obtain import/export license (if applicable)', done: false, alert: false, due: 'TBD' },
    ];
    documents = [
        { name: 'Articles of Association', type: 'Founding Document', date: 'Jan 12, 2026', size: '2.4 MB' },
        { name: 'CNRC Registration Certificate', type: 'Registration', date: 'Jan 20, 2026', size: '1.1 MB' },
        { name: 'NIF Certificate', type: 'Tax', date: 'Feb 3, 2026', size: '0.8 MB' },
        { name: 'Startup Label Application', type: 'Application', date: 'Mar 15, 2026', size: '3.2 MB' },
        { name: 'Shareholder Agreement', type: 'Contract', date: 'Jan 15, 2026', size: '1.8 MB' },
    ];
    alerts = [
        { title: 'Startup Label renewal deadline approaching', date: 'Due: Apr 30, 2026', urgent: true },
        { title: 'New startup incentives from ANSS published', date: 'Published: Apr 1, 2026', urgent: false },
        { title: 'Quarterly tax filing reminder', date: 'Due: Jun 1, 2026', urgent: false },
    ];
    get completedCount() {
        return this.steps.filter(s => s.done).length;
    }
    static ɵfac = function LegalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LegalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LegalComponent, selectors: [["app-legal"]], features: [i0.ɵɵProvidersFeature([provideIcons({
                    lucideScale, lucideCheckCircle, lucideCircle, lucideAlertCircle,
                    lucideFileText, lucideDownload, lucideBell, lucideChevronRight,
                    lucidePlus, lucideExternalLink,
                })])], decls: 53, vars: 7, consts: [[1, "page-shell"], [1, "page-header"], [1, "text-lg", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.02em"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-secondary)"], [1, "page-header-actions"], [1, "text-xs", "font-semibold", "rounded-lg", "border", "cursor-pointer", 2, "background", "var(--surface)", "color", "var(--text-body)", "border-color", "var(--border)", "padding", "7px 14px"], [1, "flex", "items-center", "gap-1.5", "text-xs", "font-semibold", "rounded-lg", "border-none", "cursor-pointer", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px 16px"], ["name", "lucidePlus", 3, "size"], [1, "flex", "flex-col", "gap-3", "rounded-xl", "border", "px-5", "py-4", "sm:flex-row", "sm:items-center", 2, "background", "var(--badge-amber-bg)", "border-color", "var(--badge-amber-text)"], ["name", "lucideAlertCircle", 2, "color", "var(--badge-amber-text)", "flex-shrink", "0", 3, "size"], [1, "flex-1"], [1, "text-sm", "font-semibold", 2, "color", "var(--badge-amber-text)"], [1, "text-xs", "mt-0.5", 2, "color", "#B45309"], [1, "text-xs", "font-semibold", "rounded-lg", "border", "cursor-pointer", "flex-shrink-0", 2, "background", "var(--surface)", "color", "var(--badge-amber-text)", "border-color", "var(--badge-amber-text)", "padding", "5px 12px"], [1, "split-grid", "split-grid--equal"], [1, "rounded-xl", "border", "overflow-hidden", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-bold", 2, "color", "var(--text-primary)"], [1, "text-xs", "font-semibold", 2, "color", "#1C4FC3"], [1, "mt-3", 2, "height", "6px", "background", "var(--surface-subtle)", "border-radius", "99px", "overflow", "hidden"], [2, "height", "100%", "border-radius", "99px", "background", "linear-gradient(90deg,#1C4FC3,#1D1384)", "transition", "width 0.4s"], [1, "divide-y", 2, "divide-color", "var(--border-subtle)"], [1, "flex", "items-center", "gap-3", "px-5", "py-3.5", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors", "cursor-pointer"], [1, "flex", "flex-col", "gap-4"], [1, "rounded-xl", "border", "overflow-hidden", "flex-1", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "flex", "items-center", "justify-between", "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "text-xs", "font-semibold", "flex", "items-center", "gap-1", 2, "color", "#1C4FC3", "background", "transparent", "border", "none", "cursor", "pointer"], [1, "flex", "items-center", "gap-3", "px-5", "py-3", "hover:bg-gray-50", "dark:hover:bg-gray-800", "transition-colors"], [1, "rounded-xl", "border", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "flex", "items-start", "gap-3", "px-5", "py-3"], ["name", "lucideCheckCircle", 2, "color", "var(--badge-green-text)", "flex-shrink", "0", 3, "size"], ["name", "lucideCircle", 2, "color", "#D1D5DB", "flex-shrink", "0", 3, "size"], [1, "flex-1", "min-w-0"], [1, "text-sm"], [1, "text-xs", "mt-0.5"], ["name", "lucideChevronRight", 2, "color", "var(--border)", "flex-shrink", "0", 3, "size"], [1, "flex", "items-center", "justify-center", "rounded-lg", "flex-shrink-0", 2, "width", "34px", "height", "34px", "background", "#DBEAFE"], ["name", "lucideFileText", 2, "color", "#1C4FC3", 3, "size"], [1, "text-xs", "font-semibold", "truncate", 2, "color", "var(--text-primary)"], [1, "text-xs", 2, "color", "var(--text-muted)"], [1, "flex", "items-center", "gap-1"], [1, "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-gray-100", "dark:hover:bg-gray-800", "transition-colors", 2, "width", "26px", "height", "26px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "var(--text-muted)"], ["name", "lucideDownload", 3, "size"], [1, "flex", "items-center", "justify-center", "rounded-full", "flex-shrink-0", "mt-0.5", 2, "width", "24px", "height", "24px"], ["name", "lucideBell", 3, "size"], [1, "text-xs", "font-semibold", 2, "color", "var(--text-primary)"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-muted)"], [1, "text-xs", "font-medium", "px-1.5", "py-0.5", "rounded", "flex-shrink-0"]], template: function LegalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "Legal Support");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Administrative procedures and compliance tracking");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵtext(9, " Download All ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "button", 6);
            i0.ɵɵelement(11, "ng-icon", 7);
            i0.ɵɵtext(12, " New Procedure ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "div", 8);
            i0.ɵɵelement(14, "ng-icon", 9);
            i0.ɵɵelementStart(15, "div", 10)(16, "p", 11);
            i0.ɵɵtext(17, "Action Required: Startup Label Renewal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p", 12);
            i0.ɵɵtext(19, "Your startup label expires on May 15, 2026. Submit renewal documents before April 30, 2026.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "button", 13);
            i0.ɵɵtext(21, " Take Action ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 14)(23, "div", 15)(24, "div", 16)(25, "div", 17)(26, "h3", 18);
            i0.ɵɵtext(27, "Company Registration Checklist");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span", 19);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 20);
            i0.ɵɵelement(31, "div", 21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 22);
            i0.ɵɵrepeaterCreate(33, LegalComponent_For_34_Template, 10, 10, "div", 23, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 24)(36, "div", 25)(37, "div", 26)(38, "h3", 18);
            i0.ɵɵtext(39, "Document Library");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "button", 27);
            i0.ɵɵelement(41, "ng-icon", 7);
            i0.ɵɵtext(42, " Upload ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div", 22);
            i0.ɵɵrepeaterCreate(44, LegalComponent_For_45_Template, 13, 7, "div", 28, _forTrack1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 29)(47, "div", 16)(48, "h3", 18);
            i0.ɵɵtext(49, "Regulatory Alerts");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 22);
            i0.ɵɵrepeaterCreate(51, LegalComponent_For_52_Template, 10, 12, "div", 30, _forTrack2);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("size", "18");
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate2("", ctx.completedCount, "/", ctx.steps.length, " done");
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("width", ctx.completedCount / ctx.steps.length * 100, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.steps);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("size", "12");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.documents);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.alerts);
        } }, dependencies: [NgIconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LegalComponent, [{
        type: Component,
        args: [{
                selector: 'app-legal',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [NgIconComponent],
                providers: [provideIcons({
                        lucideScale, lucideCheckCircle, lucideCircle, lucideAlertCircle,
                        lucideFileText, lucideDownload, lucideBell, lucideChevronRight,
                        lucidePlus, lucideExternalLink,
                    })],
                template: `
    <div class="page-shell">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h2 class="text-lg font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">Legal Support</h2>
          <p class="text-xs mt-0.5" style="color:var(--text-secondary);">Administrative procedures and compliance tracking</p>
        </div>
        <div class="page-header-actions">
          <button class="text-xs font-semibold rounded-lg border cursor-pointer"
            style="background:var(--surface); color:var(--text-body); border-color:var(--border); padding:7px 14px;">
            Download All
          </button>
          <button class="flex items-center gap-1.5 text-xs font-semibold rounded-lg border-none cursor-pointer"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;">
            <ng-icon name="lucidePlus" [size]="'14'" />
            New Procedure
          </button>
        </div>
      </div>

      <!-- Alert banner -->
      <div class="flex flex-col gap-3 rounded-xl border px-5 py-4 sm:flex-row sm:items-center"
        style="background:var(--badge-amber-bg); border-color:var(--badge-amber-text);">
        <ng-icon name="lucideAlertCircle" [size]="'18'" style="color:var(--badge-amber-text); flex-shrink:0;" />
        <div class="flex-1">
          <p class="text-sm font-semibold" style="color:var(--badge-amber-text);">Action Required: Startup Label Renewal</p>
          <p class="text-xs mt-0.5" style="color:#B45309;">Your startup label expires on May 15, 2026. Submit renewal documents before April 30, 2026.</p>
        </div>
        <button class="text-xs font-semibold rounded-lg border cursor-pointer flex-shrink-0"
          style="background:var(--surface); color:var(--badge-amber-text); border-color:var(--badge-amber-text); padding:5px 12px;">
          Take Action
        </button>
      </div>

      <!-- Two column layout -->
      <div class="split-grid split-grid--equal">

        <!-- Checklist -->
        <div class="rounded-xl border overflow-hidden"
          style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
          <div class="px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold" style="color:var(--text-primary);">Company Registration Checklist</h3>
              <span class="text-xs font-semibold" style="color:#1C4FC3;">{{ completedCount }}/{{ steps.length }} done</span>
            </div>
            <!-- Progress bar -->
            <div class="mt-3" style="height:6px; background:var(--surface-subtle); border-radius:99px; overflow:hidden;">
              <div style="height:100%; border-radius:99px; background:linear-gradient(90deg,#1C4FC3,#1D1384); transition:width 0.4s;"
                [style.width.%]="(completedCount / steps.length) * 100">
              </div>
            </div>
          </div>
          <div class="divide-y" style="divide-color:var(--border-subtle);">
            @for (step of steps; track step.label) {
              <div class="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                @if (step.done) {
                  <ng-icon name="lucideCheckCircle" [size]="'18'" style="color:var(--badge-green-text); flex-shrink:0;" />
                } @else if (step.alert) {
                  <ng-icon name="lucideAlertCircle" [size]="'18'" style="color:var(--badge-amber-text); flex-shrink:0;" />
                } @else {
                  <ng-icon name="lucideCircle" [size]="'18'" style="color:#D1D5DB; flex-shrink:0;" />
                }
                <div class="flex-1 min-w-0">
                  <p class="text-sm" [style.color]="step.done ? 'var(--text-muted)' : 'var(--text-primary)'"
                    [style.text-decoration]="step.done ? 'line-through' : 'none'">
                    {{ step.label }}
                  </p>
                  <p class="text-xs mt-0.5" [style.color]="step.alert ? 'var(--badge-amber-text)' : 'var(--text-muted)'">
                    Due: {{ step.due }}
                  </p>
                </div>
                @if (!step.done) {
                  <ng-icon name="lucideChevronRight" [size]="'14'" style="color:var(--border); flex-shrink:0;" />
                }
              </div>
            }
          </div>
        </div>

        <!-- Document library + Alerts -->
        <div class="flex flex-col gap-4">

          <!-- Document library -->
          <div class="rounded-xl border overflow-hidden flex-1"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
              <h3 class="text-sm font-bold" style="color:var(--text-primary);">Document Library</h3>
              <button class="text-xs font-semibold flex items-center gap-1" style="color:#1C4FC3; background:transparent; border:none; cursor:pointer;">
                <ng-icon name="lucidePlus" [size]="'12'" /> Upload
              </button>
            </div>
            <div class="divide-y" style="divide-color:var(--border-subtle);">
              @for (doc of documents; track doc.name) {
                <div class="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div class="flex items-center justify-center rounded-lg flex-shrink-0"
                    style="width:34px; height:34px; background:#DBEAFE;">
                    <ng-icon name="lucideFileText" [size]="'16'" style="color:#1C4FC3;" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold truncate" style="color:var(--text-primary);">{{ doc.name }}</p>
                    <p class="text-xs" style="color:var(--text-muted);">{{ doc.type }} · {{ doc.date }}</p>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-xs" style="color:var(--text-muted);">{{ doc.size }}</span>
                    <button class="flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      style="width:26px; height:26px; background:transparent; border:none; cursor:pointer; color:var(--text-muted);"
                      [attr.aria-label]="'Download ' + doc.name">
                      <ng-icon name="lucideDownload" [size]="'13'" />
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Regulatory alerts -->
          <div class="rounded-xl border"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <div class="px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
              <h3 class="text-sm font-bold" style="color:var(--text-primary);">Regulatory Alerts</h3>
            </div>
            <div class="divide-y" style="divide-color:var(--border-subtle);">
              @for (alert of alerts; track alert.title) {
                <div class="flex items-start gap-3 px-5 py-3">
                  <div class="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                    style="width:24px; height:24px;"
                    [style.background]="alert.urgent ? 'var(--badge-amber-bg)' : 'var(--badge-purple-bg)'">
                    <ng-icon name="lucideBell" [size]="'12'" [style.color]="alert.urgent ? 'var(--badge-amber-text)' : 'var(--badge-purple-text)'" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold" style="color:var(--text-primary);">{{ alert.title }}</p>
                    <p class="text-xs mt-0.5" style="color:var(--text-muted);">{{ alert.date }}</p>
                  </div>
                  <span class="text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0"
                    [style.background]="alert.urgent ? 'var(--badge-amber-bg)' : 'var(--badge-purple-bg)'"
                    [style.color]="alert.urgent ? 'var(--badge-amber-text)' : 'var(--badge-purple-text)'">
                    {{ alert.urgent ? 'Urgent' : 'Info' }}
                  </span>
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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LegalComponent, { className: "LegalComponent", filePath: "src/app/pages/legal/legal.component.ts", lineNumber: 170 }); })();
