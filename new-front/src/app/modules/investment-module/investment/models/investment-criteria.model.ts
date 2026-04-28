export interface InvestmentCriteria {
  id?: string;
  name?: string;
  investorId: string;
  sectors: string[];
  stages: string[];
  minBudget: number;
  maxBudget: number;
  location: string;
  presentationPdfUrl?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
