import * as i0 from '@angular/core';
import { InjectionToken, inject, ElementRef, input, computed, Directive, signal, Injectable, ChangeDetectorRef, Injector, booleanAttribute, model, numberAttribute, contentChild, contentChildren, linkedSignal, afterNextRender, effect, ViewContainerRef, TemplateRef, untracked } from '@angular/core';
import { injectDateAdapter } from '@spartan-ng/brain/date-time';
import { BrnSelect } from '@spartan-ng/brain/select';

const BrnCalendarToken = new InjectionToken('BrnCalendarToken');
function provideBrnCalendar(instance) {
    return { provide: BrnCalendarToken, useExisting: instance };
}
/**
 * Inject the calendar component.
 */
function injectBrnCalendar() {
    return inject(BrnCalendarToken);
}

class BrnCalendarCellButton {
    /** Access the date adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the calendar component */
    _calendar = injectBrnCalendar();
    /** Access the element ref */
    _elementRef = inject(ElementRef);
    /** The date this cell represents */
    date = input.required(...(ngDevMode ? [{ debugName: "date" }] : []));
    /** Whether this date is currently selected */
    selected = computed(() => this._calendar.isSelected(this.date()), ...(ngDevMode ? [{ debugName: "selected" }] : []));
    start = computed(() => this._calendar.isStartOfRange(this.date()), ...(ngDevMode ? [{ debugName: "start" }] : []));
    end = computed(() => this._calendar.isEndOfRange(this.date()), ...(ngDevMode ? [{ debugName: "end" }] : []));
    betweenRange = computed(() => this._calendar.isBetweenRange(this.date()), ...(ngDevMode ? [{ debugName: "betweenRange" }] : []));
    /** Whether this date is focusable */
    focusable = computed(() => this._dateAdapter.isSameDay(this._calendar.focusedDate(), this.date()), ...(ngDevMode ? [{ debugName: "focusable" }] : []));
    outside = computed(() => {
        const focusedDate = this._calendar.focusedDate();
        return !this._dateAdapter.isSameMonth(this.date(), focusedDate);
    }, ...(ngDevMode ? [{ debugName: "outside" }] : []));
    /** Whether this date is today */
    today = computed(() => this._dateAdapter.isSameDay(this.date(), this._dateAdapter.now()), ...(ngDevMode ? [{ debugName: "today" }] : []));
    /** Whether this date is disabled */
    disabled = computed(() => this._calendar.isDateDisabled(this.date()) || this._calendar.disabled(), ...(ngDevMode ? [{ debugName: "disabled" }] : []));
    /**
     * Focus the previous cell.
     */
    focusPrevious(event) {
        event.preventDefault();
        event.stopPropagation();
        // in rtl, the arrow keys are reversed.
        const targetDate = this._dateAdapter.add(this._calendar.focusedDate(), {
            days: this.getDirection() === 'rtl' ? 1 : -1,
        });
        this._calendar.setFocusedDate(targetDate);
    }
    /**
     * Focus the next cell.
     */
    focusNext(event) {
        event.preventDefault();
        event.stopPropagation();
        const targetDate = this._dateAdapter.add(this._calendar.focusedDate(), {
            days: this.getDirection() === 'rtl' ? -1 : 1,
        });
        this._calendar.setFocusedDate(targetDate);
    }
    /**
     * Focus the above cell.
     */
    focusAbove(event) {
        event.preventDefault();
        event.stopPropagation();
        this._calendar.setFocusedDate(this._dateAdapter.subtract(this._calendar.focusedDate(), { days: 7 }));
    }
    /**
     * Focus the below cell.
     */
    focusBelow(event) {
        event.preventDefault();
        event.stopPropagation();
        this._calendar.setFocusedDate(this._dateAdapter.add(this._calendar.focusedDate(), { days: 7 }));
    }
    /**
     * Focus the first date of the month.
     */
    focusFirst(event) {
        event.preventDefault();
        event.stopPropagation();
        this._calendar.setFocusedDate(this._dateAdapter.startOfMonth(this._calendar.focusedDate()));
    }
    /**
     * Focus the last date of the month.
     */
    focusLast(event) {
        event.preventDefault();
        event.stopPropagation();
        this._calendar.setFocusedDate(this._dateAdapter.endOfMonth(this._calendar.focusedDate()));
    }
    /**
     * Focus the same date in the previous month.
     */
    focusPreviousMonth(event) {
        event.preventDefault();
        event.stopPropagation();
        const date = this._dateAdapter.getDate(this._calendar.focusedDate());
        let previousMonthTarget = this._dateAdapter.startOfMonth(this._calendar.focusedDate());
        previousMonthTarget = this._dateAdapter.subtract(previousMonthTarget, { months: 1 });
        const lastDay = this._dateAdapter.endOfMonth(previousMonthTarget);
        // if we are on a date that does not exist in the previous month, we should focus the last day of the month.
        if (date > this._dateAdapter.getDate(lastDay)) {
            this._calendar.setFocusedDate(lastDay);
        }
        else {
            this._calendar.setFocusedDate(this._dateAdapter.set(previousMonthTarget, { day: date }));
        }
    }
    /**
     * Focus the same date in the next month.
     */
    focusNextMonth(event) {
        event.preventDefault();
        event.stopPropagation();
        const date = this._dateAdapter.getDate(this._calendar.focusedDate());
        let nextMonthTarget = this._dateAdapter.startOfMonth(this._calendar.focusedDate());
        nextMonthTarget = this._dateAdapter.add(nextMonthTarget, { months: 1 });
        const lastDay = this._dateAdapter.endOfMonth(nextMonthTarget);
        // if we are on a date that does not exist in the next month, we should focus the last day of the month.
        if (date > this._dateAdapter.getDate(lastDay)) {
            this._calendar.setFocusedDate(lastDay);
        }
        else {
            this._calendar.setFocusedDate(this._dateAdapter.set(nextMonthTarget, { day: date }));
        }
    }
    /**
     * Get the direction of the element.
     */
    getDirection() {
        return getComputedStyle(this._elementRef.nativeElement).direction === 'rtl' ? 'rtl' : 'ltr';
    }
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarCellButton, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnCalendarCellButton, isStandalone: true, selector: "button[brnCalendarCellButton]", inputs: { date: { classPropertyName: "date", publicName: "date", isSignal: true, isRequired: true, transformFunction: null } }, host: { attributes: { "role": "gridcell", "type": "button" }, listeners: { "click": "_calendar.selectDate(date())", "keydown.arrowLeft": "focusPrevious($event)", "keydown.arrowRight": "focusNext($event)", "keydown.arrowUp": "focusAbove($event)", "keydown.arrowDown": "focusBelow($event)", "keydown.home": "focusFirst($event)", "keydown.end": "focusLast($event)", "keydown.pageUp": "focusPreviousMonth($event)", "keydown.pageDown": "focusNextMonth($event)" }, properties: { "tabindex": "focusable() ? 0 : -1", "attr.data-outside": "!selected() && outside() && (!end() && !start())? '' : null", "attr.data-today": "today() && !selected() ? '' : null", "attr.data-selected": "selected() ? '' : null", "attr.data-disabled": "disabled() ? '' : null", "attr.aria-selected": "selected() ? 'true' : null", "attr.aria-disabled": "disabled() ? 'true' : null", "attr.data-range-start": "start() ? \"\" : null", "attr.data-range-end": "end() ? \"\" : null", "attr.data-range-between": "betweenRange() ? \"\" : null", "disabled": "disabled()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarCellButton, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnCalendarCellButton]',
                    host: {
                        role: 'gridcell',
                        '[tabindex]': 'focusable() ? 0 : -1',
                        type: 'button',
                        '[attr.data-outside]': "!selected() && outside() && (!end() && !start())? '' : null",
                        '[attr.data-today]': "today() && !selected() ? '' : null",
                        '[attr.data-selected]': "selected() ? '' : null",
                        '[attr.data-disabled]': "disabled() ? '' : null",
                        '[attr.aria-selected]': "selected() ? 'true' : null",
                        '[attr.aria-disabled]': "disabled() ? 'true' : null",
                        '[attr.data-range-start]': 'start() ? "" : null',
                        '[attr.data-range-end]': 'end() ? "" : null',
                        '[attr.data-range-between]': 'betweenRange() ? "" : null',
                        '[disabled]': 'disabled()',
                        '(click)': '_calendar.selectDate(date())',
                        '(keydown.arrowLeft)': 'focusPrevious($event)',
                        '(keydown.arrowRight)': 'focusNext($event)',
                        '(keydown.arrowUp)': 'focusAbove($event)',
                        '(keydown.arrowDown)': 'focusBelow($event)',
                        '(keydown.home)': 'focusFirst($event)',
                        '(keydown.end)': 'focusLast($event)',
                        '(keydown.pageUp)': 'focusPreviousMonth($event)',
                        '(keydown.pageDown)': 'focusNextMonth($event)',
                    },
                }]
        }], propDecorators: { date: [{ type: i0.Input, args: [{ isSignal: true, alias: "date", required: true }] }] } });

