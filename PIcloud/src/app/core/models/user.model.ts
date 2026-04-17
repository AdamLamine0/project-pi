export interface User {
  id: number;
  name: string;
  prenom: string;
  email: string;
  dateInscription: string;
  statut: string;
  role: Role;  // utilise l'enum au lieu d'un union type partiel
}

export enum Role {
  USER         = 'USER',
  ADMIN        = 'ADMIN',
  MENTOR       = 'MENTOR',
  INVESTOR     = 'INVESTOR',
  PARTNER      = 'PARTNER',
  ENTREPRENEUR = 'ENTREPRENEUR',
  EXPERT       = 'EXPERT'
}

export interface AdminCreateUserRequest {
  name: string;
  prenom: string;
  email: string;
  password: string;
  role: Role;
}

// ✅ Ajout de id, email, role
export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  role: Role;
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
  role?: Role | null;
}