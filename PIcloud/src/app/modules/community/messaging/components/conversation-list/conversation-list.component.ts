import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../../forum/services/group.service';
import { ForumGroup } from '../../../shared/models/forum-group.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../../shared/models/chat-message.model';

@Component({
  selector: 'app-conversation-list',
  template: `
    <div class="conversations-container animate-fade-in-up">
      <div class="header-section glass-panel">
        <div class="header-top">
          <h1 class="page-title">Messagerie</h1>
          <div class="header-badge" *ngIf="unreadMessages.length > 0">
            {{ unreadMessages.length }} non lu{{ unreadMessages.length > 1 ? 's' : '' }}
          </div>
        </div>
        <p class="page-subtitle">Discutez avec vos groupes et vos connexions.</p>
      </div>

      <!-- Search -->
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Rechercher une conversation...</mat-label>
        <input matInput [(ngModel)]="searchTerm" />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="list-wrapper">

        <!-- Group Conversations -->
        <div class="section" *ngIf="filteredGroups.length > 0">
          <div class="section-title">
            <div class="section-icon"><mat-icon>workspaces</mat-icon></div>
            <span>Groupes Sectoriels</span>
            <span class="section-count">{{ filteredGroups.length }}</span>
          </div>

          <div *ngFor="let group of filteredGroups; let i = index"
            class="conversation-item hover-lift animate-fade-in-up"
            [style.animation-delay.ms]="i * 50"
            (click)="openGroupChat(group)">

            <div class="avatar group-avatar">
              <mat-icon>workspaces</mat-icon>
            </div>
            <div class="details">
              <div class="conv-title">{{ group.name }}</div>
              <div class="conv-subtitle">
                <mat-icon>business_center</mat-icon>
                {{ group.sector }} · {{ group.memberCount }} membres
              </div>
            </div>
            <div class="unread-badge" *ngIf="getUnread(group.id) > 0">
              {{ getUnread(group.id) }}
            </div>
            <mat-icon class="chevron">chevron_right</mat-icon>
          </div>
        </div>

        <!-- Private Messages -->
        <div class="section" *ngIf="unreadMessages.length > 0">
          <div class="section-title">
            <div class="section-icon private"><mat-icon>mark_chat_unread</mat-icon></div>
            <span>Messages Privés</span>
            <span class="section-count warn">{{ unreadMessages.length }}</span>
          </div>

          <div *ngFor="let msg of unreadMessages; let i = index"
            class="conversation-item unread hover-lift animate-fade-in-up"
            [style.animation-delay.ms]="i * 50"
            (click)="openPrivateChat(msg.senderId)">

            <div class="avatar private-avatar">
              <mat-icon>person</mat-icon>
            </div>
            <div class="details">
              <div class="conv-title">{{ msg.senderId }}</div>
              <div class="conv-subtitle message-preview">
                {{ msg.content | slice:0:50 }}{{ msg.content.length > 50 ? '...' : '' }}
              </div>
            </div>
            <div class="unread-dot"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredGroups.length === 0 && unreadMessages.length === 0" class="empty-state animate-scale-in">
          <div class="empty-icon-wrapper">
            <mat-icon>forum</mat-icon>
          </div>
          <h3>{{ searchTerm ? 'Aucun résultat' : 'Pas de conversations' }}</h3>
          <p>{{ searchTerm ? 'Essayez un autre mot-clé.' : 'Rejoignez des groupes pour commencer à discuter !' }}</p>
          <button mat-button class="explore-link" routerLink="/community/forum/groups" *ngIf="!searchTerm">
            <mat-icon>explore</mat-icon> Explorer les groupes
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .conversations-container { max-width: 800px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }

    .header-section {
      padding: 24px 28px; border-radius: 20px; margin-bottom: 24px;
      background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%);
      border: none;
    }
    .header-top { display: flex; justify-content: space-between; align-items: center; }
    .page-title { margin: 0; font-size: 26px; font-weight: 800; color: var(--co-secondary); }
    .page-subtitle { margin: 6px 0 0; color: var(--co-text-muted); font-size: 14px; }
    .header-badge {
      background: var(--co-primary); color: white; border-radius: 20px;
      padding: 4px 14px; font-size: 12px; font-weight: 700;
      box-shadow: var(--shadow-glow-sm);
    }

    .search-field { width: 100%; margin-bottom: 8px; }
    ::ng-deep .search-field .mdc-text-field--outlined { border-radius: 14px; background: white; }

    .list-wrapper { }

    .section { margin-bottom: 28px; }
    .section-title {
      display: flex; align-items: center; gap: 10px;
      padding: 0 4px; margin-bottom: 12px;
      font-size: 13px; font-weight: 700; color: var(--co-text-muted);
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .section-icon {
      width: 28px; height: 28px; border-radius: 8px;
      background: var(--co-primary-light); color: var(--co-primary);
      display: flex; justify-content: center; align-items: center;
    }
    .section-icon.private { background: #FFF7ED; color: #EA580C; }
    .section-icon mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .section-count {
      background: var(--co-background); color: var(--co-text-muted);
      padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
    }
    .section-count.warn { background: #FEF2F2; color: var(--co-danger); }

    .conversation-item {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 16px; margin-bottom: 6px; border-radius: 14px;
      cursor: pointer; background: white;
      border: 1px solid rgba(0,0,0,0.04);
      transition: all var(--transition-medium);
    }
    .conversation-item:hover {
      background: var(--co-primary-light);
      border-color: rgba(79, 70, 229, 0.1);
    }
    .conversation-item.unread { background: #FFFBF5; border-color: rgba(234, 88, 12, 0.1); }

    .avatar {
      width: 46px; height: 46px; border-radius: 14px;
      display: flex; justify-content: center; align-items: center;
      flex-shrink: 0;
    }
    .group-avatar {
      background: linear-gradient(135deg, var(--co-primary-light), #C7D2FE);
      color: var(--co-primary);
    }
    .private-avatar {
      background: linear-gradient(135deg, #FFF7ED, #FED7AA);
      color: #C2410C;
    }
    .avatar mat-icon { font-size: 22px; width: 22px; height: 22px; }

    .details { flex: 1; min-width: 0; }
    .conv-title {
      font-weight: 700; font-size: 15px; color: var(--co-secondary);
      margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .conv-subtitle {
      display: flex; align-items: center; gap: 4px;
      font-size: 12px; color: var(--co-text-muted);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .conv-subtitle mat-icon { font-size: 14px; width: 14px; height: 14px; }
    .message-preview { font-weight: 500; color: #475569; }

    .unread-badge {
      background: var(--co-primary); color: white; border-radius: 12px;
      padding: 2px 10px; font-size: 11px; font-weight: 700;
      box-shadow: var(--shadow-glow-sm); flex-shrink: 0;
    }
    .unread-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: #EA580C; flex-shrink: 0;
      box-shadow: 0 0 8px rgba(234, 88, 12, 0.4);
    }

    .chevron {
      font-size: 20px; width: 20px; height: 20px;
      color: #CBD5E1; transition: all var(--transition-medium);
    }
    .conversation-item:hover .chevron { color: var(--co-primary); transform: translateX(4px); }

    .empty-state {
      text-align: center; padding: 60px 40px; border-radius: 20px; background: white;
      border: 1px solid rgba(0,0,0,0.05);
    }
    .empty-icon-wrapper {
      width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 20px;
      background: linear-gradient(135deg, var(--co-primary-light), #C7D2FE);
      display: flex; justify-content: center; align-items: center;
    }
    .empty-icon-wrapper mat-icon { font-size: 36px; width: 36px; height: 36px; color: var(--co-primary); }
    .empty-state h3 { font-size: 20px; font-weight: 700; color: var(--co-secondary); margin: 0 0 8px; }
    .empty-state p { color: var(--co-text-muted); font-size: 14px; margin: 0 0 20px; }
    .explore-link { border-radius: 20px; font-weight: 600; color: var(--co-primary); }
  `]
})
export class ConversationListComponent implements OnInit {

  myGroups: ForumGroup[] = [];
  filteredGroups: ForumGroup[] = [];
  unreadMessages: ChatMessage[] = [];
  unreadByGroup: { [groupId: string]: number } = {};
  currentUserId = '';
  searchTerm = '';

  constructor(
    private groupService: GroupService,
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUserId()?.toString() || '';
    this.loadMyGroups();
    this.loadUnread();
  }

  loadMyGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.myGroups = groups.filter(g => g.memberIds.includes(this.currentUserId));
      this.filteredGroups = this.myGroups;
    });
  }

  loadUnread() {
    this.chatService.getUnreadMessages(this.currentUserId).subscribe(
      msgs => this.unreadMessages = msgs
    );
  }

  getUnread(groupId: string): number {
    return this.unreadMessages.filter(m => m.groupId === groupId).length;
  }

  openGroupChat(group: ForumGroup) {
    this.router.navigate(['/community/messaging/group', group.id]);
  }

  openPrivateChat(userId: string) {
    this.router.navigate(['/community/messaging/private', userId]);
  }
}