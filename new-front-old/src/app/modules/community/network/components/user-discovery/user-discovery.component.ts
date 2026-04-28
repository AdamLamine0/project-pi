import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';
import { UserService } from '../../services/user.service';
import { User, Role } from '../../../../../core/models/user.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { provideIcons } from '@ng-icons/core';
import { 
  lucideArrowLeft, 
  lucideSearch, 
  lucideFilter, 
  lucideUsers, 
  lucideUser, 
  lucideUserPlus, 
  lucideCheck, 
  lucideMessageSquare, 
  lucideSearchX, 
  lucideLoader2 
} from '@ng-icons/lucide';

@Component({
  standalone: false,
  selector: 'app-user-discovery',
  providers: [provideIcons({ lucideArrowLeft, lucideSearch, lucideFilter, lucideUsers, lucideUser, lucideUserPlus, lucideCheck, lucideMessageSquare, lucideSearchX, lucideLoader2 })],
  template: `
    <div class="discovery-container">
      
      <!-- Header -->
      <div class="header-section glass-panel">
        <button routerLink="/community/network" class="back-btn">
          <ng-icon name="lucideArrowLeft" size="20"></ng-icon>
        </button>
        <div class="header-content">
          <h1 class="page-title">Découvrir des membres</h1>
          <p class="page-subtitle">Trouvez et connectez-vous avec d'autres professionnels de la communauté.</p>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-section">
        <div class="search-field">
          <label>Rechercher par nom</label>
          <div class="relative">
            <input 
              class="input-field"
              [(ngModel)]="searchQuery" 
              (ngModelChange)="filterUsers()"
              placeholder="Ex: John, Alice...">
            <ng-icon name="lucideSearch" class="input-icon" size="18"></ng-icon>
          </div>
        </div>
        <div class="role-filter">
          <label>Filtrer par rôle</label>
          <div class="relative">
            <select 
              class="input-field select-field"
              [(ngModel)]="roleFilter" (ngModelChange)="filterUsers()">
              <option value="">Tous les rôles</option>
              <option *ngFor="let r of roles" [value]="r">{{ formatRole(r) }}</option>
            </select>
            <ng-icon name="lucideFilter" class="input-icon" size="18"></ng-icon>
          </div>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="results-section">
        <h2 class="section-title">
          <div class="icon-wrapper">
            <ng-icon name="lucideUsers" size="20"></ng-icon>
          </div>
          Membres suggérés <span class="count-badge">{{ filteredUsers.length }}</span>
        </h2>
        
        <div class="users-grid" *ngIf="!loading && filteredUsers.length > 0">
          <div *ngFor="let user of filteredUsers; let i = index"
            class="user-card"
            [style.animation-delay.ms]="i * 50">
            
            <div class="card-bg-gradient"></div>
            
            <div class="user-avatar-wrapper">
              <div class="user-avatar">
                <span class="initial">{{ user.name ? user.name.charAt(0).toUpperCase() : '?' }}</span>
              </div>
              <div class="avatar-ring"></div>
            </div>
            
            <div class="user-info">
              <span class="user-role" [ngClass]="getRoleClass(user.role)">{{ formatRole(user.role) }}</span>
              <h3>{{ user.name }} {{ user.prenom }}</h3>
              <p class="user-sector">{{ user.email }}</p>
            </div>
            
            <div class="user-actions">
              <button 
                class="btn connect-btn"
                [class.connected]="connectionStatus[user.id] === 'CONNECTED' || connectionStatus[user.id] === 'PENDING'"
                [disabled]="connectionStatus[user.id] === 'CONNECTED' || connectionStatus[user.id] === 'PENDING'"
                (click)="sendConnectionRequest(user)">
                <ng-icon *ngIf="!connectionStatus[user.id]" name="lucideUserPlus" size="18"></ng-icon>
                <ng-icon *ngIf="connectionStatus[user.id] === 'PENDING' || connectionStatus[user.id] === 'CONNECTED'" name="lucideCheck" size="18"></ng-icon>
                <span>{{ connectionStatus[user.id] === 'CONNECTED' ? 'Connecté' : connectionStatus[user.id] === 'PENDING' ? 'Envoyé' : 'Se connecter' }}</span>
              </button>

              <button 
                class="btn message-btn"
                (click)="goToMessage(user)">
                <ng-icon name="lucideMessageSquare" size="18"></ng-icon>
              </button>
            </div>
          </div>
        </div>
        
        <div *ngIf="filteredUsers.length === 0 && !loading" class="empty-state">
          <div class="empty-icon-wrapper">
            <ng-icon name="lucideSearchX" size="40"></ng-icon>
          </div>
          <h3>Aucun membre trouvé</h3>
          <p>Essayez d'ajuster vos critères de recherche pour trouver de nouveaux profils.</p>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <ng-icon name="lucideLoader2" class="spinner" size="40"></ng-icon>
        <p>Recherche de talents...</p>
      </div>

    </div>
  `,
  styles: [`
    .discovery-container {
      max-width: 1200px;
      margin: 32px auto;
      padding: 0 24px;
      font-family: var(--font-sans);
      animation: fadeIn 0.4s ease-out forwards;
    }
    
    /* --- Header --- */
    .header-section {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 32px;
      background: linear-gradient(135deg, rgba(28, 79, 195, 0.04) 0%, rgba(29, 19, 132, 0.02) 100%);
      border-radius: 24px;
      border: 1px solid rgba(28, 79, 195, 0.1);
      margin-bottom: 32px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.02);
    }
    
    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid var(--border);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    
    .back-btn:hover {
      background: var(--surface-subtle);
      color: #1C4FC3;
      transform: translateX(-4px);
      border-color: #1C4FC3;
      box-shadow: 0 4px 12px rgba(28, 79, 195, 0.15);
    }
    
    .header-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .page-title {
      font-size: 28px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0;
      letter-spacing: -0.02em;
    }
    
    .page-subtitle {
      font-size: 15px;
      color: var(--text-muted);
      margin: 0;
    }
    
    /* --- Search & Filter --- */
    .search-section {
      display: flex;
      gap: 20px;
      align-items: flex-end;
      margin-bottom: 40px;
      background: #ffffff;
      padding: 24px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
      border: 1px solid var(--border);
    }
    
    .search-field, .role-filter {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .role-filter {
      flex: 0.6;
    }
    
    .search-section label {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-secondary);
      margin-left: 4px;
    }
    
    .relative {
      position: relative;
    }
    
    .input-field {
      width: 100%;
      height: 48px;
      border-radius: 14px;
      border: 1.5px solid var(--border);
      background: var(--surface-input);
      padding: 0 16px 0 44px;
      font-size: 14px;
      color: var(--text-primary);
      transition: all 0.2s ease;
      outline: none;
      font-family: inherit;
    }
    
    .input-field:focus {
      background: #ffffff;
      border-color: #1C4FC3;
      box-shadow: 0 0 0 4px rgba(28, 79, 195, 0.1);
    }
    
    .select-field {
      appearance: none;
      cursor: pointer;
    }
    
    .input-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      transition: color 0.2s ease;
      pointer-events: none;
    }
    
    .input-field:focus + .input-icon {
      color: #1C4FC3;
    }
    
    /* --- Section Title --- */
    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 20px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 24px 0;
    }
    
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: rgba(28, 79, 195, 0.1);
      color: #1C4FC3;
      border-radius: 10px;
    }
    
    .count-badge {
      background: var(--surface-input);
      color: var(--text-secondary);
      font-size: 13px;
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 600;
      border: 1px solid var(--border);
    }
    
    /* --- Results Grid --- */
    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    .user-card {
      position: relative;
      background: #ffffff;
      border-radius: 24px;
      padding: 32px 24px 24px;
      border: 1px solid var(--border);
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      overflow: hidden;
      animation: slideUpFade 0.5s ease-out backwards;
    }
    
    .card-bg-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: linear-gradient(180deg, rgba(28, 79, 195, 0.03) 0%, rgba(255,255,255,0) 100%);
      z-index: 0;
    }
    
    .user-card:hover {
      transform: translateY(-6px);
      border-color: rgba(28, 79, 195, 0.2);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(28, 79, 195, 0.04);
    }
    
    /* --- Avatar --- */
    .user-avatar-wrapper {
      position: relative;
      margin-bottom: 20px;
      z-index: 1;
    }
    
    .user-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1C4FC3, #1D1384);
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      font-weight: 800;
      box-shadow: 0 8px 16px rgba(28, 79, 195, 0.2);
      position: relative;
      z-index: 2;
    }
    
    .avatar-ring {
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border-radius: 50%;
      border: 2px dashed rgba(28, 79, 195, 0.2);
      animation: spin 20s linear infinite;
      z-index: 1;
    }
    
    /* --- User Info --- */
    .user-info {
      z-index: 1;
      margin-bottom: 24px;
      width: 100%;
    }
    
    .user-role {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    
    /* Role Colors */
    .role-mentor { background: #F3E8FF; color: #6B21A8; }
    .role-admin { background: #FEE2E2; color: #991B1B; }
      .role-entrepreneur { background: #DBEAFE; color: #1E40AF; }
    .role-user { background: #F3F4F6; color: #374151; }
    
    .user-info h3 {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }
    
    .user-sector {
      color: var(--text-muted);
      font-size: 13px;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    /* --- Actions --- */
    .user-actions {
      display: flex;
      gap: 12px;
      width: 100%;
      margin-top: auto;
      z-index: 1;
    }
    
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 44px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    
    .connect-btn {
      flex: 1;
      background: linear-gradient(135deg, #1C4FC3 0%, #1a3a8f 100%);
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 12px rgba(28, 79, 195, 0.2);
    }
    
    .connect-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(28, 79, 195, 0.3);
    }
    
    .connect-btn:active:not(:disabled) {
      transform: translateY(0);
    }
    
    .connect-btn.connected {
      background: var(--surface-input);
      color: var(--text-muted);
      box-shadow: none;
      cursor: not-allowed;
    }
    
    .message-btn {
      width: 44px;
      background: #ffffff;
      border: 1.5px solid var(--border);
      color: var(--text-secondary);
    }
    
    .message-btn:hover {
      border-color: #1C4FC3;
      color: #1C4FC3;
      background: rgba(28, 79, 195, 0.05);
    }
    
    /* --- States --- */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 24px;
      text-align: center;
      background: #ffffff;
      border-radius: 24px;
      border: 1px dashed var(--border);
    }
    
    .empty-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: var(--surface-input);
      border-radius: 50%;
      color: var(--text-muted);
      margin-bottom: 24px;
    }
    
    .empty-state h3 {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }
    
    .empty-state p {
      color: var(--text-muted);
      font-size: 14px;
      max-width: 300px;
      margin: 0;
    }
    
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 100px 0;
      color: #1C4FC3;
    }
    
    .spinner {
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    .loading-state p {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    
    /* --- Animations --- */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUpFade {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
      .search-section { flex-direction: column; align-items: stretch; }
      .role-filter { flex: 1; }
    }
  `]
})
export class UserDiscoveryComponent implements OnInit {

