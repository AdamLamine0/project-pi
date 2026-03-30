export enum TypePartenaire {
  ACADEMIQUE = 'ACADEMIQUE',
  INCUBATEUR = 'INCUBATEUR',
  PUBLIC     = 'PUBLIC',
  ENTREPRISE = 'ENTREPRISE',
  ASSOCIATIF = 'ASSOCIATIF'
}

export enum StatutPartenaire {
    EN_ATTENTE = 'EN_ATTENTE',
    ACTIF='ACTIF',
    SUSPENDU='SUSPENDU',
    RESILIER='RESILIER'
}

export interface OrganisationPartenaire{
    id : number;
    nom : string;
    type: TypePartenaire;
    description: string;
    siteWeb: string;
    contactEmail: string;
    region: string;
    userID : number|null;
    statut: StatutPartenaire;
}

export interface OrganisationPartenaireRequest {
  nom: string;
  type: TypePartenaire;
  description?: string;
  siteWeb?: string;
  contactNom: string;
  contactEmail: string;
  region?: string;
  userId?: number | null;
}

export interface ContactInfoRequest {
  nom: string;          // still required by @NotBlank on the backend
  type: TypePartenaire; // still required by @NotNull on the backend
  contactNom: string;
  contactEmail: string;
  siteWeb?: string;
}