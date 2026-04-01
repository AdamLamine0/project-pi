import { Component } from '@angular/core';

@Component({
  selector: 'app-community',
  template: `
    <div class="community-layout-wrapper animate-fade-in">
      <!-- Community Sub-Navigation -->
      <div class="community-nav">
        <div class="nav-inner">
          <h2 class="nav-title">
            <span class="title-gradient">Community</span>
          </h2>
          <nav class="nav-links">
            <a routerLink="/community/forum" routerLinkActive="active-link" class="nav-link">
              <div class="nav-icon-wrapper">
                <mat-icon>forum</mat-icon>
              </div>
              <span class="nav-label">Forum</span>
            </a>
            <a routerLink="/community/marketplace" routerLinkActive="active-link" class="nav-link">
              <div class="nav-icon-wrapper">
                <mat-icon>storefront</mat-icon>
              </div>
              <span class="nav-label">Marketplace</span>
            </a>
            <a routerLink="/community/network" routerLinkActive="active-link" class="nav-link">
              <div class="nav-icon-wrapper">
                <mat-icon>group</mat-icon>
              </div>
              <span class="nav-label">Réseau</span>
            </a>
            <a routerLink="/community/messaging" routerLinkActive="active-link" class="nav-link">
              <div class="nav-icon-wrapper">
                <mat-icon>chat</mat-icon>
              </div>
              <span class="nav-label">Messages</span>
            </a>
            <a routerLink="/community/reputation" routerLinkActive="active-link" class="nav-link">
              <div class="nav-icon-wrapper">
                <mat-icon>emoji_events</mat-icon>
              </div>
              <span class="nav-label">Réputation</span>
            </a>
          </nav>
        </div>
      </div>

      <!-- Main content area -->
      <div class="community-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .community-layout-wrapper {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 57px);
      background-color: var(--co-background);
      padding: 0;
      margin-top: 57px;
    }

    .community-nav {
      position: sticky;
      top: 57px;
      z-index: 50;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      box-shadow: 0 1px 12px rgba(0,0,0,0.04);
    }

    .nav-inner {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
    }

    .nav-title { margin: 0; }
    .title-gradient {
      font-size: 22px;
      font-weight: 900;
      background: linear-gradient(135deg, var(--co-primary) 0%, var(--co-primary-dark) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.5px;
    }

    .nav-links {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .nav-links::-webkit-scrollbar { display: none; }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 12px;
      text-decoration: none;
      color: var(--co-text-muted);
      font-weight: 600;
      font-size: 14px;
      transition: all var(--transition-medium);
      white-space: nowrap;
      position: relative;
    }

    .nav-icon-wrapper {
      width: 32px; height: 32px; border-radius: 10px;
      display: flex; justify-content: center; align-items: center;
      background: transparent;
      transition: all var(--transition-medium);
    }
    .nav-icon-wrapper mat-icon {
      font-size: 20px; width: 20px; height: 20px;
    }

    .nav-link:hover {
      color: var(--co-primary);
      background: var(--co-primary-light);
    }
    .nav-link:hover .nav-icon-wrapper {
      background: rgba(79, 70, 229, 0.1);
    }

    .active-link {
      color: var(--co-primary) !important;
      background: var(--co-primary-light);
    }
    .active-link .nav-icon-wrapper {
      background: var(--co-primary) !important;
      color: white;
      box-shadow: 0 4px 10px rgba(79, 70, 229, 0.25);
    }
    .active-link .nav-icon-wrapper mat-icon {
      color: white;
    }

    .community-content {
      flex: 1;
      padding: 0 24px 24px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .nav-inner {
        flex-direction: column;
        height: auto;
        padding: 12px 16px;
        gap: 8px;
        align-items: flex-start;
      }
      .nav-links {
        width: 100%;
        padding-bottom: 4px;
      }
      .nav-label { display: none; }
      .nav-link { padding: 8px 12px; }
      .community-content {
        padding: 0 8px 16px;
      }
    }
  `]
})
export class CommunityComponent {}
