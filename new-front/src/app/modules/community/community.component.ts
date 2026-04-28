import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-community',
  template: `
    <div class="community-shell">

      <!-- Premium Hero Header -->
      <div class="community-hero">
        <div class="hero-bg-accent"></div>
        <div class="hero-inner animate-fade-in">
          <h1 class="hero-title">Communauté</h1>
          <p class="hero-sub">Connectez-vous, partagez et grandissez avec l'écosystème FoundersLab.</p>
        </div>
      </div>

      <!-- Modern Navigation Bar -->
      <div class="nav-container">
        <nav class="nav-wrapper glass-panel shadow-premium animate-fade-in-up">
          <a routerLink="forum" routerLinkActive="nav-item--active" class="nav-item">
            <div class="nav-icon">💬</div>
            <span class="nav-label">Forum</span>
          </a>
          <a routerLink="marketplace" routerLinkActive="nav-item--active" class="nav-item">
            <div class="nav-icon">🏪</div>
            <span class="nav-label">Marketplace</span>
          </a>
          <a routerLink="network" routerLinkActive="nav-item--active" class="nav-item">
            <div class="nav-icon">🤝</div>
            <span class="nav-label">Réseau</span>
          </a>
          <a routerLink="messaging" routerLinkActive="nav-item--active" class="nav-item">
            <div class="nav-icon">✉️</div>
            <span class="nav-label">Messages</span>
          </a>
          <a routerLink="reputation" routerLinkActive="nav-item--active" class="nav-item">
            <div class="nav-icon">🏆</div>
            <span class="nav-label">Réputation</span>
          </a>
        </nav>
      </div>

      <!-- Main Content Outlet -->
      <main class="community-content">
        <router-outlet></router-outlet>
      </main>

    </div>
  `,
  styles: [`
    .community-shell {
      min-height: 100vh;
      background: #F8FAFC;
      padding-bottom: 80px;
    }

    .community-hero {
      position: relative;
      height: 220px;
      background: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      overflow: hidden;
      padding-bottom: 40px;
    }

    .hero-bg-accent {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 20% 30%, rgba(28, 79, 195, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%);
      filter: blur(40px);
    }

    .hero-inner { position: relative; z-index: 1; padding: 0 20px; }
    
    .hero-title {
      color: white; font-size: 40px; font-weight: 900; margin: 0;
      letter-spacing: -2px;
      background: linear-gradient(to right, #fff, #94A3B8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-sub {
      color: #94A3B8; font-size: 16px; font-weight: 500; margin: 8px 0 0;
      max-width: 500px; line-height: 1.5;
    }

    .nav-container {
      display: flex;
      justify-content: center;
      margin-top: -36px;
      padding: 0 20px;
      position: relative;
      z-index: 20;
    }

    .nav-wrapper {
      display: flex;
      gap: 12px;
      padding: 10px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 24px;
      border-radius: 18px;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    .nav-icon { font-size: 20px; transition: transform 0.3s ease; }
    .nav-label { font-size: 14px; font-weight: 700; color: #64748B; transition: color 0.3s; }

    .nav-item:hover { background: #F1F5F9; }
    .nav-item:hover .nav-icon { transform: scale(1.2) rotate(-5deg); }
    .nav-item:hover .nav-label { color: #1E293B; }

    .nav-item--active {
      background: #1C4FC3;
      box-shadow: 0 10px 20px -5px rgba(28, 79, 195, 0.4);
    }
    .nav-item--active .nav-label { color: white; }
    .nav-item--active .nav-icon { transform: scale(1.1); }

    .community-content {
      max-width: 1200px;
      margin: 48px auto 0;
      padding: 0 24px;
    }

    .shadow-premium {
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1), 
        0 2px 4px -2px rgba(0, 0, 0, 0.1),
        0 20px 25px -5px rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 768px) {
      .nav-wrapper { gap: 4px; padding: 6px; border-radius: 20px; }
      .nav-item { padding: 10px 14px; flex-direction: column; gap: 4px; border-radius: 16px; }
      .nav-label { font-size: 11px; }
      .nav-icon { font-size: 18px; }
      .hero-title { font-size: 32px; }
      .hero-sub { font-size: 14px; }
    }
  `]
})
export class CommunityComponent {}
