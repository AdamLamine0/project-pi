import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import * as i0 from '@angular/core';
import { inject, NgZone, Renderer2, signal, Injectable, InjectionToken, ElementRef, input, computed, contentChild, Directive, booleanAttribute, model, contentChildren, effect, TemplateRef, untracked, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { createHoverObservable, waitForElementAnimations, computedPrevious, isElement } from '@spartan-ng/brain/core';
import { Subject, BehaviorSubject, of, fromEvent, merge, combineLatest } from 'rxjs';
import { switchMap, share, takeUntil, map, pairwise, filter, startWith, debounceTime, delay, tap, distinctUntilChanged } from 'rxjs/operators';
import * as i1 from '@spartan-ng/brain/button';
import { BrnButton } from '@spartan-ng/brain/button';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { isPlatformBrowser } from '@angular/common';

const horizontalPositions = [
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
    },
];
const verticalPositions = [
    {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
    },
    {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top',
    },
];
class BrnNavigationMenuContentService {
    static _id = 0;
    _overlay = inject(Overlay);
    _zone = inject(NgZone);
    _psBuilder = inject(OverlayPositionBuilder);
    _renderer = inject(Renderer2);
    _content = signal(null, ...(ngDevMode ? [{ debugName: "_content" }] : []));
    id = `brn-navigation-menu-content-${++BrnNavigationMenuContentService._id}`;
    _shouldDetach = false;
    _config = {};
    _overlayRef;
    _positionStrategy;
    _destroyed$ = new Subject();
    _contentEl = signal(undefined, ...(ngDevMode ? [{ debugName: "_contentEl" }] : []));
    contentEl = this._contentEl.asReadonly();
    _overlayHoveredObservables$ = new BehaviorSubject(undefined);
    _overlayShiftTabObservables$ = new BehaviorSubject(undefined);
    _overlayEscapeObservables$ = new BehaviorSubject(undefined);
    hovered$ = this._overlayHoveredObservables$.pipe(switchMap((overlayHoveredObservable) => (overlayHoveredObservable !== undefined ? overlayHoveredObservable : of())), share());
    _shiftTabPressed$ = this._overlayShiftTabObservables$.pipe(switchMap((contentFocused$) => (contentFocused$ !== undefined ? contentFocused$ : of())));
    escapePressed$ = this._overlayEscapeObservables$.pipe(switchMap((contentFocused$) => (contentFocused$ !== undefined ? contentFocused$ : of())));
    constructor() {
        this._shiftTabPressed$.pipe(takeUntil(this._destroyed$)).subscribe((e) => {
            if (this._config.attachTo?.nativeElement) {
                e.preventDefault();
                this._config.attachTo.nativeElement.focus();
            }
        });
    }
    setConfig(config) {
        this._config = config;
        if (config.attachTo) {
            const positions = this._getPositions(config.orientation);
            this._positionStrategy = this._buildPositionStrategy(config.attachTo, positions);
            this._config = {
                ...this._config,
                positionStrategy: this._positionStrategy,
                scrollStrategy: this._overlay.scrollStrategies.reposition(),
            };
        }
        this._overlayRef = this._overlay.create(this._config);
    }
    updateOrientation(orientation) {
        if (!this._config.attachTo)
            return;
        const positions = this._getPositions(orientation);
        this._positionStrategy = this._buildPositionStrategy(this._config.attachTo, positions);
        this._config = {
            ...this._config,
            positionStrategy: this._positionStrategy,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
        };
        this._overlayRef?.updatePositionStrategy(this._positionStrategy);
    }
    updateDirection(dir) {
        this._overlayRef?.setDirection(dir);
    }
    setContent(value, vcr) {
        this._content.set(new TemplatePortal(value, vcr));
        if (!this._overlayRef) {
            this._overlayRef = this._overlay.create(this._config);
        }
    }
    show() {
        const content = this._content();
        if (!content || !this._overlayRef)
            return;
        this._shouldDetach = false;
        this._overlayRef?.detach();
        const embededViewRef = this._overlayRef?.attach(content);
        this._destroyed$ = new Subject();
        const contentEl = embededViewRef.rootNodes[0];
        const attachToId = this._config.attachTo?.nativeElement.id;
        this._renderer.setAttribute(contentEl, 'id', this.id);
        if (attachToId !== undefined) {
            this._renderer.setAttribute(contentEl, 'aria-labelledby', attachToId);
        }
        this._contentEl.set(contentEl);
        this._overlayHoveredObservables$.next(createHoverObservable(this._overlayRef.hostElement, this._zone, this._destroyed$).pipe(map((e) => e.hover)));
        this._overlayShiftTabObservables$.next(fromEvent(contentEl, 'keydown').pipe(switchMap((e) => (e.key === 'Tab' && e.shiftKey && e.target === this.contentEl() ? of(e) : of())), takeUntil(this._destroyed$)));
        this._overlayEscapeObservables$.next(fromEvent(contentEl, 'keydown').pipe(switchMap((e) => (e.key === 'Escape' && !hasModifierKey(e) ? of(e) : of())), takeUntil(this._destroyed$)));
    }
    async hide() {
        const contentEl = this._contentEl();
        if (!contentEl)
            return;
        this._shouldDetach = true;
        if (!this._hasAnimation()) {
            this._detach();
        }
        await waitForElementAnimations(contentEl);
        this._detach();
    }
    _detach = () => {
        if (!this._shouldDetach)
            return;
        this._overlayRef?.detach();
        this._contentEl.set(undefined);
        this._destroyed$.next();
        this._destroyed$.complete();
        this._destroyed$ = new Subject();
    };
    _hasAnimation() {
        const contentEl = this.contentEl();
        if (!contentEl)
            return;
        return getComputedStyle(contentEl).animationName !== 'none';
    }
    _getPositions(orientation) {
        return orientation === 'vertical' ? verticalPositions : horizontalPositions;
    }
    _buildPositionStrategy(attachTo, positions) {
        return this._psBuilder
            .flexibleConnectedTo(attachTo)
            .withPositions(positions)
            .withDefaultOffsetY(0)
            .withDefaultOffsetX(0)
            .withPush(false);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuContentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuContentService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuContentService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

const BrnNavigationMenuFocusable = new InjectionToken('BrnNavigationMenuFocusable');
function provideBrnNavigationMenuFocusable(focusable) {
    return { provide: BrnNavigationMenuFocusable, useExisting: focusable };
}

const BrnNavigationMenuItemToken = new InjectionToken('BrnNavigationMenuItemToken');
function injectBrnNavigationMenuItem() {
    return inject(BrnNavigationMenuItemToken);
}
function provideBrnNavigationMenuItem(navigationMenuItem) {
    return { provide: BrnNavigationMenuItemToken, useExisting: navigationMenuItem };
}

const BrnNavigationMenuToken = new InjectionToken('BrnNavigationMenuToken');
function injectBrnNavigationMenu() {
    return inject(BrnNavigationMenuToken);
}
function provideBrnNavigationMenu(navigationMenu) {
    return { provide: BrnNavigationMenuToken, useExisting: navigationMenu };
}

class BrnNavigationMenuItem {
    static _id = 0;
    _navigationMenu = injectBrnNavigationMenu();
    _contentService = inject(BrnNavigationMenuContentService);
    el = inject(ElementRef);
    navMenuElRef = this._navigationMenu.el;
    /** The id of the navigation menu item */
    id = input(`brn-navigation-menu-item-${++BrnNavigationMenuItem._id}`, ...(ngDevMode ? [{ debugName: "id" }] : []));
    isActive = computed(() => this.id() === this._navigationMenu.value(), ...(ngDevMode ? [{ debugName: "isActive" }] : []));
    wasActive = computed(() => this.id() === this._navigationMenu.previousValue(), ...(ngDevMode ? [{ debugName: "wasActive" }] : []));
    state = computed(() => (this.isActive() ? 'open' : 'closed'), ...(ngDevMode ? [{ debugName: "state" }] : []));
    contentTemplate = signal(null, ...(ngDevMode ? [{ debugName: "contentTemplate" }] : []));
    contentHovered$ = this._contentService.hovered$;
    subNavVisible$ = new Subject();
    focusable = contentChild.required(BrnNavigationMenuFocusable);
    _triggerOrLinkBtn = contentChild.required(BrnNavigationMenuFocusable, { read: BrnButton });
    disabled = computed(() => this._triggerOrLinkBtn().disabled(), ...(ngDevMode ? [{ debugName: "disabled" }] : []));
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuItem, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.2.0", version: "20.3.17", type: BrnNavigationMenuItem, isStandalone: true, selector: "li[brnNavigationMenuItem]", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "data-slot": "navigation-menu-item" }, properties: { "id": "id()", "attr.data-disabled": "disabled() || null" } }, providers: [provideBrnNavigationMenuItem(BrnNavigationMenuItem), BrnNavigationMenuContentService], queries: [{ propertyName: "focusable", first: true, predicate: BrnNavigationMenuFocusable, descendants: true, isSignal: true }, { propertyName: "_triggerOrLinkBtn", first: true, predicate: BrnNavigationMenuFocusable, descendants: true, read: BrnButton, isSignal: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuItem, decorators: [{
            type: Directive,
            args: [{
                    selector: 'li[brnNavigationMenuItem]',
                    providers: [provideBrnNavigationMenuItem(BrnNavigationMenuItem), BrnNavigationMenuContentService],
                    host: {
                        '[id]': 'id()',
                        '[attr.data-disabled]': 'disabled() || null',
                        'data-slot': 'navigation-menu-item',
                    },
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }], focusable: [{ type: i0.ContentChild, args: [i0.forwardRef(() => BrnNavigationMenuFocusable), { isSignal: true }] }], _triggerOrLinkBtn: [{ type: i0.ContentChild, args: [i0.forwardRef(() => BrnNavigationMenuFocusable), { ...{ read: BrnButton }, isSignal: true }] }] } });

