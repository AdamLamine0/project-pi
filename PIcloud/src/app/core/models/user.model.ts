export interface User {
  id: number;
  name: string;
  prenom: string;
  email: string;
  dateInscription: string;
  statut: string;
  role: 'USER' | 'ADMIN' | 'MENTOR' | 'PARTENAIRE' | 'ENTREPRENEUR' | 'INVESTISSEUR' | 'ETUDIANT';
}

export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  MENTOR = 'ROLE_MENTOR',
  PARTENAIRE = 'ROLE_PARTENAIRE',
  ENTREPRENEUR = 'ROLE_ENTREPRENEUR',  // ← ajoute
  INVESTISSEUR = 'ROLE_INVESTISSEUR',  // ← ajoute
  ETUDIANT = 'ROLE_ETUDIANT'           // ← ajoute
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