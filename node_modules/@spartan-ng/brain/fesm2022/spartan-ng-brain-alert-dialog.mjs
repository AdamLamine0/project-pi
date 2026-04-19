import * as i0 from '@angular/core';
import { forwardRef, Directive, input, effect, untracked } from '@angular/core';
import * as i1 from '@spartan-ng/brain/dialog';
import { BrnDialog, provideBrnDialogDefaultOptions, BrnDialogContent, BrnDialogDescription, BrnDialogOverlay, BrnDialogTitle, BrnDialogTrigger } from '@spartan-ng/brain/dialog';
import { provideExposesStateProviderExisting, provideCustomClassSettableExisting } from '@spartan-ng/brain/core';

const BRN_ALERT_DIALOG_DEFAULT_OPTIONS = {
    closeOnBackdropClick: false,
    closeOnOutsidePointerEvents: false,
    role: 'alertdialog',
};
class BrnAlertDialog extends BrnDialog {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialog, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnAlertDialog, isStandalone: true, selector: "[brnAlertDialog],brn-alert-dialog", providers: [
            {
                provide: BrnDialog,
                useExisting: forwardRef((() => BrnAlertDialog)),
            },
            provideBrnDialogDefaultOptions(BRN_ALERT_DIALOG_DEFAULT_OPTIONS),
        ], exportAs: ["brnAlertDialog"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialog, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnAlertDialog],brn-alert-dialog',
                    exportAs: 'brnAlertDialog',
                    providers: [
                        {
                            provide: BrnDialog,
                            useExisting: forwardRef((() => BrnAlertDialog)),
                        },
                        provideBrnDialogDefaultOptions(BRN_ALERT_DIALOG_DEFAULT_OPTIONS),
                    ],
                }]
        }] });

class BrnAlertDialogContent extends BrnDialogContent {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnAlertDialogContent, isStandalone: true, selector: "[brnAlertDialogContent]", providers: [provideExposesStateProviderExisting((() => BrnAlertDialogContent))], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnAlertDialogContent]',
                    providers: [provideExposesStateProviderExisting((() => BrnAlertDialogContent))],
                }]
        }] });

class BrnAlertDialogDescription {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogDescription, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnAlertDialogDescription, isStandalone: true, selector: "[brnAlertDialogDescription]", hostDirectives: [{ directive: i1.BrnDialogDescription }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogDescription, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnAlertDialogDescription]',
                    hostDirectives: [BrnDialogDescription],
                }]
        }] });

class BrnAlertDialogOverlay extends BrnDialogOverlay {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogOverlay, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnAlertDialogOverlay, isStandalone: true, selector: "[brnAlertDialogOverlay],brn-alert-dialog-overlay", providers: [provideCustomClassSettableExisting((() => BrnAlertDialogOverlay))], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogOverlay, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnAlertDialogOverlay],brn-alert-dialog-overlay',
                    providers: [provideCustomClassSettableExisting((() => BrnAlertDialogOverlay))],
                }]
        }] });

class BrnAlertDialogTitle {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogTitle, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnAlertDialogTitle, isStandalone: true, selector: "[brnAlertDialogTitle]", hostDirectives: [{ directive: i1.BrnDialogTitle }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnAlertDialogTitle]',
                    hostDirectives: [BrnDialogTitle],
                }]
        }] });

class BrnAlertDialogTrigger extends BrnDialogTrigger {
    brnAlertDialogTriggerFor = input(...(ngDevMode ? [undefined, { debugName: "brnAlertDialogTriggerFor" }] : []));
    constructor() {
        super();
        effect(() => {
            const brnDialog = this.brnAlertDialogTriggerFor();
            untracked(() => {
                if (brnDialog) {
                    this.mutableBrnDialogTriggerFor().set(brnDialog);
                }
            });
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogTrigger, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnAlertDialogTrigger, isStandalone: true, selector: "button[brnAlertDialogTrigger],button[brnAlertDialogTriggerFor]", inputs: { brnAlertDialogTriggerFor: { classPropertyName: "brnAlertDialogTriggerFor", publicName: "brnAlertDialogTriggerFor", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "aria-haspopup": "dialog" }, properties: { "id": "id()", "attr.aria-expanded": "state() === 'open' ? 'true': 'false'", "attr.data-state": "state()", "attr.aria-controls": "dialogId", "type": "type()" } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnAlertDialogTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnAlertDialogTrigger],button[brnAlertDialogTriggerFor]',
                    host: {
                        '[id]': 'id()',
                        'aria-haspopup': 'dialog',
                        '[attr.aria-expanded]': "state() === 'open' ? 'true': 'false'",
                        '[attr.data-state]': 'state()',
                        '[attr.aria-controls]': 'dialogId',
                        '[type]': 'type()',
                    },
                }]
        }], ctorParameters: () => [], propDecorators: { brnAlertDialogTriggerFor: [{ type: i0.Input, args: [{ isSignal: true, alias: "brnAlertDialogTriggerFor", required: false }] }] } });

const BrnAlertDialogImports = [
    BrnAlertDialog,
    BrnAlertDialogOverlay,
    BrnAlertDialogTrigger,
    BrnAlertDialogContent,
    BrnAlertDialogTitle,
    BrnAlertDialogDescription,
];

/**
 * Generated bundle index. Do not edit.
 */

export { BRN_ALERT_DIALOG_DEFAULT_OPTIONS, BrnAlertDialog, BrnAlertDialogContent, BrnAlertDialogDescription, BrnAlertDialogImports, BrnAlertDialogOverlay, BrnAlertDialogTitle, BrnAlertDialogTrigger };
//# sourceMappingURL=spartan-ng-brain-alert-dialog.mjs.map
