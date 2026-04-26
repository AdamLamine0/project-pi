import { FocusMonitor, FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import * as i0 from '@angular/core';
import { InjectionToken, inject, ElementRef, computed, signal, input, Directive, DestroyRef, NgZone, PLATFORM_ID, afterNextRender, booleanAttribute, output, effect, untracked, isDevMode } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { measureDimensions } from '@spartan-ng/brain/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

const BrnAccordionToken = new InjectionToken('BrnAccordionToken');
function injectBrnAccordion() {
    return inject(BrnAccordionToken);
}
function provideBrnAccordion(accordion) {
    return { provide: BrnAccordionToken, useExisting: accordion };
}
const BrnAccordionItemToken = new InjectionToken('BrnAccordionItemToken');
function injectBrnAccordionItem() {
    return inject(BrnAccordionItemToken);
}
function provideBrnAccordionItem(item) {
    return { provide: BrnAccordionItemToken, useExisting: item };
}
const defaultConfig = {
    measurementDisplay: 'block',
};
const BrnAccordionConfigToken = new InjectionToken('BrnBrnAccordionConfig');
function provideBrnAccordionConfig(config) {
    return { provide: BrnAccordionConfigToken, useValue: { ...defaultConfig, ...config } };
}
function injectBrnAccordionConfig() {
    return inject(BrnAccordionConfigToken, { optional: true }) ?? defaultConfig;
}

const HORIZONTAL_KEYS_TO_PREVENT_DEFAULT = [
    'ArrowLeft',
    'ArrowRight',
    'PageDown',
    'PageUp',
    'Home',
    'End',
    ' ',
    'Enter',
];
const VERTICAL_KEYS_TO_PREVENT_DEFAULT = [
    'ArrowUp',
    'ArrowDown',
    'PageDown',
    'PageUp',
    'Home',
    'End',
    ' ',
    'Enter',
];
class BrnAccordion {
    _el = inject((ElementRef));
    _dir = inject(Directionality);
    _focusMonitor = inject(FocusMonitor);
    _keyManager = computed(() => new FocusKeyManager(this._triggers())
        .withHomeAndEnd()
        .withPageUpDown()
        .withWrap()
        .withHorizontalOrientation(this.orientation() === 'vertical' ? null : (this._direction() ?? 'ltr'))
        .withVerticalOrientation(this.orientation() === 'vertical')
        .skipPredicate((item) => item.disabled), ...(ngDevMode ? [{ debugName: "_keyManager" }] : []));
    _focused = signal(false, ...(ngDevMode ? [{ debugName: "_focused" }] : []));
    _openItemIds = signal([], ...(ngDevMode ? [{ debugName: "_openItemIds" }] : []));
    openItemIds = this._openItemIds.asReadonly();
    state = computed(() => (this._openItemIds().length > 0 ? 'open' : 'closed'), ...(ngDevMode ? [{ debugName: "state" }] : []));
    _triggers = signal([], ...(ngDevMode ? [{ debugName: "_triggers" }] : []));
    /**
     * Whether the accordion is in single or multiple mode.
     * @default 'single'
     */
    type = input('single', ...(ngDevMode ? [{ debugName: "type" }] : []));
    /**
     * The orientation of the accordion, either 'horizontal' or 'vertical'.
     * @default 'vertical'
     */
    orientation = input('vertical', ...(ngDevMode ? [{ debugName: "orientation" }] : []));
    /** internal **/
    _direction = this._dir.valueSignal;
    ngAfterContentInit() {
        this._el.nativeElement.addEventListener('keydown', (event) => {
            if (this.shouldIgnoreEvent(event))
                return;
            this._keyManager()?.onKeydown(event);
            this.preventDefaultEvents(event);
        });
        this._focusMonitor.monitor(this._el, true).subscribe((origin) => this._focused.set(origin !== null));
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._el);
    }
    registerTrigger(trigger) {
        this._triggers.update((triggers) => [...triggers, trigger]);
    }
    unregisterTrigger(trigger) {
        this._triggers.update((triggers) => triggers.filter((t) => t !== trigger));
    }
    setActiveItem(item) {
        this._keyManager()?.setActiveItem(item);
    }
    toggleItem(id) {
        if (this._openItemIds().includes(id)) {
            this.closeItem(id);
            return;
        }
        this.openItem(id);
    }
    openItem(id) {
        if (this.type() === 'single') {
            this._openItemIds.set([id]);
            return;
        }
        this._openItemIds.update((ids) => (ids.includes(id) ? ids : [...ids, id]));
    }
    closeItem(id) {
        this._openItemIds.update((ids) => ids.filter((openId) => openId !== id));
    }
    isEditableTarget(el) {
        const node = el;
        if (!node)
            return false;
        const tag = node.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT')
            return true;
        if (node.isContentEditable)
            return true;
        const role = node.getAttribute?.('role') ?? '';
        if (/^(textbox|searchbox|combobox|listbox|grid|tree|menu|spinbutton|slider)$/.test(role))
            return true;
        const editableAncestor = node.closest?.('input, textarea, select, [contenteditable=""], [contenteditable="true"], ' +
            '[role="textbox"], [role="searchbox"], [role="combobox"], [role="listbox"], ' +
            '[role="grid"], [role="tree"], [role="menu"], [role="spinbutton"], [role="slider"]');
        return !!editableAncestor;
    }
    shouldIgnoreEvent(e) {
        if (e.defaultPrevented)
            return true; // another handler already acted
        if (e.ctrlKey || e.metaKey || e.altKey)
            return true; // let shortcuts through
        return this.isEditableTarget(e.target); // don't steal from editable/ARIA widgets
    }
    preventDefaultEvents(event) {
        if (event.defaultPrevented)
            return;
        if (!this._focused())
            return;
        if (!('key' in event))
            return;
        const keys = this.orientation() === 'horizontal' ? HORIZONTAL_KEYS_TO_PREVENT_DEFAULT : VERTICAL_KEYS_TO_PREVENT_DEFAULT;
        if (keys.includes(event.key) && event.code !== 'NumpadEnter') {
            event.preventDefault();
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordion, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnAccordion, isStandalone: true, selector: "[brnAccordion]", inputs: { type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, orientation: { classPropertyName: "orientation", publicName: "orientation", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.dir": "_direction()", "attr.data-state": "state()", "attr.data-orientation": "orientation()" } }, providers: [provideBrnAccordion(BrnAccordion)], exportAs: ["brnAccordion"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordion, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnAccordion]',
                    exportAs: 'brnAccordion',
                    providers: [provideBrnAccordion(BrnAccordion)],
                    host: {
                        '[attr.dir]': '_direction()',
                        '[attr.data-state]': 'state()',
                        '[attr.data-orientation]': 'orientation()',
                    },
                }]
        }], propDecorators: { type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], orientation: [{ type: i0.Input, args: [{ isSignal: true, alias: "orientation", required: false }] }] } });

