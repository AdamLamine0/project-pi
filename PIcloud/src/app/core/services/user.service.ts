import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8090/api/users';

  constructor(private http: HttpClient) {}

  async getAllUsers(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(this.apiUrl));
  }

  async getUserById(id: number): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${this.apiUrl}/${id}`));
  }

  async updateUser(user: User): Promise<User> {
    return firstValueFrom(this.http.put<User>(this.apiUrl, user));
  }

  async deleteUser(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
  
  async setPassword(id: number, password: string): Promise<void> {
  return firstValueFrom(
    this.http.post<void>(`${this.apiUrl}/${id}/set-password`, { password }, {
      responseType: 'text' as 'json'
    })
  );
}

  async changePassword(id: number, oldPassword: string, newPassword: string): Promise<void> {
    return firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/${id}/change-password`, {
        oldPassword,
        newPassword
      })
    );
  }
}