import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { STARTUP_CATALOG, StartupCatalogEntry } from '../../data/startup-catalog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { InvestmentRequestService } from '../../services/investment-request.service';
import { AuthService } from '../../../../../core/services/auth.service';

type Startup = StartupCatalogEntry;
@Component({
  selector: 'app-startup-list',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './startup-list.html',
  styleUrl: './startup-list.css',
})
export class StartupList implements OnInit {
  startups: Startup[] = STARTUP_CATALOG;
  investorRequests: any[] = [];
  investorId = '';
  loading = false;

  constructor(
    private router: Router,
    private requestService: InvestmentRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.investorId = this.resolveInvestorId();
    this.loadInvestorRequests();
  }

  requestInvestment(startup: Startup) {
    this.router.navigate(['/investment/request', startup.id], {
      queryParams: { name: startup.name },
    });
  }

  hasAlreadyRequested(startupId: string): boolean {
    return this.investorRequests.some(request => request.startupId === startupId);
  }

  private loadInvestorRequests(): void {
    this.loading = true;
    this.requestService.getByInvestor(this.investorId).subscribe({
      next: (requests) => {
        this.investorRequests = requests || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading investor requests:', err);
        this.investorRequests = [];
        this.loading = false;
      }
    });
  }

  private resolveInvestorId(): string {
    const userId = this.authService.getUserId();
    return userId > 0 ? String(userId) : 'dev-investor';
  }
}