class BrnAccordionContent {
    _config = injectBrnAccordionConfig();
    _item = injectBrnAccordionItem();
    _elementRef = inject(ElementRef);
    _destroyRef = inject(DestroyRef);
    _ngZone = inject(NgZone);
    _platformId = inject(PLATFORM_ID);
    _width = signal(null, ...(ngDevMode ? [{ debugName: "_width" }] : []));
    _height = signal(null, ...(ngDevMode ? [{ debugName: "_height" }] : []));
    _inert = computed(() => (this.state?.() === 'closed' ? true : undefined), ...(ngDevMode ? [{ debugName: "_inert" }] : []));
    state = this._item?.state;
    id = `brn-accordion-content-${this._item?.id}`;
    ariaLabeledBy = `brn-accordion-trigger-${this._item?.id}`;
    /**
     * The style to be applied to the host element after the dimensions are calculated.
     * @default 'overflow: hidden'
     */
    style = input('overflow: hidden', ...(ngDevMode ? [{ debugName: "style" }] : []));
    constructor() {
        if (!this._item) {
            throw Error('Accordion Content can only be used inside an AccordionItem. Add brnAccordionItem to parent.');
        }
        afterNextRender(() => {
            const hasValidDimensions = this._measureAndSetDimensions();
            if (!hasValidDimensions) {
                this._setupVisibilityObserver();
            }
        });
    }
    _measureAndSetDimensions() {
        const content = this._elementRef.nativeElement.firstChild;
        if (!content)
            return false;
        const { width, height } = measureDimensions(content, this._config.measurementDisplay);
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
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordionContent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnAccordionContent, isStandalone: true, selector: "brn-accordion-content,[brnAccordionContent]", inputs: { style: { classPropertyName: "style", publicName: "style", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "role": "region" }, properties: { "attr.data-state": "state?.()", "attr.aria-labelledby": "ariaLabeledBy", "id": "id", "style.--brn-accordion-content-width.px": "_width()", "style.--brn-accordion-content-height.px": "_height()", "attr.inert": "_inert()", "attr.style": "style()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordionContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'brn-accordion-content,[brnAccordionContent]',
                    host: {
                        '[attr.data-state]': 'state?.()',
                        '[attr.aria-labelledby]': 'ariaLabeledBy',
                        role: 'region',
                        '[id]': 'id',
                        '[style.--brn-accordion-content-width.px]': '_width()',
                        '[style.--brn-accordion-content-height.px]': '_height()',
                        '[attr.inert]': '_inert()',
                        '[attr.style]': 'style()',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { style: [{ type: i0.Input, args: [{ isSignal: true, alias: "style", required: false }] }] } });

class BrnAccordionHeader {
    _accordion = injectBrnAccordion();
    _orientation = this._accordion.orientation;
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordionHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnAccordionHeader, isStandalone: true, selector: "[brnAccordionHeader]", host: { properties: { "attr.data-orientation": "_orientation()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordionHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnAccordionHeader]',
                    host: {
                        '[attr.data-orientation]': '_orientation()',
                    },
                }]
        }] });

