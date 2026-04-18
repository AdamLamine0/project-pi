import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ForumPost } from '../../../shared/models/forum-post.model';

import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-post-card',

  template: `
    <div class="post-card hover-lift" (click)="clicked.emit(post.id)">
      <!-- Accent Bar -->
      <div class="accent-bar" [class]="getAccentClass()"></div>

      <div class="card-inner">
        <div class="card-header">
          <div class="author-avatar">
            <mat-icon>person</mat-icon>
          </div>
          <div class="header-texts">
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="post-meta">
              <span class="author-name">Par {{ post.authorName || post.authorId }}</span>
              <span class="sector-badge">{{ post.sector }}</span>
              <span class="group-badge" *ngIf="post.groupName"><mat-icon>groups</mat-icon> {{ post.groupName }}</span>
              <span class="date">{{ post.createdAt | date:'dd MMM yyyy' }}</span>
            </div>
          </div>
          <div class="status-indicator" [class]="post.status.toLowerCase()">
            {{ post.status === 'OPEN' ? 'Ouvert' : post.status === 'RESOLVED' ? 'Résolu' : 'Archivé' }}
          </div>
        </div>

        <div class="card-content">
          <p>{{ post.content | slice:0:160 }}{{ post.content.length > 160 ? '...' : '' }}</p>
          <div class="tags" *ngIf="post.tags && post.tags.length > 0">
            <span *ngFor="let tag of post.tags | slice:0:4" class="tag-chip">#{{ tag }}</span>
            <span *ngIf="post.tags.length > 4" class="tag-more">+{{ post.tags.length - 4 }}</span>
          </div>
        </div>

        <div class="card-actions">
          <button mat-button class="action-btn" (click)="onLike($event)" [class.liked]="post.likesCount > 0">
            <mat-icon [class.like-animate]="justLiked">{{ post.likesCount > 0 ? 'thumb_up' : 'thumb_up_off_alt' }}</mat-icon>
            <span>{{ post.likesCount }}</span>
          </button>
          <button mat-button class="action-btn">
            <mat-icon>chat_bubble_outline</mat-icon>
            <span>{{ post.comments.length || 0 }}</span>
          </button>
          <button mat-button class="action-btn">
            <mat-icon>visibility</mat-icon>
            <span>{{ post.viewsCount }}</span>
          </button>
          <div class="spacer"></div>
          <mat-icon class="read-more-icon">arrow_forward</mat-icon>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .post-card {
      background: white; border-radius: 16px;
      cursor: pointer; position: relative;
      border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);
      overflow: hidden;
      transition: border-color var(--transition-medium);
    }
    .post-card:hover { border-color: rgba(79, 70, 229, 0.15); }

    .accent-bar {
      height: 4px; width: 100%;
      background: linear-gradient(90deg, var(--co-primary), var(--co-primary-dark));
      opacity: 0;
      transition: opacity var(--transition-medium);
    }
    .post-card:hover .accent-bar { opacity: 1; }
    .accent-bar.fintech { background: linear-gradient(90deg, #10B981, #059669); }
    .accent-bar.agritech { background: linear-gradient(90deg, #84CC16, #65A30D); }
    .accent-bar.edtech { background: linear-gradient(90deg, #3B82F6, #2563EB); }
    .accent-bar.greentech { background: linear-gradient(90deg, #14B8A6, #0D9488); }
    .accent-bar.healthtech { background: linear-gradient(90deg, #F43F5E, #E11D48); }
    .accent-bar.e-commerce { background: linear-gradient(90deg, #F59E0B, #D97706); }

    .card-inner { padding: 20px; }

    .card-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }

    .author-avatar {
      width: 42px; height: 42px; border-radius: 12px;
      background: linear-gradient(135deg, var(--co-primary-light), #C7D2FE);
      color: var(--co-primary);
      display: flex; justify-content: center; align-items: center;
      flex-shrink: 0;
    }
    .author-avatar mat-icon { font-size: 22px; width: 22px; height: 22px; }

    .header-texts { flex: 1; min-width: 0; }
    .post-title {
      margin: 0 0 6px 0; font-size: 17px; font-weight: 700;
      color: var(--co-text-main); line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .post-meta { display: flex; align-items: center; gap: 8px; font-size: 13px; }

    .sector-badge {
      background: var(--co-background); color: var(--co-text-muted);
      padding: 2px 10px; border-radius: 8px; font-weight: 600; font-size: 11px;
    }
    .group-badge {
      background: var(--co-primary-light); color: var(--co-primary);
      padding: 2px 10px; border-radius: 8px; font-weight: 600; font-size: 11px;
      display: flex; align-items: center; gap: 4px;
    }
    .group-badge mat-icon { font-size: 14px; width: 14px; height: 14px; }
    .date { color: #94A3B8; font-size: 12px; }

    .status-indicator {
      font-size: 11px; font-weight: 700; padding: 4px 12px;
      border-radius: 20px; white-space: nowrap; flex-shrink: 0;
    }
    .open { background: #ECFDF5; color: #059669; }
    .resolved { background: #EFF6FF; color: #2563EB; }
    .archived { background: var(--co-background); color: var(--co-text-muted); }

    .card-content {
      margin-bottom: 16px; color: #475569;
      line-height: 1.55; font-size: 14px;
    }
    .card-content p { margin: 0 0 10px; }

    .tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag-chip {
      font-size: 12px; color: var(--co-primary); font-weight: 500;
      background: var(--co-primary-light); padding: 2px 10px; border-radius: 8px;
    }
    .tag-more { font-size: 12px; color: var(--co-text-muted); font-weight: 600; padding: 2px 6px; }

    .card-actions {
      display: flex; gap: 4px; align-items: center;
      border-top: 1px solid var(--co-background); padding-top: 10px;
    }
    .action-btn {
      color: var(--co-text-muted); border-radius: 10px;
      display: flex; align-items: center; gap: 4px;
      font-size: 13px; font-weight: 600; min-width: auto;
      padding: 4px 10px;
    }
    .action-btn:hover { background: var(--co-background); }
    .action-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .action-btn.liked { color: var(--co-primary); }
    .action-btn.liked:hover { background: var(--co-primary-light); }

    .spacer { flex: 1; }
    .read-more-icon {
      font-size: 18px; width: 18px; height: 18px;
      color: #CBD5E1; transition: all var(--transition-medium);
    }
    .post-card:hover .read-more-icon { color: var(--co-primary); transform: translateX(4px); }
  `]
})
export class PostCardComponent {
  @Input() post!: ForumPost;
  @Output() likeClicked = new EventEmitter<string>();
  @Output() clicked = new EventEmitter<string>();

  justLiked = false;

  onLike(event: Event) {
    event.stopPropagation();
    this.justLiked = true;
    this.likeClicked.emit(this.post.id);
    setTimeout(() => this.justLiked = false, 400);
  }

  getAccentClass(): string {
    return this.post.sector?.toLowerCase().replace(/[\s-]/g, '') || '';
  }
}