import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';
import { UserService } from '../../services/user.service';
import { User, Role } from '../../../../../core/models/user.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-discovery',
  template: `
    <div class="discovery-container animate-fade-in-up">
      
      <!-- Header -->
      <div class="header-section glass-panel">
        <button mat-icon-button routerLink="/community/network" class="back-btn">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <div>
          <h1 class="page-title">Découvrir des membres</h1>
          <p class="page-subtitle">Trouvez et connectez-vous avec d'autres professionnels</p>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-section">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Rechercher par nom, rôle...</mat-label>
          <input matInput 
            [(ngModel)]="searchQuery" 
            (ngModelChange)="filterUsers()"
            placeholder="Ex: John, ENTREPRENEUR...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <mat-form-field appearance="outline" class="role-filter">
          <mat-label>Filtrer par rôle</mat-label>
          <mat-select [(ngModel)]="roleFilter" (selectionChange)="filterUsers()">
            <mat-option value="">Tous les rôles</mat-option>
            <mat-option *ngFor="let r of roles" [value]="r">{{r}}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <!-- Users Grid -->
      <div class="results-section">
        <h2 class="section-title">
          <mat-icon>people</mat-icon>
          Membres ({{ filteredUsers.length }})
        </h2>
        <div class="users-grid">
          <div *ngFor="let user of filteredUsers; let i = index"
            class="user-card hover-lift animate-fade-in-up"
            [style.animation-delay.ms]="i * 100">
            
            <div class="user-avatar">
              <mat-icon>person</mat-icon>
            </div>
            
            <div class="user-info">
              <h3>{{ user.name }} {{ user.prenom }}</h3>
              <p class="user-role">{{ user.role }}</p>
              <p class="user-sector">{{ user.email }}</p>
              <p class="user-bio">Membre depuis: {{ user.dateInscription | date:'mediumDate' }}</p>
              
              <div class="user-skills">
                <mat-chip class="skill-chip">
                  Statut: {{ user.statut || 'Actif' }}
                </mat-chip>
              </div>
            </div>
            
            <div class="user-actions">
              <button mat-raised-button 
                color="primary"
                class="connect-btn"
                [disabled]="connectionStatus[user.id] === 'CONNECTED' || connectionStatus[user.id] === 'PENDING'"
                (click)="sendConnectionRequest(user)">
                <mat-icon *ngIf="!connectionStatus[user.id]">person_add</mat-icon>
                <span *ngIf="!connectionStatus[user.id]">Se connecter</span>
                <span *ngIf="connectionStatus[user.id] === 'CONNECTED'">Connecté</span>
                <span *ngIf="connectionStatus[user.id] === 'PENDING'">Demande envoyée</span>
              </button>
            </div>
          </div>
        </div>
        
        <div *ngIf="filteredUsers.length === 0 && !loading" class="empty-state">
          <mat-icon>search_off</mat-icon>
          <h3>Aucun membre trouvé</h3>
          <p>Essayez de modifier vos filtres</p>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
        <p>Recherche en cours...</p>
      </div>

    </div>
  `,
  styles: [`
    .discovery-container { max-width: 1200px; margin: 40px auto; padding: 0 16px; }
    
    .header-section {
      display: flex; align-items: center; gap: 16px;
      padding: 24px; background: white; border-radius: 20px;
      border: 1px solid rgba(0,0,0,0.05); margin-bottom: 24px;
    }
    
    .search-section {
      display: flex; gap: 16px; align-items: flex-start;
      margin-bottom: 32px;
    }
    
    .search-field {
      flex: 1; background: white;
    }
    
    .search-btn {
      height: 56px; border-radius: 16px; font-weight: 600;
      min-width: 140px;
    }
    
    .section-title {
      display: flex; align-items: center; gap: 12px;
      font-size: 20px; font-weight: 700; color: var(--co-secondary);
      margin: 0 0 24px 0;
    }
    
    .users-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }
    
    .user-card {
      background: white; border-radius: 20px; padding: 24px;
      border: 1px solid rgba(0,0,0,0.05); transition: var(--transition-fast);
    }
    
    .user-avatar {
      width: 60px; height: 60px; border-radius: 50%;
      background: var(--co-primary-light); color: var(--co-primary);
      display: flex; justify-content: center; align-items: center;
      margin: 0 auto 16px;
    }
    
    .user-avatar mat-icon { font-size: 30px; width: 30px; height: 30px; }
    
    .user-info h3 {
      font-size: 18px; font-weight: 700; color: var(--co-secondary);
      margin: 0 0 8px 0; text-align: center;
    }
    
    .user-role {
      background: var(--co-primary-light); color: var(--co-primary);
      padding: 4px 12px; border-radius: 12px; font-size: 12px;
      font-weight: 600; text-align: center; margin: 0 0 8px 0;
    }
    
    .user-sector {
      color: var(--co-text-muted); font-size: 14px; text-align: center; margin: 0 0 8px 0;
    }
    
    .user-bio {
      color: var(--co-text-main); font-size: 14px; line-height: 1.5;
      text-align: center; margin: 0 0 16px 0; min-height: 60px;
    }
    
    .user-skills {
      display: flex; flex-wrap: wrap; gap: 6px; justify-content: center;
      margin-bottom: 16px;
    }
    
    .skill-chip {
      font-size: 11px; height: 24px; background: var(--co-background);
    }
    
    .more-skills {
      font-size: 11px; color: var(--co-text-muted); font-weight: 600;
    }
    
    .user-actions {
      text-align: center;
    }
    
    .connect-btn {
      border-radius: 16px; font-weight: 600; width: 100%;
      transition: var(--transition-fast);
    }
    
    .connect-btn:disabled {
      background: var(--co-background) !important; color: var(--co-text-muted) !important;
    }
    
    .empty-state {
      text-align: center; padding: 60px 40px; color: var(--co-text-muted);
    }
    
    .empty-state mat-icon {
      font-size: 48px; width: 48px; height: 48px;
      color: #CBD5E1; margin-bottom: 16px;
    }
    
    .empty-state h3 {
      font-size: 20px; font-weight: 700; margin: 0 0 8px 0;
    }
    
    .loading-state {
      text-align: center; padding: 60px; color: var(--co-text-muted);
    }
    
    .loading-state mat-icon {
      margin-bottom: 16px;
    }
    
    @media (max-width: 768px) {
      .search-section { flex-direction: column; }
      .search-btn { width: 100%; margin-top: 12px; }
      .users-grid { grid-template-columns: 1fr; }
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
  roles = ['USER', 'ADMIN', 'MENTOR', 'PARTENAIRE', 'ENTREPRENEUR', 'INVESTISSEUR', 'ETUDIANT'];

  constructor(
    private router: Router,
    private connectionService: ConnectionService,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

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
        this.snackBar.open('Erreur lors du chargement des membres', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
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
        this.snackBar.open('Demande de connexion envoyée !', 'OK', {
          duration: 3000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'envoi de la demande', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }
}
