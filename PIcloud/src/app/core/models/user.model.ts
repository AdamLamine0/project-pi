export interface User {
  id: number;
  name: string;
  prenom: string;
  email: string;
  dateInscription: string;
  statut: string;
  role: Role;
}

export enum Role {
  USER         = 'USER',
  ADMIN        = 'ADMIN',
  MENTOR       = 'MENTOR',
  INVESTOR     = 'INVESTOR',
  PARTNER      = 'PARTNER',
  ENTREPRENEUR = 'ENTREPRENEUR',
  EXPERT       = 'EXPERT',
  // Legacy aliases (kept for compatibility with existing code)
  PARTENAIRE   = 'PARTNER',
  INVESTISSEUR = 'INVESTOR',
  ETUDIANT     = 'USER'
}

export interface AdminCreateUserRequest {
  name: string;
  prenom: string;
  email: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  name: string;
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
