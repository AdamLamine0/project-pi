import * as i0 from '@angular/core';
import { input, linkedSignal, effect, untracked, forwardRef, Directive, inject } from '@angular/core';
import * as i1 from '@spartan-ng/brain/dialog';
import { BrnDialog, BrnDialogClose, BrnDialogContent, BrnDialogDescription, BrnDialogOverlay, BrnDialogTitle, BrnDialogTrigger } from '@spartan-ng/brain/dialog';
import { provideExposesStateProviderExisting, provideExposedSideProviderExisting, provideCustomClassSettableExisting } from '@spartan-ng/brain/core';

class BrnSheet extends BrnDialog {
    /** Specifies the side of the screen where the sheet will appear. */
    side = input('top', ...(ngDevMode ? [{ debugName: "side" }] : []));
    sideState = linkedSignal(() => this.side(), ...(ngDevMode ? [{ debugName: "sideState" }] : []));
    constructor() {
        super();
        effect(() => {
            const side = this.sideState();
            untracked(() => {
                if (side === 'top') {
                    this.mutablePositionStrategy.set(this.positionBuilder.global().top());
                }
                if (side === 'bottom') {
                    this.mutablePositionStrategy.set(this.positionBuilder.global().bottom());
                }
                if (side === 'left') {
                    this.mutablePositionStrategy.set(this.positionBuilder.global().left());
                }
                if (side === 'right') {
                    this.mutablePositionStrategy.set(this.positionBuilder.global().right());
                }
            });
        });
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheet, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnSheet, isStandalone: true, selector: "[brnSheet],brn-sheet", inputs: { side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null } }, providers: [
            {
                provide: BrnDialog,
                useExisting: forwardRef((() => BrnSheet)),
            },
        ], exportAs: ["brnSheet"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheet, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnSheet],brn-sheet',
                    exportAs: 'brnSheet',
                    providers: [
                        {
                            provide: BrnDialog,
                            useExisting: forwardRef((() => BrnSheet)),
                        },
                    ],
                }]
        }], ctorParameters: () => [], propDecorators: { side: [{ type: i0.Input, args: [{ isSignal: true, alias: "side", required: false }] }] } });

class BrnSheetClose extends BrnDialogClose {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetClose, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnSheetClose, isStandalone: true, selector: "button[brnSheetClose]", usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetClose, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnSheetClose]',
                }]
        }] });

class BrnSheetContent extends BrnDialogContent {
    side = inject(BrnSheet).sideState;
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnSheetContent, isStandalone: true, selector: "[brnSheetContent]", providers: [
            provideExposesStateProviderExisting((() => BrnSheetContent)),
            provideExposedSideProviderExisting((() => BrnSheetContent)),
        ], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnSheetContent]',
                    providers: [
                        provideExposesStateProviderExisting((() => BrnSheetContent)),
                        provideExposedSideProviderExisting((() => BrnSheetContent)),
                    ],
                }]
        }] });

class BrnSheetDescription {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetDescription, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnSheetDescription, isStandalone: true, selector: "[brnSheetDescription]", hostDirectives: [{ directive: i1.BrnDialogDescription }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetDescription, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnSheetDescription]',
                    hostDirectives: [BrnDialogDescription],
                }]
        }] });

class BrnSheetOverlay extends BrnDialogOverlay {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetOverlay, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnSheetOverlay, isStandalone: true, selector: "[brnSheetOverlay],brn-sheet-overlay", providers: [provideCustomClassSettableExisting((() => BrnSheetOverlay))], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetOverlay, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnSheetOverlay],brn-sheet-overlay',
                    providers: [provideCustomClassSettableExisting((() => BrnSheetOverlay))],
                }]
        }] });

class BrnSheetTitle {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetTitle, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: BrnSheetTitle, isStandalone: true, selector: "[brnSheetTitle]", hostDirectives: [{ directive: i1.BrnDialogTitle }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[brnSheetTitle]',
                    hostDirectives: [BrnDialogTitle],
                }]
        }] });

class BrnSheetTrigger extends BrnDialogTrigger {
    _sheet = inject(BrnSheet, { optional: true });
    /** Override the side from where the sheet appears for this trigger. */
    side = input(undefined, ...(ngDevMode ? [{ debugName: "side" }] : []));
    open() {
        const side = this.side();
        if (this._sheet && side) {
            this._sheet.sideState.set(side);
        }
        super.open();
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetTrigger, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.17", type: BrnSheetTrigger, isStandalone: true, selector: "button[brnSheetTrigger]", inputs: { side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnSheetTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[brnSheetTrigger]',
                }]
        }], propDecorators: { side: [{ type: i0.Input, args: [{ isSignal: true, alias: "side", required: false }] }] } });

const BrnSheetImports = [
    BrnSheet,
    BrnSheetOverlay,
    BrnSheetTrigger,
    BrnSheetClose,
    BrnSheetContent,
    BrnSheetTitle,
    BrnSheetDescription,
];

/**
 * Generated bundle index. Do not edit.
 */

export { BrnSheet, BrnSheetClose, BrnSheetContent, BrnSheetDescription, BrnSheetImports, BrnSheetOverlay, BrnSheetTitle, BrnSheetTrigger };
//# sourceMappingURL=spartan-ng-brain-sheet.mjs.map