class BrnNavigationMenuLink {
    _navigationMenu = injectBrnNavigationMenu();
    _navigationMenuItem = injectBrnNavigationMenuItem();
    _el = inject(ElementRef);
    // Returns false if this BrnNavigationMenuLink is used "standalone", meaning it doesn't have a parent BrnNavigationMenuItem element.
    _hasParentNavMenuItem = this._el.nativeElement.parentElement === this._navigationMenuItem.el.nativeElement;
    /**
     * Used to identify the link as the currently active page.
     */
    active = input(undefined, ...(ngDevMode ? [{ debugName: "active", transform: booleanAttribute }] : [{
            transform: booleanAttribute,
        }]));
    _isActive = computed(() => {
        const active = this.active();
        if (active !== undefined)
            return active;
        if (!this._hasParentNavMenuItem)
            return false;
        return this._navigationMenuItem.isActive();
    }, ...(ngDevMode ? [{ debugName: "_isActive" }] : []));
    get disabled() {
        return this._navigationMenuItem.disabled();
    }
    focus(_origin) {
        if (!this._hasParentNavMenuItem || this._navigationMenuItem.disabled())
            return;
        this._el.nativeElement.focus();
    }
    handleFocus() {
        if (!this._hasParentNavMenuItem)
            return;
        this._navigationMenu.setActiveItem(this);
    }
    onClick() {
        if (!this._hasParentNavMenuItem)
            return;
        this._navigationMenu.value.set(this._navigationMenuItem.id());
    }
    activate() {
        if (!this._hasParentNavMenuItem)
            return;
        // Only activate on hover if openOn is 'hover' or menu is already open
        const openOn = this._navigationMenu.openOn();
        const isMenuOpen = this._navigationMenu.value() !== undefined;
        if (openOn === 'click' && !isMenuOpen)
            return;
        this._navigationMenu.value.set(this._navigationMenuItem.id());
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuLink, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnNavigationMenuLink, isStandalone: true, selector: "a[brnNavigationMenuLink]", inputs: { active: { classPropertyName: "active", publicName: "active", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "data-slot": "navigation-menu-link" }, listeners: { "click": "onClick()", "mouseenter": "activate()", "focus": "handleFocus()" }, properties: { "attr.data-active": "_isActive() ? \"\" : undefined", "attr.aria-current": "_isActive() ? \"page\" : undefined" } }, providers: [provideBrnNavigationMenuFocusable(BrnNavigationMenuLink)], hostDirectives: [{ directive: i1.BrnButton, inputs: ["disabled", "disabled"] }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuLink, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[brnNavigationMenuLink]',
                    providers: [provideBrnNavigationMenuFocusable(BrnNavigationMenuLink)],
                    hostDirectives: [
                        {
                            directive: BrnButton,
                            inputs: ['disabled'],
                        },
                    ],
                    host: {
                        '(click)': 'onClick()',
                        '(mouseenter)': 'activate()',
                        '(focus)': 'handleFocus()',
                        '[attr.data-active]': '_isActive() ? "" : undefined',
                        '[attr.aria-current]': '_isActive() ? "page" : undefined',
                        'data-slot': 'navigation-menu-link',
                    },
                }]
        }], propDecorators: { active: [{ type: i0.Input, args: [{ isSignal: true, alias: "active", required: false }] }] } });

