import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';

// Shared Components
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';

const MATERIAL_MODULES = [
  MatToolbarModule, MatButtonModule, MatIconModule,
  MatCardModule, MatInputModule, MatFormFieldModule,
  MatChipsModule, MatBadgeModule, MatMenuModule,
  MatListModule, MatDividerModule, MatProgressSpinnerModule,
  MatSnackBarModule, MatDialogModule, MatSelectModule,
  MatTabsModule, MatPaginatorModule, MatRadioModule
];

@NgModule({
  declarations: [
    // NavbarComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // NavbarComponent,
    // SidebarComponent,
    ...MATERIAL_MODULES
  ]
})
export class SharedModule { }