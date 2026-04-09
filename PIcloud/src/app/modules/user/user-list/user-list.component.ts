import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Role, User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  selectedRole: Role | '' = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  roles: Role[] = Object.values(Role) as Role[];

  currentPage = 1;
  pageSize = 8;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      this.users = await this.userService.getAllUsers();
      this.applyFilter();
    } catch {
      this.errorMessage = 'Impossible de charger les utilisateurs.';
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(): void {
    const t = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(u => {
      const matchText =
        (u.name ?? '').toLowerCase().includes(t) ||
        (u.prenom ?? '').toLowerCase().includes(t) ||
        (u.email ?? '').toLowerCase().includes(t);

      const matchRole = !this.selectedRole || u.role === this.selectedRole;
      return matchText && matchRole;
    });
    this.currentPage = 1;
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(p: number): void {
    this.currentPage = p;
  }

  goToCreate(): void {
    this.router.navigate(['/user/form']);
  }

  goToEdit(id: number | null | undefined): void {
    if (id == null) return;
    this.router.navigate(['/user/form', id]);
  }

  async deleteUser(id: number | null | undefined): Promise<void> {
    if (id == null) return;
    if (!confirm('Supprimer cet utilisateur ?')) return;

    try {
      await this.userService.deleteUser(id);
      this.users = this.users.filter(u => u.id !== id);
      this.applyFilter();
      this.flash('Utilisateur supprimé avec succès.');
    } catch {
      this.errorMessage = 'Échec de la suppression.';
    }
  }

  flash(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => (this.successMessage = ''), 4000);
  }

  badgeClass(role: Role | string | null | undefined): string {
    const map: Record<string, string> = {
      ADMIN: 'badge-admin',
      USER: 'badge-user',
      MENTOR: 'badge-mentor',
      INVESTOR: 'badge-investor',
      PARTNER: 'badge-partner'
    };
    return map[String(role ?? '')] ?? 'badge-user';
  }
}