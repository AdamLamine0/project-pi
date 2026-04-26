import { InjectionToken, Type, ClassProvider } from '@angular/core';

/**
 * An abstraction that can be used to create and modify date time objects
 * immutably regardless of the underlying implementation.
 */
interface BrnDateAdapter<T> {
    /**
     * Create a new date time object.
     */
    create(values: BrnDateUnits): T;
    /**
     * Create a new date with the current date and time.
     */
    now(): T;
    /**
     * Set the year of the date time object based on a duration.
     */
    set(date: T, values: BrnDateUnits): T;
    /**
     * Add a duration to the date time object.
     */
    add(date: T, duration: BrnDuration): T;
    /**
     * Subtract a duration from the date time object.
     */
    subtract(date: T, duration: BrnDuration): T;
    /**
     * Compare two date time objects.
     */
    compare(a: T, b: T): number;
    /**
     * Determine if two date time objects are equal.
     */
    isEqual(a: T, b: T): boolean;
    /**
     * Determine if a date time object is before another.
     */
    isBefore(a: T, b: T): boolean;
    /**
     * Determine if a date time object is after another.
     */
    isAfter(a: T, b: T): boolean;
    /**
     * Determine if two date objects are on the same day.
     */
    isSameDay(a: T, b: T): boolean;
    /**
     * Determine if two date objects are on the same month.
     */
    isSameMonth(a: T, b: T): boolean;
    /**
     * Determine if two date objects are on the same year.
     */
    isSameYear(a: T, b: T): boolean;
    /**
     * Get the year.
     */
    getYear(date: T): number;
    /**
     * Get the month.
     */
    getMonth(date: T): number;
    /**
     * Get the date.
     */
    getDate(date: T): number;
    /**
     * Get the day of the week.
     *
     * Returns a value between 0 and 6 where 0 is Sunday
     */
    getDay(date: T): number;
    /**
     * Get the hours.
     */
    getHours(date: T): number;
    /**
     * Get the minutes.
     */
    getMinutes(date: T): number;
    /**
     * Get the seconds.
     */
    getSeconds(date: T): number;
    /**
     * Get the milliseconds.
     */
    getMilliseconds(date: T): number;
    /**
     * Get the time.
     */
    getTime(date: T): number;
    /**
     * Get the first day of the month.
     */
    startOfMonth(date: T): T;
    /**
     * Get the last day of the month.
     */
    endOfMonth(date: T): T;
    /**
     * Get the start of the day.
     */
    startOfDay(date: T): T;
    /**
     * Get the end of the day.
     */
    endOfDay(date: T): T;
}
interface BrnDateUnits {
    /**
     * The year.
     */
    year?: number;
    /**
     * The month.
     */
    month?: number;
    /**
     * The day.
     */
    day?: number;
    /**
     * The hour.
     */
    hour?: number;
    /**
     * The minute.
     */
    minute?: number;
    /**
     * The second.
     */
    second?: number;
    /**
     * The millisecond.
     */
    millisecond?: number;
}
interface BrnDuration {
    /**
     * The years.
     */
    years?: number;
    /**
     * The months.
     */
    months?: number;
    /**
     * The days.
     */
    days?: number;
    /**
     * The hours.
     */
    hours?: number;
    /**
     * The minutes.
     */
    minutes?: number;
    /**
     * The seconds.
     */
    seconds?: number;
    /**
     * The milliseconds.
     */
    milliseconds?: number;
}
declare const BrnDateAdapterToken: InjectionToken<BrnDateAdapter<unknown>>;
/**
 * Inject the DateAdapter instance
 */
declare function injectDateAdapter<T>(): BrnDateAdapter<T>;
/**
 * Provide the DateAdapter instance
 */
declare function provideDateAdapter<T>(adapter: Type<BrnDateAdapter<T>>): ClassProvider;
/**
 * Provide the native date adapter
 */
declare function provideNativeDateAdapter(): ClassProvider;
/**
 * Provide the UTC date adapter
 */
