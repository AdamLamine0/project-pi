import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumPost } from '../../../shared/models/forum-post.model';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SharedModule } from '../../../shared/shared.module';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [SharedModule, PostCardComponent],
  template: `
    <div class="forum-container animate-fade-in-up">

      <!-- Header -->
      <div class="forum-header glass-panel">
        <div>
          <h1 class="page-title">Forum Communautaire</h1>
          <p class="page-subtitle">Échangez, découvrez et grandissez avec la communauté.</p>
        </div>
        <button mat-raised-button color="primary" class="create-btn hover-lift" routerLink="/community/forum/create">
          <mat-icon>add</mat-icon> Nouveau Post
        </button>
      </div>

      <!-- Search -->
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Rechercher...</mat-label>
        <input matInput [(ngModel)]="searchKeyword" (keyup.enter)="search()" />
        <mat-icon matSuffix (click)="search()" style="cursor:pointer">search</mat-icon>
      </mat-form-field>

      <!-- Sectors filter -->
      <div class="sector-chips">
        <mat-chip-set class="custom-chips">
          <mat-chip (click)="filterBySector('')" [class.selected]="!selectedSector">Tous</mat-chip>
          <mat-chip *ngFor="let s of sectors"
            (click)="filterBySector(s)"
            [class.selected]="selectedSector === s">
            {{ s }}
          </mat-chip>
        </mat-chip-set>
      </div>

      <!-- Posts list -->
      <div class="posts-list">
        <div *ngIf="loading" class="spinner-container">
          <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
        </div>

        <app-post-card class="animate-fade-in-up"
          *ngFor="let post of posts; let i = index"
          [style.animation-delay.ms]="i * 60"
          [post]="post"
          (likeClicked)="likePost($event)"
          (clicked)="goToPost($event)">
        </app-post-card>

        <div *ngIf="!loading && posts.length === 0" class="empty-state glass-panel">
          <mat-icon class="empty-icon">forum</mat-icon>
          <p>Aucun post trouvé. Soyez le premier à poster !</p>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .forum-container { max-width: 850px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }
    
    .forum-header { 
      display: flex; justify-content: space-between; align-items: center; 
      padding: 24px; border-radius: 16px; margin-bottom: 24px;
      background: linear-gradient(135deg, var(--co-surface) 0%, var(--co-background) 100%);
    }
    .page-title { margin: 0; font-size: 28px; font-weight: 800; color: var(--co-secondary); }
    .page-subtitle { margin: 4px 0 0; color: var(--co-text-muted); font-size: 14px; }
    .create-btn { border-radius: 20px; padding: 0 24px; background-color: var(--co-primary); color: white; font-weight: 600; }
    
    .search-field { width: 100%; margin-bottom: 16px; }
    ::ng-deep .search-field .mdc-text-field--outlined { border-radius: 12px; background: white; }
    
    .sector-chips { margin-bottom: 24px; }
    .custom-chips mat-chip { transition: var(--transition-fast); border-radius: 8px; cursor: pointer; }
    .custom-chips mat-chip:not(.selected):hover { background-color: var(--co-primary-light); color: var(--co-primary-dark); }
    .selected { background-color: var(--co-primary) !important; color: white !important; font-weight: 600; box-shadow: var(--shadow-sm); }
    
    .posts-list { display: flex; flex-direction: column; gap: 16px; }
    .spinner-container { display: flex; justify-content: center; padding: 40px; }
    
    .empty-state { text-align: center; color: var(--co-text-muted); padding: 60px 40px; border-radius: 16px; }
    .empty-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 16px; color: #CBD5E1; }
  `]
})
export class PostListComponent implements OnInit {

  posts: ForumPost[] = [];
  loading = false;
  searchKeyword = '';
  selectedSector = '';

  sectors = ['FinTech', 'AgriTech', 'EdTech', 'GreenTech', 'HealthTech', 'E-Commerce'];

  constructor(
    private forumService: ForumService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.forumService.getAllPosts().subscribe({
      next: posts => { this.posts = posts; this.loading = false; },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement des posts', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  search() {
    if (!this.searchKeyword.trim()) { this.loadPosts(); return; }
    this.loading = true;
    this.forumService.searchPosts(this.searchKeyword).subscribe({
      next: posts => { this.posts = posts; this.loading = false; },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors de la recherche', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  filterBySector(sector: string) {
    this.selectedSector = sector;
    if (!sector) { this.loadPosts(); return; }
    this.loading = true;
    this.forumService.getPostsBySector(sector).subscribe({
      next: posts => { this.posts = posts; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  likePost(postId: string) {
    const userId = this.authService.getUserId()?.toString() || '';
    this.forumService.likePost(postId, userId).subscribe({
      next: updated => {
        const index = this.posts.findIndex(p => p.id === postId);
        if (index !== -1) this.posts[index] = updated;
      }
    });
  }

  goToPost(postId: string) {
    this.router.navigate(['/community/forum', postId]);
  }
}