let uniqueId = 0;
class BrnCalendarHeader {
    /** The unique id for the header */
    id = input(`brn-calendar-header-${++uniqueId}`, ...(ngDevMode ? [{ debugName: "id" }] : []));
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnCalendarHeader, isStandalone: true, selector: "[brnCalendarHeader]", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "aria-live": "polite", "role": "presentation" }, properties: { "id": "id()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarHeader]',
                    host: {
                        '[id]': 'id()',
                        'aria-live': 'polite',
                        role: 'presentation',
                    },
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }] } });

const BrnCalendarI18nToken = new InjectionToken('BrnCalendarI18nToken');
/**
 * Provide the calendar i18n configuration.
 */
function provideBrnCalendarI18n(configuration) {
    return {
        provide: BrnCalendarI18nToken,
        useFactory: () => {
            const service = new BrnCalendarI18nService();
            service.use(configuration ?? defaultCalendarI18n);
            return service;
        },
    };
}
const defaultCalendarI18n = {
    formatWeekdayName: (index) => {
        const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        return weekdays[index];
    },
    months: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    years: (startYear = 1925, endYear = new Date().getFullYear() + 1) => Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i),
    formatHeader: (month, year) => {
        return new Date(year, month).toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric',
        });
    },
    formatMonth: (month) => {
        return new Date(2000, month).toLocaleDateString(undefined, {
            month: 'short',
        });
    },
    formatYear: (year) => {
        return new Date(year, 0).toLocaleDateString(undefined, {
            year: 'numeric',
        });
    },
    labelPrevious: () => 'Go to the previous month',
    labelNext: () => 'Go to the next month',
    labelWeekday: (index) => {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return weekdays[index];
    },
    firstDayOfWeek: () => 0,
};
/**
 * Inject the calendar i18n configuration.
 */
