import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { ForumPost, Comment } from '../../../shared/models/forum-post.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-post-detail',

  template: `
    <div class="detail-container animate-fade-in-up" *ngIf="post">

      <button mat-icon-button routerLink="/community/forum" class="back-btn">
        <mat-icon>arrow_back</mat-icon>
      </button>

      <div class="post-content-card glass-panel">
        <div class="header-section">
          <div class="author-avatar"><mat-icon>person</mat-icon></div>
          <div class="meta-info">
            <span class="author-name">Par {{ post.authorName || post.authorId }}</span>
            <span class="sector-badge">{{ post.sector }}</span>
            <span class="date">{{ post.createdAt | date:'dd MMM yyyy, HH:mm' }}</span>
          </div>
        </div>

        <!-- Mode lecture -->
        <ng-container *ngIf="!isEditing">
          <h1 class="post-title">{{ post.title }}</h1>
          <div class="main-content">
            <p>{{ post.content }}</p>
          </div>
          <div class="tags" *ngIf="post.tags && post.tags.length > 0">
            <span *ngFor="let tag of post.tags" class="tag-chip">#{{ tag }}</span>
          </div>
          <div class="action-bar">
            <button mat-button class="like-btn" (click)="likePost()" [class.liked]="post.likesCount > 0">
              <mat-icon>thumb_up</mat-icon> <span>{{ post.likesCount }} J'aime</span>
            </button>
            <ng-container *ngIf="isOwner">
              <button mat-button color="primary" (click)="toggleEdit()">
                <mat-icon>edit</mat-icon> Modifier
              </button>
              <button mat-button color="warn" (click)="deletePost()">
                <mat-icon>delete</mat-icon> Supprimer
              </button>
            </ng-container>
          </div>
        </ng-container>

        <!-- Mode édition -->
        <ng-container *ngIf="isEditing">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Titre</mat-label>
            <input matInput [(ngModel)]="editTitle" />
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Contenu</mat-label>
            <textarea matInput [(ngModel)]="editContent" rows="5"></textarea>
          </mat-form-field>
          <div class="edit-actions">
            <button mat-button (click)="toggleEdit()">Annuler</button>
            <button mat-raised-button color="primary" (click)="updatePost()">
              <mat-icon>save</mat-icon> Sauvegarder
            </button>
          </div>
        </ng-container>
      </div>

      <!-- Comments -->
      <div class="comments-section">
        <h3 class="comments-title">Commentaires ({{ post.comments.length || 0 }})</h3>

        <div class="comment-thread">
          <div *ngFor="let comment of post.comments; let i = index" class="comment-bubble hover-lift">
            <div class="comment-header">
              <mat-icon class="comment-avatar">account_circle</mat-icon>
              <strong class="comment-author">{{ comment.authorName || comment.authorId }}</strong>
              <span class="comment-date">{{ comment.createdAt | date:'dd MMM yyyy HH:mm' }}</span>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
              <button mat-button class="reply-link" (click)="toggleReplyTo(i)">
                <mat-icon>reply</mat-icon> Répondre
              </button>
            </div>

            <!-- Reply box for this comment -->
            <div *ngIf="replyingTo === i" class="reply-box">
              <mat-form-field appearance="outline" class="full-width no-margin">
                <mat-label>Votre réponse...</mat-label>
                <textarea matInput [(ngModel)]="replyContent" rows="2"></textarea>
              </mat-form-field>
              <div class="reply-actions">
                <button mat-button (click)="cancelReply()">Annuler</button>
                <button mat-raised-button color="primary" class="reply-btn"
                  [disabled]="!replyContent.trim()"
                  (click)="addReply(i)">
                  <mat-icon>send</mat-icon> Envoyer
                </button>
              </div>
            </div>

            <!-- Nested replies -->
            <div *ngIf="comment.replies && comment.replies.length > 0" class="replies-nest">
              <div *ngFor="let reply of comment.replies" class="nested-comment">
                <div class="reply-header">
                  <mat-icon class="reply-avatar">reply</mat-icon>
                  <strong class="reply-author">{{ reply.authorName || reply.authorId }}</strong>
                  <span class="reply-date">{{ reply.createdAt | date:'dd MMM yyyy HH:mm' }}</span>
                </div>
                <p class="reply-text">{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Add main comment -->
        <div class="add-comment-box glass-panel">
          <mat-form-field appearance="outline" class="full-width no-margin">
            <mat-label>Votre réponse...</mat-label>
            <textarea matInput [(ngModel)]="newComment" rows="3"></textarea>
          </mat-form-field>
          <div class="submit-action">
            <button mat-raised-button color="primary" class="reply-btn"
              [disabled]="!newComment.trim()"
              (click)="addComment()">
              <mat-icon>send</mat-icon> Ajouter un commentaire
            </button>
          </div>
        </div>
      </div>

    </div>

    <div *ngIf="!post" class="spinner-container">
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </div>
  `,
  styles: [`
    .detail-container { max-width: 800px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }
    .back-btn { margin-bottom: 16px; background: white; box-shadow: var(--shadow-sm); }

    .post-content-card { padding: 32px; border-radius: 16px; margin-bottom: 32px; background: white; }
    .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .author-avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--co-primary-light); color: var(--co-primary); display: flex; justify-content: center; align-items: center; font-size: 24px; }
    .meta-info { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
    .sector-badge { background: var(--co-background); color: var(--co-text-muted); padding: 4px 12px; border-radius: 12px; font-weight: 600; font-size: 12px; }
    .date { color: #94A3B8; font-size: 13px; }

    .post-title { font-size: 32px; font-weight: 800; color: var(--co-secondary); margin: 0 0 24px 0; line-height: 1.2; }
    .main-content { font-size: 18px; line-height: 1.7; color: #334155; margin-bottom: 24px; }

    .tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
    .tag-chip { font-size: 14px; color: var(--co-primary); font-weight: 500; background: var(--co-primary-light); padding: 4px 12px; border-radius: 16px; }

    .action-bar { border-top: 1px solid var(--co-background); padding-top: 16px; display: flex; gap: 8px; align-items: center; }
    .like-btn { border-radius: 20px; font-weight: 600; color: var(--co-text-muted); }
    .like-btn.liked { color: var(--co-primary); background: var(--co-primary-light); }

    .edit-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
    .full-width { width: 100%; margin-bottom: 16px; }

    .comments-section { margin-top: 40px; }
    .comments-title { font-size: 20px; font-weight: 700; color: var(--co-secondary); margin-bottom: 24px; }

    .comment-thread { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
    .comment-bubble { background: white; border-radius: 12px; padding: 16px 20px; box-shadow: var(--shadow-sm); border-left: 4px solid var(--co-primary); }
    .comment-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .comment-avatar { color: #CBD5E1; }
    .comment-author { font-size: 14px; color: var(--co-secondary); }
    .comment-date { font-size: 12px; color: #94A3B8; }
    .comment-text { margin: 8px 0; color: #475569; line-height: 1.5; font-size: 15px; }
    
    .comment-actions { margin-top: 12px; }
    .reply-link { font-size: 12px; font-weight: 600; color: var(--co-primary); height: auto; }
    .reply-link mat-icon { font-size: 16px; width: 16px; height: 16px; margin-right: 4px; }

    .reply-box { background: #F8FAFC; border-radius: 8px; padding: 12px; margin-top: 12px; border-left: 2px solid var(--co-primary); }
    .reply-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
    
    .replies-nest { margin-left: 24px; margin-top: 16px; padding-left: 16px; border-left: 2px solid #E2E8F0; }
    .nested-comment { background: #F8FAFC; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
    .reply-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .reply-avatar { font-size: 14px; width: 14px; height: 14px; color: #CBD5E1; }
    .reply-author { font-size: 13px; color: var(--co-text-muted); }
    .reply-date { font-size: 11px; color: #94A3B8; }
    .reply-text { margin: 0; color: #475569; line-height: 1.5; font-size: 14px; }


    .add-comment-box { padding: 24px; background: white; border-radius: 16px; border: 1px solid var(--co-background); }
    ::ng-deep .no-margin .mdc-text-field--outlined { margin-bottom: 0; }
    .submit-action { display: flex; justify-content: flex-end; margin-top: 16px; }
    .reply-btn { border-radius: 20px; padding: 0 24px; }

    .spinner-container { display: flex; justify-content: center; padding: 60px; }
  `]
})
export class PostDetailComponent implements OnInit {

