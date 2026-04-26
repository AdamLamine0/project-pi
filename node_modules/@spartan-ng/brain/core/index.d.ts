import * as _angular_core from '@angular/core';
import { Signal, NgZone, ElementRef, Injector } from '@angular/core';
import { Subject, Observable, MonoTypeOperatorFunction } from 'rxjs';
import { ConnectedPosition } from '@angular/cdk/overlay';

/**
 * Returns a signal that emits the previous value of the given signal.
 * The first time the signal is emitted, the previous value will be the same as the current value.
 *
 * @example
 * ```ts
 * const value = signal(0);
 * const previous = computedPrevious(value);
 *
 * effect(() => {
 *  console.log('Current value:', value());
 *  console.log('Previous value:', previous());
 * });
 *
 * Logs:
 * // Current value: 0
 * // Previous value: 0
 *
 * value.set(1);
 *
 * Logs:
 * // Current value: 1
 * // Previous value: 0
 *
 * value.set(2);
 *
 * Logs:
 * // Current value: 2
 * // Previous value: 1
 *```
 *
 * @param computation Signal to compute previous value for
 * @returns Signal that emits previous value of `s`
 */
declare function computedPrevious<T>(computation: Signal<T>): Signal<T>;

declare function isElement(node?: Element | EventTarget | Node | null): node is Element;
declare const createHoverObservable: (nativeElement: HTMLElement, zone: NgZone, destroyed$: Subject<void>) => Observable<{
    hover: boolean;
    relatedTarget?: EventTarget | null;
}>;

interface CustomElementClassSettable {
    setClassToCustomElement: (newClass: string) => void;
}
declare const injectCustomClassSettable: {
    (): CustomElementClassSettable;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    }): CustomElementClassSettable;
    (injectOptions: _angular_core.InjectOptions & {
        optional: true;
    }): CustomElementClassSettable | null;
};
declare const provideCustomClassSettable: (value: CustomElementClassSettable) => _angular_core.Provider;
declare const provideCustomClassSettableExisting: (valueFactory: () => _angular_core.Type<CustomElementClassSettable>) => _angular_core.Provider;
declare const SET_CLASS_TO_CUSTOM_ELEMENT_TOKEN: _angular_core.InjectionToken<CustomElementClassSettable>;

/**
 * Creates a debounced version of a source signal.
 *
 * @param source - The input signal to debounce.
 * @param delay - Debounce time in milliseconds.
 * @returns A new signal that updates only after the source has stopped changing for `delay` ms.
 */
declare function debouncedSignal<T>(source: Signal<T>, delay: number): Signal<T>;

/**
 * Set by Angular to true when in development mode.
 * Allows for tree-shaking code that is only used in development.
 */
declare const brnDevMode: boolean;

interface ExposesSide {
    side: Signal<'top' | 'bottom' | 'left' | 'right'>;
}
declare const injectExposedSideProvider: {
    (): ExposesSide;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    }): ExposesSide;
    (injectOptions: _angular_core.InjectOptions & {
        optional: true;
    }): ExposesSide | null;
};
declare const provideExposedSideProvider: (value: ExposesSide) => _angular_core.Provider;
declare const provideExposedSideProviderExisting: (valueFactory: () => _angular_core.Type<ExposesSide>) => _angular_core.Provider;
declare const EXPOSES_SIDE_TOKEN: _angular_core.InjectionToken<ExposesSide>;

interface ExposesState {
    state: Signal<'open' | 'closed'>;
}
declare const injectExposesStateProvider: {
    (): ExposesState;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    }): ExposesState;
    (injectOptions: _angular_core.InjectOptions & {
        optional: true;
    }): ExposesState | null;
};
declare const provideExposesStateProvider: (value: ExposesState) => _angular_core.Provider;
declare const provideExposesStateProviderExisting: (valueFactory: () => _angular_core.Type<ExposesState>) => _angular_core.Provider;
declare const EXPOSES_STATE_TOKEN: _angular_core.InjectionToken<ExposesState>;

