import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // pagination
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.isLoading = true;
    try {
      this.users = await this.userService.getAllUsers();
      this.filteredUsers = [...this.users];
    } catch (error: any) {
      this.errorMessage = 'Failed to load users';
    } finally {
      this.isLoading = false;
    }
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRole = this.selectedRole === '' ||
        user.role === this.selectedRole;

      return matchesSearch && matchesRole;
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

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  editUser(user: User): void {
    this.router.navigate(['/user/edit', user.id]);
  }

  async deleteUser(id: number): Promise<void> {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await this.userService.deleteUser(id);
      this.successMessage = 'User deleted successfully';
      this.users = this.users.filter(u => u.id !== id);
      this.filterUsers();
      setTimeout(() => this.successMessage = '', 3000);
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Delete failed';
    }
  }
}