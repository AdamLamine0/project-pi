import { Injectable, effect, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class ThemeService {
    theme = signal(localStorage.getItem('theme') || 'light', ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const t = this.theme();
            localStorage.setItem('theme', t);
            const isDark = t === 'dark' ||
                (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (isDark) {
                document.documentElement.classList.add('dark');
            }
            else {
                document.documentElement.classList.remove('dark');
            }
        });
        // Listen for system preference changes when in system mode
        if (typeof window !== 'undefined') {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.theme() === 'system') {
                    this.theme.set('system'); // Trigger effect
                }
            });
        }
    }
    static ɵfac = function ThemeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ThemeService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ThemeService, factory: ThemeService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
