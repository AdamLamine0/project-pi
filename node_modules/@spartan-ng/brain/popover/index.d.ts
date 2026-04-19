import * as i0 from '@angular/core';
import { ValueProvider } from '@angular/core';
import { NumberInput } from '@angular/cdk/coercion';
import { BrnDialogDefaultOptions, BrnDialog, BrnDialogContent, BrnDialogTrigger } from '@spartan-ng/brain/dialog';

type BrnPopoverAlign = 'start' | 'center' | 'end';
interface BrnPopoverConfig {
    align: BrnPopoverAlign;
    sideOffset: number;
    offsetX: number;
}
declare function provideBrnPopoverConfig(config: Partial<BrnPopoverConfig>): ValueProvider;
declare function injectBrnPopoverConfig(): BrnPopoverConfig;

declare const BRN_POPOVER_DIALOG_DEFAULT_OPTIONS: Partial<BrnDialogDefaultOptions>;
declare class BrnPopover extends BrnDialog {
    private readonly _config;
    readonly align: i0.InputSignal<BrnPopoverAlign>;
    readonly sideOffset: i0.InputSignalWithTransform<number, NumberInput>;
    readonly offsetX: i0.InputSignalWithTransform<number, NumberInput>;
    private _positionStrategy?;
    constructor();
    private applySideOffset;
    private applyOffsetX;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrnPopover, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BrnPopover, "[brnPopover],brn-popover", ["brnPopover"], { "align": { "alias": "align"; "required": false; "isSignal": true; }; "sideOffset": { "alias": "sideOffset"; "required": false; "isSignal": true; }; "offsetX": { "alias": "offsetX"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class BrnPopoverContent<T> extends BrnDialogContent<T> {
    static ɵfac: i0.ɵɵFactoryDeclaration<BrnPopoverContent<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BrnPopoverContent<any>, "[brnPopoverContent]", never, {}, {}, never, never, true, never>;
}

declare class BrnPopoverTrigger extends BrnDialogTrigger {
    private readonly _host;
    readonly brnPopoverTriggerFor: i0.InputSignal<BrnPopover | undefined>;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<BrnPopoverTrigger, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BrnPopoverTrigger, "button[brnPopoverTrigger],button[brnPopoverTriggerFor]", never, { "brnPopoverTriggerFor": { "alias": "brnPopoverTriggerFor"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare const BrnPopoverImports: readonly [typeof BrnPopover, typeof BrnPopoverTrigger, typeof BrnPopoverContent];

export { BRN_POPOVER_DIALOG_DEFAULT_OPTIONS, BrnPopover, BrnPopoverContent, BrnPopoverImports, BrnPopoverTrigger, injectBrnPopoverConfig, provideBrnPopoverConfig };
export type { BrnPopoverAlign, BrnPopoverConfig };
