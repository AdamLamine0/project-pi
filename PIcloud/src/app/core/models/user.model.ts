export interface User {
  id: number;
  name: string;
  prenom: string;
  email: string;
  dateInscription: string;
  statut: string;
  role: 'USER' | 'ADMIN';
}
export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN'
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  prenom: string;
  email: string;
  password: string;
}