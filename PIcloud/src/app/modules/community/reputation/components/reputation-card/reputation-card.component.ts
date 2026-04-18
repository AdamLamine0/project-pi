import { Component, OnInit } from '@angular/core';
import { ReputationService } from '../../services/reputation.service';
import { MemberReputation } from '../../../shared/models/reputation.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { BadgesComponent } from '../badges/badges.component';

@Component({
  selector: 'app-reputation-card',

  template: `
    <div class="reputation-container animate-fade-in-up" *ngIf="reputation">

      <!-- Header -->
      <div class="rep-header glass-panel">
        <div>
          <h1 class="page-title">Ma Réputation</h1>
          <p class="page-subtitle">Suivez votre impact et progressez dans la communauté.</p>
        </div>
        <button mat-raised-button color="primary" class="leaderboard-btn hover-lift" routerLink="/community/reputation/leaderboard">
          <mat-icon>emoji_events</mat-icon> Leaderboard
        </button>
      </div>

      <!-- Score Card -->
      <div class="score-card glass-panel hover-lift">
        <div class="score-grid">

          <div class="score-main">
            <div class="level-badge" [class]="reputation.level.toLowerCase()">
              {{ reputation.level }}
            </div>
            <div class="points">{{ reputation.points }} <span class="pts-label">pts</span></div>
            <div class="global-score">Score global : {{ reputation.globalScore | number:'1.0-1' }} / 100</div>
          </div>

          <div class="score-details border-left">
            <div class="score-item">
              <span class="score-label">Expertise</span>
              <div class="progress-bar-wrapper">
                <div class="progress-fill expertise-fill" [style.width.%]="reputation.expertiseScore"></div>
              </div>
              <span class="score-value">{{ reputation.expertiseScore | number:'1.0-1' }}</span>
            </div>
            <div class="score-item">
              <span class="score-label">Réactivité</span>
              <div class="progress-bar-wrapper">
                <div class="progress-fill reactivity-fill" [style.width.%]="reputation.reactivityScore"></div>
              </div>
              <span class="score-value">{{ reputation.reactivityScore | number:'1.0-1' }}</span>
            </div>
            <div class="score-item">
              <span class="score-label">Valeur ajoutée</span>
              <div class="progress-bar-wrapper">
                <div class="progress-fill value-fill" [style.width.%]="reputation.valueScore"></div>
              </div>
              <span class="score-value">{{ reputation.valueScore | number:'1.0-1' }}</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card glass-panel hover-lift">
          <div class="stat-icon bg-blue"><mat-icon>forum</mat-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ reputation.postsCount }}</div>
            <div class="stat-label">Posts publiés</div>
          </div>
        </div>
        <div class="stat-card glass-panel hover-lift">
          <div class="stat-icon bg-green"><mat-icon>comment</mat-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ reputation.commentsCount }}</div>
            <div class="stat-label">Commentaires</div>
          </div>
        </div>
        <div class="stat-card glass-panel hover-lift">
          <div class="stat-icon bg-orange"><mat-icon>library_books</mat-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ reputation.resourcesPublished }}</div>
            <div class="stat-label">Ressources</div>
          </div>
        </div>
        <div class="stat-card glass-panel hover-lift">
          <div class="stat-icon bg-purple"><mat-icon>star</mat-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ reputation.recommendationsReceived }}</div>
            <div class="stat-label">Recommandations</div>
          </div>
        </div>
      </div>

      <!-- Badges -->
      <app-badges [badges]="reputation.badges"></app-badges>

    </div>

    <div *ngIf="!reputation" class="spinner-container">
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </div>
  `,
  styles: [`
    .reputation-container { max-width: 900px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }
    
    .rep-header { 
      display: flex; justify-content: space-between; align-items: center; 
      padding: 28px 32px; border-radius: 20px; margin-bottom: 32px;
      background: linear-gradient(135deg, #FEFCE8 0%, #FEF08A 50%, #FDE68A 100%);
      border: none;
    }
    .page-title { margin: 0; font-size: 28px; font-weight: 800; color: var(--co-secondary); }
    .page-subtitle { margin: 4px 0 0; color: var(--co-text-muted); font-size: 14px; }
    .leaderboard-btn { border-radius: 20px; font-weight: 600; padding: 0 24px; }
    
    .score-card { padding: 32px; border-radius: 20px; background: white; margin-bottom: 32px; border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-md); }
    .score-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 32px; align-items: center; }
    
    .score-main { text-align: center; }
    .level-badge { padding: 8px 24px; border-radius: 20px; font-weight: 800; font-size: 16px; margin-bottom: 16px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; }
    
    .explorateur { background: #EEF2FF; color: #4F46E5; }
    .contributeur { background: #ECFDF5; color: #059669; }
    .expert { background: #FFF7ED; color: #EA580C; }
    .leader { background: #FAF5FF; color: #9333EA; }
    .ambassadeur { background: #FEFCE8; color: #CA8A04; }
    
    .points { font-size: 40px; font-weight: 800; color: var(--co-secondary); line-height: 1; margin-bottom: 8px; }
    .pts-label { font-size: 16px; font-weight: 600; color: var(--co-text-muted); }
    .global-score { color: var(--co-text-muted); font-size: 14px; font-weight: 500; }
    
    .border-left { border-left: 1px solid var(--co-background); padding-left: 32px; }
    
    .score-item { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
    .score-item:last-child { margin-bottom: 0; }
    .score-label { width: 120px; font-size: 14px; font-weight: 600; color: var(--co-text-main); }
    
    .progress-bar-wrapper { flex: 1; height: 10px; background: #F1F5F9; border-radius: 5px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 5px; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); }
    .expertise-fill { background: linear-gradient(90deg, #3B82F6, #60A5FA); }
    .reactivity-fill { background: linear-gradient(90deg, #10B981, #34D399); }
    .value-fill { background: linear-gradient(90deg, #F59E0B, #FBBF24); }
    
    .score-value { width: 40px; text-align: right; font-weight: 700; color: var(--co-secondary); }
    
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .stat-card { background: white; padding: 20px; border-radius: 16px; display: flex; align-items: center; gap: 16px; border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm); }
    
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; justify-content: center; align-items: center; color: white; }
    .stat-icon mat-icon { font-size: 24px; width: 24px; height: 24px; }
    .bg-blue { background: #3B82F6; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); }
    .bg-green { background: #10B981; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3); }
    .bg-orange { background: #F59E0B; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3); }
    .bg-purple { background: #8B5CF6; box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3); }
    
    .stat-info { display: flex; flex-direction: column; }
    .stat-value { font-size: 24px; font-weight: 800; color: var(--co-secondary); line-height: 1.2; }
    .stat-label { color: var(--co-text-muted); font-size: 13px; font-weight: 500; }
    
    .spinner-container { display: flex; justify-content: center; padding: 60px; }
  `]
})
export class ReputationCardComponent implements OnInit {

  reputation: MemberReputation | null = null;

  constructor(
    private reputationService: ReputationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const memberId = this.authService.getUserId()?.toString() || '';
    this.reputationService.getReputation(memberId).subscribe(
      rep => this.reputation = rep
    );
  }
}