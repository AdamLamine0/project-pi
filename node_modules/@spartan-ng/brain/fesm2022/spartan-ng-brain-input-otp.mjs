import * as i0 from '@angular/core';
import { InjectionToken, inject, forwardRef, signal, input, booleanAttribute, linkedSignal, numberAttribute, model, output, computed, viewChild, afterNextRender, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

const BrnInputOtpToken = new InjectionToken('BrnInputOtpToken');
function injectBrnInputOtp() {
    return inject(BrnInputOtpToken);
}
function provideBrnInputOtp(inputOtp) {
    return { provide: BrnInputOtpToken, useExisting: inputOtp };
}

const BRN_INPUT_OTP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BrnInputOtp),
    multi: true,
};
class BrnInputOtp {
    static _id = 0;
    /** Whether the input has focus. */
    _focused = signal(false, ...(ngDevMode ? [{ debugName: "_focused" }] : []));
    /** Styles applied to the host element. */
    hostStyles = input('position: relative; cursor: text; user-select: none; pointer-events: none;', ...(ngDevMode ? [{ debugName: "hostStyles" }] : []));
    /** Custom id applied to the input element */
    inputId = input(`brn-input-otp-${++BrnInputOtp._id}`, ...(ngDevMode ? [{ debugName: "inputId" }] : []));
    /** Custom autocomplete attribute applied to the input element */
    inputAutocomplete = input('one-time-code', ...(ngDevMode ? [{ debugName: "inputAutocomplete" }] : []));
    /** Styles applied to the input element to make it invisible and clickable. */
    inputStyles = input('position: absolute; inset: 0; width: 100%; height: 100%; display: flex; textAlign: left; opacity: 1; color: transparent; pointerEvents: all; background: transparent; caret-color: transparent; border: 0px solid transparent; outline: transparent solid 0px; box-shadow: none; line-height: 1; letter-spacing: -0.5em; font-family: monospace; font-variant-numeric: tabular-nums;', ...(ngDevMode ? [{ debugName: "inputStyles" }] : []));
    /** Styles applied to the container element. */
    containerStyles = input('position: absolute; inset: 0; pointer-events: none;', ...(ngDevMode ? [{ debugName: "containerStyles" }] : []));
    /** Determine if the date picker is disabled. */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", transform: booleanAttribute }] : [{
            transform: booleanAttribute,
        }]));
    _disabled = linkedSignal(this.disabled, ...(ngDevMode ? [{ debugName: "_disabled" }] : []));
    /** The number of slots. */
    maxLength = input.required(...(ngDevMode ? [{ debugName: "maxLength", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Virtual keyboard appearance on mobile */
    inputMode = input('numeric', ...(ngDevMode ? [{ debugName: "inputMode" }] : []));
    inputClass = input('', ...(ngDevMode ? [{ debugName: "inputClass" }] : []));
    /** If true, the element is focused automatically on init **/
    autofocus = input(false, ...(ngDevMode ? [{ debugName: "autofocus", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /**
     * Defines how the pasted text should be transformed before saving to model/form.
     * Allows pasting text which contains extra characters like spaces, dashes, etc. and are longer than the maxLength.
     *
     * "XXX-XXX": (pastedText) => pastedText.replaceAll('-', '')
     * "XXX XXX": (pastedText) => pastedText.replaceAll(/\s+/g, '')
     */
    transformPaste = input((text) => text, ...(ngDevMode ? [{ debugName: "transformPaste" }] : []));
    /** The value controlling the input */
    value = model(null, ...(ngDevMode ? [{ debugName: "value" }] : []));
    /** Emits when the value changes. */
    valueChange = output();
    context = computed(() => {
        const value = this.value() ?? '';
        const focused = this._focused();
        const maxLength = this.maxLength();
        const slots = Array.from({ length: this.maxLength() }).map((_, slotIndex) => {
            const char = value[slotIndex] !== undefined ? value[slotIndex] : null;
            const isActive = focused && (value.length === slotIndex || (value.length === maxLength && slotIndex === maxLength - 1));
            return {
                char,
                isActive,
                hasFakeCaret: isActive && value.length === slotIndex,
            };
        });
        return slots;
    }, ...(ngDevMode ? [{ debugName: "context" }] : []));
    /** Emitted when the input is complete, triggered through input or paste.  */
    completed = output();
    _onChange;
    _onTouched;
    _inputComponentRef = viewChild.required('otpInput');
    constructor() {
        afterNextRender(() => {
            if (this.autofocus()) {
                this._inputComponentRef().nativeElement.focus();
            }
        });
    }
    onInputChange(event) {
        let newValue = event.target.value;
        const maxLength = this.maxLength();
        if (newValue.length > maxLength) {
            // Replace the last character when max length is exceeded
            newValue = newValue.slice(0, maxLength - 1) + newValue.slice(-1);
        }
        this.updateValue(newValue, maxLength);
    }
    onPaste(event) {
        event.preventDefault();
        const clipboardData = event.clipboardData?.getData('text/plain') || '';
        const maxLength = this.maxLength();
        const content = this.transformPaste()(clipboardData, maxLength);
        const newValue = content.slice(0, maxLength);
        this.updateValue(newValue, maxLength);
    }
    /** CONTROL VALUE ACCESSOR */
    writeValue(value) {
        this.value.set(value);
        if (value?.length === this.maxLength()) {
            this.completed.emit(value ?? '');
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
    isCompleted(newValue, previousValue, maxLength) {
        return newValue !== previousValue && previousValue.length < maxLength && newValue.length === maxLength;
    }
    updateValue(newValue, maxLength) {
        const previousValue = this.value() ?? '';
        this.value.set(newValue);
        this._onChange?.(newValue);
        if (this.isCompleted(newValue, previousValue, maxLength)) {
            this.completed.emit(newValue);
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnInputOtp, deps: [], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.17", type: BrnInputOtp, isStandalone: true, selector: "brn-input-otp", inputs: { hostStyles: { classPropertyName: "hostStyles", publicName: "hostStyles", isSignal: true, isRequired: false, transformFunction: null }, inputId: { classPropertyName: "inputId", publicName: "inputId", isSignal: true, isRequired: false, transformFunction: null }, inputAutocomplete: { classPropertyName: "inputAutocomplete", publicName: "inputAutocomplete", isSignal: true, isRequired: false, transformFunction: null }, inputStyles: { classPropertyName: "inputStyles", publicName: "inputStyles", isSignal: true, isRequired: false, transformFunction: null }, containerStyles: { classPropertyName: "containerStyles", publicName: "containerStyles", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, maxLength: { classPropertyName: "maxLength", publicName: "maxLength", isSignal: true, isRequired: true, transformFunction: null }, inputMode: { classPropertyName: "inputMode", publicName: "inputMode", isSignal: true, isRequired: false, transformFunction: null }, inputClass: { classPropertyName: "inputClass", publicName: "inputClass", isSignal: true, isRequired: false, transformFunction: null }, autofocus: { classPropertyName: "autofocus", publicName: "autofocus", isSignal: true, isRequired: false, transformFunction: null }, transformPaste: { classPropertyName: "transformPaste", publicName: "transformPaste", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange", valueChange: "valueChange", completed: "completed" }, host: { attributes: { "data-input-otp-container": "true" }, properties: { "style": "hostStyles()" } }, providers: [BRN_INPUT_OTP_VALUE_ACCESSOR, provideBrnInputOtp(BrnInputOtp)], viewQueries: [{ propertyName: "_inputComponentRef", first: true, predicate: ["otpInput"], descendants: true, isSignal: true }], ngImport: i0, template: `
		<ng-content />
		<div [style]="containerStyles()">
			<input
				#otpInput
				[id]="inputId()"
				[class]="inputClass()"
				[autocomplete]="inputAutocomplete()"
				data-slot="input-otp"
				[style]="inputStyles()"
				[disabled]="_disabled()"
				[inputMode]="inputMode()"
				[ngModel]="value()"
				(input)="onInputChange($event)"
				(paste)="onPaste($event)"
				(focus)="_focused.set(true)"
				(blur)="_focused.set(false)"
			/>
		</div>
	`, isInline: true, dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnInputOtp, decorators: [{
            type: Component,
            args: [{
                    selector: 'brn-input-otp',
                    imports: [FormsModule],
                    providers: [BRN_INPUT_OTP_VALUE_ACCESSOR, provideBrnInputOtp(BrnInputOtp)],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[style]': 'hostStyles()',
                        'data-input-otp-container': 'true',
                    },
                    template: `
		<ng-content />
		<div [style]="containerStyles()">
			<input
				#otpInput
				[id]="inputId()"
				[class]="inputClass()"
				[autocomplete]="inputAutocomplete()"
				data-slot="input-otp"
				[style]="inputStyles()"
				[disabled]="_disabled()"
				[inputMode]="inputMode()"
				[ngModel]="value()"
				(input)="onInputChange($event)"
				(paste)="onPaste($event)"
				(focus)="_focused.set(true)"
				(blur)="_focused.set(false)"
			/>
		</div>
	`,
                }]
        }], ctorParameters: () => [], propDecorators: { hostStyles: [{ type: i0.Input, args: [{ isSignal: true, alias: "hostStyles", required: false }] }], inputId: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputId", required: false }] }], inputAutocomplete: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputAutocomplete", required: false }] }], inputStyles: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputStyles", required: false }] }], containerStyles: [{ type: i0.Input, args: [{ isSignal: true, alias: "containerStyles", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], maxLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxLength", required: true }] }], inputMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputMode", required: false }] }], inputClass: [{ type: i0.Input, args: [{ isSignal: true, alias: "inputClass", required: false }] }], autofocus: [{ type: i0.Input, args: [{ isSignal: true, alias: "autofocus", required: false }] }], transformPaste: [{ type: i0.Input, args: [{ isSignal: true, alias: "transformPaste", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: i0.Output, args: ["valueChange"] }], valueChange: [{ type: i0.Output, args: ["valueChange"] }], completed: [{ type: i0.Output, args: ["completed"] }], _inputComponentRef: [{ type: i0.ViewChild, args: ['otpInput', { isSignal: true }] }] } });

class BrnInputOtpSlot {
    /** Access the input-otp component */
    _inputOtp = injectBrnInputOtp();
    /** The index of the slot to render the char or a fake caret */
    index = input.required(...(ngDevMode ? [{ debugName: "index", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    _slot = computed(() => this._inputOtp.context()[this.index()], ...(ngDevMode ? [{ debugName: "_slot" }] : []));
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnInputOtpSlot, deps: [], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.17", type: BrnInputOtpSlot, isStandalone: true, selector: "brn-input-otp-slot", inputs: { index: { classPropertyName: "index", publicName: "index", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "attr.data-active": "_slot().isActive" } }, ngImport: i0, template: `
		{{ _slot().char }}

		@if (_slot().hasFakeCaret) {
			<ng-content />
		}
	`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: BrnInputOtpSlot, decorators: [{
            type: Component,
            args: [{
                    selector: 'brn-input-otp-slot',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[attr.data-active]': '_slot().isActive',
                    },
                    template: `
		{{ _slot().char }}

		@if (_slot().hasFakeCaret) {
			<ng-content />
		}
	`,
                }]
        }], propDecorators: { index: [{ type: i0.Input, args: [{ isSignal: true, alias: "index", required: true }] }] } });

const BrnInputOtpImports = [BrnInputOtp, BrnInputOtpSlot];

/**
 * Generated bundle index. Do not edit.
 */

export { BRN_INPUT_OTP_VALUE_ACCESSOR, BrnInputOtp, BrnInputOtpImports, BrnInputOtpSlot };
//# sourceMappingURL=spartan-ng-brain-input-otp.mjs.map
