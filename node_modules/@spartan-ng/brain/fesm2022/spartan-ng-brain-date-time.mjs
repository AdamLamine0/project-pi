import { InjectionToken, inject } from '@angular/core';

class BrnNativeDateAdapter {
    /**
     * Create a new date time object.
     */
    create({ day, hour, minute, month, second, year, millisecond }) {
        const now = new Date();
        return new Date(year ?? now.getFullYear(), month ?? now.getMonth(), day ?? now.getDate(), hour ?? now.getHours(), minute ?? now.getMinutes(), second ?? now.getSeconds(), millisecond ?? now.getMilliseconds());
    }
    /**
     * Create a new date with the current date and time.
     */
    now() {
        return new Date();
    }
    /**
     * Set the year of the date time object based on a duration.
     */
    set(date, values) {
        return new Date(values.year ?? date.getFullYear(), values.month ?? date.getMonth(), values.day ?? date.getDate(), values.hour ?? date.getHours(), values.minute ?? date.getMinutes(), values.second ?? date.getSeconds(), values.millisecond ?? date.getMilliseconds());
    }
    /**
     * Add a duration to the date time object.
     */
    add(date, duration) {
        return new Date(date.getFullYear() + (duration.years ?? 0), date.getMonth() + (duration.months ?? 0), date.getDate() + (duration.days ?? 0), date.getHours() + (duration.hours ?? 0), date.getMinutes() + (duration.minutes ?? 0), date.getSeconds() + (duration.seconds ?? 0), date.getMilliseconds() + (duration.milliseconds ?? 0));
    }
    /**
     * Subtract a duration from the date time object
     */
    subtract(date, duration) {
        return new Date(date.getFullYear() - (duration.years ?? 0), date.getMonth() - (duration.months ?? 0), date.getDate() - (duration.days ?? 0), date.getHours() - (duration.hours ?? 0), date.getMinutes() - (duration.minutes ?? 0), date.getSeconds() - (duration.seconds ?? 0), date.getMilliseconds() - (duration.milliseconds ?? 0));
    }
    /**
     * Compare two date time objects
     */
    compare(a, b) {
        const diff = a.getTime() - b.getTime();
        return diff === 0 ? 0 : diff > 0 ? 1 : -1;
    }
    /**
     * Determine if two date time objects are equal.
     */
    isEqual(a, b) {
        return a.getTime() === b.getTime();
    }
    /**
     * Determine if a date time object is before another.
     */
    isBefore(a, b) {
        return a.getTime() < b.getTime();
    }
    /**
     * Determine if a date time object is after another.
     */
    isAfter(a, b) {
        return a.getTime() > b.getTime();
    }
    /**
     * Determine if two date objects are on the same day.
     */
    isSameDay(a, b) {
        return this.isSameYear(a, b) && this.isSameMonth(a, b) && a.getDate() === b.getDate();
    }
    /**
     * Determine if two date objects are on the same month.
     */
    isSameMonth(a, b) {
        return this.isSameYear(a, b) && a.getMonth() === b.getMonth();
    }
    /**
     * Determine if two date objects are on the same year.
     */
    isSameYear(a, b) {
        return a.getFullYear() === b.getFullYear();
    }
    /**
     * Get the year.
     */
    getYear(date) {
        return date.getFullYear();
    }
    /**
     * Get the month.
     */
    getMonth(date) {
        return date.getMonth();
    }
    /**
     * Get the day.
     */
    getDay(date) {
        return date.getDay();
    }
    /**
     * Get the date.
     */
    getDate(date) {
        return date.getDate();
    }
    /**
     * Get the hours.
     */
    getHours(date) {
        return date.getHours();
    }
    /**
     * Get the minutes.
     */
    getMinutes(date) {
        return date.getMinutes();
    }
    /**
     * Get the seconds.
     */
    getSeconds(date) {
        return date.getSeconds();
    }
    /**
     * Get the milliseconds.
     */
    getMilliseconds(date) {
        return date.getMilliseconds();
    }
    /**
     * Get the first day of the month.
     */
    startOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    /**
     * Get the last day of the month.
     */
    endOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    /**
     * Get the start of the day.
     */
    startOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    /**
     * Get the end of the day.
     */
    endOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    }
    /**
     * Get the time.
     */
    getTime(date) {
        return date.getTime();
    }
}