const BrnParentNavMenu = new InjectionToken('BrnParentNavMenu');
function injectBrnParentNavMenu() {
    return inject(BrnParentNavMenu, { optional: true });
}
function provideBrnParentNavMenu(parentNavMenu) {
    return { provide: BrnParentNavMenu, useFactory: parentNavMenu };
}

function areArraysSameByElRef(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    return arr1.every((item, index) => item === arr2[index]);
}
class BrnNavigationMenu {
    _dir = inject(Directionality);
    _zone = inject(NgZone);
    _destroy$ = new Subject();
    _anyTriggerHovered$ = new BehaviorSubject(false);
    el = inject(ElementRef);
    parentNavMenu = injectBrnParentNavMenu();
    /**
     * The controlled value of the menu item to activate.
     */
    value = model(...(ngDevMode ? [undefined, { debugName: "value" }] : []));
    /**
     * The duration from when the mouse enters a trigger until the content opens.
     */
    delayDuration = input(200, ...(ngDevMode ? [{ debugName: "delayDuration" }] : []));
    /**
     * How much time a user has to enter another trigger without incurring a delay again.
     */
    skipDelayDuration = input(300, ...(ngDevMode ? [{ debugName: "skipDelayDuration" }] : []));
    /**
     * Controls whether the menu opens on hover or click.
     * When 'click', initial open requires a click, but hover still switches between items once open.
     */
    openOn = input('hover', ...(ngDevMode ? [{ debugName: "openOn" }] : []));
    /** internal **/
    direction = this._dir.valueSignal;
    /**
     * The orientation of the menu.
     */
    orientation = input('horizontal', ...(ngDevMode ? [{ debugName: "orientation" }] : []));
    _isOpenDelayed = signal(true, ...(ngDevMode ? [{ debugName: "_isOpenDelayed" }] : []));
    isOpenDelayed = this._isOpenDelayed.asReadonly();
    _skipDelayTimerRef;
    _navAndSubnavMenuItems = contentChildren(BrnNavigationMenuItem, ...(ngDevMode ? [{ debugName: "_navAndSubnavMenuItems", descendants: true }] : [{ descendants: true }]));
    menuItems = computed(() => this._navAndSubnavMenuItems().filter((mi) => mi.navMenuElRef === this.el), ...(ngDevMode ? [{ debugName: "menuItems", equal: areArraysSameByElRef }] : [{
            equal: areArraysSameByElRef,
        }]));
    menuItemIds = computed(() => this.menuItems().map((mi) => mi.id()), ...(ngDevMode ? [{ debugName: "menuItemIds" }] : []));
    _triggersAndLinks = computed(() => this.menuItems().map((mi) => mi.focusable()), ...(ngDevMode ? [{ debugName: "_triggersAndLinks" }] : []));
    _linkMenuItems = computed(() => this.menuItems().filter((i) => i.focusable() instanceof BrnNavigationMenuLink), ...(ngDevMode ? [{ debugName: "_linkMenuItems" }] : []));
    _keyManager = computed(() => {
        return new FocusKeyManager(this._triggersAndLinks())
            .withHorizontalOrientation(this.direction())
            .withHomeAndEnd()
            .withPageUpDown()
            .withWrap()
            .skipPredicate((e) => !!e.disabled);
    }, ...(ngDevMode ? [{ debugName: "_keyManager" }] : []));
    _reset$ = toObservable(this.value).pipe(pairwise(), filter(([prev, curr]) => curr === undefined && curr !== prev), map(() => undefined));
    _hovered$ = merge(createHoverObservable(this.el.nativeElement, this._zone, this._destroy$).pipe(map((e) => e.hover)), this._reset$).pipe(startWith(undefined));
    _contentHovered$ = merge(toObservable(this._navAndSubnavMenuItems).pipe(switchMap((menuItems) => merge(...menuItems.map((mi) => mi.contentHovered$)))), this._reset$).pipe(startWith(undefined));
    previousValue = computedPrevious(this.value);
    context = computed(() => ({ orientation: this.orientation(), dir: this.direction() }), ...(ngDevMode ? [{ debugName: "context" }] : []));
    constructor() {
        effect(() => {
            const isOpen = this.value() !== undefined;
            const hasSkipDelayDuration = this.skipDelayDuration() > 0;
            if (isOpen) {
                clearTimeout(this._skipDelayTimerRef);
                if (hasSkipDelayDuration)
                    this._isOpenDelayed.set(false);
            }
            else {
                clearTimeout(this._skipDelayTimerRef);
                this._skipDelayTimerRef = setTimeout(() => {
                    this._isOpenDelayed.set(true);
                }, this.skipDelayDuration());
            }
        });
        combineLatest([this._hovered$, this._contentHovered$, this._anyTriggerHovered$])
            .pipe(debounceTime(0), filter(([hovered, contentHovered]) => !(hovered === undefined && contentHovered === undefined)), switchMap(([hovered, contentHovered, triggerHovered]) => {
            const shouldClose = !hovered && !contentHovered && !triggerHovered;
            // Add delay before closing in click mode to allow for sibling hover transitions
            if (shouldClose && this.openOn() === 'click') {
                return of([hovered, contentHovered, triggerHovered]).pipe(delay(150));
            }
            return of([hovered, contentHovered, triggerHovered]);
        }), takeUntil(this._destroy$))
            .subscribe(([hovered, contentHovered, triggerHovered]) => {
            if (!hovered && !contentHovered && !triggerHovered) {
                this.value.set(undefined);
            }
        });
    }
    /**
     * Called by triggers to report their hover state for coordination.
     * @internal
     */
    setTriggerHovered(hovered) {
        this._anyTriggerHovered$.next(hovered);
    }
    isLink(id) {
        return !!this._linkMenuItems().find((item) => item.id() === id);
    }
    setActiveItem(item) {
        this._keyManager().setActiveItem(item);
    }
    handleKeydown(event) {
        this._keyManager().onKeydown(event);
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        clearTimeout(this._skipDelayTimerRef);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenu, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.2.0", version: "20.3.17", type: BrnNavigationMenu, isStandalone: true, selector: "nav[brnNavigationMenu]", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, delayDuration: { classPropertyName: "delayDuration", publicName: "delayDuration", isSignal: true, isRequired: false, transformFunction: null }, skipDelayDuration: { classPropertyName: "skipDelayDuration", publicName: "skipDelayDuration", isSignal: true, isRequired: false, transformFunction: null }, openOn: { classPropertyName: "openOn", publicName: "openOn", isSignal: true, isRequired: false, transformFunction: null }, orientation: { classPropertyName: "orientation", publicName: "orientation", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, host: { attributes: { "aria-label": "Main", "data-slot": "navigation-menu" }, listeners: { "keydown": "handleKeydown($event)" }, properties: { "attr.data-orientation": "orientation()", "attr.dir": "direction()" } }, providers: [provideBrnNavigationMenu(BrnNavigationMenu)], queries: [{ propertyName: "_navAndSubnavMenuItems", predicate: BrnNavigationMenuItem, descendants: true, isSignal: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nav[brnNavigationMenu]',
                    providers: [provideBrnNavigationMenu(BrnNavigationMenu)],
                    host: {
                        '(keydown)': 'handleKeydown($event)',
                        '[attr.data-orientation]': 'orientation()',
                        '[attr.dir]': 'direction()',
                        'aria-label': 'Main',
                        'data-slot': 'navigation-menu',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], delayDuration: [{ type: i0.Input, args: [{ isSignal: true, alias: "delayDuration", required: false }] }], skipDelayDuration: [{ type: i0.Input, args: [{ isSignal: true, alias: "skipDelayDuration", required: false }] }], openOn: [{ type: i0.Input, args: [{ isSignal: true, alias: "openOn", required: false }] }], orientation: [{ type: i0.Input, args: [{ isSignal: true, alias: "orientation", required: false }] }], _navAndSubnavMenuItems: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => BrnNavigationMenuItem), { ...{ descendants: true }, isSignal: true }] }] } });

