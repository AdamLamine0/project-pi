import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import { InjectionToken, inject, forwardRef, Injector, input, booleanAttribute, linkedSignal, output, model, contentChildren, effect, untracked, afterNextRender, Directive, TemplateRef, ViewContainerRef, computed, ElementRef, signal, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

const BrnCommandItemToken = new InjectionToken('BrnCommandItemToken');
function provideBrnCommandItem(command) {
    return { provide: BrnCommandItemToken, useExisting: command };
}

const BrnCommandToken = new InjectionToken('BrnCommandToken');
function provideBrnCommand(command) {
    return { provide: BrnCommandToken, useExisting: command };
}
function injectBrnCommand() {
    return inject(BrnCommandToken);
}
const defaultConfig = {
    filter: (value, search) => value.toLowerCase().includes(search.toLowerCase()),
};
const BrnCommandConfigToken = new InjectionToken('BrnCommandConfig');
function provideBrnCommandConfig(config) {
    return { provide: BrnCommandConfigToken, useValue: { ...defaultConfig, ...config } };
}
function injectBrnCommandConfig() {
    return inject(BrnCommandConfigToken, { optional: true }) ?? defaultConfig;
}

const BRN_COMMAND_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BrnCommand),
    multi: true,
};
class BrnCommand {
    static _id = 0;
    _injector = inject(Injector);
    _config = injectBrnCommandConfig();
    /** The id of the command */
    id = input(`brn-command-${++BrnCommand._id}`, ...(ngDevMode ? [{ debugName: "id" }] : []));
    /** A custom filter function to use when searching. */
    filter = input(this._config.filter, ...(ngDevMode ? [{ debugName: "filter" }] : []));
    /** Whether the command is disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    _disabled = linkedSignal(this.disabled, ...(ngDevMode ? [{ debugName: "_disabled" }] : []));
    /** @internal The disabled state as a readonly signal */
    disabledState = this._disabled.asReadonly();
    /** when the selection has changed */
    valueChange = output();
    /** The current search query. */
    search = model('', ...(ngDevMode ? [{ debugName: "search" }] : []));
    /** @internal Access all the items within the command */
    items = contentChildren(BrnCommandItemToken, ...(ngDevMode ? [{ debugName: "items", descendants: true }] : [{
            descendants: true,
        }]));
    /** @internal The key manager for managing active descendant */
    keyManager = new ActiveDescendantKeyManager(this.items, this._injector);
    _onChange;
    _onTouched;
    constructor() {
        this.keyManager
            .withVerticalOrientation()
            .withHomeAndEnd()
            .withWrap()
            .skipPredicate((item) => item.disabled || !item.visible());
        // When clearing the search input we also want to reset the active item to the first one
        effect(() => {
            const searchInput = this.search();
            untracked(() => {
                const activeItemIsVisible = this.keyManager.activeItem?.visible();
                if ((searchInput !== undefined && searchInput.length === 0) || !activeItemIsVisible) {
                    this.keyManager.setFirstItemActive();
                }
            });
        });
        this.keyManager.change.pipe(takeUntilDestroyed()).subscribe(() => {
            const value = this.keyManager.activeItem?.safeValue();
            if (value) {
                this.valueChange.emit(value);
            }
        });
        afterNextRender(() => {
            if (this.items().length) {
                this.keyManager.setActiveItem(0);
            }
        });
    }
    selectActiveItem() {
        this.keyManager.activeItem?.selected.emit();
    }
    /** CONTROL VALUE ACCESSOR */
    writeValue(value) {
        if (value) {
            this.search.set(value);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this._disabled.set(isDisabled);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommand, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.2.0", version: "20.3.17", type: BrnCommand, isStandalone: true, selector: "[brnCommand]", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null }, filter: { classPropertyName: "filter", publicName: "filter", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, search: { classPropertyName: "search", publicName: "search", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { valueChange: "valueChange", search: "searchChange" }, host: { listeners: { "keydown.enter": "selectActiveItem()" }, properties: { "id": "id()" } }, providers: [provideBrnCommand(BrnCommand), BRN_COMMAND_VALUE_ACCESSOR], queries: [{ propertyName: "items", predicate: BrnCommandItemToken, descendants: true, isSignal: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommand, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCommand]',
                    providers: [provideBrnCommand(BrnCommand), BRN_COMMAND_VALUE_ACCESSOR],
                    host: {
                        '[id]': 'id()',
                        '(keydown.enter)': 'selectActiveItem()',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }], filter: [{ type: i0.Input, args: [{ isSignal: true, alias: "filter", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], valueChange: [{ type: i0.Output, args: ["valueChange"] }], search: [{ type: i0.Input, args: [{ isSignal: true, alias: "search", required: false }] }, { type: i0.Output, args: ["searchChange"] }], items: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => BrnCommandItemToken), { ...{
                            descendants: true,
                        }, isSignal: true }] }] } });