function injectBrnCalendarI18n() {
    return inject(BrnCalendarI18nToken, { optional: true }) ?? inject(BrnCalendarI18nService); // fallback
}
class BrnCalendarI18nService {
    _config = signal(defaultCalendarI18n, ...(ngDevMode ? [{ debugName: "_config" }] : []));
    config = this._config.asReadonly();
    use(config) {
        this._config.set({ ...this.config(), ...config });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarI18nService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarI18nService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarI18nService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class BrnCalendar {
    _i18n = injectBrnCalendarI18n();
    /** Access the date adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the change detector */
    _changeDetector = inject(ChangeDetectorRef);
    /** Access the injector */
    _injector = inject(Injector);
    /** The minimum date that can be selected.*/
    min = input(...(ngDevMode ? [undefined, { debugName: "min" }] : []));
    /** The maximum date that can be selected. */
    max = input(...(ngDevMode ? [undefined, { debugName: "max" }] : []));
    /** Determine if the date picker is disabled. */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", transform: booleanAttribute }] : [{
            transform: booleanAttribute,
        }]));
    /** The selected value. */
    date = model(...(ngDevMode ? [undefined, { debugName: "date" }] : []));
    /** Whether a specific date is disabled. */
    dateDisabled = input(() => false, ...(ngDevMode ? [{ debugName: "dateDisabled" }] : []));
    /** The day the week starts on */
    weekStartsOn = input(undefined, ...(ngDevMode ? [{ debugName: "weekStartsOn", transform: (v) => (v === undefined || v === null ? undefined : numberAttribute(v)) }] : [{
            transform: (v) => (v === undefined || v === null ? undefined : numberAttribute(v)),
        }]));
    _weekStartsOn = computed(() => this.weekStartsOn() ?? this._i18n.config().firstDayOfWeek(), ...(ngDevMode ? [{ debugName: "_weekStartsOn" }] : []));
    /** The default focused date. */
    defaultFocusedDate = input(...(ngDevMode ? [undefined, { debugName: "defaultFocusedDate" }] : []));
    /** @internal Access the header */
    header = contentChild(BrnCalendarHeader, ...(ngDevMode ? [{ debugName: "header" }] : []));
    /** Store the cells */
    _cells = contentChildren(BrnCalendarCellButton, ...(ngDevMode ? [{ debugName: "_cells", descendants: true }] : [{
            descendants: true,
        }]));
    /**
     * The focused date.
     */
    focusedDate = linkedSignal(() => this.constrainDate(this.defaultFocusedDate() ?? this.date() ?? this._dateAdapter.now()), ...(ngDevMode ? [{ debugName: "focusedDate" }] : []));
    /**
     * Get all the days to display, this is the days of the current month
     * and the days of the previous and next month to fill the grid.
     */
    days = computed(() => {
        const weekStartsOn = this._weekStartsOn();
        const month = this.focusedDate();
        const days = [];
        // Get the first and last day of the month.
        let firstDay = this._dateAdapter.startOfMonth(month);
        let lastDay = this._dateAdapter.endOfMonth(month);
        // we need to subtract until we get the to starting day before or on the start of the month.
        while (this._dateAdapter.getDay(firstDay) !== weekStartsOn) {
            firstDay = this._dateAdapter.subtract(firstDay, { days: 1 });
        }
        const weekEndsOn = (weekStartsOn + 6) % 7;
        // we need to add until we get to the ending day after or on the end of the month.
        while (this._dateAdapter.getDay(lastDay) !== weekEndsOn) {
            lastDay = this._dateAdapter.add(lastDay, { days: 1 });
        }
        // collect all the days to display.
        while (firstDay <= lastDay) {
            days.push(firstDay);
            firstDay = this._dateAdapter.add(firstDay, { days: 1 });
        }
        return days;
    }, ...(ngDevMode ? [{ debugName: "days" }] : []));
    /** @internal Constrain a date to the min and max boundaries */
    constrainDate(date) {
        const min = this.min();
        const max = this.max();
        // If there is no min or max, return the date.
        if (!min && !max) {
            return date;
        }
        // If there is a min and the date is before the min, return the min.
        if (min && this._dateAdapter.isBefore(date, this._dateAdapter.startOfDay(min))) {
            return min;
        }
        // If there is a max and the date is after the max, return the max.
        if (max && this._dateAdapter.isAfter(date, this._dateAdapter.endOfDay(max))) {
            return max;
        }
        // Return the date.
        return date;
    }
    /** @internal Determine if a date is disabled */
    isDateDisabled(date) {
        // if the calendar is disabled we can't select this date
        if (this.disabled()) {
            return true;
        }
        // if the date is outside the min and max range
        const min = this.min();
        const max = this.max();
        if (min && this._dateAdapter.isBefore(date, this._dateAdapter.startOfDay(min))) {
            return true;
        }
        if (max && this._dateAdapter.isAfter(date, this._dateAdapter.endOfDay(max))) {
            return true;
        }
        // if this specific date is disabled
        const disabledFn = this.dateDisabled();
        if (disabledFn(date)) {
            return true;
        }
        return false;
    }
    isSelected(date) {
        const selected = this.date();
        return selected !== undefined && this._dateAdapter.isSameDay(date, selected);
    }
    selectDate(date) {
        if (this.isSelected(date)) {
            this.date.set(undefined);
        }
        else {
            this.date.set(date);
        }
        this.focusedDate.set(date);
    }
    /** @internal Set the focused date */
    setFocusedDate(date) {
        // check if the date is disabled.
        if (this.isDateDisabled(date)) {
            return;
        }
        this.focusedDate.set(date);
        // wait until the cells have all updated
        afterNextRender({
            write: () => {
                // focus the cell with the target date.
                const cell = this._cells().find((c) => this._dateAdapter.isSameDay(c.date(), date));
                if (cell) {
                    cell.focus();
                }
            },
        }, {
            injector: this._injector,
        });
        // we must update the view to ensure the focused cell is visible.
        this._changeDetector.detectChanges();
    }
    /**
     * Determine if a date is the start of a range. In a date picker, this is always false.
     * @param date The date to check.
     * @returns Always false.
     * @internal
     */
    isStartOfRange(_) {
        return false;
    }
    /**
     * Determine if a date is the end of a range. In a date picker, this is always false.
     * @param date The date to check.
     * @returns Always false.
     * @internal
     */
    isEndOfRange(_) {
        return false;
    }
    /**
     * Determine if a date is between the start and end dates. In a date picker, this is always false.
     * @param date The date to check.
     * @returns True if the date is between the start and end dates, false otherwise.
     * @internal
     */
    isBetweenRange(_) {
        return false;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendar, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.2.0", version: "20.3.17", type: BrnCalendar, isStandalone: true, selector: "[brnCalendar]", inputs: { min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, date: { classPropertyName: "date", publicName: "date", isSignal: true, isRequired: false, transformFunction: null }, dateDisabled: { classPropertyName: "dateDisabled", publicName: "dateDisabled", isSignal: true, isRequired: false, transformFunction: null }, weekStartsOn: { classPropertyName: "weekStartsOn", publicName: "weekStartsOn", isSignal: true, isRequired: false, transformFunction: null }, defaultFocusedDate: { classPropertyName: "defaultFocusedDate", publicName: "defaultFocusedDate", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { date: "dateChange" }, providers: [provideBrnCalendar(BrnCalendar)], queries: [{ propertyName: "header", first: true, predicate: BrnCalendarHeader, descendants: true, isSignal: true }, { propertyName: "_cells", predicate: BrnCalendarCellButton, descendants: true, isSignal: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendar, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendar]',
                    providers: [provideBrnCalendar(BrnCalendar)],
                }]
        }], propDecorators: { min: [{ type: i0.Input, args: [{ isSignal: true, alias: "min", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], date: [{ type: i0.Input, args: [{ isSignal: true, alias: "date", required: false }] }, { type: i0.Output, args: ["dateChange"] }], dateDisabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "dateDisabled", required: false }] }], weekStartsOn: [{ type: i0.Input, args: [{ isSignal: true, alias: "weekStartsOn", required: false }] }], defaultFocusedDate: [{ type: i0.Input, args: [{ isSignal: true, alias: "defaultFocusedDate", required: false }] }], header: [{ type: i0.ContentChild, args: [i0.forwardRef(() => BrnCalendarHeader), { isSignal: true }] }], _cells: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => BrnCalendarCellButton), { ...{
                            descendants: true,
                        }, isSignal: true }] }] } });