declare function provideUtcDateAdapter(): ClassProvider;

declare class BrnNativeDateAdapter implements BrnDateAdapter<Date> {
    /**
     * Create a new date time object.
     */
    create({ day, hour, minute, month, second, year, millisecond }: BrnDateUnits): Date;
    /**
     * Create a new date with the current date and time.
     */
    now(): Date;
    /**
     * Set the year of the date time object based on a duration.
     */
    set(date: Date, values: BrnDateUnits): Date;
    /**
     * Add a duration to the date time object.
     */
    add(date: Date, duration: BrnDuration): Date;
    /**
     * Subtract a duration from the date time object
     */
    subtract(date: Date, duration: BrnDuration): Date;
    /**
     * Compare two date time objects
     */
    compare(a: Date, b: Date): number;
    /**
     * Determine if two date time objects are equal.
     */
    isEqual(a: Date, b: Date): boolean;
    /**
     * Determine if a date time object is before another.
     */
    isBefore(a: Date, b: Date): boolean;
    /**
     * Determine if a date time object is after another.
     */
    isAfter(a: Date, b: Date): boolean;
    /**
     * Determine if two date objects are on the same day.
     */
    isSameDay(a: Date, b: Date): boolean;
    /**
     * Determine if two date objects are on the same month.
     */
    isSameMonth(a: Date, b: Date): boolean;
    /**
     * Determine if two date objects are on the same year.
     */
    isSameYear(a: Date, b: Date): boolean;
    /**
     * Get the year.
     */
    getYear(date: Date): number;
    /**
     * Get the month.
     */
    getMonth(date: Date): number;
    /**
     * Get the day.
     */
    getDay(date: Date): number;
    /**
     * Get the date.
     */
    getDate(date: Date): number;
    /**
     * Get the hours.
     */
    getHours(date: Date): number;
    /**
     * Get the minutes.
     */
    getMinutes(date: Date): number;
    /**
     * Get the seconds.
     */
    getSeconds(date: Date): number;
    /**
     * Get the milliseconds.
     */
    getMilliseconds(date: Date): number;
    /**
     * Get the first day of the month.
     */
    startOfMonth(date: Date): Date;
    /**
     * Get the last day of the month.
     */
    endOfMonth(date: Date): Date;
    /**
     * Get the start of the day.
     */
    startOfDay(date: Date): Date;
    /**
     * Get the end of the day.
     */
    endOfDay(date: Date): Date;
    /**
     * Get the time.
     */
    getTime(date: Date): number;
}

declare class BrnUtcDateAdapter implements BrnDateAdapter<Date> {
    create({ day, hour, minute, month, second, year, millisecond }: BrnDateUnits): Date;
    now(): Date;
    set(date: Date, values: BrnDateUnits): Date;
    add(date: Date, duration: BrnDuration): Date;
    subtract(date: Date, duration: BrnDuration): Date;
    compare(a: Date, b: Date): number;
    isEqual(a: Date, b: Date): boolean;
    isBefore(a: Date, b: Date): boolean;
    isAfter(a: Date, b: Date): boolean;
    isSameDay(a: Date, b: Date): boolean;
    isSameMonth(a: Date, b: Date): boolean;
    isSameYear(a: Date, b: Date): boolean;
    getYear(date: Date): number;
    getMonth(date: Date): number;
    getDay(date: Date): number;
    getDate(date: Date): number;
    getHours(date: Date): number;
    getMinutes(date: Date): number;
    getSeconds(date: Date): number;
    getMilliseconds(date: Date): number;
    getTime(date: Date): number;
    startOfMonth(date: Date): Date;
    endOfMonth(date: Date): Date;
    startOfDay(date: Date): Date;
    endOfDay(date: Date): Date;
}

export { BrnDateAdapterToken, BrnNativeDateAdapter, BrnUtcDateAdapter, injectDateAdapter, provideDateAdapter, provideNativeDateAdapter, provideUtcDateAdapter };
export type { BrnDateAdapter, BrnDateUnits, BrnDuration };
