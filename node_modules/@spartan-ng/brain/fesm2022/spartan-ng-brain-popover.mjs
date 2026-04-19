import * as i0 from '@angular/core';
import { InjectionToken, inject, input, numberAttribute, effect, untracked, forwardRef, Directive, ElementRef } from '@angular/core';
import { BrnDialog, provideBrnDialogDefaultOptions, BrnDialogContent, BrnDialogTrigger } from '@spartan-ng/brain/dialog';
import { provideExposesStateProviderExisting } from '@spartan-ng/brain/core';

const defaultConfig = {
    align: 'center',
    sideOffset: 0,
    offsetX: 0,
};
const BrnPopoverConfigToken = new InjectionToken('BrnPopoverConfig');
function provideBrnPopoverConfig(config) {
    return { provide: BrnPopoverConfigToken, useValue: { ...defaultConfig, ...config } };
}
function injectBrnPopoverConfig() {
    return inject(BrnPopoverConfigToken, { optional: true }) ?? defaultConfig;
}

const BRN_POPOVER_DIALOG_DEFAULT_OPTIONS = {
    hasBackdrop: false,
    scrollStrategy: 'reposition',
};
class BrnPopover extends BrnDialog {
    _config = injectBrnPopoverConfig();
    align = input(this._config.align, ...(ngDevMode ? [{ debugName: "align" }] : []));
    sideOffset = input(this._config.sideOffset, ...(ngDevMode ? [{ debugName: "sideOffset", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    offsetX = input(this._config.offsetX, ...(ngDevMode ? [{ debugName: "offsetX", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    _positionStrategy;
    constructor() {
        super();
        this.setAriaDescribedBy('');
        this.setAriaLabelledBy('');
        effect(() => {
            const align = this.align();
            untracked(() => {
                this.mutableAttachPositions.set([
                    {
                        originX: align,
                        originY: 'bottom',
                        overlayX: align,
                        overlayY: 'top',
                    },
                    {
                        originX: align,
                        originY: 'top',
                        overlayX: align,
                        overlayY: 'bottom',
                    },
                ]);
            });
            untracked(() => {
                this.applySideOffset(this.sideOffset());
            });
        });
        effect(() => {
            const sideOffset = this.sideOffset();
            untracked(() => {
                this.applySideOffset(sideOffset);
            });
        });
        effect(() => {
            const offsetX = this.offsetX();
            untracked(() => {
                this.applyOffsetX(offsetX);
            });
        });
        effect(() => {
            const attachTo = this.mutableAttachTo();
            const positions = this.mutableAttachPositions();
            if (!attachTo || !positions || positions.length === 0)
                return;
            untracked(() => {
                if (!this._positionStrategy) {
                    this._positionStrategy = this.positionBuilder.flexibleConnectedTo(attachTo).withPush(false);
                }
                else {
                    this._positionStrategy.setOrigin(attachTo);
                }
                this._positionStrategy.withPositions(positions);
                this.mutablePositionStrategy.set(this._positionStrategy);
            });
        });
    }
    applySideOffset(sideOffset) {
        this.mutableAttachPositions.update((positions) => positions.map((position) => ({
            ...position,
            offsetY: position.originY === 'top' ? -sideOffset : sideOffset,
        })));
    }
    applyOffsetX(offsetX) {
        this.mutableAttachPositions.update((positions) => positions.map((position) => ({
            ...position,
            offsetX,
        })));
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnPopover, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnPopover, isStandalone: true, selector: "[brnPopover],brn-popover", inputs: { align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, sideOffset: { classPropertyName: "sideOffset", publicName: "sideOffset", isSignal: true, isRequired: false, transformFunction: null }, offsetX: { classPropertyName: "offsetX", publicName: "offsetX", isSignal: true, isRequired: false, transformFunction: null } }, providers: [
            {
                provide: BrnDialog,
                useExisting: forwardRef((() => BrnPopover)),
            },
            provideBrnDialogDefaultOptions(BRN_POPOVER_DIALOG_DEFAULT_OPTIONS),
        ], exportAs: ["brnPopover"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnPopover, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnPopover],brn-popover',
                    exportAs: 'brnPopover',
                    providers: [
                        {
                            provide: BrnDialog,
                            useExisting: forwardRef((() => BrnPopover)),
                        },
                        provideBrnDialogDefaultOptions(BRN_POPOVER_DIALOG_DEFAULT_OPTIONS),
                    ],
                }]
        }], ctorParameters: () => [], propDecorators: { align: [{ type: i0.Input, args: [{ isSignal: true, alias: "align", required: false }] }], sideOffset: [{ type: i0.Input, args: [{ isSignal: true, alias: "sideOffset", required: false }] }], offsetX: [{ type: i0.Input, args: [{ isSignal: true, alias: "offsetX", required: false }] }] } });

class BrnPopoverContent extends BrnDialogContent {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnPopoverContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnPopoverContent, isStandalone: true, selector: "[brnPopoverContent]", providers: [provideExposesStateProviderExisting((() => BrnPopoverContent))], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnPopoverContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnPopoverContent]',
                    providers: [provideExposesStateProviderExisting((() => BrnPopoverContent))],
                }]
        }] });