class BrnCalendarCell {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarCell, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCalendarCell, isStandalone: true, selector: "[brnCalendarCell]", host: { attributes: { "role": "presentation" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarCell, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarCell]',
                    host: {
                        role: 'presentation',
                    },
                }]
        }] });

class BrnCalendarGrid {
    /** Access the calendar component */
    _calendar = injectBrnCalendar();
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarGrid, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCalendarGrid, isStandalone: true, selector: "[brnCalendarGrid]", host: { attributes: { "role": "grid" }, properties: { "attr.aria-labelledby": "_calendar.header()?.id()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarGrid, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarGrid]',
                    host: {
                        role: 'grid',
                        '[attr.aria-labelledby]': '_calendar.header()?.id()',
                    },
                }]
        }] });

class BrnCalendarMonthSelect {
    /** Access the select */
    _select = inject(BrnSelect);
    /** Access the calendar */
    _calendar = injectBrnCalendar();
    /** Access the date adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the calendar i18n */
    _i18n = injectBrnCalendarI18n();
    _selectedMonth = computed(() => {
        return this._i18n.config().months()[this._dateAdapter.getMonth(this._calendar.focusedDate())];
    }, ...(ngDevMode ? [{ debugName: "_selectedMonth" }] : []));
    constructor() {
        effect(() => {
            this._select.writeValue(this._selectedMonth());
        });
    }
    /** Focus selected month */
    monthSelected(selectedMonth) {
        const month = this._i18n
            .config()
            .months()
            .findIndex((month) => month === selectedMonth);
        const targetDate = this._dateAdapter.set(this._calendar.focusedDate(), { month });
        this._calendar.focusedDate.set(targetDate);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarMonthSelect, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCalendarMonthSelect, isStandalone: true, selector: "brnSelect[brnCalendarMonthSelect],hlm-select[brnCalendarMonthSelect]", host: { listeners: { "valueChange": "monthSelected($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarMonthSelect, decorators: [{
            type: Directive,
            args: [{
                    selector: 'brnSelect[brnCalendarMonthSelect],hlm-select[brnCalendarMonthSelect]',
                    host: {
                        '(valueChange)': 'monthSelected($event)',
                    },
                }]
        }], ctorParameters: () => [] });

class BrnCalendarNextButton {
    /** Access the calendar */
    _calendar = injectBrnCalendar();
    /** Access the date adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the calendar i18n */
    _i18n = injectBrnCalendarI18n();
    /** Focus the next month */
    focusNextMonth() {
        const focusedDate = this._calendar.focusedDate();
        const date = this._dateAdapter.getDate(focusedDate);
        // go to start of month first, then add 1 month to avoid day overflow
        let nextMonthTarget = this._dateAdapter.startOfMonth(focusedDate);
        nextMonthTarget = this._dateAdapter.add(nextMonthTarget, { months: 1 });
        const lastDay = this._dateAdapter.endOfMonth(nextMonthTarget);
        // if we are on a date that does not exist in the next month, clamp to the last day of the month.
        let targetDate;
        if (date > this._dateAdapter.getDate(lastDay)) {
            targetDate = lastDay;
        }
        else {
            targetDate = this._dateAdapter.set(nextMonthTarget, { day: date });
        }
        // if the date is disabled, but there are available dates in the month, focus the constrained date.
        const possibleDate = this._calendar.constrainDate(targetDate);
        if (this._dateAdapter.isSameMonth(possibleDate, targetDate)) {
            // if this date is within the same month, then focus it
            this._calendar.focusedDate.set(possibleDate);
            return;
        }
        this._calendar.focusedDate.set(targetDate);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarNextButton, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCalendarNextButton, isStandalone: true, selector: "[brnCalendarNextButton]", host: { attributes: { "type": "button" }, listeners: { "click": "focusNextMonth()" }, properties: { "attr.aria-label": "_i18n.config().labelNext()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarNextButton, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarNextButton]',
                    host: {
                        type: 'button',
                        '[attr.aria-label]': '_i18n.config().labelNext()',
                        '(click)': 'focusNextMonth()',
                    },
                }]
        }] });

class BrnCalendarPreviousButton {
    /** Access the calendar */
    _calendar = injectBrnCalendar();
    /** Access the date adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the calendar i18n */
    _i18n = injectBrnCalendarI18n();
    /** Focus the previous month */
    focusPreviousMonth() {
        const focusedDate = this._calendar.focusedDate();
        const date = this._dateAdapter.getDate(focusedDate);
        // go to start of month first, then subtract 1 month to avoid day overflow
        let previousMonthTarget = this._dateAdapter.startOfMonth(focusedDate);
        previousMonthTarget = this._dateAdapter.subtract(previousMonthTarget, { months: 1 });
        const lastDay = this._dateAdapter.endOfMonth(previousMonthTarget);
        // if we are on a date that does not exist in the previous month, clamp to the last day of the month.
        let targetDate;
        if (date > this._dateAdapter.getDate(lastDay)) {
            targetDate = lastDay;
        }
        else {
            targetDate = this._dateAdapter.set(previousMonthTarget, { day: date });
        }
        // if the date is disabled, but there are available dates in the month, focus the constrained date.
        const possibleDate = this._calendar.constrainDate(targetDate);
        if (this._dateAdapter.isSameMonth(possibleDate, targetDate)) {
            // if this date is within the same month, then focus it
            this._calendar.focusedDate.set(possibleDate);
            return;
        }
        this._calendar.focusedDate.set(targetDate);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarPreviousButton, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCalendarPreviousButton, isStandalone: true, selector: "[brnCalendarPreviousButton]", host: { attributes: { "type": "button" }, listeners: { "click": "focusPreviousMonth()" }, properties: { "attr.aria-label": "_i18n.config().labelPrevious()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarPreviousButton, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarPreviousButton]',
                    host: {
                        type: 'button',
                        '[attr.aria-label]': '_i18n.config().labelPrevious()',
                        '(click)': 'focusPreviousMonth()',
                    },
                }]
        }] });

