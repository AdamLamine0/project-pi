import { Directive } from '@angular/core';
import { BrnProgress } from '@spartan-ng/brain/progress';
import { classes } from '@spartan-ng/helm/utils';
import * as i0 from "@angular/core";
import * as i1 from "@spartan-ng/brain/progress";
export class HlmProgress {
    constructor() {
        classes(() => 'bg-primary/20 relative inline-flex h-2 w-full overflow-hidden rounded-full');
    }
    static ɵfac = function HlmProgress_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HlmProgress)(); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: HlmProgress, selectors: [["hlm-progress"], ["", "hlmProgress", ""]], features: [i0.ɵɵHostDirectivesFeature([{ directive: i1.BrnProgress, inputs: ["value", "value", "max", "max", "getValueLabel", "getValueLabel"] }])] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HlmProgress, [{
        type: Directive,
        args: [{
                selector: 'hlm-progress,[hlmProgress]',
                hostDirectives: [{ directive: BrnProgress, inputs: ['value', 'max', 'getValueLabel'] }],
            }]
    }], () => [], null); })();
