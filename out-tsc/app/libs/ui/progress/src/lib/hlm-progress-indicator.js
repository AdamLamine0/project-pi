import { Directive, computed } from '@angular/core';
import { BrnProgressIndicator, injectBrnProgress } from '@spartan-ng/brain/progress';
import { classes } from '@spartan-ng/helm/utils';
import * as i0 from "@angular/core";
import * as i1 from "@spartan-ng/brain/progress";
export class HlmProgressIndicator {
    _progress = injectBrnProgress();
    _transform = computed(() => `translateX(-${100 - (this._progress.value() ?? 100)}%)`, ...(ngDevMode ? [{ debugName: "_transform" }] : /* istanbul ignore next */ []));
    _indeterminate = computed(() => this._progress.value() === null || this._progress.value() === undefined, ...(ngDevMode ? [{ debugName: "_indeterminate" }] : /* istanbul ignore next */ []));
    constructor() {
        classes(() => 'bg-primary h-full w-full flex-1 transition-all');
    }
    static ɵfac = function HlmProgressIndicator_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HlmProgressIndicator)(); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: HlmProgressIndicator, selectors: [["", "hlmProgressIndicator", ""], ["hlm-progress-indicator"]], hostVars: 4, hostBindings: function HlmProgressIndicator_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵstyleProp("transform", ctx._transform());
            i0.ɵɵclassProp("animate-indeterminate", ctx._indeterminate());
        } }, features: [i0.ɵɵHostDirectivesFeature([i1.BrnProgressIndicator])] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HlmProgressIndicator, [{
        type: Directive,
        args: [{
                selector: '[hlmProgressIndicator],hlm-progress-indicator',
                hostDirectives: [BrnProgressIndicator],
                host: {
                    '[class.animate-indeterminate]': '_indeterminate()',
                    '[style.transform]': '_transform()',
                },
            }]
    }], () => [], null); })();