  searchQuery = '';
  roleFilter = '';
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  currentUserId = '';
  connectionStatus: { [key: number]: 'CONNECTED' | 'PENDING' | null } = {};
  roles = ['USER', 'ENTREPRENEUR', 'EXPERT', 'MENTOR', 'INVESTOR', 'PARTNER', 'ADMIN'];

  constructor(
    private router: Router,
    private connectionService: ConnectionService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUserId = this.authService.getUserId()?.toString() || '';
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        // Exclure l'utilisateur actuel
        this.allUsers = users.filter(u => u.id.toString() !== this.currentUserId);
        this.filteredUsers = [...this.allUsers];
        this.loading = false;
        this.checkConnections();
      },
      error: () => {
        this.loading = false;
        console.error('Erreur lors du chargement des membres');
        alert("Erreur lors du chargement des membres");
      }
    });
  }

  checkConnections() {
    this.connectionService.getAllConnections(this.currentUserId).subscribe(connections => {
      connections.forEach(c => {
        const otherId = c.requesterId === this.currentUserId ? c.targetId : c.requesterId;
        if (c.status === 'ACCEPTED') {
          this.connectionStatus[parseInt(otherId)] = 'CONNECTED';
        } else if (c.status === 'PENDING') {
          this.connectionStatus[parseInt(otherId)] = 'PENDING';
        }
      });
    });
  }

  filterUsers() {
    let users = this.allUsers;
    if (this.roleFilter) {
      users = users.filter(u => u.role === this.roleFilter);
    }
    if (this.searchQuery.trim()) {
      const sq = this.searchQuery.toLowerCase();
      users = users.filter(u =>
        (u.name && u.name.toLowerCase().includes(sq)) ||
        (u.prenom && u.prenom.toLowerCase().includes(sq))
      );
    }
    this.filteredUsers = users;
  }

  sendConnectionRequest(user: User) {
    this.connectionService.sendRequest(this.currentUserId, user.id.toString(),
      `Bonjour ${user.prenom}, j'aimerais me connecter avec vous.`
    ).subscribe({
      next: () => {
        this.connectionStatus[user.id] = 'PENDING';
        alert('Demande de connexion envoyée !');
      },
      error: () => {
        alert("Erreur lors de l'envoi de la demande");
      }
    });
  }

  goToMessage(user: User) {
    this.router.navigate(['/community/messaging/private', user.id]);
  }

  formatRole(role: string): string {
    if (!role) return '';
    const formatted = role.toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  getRoleClass(role: string): string {
    if (!role) return 'role-user';
    return `role-${role.toLowerCase()}`;
  }
}