class BrnCommandEmpty {
    _templateRef = inject(TemplateRef);
    _viewContainerRef = inject(ViewContainerRef);
    _command = injectBrnCommand();
    /** Determine if the command has any visible items */
    _visible = computed(() => this._command.items().some((item) => item.visible()), ...(ngDevMode ? [{ debugName: "_visible" }] : []));
    constructor() {
        effect(() => {
            if (this._visible()) {
                this._viewContainerRef.clear();
            }
            else {
                this._viewContainerRef.createEmbeddedView(this._templateRef);
            }
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandEmpty, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCommandEmpty, isStandalone: true, selector: "[brnCommandEmpty]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandEmpty, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCommandEmpty]',
                }]
        }], ctorParameters: () => [] });

class BrnCommandGroup {
    static _id = 0;
    /** The id of the command list */
    id = input(`brn-command-group-${++BrnCommandGroup._id}`, ...(ngDevMode ? [{ debugName: "id" }] : []));
    /** Get the items in the group */
    _items = contentChildren(BrnCommandItemToken, ...(ngDevMode ? [{ debugName: "_items", descendants: true }] : [{
            descendants: true,
        }]));
    /** Determine if there are any visible items in the group */
    _visible = computed(() => this._items().some((item) => item.visible()), ...(ngDevMode ? [{ debugName: "_visible" }] : []));
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandGroup, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.2.0", version: "20.3.17", type: BrnCommandGroup, isStandalone: true, selector: "[brnCommandGroup]", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "role": "group" }, properties: { "attr.data-hidden": "!_visible() ? \"\" : null", "id": "id()" } }, queries: [{ propertyName: "_items", predicate: BrnCommandItemToken, descendants: true, isSignal: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandGroup, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCommandGroup]',
                    host: {
                        role: 'group',
                        '[attr.data-hidden]': '!_visible() ? "" : null',
                        '[id]': 'id()',
                    },
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }], _items: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => BrnCommandItemToken), { ...{
                            descendants: true,
                        }, isSignal: true }] }] } });

const BrnCommandInputToken = new InjectionToken('BrnCommandInputToken');
function provideBrnCommandInput(command) {
    return { provide: BrnCommandInputToken, useExisting: command };
}

class BrnCommandInput {
    static _id = 0;
    _el = inject(ElementRef);
    _command = injectBrnCommand();
    _initialId = `brn-command-input-${++BrnCommandInput._id}`;
    /** The id of the command input */
    id = input(this._initialId, ...(ngDevMode ? [{ debugName: "id", transform: (value) => value || this._initialId }] : [{
            transform: (value) => value || this._initialId,
        }]));
    _disabled = this._command.disabledState;
    /** The id of the active option */
    _activeDescendant = signal(undefined, ...(ngDevMode ? [{ debugName: "_activeDescendant" }] : []));
    constructor() {
        this._command.keyManager.change
            .pipe(startWith(this._command.keyManager.activeItemIndex), takeUntilDestroyed())
            .subscribe(() => this._activeDescendant.set(this._command.keyManager.activeItem?.id()));
        effect(() => {
            const search = this._command.search();
            if (this._el.nativeElement.value !== search) {
                this._el.nativeElement.value = search;
            }
        });
    }
    /** Listen for changes to the input value */
    onInput() {
        this._command.search.set(this._el.nativeElement.value);
    }
    /** Listen for keydown events */
    onKeyDown(event) {
        this._command.keyManager.onKeydown(event);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandInput, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnCommandInput, isStandalone: true, selector: "input[brnCommandInput]", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "role": "combobox", "aria-autocomplete": "list", "type": "text", "autocomplete": "off", "autocorrect": "off", "spellcheck": "false" }, listeners: { "keydown": "onKeyDown($event)", "input": "onInput()" }, properties: { "id": "id()", "attr.aria-activedescendant": "_activeDescendant()", "attr.disabled": "_disabled() ? \"\" : null" } }, providers: [provideBrnCommandInput(BrnCommandInput)], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandInput, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[brnCommandInput]',
                    providers: [provideBrnCommandInput(BrnCommandInput)],
                    host: {
                        '[id]': 'id()',
                        role: 'combobox',
                        'aria-autocomplete': 'list',
                        '[attr.aria-activedescendant]': '_activeDescendant()',
                        '[attr.disabled]': '_disabled() ? "" : null',
                        '(keydown)': 'onKeyDown($event)',
                        '(input)': 'onInput()',
                        type: 'text',
                        autocomplete: 'off',
                        autocorrect: 'off',
                        spellcheck: 'false',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }] } });