class BrnCalendarWeek {
    /** Access the calendar */
    _calendar = injectBrnCalendar();
    /** Access the view container ref */
    _viewContainerRef = inject(ViewContainerRef);
    /** Access the change detector */
    _changeDetector = inject(ChangeDetectorRef);
    /** Access the template ref */
    _templateRef = inject(TemplateRef);
    // get the weeks to display.
    _weeks = computed(() => {
        const days = this._calendar.days();
        const weeks = [];
        for (let i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7));
        }
        return weeks;
    }, ...(ngDevMode ? [{ debugName: "_weeks" }] : []));
    /** Store the view refs */
    _viewRefs = [];
    // Make sure the template checker knows the type of the context with which the
    // template of this directive will be rendered
    static ngTemplateContextGuard(_, ctx) {
        return true;
    }
    constructor() {
        // this should use `afterRenderEffect` but it's not available in the current version
        effect(() => {
            const weeks = this._weeks();
            untracked(() => this._renderWeeks(weeks));
        });
    }
    _renderWeeks(weeks) {
        // Destroy all the views when the directive is destroyed
        for (const viewRef of this._viewRefs) {
            viewRef.destroy();
        }
        this._viewRefs = [];
        // Create a new view for each week
        for (const week of weeks) {
            const viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, {
                $implicit: week,
            });
            this._viewRefs.push(viewRef);
        }
        this._changeDetector.detectChanges();
    }
    ngOnDestroy() {
        // Destroy all the views when the directive is destroyed
        for (const viewRef of this._viewRefs) {
            viewRef.destroy();
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarWeek, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCalendarWeek, isStandalone: true, selector: "[brnCalendarWeek]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarWeek, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarWeek]',
                }]
        }], ctorParameters: () => [] });

class BrnCalendarWeekday {
    /** Access the calendar */
    _calendar = injectBrnCalendar();
    /** Access the date time adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the view container ref */
    _viewContainerRef = inject(ViewContainerRef);
    /** Access the change detector */
    _changeDetector = inject(ChangeDetectorRef);
    /** Access the template ref */
    _templateRef = inject(TemplateRef);
    /** Get the days of the week to display in the header. */
    _weekdays = computed(() => this._calendar.days().slice(0, 7), ...(ngDevMode ? [{ debugName: "_weekdays" }] : []));
    /** Store the view refs */
    _viewRefs = [];
    // Make sure the template checker knows the type of the context with which the
    // template of this directive will be rendered
    static ngTemplateContextGuard(_, ctx) {
        return true;
    }
    constructor() {
        // Create a new view for each day
        effect(() => {
            // Get the weekdays to display
            const weekdays = this._weekdays();
            // Render the weekdays
            untracked(() => this._renderWeekdays(weekdays));
        });
    }
    _renderWeekdays(weekdays) {
        // Destroy all the views when the directive is destroyed
        for (const viewRef of this._viewRefs) {
            viewRef.destroy();
        }
        this._viewRefs = [];
        // Create a new view for each day
        for (const day of weekdays) {
            const viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, {
                $implicit: this._dateAdapter.getDay(day),
            });
            this._viewRefs.push(viewRef);
        }
        this._changeDetector.detectChanges();
    }
    ngOnDestroy() {
        // Destroy all the views when the directive is destroyed
        for (const viewRef of this._viewRefs) {
            viewRef.destroy();
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarWeekday, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCalendarWeekday, isStandalone: true, selector: "[brnCalendarWeekday]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarWeekday, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarWeekday]',
                }]
        }], ctorParameters: () => [] });

class BrnCalendarYearSelect {
    /** Access the select */
    _select = inject(BrnSelect);
    /** Access the calendar */
    _calendar = injectBrnCalendar();
    /** Access the date adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the calendar i18n */
    _i18n = injectBrnCalendarI18n();
    constructor() {
        effect(() => {
            this._select.writeValue(this._dateAdapter.getYear(this._calendar.focusedDate()));
        });
    }
    /** Focus selected year */
    yearSelected(year) {
        const targetDate = this._dateAdapter.set(this._calendar.focusedDate(), { year });
        this._calendar.focusedDate.set(targetDate);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarYearSelect, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCalendarYearSelect, isStandalone: true, selector: "brnSelect[brnCalendarYearSelect],hlm-select[brnCalendarYearSelect]", host: { listeners: { "valueChange": "yearSelected($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarYearSelect, decorators: [{
            type: Directive,
            args: [{
                    selector: 'brnSelect[brnCalendarYearSelect],hlm-select[brnCalendarYearSelect]',
                    host: {
                        '(valueChange)': 'yearSelected($event)',
                    },
                }]
        }], ctorParameters: () => [] });