class BrnNavigationMenuContent {
    _navigationMenu = injectBrnNavigationMenu();
    _navigationMenuItem = injectBrnNavigationMenuItem();
    _contentService = inject(BrnNavigationMenuContentService);
    _tpl = inject(TemplateRef);
    _renderer = inject(Renderer2);
    _subNavContext = inject(BrnParentNavMenu);
    _navMenuValue = this._navigationMenu.value;
    _prevNavMenuValue = this._navigationMenu.previousValue;
    _id = this._navigationMenuItem.id;
    _isActive = this._navigationMenuItem.isActive;
    _wasActive = this._navigationMenuItem.wasActive;
    _state = this._navigationMenuItem.state;
    _contentEl = this._contentService.contentEl;
    _menuItemsIds = this._navigationMenu.menuItemIds;
    _orientation = computed(() => this._navigationMenu.context().orientation, ...(ngDevMode ? [{ debugName: "_orientation" }] : []));
    _dir = computed(() => this._navigationMenu.context().dir, ...(ngDevMode ? [{ debugName: "_dir" }] : []));
    constructor() {
        if (!this._tpl)
            return;
        this._navigationMenuItem.contentTemplate.set(this._tpl);
        this._navigationMenuItem.subNavVisible$.next(this._subNavContext.subNavVisible$);
        effect(() => {
            const el = this._contentEl();
            if (el) {
                this._renderer.setAttribute(el, 'tabindex', '0');
                this._renderer.setAttribute(el, 'data-slot', 'navigation-menu-content');
            }
        });
        effect(() => {
            const el = this._contentEl();
            if (el) {
                this._renderer.setAttribute(el, 'data-state', this._state());
            }
        });
        effect(() => {
            const el = this._contentEl();
            if (el) {
                this._renderer.setAttribute(el, 'data-orientation', this._orientation());
            }
        });
        effect(() => {
            const isActive = this._isActive();
            const wasActive = this._wasActive();
            const dir = this._dir();
            const orientation = this._orientation();
            const el = untracked(this._contentEl);
            if (!el)
                return;
            const id = this._id();
            const menuItemsIds = dir === 'rtl' && orientation === 'horizontal' ? this._menuItemsIds().slice().reverse() : this._menuItemsIds();
            if (isActive) {
                const prevNavMenuValue = this._prevNavMenuValue();
                const isPrevLink = untracked(() => this._navigationMenu.isLink(prevNavMenuValue));
                if (prevNavMenuValue && !isPrevLink) {
                    const motion = menuItemsIds.indexOf(id) > menuItemsIds.indexOf(prevNavMenuValue) ? 'from-end' : 'from-start';
                    this._renderer.setAttribute(el, 'data-motion', motion);
                }
            }
            else if (wasActive) {
                const navMenuValue = this._navMenuValue();
                const isLink = untracked(() => this._navigationMenu.isLink(navMenuValue));
                if (!navMenuValue || isLink)
                    return;
                const motion = menuItemsIds.indexOf(id) > menuItemsIds.indexOf(navMenuValue) ? 'to-end' : 'to-start';
                this._renderer.setAttribute(el, 'data-motion', motion);
            }
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuContent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnNavigationMenuContent, isStandalone: true, selector: "[brnNavigationMenuContent]", providers: [provideBrnParentNavMenu((() => ({ subNavVisible$: new Subject() })))], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnNavigationMenuContent]',
                    providers: [provideBrnParentNavMenu((() => ({ subNavVisible$: new Subject() })))],
                }]
        }], ctorParameters: () => [] });