  post: ForumPost | null = null;
  newComment = '';
  replyContent = '';
  postId = '';
  currentUserId = '';
  isOwner = false;
  isEditing = false;
  editTitle = '';
  editContent = '';
  replyingTo: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    this.currentUserId = this.authService.getUserId()?.toString() || '';
    this.loadPost();
  }

  loadPost() {
    this.forumService.getAllPosts().subscribe(posts => {
      this.post = posts.find(p => p.id === this.postId) || null;
      if (this.post) {
        this.isOwner = this.post.authorId === this.currentUserId;
        this.editTitle = this.post.title;
        this.editContent = this.post.content;
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  updatePost() {
    if (!this.post) return;
    const dto = {
      title: this.editTitle,
      content: this.editContent,
      tags: this.post.tags,
      sector: this.post.sector,
      authorId: this.currentUserId
    };
    this.forumService.updatePost(this.postId, dto).subscribe({
      next: updated => {
        this.post = updated;
        this.isEditing = false;
        this.snackBar.open('Post mis à jour !', 'OK', {
          duration: 2000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  deletePost() {
    this.forumService.deletePost(this.postId).subscribe({
      next: () => {
        this.snackBar.open('Post supprimé !', 'OK', { duration: 2000 });
        this.router.navigate(['/community/forum']);
      },
      error: () => {
        this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  likePost() {
    const userId = this.authService.getUserId()?.toString() || '';
    this.forumService.likePost(this.postId, userId).subscribe({
      next: updated => {
        this.post = updated;
        this.snackBar.open('👍 Merci pour votre vote !', 'OK', {
          duration: 2000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors du vote', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  addComment() {
    const comment: Comment = {
      authorId: this.authService.getUserId()?.toString() || '',
      content: this.newComment,
      createdAt: new Date().toISOString()
    };
    this.forumService.addComment(this.postId, comment).subscribe({
      next: updated => {
        this.post = updated;
        this.newComment = '';
        this.snackBar.open('Commentaire ajouté !', 'OK', {
          duration: 2000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'ajout du commentaire', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  toggleReplyTo(commentIndex: number) {
    this.replyingTo = this.replyingTo === commentIndex ? null : commentIndex;
    this.replyContent = '';
  }

  cancelReply() {
    this.replyingTo = null;
    this.replyContent = '';
  }

  addReply(commentIndex: number) {
    const reply: Comment = {
      authorId: this.authService.getUserId()?.toString() || '',
      content: this.replyContent,
      createdAt: new Date().toISOString()
    };
    this.forumService.addReplyToComment(this.postId, commentIndex, reply).subscribe({
      next: updated => {
        this.post = updated;
        this.replyContent = '';
        this.replyingTo = null;
        this.snackBar.open('Réponse ajoutée !', 'OK', {
          duration: 2000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'ajout de la réponse', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }
}