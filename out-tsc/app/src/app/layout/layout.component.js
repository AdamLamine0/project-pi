import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideCalendar, lucideChevronDown, lucideGraduationCap, lucideHandshake, lucideLayoutDashboard, lucideMap, lucideRocket, lucideScale, lucideSearch, lucideSettings, lucideTrendingUp, lucideUsers, lucideLogOut, lucideUser, lucideX, lucideMail, lucideBriefcase, lucideShield, lucideGlobe, lucideCheck, lucideAlertCircle, lucideEdit, lucideMoon, lucideSun, lucideStar, lucideMonitor, lucideMenu, } from '@ng-icons/lucide';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { ThemeService } from '../services/theme.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.route;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.label;
function LayoutComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMobileNav()); });
    i0.ɵɵelementEnd();
} }
function LayoutComponent_For_12_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 44);
    i0.ɵɵlistener("click", function LayoutComponent_For_12_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMobileNav()); });
    i0.ɵɵelementStart(1, "div", 4);
    i0.ɵɵelement(2, "ng-icon", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 14);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", item_r4.route);
    i0.ɵɵattribute("aria-label", item_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", item_r4.icon)("size", "17");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("opacity", ctx_r1.sidebarExpanded() ? 1 : 0)("transition-delay", ctx_r1.sidebarExpanded() ? "0.1s" : "0s");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r4.label, " ");
} }
function LayoutComponent_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.unreadCount(), " ");
} }
function LayoutComponent_Conditional_53_For_15_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 60);
} if (rf & 2) {
    i0.ɵɵproperty("size", "14");
} }
function LayoutComponent_Conditional_53_For_15_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 61);
} if (rf & 2) {
    i0.ɵɵproperty("size", "14");
} }
function LayoutComponent_Conditional_53_For_15_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 62);
} if (rf & 2) {
    i0.ɵɵproperty("size", "14");
} }
function LayoutComponent_Conditional_53_For_15_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 67);
} }
function LayoutComponent_Conditional_53_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58)(1, "div", 59);
    i0.ɵɵconditionalCreate(2, LayoutComponent_Conditional_53_For_15_Conditional_2_Template, 1, 1, "ng-icon", 60)(3, LayoutComponent_Conditional_53_For_15_Conditional_3_Template, 1, 1, "ng-icon", 61)(4, LayoutComponent_Conditional_53_For_15_Conditional_4_Template, 1, 1, "ng-icon", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 63)(6, "p", 64);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 65);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 66);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(12, LayoutComponent_Conditional_53_For_15_Conditional_12_Template, 1, 0, "div", 67);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const n_r6 = ctx.$implicit;
    i0.ɵɵstyleProp("background", n_r6.read ? "var(--surface)" : "var(--surface-accent)");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", n_r6.type === "alert" ? "var(--badge-amber-bg)" : n_r6.type === "success" ? "var(--badge-green-bg)" : "var(--badge-purple-bg)");
    i0.ɵɵadvance();
    i0.ɵɵconditional(n_r6.type === "alert" ? 2 : n_r6.type === "success" ? 3 : 4);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(n_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(n_r6.body);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(n_r6.time);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!n_r6.read ? 12 : -1);
} }
function LayoutComponent_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_53_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNotifications.set(false)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "div", 47)(2, "div", 48)(3, "div")(4, "h3", 49);
    i0.ɵɵtext(5, "Notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 50);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 51)(9, "button", 52);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_53_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.markAllRead()); });
    i0.ɵɵtext(10, " Mark all read ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 53);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_53_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showNotifications.set(false)); });
    i0.ɵɵelement(12, "ng-icon", 8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 54);
    i0.ɵɵrepeaterCreate(14, LayoutComponent_Conditional_53_For_15_Template, 13, 9, "div", 55, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 56)(17, "button", 57);
    i0.ɵɵtext(18, " View all notifications ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r1.unreadCount(), " unread");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", "14");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.notifications());
} }
function LayoutComponent_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41)(1, "div", 68);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_54_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showProfile.set(false)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 69)(3, "div", 70)(4, "button", 71);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_54_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showProfile.set(false)); });
    i0.ɵɵelement(5, "ng-icon", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 72);
    i0.ɵɵtext(7, " MS ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "h2", 73);
    i0.ɵɵtext(9, "Mohamed Slimane");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 74);
    i0.ɵɵtext(11, "Founder \u00B7 FoundersLab");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 75);
    i0.ɵɵelement(13, "ng-icon", 76);
    i0.ɵɵtext(14, " Premium Plan ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 77)(16, "div", 78)(17, "div", 79);
    i0.ɵɵelement(18, "ng-icon", 80);
    i0.ɵɵelementStart(19, "div")(20, "p", 50);
    i0.ɵɵtext(21, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 81);
    i0.ɵɵtext(23, "slimane@founderslab.io");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "div", 79);
    i0.ɵɵelement(25, "ng-icon", 82);
    i0.ɵɵelementStart(26, "div")(27, "p", 50);
    i0.ɵɵtext(28, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "p", 81);
    i0.ɵɵtext(30, "Founder & Admin");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 79);
    i0.ɵɵelement(32, "ng-icon", 83);
    i0.ɵɵelementStart(33, "div")(34, "p", 50);
    i0.ɵɵtext(35, "Member since");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "p", 81);
    i0.ɵɵtext(37, "January 2026");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(38, "div", 84)(39, "button", 85);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_54_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showProfile.set(false)); });
    i0.ɵɵelement(40, "ng-icon", 86);
    i0.ɵɵtext(41, " Edit Profile ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 87);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_54_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showProfile.set(false)); });
    i0.ɵɵelement(43, "ng-icon", 88);
    i0.ɵɵtext(44, " Sign out ");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", "16");
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", "15");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("size", "15");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("size", "15");
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("size", "14");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", "14");
} }
function LayoutComponent_Conditional_55_For_20_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 111);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_55_For_20_Template_button_click_0_listener() { const theme_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.themeService.theme.set(theme_r10.id)); });
    i0.ɵɵelement(1, "ng-icon", 112);
    i0.ɵɵelementStart(2, "p", 113);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const theme_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("border-color", ctx_r1.themeService.theme() === theme_r10.id ? "#1C4FC3" : "var(--border)");
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", theme_r10.icon)("size", "18");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", ctx_r1.themeService.theme() === theme_r10.id ? "#1C4FC3" : "var(--text-body)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", theme_r10.label, " ");
} }
function LayoutComponent_Conditional_55_For_28_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 103)(1, "div")(2, "p", 81);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 50);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 114);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_55_For_28_Template_button_click_6_listener() { const pref_r12 = i0.ɵɵrestoreView(_r11).$implicit; return i0.ɵɵresetView(pref_r12.enabled = !pref_r12.enabled); });
    i0.ɵɵelement(7, "span", 115);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pref_r12 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(pref_r12.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pref_r12.desc);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", pref_r12.enabled ? "#1C4FC3" : "#D1D5DB");
    i0.ɵɵattribute("aria-checked", pref_r12.enabled)("aria-label", pref_r12.label);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("transform", pref_r12.enabled ? "translateX(20px)" : "translateX(2px)");
} }
function LayoutComponent_Conditional_55_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 68);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_55_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showSettings.set(false)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 89)(3, "div", 90)(4, "div")(5, "h2", 91);
    i0.ɵɵtext(6, "Settings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 92);
    i0.ɵɵtext(8, "Manage your account and preferences");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 93);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_55_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showSettings.set(false)); });
    i0.ɵɵelement(10, "ng-icon", 8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 94)(12, "div", 95)(13, "div")(14, "div", 96);
    i0.ɵɵelement(15, "ng-icon", 97);
    i0.ɵɵelementStart(16, "h3", 98);
    i0.ɵɵtext(17, "Appearance");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 99);
    i0.ɵɵrepeaterCreate(19, LayoutComponent_Conditional_55_For_20_Template, 4, 7, "button", 100, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div")(22, "div", 96);
    i0.ɵɵelement(23, "ng-icon", 101);
    i0.ɵɵelementStart(24, "h3", 98);
    i0.ɵɵtext(25, "Notifications");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 102);
    i0.ɵɵrepeaterCreate(27, LayoutComponent_Conditional_55_For_28_Template, 8, 8, "div", 103, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "div", 96);
    i0.ɵɵelement(31, "ng-icon", 104);
    i0.ɵɵelementStart(32, "h3", 98);
    i0.ɵɵtext(33, "Security");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 102)(35, "button", 105)(36, "div")(37, "p", 81);
    i0.ɵɵtext(38, "Change password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "p", 50);
    i0.ɵɵtext(40, "Last changed 30 days ago");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(41, "ng-icon", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 105)(43, "div")(44, "p", 81);
    i0.ɵɵtext(45, "Two-factor authentication");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p", 50);
    i0.ɵɵtext(47, "Not enabled");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "span", 107);
    i0.ɵɵtext(49, "Recommended");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(50, "div", 108)(51, "button", 109);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_55_Template_button_click_51_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showSettings.set(false)); });
    i0.ɵɵtext(52, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "button", 110);
    i0.ɵɵlistener("click", function LayoutComponent_Conditional_55_Template_button_click_53_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showSettings.set(false)); });
    i0.ɵɵtext(54, " Save changes ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("size", "16");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", "15");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.themes);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("size", "15");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.notifPrefs);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("size", "15");
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("size", "14");
} }
export class LayoutComponent {
    router = inject(Router);
    themeService = inject(ThemeService);
    sidebarExpanded = signal(false, ...(ngDevMode ? [{ debugName: "sidebarExpanded" }] : /* istanbul ignore next */ []));
    showProfile = signal(false, ...(ngDevMode ? [{ debugName: "showProfile" }] : /* istanbul ignore next */ []));
    showSettings = signal(false, ...(ngDevMode ? [{ debugName: "showSettings" }] : /* istanbul ignore next */ []));
    showNotifications = signal(false, ...(ngDevMode ? [{ debugName: "showNotifications" }] : /* istanbul ignore next */ []));
    mobileNavOpen = signal(false, ...(ngDevMode ? [{ debugName: "mobileNavOpen" }] : /* istanbul ignore next */ []));
    themes = [
        { id: 'light', label: 'Light', icon: 'lucideSun' },
        { id: 'dark', label: 'Dark', icon: 'lucideMoon' },
        { id: 'system', label: 'System', icon: 'lucideMonitor' },
    ];
    notifPrefs = [
        { label: 'New matches', desc: 'When an investor matches your startup', enabled: true },
        { label: 'Session reminders', desc: '1 hour before a mentoring session', enabled: true },
        { label: 'Event updates', desc: 'Changes to events you have registered for', enabled: false },
        { label: 'Community replies', desc: 'When someone replies to your discussion', enabled: true },
    ];
    notificationsList = signal([
        { id: 1, title: 'Startup Label renewal', body: 'Your label expires on Apr 30. Submit renewal documents.', time: '5 min ago', read: false, type: 'alert' },
        { id: 2, title: 'New investor match', body: 'North Africa Ventures expressed interest in TechFlow.', time: '1h ago', read: false, type: 'success' },
        { id: 3, title: 'Session reminder', body: 'Mentoring session with Sarah Chen in 1 hour.', time: '2h ago', read: false, type: 'info' },
        { id: 4, title: 'Event registration open', body: 'Pitch Day Spring 2026 registration is now open.', time: '4h ago', read: false, type: 'info' },
        { id: 5, title: 'Community reply', body: 'Ahmed Belkacemi replied to your FinTech discussion.', time: 'Yesterday', read: true, type: 'info' },
        { id: 6, title: 'Investment accepted', body: 'LogiTrack × Tech Africa Fund deal has been accepted.', time: 'Mar 20', read: true, type: 'success' },
    ], ...(ngDevMode ? [{ debugName: "notificationsList" }] : /* istanbul ignore next */ []));
    notifications = this.notificationsList.asReadonly();
    unreadCount = computed(() => this.notificationsList().filter(n => !n.read).length, ...(ngDevMode ? [{ debugName: "unreadCount" }] : /* istanbul ignore next */ []));
    markAllRead() {
        this.notificationsList.update(list => list.map(n => ({ ...n, read: true })));
    }
    openMobileNav() {
        this.mobileNavOpen.set(true);
    }
    closeMobileNav() {
        this.mobileNavOpen.set(false);
    }
    navItems = [
        { icon: 'lucideLayoutDashboard', label: 'Dashboard', route: '/dashboard' },
        { icon: 'lucideRocket', label: 'Projects', route: '/projects' },
        { icon: 'lucideUsers', label: 'Community', route: '/community' },
        { icon: 'lucideScale', label: 'Legal', route: '/legal' },
        { icon: 'lucideTrendingUp', label: 'Investments', route: '/investments' },
        { icon: 'lucideGraduationCap', label: 'Mentoring', route: '/mentoring' },
        { icon: 'lucideMap', label: 'Roadmaps', route: '/roadmaps' },
        { icon: 'lucideHandshake', label: 'Partnerships', route: '/partnerships' },
        { icon: 'lucideCalendar', label: 'Events', route: '/events' },
    ];
    url = toSignal(this.router.events.pipe(filter((e) => e instanceof NavigationEnd)), { initialValue: null });
    currentPageTitle = computed(() => {
        this.url();
        const segment = this.router.url.split('/')[1]?.split('?')[0] ?? '';
        return this.navItems.find((n) => n.route === '/' + segment)?.label ?? 'FoundersLab';
    }, ...(ngDevMode ? [{ debugName: "currentPageTitle" }] : /* istanbul ignore next */ []));
    static ɵfac = function LayoutComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LayoutComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LayoutComponent, selectors: [["app-layout"]], features: [i0.ɵɵProvidersFeature([
                provideIcons({
                    lucideBell, lucideCalendar, lucideChevronDown, lucideGraduationCap,
                    lucideHandshake, lucideLayoutDashboard, lucideMap, lucideRocket,
                    lucideScale, lucideSearch, lucideSettings, lucideTrendingUp,
                    lucideUsers, lucideLogOut, lucideUser, lucideX, lucideMail,
                    lucideBriefcase, lucideShield, lucideGlobe, lucideCheck,
                    lucideAlertCircle, lucideEdit, lucideMoon, lucideSun, lucideStar,
                    lucideMonitor, lucideMenu,
                }),
            ])], decls: 56, vars: 31, consts: [[1, "flex", "min-h-screen", "overflow-hidden", 2, "background", "var(--background)"], ["type", "button", "aria-label", "Close navigation menu", 1, "mobile-nav-backdrop"], ["aria-label", "Main navigation", 1, "sidebar-nav", "fixed", "inset-y-0", "left-0", "z-50", "flex", "flex-col", 2, "background", "#1F2937", "border-right", "1px solid rgba(255,255,255,0.07)", 3, "mouseenter", "mouseleave"], [1, "flex", "items-center", "flex-shrink-0", 2, "height", "56px", "padding", "0 12px", "border-bottom", "1px solid rgba(255,255,255,0.07)", "min-width", "0"], [1, "nav-icon-wrapper", "flex", "items-center", "justify-center", 2, "width", "36px", "height", "36px", "flex-shrink", "0"], ["src", "white.png", "alt", "FoundersLab", 2, "width", "24px", "height", "24px", "object-fit", "contain"], [1, "sidebar-label", "ml-2.5", "font-bold", "text-white", 2, "font-size", "14px", "letter-spacing", "-0.02em"], ["type", "button", "aria-label", "Close navigation", 1, "ml-auto", "flex", "h-9", "w-9", "items-center", "justify-center", "rounded-lg", "text-white", "lg:hidden", 2, "background", "rgba(255,255,255,0.08)", "border", "none", "cursor", "pointer", 3, "click"], ["name", "lucideX", 3, "size"], [1, "flex", "flex-col", "gap-0.5", "py-3", "flex-1", 2, "padding-inline", "10px", "overflow", "hidden"], ["routerLinkActive", "active-nav", 1, "nav-item", "relative", "flex", "items-center", "rounded-lg", "transition-colors", "duration-150", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-purple-400", 2, "height", "40px", "padding", "0 2px", "color", "var(--text-secondary)", "text-decoration", "none", 3, "routerLink"], [1, "flex", "flex-col", "gap-1", 2, "border-top", "1px solid rgba(255,255,255,0.07)", "padding", "12px 10px 14px"], ["aria-label", "Open settings", 1, "nav-item", "relative", "flex", "items-center", "rounded-lg", "transition-colors", "duration-150", "w-full", 2, "height", "40px", "padding", "0 2px", "color", "var(--text-secondary)", "background", "transparent", "border", "none", "cursor", "pointer", 3, "click"], ["name", "lucideSettings", 3, "size"], [1, "sidebar-label", "ml-2.5", "text-sm", "font-medium", 2, "color", "#D1D5DB"], ["aria-label", "Open profile", 1, "relative", "flex", "items-center", "rounded-lg", "transition-colors", "hover:bg-gray-50", "dark:hover:bg-gray-800", "w-full", 2, "height", "44px", "padding", "0 2px", "background", "transparent", "border", "none", "cursor", "pointer", "margin-top", "4px", 3, "click"], [1, "flex", "items-center", "justify-center", "rounded-full", 2, "width", "36px", "height", "36px", "flex-shrink", "0", "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "font-size", "12px", "font-weight", "700"], [1, "sidebar-label", "ml-2.5", "text-left"], [2, "font-size", "12px", "font-weight", "600", "color", "#fff", "line-height", "1.3"], [2, "font-size", "11px", "color", "var(--text-secondary)"], [1, "main-shell", "flex", "flex-col", "flex-1", "overflow-hidden", 2, "margin-left", "60px"], ["role", "banner", 1, "flex", "flex-wrap", "items-center", "gap-3", "px-4", "py-3", "sm:px-6", "sm:py-0", "flex-shrink-0", 2, "min-height", "56px", "background", "var(--surface)", "border-bottom", "1px solid var(--border)", "position", "relative", "z-index", "20"], ["type", "button", "aria-label", "Open navigation", 1, "flex", "h-10", "w-10", "items-center", "justify-center", "rounded-lg", "lg:hidden", 2, "background", "var(--surface-subtle)", "border", "1px solid var(--border)", "color", "var(--text-primary)", "cursor", "pointer", 3, "click"], ["name", "lucideMenu", 3, "size"], [1, "min-w-0", "flex-1"], [1, "text-sm", "font-semibold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.01em"], [1, "relative", "hidden", "lg:block"], ["name", "lucideSearch", 2, "position", "absolute", "left", "10px", "top", "50%", "transform", "translateY(-50%)", "color", "var(--text-muted)", 3, "size"], ["type", "search", "placeholder", "Search...", "aria-label", "Search", 1, "focus:outline-none", 2, "padding", "6px 12px 6px 32px", "background", "var(--surface-input)", "border", "1.5px solid var(--border)", "border-radius", "8px", "width", "200px", "font-family", "var(--font-sans)", "font-size", "13px", "color", "var(--text-body)"], [1, "ml-auto", "flex", "items-center", "gap-2", "sm:gap-3"], [1, "relative"], ["aria-label", "Notifications", 1, "relative", "flex", "items-center", "justify-center", "rounded-lg", "transition-colors", "hover:bg-gray-100", "dark:hover:bg-gray-800", 2, "width", "36px", "height", "36px", "color", "var(--text-secondary)", "background", "transparent", "border", "none", "cursor", "pointer", 3, "click"], ["name", "lucideBell", 3, "size"], ["aria-hidden", "true", 1, "absolute", "rounded-full", "flex", "items-center", "justify-center", 2, "top", "5px", "right", "5px", "width", "16px", "height", "16px", "background", "var(--badge-notification-bg)", "color", "var(--badge-notification-text)", "font-size", "9px", "font-weight", "700"], ["aria-label", "Open profile", 1, "flex", "items-center", "gap-2", "rounded-lg", "cursor-pointer", "transition-colors", "hover:bg-gray-50", "dark:hover:bg-gray-800", 2, "padding", "4px 8px", "background", "transparent", "border", "none", 3, "click"], [1, "flex", "items-center", "justify-center", "rounded-full", "flex-shrink-0", 2, "width", "32px", "height", "32px", "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "font-size", "11px", "font-weight", "700"], [1, "hidden", "md:block", "text-left"], [1, "text-xs", "font-semibold", "leading-none", 2, "color", "var(--text-primary)"], [1, "text-xs", "leading-none", "mt-0.5", 2, "color", "var(--text-muted)"], ["name", "lucideChevronDown", 2, "color", "var(--text-muted)", 3, "size"], ["id", "main-content", 1, "app-main-content", "flex-1", "overflow-auto", "p-4", "sm:p-5", "lg:p-6"], ["role", "dialog", "aria-modal", "true", "aria-label", "User profile", 1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center"], ["role", "dialog", "aria-modal", "true", "aria-label", "Settings", 1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center"], ["type", "button", "aria-label", "Close navigation menu", 1, "mobile-nav-backdrop", 3, "click"], ["routerLinkActive", "active-nav", 1, "nav-item", "relative", "flex", "items-center", "rounded-lg", "transition-colors", "duration-150", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-purple-400", 2, "height", "40px", "padding", "0 2px", "color", "var(--text-secondary)", "text-decoration", "none", 3, "click", "routerLink"], [3, "name", "size"], ["aria-hidden", "true", 1, "fixed", "inset-0", "z-40", 3, "click"], ["role", "dialog", "aria-label", "Notifications", 1, "fixed", "z-50", "rounded-2xl", "overflow-hidden", 2, "top", "64px", "right", "12px", "width", "min(340px, calc(100vw - 24px))", "background", "var(--surface)", "box-shadow", "0 8px 40px rgba(11,15,42,0.18)", "border", "1px solid var(--border)"], [1, "flex", "items-center", "justify-between", "px-5", "py-4", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "text-sm", "font-bold", 2, "color", "var(--text-primary)"], [1, "text-xs", 2, "color", "var(--text-muted)"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "font-semibold", 2, "color", "#1C4FC3", "background", "transparent", "border", "none", "cursor", "pointer", 3, "click"], ["aria-label", "Close notifications", 1, "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-gray-100", "dark:hover:bg-gray-800", "transition-colors", 2, "width", "28px", "height", "28px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "var(--text-muted)", 3, "click"], [2, "max-height", "360px", "overflow-y", "auto"], [1, "flex", "items-start", "gap-3", "px-5", "py-3.5", "transition-colors", "hover:bg-gray-50", "dark:hover:bg-gray-800", "cursor-pointer", 2, "border-bottom", "1px solid var(--border-subtle)", 3, "background"], [1, "px-5", "py-3", "text-center", 2, "border-top", "1px solid var(--border-subtle)"], [1, "text-xs", "font-semibold", 2, "color", "#1C4FC3", "background", "transparent", "border", "none", "cursor", "pointer"], [1, "flex", "items-start", "gap-3", "px-5", "py-3.5", "transition-colors", "hover:bg-gray-50", "dark:hover:bg-gray-800", "cursor-pointer", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "flex", "items-center", "justify-center", "rounded-full", "flex-shrink-0", "mt-0.5", 2, "width", "32px", "height", "32px"], ["name", "lucideAlertCircle", 2, "color", "var(--badge-amber-text)", 3, "size"], ["name", "lucideCheck", 2, "color", "var(--badge-green-text)", 3, "size"], ["name", "lucideBell", 2, "color", "var(--badge-purple-text)", 3, "size"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-semibold", 2, "color", "var(--text-primary)"], [1, "text-xs", "mt-0.5", "leading-snug", 2, "color", "var(--text-secondary)"], [1, "text-xs", "mt-1", 2, "color", "var(--text-muted)"], [1, "flex-shrink-0", "rounded-full", "mt-1.5", 2, "width", "7px", "height", "7px", "background", "#1C4FC3"], [1, "modal-backdrop", 3, "click"], [1, "relative", "rounded-2xl", "overflow-hidden", 2, "background", "var(--surface)", "width", "min(380px, calc(100vw - 24px))", "box-shadow", "0 24px 64px rgba(0,0,0,0.28)"], [1, "relative", 2, "background", "linear-gradient(135deg,#1F2937 0%,#1D1384 60%,#1D1384 100%)", "padding", "32px 24px 24px", "text-align", "center"], ["aria-label", "Close profile", 1, "absolute", "flex", "items-center", "justify-center", "rounded-lg", "transition-colors", "hover:bg-white", "dark:bg-gray-900/10", 2, "top", "16px", "right", "16px", "width", "32px", "height", "32px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "#93C5FD", 3, "click"], [1, "flex", "items-center", "justify-center", "rounded-full", "mx-auto", "mb-3", 2, "width", "72px", "height", "72px", "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "font-size", "22px", "font-weight", "800", "border", "3px solid rgba(255,255,255,0.15)"], [2, "color", "#fff", "font-size", "18px", "font-weight", "700", "letter-spacing", "-0.02em", "margin", "0 0 4px"], [2, "color", "rgb(229 231 235)", "font-size", "13px", "margin", "0"], [1, "inline-flex", "items-center", "gap-1", "mt-3", "px-3", "py-1", "rounded-full", "text-xs", "font-semibold", 2, "background", "rgba(108,62,255,0.25)", "color", "#93C5FD"], ["name", "lucideStar", 3, "size"], [2, "padding", "20px 24px"], [1, "space-y-3"], [1, "flex", "items-center", "gap-3", "rounded-lg", "p-3", 2, "background", "var(--surface-subtle)"], ["name", "lucideMail", 2, "color", "#1C4FC3", "flex-shrink", "0", 3, "size"], [1, "text-sm", "font-medium", 2, "color", "var(--text-primary)"], ["name", "lucideBriefcase", 2, "color", "#1C4FC3", "flex-shrink", "0", 3, "size"], ["name", "lucideGlobe", 2, "color", "#1C4FC3", "flex-shrink", "0", 3, "size"], [1, "flex", "flex-col", "gap-3", "mt-5", "sm:flex-row"], [1, "flex", "items-center", "justify-center", "gap-1.5", "rounded-xl", "flex-1", "text-sm", "font-semibold", "cursor-pointer", "transition-opacity", "hover:opacity-90", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "border", "none", "padding", "10px", 3, "click"], ["name", "lucideEdit", 3, "size"], [1, "flex", "items-center", "justify-center", "gap-1.5", "rounded-xl", "text-sm", "font-semibold", "cursor-pointer", "transition-colors", "hover:bg-red-50", "dark:hover:bg-gray-800", 2, "background", "#FEF2F2", "color", "var(--badge-red-text)", "border", "none", "padding", "10px 16px", 3, "click"], ["name", "lucideLogOut", 3, "size"], [1, "relative", "rounded-2xl", "overflow-hidden", 2, "background", "var(--surface)", "width", "min(480px, calc(100vw - 24px))", "box-shadow", "0 24px 64px rgba(0,0,0,0.28)"], [1, "flex", "items-center", "justify-between", "px-6", "py-5", 2, "border-bottom", "1px solid var(--border-subtle)"], [1, "text-base", "font-bold", 2, "color", "var(--text-primary)"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-muted)"], ["aria-label", "Close settings", 1, "flex", "items-center", "justify-center", "rounded-lg", "transition-colors", "hover:bg-gray-100", "dark:hover:bg-gray-800", 2, "width", "32px", "height", "32px", "background", "transparent", "border", "none", "cursor", "pointer", "color", "var(--text-muted)", 3, "click"], [2, "max-height", "70vh", "overflow-y", "auto", "padding", "24px"], [1, "space-y-6"], [1, "flex", "items-center", "gap-2", "mb-3"], ["name", "lucideSun", 2, "color", "#1C4FC3", 3, "size"], [1, "text-sm", "font-semibold", 2, "color", "var(--text-primary)"], [1, "grid", "gap-2", "sm:grid-cols-3"], [1, "rounded-xl", "border-2", "p-3", "cursor-pointer", "text-center", "transition-all", 2, "background", "var(--surface-subtle)", "font-family", "var(--font-sans)", 3, "border-color"], ["name", "lucideBell", 2, "color", "#1C4FC3", 3, "size"], [1, "space-y-2"], [1, "flex", "flex-col", "gap-3", "rounded-xl", "p-3.5", "sm:flex-row", "sm:items-center", "sm:justify-between", 2, "background", "var(--surface-subtle)"], ["name", "lucideShield", 2, "color", "#1C4FC3", 3, "size"], [1, "flex", "items-center", "justify-between", "w-full", "rounded-xl", "p-3.5", "transition-colors", "hover:bg-gray-100", "dark:hover:bg-gray-800", "text-left", "cursor-pointer", 2, "background", "var(--surface-subtle)", "border", "none"], ["name", "lucideChevronDown", 2, "color", "var(--text-muted)", "transform", "rotate(-90deg)", 3, "size"], [1, "text-xs", "font-semibold", "px-2", "py-0.5", "rounded", 2, "background", "var(--badge-amber-bg)", "color", "var(--badge-amber-text)"], [1, "flex", "flex-col-reverse", "gap-3", "px-6", "py-4", "sm:flex-row", "sm:items-center", "sm:justify-end", 2, "border-top", "1px solid var(--border-subtle)"], [1, "text-sm", "font-semibold", "rounded-xl", "cursor-pointer", "transition-colors", "hover:bg-gray-100", "dark:hover:bg-gray-800", 2, "background", "transparent", "border", "1.5px solid var(--border)", "color", "var(--text-body)", "padding", "8px 20px", 3, "click"], [1, "text-sm", "font-semibold", "rounded-xl", "cursor-pointer", "transition-opacity", "hover:opacity-90", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "border", "none", "padding", "8px 20px", 3, "click"], [1, "rounded-xl", "border-2", "p-3", "cursor-pointer", "text-center", "transition-all", 2, "background", "var(--surface-subtle)", "font-family", "var(--font-sans)", 3, "click"], [2, "display", "block", "margin", "0 auto 4px", 3, "name", "size"], [1, "text-xs", "font-medium"], ["role", "switch", 1, "relative", "rounded-full", "transition-colors", "flex-shrink-0", 2, "width", "40px", "height", "22px", "border", "none", "cursor", "pointer", 3, "click"], [1, "absolute", "top-0.5", "rounded-full", "transition-transform", 2, "width", "18px", "height", "18px", "background", "var(--surface)", "box-shadow", "0 1px 3px rgba(0,0,0,0.2)"]], template: function LayoutComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, LayoutComponent_Conditional_1_Template, 1, 0, "button", 1);
            i0.ɵɵelementStart(2, "aside", 2);
            i0.ɵɵlistener("mouseenter", function LayoutComponent_Template_aside_mouseenter_2_listener() { return ctx.sidebarExpanded.set(true); })("mouseleave", function LayoutComponent_Template_aside_mouseleave_2_listener() { return ctx.sidebarExpanded.set(false); });
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4);
            i0.ɵɵelement(5, "img", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 6);
            i0.ɵɵtext(7, " FoundersLab ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "button", 7);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_8_listener() { return ctx.closeMobileNav(); });
            i0.ɵɵelement(9, "ng-icon", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "nav", 9);
            i0.ɵɵrepeaterCreate(11, LayoutComponent_For_12_Template, 5, 9, "a", 10, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 11)(14, "button", 12);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_14_listener() { ctx.showSettings.set(true); return ctx.closeMobileNav(); });
            i0.ɵɵelementStart(15, "div", 4);
            i0.ɵɵelement(16, "ng-icon", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 14);
            i0.ɵɵtext(18, " Settings ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "button", 15);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_19_listener() { ctx.showProfile.set(true); return ctx.closeMobileNav(); });
            i0.ɵɵelementStart(20, "div", 16);
            i0.ɵɵtext(21, " MS ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 17)(23, "p", 18);
            i0.ɵɵtext(24, "Mohamed Slimane");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "p", 19);
            i0.ɵɵtext(26, "Founder");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(27, "div", 20)(28, "header", 21)(29, "button", 22);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_29_listener() { return ctx.openMobileNav(); });
            i0.ɵɵelement(30, "ng-icon", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 24)(32, "h1", 25);
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 26);
            i0.ɵɵelement(35, "ng-icon", 27)(36, "input", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 29)(38, "div", 30)(39, "button", 31);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_39_listener() { return ctx.showNotifications.set(!ctx.showNotifications()); });
            i0.ɵɵelement(40, "ng-icon", 32);
            i0.ɵɵconditionalCreate(41, LayoutComponent_Conditional_41_Template, 2, 1, "span", 33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "button", 34);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_42_listener() { return ctx.showProfile.set(true); });
            i0.ɵɵelementStart(43, "div", 35);
            i0.ɵɵtext(44, " MS ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 36)(46, "p", 37);
            i0.ɵɵtext(47, "Mohamed Slimane");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "p", 38);
            i0.ɵɵtext(49, "Founder");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(50, "ng-icon", 39);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(51, "main", 40);
            i0.ɵɵelement(52, "router-outlet");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(53, LayoutComponent_Conditional_53_Template, 19, 2);
            i0.ɵɵconditionalCreate(54, LayoutComponent_Conditional_54_Template, 45, 7, "div", 41);
            i0.ɵɵconditionalCreate(55, LayoutComponent_Conditional_55_Template, 55, 5, "div", 42);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mobileNavOpen() ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("width", ctx.sidebarExpanded() ? "220px" : "60px")("box-shadow", ctx.sidebarExpanded() ? "4px 0 28px rgba(0,0,0,0.32)" : "none");
            i0.ɵɵclassProp("mobile-open", ctx.mobileNavOpen());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("opacity", ctx.sidebarExpanded() ? 1 : 0)("transition-delay", ctx.sidebarExpanded() ? "0.1s" : "0s");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("size", "16");
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.navItems);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("size", "17");
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("opacity", ctx.sidebarExpanded() ? 1 : 0)("transition-delay", ctx.sidebarExpanded() ? "0.1s" : "0s");
            i0.ɵɵadvance(5);
            i0.ɵɵstyleProp("opacity", ctx.sidebarExpanded() ? 1 : 0)("transition-delay", ctx.sidebarExpanded() ? "0.1s" : "0s");
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("size", "18");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.currentPageTitle(), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("aria-expanded", ctx.showNotifications());
            i0.ɵɵadvance();
            i0.ɵɵproperty("size", "18");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.unreadCount() > 0 ? 41 : -1);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "13");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.showNotifications() ? 53 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showProfile() ? 54 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showSettings() ? 55 : -1);
        } }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, NgIconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LayoutComponent, [{
        type: Component,
        args: [{
                selector: 'app-layout',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIconComponent],
                providers: [
                    provideIcons({
                        lucideBell, lucideCalendar, lucideChevronDown, lucideGraduationCap,
                        lucideHandshake, lucideLayoutDashboard, lucideMap, lucideRocket,
                        lucideScale, lucideSearch, lucideSettings, lucideTrendingUp,
                        lucideUsers, lucideLogOut, lucideUser, lucideX, lucideMail,
                        lucideBriefcase, lucideShield, lucideGlobe, lucideCheck,
                        lucideAlertCircle, lucideEdit, lucideMoon, lucideSun, lucideStar,
                        lucideMonitor, lucideMenu,
                    }),
                ],
                template: `
    <div class="flex min-h-screen overflow-hidden" style="background:var(--background);">
      @if (mobileNavOpen()) {
        <button
          type="button"
          class="mobile-nav-backdrop"
          (click)="closeMobileNav()"
          aria-label="Close navigation menu"
        ></button>
      }

      <!-- ══ SIDEBAR (width driven by sidebarExpanded signal) ══ -->
      <aside
        class="sidebar-nav fixed inset-y-0 left-0 z-50 flex flex-col"
        [class.mobile-open]="mobileNavOpen()"
        [style.width]="sidebarExpanded() ? '220px' : '60px'"
        [style.box-shadow]="sidebarExpanded() ? '4px 0 28px rgba(0,0,0,0.32)' : 'none'"
        style="background:#1F2937; border-right:1px solid rgba(255,255,255,0.07);"
        aria-label="Main navigation"
        (mouseenter)="sidebarExpanded.set(true)"
        (mouseleave)="sidebarExpanded.set(false)"
      >
        <!-- Logo row -->
        <div class="flex items-center flex-shrink-0"
          style="height:56px; padding:0 12px; border-bottom:1px solid rgba(255,255,255,0.07); min-width:0;">
          <div class="nav-icon-wrapper flex items-center justify-center" style="width:36px; height:36px; flex-shrink:0;">
            <img src="white.png" alt="FoundersLab" style="width:24px; height:24px; object-fit:contain;" />
          </div>
          <span class="sidebar-label ml-2.5 font-bold text-white"
            [style.opacity]="sidebarExpanded() ? 1 : 0"
            [style.transition-delay]="sidebarExpanded() ? '0.1s' : '0s'"
            style="font-size:14px; letter-spacing:-0.02em;">
            FoundersLab
          </span>
          <button
            type="button"
            (click)="closeMobileNav()"
            class="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-white lg:hidden"
            style="background:rgba(255,255,255,0.08); border:none; cursor:pointer;"
            aria-label="Close navigation"
          >
            <ng-icon name="lucideX" [size]="'16'" />
          </button>
        </div>

        <!-- Nav items -->
        <nav class="flex flex-col gap-0.5 py-3 flex-1" style="padding-inline:10px; overflow:hidden;">
          @for (item of navItems; track item.route) {
            <a
              [routerLink]="item.route"
              routerLinkActive="active-nav"
              (click)="closeMobileNav()"
              class="nav-item relative flex items-center rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              style="height:40px; padding:0 2px; color:var(--text-secondary); text-decoration:none;"
              [attr.aria-label]="item.label"
            >
              <div class="nav-icon-wrapper flex items-center justify-center" style="width:36px; height:36px; flex-shrink:0;">
                <ng-icon [name]="item.icon" [size]="'17'" />
              </div>
              <span class="sidebar-label ml-2.5 text-sm font-medium"
                [style.opacity]="sidebarExpanded() ? 1 : 0"
                [style.transition-delay]="sidebarExpanded() ? '0.1s' : '0s'"
                style="color:#D1D5DB;">
                {{ item.label }}
              </span>
            </a>
          }
        </nav>

        <!-- Bottom: Settings + Profile -->
        <div class="flex flex-col gap-1" style="border-top:1px solid rgba(255,255,255,0.07); padding:12px 10px 14px;">
          <!-- Settings -->
          <button
            (click)="showSettings.set(true); closeMobileNav()"
            class="nav-item relative flex items-center rounded-lg transition-colors duration-150 w-full"
            style="height:40px; padding:0 2px; color:var(--text-secondary); background:transparent; border:none; cursor:pointer;"
            aria-label="Open settings"
          >
            <div class="nav-icon-wrapper flex items-center justify-center" style="width:36px; height:36px; flex-shrink:0;">
              <ng-icon name="lucideSettings" [size]="'17'" />
            </div>
            <span class="sidebar-label ml-2.5 text-sm font-medium"
              [style.opacity]="sidebarExpanded() ? 1 : 0"
              [style.transition-delay]="sidebarExpanded() ? '0.1s' : '0s'"
              style="color:#D1D5DB;">
              Settings
            </span>
          </button>

          <!-- Profile -->
          <button
            (click)="showProfile.set(true); closeMobileNav()"
            class="relative flex items-center rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 w-full"
            style="height:44px; padding:0 2px; background:transparent; border:none; cursor:pointer; margin-top:4px;"
            aria-label="Open profile"
          >
            <div class="flex items-center justify-center rounded-full"
              style="width:36px; height:36px; flex-shrink:0; background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; font-size:12px; font-weight:700;">
              MS
            </div>
            <div class="sidebar-label ml-2.5 text-left"
              [style.opacity]="sidebarExpanded() ? 1 : 0"
              [style.transition-delay]="sidebarExpanded() ? '0.1s' : '0s'">
              <p style="font-size:12px; font-weight:600; color:#fff; line-height:1.3;">Mohamed Slimane</p>
              <p style="font-size:11px; color:var(--text-secondary);">Founder</p>
            </div>
          </button>
        </div>
      </aside>

      <!-- ══ MAIN AREA (offset by sidebar width) ══ -->
      <div class="main-shell flex flex-col flex-1 overflow-hidden" style="margin-left:60px;">

        <!-- TOPBAR -->
        <header
          class="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6 sm:py-0 flex-shrink-0"
          style="min-height:56px; background:var(--surface); border-bottom:1px solid var(--border); position:relative; z-index:20;"
          role="banner"
        >
          <button
            type="button"
            (click)="openMobileNav()"
            class="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            style="background:var(--surface-subtle); border:1px solid var(--border); color:var(--text-primary); cursor:pointer;"
            aria-label="Open navigation"
          >
            <ng-icon name="lucideMenu" [size]="'18'" />
          </button>

          <div class="min-w-0 flex-1">
            <h1 class="text-sm font-semibold" style="color:var(--text-primary); letter-spacing:-0.01em;">
              {{ currentPageTitle() }}
            </h1>
          </div>

          <!-- Search -->
          <div class="relative hidden lg:block">
            <ng-icon name="lucideSearch" [size]="'14'"
              style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--text-muted);" />
            <input type="search" placeholder="Search..." aria-label="Search"
              class="focus:outline-none"
              style="padding:6px 12px 6px 32px; background:var(--surface-input); border:1.5px solid var(--border); border-radius:8px; width:200px; font-family:var(--font-sans); font-size:13px; color:var(--text-body);" />
          </div>

          <div class="ml-auto flex items-center gap-2 sm:gap-3">
            <!-- Notifications bell -->
            <div class="relative">
              <button
                (click)="showNotifications.set(!showNotifications())"
                class="relative flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                style="width:36px; height:36px; color:var(--text-secondary); background:transparent; border:none; cursor:pointer;"
                aria-label="Notifications"
                [attr.aria-expanded]="showNotifications()"
              >
                <ng-icon name="lucideBell" [size]="'18'" />
                @if (unreadCount() > 0) {
                  <span aria-hidden="true" class="absolute rounded-full flex items-center justify-center"
                    style="top:5px; right:5px; width:16px; height:16px; background:var(--badge-notification-bg); color:var(--badge-notification-text); font-size:9px; font-weight:700;">
                    {{ unreadCount() }}
                  </span>
                }
              </button>
            </div>

            <!-- User info (topbar) -->
            <button
              (click)="showProfile.set(true)"
              class="flex items-center gap-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              style="padding:4px 8px; background:transparent; border:none;"
              aria-label="Open profile"
            >
              <div class="flex items-center justify-center rounded-full flex-shrink-0"
                style="width:32px; height:32px; background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; font-size:11px; font-weight:700;">
                MS
              </div>
              <div class="hidden md:block text-left">
                <p class="text-xs font-semibold leading-none" style="color:var(--text-primary);">Mohamed Slimane</p>
                <p class="text-xs leading-none mt-0.5" style="color:var(--text-muted);">Founder</p>
              </div>
              <ng-icon name="lucideChevronDown" [size]="'13'" style="color:var(--text-muted);" />
            </button>
          </div>
        </header>

        <!-- PAGE CONTENT -->
        <main class="app-main-content flex-1 overflow-auto p-4 sm:p-5 lg:p-6" id="main-content">
          <router-outlet />
        </main>
      </div>


      <!-- ══════════════════════════════════════ -->
      <!-- NOTIFICATIONS DROPDOWN               -->
      <!-- ══════════════════════════════════════ -->
      @if (showNotifications()) {
        <div class="fixed inset-0 z-40" (click)="showNotifications.set(false)" aria-hidden="true"></div>
        <div
          class="fixed z-50 rounded-2xl overflow-hidden"
          style="top:64px; right:12px; width:min(340px, calc(100vw - 24px)); background:var(--surface); box-shadow:0 8px 40px rgba(11,15,42,0.18); border:1px solid var(--border);"
          role="dialog" aria-label="Notifications"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid var(--border-subtle);">
            <div>
              <h3 class="text-sm font-bold" style="color:var(--text-primary);">Notifications</h3>
              <p class="text-xs" style="color:var(--text-muted);">{{ unreadCount() }} unread</p>
            </div>
            <div class="flex items-center gap-2">
              <button (click)="markAllRead()" class="text-xs font-semibold" style="color:#1C4FC3; background:transparent; border:none; cursor:pointer;">
                Mark all read
              </button>
              <button (click)="showNotifications.set(false)"
                class="flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style="width:28px; height:28px; background:transparent; border:none; cursor:pointer; color:var(--text-muted);"
                aria-label="Close notifications">
                <ng-icon name="lucideX" [size]="'14'" />
              </button>
            </div>
          </div>

          <!-- Notification list -->
          <div style="max-height:360px; overflow-y:auto;">
            @for (n of notifications(); track n.id) {
              <div class="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                style="border-bottom:1px solid var(--border-subtle);"
                [style.background]="n.read ? 'var(--surface)' : 'var(--surface-accent)'"
              >
                <div class="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                  style="width:32px; height:32px;"
                  [style.background]="n.type === 'alert' ? 'var(--badge-amber-bg)' : n.type === 'success' ? 'var(--badge-green-bg)' : 'var(--badge-purple-bg)'">
                  @if (n.type === 'alert') {
                    <ng-icon name="lucideAlertCircle" [size]="'14'" style="color:var(--badge-amber-text);" />
                  } @else if (n.type === 'success') {
                    <ng-icon name="lucideCheck" [size]="'14'" style="color:var(--badge-green-text);" />
                  } @else {
                    <ng-icon name="lucideBell" [size]="'14'" style="color:var(--badge-purple-text);" />
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold" style="color:var(--text-primary);">{{ n.title }}</p>
                  <p class="text-xs mt-0.5 leading-snug" style="color:var(--text-secondary);">{{ n.body }}</p>
                  <p class="text-xs mt-1" style="color:var(--text-muted);">{{ n.time }}</p>
                </div>
                @if (!n.read) {
                  <div class="flex-shrink-0 rounded-full mt-1.5" style="width:7px; height:7px; background:#1C4FC3;"></div>
                }
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="px-5 py-3 text-center" style="border-top:1px solid var(--border-subtle);">
            <button class="text-xs font-semibold" style="color:#1C4FC3; background:transparent; border:none; cursor:pointer;">
              View all notifications
            </button>
          </div>
        </div>
      }


      <!-- ══════════════════════════════════════ -->
      <!-- PROFILE MODAL                        -->
      <!-- ══════════════════════════════════════ -->
      @if (showProfile()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="User profile">
          <div class="modal-backdrop" (click)="showProfile.set(false)"></div>
          <div class="relative rounded-2xl overflow-hidden" style="background:var(--surface); width:min(380px, calc(100vw - 24px)); box-shadow:0 24px 64px rgba(0,0,0,0.28);">

            <!-- Profile header gradient -->
            <div class="relative" style="background:linear-gradient(135deg,#1F2937 0%,#1D1384 60%,#1D1384 100%); padding:32px 24px 24px; text-align:center;">
              <button
                (click)="showProfile.set(false)"
                class="absolute flex items-center justify-center rounded-lg transition-colors hover:bg-white dark:bg-gray-900/10"
                style="top:16px; right:16px; width:32px; height:32px; background:transparent; border:none; cursor:pointer; color:#93C5FD;"
                aria-label="Close profile"
              >
                <ng-icon name="lucideX" [size]="'16'" />
              </button>
              <div class="flex items-center justify-center rounded-full mx-auto mb-3"
                style="width:72px; height:72px; background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; font-size:22px; font-weight:800; border:3px solid rgba(255,255,255,0.15);">
                MS
              </div>
              <h2 style="color:#fff; font-size:18px; font-weight:700; letter-spacing:-0.02em; margin:0 0 4px;">Mohamed Slimane</h2>
              <p style="color:rgb(229 231 235); font-size:13px; margin:0;">Founder · FoundersLab</p>
              <span class="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-xs font-semibold"
                style="background:rgba(108,62,255,0.25); color:#93C5FD;">
                <ng-icon name="lucideStar" [size]="'11'" />
                Premium Plan
              </span>
            </div>

            <!-- Profile body -->
            <div style="padding:20px 24px;">
              <div class="space-y-3">
                <div class="flex items-center gap-3 rounded-lg p-3" style="background:var(--surface-subtle);">
                  <ng-icon name="lucideMail" [size]="'15'" style="color:#1C4FC3; flex-shrink:0;" />
                  <div>
                    <p class="text-xs" style="color:var(--text-muted);">Email</p>
                    <p class="text-sm font-medium" style="color:var(--text-primary);">slimane&#64;founderslab.io</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 rounded-lg p-3" style="background:var(--surface-subtle);">
                  <ng-icon name="lucideBriefcase" [size]="'15'" style="color:#1C4FC3; flex-shrink:0;" />
                  <div>
                    <p class="text-xs" style="color:var(--text-muted);">Role</p>
                    <p class="text-sm font-medium" style="color:var(--text-primary);">Founder &amp; Admin</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 rounded-lg p-3" style="background:var(--surface-subtle);">
                  <ng-icon name="lucideGlobe" [size]="'15'" style="color:#1C4FC3; flex-shrink:0;" />
                  <div>
                    <p class="text-xs" style="color:var(--text-muted);">Member since</p>
                    <p class="text-sm font-medium" style="color:var(--text-primary);">January 2026</p>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-3 mt-5 sm:flex-row">
                <button
                  (click)="showProfile.set(false)"
                  class="flex items-center justify-center gap-1.5 rounded-xl flex-1 text-sm font-semibold cursor-pointer transition-opacity hover:opacity-90"
                  style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; border:none; padding:10px;">
                  <ng-icon name="lucideEdit" [size]="'14'" />
                  Edit Profile
                </button>
                <button
                  (click)="showProfile.set(false)"
                  class="flex items-center justify-center gap-1.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors hover:bg-red-50 dark:hover:bg-gray-800"
                  style="background:#FEF2F2; color:var(--badge-red-text); border:none; padding:10px 16px;">
                  <ng-icon name="lucideLogOut" [size]="'14'" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      }


      <!-- ══════════════════════════════════════ -->
      <!-- SETTINGS MODAL                       -->
      <!-- ══════════════════════════════════════ -->
      @if (showSettings()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Settings">
          <div class="modal-backdrop" (click)="showSettings.set(false)"></div>
          <div class="relative rounded-2xl overflow-hidden" style="background:var(--surface); width:min(480px, calc(100vw - 24px)); box-shadow:0 24px 64px rgba(0,0,0,0.28);">

            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-5" style="border-bottom:1px solid var(--border-subtle);">
              <div>
                <h2 class="text-base font-bold" style="color:var(--text-primary);">Settings</h2>
                <p class="text-xs mt-0.5" style="color:var(--text-muted);">Manage your account and preferences</p>
              </div>
              <button (click)="showSettings.set(false)"
                class="flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                style="width:32px; height:32px; background:transparent; border:none; cursor:pointer; color:var(--text-muted);"
                aria-label="Close settings">
                <ng-icon name="lucideX" [size]="'16'" />
              </button>
            </div>

            <!-- Body -->
            <div style="max-height:70vh; overflow-y:auto; padding:24px;">
              <div class="space-y-6">

                <!-- Appearance -->
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <ng-icon name="lucideSun" [size]="'15'" style="color:#1C4FC3;" />
                    <h3 class="text-sm font-semibold" style="color:var(--text-primary);">Appearance</h3>
                  </div>
                  <div class="grid gap-2 sm:grid-cols-3">
                    @for (theme of themes; track theme.label) {
                      <button
                        (click)="themeService.theme.set(theme.id)"
                        class="rounded-xl border-2 p-3 cursor-pointer text-center transition-all"
                        style="background:var(--surface-subtle); font-family:var(--font-sans);"
                        [style.border-color]="themeService.theme() === theme.id ? '#1C4FC3' : 'var(--border)'"
                      >
                        <ng-icon [name]="theme.icon" [size]="'18'" style="display:block; margin:0 auto 4px;"></ng-icon>
                        <p class="text-xs font-medium" [style.color]="themeService.theme() === theme.id ? '#1C4FC3' : 'var(--text-body)'">
                          {{ theme.label }}
                        </p>
                      </button>
                    }
                  </div>
                </div>

                <!-- Notifications -->
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <ng-icon name="lucideBell" [size]="'15'" style="color:#1C4FC3;" />
                    <h3 class="text-sm font-semibold" style="color:var(--text-primary);">Notifications</h3>
                  </div>
                  <div class="space-y-2">
                    @for (pref of notifPrefs; track pref.label) {
                      <div class="flex flex-col gap-3 rounded-xl p-3.5 sm:flex-row sm:items-center sm:justify-between" style="background:var(--surface-subtle);">
                        <div>
                          <p class="text-sm font-medium" style="color:var(--text-primary);">{{ pref.label }}</p>
                          <p class="text-xs" style="color:var(--text-muted);">{{ pref.desc }}</p>
                        </div>
                        <button
                          (click)="pref.enabled = !pref.enabled"
                          class="relative rounded-full transition-colors flex-shrink-0"
                          style="width:40px; height:22px; border:none; cursor:pointer;"
                          [style.background]="pref.enabled ? '#1C4FC3' : '#D1D5DB'"
                          [attr.aria-checked]="pref.enabled"
                          role="switch"
                          [attr.aria-label]="pref.label"
                        >
                          <span class="absolute top-0.5 rounded-full transition-transform"
                            style="width:18px; height:18px; background:var(--surface); box-shadow:0 1px 3px rgba(0,0,0,0.2);"
                            [style.transform]="pref.enabled ? 'translateX(20px)' : 'translateX(2px)'">
                          </span>
                        </button>
                      </div>
                    }
                  </div>
                </div>

                <!-- Security -->
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <ng-icon name="lucideShield" [size]="'15'" style="color:#1C4FC3;" />
                    <h3 class="text-sm font-semibold" style="color:var(--text-primary);">Security</h3>
                  </div>
                  <div class="space-y-2">
                    <button class="flex items-center justify-between w-full rounded-xl p-3.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-left cursor-pointer"
                      style="background:var(--surface-subtle); border:none;">
                      <div>
                        <p class="text-sm font-medium" style="color:var(--text-primary);">Change password</p>
                        <p class="text-xs" style="color:var(--text-muted);">Last changed 30 days ago</p>
                      </div>
                      <ng-icon name="lucideChevronDown" [size]="'14'" style="color:var(--text-muted); transform:rotate(-90deg);" />
                    </button>
                    <button class="flex items-center justify-between w-full rounded-xl p-3.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-left cursor-pointer"
                      style="background:var(--surface-subtle); border:none;">
                      <div>
                        <p class="text-sm font-medium" style="color:var(--text-primary);">Two-factor authentication</p>
                        <p class="text-xs" style="color:var(--text-muted);">Not enabled</p>
                      </div>
                      <span class="text-xs font-semibold px-2 py-0.5 rounded" style="background:var(--badge-amber-bg); color:var(--badge-amber-text);">Recommended</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex flex-col-reverse gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-end" style="border-top:1px solid var(--border-subtle);">
              <button (click)="showSettings.set(false)"
                class="text-sm font-semibold rounded-xl cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                style="background:transparent; border:1.5px solid var(--border); color:var(--text-body); padding:8px 20px;">
                Cancel
              </button>
              <button (click)="showSettings.set(false)"
                class="text-sm font-semibold rounded-xl cursor-pointer transition-opacity hover:opacity-90"
                style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; border:none; padding:8px 20px;">
                Save changes
              </button>
            </div>
          </div>
        </div>
      }

    </div>
  `,
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LayoutComponent, { className: "LayoutComponent", filePath: "src/app/layout/layout.component.ts", lineNumber: 503 }); })();
