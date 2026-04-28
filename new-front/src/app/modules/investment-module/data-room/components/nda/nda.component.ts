import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nda',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './nda.component.html',
  styleUrls: ['./nda.component.css'],
})
export class NdaComponent {
  @Input() busy = false;
  @Output() sign = new EventEmitter<void>();
}
