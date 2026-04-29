import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BMCData {
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valueProposition: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

@Component({
  selector: 'app-bmc-view',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bmc-grid w-full text-xs" id="bmc-export">
  <div class="grid grid-cols-5 gap-1 min-h-[400px]">
    <!-- Key Partners -->
    <div class="bmc-cell bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-3 row-span-2">
      <div class="font-bold text-purple-700 dark:text-purple-300 mb-2 text-xs uppercase tracking-wide">🤝 Key Partners</div>
      <ul class="space-y-1">
        <li *ngFor="let item of data.keyPartners" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
    <!-- Key Activities -->
    <div class="bmc-cell bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
      <div class="font-bold text-blue-700 dark:text-blue-300 mb-2 text-xs uppercase tracking-wide">⚡ Key Activities</div>
      <ul class="space-y-1">
        <li *ngFor="let item of data.keyActivities" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
    <!-- Value Proposition (spans 2 rows) -->
    <div class="bmc-cell bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-3 row-span-2 col-span-1">
      <div class="font-bold text-yellow-700 dark:text-yellow-300 mb-2 text-xs uppercase tracking-wide">💡 Value Proposition</div>
      <ul class="space-y-1">
        <li *ngFor="let item of data.valueProposition" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
    <!-- Customer Relationships -->
    <div class="bmc-cell bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
      <div class="font-bold text-green-700 dark:text-green-300 mb-2 text-xs uppercase tracking-wide">💬 Customer Relationships</div>
      <ul class="space-y-1">
        <li *ngFor="let item of data.customerRelationships" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
    <!-- Customer Segments (spans 2 rows) -->
    <div class="bmc-cell bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3 row-span-2">
      <div class="font-bold text-orange-700 dark:text-orange-300 mb-2 text-xs uppercase tracking-wide">👥 Customer Segments</div>
      <ul class="space-y-1">
        <li *ngFor="let item of data.customerSegments" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
    <!-- Key Resources -->
    <div class="bmc-cell bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
      <div class="font-bold text-blue-700 dark:text-blue-300 mb-2 text-xs uppercase tracking-wide">🔧 Key Resources</div>
      <ul class="space-y-1">
        <li *ngFor="let item of data.keyResources" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
    <!-- Channels -->
    <div class="bmc-cell bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
      <div class="font-bold text-green-700 dark:text-green-300 mb-2 text-xs uppercase tracking-wide">📢 Channels</div>
      <ul class="space-y-1">
        <li *ngFor="let item of data.channels" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
  </div>
  <!-- Bottom row -->
  <div class="grid grid-cols-2 gap-1 mt-1">
    <div class="bmc-cell bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3">
      <div class="font-bold text-red-700 dark:text-red-300 mb-2 text-xs uppercase tracking-wide">💸 Cost Structure</div>
      <ul class="space-y-1 flex flex-wrap gap-x-4">
        <li *ngFor="let item of data.costStructure" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
    <div class="bmc-cell bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3">
      <div class="font-bold text-emerald-700 dark:text-emerald-300 mb-2 text-xs uppercase tracking-wide">💰 Revenue Streams</div>
      <ul class="space-y-1 flex flex-wrap gap-x-4">
        <li *ngFor="let item of data.revenueStreams" class="text-gray-700 dark:text-gray-300">• {{ item }}</li>
      </ul>
    </div>
  </div>
</div>
  `
})
export class BmcViewComponent {
  @Input() data!: BMCData;
}
