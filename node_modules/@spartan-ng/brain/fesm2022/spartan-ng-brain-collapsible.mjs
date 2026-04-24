import * as i0 from '@angular/core';
import { InjectionToken, inject, signal, model, computed, input, booleanAttribute, Directive, ElementRef, DestroyRef, NgZone, PLATFORM_ID, effect, untracked, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { measureDimensions } from '@spartan-ng/brain/core';

const BrnCollapsibleToken = new InjectionToken('BrnCollapsibleToken');
function injectBrnCollapsible() {
    return inject(BrnCollapsibleToken, { optional: true });
}
function provideBrnCollapsible(collapsible) {
    return { provide: BrnCollapsibleToken, useExisting: collapsible };
}
const defaultConfig = {
    measurementDisplay: 'block',
};
const BrnCollapsibleConfigToken = new InjectionToken('BrnCollapsibleConfig');
function provideBrnCollapsibleConfig(config) {
    return { provide: BrnCollapsibleConfigToken, useValue: { ...defaultConfig, ...config } };
}
function injectBrnCollapsibleConfig() {
    return inject(BrnCollapsibleConfigToken, { optional: true }) ?? defaultConfig;
}

let collapsibleContentIdSequence = 0;
class BrnCollapsible {
    contentId = signal(`brn-collapsible-content-${++collapsibleContentIdSequence}`, ...(ngDevMode ? [{ debugName: "contentId" }] : []));
    /**
     * The expanded or collapsed state of the collapsible component.
     */
    expanded = model(false, ...(ngDevMode ? [{ debugName: "expanded" }] : []));
    /**
     * The current state of the collapsible component as 'open' or 'closed'.
     */
    state = computed(() => (this.expanded() ? 'open' : 'closed'), ...(ngDevMode ? [{ debugName: "state" }] : []));
    /**
     * The disabled state of the collapsible component.
     */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /**
     * Toggles the expanded state of the collapsible component.
     */
    toggle() {
        if (this.disabled()) {
            return;
        }
        this.expanded.update((expanded) => !expanded);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCollapsible, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnCollapsible, isStandalone: true, selector: "[brnCollapsible],brn-collapsible", inputs: { expanded: { classPropertyName: "expanded", publicName: "expanded", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { expanded: "expandedChange" }, host: { properties: { "attr.data-state": "state()", "attr.disabled": "disabled() ? true : undefined" } }, providers: [provideBrnCollapsible(BrnCollapsible)], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCollapsible, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCollapsible],brn-collapsible',
                    providers: [provideBrnCollapsible(BrnCollapsible)],
                    host: {
                        '[attr.data-state]': 'state()',
                        '[attr.disabled]': 'disabled() ? true : undefined',
                    },
                }]
        }], propDecorators: { expanded: [{ type: i0.Input, args: [{ isSignal: true, alias: "expanded", required: false }] }, { type: i0.Output, args: ["expandedChange"] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

class BrnCollapsibleContent {
    _config = injectBrnCollapsibleConfig();
    _elementRef = inject(ElementRef);
    _destroyRef = inject(DestroyRef);
    _ngZone = inject(NgZone);
    _platformId = inject(PLATFORM_ID);
    _collapsible = injectBrnCollapsible();
    _width = signal(null, ...(ngDevMode ? [{ debugName: "_width" }] : []));
    _height = signal(null, ...(ngDevMode ? [{ debugName: "_height" }] : []));
    /**
     * The id of the collapsible content element.
     */
    id = input(...(ngDevMode ? [undefined, { debugName: "id" }] : []));
    constructor() {
        if (!this._collapsible) {
            throw Error('Collapsible trigger directive can only be used inside a brn-collapsible element.');
        }
        effect(() => {
            const id = this.id();
            const collapsible = this._collapsible;
            if (!id || !collapsible)
                return;
            untracked(() => collapsible.contentId.set(id));
        });
        afterNextRender(() => {
            const hasValidDimensions = this._measureAndSetDimensions();
            if (!hasValidDimensions) {
                this._setupVisibilityObserver();
            }
        });
    }
    _measureAndSetDimensions() {
        const { width, height } = measureDimensions(this._elementRef.nativeElement, this._config.measurementDisplay);
        this._width.set(width);
        this._height.set(height);
        return width > 0 && height > 0;
    }
    _setupVisibilityObserver() {
        if (!isPlatformBrowser(this._platformId))
            return;
        if (typeof IntersectionObserver === 'undefined')
            return;
        this._ngZone.runOutsideAngular(() => {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this._ngZone.run(() => {
                        if (this._measureAndSetDimensions()) {
                            observer.disconnect();
                        }
                    });
                }
            }, { root: null, threshold: 0 });
            observer.observe(this._elementRef.nativeElement);
            this._destroyRef.onDestroy(() => observer.disconnect());
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCollapsibleContent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnCollapsibleContent, isStandalone: true, selector: "[brnCollapsibleContent],brn-collapsible-content", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.inert": "_collapsible?.state() === 'closed' ? true : undefined", "attr.data-state": "_collapsible?.state()", "id": "_collapsible?.contentId()", "style.--brn-collapsible-content-width.px": "_width()", "style.--brn-collapsible-content-height.px": "_height()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCollapsibleContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCollapsibleContent],brn-collapsible-content',
                    host: {
                        '[attr.inert]': "_collapsible?.state() === 'closed' ? true : undefined",
                        '[attr.data-state]': '_collapsible?.state()',
                        '[id]': '_collapsible?.contentId()',
                        '[style.--brn-collapsible-content-width.px]': '_width()',
                        '[style.--brn-collapsible-content-height.px]': '_height()',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }] } });

class BrnCollapsibleTrigger {
    _collapsible = injectBrnCollapsible();
    type = input('button', ...(ngDevMode ? [{ debugName: "type" }] : []));
    constructor() {
        if (!this._collapsible) {
            throw Error('Collapsible trigger directive can only be used inside a brn-collapsible element.');
        }
    }
    toggle() {
        this._collapsible?.toggle();
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCollapsibleTrigger, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnCollapsibleTrigger, isStandalone: true, selector: "button[brnCollapsibleTrigger]", inputs: { type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "toggle()" }, properties: { "attr.data-state": "_collapsible?.state()", "attr.disabled": "_collapsible?.disabled() ? true : undefined", "attr.aria-expanded": "_collapsible?.expanded()", "attr.aria-controls": "_collapsible?.contentId()", "type": "type()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCollapsibleTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnCollapsibleTrigger]',
                    host: {
                        '[attr.data-state]': '_collapsible?.state()',
                        '[attr.disabled]': '_collapsible?.disabled() ? true : undefined',
                        '[attr.aria-expanded]': '_collapsible?.expanded()',
                        '[attr.aria-controls]': '_collapsible?.contentId()',
                        '[type]': 'type()',
                        '(click)': 'toggle()',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }] } });

const BrnCollapsibleImports = [BrnCollapsible, BrnCollapsibleTrigger, BrnCollapsibleContent];

/**
 * Generated bundle index. Do not edit.
 */

export { BrnCollapsible, BrnCollapsibleContent, BrnCollapsibleImports, BrnCollapsibleToken, BrnCollapsibleTrigger, injectBrnCollapsible, injectBrnCollapsibleConfig, provideBrnCollapsible, provideBrnCollapsibleConfig };
//# sourceMappingURL=spartan-ng-brain-collapsible.mjs.map
