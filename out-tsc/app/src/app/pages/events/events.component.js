import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucidePlus, lucideMapPin, lucideUsers, lucideVideo, lucideClock, lucideSearch, lucideEdit, } from '@ng-icons/lucide';
import * as i0 from "@angular/core";
const _c0 = () => ["grid", "list"];
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.title;
function EventsComponent_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "p", 18);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 19);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.value);
} }
function EventsComponent_For_20_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function EventsComponent_For_20_Template_button_click_0_listener() { const f_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.typeFilter.set(f_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const f_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", ctx_r3.typeFilter() === f_r3 ? "var(--chip-active-bg)" : "var(--chip-inactive-bg)")("color", ctx_r3.typeFilter() === f_r3 ? "var(--chip-active-text)" : "var(--chip-inactive-text)")("border-color", ctx_r3.typeFilter() === f_r3 ? "var(--chip-active-border)" : "var(--chip-inactive-border)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(f_r3);
} }
function EventsComponent_For_23_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function EventsComponent_For_23_Template_button_click_0_listener() { const v_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.viewMode.set(v_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const v_r6 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", ctx_r3.viewMode() === v_r6 ? "var(--chip-active-bg)" : "var(--chip-inactive-bg)")("color", ctx_r3.viewMode() === v_r6 ? "var(--chip-active-text)" : "var(--chip-inactive-text)")("border-color", ctx_r3.viewMode() === v_r6 ? "var(--chip-active-border)" : "var(--chip-inactive-border)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", v_r6 === "grid" ? "\u229E Grid" : "\u2630 List", " ");
} }
function EventsComponent_Conditional_24_For_2_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 51);
    i0.ɵɵelementStart(1, "span", 52);
    i0.ɵɵtext(2, "Online");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("size", "11");
} }
function EventsComponent_Conditional_24_For_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 53);
    i0.ɵɵelementStart(1, "span", 54);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r7.location);
} }
function EventsComponent_Conditional_24_For_2_For_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tag_r8);
} }
function EventsComponent_Conditional_24_For_2_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵtext(1, " Register Now ");
    i0.ɵɵelementEnd();
} }
function EventsComponent_Conditional_24_For_2_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 48);
    i0.ɵɵtext(1, " View Details ");
    i0.ɵɵelementEnd();
} }
function EventsComponent_Conditional_24_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 21)(1, "div", 22);
    i0.ɵɵelement(2, "img", 23)(3, "div", 24);
    i0.ɵɵelementStart(4, "div", 25)(5, "span", 26);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 27);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 28)(10, "p", 29);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 30);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 31);
    i0.ɵɵconditionalCreate(15, EventsComponent_Conditional_24_For_2_Conditional_15_Template, 3, 1)(16, EventsComponent_Conditional_24_For_2_Conditional_16_Template, 3, 2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 32)(18, "h3", 33);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 34);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 35);
    i0.ɵɵtext(23, " By ");
    i0.ɵɵelementStart(24, "span", 36);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 37)(27, "div", 38)(28, "div", 39);
    i0.ɵɵelement(29, "ng-icon", 40);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span", 41);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 42);
    i0.ɵɵelement(34, "div", 43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 44);
    i0.ɵɵrepeaterCreate(36, EventsComponent_Conditional_24_For_2_For_37_Template, 2, 1, "span", 45, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 46);
    i0.ɵɵconditionalCreate(39, EventsComponent_Conditional_24_For_2_Conditional_39_Template, 2, 0, "button", 47)(40, EventsComponent_Conditional_24_For_2_Conditional_40_Template, 2, 0, "button", 48);
    i0.ɵɵelementStart(41, "button", 49);
    i0.ɵɵelement(42, "ng-icon", 50);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const event_r7 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", "https://picsum.photos/seed/" + event_r7.coverSeed + "/600/320", i0.ɵɵsanitizeUrl)("alt", event_r7.title);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("background", ctx_r3.typeBg(event_r7.type))("color", ctx_r3.typeColor(event_r7.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", event_r7.type, " ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", ctx_r3.statusBg(event_r7.status))("color", ctx_r3.statusColor(event_r7.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", event_r7.status, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", event_r7.date, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r7.time);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(event_r7.isOnline ? 15 : 16);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(event_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r7.description);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(event_r7.organizer);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("size", "12");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", event_r7.registered, " / ", event_r7.capacity, " registered ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", event_r7.registered / event_r7.capacity > 0.85 ? "#059669" : "#1C4FC3");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.Math.round(event_r7.registered / event_r7.capacity * 100), "% ");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", event_r7.registered / event_r7.capacity * 100, "%")("background", event_r7.registered / event_r7.capacity > 0.85 ? "linear-gradient(90deg,#059669,#34D399)" : "linear-gradient(90deg,#1C4FC3,#1D1384)");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(event_r7.tags);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(event_r7.status === "Upcoming" ? 39 : 40);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", "Edit " + event_r7.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("size", "14");
} }
function EventsComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵrepeaterCreate(1, EventsComponent_Conditional_24_For_2_Template, 43, 31, "article", 21, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r3.filteredEvents());
} }
function EventsComponent_Conditional_25_For_2_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 74);
    i0.ɵɵtext(1, " Online ");
} if (rf & 2) {
    i0.ɵɵproperty("size", "11");
} }
function EventsComponent_Conditional_25_For_2_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-icon", 75);
    i0.ɵɵtext(1);
} if (rf & 2) {
    const event_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", event_r9.location, " ");
} }
function EventsComponent_Conditional_25_For_2_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 73);
    i0.ɵɵtext(1, "Register");
    i0.ɵɵelementEnd();
} }
function EventsComponent_Conditional_25_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55)(1, "div", 56);
    i0.ɵɵelement(2, "img", 57)(3, "div", 58);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 59)(5, "span", 60);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 61);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 62);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 63)(12, "div", 64)(13, "div", 65)(14, "div", 66)(15, "span", 67);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 68);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "h3", 69);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 70)(22, "span", 71);
    i0.ɵɵelement(23, "ng-icon", 72);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 71);
    i0.ɵɵconditionalCreate(26, EventsComponent_Conditional_25_For_2_Conditional_26_Template, 2, 1)(27, EventsComponent_Conditional_25_For_2_Conditional_27_Template, 2, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 71);
    i0.ɵɵelement(29, "ng-icon", 40);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(31, EventsComponent_Conditional_25_For_2_Conditional_31_Template, 2, 0, "button", 73);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const event_r9 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", "https://picsum.photos/seed/" + event_r9.coverSeed + "/240/160", i0.ɵɵsanitizeUrl)("alt", event_r9.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(event_r9.date.split(" ")[0]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r9.date.split(" ")[1]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r9.date.split(" ")[2]);
    i0.ɵɵadvance(5);
    i0.ɵɵstyleProp("background", ctx_r3.typeBg(event_r9.type))("color", ctx_r3.typeColor(event_r9.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(event_r9.type);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", ctx_r3.statusBg(event_r9.status))("color", ctx_r3.statusColor(event_r9.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(event_r9.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r9.title);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", event_r9.time, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(event_r9.isOnline ? 26 : 27);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", "11");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", event_r9.registered, "/", event_r9.capacity, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(event_r9.status === "Upcoming" ? 31 : -1);
} }
function EventsComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵrepeaterCreate(1, EventsComponent_Conditional_25_For_2_Template, 32, 23, "div", 55, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r3.filteredEvents());
} }
export class EventsComponent {
    Math = Math;
    searchQ = signal('', ...(ngDevMode ? [{ debugName: "searchQ" }] : /* istanbul ignore next */ []));
    typeFilter = signal('All', ...(ngDevMode ? [{ debugName: "typeFilter" }] : /* istanbul ignore next */ []));
    viewMode = signal('grid', ...(ngDevMode ? [{ debugName: "viewMode" }] : /* istanbul ignore next */ []));
    typeFilters = ['All', 'Pitch', 'Workshop', 'Webinar', 'Bootcamp'];
    events = [
        { title: 'Pitch Day Spring 2026', type: 'Pitch', date: 'Apr 10 2026', time: '14:00 – 18:00', location: 'Algiers Tech Park', isOnline: false, capacity: 100, registered: 87, status: 'Upcoming', organizer: 'FoundersLab', description: 'Quarterly pitch competition where top startups present to a panel of investors and industry experts for live feedback and funding.', tags: ['Startups', 'Investors', 'Competition'], coverSeed: 'pitchday2026' },
        { title: 'Fundraising Strategies Workshop', type: 'Workshop', date: 'Apr 15 2026', time: '10:00 – 13:00', location: 'Online', isOnline: true, capacity: 50, registered: 42, status: 'Upcoming', organizer: 'Sarah Chen', description: 'Hands-on workshop covering term sheets, cap tables, and negotiation tactics for first-time fundraisers raising their first round.', tags: ['Fundraising', 'Finance', 'Founders'], coverSeed: 'workshop2026' },
        { title: 'AI in Startups — Webinar', type: 'Webinar', date: 'Apr 20 2026', time: '18:00 – 19:30', location: 'Online', isOnline: true, capacity: 200, registered: 134, status: 'Upcoming', organizer: 'Ahmed Belkacemi', description: 'How to leverage LLMs and AI tools to accelerate product development, automate operations, and build AI-powered startup products.', tags: ['AI', 'Product', 'Tech'], coverSeed: 'aiwebinar2026' },
        { title: 'Product-Market Fit Bootcamp', type: 'Bootcamp', date: 'May 2 2026', time: '09:00 – 17:00', location: 'Oran Innovation Hub', isOnline: false, capacity: 30, registered: 18, status: 'Upcoming', organizer: 'FoundersLab', description: 'Intensive full-day bootcamp with frameworks and hands-on exercises to help early-stage founders identify and validate product-market fit.', tags: ['PMF', 'Strategy', 'Early-Stage'], coverSeed: 'bootcamp2026' },
        { title: 'MENA Startup Conference 2026', type: 'Conference', date: 'May 20 2026', time: '09:00 – 18:00', location: 'Casablanca Business Hub', isOnline: false, capacity: 500, registered: 312, status: 'Upcoming', organizer: 'Regional Council', description: 'Annual gathering of 500+ founders, investors, and ecosystem builders from across the MENA region. Keynotes, panels, and networking.', tags: ['MENA', 'Networking', 'Ecosystem'], coverSeed: 'conference2026' },
        { title: 'Legal Compliance for Startups', type: 'Webinar', date: 'Mar 25 2026', time: '16:00 – 17:30', location: 'Online', isOnline: true, capacity: 100, registered: 98, status: 'Past', organizer: 'Marie Leclerc', description: 'Overview of Algerian startup legal framework, tax obligations, and ANSS startup label application process with Q&A session.', tags: ['Legal', 'Compliance', 'ANSS'], coverSeed: 'legalwebinar' },
        { title: 'Pitch Prep Workshop', type: 'Workshop', date: 'Mar 12 2026', time: '14:00 – 17:00', location: 'Algiers Tech Park', isOnline: false, capacity: 25, registered: 25, status: 'Past', organizer: 'FoundersLab', description: 'Mock pitch sessions with feedback from experienced investors and founders. Fully booked. Recording available on request.', tags: ['Pitch', 'Practice', 'Investors'], coverSeed: 'pitchprep' },
    ];
    filteredEvents = computed(() => {
        const q = this.searchQ().toLowerCase();
        const type = this.typeFilter();
        return this.events.filter(e => {
            const matchQ = !q || e.title.toLowerCase().includes(q) || e.type.toLowerCase().includes(q);
            const matchType = type === 'All' || e.type === type;
            return matchQ && matchType;
        });
    }, ...(ngDevMode ? [{ debugName: "filteredEvents" }] : /* istanbul ignore next */ []));
    eventStats = [
        { label: 'Total Events', value: this.events.length },
        { label: 'Upcoming', value: this.events.filter(e => e.status === 'Upcoming').length },
        { label: 'Total Attendees', value: this.events.reduce((s, e) => s + e.registered, 0) },
        { label: 'Avg. Fill Rate', value: Math.round(this.events.reduce((s, e) => s + (e.registered / e.capacity) * 100, 0) / this.events.length) + '%' },
    ];
    typeBg(type) {
        const m = { Pitch: 'var(--badge-purple-bg)', Workshop: 'var(--badge-blue-bg)', Webinar: 'var(--badge-green-bg)', Bootcamp: 'var(--badge-amber-bg)', Conference: 'var(--badge-red-bg)' };
        return m[type] ?? 'var(--badge-neutral-bg)';
    }
    typeColor(type) {
        const m = { Pitch: 'var(--badge-purple-text)', Workshop: 'var(--badge-blue-text)', Webinar: 'var(--badge-green-text)', Bootcamp: 'var(--badge-amber-text)', Conference: 'var(--badge-red-text)' };
        return m[type] ?? 'var(--badge-neutral-text)';
    }
    statusBg(status) {
        const m = { Upcoming: 'var(--badge-green-bg)', Ongoing: 'var(--badge-blue-bg)', Past: 'var(--badge-neutral-bg)', Cancelled: 'var(--badge-red-bg)' };
        return m[status] ?? 'var(--badge-neutral-bg)';
    }
    statusColor(status) {
        const m = { Upcoming: 'var(--badge-green-text)', Ongoing: 'var(--badge-blue-text)', Past: 'var(--badge-neutral-text)', Cancelled: 'var(--badge-red-text)' };
        return m[status] ?? 'var(--badge-neutral-text)';
    }
    static ɵfac = function EventsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EventsComponent, selectors: [["app-events"]], features: [i0.ɵɵProvidersFeature([provideIcons({
                    lucideCalendar, lucidePlus, lucideMapPin, lucideUsers, lucideVideo,
                    lucideClock, lucideSearch, lucideEdit,
                })])], decls: 26, vars: 6, consts: [[1, "page-shell"], [1, "page-header"], [1, "text-lg", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.02em"], [1, "text-xs", "mt-0.5", 2, "color", "var(--text-secondary)"], [1, "page-header-actions"], [1, "flex", "w-full", "items-center", "justify-center", "gap-1.5", "rounded-lg", "border-none", "text-xs", "font-semibold", "cursor-pointer", "transition-opacity", "hover:opacity-90", "sm:w-auto", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px 16px"], ["name", "lucidePlus", 3, "size"], [1, "stats-grid", "stats-grid--4"], [1, "rounded-xl", "border", "p-4", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "filter-toolbar"], [1, "relative", "filter-toolbar__grow"], ["name", "lucideSearch", 2, "position", "absolute", "left", "9px", "top", "50%", "transform", "translateY(-50%)", "color", "var(--text-muted)", 3, "size"], ["type", "search", "placeholder", "Search events...", "aria-label", "Search events", 1, "input-full", "text-xs", "rounded-lg", "border", "focus:outline-none", 2, "padding", "6px 12px 6px 28px", "background", "var(--surface)", "border-color", "var(--border)", "font-family", "var(--font-sans)", 3, "input", "value"], [1, "chip-scroll"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "5px 12px", 3, "background", "color", "border-color"], [1, "chip-scroll", "sm:ml-auto"], [1, "card-grid-auto"], [1, "space-y-3"], [1, "text-xs", "font-medium", "mb-1", 2, "color", "var(--text-secondary)"], [1, "text-2xl", "font-bold", 2, "color", "var(--text-primary)", "letter-spacing", "-0.03em"], [1, "text-xs", "font-medium", "rounded-lg", "cursor-pointer", "border", "transition-colors", 2, "padding", "5px 12px", 3, "click"], [1, "rounded-2xl", "border", "overflow-hidden", "transition-all", "hover:shadow-lg", "cursor-pointer", "group", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "relative", "overflow-hidden", 2, "height", "160px"], ["loading", "lazy", 1, "group-hover:scale-105", 2, "width", "100%", "height", "100%", "object-fit", "cover", "transition", "transform 0.4s ease", "display", "block", 3, "src", "alt"], [1, "absolute", "inset-0", 2, "background", "linear-gradient(to top, rgba(11,15,42,0.7) 0%, transparent 60%)"], [1, "absolute", "top-3", "left-3", "flex", "items-center", "gap-1.5"], [1, "text-xs", "font-semibold", "px-2", "py-0.5", "rounded-full", "backdrop-blur-sm"], [1, "absolute", "top-3", "right-3", "text-xs", "font-medium", "px-2", "py-0.5", "rounded-full", "backdrop-blur-sm"], [1, "absolute", "bottom-3", "left-3"], [1, "text-sm", "font-bold", 2, "color", "#fff", "text-shadow", "0 1px 3px rgba(0,0,0,0.5)"], [1, "text-xs", 2, "color", "rgba(255,255,255,0.75)"], [1, "absolute", "bottom-3", "right-3", "flex", "max-w-[calc(100%-24px)]", "items-center", "gap-1", "rounded-full", "px-2", "py-1", 2, "background", "rgba(0,0,0,0.5)", "backdrop-filter", "blur(4px)"], [2, "padding", "16px"], [1, "text-sm", "font-bold", "mb-1", "leading-snug", 2, "color", "var(--text-primary)"], [1, "text-xs", "leading-relaxed", "mb-3", "line-clamp-2", 2, "color", "var(--text-secondary)"], [1, "text-xs", "mb-3", 2, "color", "var(--text-muted)"], [1, "font-semibold", 2, "color", "var(--text-secondary)"], [1, "mb-3"], [1, "flex", "items-center", "justify-between", "mb-1.5"], [1, "flex", "items-center", "gap-1", "text-xs", 2, "color", "var(--text-secondary)"], ["name", "lucideUsers", 3, "size"], [1, "text-xs", "font-semibold"], [2, "height", "4px", "background", "var(--surface-subtle)", "border-radius", "99px", "overflow", "hidden"], [2, "height", "100%", "border-radius", "99px", "transition", "width 0.4s"], [1, "flex", "items-center", "flex-wrap", "gap-1.5", "mb-3"], [1, "text-xs", "px-1.5", "py-0.5", "rounded", 2, "background", "var(--surface-subtle)", "color", "var(--text-secondary)", "font-weight", "500"], [1, "flex", "items-center", "gap-2"], [1, "flex-1", "text-xs", "font-semibold", "rounded-xl", "border-none", "cursor-pointer", "transition-opacity", "hover:opacity-90", 2, "background", "linear-gradient(135deg,#1C4FC3,#1D1384)", "color", "#fff", "padding", "8px"], [1, "flex-1", "text-xs", "font-semibold", "rounded-xl", "cursor-pointer", "transition-colors", "hover:bg-gray-100", "dark:hover:bg-gray-800", 2, "background", "var(--surface-subtle)", "color", "var(--text-secondary)", "border", "none", "padding", "8px"], [1, "flex", "items-center", "justify-center", "rounded-xl", "transition-colors", "hover:bg-gray-100", "dark:hover:bg-gray-800", 2, "width", "34px", "height", "34px", "background", "var(--surface-subtle)", "border", "none", "cursor", "pointer", "color", "var(--text-muted)", "flex-shrink", "0"], ["name", "lucideEdit", 3, "size"], ["name", "lucideVideo", 2, "color", "#fff", 3, "size"], [1, "text-xs", 2, "color", "#fff"], ["name", "lucideMapPin", 2, "color", "#fff", 3, "size"], [1, "truncate", "text-xs", 2, "color", "#fff"], [1, "rounded-xl", "border", "overflow-hidden", "transition-all", "hover:shadow-md", "cursor-pointer", "flex", "flex-col", "lg:flex-row", 2, "background", "var(--surface)", "border-color", "var(--border)", "box-shadow", "0 1px 4px rgba(11,15,42,0.04)"], [1, "relative", "overflow-hidden", "flex-shrink-0", "h-[180px]", "w-full", "lg:h-auto", "lg:w-[120px]"], ["loading", "lazy", 2, "width", "100%", "height", "100%", "object-fit", "cover", "display", "block", 3, "src", "alt"], [1, "absolute", "inset-0", 2, "background", "linear-gradient(to right, transparent 60%, rgba(11,15,42,0.1))"], [1, "flex", "flex-row", "items-center", "justify-between", "gap-3", "px-4", "py-3", "flex-shrink-0", "lg:w-[72px]", "lg:flex-col", "lg:justify-center", 2, "background", "linear-gradient(135deg,#1F2937,#1D1384)"], [1, "text-xs", "font-semibold", 2, "color", "#93C5FD"], [1, "text-xl", "font-bold", "leading-none", 2, "color", "#fff"], [1, "text-xs", 2, "color", "#93C5FD"], [1, "flex", "flex-col", "justify-center", "flex-1", "px-5", "py-4"], [1, "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-start", "lg:justify-between"], [1, "flex-1", "min-w-0"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mb-1"], [1, "text-xs", "font-semibold", "px-1.5", "py-0.5", "rounded"], [1, "text-xs", "font-medium", "px-1.5", "py-0.5", "rounded-full"], [1, "text-sm", "font-bold", 2, "color", "var(--text-primary)"], [1, "mt-1", "flex", "flex-wrap", "items-center", "gap-3", "text-xs", 2, "color", "var(--text-muted)"], [1, "flex", "items-center", "gap-1"], ["name", "lucideClock", 3, "size"], [1, "w-full", "text-xs", "font-semibold", "rounded-lg", "border-none", "cursor-pointer", "flex-shrink-0", "lg:w-auto", 2, "background", "var(--badge-purple-bg)", "color", "#1C4FC3", "padding", "7px 14px"], ["name", "lucideVideo", 3, "size"], ["name", "lucideMapPin", 3, "size"]], template: function EventsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "Events");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Manage webinars, workshops, pitch sessions & more");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵelement(9, "ng-icon", 6);
            i0.ɵɵtext(10, " Create Event ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 7);
            i0.ɵɵrepeaterCreate(12, EventsComponent_For_13_Template, 5, 2, "div", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 9)(15, "div", 10);
            i0.ɵɵelement(16, "ng-icon", 11);
            i0.ɵɵelementStart(17, "input", 12);
            i0.ɵɵlistener("input", function EventsComponent_Template_input_input_17_listener($event) { return ctx.searchQ.set($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 13);
            i0.ɵɵrepeaterCreate(19, EventsComponent_For_20_Template, 2, 7, "button", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 15);
            i0.ɵɵrepeaterCreate(22, EventsComponent_For_23_Template, 2, 7, "button", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(24, EventsComponent_Conditional_24_Template, 3, 0, "div", 16);
            i0.ɵɵconditionalCreate(25, EventsComponent_Conditional_25_Template, 3, 0, "div", 17);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("size", "14");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.eventStats);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("size", "13");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.searchQ());
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.typeFilters);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(i0.ɵɵpureFunction0(5, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.viewMode() === "grid" ? 24 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.viewMode() === "list" ? 25 : -1);
        } }, dependencies: [NgIconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventsComponent, [{
        type: Component,
        args: [{
                selector: 'app-events',
                changeDetection: ChangeDetectionStrategy.OnPush,
                imports: [NgIconComponent],
                providers: [provideIcons({
                        lucideCalendar, lucidePlus, lucideMapPin, lucideUsers, lucideVideo,
                        lucideClock, lucideSearch, lucideEdit,
                    })],
                template: `
    <div class="page-shell">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h2 class="text-lg font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">Events</h2>
          <p class="text-xs mt-0.5" style="color:var(--text-secondary);">Manage webinars, workshops, pitch sessions &amp; more</p>
        </div>
        <div class="page-header-actions">
          <button class="flex w-full items-center justify-center gap-1.5 rounded-lg border-none text-xs font-semibold cursor-pointer transition-opacity hover:opacity-90 sm:w-auto"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;">
            <ng-icon name="lucidePlus" [size]="'14'" />
            Create Event
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid stats-grid--4">
        @for (s of eventStats; track s.label) {
          <div class="rounded-xl border p-4"
            style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">
            <p class="text-xs font-medium mb-1" style="color:var(--text-secondary);">{{ s.label }}</p>
            <p class="text-2xl font-bold" style="color:var(--text-primary); letter-spacing:-0.03em;">{{ s.value }}</p>
          </div>
        }
      </div>

      <!-- Filters -->
      <div class="filter-toolbar">
        <div class="relative filter-toolbar__grow">
          <ng-icon name="lucideSearch" [size]="'13'"
            style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--text-muted);" />
          <input type="search" placeholder="Search events..."
            aria-label="Search events"
            [value]="searchQ()"
            (input)="searchQ.set($any($event.target).value)"
            class="input-full text-xs rounded-lg border focus:outline-none"
            style="padding:6px 12px 6px 28px; background:var(--surface); border-color:var(--border); font-family:var(--font-sans);" />
        </div>
        <div class="chip-scroll">
          @for (f of typeFilters; track f) {
            <button (click)="typeFilter.set(f)"
              class="text-xs font-medium rounded-lg cursor-pointer border transition-colors"
              [style.background]="typeFilter() === f ? 'var(--chip-active-bg)' : 'var(--chip-inactive-bg)'"
              [style.color]="typeFilter() === f ? 'var(--chip-active-text)' : 'var(--chip-inactive-text)'"
              [style.border-color]="typeFilter() === f ? 'var(--chip-active-border)' : 'var(--chip-inactive-border)'"
              style="padding:5px 12px;">{{ f }}</button>
          }
        </div>
        <div class="chip-scroll sm:ml-auto">
          @for (v of ['grid', 'list']; track v) {
            <button (click)="viewMode.set(v)"
              class="text-xs font-medium rounded-lg cursor-pointer border transition-colors"
              [style.background]="viewMode() === v ? 'var(--chip-active-bg)' : 'var(--chip-inactive-bg)'"
              [style.color]="viewMode() === v ? 'var(--chip-active-text)' : 'var(--chip-inactive-text)'"
              [style.border-color]="viewMode() === v ? 'var(--chip-active-border)' : 'var(--chip-inactive-border)'"
              style="padding:5px 12px;">
              {{ v === 'grid' ? '⊞ Grid' : '☰ List' }}
            </button>
          }
        </div>
      </div>

      <!-- Events grid -->
      @if (viewMode() === 'grid') {
        <div class="card-grid-auto">
          @for (event of filteredEvents(); track event.title) {
            <article class="rounded-2xl border overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
              style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">

              <!-- Cover image -->
              <div class="relative overflow-hidden" style="height:160px;">
                <img
                  [src]="'https://picsum.photos/seed/' + event.coverSeed + '/600/320'"
                  [alt]="event.title"
                  loading="lazy"
                  style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease; display:block;"
                  class="group-hover:scale-105"
                />
                <!-- Gradient overlay -->
                <div class="absolute inset-0" style="background:linear-gradient(to top, rgba(11,15,42,0.7) 0%, transparent 60%);"></div>

                <!-- Badges on image -->
                <div class="absolute top-3 left-3 flex items-center gap-1.5">
                  <span class="text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm"
                    [style.background]="typeBg(event.type)"
                    [style.color]="typeColor(event.type)">
                    {{ event.type }}
                  </span>
                </div>
                <span class="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm"
                  [style.background]="statusBg(event.status)"
                  [style.color]="statusColor(event.status)">
                  {{ event.status }}
                </span>

                <!-- Date on image bottom-left -->
                <div class="absolute bottom-3 left-3">
                  <p class="text-sm font-bold" style="color:#fff; text-shadow:0 1px 3px rgba(0,0,0,0.5);">
                    {{ event.date }}
                  </p>
                  <p class="text-xs" style="color:rgba(255,255,255,0.75);">{{ event.time }}</p>
                </div>

                <!-- Online/Location badge on image bottom-right -->
                <div class="absolute bottom-3 right-3 flex max-w-[calc(100%-24px)] items-center gap-1 rounded-full px-2 py-1"
                  style="background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);">
                  @if (event.isOnline) {
                    <ng-icon name="lucideVideo" [size]="'11'" style="color:#fff;" />
                    <span class="text-xs" style="color:#fff;">Online</span>
                  } @else {
                    <ng-icon name="lucideMapPin" [size]="'11'" style="color:#fff;" />
                    <span class="truncate text-xs" style="color:#fff;">{{ event.location }}</span>
                  }
                </div>
              </div>

              <!-- Card content -->
              <div style="padding:16px;">
                <h3 class="text-sm font-bold mb-1 leading-snug" style="color:var(--text-primary);">{{ event.title }}</h3>
                <p class="text-xs leading-relaxed mb-3 line-clamp-2" style="color:var(--text-secondary);">{{ event.description }}</p>

                <!-- Organizer -->
                <p class="text-xs mb-3" style="color:var(--text-muted);">
                  By <span class="font-semibold" style="color:var(--text-secondary);">{{ event.organizer }}</span>
                </p>

                <!-- Capacity -->
                <div class="mb-3">
                  <div class="flex items-center justify-between mb-1.5">
                    <div class="flex items-center gap-1 text-xs" style="color:var(--text-secondary);">
                      <ng-icon name="lucideUsers" [size]="'12'" />
                      {{ event.registered }} / {{ event.capacity }} registered
                    </div>
                    <span class="text-xs font-semibold"
                      [style.color]="(event.registered/event.capacity) > 0.85 ? '#059669' : '#1C4FC3'">
                      {{ Math.round((event.registered/event.capacity)*100) }}%
                    </span>
                  </div>
                  <div style="height:4px; background:var(--surface-subtle); border-radius:99px; overflow:hidden;">
                    <div style="height:100%; border-radius:99px; transition:width 0.4s;"
                      [style.width.%]="(event.registered/event.capacity)*100"
                      [style.background]="(event.registered/event.capacity) > 0.85 ? 'linear-gradient(90deg,#059669,#34D399)' : 'linear-gradient(90deg,#1C4FC3,#1D1384)'">
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div class="flex items-center flex-wrap gap-1.5 mb-3">
                  @for (tag of event.tags; track tag) {
                    <span class="text-xs px-1.5 py-0.5 rounded" style="background:var(--surface-subtle); color:var(--text-secondary); font-weight:500;">{{ tag }}</span>
                  }
                </div>

                <!-- Action -->
                <div class="flex items-center gap-2">
                  @if (event.status === 'Upcoming') {
                    <button class="flex-1 text-xs font-semibold rounded-xl border-none cursor-pointer transition-opacity hover:opacity-90"
                      style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px;">
                      Register Now
                    </button>
                  } @else {
                    <button class="flex-1 text-xs font-semibold rounded-xl cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      style="background:var(--surface-subtle); color:var(--text-secondary); border:none; padding:8px;">
                      View Details
                    </button>
                  }
                  <button class="flex items-center justify-center rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    style="width:34px; height:34px; background:var(--surface-subtle); border:none; cursor:pointer; color:var(--text-muted); flex-shrink:0;"
                    [attr.aria-label]="'Edit ' + event.title">
                    <ng-icon name="lucideEdit" [size]="'14'" />
                  </button>
                </div>
              </div>
            </article>
          }
        </div>
      }

      <!-- Events list (alternate view) -->
      @if (viewMode() === 'list') {
        <div class="space-y-3">
          @for (event of filteredEvents(); track event.title) {
            <div class="rounded-xl border overflow-hidden transition-all hover:shadow-md cursor-pointer flex flex-col lg:flex-row"
              style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04);">

              <!-- Thumbnail -->
              <div class="relative overflow-hidden flex-shrink-0 h-[180px] w-full lg:h-auto lg:w-[120px]">
                <img
                  [src]="'https://picsum.photos/seed/' + event.coverSeed + '/240/160'"
                  [alt]="event.title"
                  loading="lazy"
                  style="width:100%; height:100%; object-fit:cover; display:block;"
                />
                <div class="absolute inset-0" style="background:linear-gradient(to right, transparent 60%, rgba(11,15,42,0.1));"></div>
              </div>

              <!-- Date column -->
              <div class="flex flex-row items-center justify-between gap-3 px-4 py-3 flex-shrink-0 lg:w-[72px] lg:flex-col lg:justify-center"
                style="background:linear-gradient(135deg,#1F2937,#1D1384);">
                <span class="text-xs font-semibold" style="color:#93C5FD;">{{ event.date.split(' ')[0] }}</span>
                <span class="text-xl font-bold leading-none" style="color:#fff;">{{ event.date.split(' ')[1] }}</span>
                <span class="text-xs" style="color:#93C5FD;">{{ event.date.split(' ')[2] }}</span>
              </div>

              <!-- Content -->
              <div class="flex flex-col justify-center flex-1 px-5 py-4">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex flex-wrap items-center gap-2 mb-1">
                      <span class="text-xs font-semibold px-1.5 py-0.5 rounded"
                        [style.background]="typeBg(event.type)" [style.color]="typeColor(event.type)">{{ event.type }}</span>
                      <span class="text-xs font-medium px-1.5 py-0.5 rounded-full"
                        [style.background]="statusBg(event.status)" [style.color]="statusColor(event.status)">{{ event.status }}</span>
                    </div>
                    <h3 class="text-sm font-bold" style="color:var(--text-primary);">{{ event.title }}</h3>
                    <div class="mt-1 flex flex-wrap items-center gap-3 text-xs" style="color:var(--text-muted);">
                      <span class="flex items-center gap-1">
                        <ng-icon name="lucideClock" [size]="'11'" /> {{ event.time }}
                      </span>
                      <span class="flex items-center gap-1">
                        @if (event.isOnline) {
                          <ng-icon name="lucideVideo" [size]="'11'" /> Online
                        } @else {
                          <ng-icon name="lucideMapPin" [size]="'11'" /> {{ event.location }}
                        }
                      </span>
                      <span class="flex items-center gap-1">
                        <ng-icon name="lucideUsers" [size]="'11'" /> {{ event.registered }}/{{ event.capacity }}
                      </span>
                    </div>
                  </div>
                  @if (event.status === 'Upcoming') {
                    <button class="w-full text-xs font-semibold rounded-lg border-none cursor-pointer flex-shrink-0 lg:w-auto"
                      style="background:var(--badge-purple-bg); color:#1C4FC3; padding:7px 14px;">Register</button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EventsComponent, { className: "EventsComponent", filePath: "src/app/pages/events/events.component.ts", lineNumber: 279 }); })();
