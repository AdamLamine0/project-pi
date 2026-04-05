export interface User {
  id: number;
  name: string;
  prenom: string;
  email: string;
  dateInscription: string;
  statut: string;
  role: 'USER' | 'ADMIN' | 'MENTOR' | 'INVESTOR' | 'PARTNER';
}

// Matches exactly what the DB stores (no ROLE_ prefix)
export enum Role {
  USER     = 'USER',
  ADMIN    = 'ADMIN',
  MENTOR   = 'MENTOR',
  INVESTOR = 'INVESTOR',
  PARTNER  = 'PARTNER'
}

// Sent to POST /api/users/admin/create
export interface AdminCreateUserRequest {
  name: string;
  prenom: string;
  email: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
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