/**
 * Returns a reactive signal that tracks the size of a DOM element.
 *
 * This function uses a shared {@link ResizeObserver} internally to monitor multiple elements efficiently.
 * The returned signal updates whenever the element's width or height changes. It is fully SSR-safe.
 *
 * @param options Optional {@link ElementSizeOptions} configuration object.
 * @param options.elementRef The {@link ElementRef} of the element to observe. Defaults to the {@link ElementRef} injected in the current context.
 * @param options.injector Optional custom {@link Injector} to run the function in. Defaults to the current injection context.
 *
 * @returns A readonly {@link Signal} containing `{ width, height }` of the element, or `undefined` if the element has not yet been measured or on the server.
 *
 * Based on https://github.com/radix-ui/primitives/blob/main/packages/react/use-size/src/use-size.tsx
 */
declare function injectElementSize(options?: ElementSizeOptions): Signal<{
    width: number;
    height: number;
} | undefined>;
/**
 * Options to configure `injectElementSize`.
 */
interface ElementSizeOptions {
    /** The ElementRef of the element to observe. Defaults to injected ElementRef in the current context. */
    elementRef?: ElementRef<HTMLElement>;
    /** Optional Injector to run the function in. Defaults to the current injection context. */
    injector?: Injector;
}

type MeasurementDisplay = 'block' | 'inline-block' | 'flex' | 'grid' | 'table' | 'contents' | (string & {});
declare const measureDimensions: (elementToMeasure: HTMLElement, measurementDisplay: MeasurementDisplay) => {
    width: number;
    height: number;
};

type MenuAlign = 'start' | 'center' | 'end';
type MenuSide = 'top' | 'bottom' | 'left' | 'right';
declare const createMenuPosition: (align: MenuAlign, side: MenuSide) => ConnectedPosition[];

declare function stringifyAsLabel(item: any, itemToStringLabel?: (item: any) => string): string;
declare function serializeValue(value: unknown): string;

interface TableClassesSettable {
    setTableClasses: (classes: Partial<{
        table: string;
        headerRow: string;
        bodyRow: string;
    }>) => void;
}
declare const injectTableClassesSettable: {
    (): TableClassesSettable;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    }): TableClassesSettable;
    (injectOptions: _angular_core.InjectOptions & {
        optional: true;
    }): TableClassesSettable | null;
};
declare const provideTableClassesSettable: (value: TableClassesSettable) => _angular_core.Provider;
declare const provideTableClassesSettableExisting: (valueFactory: () => _angular_core.Type<TableClassesSettable>) => _angular_core.Provider;
declare const SET_TABLE_CLASSES_TOKEN: _angular_core.InjectionToken<TableClassesSettable>;

/**
 * Waits for all animations (including subtree) within the given element to finish.
 * Ignores animations canceled with an AbortError.
 */
declare function waitForElementAnimations(el: HTMLElement): Promise<void>;

/**
 * We are building on shoulders of giants here and use the implementation provided by the incredible TaigaUI
 * team: https://github.com/taiga-family/taiga-ui/blob/main/projects/cdk/observables/zone-free.ts#L22
 * Check them out! Give them a try! Leave a star! Their work is incredible!
 */

declare function brnZoneFull<T>(zone: NgZone): MonoTypeOperatorFunction<T>;
declare function brnZoneFree<T>(zone: NgZone): MonoTypeOperatorFunction<T>;
declare function brnZoneOptimized<T>(zone: NgZone): MonoTypeOperatorFunction<T>;

export { EXPOSES_SIDE_TOKEN, EXPOSES_STATE_TOKEN, SET_CLASS_TO_CUSTOM_ELEMENT_TOKEN, SET_TABLE_CLASSES_TOKEN, brnDevMode, brnZoneFree, brnZoneFull, brnZoneOptimized, computedPrevious, createHoverObservable, createMenuPosition, debouncedSignal, injectCustomClassSettable, injectElementSize, injectExposedSideProvider, injectExposesStateProvider, injectTableClassesSettable, isElement, measureDimensions, provideCustomClassSettable, provideCustomClassSettableExisting, provideExposedSideProvider, provideExposedSideProviderExisting, provideExposesStateProvider, provideExposesStateProviderExisting, provideTableClassesSettable, provideTableClassesSettableExisting, serializeValue, stringifyAsLabel, waitForElementAnimations };
export type { CustomElementClassSettable, ExposesSide, ExposesState, MeasurementDisplay, MenuAlign, MenuSide, TableClassesSettable };