class BrnPopoverTrigger extends BrnDialogTrigger {
    _host = inject(ElementRef, { host: true });
    brnPopoverTriggerFor = input(undefined, ...(ngDevMode ? [{ debugName: "brnPopoverTriggerFor", alias: 'brnPopoverTriggerFor' }] : [{
            alias: 'brnPopoverTriggerFor',
        }]));
    constructor() {
        super();
        effect(() => {
            const brnDialog = this.brnPopoverTriggerFor();
            untracked(() => {
                if (!brnDialog)
                    return;
                brnDialog.mutableAttachTo.set(this._host.nativeElement);
                brnDialog.mutableCloseOnOutsidePointerEvents.set(true);
                this.mutableBrnDialogTriggerFor().set(brnDialog);
            });
        });
        if (!this._brnDialog)
            return;
        this._brnDialog.mutableAttachTo.set(this._host.nativeElement);
        this._brnDialog.mutableCloseOnOutsidePointerEvents.set(true);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnPopoverTrigger, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnPopoverTrigger, isStandalone: true, selector: "button[brnPopoverTrigger],button[brnPopoverTriggerFor]", inputs: { brnPopoverTriggerFor: { classPropertyName: "brnPopoverTriggerFor", publicName: "brnPopoverTriggerFor", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "aria-haspopup": "dialog" }, properties: { "id": "id()", "attr.aria-expanded": "state() === 'open' ? 'true': 'false'", "attr.data-state": "state()", "attr.aria-controls": "dialogId", "type": "type()" } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnPopoverTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnPopoverTrigger],button[brnPopoverTriggerFor]',
                    host: {
                        '[id]': 'id()',
                        'aria-haspopup': 'dialog',
                        '[attr.aria-expanded]': "state() === 'open' ? 'true': 'false'",
                        '[attr.data-state]': 'state()',
                        '[attr.aria-controls]': 'dialogId',
                        '[type]': 'type()',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { brnPopoverTriggerFor: [{ type: i0.Input, args: [{ isSignal: true, alias: "brnPopoverTriggerFor", required: false }] }] } });

const BrnPopoverImports = [BrnPopover, BrnPopoverTrigger, BrnPopoverContent];

/**
 * Generated bundle index. Do not edit.
 */

export { BRN_POPOVER_DIALOG_DEFAULT_OPTIONS, BrnPopover, BrnPopoverContent, BrnPopoverImports, BrnPopoverTrigger, injectBrnPopoverConfig, provideBrnPopoverConfig };
//# sourceMappingURL=spartan-ng-brain-popover.mjs.map
