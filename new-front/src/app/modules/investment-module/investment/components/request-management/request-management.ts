import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { InvestmentRequestService } from '../../services/investment-request.service';
import { InvestmentRequest } from '../../models/investment-request';
import { AuthService } from '../../../../../core/services/auth.service';
import {
  STARTUP_CATALOG_BY_ID,
  getStartupByEntrepreneurId
} from '../../data/startup-catalog';

type RequestStatusFilter = 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED';
type RequestViewMode = 'INVESTOR' | 'STARTUP';

@Component({
  selector: 'app-request-management',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatInputModule, MatTableModule, MatSelectModule],
  templateUrl: './request-management.html',
  styleUrl: './request-management.css',
})
export class RequestManagement implements OnInit {
  requests: InvestmentRequest[] = [];
  selectedStatus: RequestStatusFilter = 'ALL';
  query = '';
  investorId = '';
  startupId = '';
  viewMode: RequestViewMode = 'INVESTOR';

  readonly STATUS_LABELS: Record<string, string> = {
    PENDING: 'Pending',
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected',
  };

  readonly statusFilters: { value: RequestStatusFilter; label: string }[] = [
    { value: 'ALL', label: 'All' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'REJECTED', label: 'Rejected' },
  ];

  constructor(
    private requestService: InvestmentRequestService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.viewMode = this.authService.hasRole('ENTREPRENEUR') ? 'STARTUP' : 'INVESTOR';
    this.investorId = this.resolveInvestorId();
    this.startupId = this.resolveStartupId();
    this.loadRequests();
  }

  loadRequests(): void {
    const request$ = this.isStartupView
      ? this.requestService.getByStartup(this.startupId)
      : this.requestService.getByInvestor(this.investorId);

    request$.subscribe({
      next: (data) => {
        this.requests = this.sortRequests(data || []);
      },
      error: (err) => {
        console.error(err);
        this.requests = [];
      }
    });
  }

  get isInvestorView(): boolean {
    return this.viewMode === 'INVESTOR';
  }

  get isStartupView(): boolean {
    return this.viewMode === 'STARTUP';
  }

  get pageTitle(): string {
    return this.isStartupView ? 'Received investment requests' : 'Sent investment requests';
  }

  get pageSubtitle(): string {
    return this.isStartupView
      ? 'Review investor interest, read request details, and accept or reject pending requests.'
      : 'Track every request you sent, review its status, and update pending request details.';
  }

  get emptyTitle(): string {
    return this.isStartupView ? 'No received requests' : 'No sent requests';
  }

  get emptySubtitle(): string {
    return this.isStartupView
      ? 'Incoming investor requests for your startup will appear here.'
      : 'Your investment requests will appear here after you send them.';
  }

  get filteredRequests(): InvestmentRequest[] {
    const query = this.query.trim().toLowerCase();

    return this.requests.filter((req) => {
      const statusMatch =
        this.selectedStatus === 'ALL' || req.investmentStatus === this.selectedStatus;

      const textMatch =
        !query ||
        req.investorId.toLowerCase().includes(query) ||
        req.startupId.toLowerCase().includes(query) ||
        this.startupName(req.startupId).toLowerCase().includes(query) ||
        (req.introMessage ?? '').toLowerCase().includes(query);

      return statusMatch && textMatch;
    });
  }

  get pendingCount(): number {
    return this.requests.filter((req) => req.investmentStatus === 'PENDING').length;
  }

  get acceptedCount(): number {
    return this.requests.filter((req) => req.investmentStatus === 'ACCEPTED').length;
  }

  get rejectedCount(): number {
    return this.requests.filter((req) => req.investmentStatus === 'REJECTED').length;
  }

  accept(id: string): void {
    if (!this.isStartupView) return;
    this.requestService.acceptRequest(id).subscribe({
      next: () => {
        this.updateStatus(id, 'ACCEPTED');
      },
      error: (err) => console.error(err)
    });
  }

  reject(id: string): void {
    if (!this.isStartupView) return;
    this.requestService.rejectRequest(id).subscribe({
      next: () => {
        this.updateStatus(id, 'REJECTED');
      },
      error: (err) => console.error(err)
    });
  }

  setStatusFilter(status: RequestStatusFilter): void {
    this.selectedStatus = status;
  }

  clearFilters(): void {
    this.selectedStatus = 'ALL';
    this.query = '';
  }

  download(req: InvestmentRequest): void {
    console.log('Download called for request:', req.id);
    console.log('Document URL:', req.investorDocUrl);
    
    if (req.investorDocUrl) {
      this.requestService.downloadDocument(req.investorDocUrl).subscribe({
        next: (blob: Blob) => {
          console.log('Document downloaded successfully, blob size:', blob.size);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `document-${req.id}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error downloading document:', err);
          console.error('Error status:', err.status);
          console.error('Error message:', err.message);
          console.error('Full error:', err);
          alert('Failed to download document. Please try again.');
        }
      });
    } else {
      console.warn('No document URL available for request:', req.id);
      alert('No document available for this request.');
    }
  }

  update(id: string): void {
    if (!this.isInvestorView) return;
    this.router.navigate(['/investment/edit-request', id]);
  }

  reRequest(req: InvestmentRequest): void {
    if (!this.isInvestorView) return;
    this.router.navigate(['/investment/request', req.startupId], {
      queryParams: { name: this.startupName(req.startupId) },
    });
  }

  viewInKanban(_: string): void {
    this.router.navigate(['/investment/kanban']);
  }

  getStatusLabel(s: string): string {
    return this.STATUS_LABELS[s] ?? s;
  }

  getInitials(name: string): string {
    return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  }

  startupName(startupId: string): string {
    return STARTUP_CATALOG_BY_ID[startupId]?.name ?? startupId;
  }

  startupSector(startupId: string): string {
    return STARTUP_CATALOG_BY_ID[startupId]?.sector ?? 'Unknown sector';
  }

  trackById(_: number, req: InvestmentRequest): string {
    return req.id;
  }

  private updateStatus(id: string, status: 'ACCEPTED' | 'REJECTED') {
    const req = this.requests.find((r) => r.id === id);
    if (req) {
      req.investmentStatus = status;
    }
    this.requests = this.sortRequests(this.requests);
  }

  private sortRequests(requests: InvestmentRequest[]): InvestmentRequest[] {
    return [...requests].sort((a, b) => {
      const at = new Date(a.sentAt).getTime();
      const bt = new Date(b.sentAt).getTime();
      return bt - at;
    });
  }

  private resolveInvestorId(): string {
    const userId = this.authService.getUserId();
    return userId > 0 ? String(userId) : 'dev-investor';
  }

  private resolveStartupId(): string {
  const stored = this.safeStorageGet('investment.startup.id');
  if (stored) return stored;

  const userId = this.authService.getUserId();

  if (userId > 0) {
    const startup = getStartupByEntrepreneurId(String(userId));
    return startup ? startup.id : 's-001';
  }

  return 's-001';
}

  private safeStorageGet(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  }
}
