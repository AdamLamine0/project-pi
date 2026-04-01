import { Component, OnInit } from '@angular/core';
import { ReputationService } from '../../services/reputation.service';
import { MemberReputation } from '../../../shared/models/reputation.model';

import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="leaderboard-container animate-fade-in-up">
      <div class="header-section glass-panel">
        <button mat-icon-button routerLink="/community/reputation" class="back-btn">
          <mat-icon>arrow_back_ios</mat-icon>
        </button>
        <div>
          <h1 class="page-title">Leaderboard Communautaire</h1>
          <p class="page-subtitle">Découvrez les membres les plus actifs et influents.</p>
        </div>
      </div>

      <div class="leaderboard-list">
        <div *ngFor="let member of leaderboard; let i = index" 
          class="member-row glass-panel hover-lift"
          [class.top-tier]="i < 3">
          
          <div class="rank-container">
            <div class="rank-badge" [class]="getRankClass(i)">
              {{ i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1) }}
            </div>
          </div>
          
          <div class="member-info">
            <div class="avatar-mini"><mat-icon>person</mat-icon></div>
            <div>
              <div class="member-id">{{ member.memberId }}</div>
              <div class="level-indicator" [class]="member.level.toLowerCase()">
                {{ member.level }}
              </div>
            </div>
          </div>
          
          <div class="stats-col">
            <div class="stat-main">{{ member.points }} <span class="unit">pts</span></div>
            <div class="stat-sub">Score global: {{ member.globalScore | number:'1.0-1' }}</div>
          </div>
          
          <div class="badges-mini">
            <div *ngFor="let badge of member.badges | slice:0:3" class="badge-icon" title="{{ badge }}">
              <mat-icon>military_tech</mat-icon>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `,
  styles: [`
    .leaderboard-container { max-width: 800px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }
    
    .header-section { 
      display: flex; align-items: flex-start; gap: 16px;
      padding: 24px; border-radius: 16px; margin-bottom: 32px;
      background: linear-gradient(135deg, var(--co-surface) 0%, var(--co-background) 100%);
    }
    .back-btn { margin-top: -4px; color: var(--co-text-muted); }
    .page-title { margin: 0; font-size: 28px; font-weight: 800; color: var(--co-secondary); }
    .page-subtitle { margin: 4px 0 0; color: var(--co-text-muted); font-size: 14px; }
    
    .leaderboard-list { display: flex; flex-direction: column; gap: 12px; }
    
    .member-row { 
      display: flex; align-items: center; padding: 16px 24px; 
      border-radius: 16px; background: white; border: 1px solid rgba(0,0,0,0.05); 
      box-shadow: var(--shadow-sm); 
    }
    .top-tier { border: 1px solid var(--co-primary-light); background: linear-gradient(to right, white, #F8FAFC); }
    
    .rank-container { width: 60px; display: flex; justify-content: flex-start; }
    .rank-badge { 
      width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; 
      font-size: 16px; font-weight: 800; color: var(--co-text-muted); 
      background: var(--co-background); border-radius: 12px;
    }
    .rank-badge.gold { background: #FEF08A; font-size: 24px; box-shadow: 0 0 15px rgba(250, 204, 21, 0.4); }
    .rank-badge.silver { background: #E2E8F0; font-size: 24px; }
    .rank-badge.bronze { background: #FED7AA; font-size: 24px; }
    
    .member-info { flex: 1; display: flex; align-items: center; gap: 16px; }
    .avatar-mini { width: 44px; height: 44px; border-radius: 50%; background: var(--co-primary-light); color: var(--co-primary); display: flex; justify-content: center; align-items: center; }
    .member-id { font-size: 16px; font-weight: 700; color: var(--co-secondary); margin-bottom: 4px; }
    
    .level-indicator { font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 12px; display: inline-block; text-transform: uppercase; letter-spacing: 0.5px; }
    .explorateur { background: #EFF6FF; color: #2563EB; }
    .contributeur { background: #ECFDF5; color: #059669; }
    .expert { background: #FFF7ED; color: #EA580C; }
    .leader { background: #FAF5FF; color: #9333EA; }
    .ambassadeur { background: #FEFCE8; color: #CA8A04; }
    
    .stats-col { text-align: right; margin-right: 32px; }
    .stat-main { font-size: 20px; font-weight: 800; color: var(--co-primary); }
    .unit { font-size: 12px; font-weight: 600; color: var(--co-text-muted); }
    .stat-sub { font-size: 12px; color: #94A3B8; margin-top: 4px; }
    
    .badges-mini { display: flex; gap: 8px; }
    .badge-icon { 
      width: 32px; height: 32px; border-radius: 50%; background: #FFFBEB; color: #F59E0B; 
      display: flex; justify-content: center; align-items: center; border: 1px solid #FEF3C7;
    }
    .badge-icon mat-icon { font-size: 20px; width: 20px; height: 20px; }
  `]
})
export class LeaderboardComponent implements OnInit {

  leaderboard: MemberReputation[] = [];

  constructor(private reputationService: ReputationService) {}

  ngOnInit() {
    this.reputationService.getLeaderboard().subscribe(
      data => this.leaderboard = data
    );
  }

  getRankClass(index: number): string {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return '';
  }
}