class BrnCalendarMulti {
    _i18n = injectBrnCalendarI18n();
    /**
     * Determine if a date is the start of a range. In a date picker, this is always false.
     * @param date The date to check.
     * @returns Always false.
     * @internal
     */
    isStartOfRange(_) {
        return false;
    }
    /**
     * Determine if a date is the end of a range. In a date picker, this is always false.
     * @param date The date to check.
     * @returns Always false.
     * @internal
     */
    isEndOfRange(_) {
        return false;
    }
    /**
     * Determine if a date is between the start and end dates. In a date picker, this is always false.
     * @param date The date to check.
     * @returns True if the date is between the start and end dates, false otherwise.
     * @internal
     */
    isBetweenRange(_) {
        return false;
    }
    // /** Access the date adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the change detector */
    _changeDetector = inject(ChangeDetectorRef);
    /** Access the injector */
    _injector = inject(Injector);
    /** The minimum date that can be selected.*/
    min = input(...(ngDevMode ? [undefined, { debugName: "min" }] : []));
    /** The maximum date that can be selected. */
    max = input(...(ngDevMode ? [undefined, { debugName: "max" }] : []));
    /** The minimum selectable dates.  */
    minSelection = input(undefined, ...(ngDevMode ? [{ debugName: "minSelection", transform: numberAttribute }] : [{
            transform: numberAttribute,
        }]));
    /** The maximum selectable dates.  */
    maxSelection = input(undefined, ...(ngDevMode ? [{ debugName: "maxSelection", transform: numberAttribute }] : [{
            transform: numberAttribute,
        }]));
    /** Determine if the date picker is disabled. */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", transform: booleanAttribute }] : [{
            transform: booleanAttribute,
        }]));
    /** The selected value. */
    date = model(...(ngDevMode ? [undefined, { debugName: "date" }] : []));
    /** Whether a specific date is disabled. */
    dateDisabled = input(() => false, ...(ngDevMode ? [{ debugName: "dateDisabled" }] : []));
    /** The day the week starts on */
    weekStartsOn = input(undefined, ...(ngDevMode ? [{ debugName: "weekStartsOn", transform: (v) => (v === undefined || v === null ? undefined : numberAttribute(v)) }] : [{
            transform: (v) => (v === undefined || v === null ? undefined : numberAttribute(v)),
        }]));
    _weekStartsOn = computed(() => this.weekStartsOn() ?? this._i18n.config().firstDayOfWeek(), ...(ngDevMode ? [{ debugName: "_weekStartsOn" }] : []));
    /** The default focused date. */
    defaultFocusedDate = input(...(ngDevMode ? [undefined, { debugName: "defaultFocusedDate" }] : []));
    /** @internal Access the header */
    header = contentChild(BrnCalendarHeader, ...(ngDevMode ? [{ debugName: "header" }] : []));
    /** Store the cells */
    _cells = contentChildren(BrnCalendarCellButton, ...(ngDevMode ? [{ debugName: "_cells", descendants: true }] : [{
            descendants: true,
        }]));
    /**
     * The focused date.
     */
    focusedDate = linkedSignal(() => this.constrainDate(this.defaultFocusedDate() ?? this._dateAdapter.now()), ...(ngDevMode ? [{ debugName: "focusedDate" }] : []));
    /**
     * Get all the days to display, this is the days of the current month
     * and the days of the previous and next month to fill the grid.
     */
    days = computed(() => {
        const weekStartsOn = this._weekStartsOn();
        const month = this.focusedDate();
        const days = [];
        // Get the first and last day of the month.
        let firstDay = this._dateAdapter.startOfMonth(month);
        let lastDay = this._dateAdapter.endOfMonth(month);
        // we need to subtract until we get the to starting day before or on the start of the month.
        while (this._dateAdapter.getDay(firstDay) !== weekStartsOn) {
            firstDay = this._dateAdapter.subtract(firstDay, { days: 1 });
        }
        const weekEndsOn = (weekStartsOn + 6) % 7;
        // we need to add until we get to the ending day after or on the end of the month.
        while (this._dateAdapter.getDay(lastDay) !== weekEndsOn) {
            lastDay = this._dateAdapter.add(lastDay, { days: 1 });
        }
        // collect all the days to display.
        while (firstDay <= lastDay) {
            days.push(firstDay);
            firstDay = this._dateAdapter.add(firstDay, { days: 1 });
        }
        return days;
    }, ...(ngDevMode ? [{ debugName: "days" }] : []));
    isSelected(date) {
        return this.date()?.some((d) => this._dateAdapter.isSameDay(d, date)) ?? false;
    }
    selectDate(date) {
        const selected = this.date();
        if (this.isSelected(date)) {
            const minSelection = this.minSelection();
            if (selected?.length === minSelection) {
                // min selection reached, do not allow to deselect
                return;
            }
            this.date.set(selected?.filter((d) => !this._dateAdapter.isSameDay(d, date)));
        }
        else {
            const maxSelection = this.maxSelection();
            if (selected?.length === maxSelection) {
                // max selection reached, reset the selection to date
                this.date.set([date]);
            }
            else {
                // add the date to the selection
                this.date.set([...(selected ?? []), date]);
            }
        }
    }
    // same as in brn-calendar.directive.ts
    /** @internal Constrain a date to the min and max boundaries */
    constrainDate(date) {
        const min = this.min();
        const max = this.max();
        // If there is no min or max, return the date.
        if (!min && !max) {
            return date;
        }
        // If there is a min and the date is before the min, return the min.
        if (min && this._dateAdapter.isBefore(date, this._dateAdapter.startOfDay(min))) {
            return min;
        }
        // If there is a max and the date is after the max, return the max.
        if (max && this._dateAdapter.isAfter(date, this._dateAdapter.endOfDay(max))) {
            return max;
        }
        // Return the date.
        return date;
    }
    /** @internal Determine if a date is disabled */
    isDateDisabled(date) {
        // if the calendar is disabled we can't select this date
        if (this.disabled()) {
            return true;
        }
        // if the date is outside the min and max range
        const min = this.min();
        const max = this.max();
        if (min && this._dateAdapter.isBefore(date, this._dateAdapter.startOfDay(min))) {
            return true;
        }
        if (max && this._dateAdapter.isAfter(date, this._dateAdapter.endOfDay(max))) {
            return true;
        }
        // if this specific date is disabled
        const disabledFn = this.dateDisabled();
        if (disabledFn(date)) {
            return true;
        }
        return false;
    }
    /** @internal Set the focused date */
    setFocusedDate(date) {
        // check if the date is disabled.
        if (this.isDateDisabled(date)) {
            return;
        }
        this.focusedDate.set(date);
        // wait until the cells have all updated
        afterNextRender({
            write: () => {
                // focus the cell with the target date.
                const cell = this._cells().find((c) => this._dateAdapter.isSameDay(c.date(), date));
                if (cell) {
                    cell.focus();
                }
            },
        }, {
            injector: this._injector,
        });
        // we must update the view to ensure the focused cell is visible.
        this._changeDetector.detectChanges();
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarMulti, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.2.0", version: "20.3.17", type: BrnCalendarMulti, isStandalone: true, selector: "[brnCalendarMulti]", inputs: { min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, minSelection: { classPropertyName: "minSelection", publicName: "minSelection", isSignal: true, isRequired: false, transformFunction: null }, maxSelection: { classPropertyName: "maxSelection", publicName: "maxSelection", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, date: { classPropertyName: "date", publicName: "date", isSignal: true, isRequired: false, transformFunction: null }, dateDisabled: { classPropertyName: "dateDisabled", publicName: "dateDisabled", isSignal: true, isRequired: false, transformFunction: null }, weekStartsOn: { classPropertyName: "weekStartsOn", publicName: "weekStartsOn", isSignal: true, isRequired: false, transformFunction: null }, defaultFocusedDate: { classPropertyName: "defaultFocusedDate", publicName: "defaultFocusedDate", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { date: "dateChange" }, providers: [provideBrnCalendar(BrnCalendarMulti)], queries: [{ propertyName: "header", first: true, predicate: BrnCalendarHeader, descendants: true, isSignal: true }, { propertyName: "_cells", predicate: BrnCalendarCellButton, descendants: true, isSignal: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarMulti, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarMulti]',
                    providers: [provideBrnCalendar(BrnCalendarMulti)],
                }]
        }], propDecorators: { min: [{ type: i0.Input, args: [{ isSignal: true, alias: "min", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], minSelection: [{ type: i0.Input, args: [{ isSignal: true, alias: "minSelection", required: false }] }], maxSelection: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxSelection", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], date: [{ type: i0.Input, args: [{ isSignal: true, alias: "date", required: false }] }, { type: i0.Output, args: ["dateChange"] }], dateDisabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "dateDisabled", required: false }] }], weekStartsOn: [{ type: i0.Input, args: [{ isSignal: true, alias: "weekStartsOn", required: false }] }], defaultFocusedDate: [{ type: i0.Input, args: [{ isSignal: true, alias: "defaultFocusedDate", required: false }] }], header: [{ type: i0.ContentChild, args: [i0.forwardRef(() => BrnCalendarHeader), { isSignal: true }] }], _cells: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => BrnCalendarCellButton), { ...{
                            descendants: true,
                        }, isSignal: true }] }] } });