class BrnUtcDateAdapter {
    create({ day, hour, minute, month, second, year, millisecond }) {
        const now = new Date();
        const utcTime = Date.UTC(year ?? now.getUTCFullYear(), month ?? now.getUTCMonth(), day ?? now.getUTCDate(), hour ?? now.getUTCHours(), minute ?? now.getUTCMinutes(), second ?? now.getUTCSeconds(), millisecond ?? now.getUTCMilliseconds());
        return new Date(utcTime);
    }
    now() {
        return new Date(Date.now());
    }
    set(date, values) {
        const utcTime = Date.UTC(values.year ?? date.getUTCFullYear(), values.month ?? date.getUTCMonth(), values.day ?? date.getUTCDate(), values.hour ?? date.getUTCHours(), values.minute ?? date.getUTCMinutes(), values.second ?? date.getUTCSeconds(), values.millisecond ?? date.getUTCMilliseconds());
        return new Date(utcTime);
    }
    add(date, duration) {
        return new Date(Date.UTC(date.getUTCFullYear() + (duration.years ?? 0), date.getUTCMonth() + (duration.months ?? 0), date.getUTCDate() + (duration.days ?? 0), date.getUTCHours() + (duration.hours ?? 0), date.getUTCMinutes() + (duration.minutes ?? 0), date.getUTCSeconds() + (duration.seconds ?? 0), date.getUTCMilliseconds() + (duration.milliseconds ?? 0)));
    }
    subtract(date, duration) {
        return new Date(Date.UTC(date.getUTCFullYear() - (duration.years ?? 0), date.getUTCMonth() - (duration.months ?? 0), date.getUTCDate() - (duration.days ?? 0), date.getUTCHours() - (duration.hours ?? 0), date.getUTCMinutes() - (duration.minutes ?? 0), date.getUTCSeconds() - (duration.seconds ?? 0), date.getUTCMilliseconds() - (duration.milliseconds ?? 0)));
    }
    compare(a, b) {
        const diff = a.getTime() - b.getTime();
        return diff === 0 ? 0 : diff > 0 ? 1 : -1;
    }
    isEqual(a, b) {
        return a.getTime() === b.getTime();
    }
    isBefore(a, b) {
        return a.getTime() < b.getTime();
    }
    isAfter(a, b) {
        return a.getTime() > b.getTime();
    }
    isSameDay(a, b) {
        return this.isSameYear(a, b) && this.isSameMonth(a, b) && a.getUTCDate() === b.getUTCDate();
    }
    isSameMonth(a, b) {
        return this.isSameYear(a, b) && a.getUTCMonth() === b.getUTCMonth();
    }
    isSameYear(a, b) {
        return a.getUTCFullYear() === b.getUTCFullYear();
    }
    getYear(date) {
        return date.getUTCFullYear();
    }
    getMonth(date) {
        return date.getUTCMonth();
    }
    getDay(date) {
        return date.getUTCDay();
    }
    getDate(date) {
        return date.getUTCDate();
    }
    getHours(date) {
        return date.getUTCHours();
    }
    getMinutes(date) {
        return date.getUTCMinutes();
    }
    getSeconds(date) {
        return date.getUTCSeconds();
    }
    getMilliseconds(date) {
        return date.getUTCMilliseconds();
    }
    getTime(date) {
        return date.getTime();
    }
    startOfMonth(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
    }
    endOfMonth(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0, 23, 59, 59, 999));
    }
    startOfDay(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }
    endOfDay(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
    }
}

const BrnDateAdapterToken = new InjectionToken('BrnDateAdapterToken');
/**
 * Inject the DateAdapter instance
 */
function injectDateAdapter() {
    return inject(BrnDateAdapterToken, { optional: true }) ?? new BrnNativeDateAdapter();
}
/**
 * Provide the DateAdapter instance
 */
function provideDateAdapter(adapter) {
    return { provide: BrnDateAdapterToken, useClass: adapter };
}
/**
 * Provide the native date adapter
 */
function provideNativeDateAdapter() {
    return provideDateAdapter(BrnNativeDateAdapter);
}
/**
 * Provide the UTC date adapter
 */
function provideUtcDateAdapter() {
    return provideDateAdapter(BrnUtcDateAdapter);
}

/**
 * Generated bundle index. Do not edit.
 */

export { BrnDateAdapterToken, BrnNativeDateAdapter, BrnUtcDateAdapter, injectDateAdapter, provideDateAdapter, provideNativeDateAdapter, provideUtcDateAdapter };
//# sourceMappingURL=spartan-ng-brain-date-time.mjs.map
