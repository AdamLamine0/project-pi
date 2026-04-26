import * as _angular_core from '@angular/core';
import { InjectionToken, Type, ExistingProvider, ValueProvider } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import * as _spartan_ng_brain_collapsible from '@spartan-ng/brain/collapsible';
import { MeasurementDisplay } from '@spartan-ng/brain/core';

type BrnCollapsibleState = 'open' | 'closed';
declare class BrnCollapsible {
    readonly contentId: _angular_core.WritableSignal<string>;
    /**
     * The expanded or collapsed state of the collapsible component.
     */
    readonly expanded: _angular_core.ModelSignal<boolean>;
    /**
     * The current state of the collapsible component as 'open' or 'closed'.
     */
    readonly state: _angular_core.Signal<BrnCollapsibleState>;
    /**
     * The disabled state of the collapsible component.
     */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, BooleanInput>;
    /**
     * Toggles the expanded state of the collapsible component.
     */
    toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrnCollapsible, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<BrnCollapsible, "[brnCollapsible],brn-collapsible", never, { "expanded": { "alias": "expanded"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "expanded": "expandedChange"; }, never, never, true, never>;
}

declare class BrnCollapsibleContent {
    private readonly _config;
    private readonly _elementRef;
    private readonly _destroyRef;
    private readonly _ngZone;
    private readonly _platformId;
    protected readonly _collapsible: _spartan_ng_brain_collapsible.BrnCollapsible | null;
    protected readonly _width: _angular_core.WritableSignal<number | null>;
    protected readonly _height: _angular_core.WritableSignal<number | null>;
    /**
     * The id of the collapsible content element.
     */
    readonly id: _angular_core.InputSignal<string | null | undefined>;
    constructor();
    private _measureAndSetDimensions;
    private _setupVisibilityObserver;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrnCollapsibleContent, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<BrnCollapsibleContent, "[brnCollapsibleContent],brn-collapsible-content", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class BrnCollapsibleTrigger {
    protected readonly _collapsible: _spartan_ng_brain_collapsible.BrnCollapsible | null;
    readonly type: _angular_core.InputSignal<"button" | "submit" | "reset">;
    constructor();
    toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrnCollapsibleTrigger, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<BrnCollapsibleTrigger, "button[brnCollapsibleTrigger]", never, { "type": { "alias": "type"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare const BrnCollapsibleToken: InjectionToken<BrnCollapsible>;
declare function injectBrnCollapsible(): BrnCollapsible | null;
declare function provideBrnCollapsible(collapsible: Type<BrnCollapsible>): ExistingProvider;
interface BrCollapsibleConfig {
    /**
     * The display style to use when measuring element dimensions.
     * @default 'block'
     */
    measurementDisplay: MeasurementDisplay;
}
declare function provideBrnCollapsibleConfig(config: Partial<BrCollapsibleConfig>): ValueProvider;
declare function injectBrnCollapsibleConfig(): BrCollapsibleConfig;

declare const BrnCollapsibleImports: readonly [typeof BrnCollapsible, typeof BrnCollapsibleTrigger, typeof BrnCollapsibleContent];

export { BrnCollapsible, BrnCollapsibleContent, BrnCollapsibleImports, BrnCollapsibleToken, BrnCollapsibleTrigger, injectBrnCollapsible, injectBrnCollapsibleConfig, provideBrnCollapsible, provideBrnCollapsibleConfig };
export type { BrCollapsibleConfig, BrnCollapsibleState };
