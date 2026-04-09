import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../../services/certificate.service';
import { VerificationResponse } from '../../models/certificate';

@Component({
  selector: 'app-verify-certificate',
  templateUrl: './verify-certificate.component.html',
  styleUrls: ['./verify-certificate.component.css']
})
export class VerifyCertificateComponent implements OnInit {

  result: VerificationResponse | null = null;
  loading = true;
  token = '';

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    if (this.token) {
      this.certificateService.verify(this.token).subscribe({
        next: (res) => { this.result = res; this.loading = false; },
        error: () => {
          this.result = { valid: false, recipientName: null, eventTitle: null,
                          eventDate: null, generatedAt: null,
                          message: 'Erreur lors de la vérification.' };
          this.loading = false;
        }
      });
    }
  }

  formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('fr-TN', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }
}