class BrnNavigationMenuList {
    _navigationMenu = injectBrnNavigationMenu();
    _orientation = computed(() => this._navigationMenu.context().orientation, ...(ngDevMode ? [{ debugName: "_orientation" }] : []));
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuList, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnNavigationMenuList, isStandalone: true, selector: "ul[brnNavigationMenuList]", host: { attributes: { "data-slot": "navigation-menu-list" }, properties: { "attr.data-orientation": "_orientation()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuList, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ul[brnNavigationMenuList]',
                    host: {
                        '[attr.data-orientation]': '_orientation()',
                        'data-slot': 'navigation-menu-list',
                    },
                }]
        }] });

class BrnNavigationMenuTrigger {
    static _id = 0;
    _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    _navigationMenu = injectBrnNavigationMenu();
    _navigationMenuItem = injectBrnNavigationMenuItem();
    _destroy$ = new Subject();
    _vcr = inject(ViewContainerRef);
    _zone = inject(NgZone);
    _el = inject(ElementRef);
    _contentService = inject(BrnNavigationMenuContentService);
    _id = `brn-navigation-menu-trigger-${++BrnNavigationMenuTrigger._id}`;
    _parentNavMenu = this._navigationMenu.parentNavMenu;
    _isActive = this._navigationMenuItem.isActive;
    _contentId = this._contentService.id;
    _state = this._navigationMenuItem.state;
    _dir = computed(() => this._navigationMenu.context().dir, ...(ngDevMode ? [{ debugName: "_dir" }] : []));
    _orientation = computed(() => this._navigationMenu.context().orientation, ...(ngDevMode ? [{ debugName: "_orientation" }] : []));
    _isOpenDelayed = this._navigationMenu.isOpenDelayed;
    _delayDuration = this._navigationMenu.delayDuration;
    _contentTemplate = this._navigationMenuItem.contentTemplate;
    _isSubNavVisible = toSignal(this._navigationMenuItem.subNavVisible$.pipe(switchMap((c) => c)), {
        initialValue: false,
    });
    _isActive$ = toObservable(this._navigationMenuItem.isActive).pipe(map((value) => ({ type: 'set', visible: value })));
    _clicked$ = fromEvent(this._el.nativeElement, 'click').pipe(map(() => !this._navigationMenuItem.isActive()), map((value) => ({ type: 'click', visible: value })));
    _hovered$ = merge(createHoverObservable(this._el.nativeElement, this._zone, this._destroy$), this._contentService.hovered$.pipe(map((v) => ({ hover: v, relatedTarget: null })))).pipe(
    // Report hover state to parent for coordination
    tap((e) => this._navigationMenu.setTriggerHovered(e.hover)), 
    // Hover event is NOT allowed when a sub-navigation is currently visible, AND the current hover event is false.
    filter((e) => !(this._isSubNavVisible() && !e.hover)), 
    // Block hover-open when openOn='click' and no menu is currently open
    filter((e) => {
        const openOn = this._navigationMenu.openOn();
        const isMenuOpen = this._navigationMenu.value() !== undefined;
        // Allow if: openOn is 'hover', OR menu is already open, OR this is hover-out
        return openOn === 'hover' || isMenuOpen || !e.hover;
    }), 
    // Add stabilization delay for hover-out in click mode to prevent race conditions
    switchMap((e) => {
        if (!e.hover && this._navigationMenu.openOn() === 'click') {
            return of(e).pipe(delay(50));
        }
        return of(e);
    }), map((e) => ({ type: 'hover', visible: e.hover, relatedTarget: e.relatedTarget })));
    _showing$ = merge(this._isActive$, this._clicked$, this._hovered$).pipe(debounceTime(0), distinctUntilChanged((prev, curr) => prev.visible === curr.visible), switchMap((ev) => {
        const shouldDelay = ev.visible && ev.type !== 'click' && this._isOpenDelayed();
        return of(ev).pipe(delay(shouldDelay ? this._delayDuration() : 0));
    }), 
    // Deactivate needs to be called if the menu item content is hidden with a user click OR
    // If nav item is hovered out to a disabled sibling nav item
    tap((ev) => {
        if (ev.visible) {
            this._activate();
        }
        else {
            const shouldDeactivate = (ev.type === 'click' || !this._isHoverOnSibling(ev)) && this._navigationMenuItem.isActive();
            if (shouldDeactivate) {
                this._deactivate();
            }
        }
    }), share(), takeUntil(this._destroy$));
    get disabled() {
        return this._navigationMenuItem.disabled();
    }
    constructor() {
        effect(() => {
            const value = this._contentTemplate();
            untracked(() => {
                if (value) {
                    this._contentService.setContent(value, this._vcr);
                }
            });
        });
        effect(() => {
            const orientation = this._orientation();
            untracked(() => {
                this._contentService.updateOrientation(orientation);
            });
        });
        effect(() => {
            const dir = this._dir();
            untracked(() => {
                this._contentService.updateDirection(dir);
            });
        });
    }
    ngOnInit() {
        this._contentService.setConfig({ attachTo: this._el, direction: this._dir(), orientation: this._orientation() });
        this._showing$.pipe(takeUntil(this._destroy$)).subscribe((ev) => {
            if (this._parentNavMenu) {
                this._parentNavMenu.subNavVisible$.next(ev.visible);
            }
            if (ev.visible) {
                if (this._isBrowser) {
                    this._contentService.show();
                }
            }
            else {
                this._contentService.hide();
            }
        });
        this._contentService.escapePressed$.pipe(takeUntil(this._destroy$)).subscribe((e) => {
            e.preventDefault();
            this._el.nativeElement.focus();
            this._deactivate();
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    focus(_origin) {
        if (this._navigationMenuItem.disabled())
            return;
        this._el.nativeElement.focus();
    }
    handleFocus() {
        this._navigationMenu.setActiveItem(this);
    }
    onTab(e) {
        const contentEl = this._contentService.contentEl();
        if (contentEl && !hasModifierKey(e)) {
            e.preventDefault();
            contentEl.focus();
        }
    }
    onEscape(e) {
        e.preventDefault();
        this._deactivate();
    }
    _activate() {
        this._navigationMenu.value.set(this._navigationMenuItem.id());
    }
    _deactivate() {
        this._navigationMenu.value.set(undefined);
    }
    _isHoverOnSibling(ev) {
        if (ev.type !== 'hover' || !isElement(ev.relatedTarget))
            return false;
        const menuItem = this._isMenuItemOrChild(ev.relatedTarget);
        return !!menuItem && !menuItem.disabled();
    }
    _isMenuItemOrChild(node) {
        return this._navigationMenu
            .menuItems()
            .find((ref) => ref.el.nativeElement === node || ref.el.nativeElement.contains(node));
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuTrigger, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnNavigationMenuTrigger, isStandalone: true, selector: "button[brnNavigationMenuTrigger]", host: { attributes: { "data-slot": "navigation-menu-trigger" }, listeners: { "keydown.escape": "onEscape($event)", "keydown.tab": "onTab($event)", "focus": "handleFocus()" }, properties: { "id": "_id", "attr.data-state": "_state()", "attr.aria-expanded": "_isActive()", "attr.aria-controls": "_contentId" } }, providers: [provideBrnNavigationMenuFocusable(BrnNavigationMenuTrigger)], hostDirectives: [{ directive: i1.BrnButton, inputs: ["disabled", "disabled"] }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnNavigationMenuTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnNavigationMenuTrigger]',
                    providers: [provideBrnNavigationMenuFocusable(BrnNavigationMenuTrigger)],
                    hostDirectives: [
                        {
                            directive: BrnButton,
                            inputs: ['disabled'],
                        },
                    ],
                    host: {
                        '(keydown.escape)': 'onEscape($event)',
                        '(keydown.tab)': 'onTab($event)',
                        '(focus)': 'handleFocus()',
                        '[id]': '_id',
                        '[attr.data-state]': '_state()',
                        '[attr.aria-expanded]': '_isActive()',
                        '[attr.aria-controls]': '_contentId',
                        'data-slot': 'navigation-menu-trigger',
                    },
                }]
        }], ctorParameters: () => [] });

const BrnNavigationMenuImports = [
    BrnNavigationMenu,
    BrnNavigationMenuItem,
    BrnNavigationMenuList,
    BrnNavigationMenuTrigger,
    BrnNavigationMenuContent,
    BrnNavigationMenuLink,
];

/**
 * Generated bundle index. Do not edit.
 */

export { BrnNavigationMenu, BrnNavigationMenuContent, BrnNavigationMenuImports, BrnNavigationMenuItem, BrnNavigationMenuLink, BrnNavigationMenuList, BrnNavigationMenuTrigger };
//# sourceMappingURL=spartan-ng-brain-navigation-menu.mjs.map