class BrnAccordionItem {
    static _itemIdGenerator = 0;
    id = ++BrnAccordionItem._itemIdGenerator;
    _accordion = injectBrnAccordion();
    /**
     * Whether the item is opened or closed.
     * @default false
     */
    isOpened = input(false, ...(ngDevMode ? [{ debugName: "isOpened", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /**
     * Whether the item is disabled.
     * @default false
     */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /**
     * Computed state of the item, either 'open' or 'closed'
     * @default closed
     */
    state = computed(() => (this._accordion.openItemIds()?.includes(this.id) ? 'open' : 'closed'), ...(ngDevMode ? [{ debugName: "state" }] : []));
    /**
     * Emits boolean when the item is opened or closed.
     */
    stateChange = output();
    /**
     * Emits state change when item is opened or closed
     */
    openedChange = output();
    constructor() {
        if (!this._accordion) {
            throw Error('Accordion item can only be used inside an Accordion. Add brnAccordion to ancestor.');
        }
        effect(() => {
            const state = this.state();
            untracked(() => {
                this.stateChange.emit(state);
                this.openedChange.emit(state === 'open');
            });
        });
        effect(() => {
            const isOpened = this.isOpened();
            untracked(() => {
                if (isOpened) {
                    this._accordion.openItem(this.id);
                }
                else {
                    this._accordion.closeItem(this.id);
                }
            });
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordionItem, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnAccordionItem, isStandalone: true, selector: "[brnAccordionItem]", inputs: { isOpened: { classPropertyName: "isOpened", publicName: "isOpened", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { stateChange: "stateChange", openedChange: "openedChange" }, host: { properties: { "attr.data-state": "state()" } }, providers: [provideBrnAccordionItem(BrnAccordionItem)], exportAs: ["brnAccordionItem"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordionItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnAccordionItem]',
                    exportAs: 'brnAccordionItem',
                    providers: [provideBrnAccordionItem(BrnAccordionItem)],
                    host: {
                        '[attr.data-state]': 'state()',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { isOpened: [{ type: i0.Input, args: [{ isSignal: true, alias: "isOpened", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], stateChange: [{ type: i0.Output, args: ["stateChange"] }], openedChange: [{ type: i0.Output, args: ["openedChange"] }] } });

class BrnAccordionTrigger {
    _destroyRef = inject(DestroyRef);
    _accordion = injectBrnAccordion();
    _item = injectBrnAccordionItem();
    _el = inject((ElementRef));
    _orientation = this._accordion.orientation;
    _state = this._item.state;
    _isExpanded = computed(() => this._item.state() === 'open', ...(ngDevMode ? [{ debugName: "_isExpanded" }] : []));
    _disabled = this._item.disabled;
    id = `brn-accordion-trigger-${this._item.id}`;
    ariaControls = `brn-accordion-content-${this._item.id}`;
    get disabled() {
        return this._disabled();
    }
    constructor() {
        if (!this._accordion)
            throw Error('Accordion trigger requires a parent Accordion.');
        if (!this._item)
            throw Error('Accordion trigger requires a parent AccordionItem.');
        this._accordion.registerTrigger(this);
        this._destroyRef.onDestroy(() => this._accordion.unregisterTrigger(this));
        this.validateAriaStructure();
        fromEvent(this._el.nativeElement, 'focus')
            .pipe(takeUntilDestroyed())
            .subscribe(() => {
            this._accordion.setActiveItem(this);
        });
    }
    toggle(event) {
        event.preventDefault();
        this._accordion.toggleItem(this._item.id);
    }
    focus() {
        this._el.nativeElement.focus();
    }
    validateAriaStructure() {
        const element = this._el.nativeElement;
        const isButton = element.tagName === 'BUTTON';
        const hasButtonRole = element.getAttribute('role') === 'button';
        if (!isButton && !hasButtonRole) {
            throw Error(`BrnAccordionTrigger: The trigger element must be a <button> or have role="button". ` +
                `Found: <${element.tagName.toLowerCase()}>`);
        }
        const parent = element.parentElement;
        if (!parent) {
            const message = 'BrnAccordionTrigger: The trigger button must be wrapped in a heading element.';
            if (isDevMode()) {
                throw Error(message);
            }
            else {
                console.warn(message);
            }
        }
        const isNativeHeading = /^H[1-6]$/.test(parent.tagName);
        const hasHeadingRole = parent.getAttribute('role') === 'heading';
        if (!isNativeHeading && !hasHeadingRole) {
            throw Error(`BrnAccordionTrigger: The trigger button must be wrapped in a heading element ` +
                `(h1-h6) or an element with role="heading". Found parent: <${parent.tagName.toLowerCase()}>`);
        }
        if (hasHeadingRole && !parent.hasAttribute('aria-level')) {
            throw Error('BrnAccordionTrigger: Elements with role="heading" must have an aria-level attribute.');
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordionTrigger, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnAccordionTrigger, isStandalone: true, selector: "button[brnAccordionTrigger]", host: { attributes: { "type": "button", "tabindex": "0" }, listeners: { "click": "toggle($event)", "keyup.space": "toggle($event)", "keyup.enter": "toggle($event)" }, properties: { "id": "id", "attr.data-orientation": "_orientation()", "attr.data-state": "_state()", "attr.aria-expanded": "_isExpanded()", "attr.aria-controls": "ariaControls", "attr.aria-disabled": "_disabled()", "disabled": "_disabled()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAccordionTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnAccordionTrigger]',
                    host: {
                        '[id]': 'id',
                        type: 'button',
                        tabindex: '0',
                        '[attr.data-orientation]': '_orientation()',
                        '[attr.data-state]': '_state()',
                        '[attr.aria-expanded]': '_isExpanded()',
                        '[attr.aria-controls]': 'ariaControls',
                        '[attr.aria-disabled]': '_disabled()',
                        '[disabled]': '_disabled()',
                        '(click)': 'toggle($event)',
                        '(keyup.space)': 'toggle($event)',
                        '(keyup.enter)': 'toggle($event)',
                    },
                }]
        }], ctorParameters: () => [] });

const BrnAccordionImports = [
    BrnAccordion,
    BrnAccordionContent,
    BrnAccordionHeader,
    BrnAccordionItem,
    BrnAccordionTrigger,
];

/**
 * Generated bundle index. Do not edit.
 */

export { BrnAccordion, BrnAccordionContent, BrnAccordionHeader, BrnAccordionImports, BrnAccordionItem, BrnAccordionItemToken, BrnAccordionToken, BrnAccordionTrigger, injectBrnAccordion, injectBrnAccordionConfig, injectBrnAccordionItem, provideBrnAccordion, provideBrnAccordionConfig, provideBrnAccordionItem };
//# sourceMappingURL=spartan-ng-brain-accordion.mjs.map
