import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBan, lucideBadgeCheck, lucideEye, lucidePenLine, lucideShield } from '@ng-icons/lucide';

@Component({
  selector: 'app-nda',
  imports: [MatCardModule, MatButtonModule, NgIconComponent],
  providers: [provideIcons({ lucideBan, lucideBadgeCheck, lucideEye, lucidePenLine, lucideShield })],
  templateUrl: './nda.component.html',
  styleUrls: ['./nda.component.css'],
})
export class NdaComponent {
  @Input() busy = false;
  @Output() sign = new EventEmitter<void>();
}