class BrnCalendarRange {
    _i18n = injectBrnCalendarI18n();
    // /** Access the date adapter */
    _dateAdapter = injectDateAdapter();
    /** Access the change detector */
    _changeDetector = inject(ChangeDetectorRef);
    /** Access the injector */
    _injector = inject(Injector);
    /** The minimum date that can be selected.*/
    min = input(...(ngDevMode ? [undefined, { debugName: "min" }] : []));
    /** The maximum date that can be selected. */
    max = input(...(ngDevMode ? [undefined, { debugName: "max" }] : []));
    /** Determine if the date picker is disabled. */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", transform: booleanAttribute }] : [{
            transform: booleanAttribute,
        }]));
    /** Whether a specific date is disabled. */
    dateDisabled = input(() => false, ...(ngDevMode ? [{ debugName: "dateDisabled" }] : []));
    /** The day the week starts on */
    weekStartsOn = input(undefined, ...(ngDevMode ? [{ debugName: "weekStartsOn", transform: (v) => (v === undefined || v === null ? undefined : numberAttribute(v)) }] : [{
            transform: (v) => (v === undefined || v === null ? undefined : numberAttribute(v)),
        }]));
    _weekStartsOn = computed(() => this.weekStartsOn() ?? this._i18n.config().firstDayOfWeek(), ...(ngDevMode ? [{ debugName: "_weekStartsOn" }] : []));
    /** The default focused date. */
    defaultFocusedDate = input(...(ngDevMode ? [undefined, { debugName: "defaultFocusedDate" }] : []));
    /** @internal Access the header */
    header = contentChild(BrnCalendarHeader, ...(ngDevMode ? [{ debugName: "header" }] : []));
    /** Store the cells */
    _cells = contentChildren(BrnCalendarCellButton, ...(ngDevMode ? [{ debugName: "_cells", descendants: true }] : [{
            descendants: true,
        }]));
    /**
     * The focused date.
     */
    focusedDate = linkedSignal(() => this.constrainDate(this.defaultFocusedDate() ?? this.startDate() ?? this._dateAdapter.now()), ...(ngDevMode ? [{ debugName: "focusedDate" }] : []));
    /**
     * The selected start date
     */
    startDate = model(...(ngDevMode ? [undefined, { debugName: "startDate" }] : []));
    /**
     * The selected end date
     */
    endDate = model(...(ngDevMode ? [undefined, { debugName: "endDate" }] : []));
    /**
     * Get all the days to display, this is the days of the current month
     * and the days of the previous and next month to fill the grid.
     */
    days = computed(() => {
        const weekStartsOn = this._weekStartsOn();
        const month = this.focusedDate();
        const days = [];
        // Get the first and last day of the month.
        let firstDay = this._dateAdapter.startOfMonth(month);
        let lastDay = this._dateAdapter.endOfMonth(month);
        // we need to subtract until we get the to starting day before or on the start of the month.
        while (this._dateAdapter.getDay(firstDay) !== weekStartsOn) {
            firstDay = this._dateAdapter.subtract(firstDay, { days: 1 });
        }
        const weekEndsOn = (weekStartsOn + 6) % 7;
        // we need to add until we get to the ending day after or on the end of the month.
        while (this._dateAdapter.getDay(lastDay) !== weekEndsOn) {
            lastDay = this._dateAdapter.add(lastDay, { days: 1 });
        }
        // collect all the days to display.
        while (firstDay <= lastDay) {
            days.push(firstDay);
            firstDay = this._dateAdapter.add(firstDay, { days: 1 });
        }
        return days;
    }, ...(ngDevMode ? [{ debugName: "days" }] : []));
    isSelected(date) {
        const start = this.startDate();
        const end = this.endDate();
        if (!start && !end) {
            return false;
        }
        const isStartSelected = start ? this._dateAdapter.isSameDay(date, start) : false;
        const isEndSelected = end ? this._dateAdapter.isSameDay(date, end) : false;
        return isStartSelected || isEndSelected;
    }
    selectDate(date) {
        const start = this.startDate();
        const end = this.endDate();
        if (!start && !end) {
            this.startDate.set(date);
            return;
        }
        if (start && !end) {
            if (this._dateAdapter.isAfter(date, start)) {
                this.endDate.set(date);
            }
            else if (this._dateAdapter.isBefore(date, start)) {
                this.startDate.set(date);
                this.endDate.set(start);
            }
            else if (this._dateAdapter.isSameDay(date, start)) {
                this.endDate.set(date);
            }
            return;
        }
        // If both start and end are selected, reset selection
        this.startDate.set(date);
        this.endDate.set(undefined);
    }
    // same as in brn-calendar.directive.ts
    /** @internal Constrain a date to the min and max boundaries */
    constrainDate(date) {
        const min = this.min();
        const max = this.max();
        // If there is no min or max, return the date.
        if (!min && !max) {
            return date;
        }
        // If there is a min and the date is before the min, return the min.
        if (min && this._dateAdapter.isBefore(date, this._dateAdapter.startOfDay(min))) {
            return min;
        }
        // If there is a max and the date is after the max, return the max.
        if (max && this._dateAdapter.isAfter(date, this._dateAdapter.endOfDay(max))) {
            return max;
        }
        // Return the date.
        return date;
    }
    /** @internal Determine if a date is disabled */
    isDateDisabled(date) {
        // if the calendar is disabled we can't select this date
        if (this.disabled()) {
            return true;
        }
        // if the date is outside the min and max range
        const min = this.min();
        const max = this.max();
        if (min && this._dateAdapter.isBefore(date, this._dateAdapter.startOfDay(min))) {
            return true;
        }
        if (max && this._dateAdapter.isAfter(date, this._dateAdapter.endOfDay(max))) {
            return true;
        }
        // if this specific date is disabled
        const disabledFn = this.dateDisabled();
        if (disabledFn(date)) {
            return true;
        }
        return false;
    }
    /** @internal Set the focused date */
    setFocusedDate(date) {
        // check if the date is disabled.
        if (this.isDateDisabled(date)) {
            return;
        }
        this.focusedDate.set(date);
        // wait until the cells have all updated
        afterNextRender({
            write: () => {
                // focus the cell with the target date.
                const cell = this._cells().find((c) => this._dateAdapter.isSameDay(c.date(), date));
                if (cell) {
                    cell.focus();
                }
            },
        }, {
            injector: this._injector,
        });
        // we must update the view to ensure the focused cell is visible.
        this._changeDetector.detectChanges();
    }
    /**
     * Determine if a date is the start of a range.
     * @param date The date to check.
     * @returns Always false.
     * @internal
     */
    isStartOfRange(date) {
        const start = this.startDate();
        return start ? this._dateAdapter.isSameDay(date, start) : false;
    }
    /**
     * Determine if a date is the end of a range.
     * @param date The date to check.
     * @returns Always false.
     * @internal
     */
    isEndOfRange(date) {
        const end = this.endDate();
        return end ? this._dateAdapter.isSameDay(date, end) : false;
    }
    /**
     * Determine if a date is between the start and end dates.
     * @param date The date to check.
     * @returns True if the date is between the start and end dates, false otherwise.
     * @internal
     */
    isBetweenRange(date) {
        const start = this.startDate();
        const end = this.endDate();
        if (!start || !end) {
            return false;
        }
        return this._dateAdapter.isAfter(date, start) && this._dateAdapter.isBefore(date, end);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarRange, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.2.0", version: "20.3.17", type: BrnCalendarRange, isStandalone: true, selector: "[brnCalendarRange]", inputs: { min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, dateDisabled: { classPropertyName: "dateDisabled", publicName: "dateDisabled", isSignal: true, isRequired: false, transformFunction: null }, weekStartsOn: { classPropertyName: "weekStartsOn", publicName: "weekStartsOn", isSignal: true, isRequired: false, transformFunction: null }, defaultFocusedDate: { classPropertyName: "defaultFocusedDate", publicName: "defaultFocusedDate", isSignal: true, isRequired: false, transformFunction: null }, startDate: { classPropertyName: "startDate", publicName: "startDate", isSignal: true, isRequired: false, transformFunction: null }, endDate: { classPropertyName: "endDate", publicName: "endDate", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { startDate: "startDateChange", endDate: "endDateChange" }, providers: [provideBrnCalendar(BrnCalendarRange)], queries: [{ propertyName: "header", first: true, predicate: BrnCalendarHeader, descendants: true, isSignal: true }, { propertyName: "_cells", predicate: BrnCalendarCellButton, descendants: true, isSignal: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCalendarRange, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCalendarRange]',
                    providers: [provideBrnCalendar(BrnCalendarRange)],
                }]
        }], propDecorators: { min: [{ type: i0.Input, args: [{ isSignal: true, alias: "min", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], dateDisabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "dateDisabled", required: false }] }], weekStartsOn: [{ type: i0.Input, args: [{ isSignal: true, alias: "weekStartsOn", required: false }] }], defaultFocusedDate: [{ type: i0.Input, args: [{ isSignal: true, alias: "defaultFocusedDate", required: false }] }], header: [{ type: i0.ContentChild, args: [i0.forwardRef(() => BrnCalendarHeader), { isSignal: true }] }], _cells: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => BrnCalendarCellButton), { ...{
                            descendants: true,
                        }, isSignal: true }] }], startDate: [{ type: i0.Input, args: [{ isSignal: true, alias: "startDate", required: false }] }, { type: i0.Output, args: ["startDateChange"] }], endDate: [{ type: i0.Input, args: [{ isSignal: true, alias: "endDate", required: false }] }, { type: i0.Output, args: ["endDateChange"] }] } });

const BrnCalendarImports = [
    BrnCalendarCellButton,
    BrnCalendarGrid,
    BrnCalendarHeader,
    BrnCalendarNextButton,
    BrnCalendarPreviousButton,
    BrnCalendarWeek,
    BrnCalendarWeekday,
    BrnCalendar,
    BrnCalendarCell,
    BrnCalendarMulti,
    BrnCalendarRange,
    BrnCalendarMonthSelect,
    BrnCalendarYearSelect,
];

/**
 * Generated bundle index. Do not edit.
 */

export { BrnCalendar, BrnCalendarCell, BrnCalendarCellButton, BrnCalendarGrid, BrnCalendarHeader, BrnCalendarI18nService, BrnCalendarI18nToken, BrnCalendarImports, BrnCalendarMonthSelect, BrnCalendarMulti, BrnCalendarNextButton, BrnCalendarPreviousButton, BrnCalendarRange, BrnCalendarToken, BrnCalendarWeek, BrnCalendarWeekday, BrnCalendarYearSelect, injectBrnCalendar, injectBrnCalendarI18n, provideBrnCalendar, provideBrnCalendarI18n };
//# sourceMappingURL=spartan-ng-brain-calendar.mjs.map