class BrnCommandItem {
    static _id = 0;
    _platform = inject(PLATFORM_ID);
    _elementRef = inject(ElementRef);
    /** Access the command component */
    _command = injectBrnCommand();
    /** A unique id for the item */
    id = input(`brn-command-item-${++BrnCommandItem._id}`, ...(ngDevMode ? [{ debugName: "id" }] : []));
    /** The value this item represents. */
    value = input.required(...(ngDevMode ? [{ debugName: "value" }] : []));
    /** Whether the item is disabled. */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _disabled = input(false, ...(ngDevMode ? [{ debugName: "_disabled", alias: 'disabled',
            transform: booleanAttribute }] : [{
            alias: 'disabled',
            transform: booleanAttribute,
        }]));
    /** Expose disabled as a value - used by the Highlightable interface */
    get disabled() {
        return this._disabled();
    }
    /** Whether the item is initialized, this is to prevent accessing the value-input before the component is initialized.
     * The brn-command-empty directive accesses the value before the component is initialized, which causes an error.
     */
    _initialized = signal(false, ...(ngDevMode ? [{ debugName: "_initialized" }] : []));
    /** Whether the item is selected. */
    _active = signal(false, ...(ngDevMode ? [{ debugName: "_active" }] : []));
    /** Emits when the item is selected. */
    selected = output();
    /** @internal Determine if this item is visible based on the current search query */
    visible = computed(() => {
        return this._command.filter()(this.safeValue(), this._command.search());
    }, ...(ngDevMode ? [{ debugName: "visible" }] : []));
    /** @internal Get the value of the item, with check if it has been initialized to avoid errors */
    safeValue = computed(() => {
        if (!this._initialized()) {
            return '';
        }
        return this.value();
    }, ...(ngDevMode ? [{ debugName: "safeValue" }] : []));
    /** @internal Get the display value */
    getLabel() {
        return this.safeValue();
    }
    /** @internal */
    setActiveStyles() {
        this._active.set(true);
        // ensure the item is in view
        if (isPlatformBrowser(this._platform)) {
            this._elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
        }
    }
    /** @internal */
    setInactiveStyles() {
        this._active.set(false);
    }
    onClick() {
        this._command.keyManager.setActiveItem(this);
        this.selected.emit();
    }
    activate() {
        if (this._disabled()) {
            return;
        }
        this._command.keyManager.setActiveItem(this);
    }
    ngOnInit() {
        this._initialized.set(true);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandItem, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnCommandItem, isStandalone: true, selector: "button[brnCommandItem]", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, _disabled: { classPropertyName: "_disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selected" }, host: { attributes: { "type": "button", "role": "option", "tabIndex": "-1" }, listeners: { "click": "onClick()", "mouseenter": "activate()" }, properties: { "id": "id()", "attr.disabled": "_disabled() ? true : null", "attr.data-disabled": "_disabled() ? \"\" : null", "attr.data-value": "value()", "attr.data-hidden": "!visible() ? '' : null", "attr.aria-selected": "_active()", "attr.data-selected": "_active() ? '' : null" } }, providers: [provideBrnCommandItem(BrnCommandItem)], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandItem, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnCommandItem]',
                    providers: [provideBrnCommandItem(BrnCommandItem)],
                    host: {
                        type: 'button',
                        role: 'option',
                        tabIndex: '-1',
                        '[id]': 'id()',
                        '[attr.disabled]': '_disabled() ? true : null',
                        '[attr.data-disabled]': '_disabled() ? "" : null',
                        '[attr.data-value]': 'value()',
                        '[attr.data-hidden]': "!visible() ? '' : null",
                        '[attr.aria-selected]': '_active()',
                        '[attr.data-selected]': "_active() ? '' : null",
                        '(click)': 'onClick()',
                        '(mouseenter)': 'activate()',
                    },
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], _disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], selected: [{ type: i0.Output, args: ["selected"] }] } });

class BrnCommandList {
    static _id = 0;
    /** The id of the command list */
    id = input(`brn-command-list-${++BrnCommandList._id}`, ...(ngDevMode ? [{ debugName: "id" }] : []));
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandList, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnCommandList, isStandalone: true, selector: "[brnCommandList]", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "role": "listbox" }, properties: { "id": "id()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandList, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCommandList]',
                    host: {
                        role: 'listbox',
                        '[id]': 'id()',
                    },
                }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: false }] }] } });

class BrnCommandSeparator {
    _command = injectBrnCommand();
    /** Determine if the command has any visible items */
    _visible = computed(() => this._command.items().some((item) => item.visible()), ...(ngDevMode ? [{ debugName: "_visible" }] : []));
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandSeparator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnCommandSeparator, isStandalone: true, selector: "[brnCommandSeparator]", host: { attributes: { "role": "separator" }, properties: { "attr.data-hidden": "!_visible() ? \"\" : null" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnCommandSeparator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnCommandSeparator]',
                    host: {
                        role: 'separator',
                        '[attr.data-hidden]': '!_visible() ? "" : null',
                    },
                }]
        }] });

const BrnCommandImports = [
    BrnCommand,
    BrnCommandEmpty,
    BrnCommandGroup,
    BrnCommandInput,
    BrnCommandItem,
    BrnCommandList,
    BrnCommandSeparator,
];

/**
 * Generated bundle index. Do not edit.
 */

export { BRN_COMMAND_VALUE_ACCESSOR, BrnCommand, BrnCommandEmpty, BrnCommandGroup, BrnCommandImports, BrnCommandInput, BrnCommandInputToken, BrnCommandItem, BrnCommandItemToken, BrnCommandList, BrnCommandSeparator, BrnCommandToken, injectBrnCommand, injectBrnCommandConfig, provideBrnCommand, provideBrnCommandConfig, provideBrnCommandInput, provideBrnCommandItem };
//# sourceMappingURL=spartan-ng-brain-command.mjs.map
