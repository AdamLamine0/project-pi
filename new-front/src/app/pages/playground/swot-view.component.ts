import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

@Component({
  selector: 'app-swot-view',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="grid grid-cols-2 gap-2 w-full" id="swot-export">
  <div class="bg-green-50 dark:bg-green-900/20 border-2 border-green-400 rounded-xl p-4">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">💪</span>
      <h3 class="font-bold text-green-700 dark:text-green-300 uppercase tracking-wide text-sm">Strengths</h3>
    </div>
    <ul class="space-y-2">
      <li *ngFor="let item of data.strengths" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
        <span class="text-green-500 mt-0.5">✓</span>{{ item }}
      </li>
    </ul>
  </div>
  <div class="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 rounded-xl p-4">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">⚠️</span>
      <h3 class="font-bold text-red-700 dark:text-red-300 uppercase tracking-wide text-sm">Weaknesses</h3>
    </div>
    <ul class="space-y-2">
      <li *ngFor="let item of data.weaknesses" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
        <span class="text-red-500 mt-0.5">✗</span>{{ item }}
      </li>
    </ul>
  </div>
  <div class="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-400 rounded-xl p-4">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">🚀</span>
      <h3 class="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide text-sm">Opportunities</h3>
    </div>
    <ul class="space-y-2">
      <li *ngFor="let item of data.opportunities" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
        <span class="text-blue-500 mt-0.5">→</span>{{ item }}
      </li>
    </ul>
  </div>
  <div class="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-400 rounded-xl p-4">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-2xl">🔥</span>
      <h3 class="font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wide text-sm">Threats</h3>
    </div>
    <ul class="space-y-2">
      <li *ngFor="let item of data.threats" class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
        <span class="text-orange-500 mt-0.5">!</span>{{ item }}
      </li>
    </ul>
  </div>
</div>
  `
})
export class SwotViewComponent {
  @Input() data!: SWOTData;
}
