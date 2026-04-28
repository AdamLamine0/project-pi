import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { STARTUP_CATALOG, StartupCatalogEntry } from '../../data/startup-catalog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

type Startup = StartupCatalogEntry;
@Component({
  selector: 'app-startup-list',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './startup-list.html',
  styleUrl: './startup-list.css',
})
export class StartupList {
  startups: Startup[] = STARTUP_CATALOG;

  constructor(private router: Router) {}

  requestInvestment(startup: Startup) {
    this.router.navigate(['/investment/request', startup.id], {
      queryParams: { name: startup.name },
    });
  }
}
