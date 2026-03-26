export interface User {
  id: number;
  name: string;
  prenom: string;
  email: string;
  dateInscription: string;
  statut: string;
  role: 'USER' | 'ADMIN' | 'MENTOR' | 'PARTENAIRE';  // ← add the missing roles
}

export enum Role {
  USER = 'USER',          // ← remove ROLE_ prefix, match what DB stores
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR',
  PARTENAIRE = 'PARTENAIRE'
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