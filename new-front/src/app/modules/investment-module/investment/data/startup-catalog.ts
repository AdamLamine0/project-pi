export type StartupCatalogEntry = {
  id: string;
  entrepreneurId: string;
  name: string;
  tagline: string;
  sector: string;
  stage: string;
  location: string;
};

export const STARTUP_CATALOG: StartupCatalogEntry[] = [
  {
    id: 's-001',
    entrepreneurId: '2',
    name: 'NovaPay',
    tagline: 'Payments infrastructure for emerging markets.',
    sector: 'Fintech',
    stage: 'Seed',
    location: 'Tunis',
  },
  {
    id: 's-002',
    entrepreneurId: '3',
    name: 'MedAIriage',
    tagline: 'AI triage assistant for clinics.',
    sector: 'Healthtech',
    stage: 'Series A',
    location: 'Paris',
  },
  {
    id: 's-003',
    entrepreneurId: '4',
    name: 'LogiFlow',
    tagline: 'Route optimization for last-mile delivery.',
    sector: 'Logistics',
    stage: 'Pre-Seed',
    location: 'Remote',
  },
  {
    id: 's-004',
    entrepreneurId: '5',
    name: 'GreenPulse',
    tagline: 'Energy monitoring for industrial sites.',
    sector: 'CleanTech',
    stage: 'Seed',
    location: 'Casablanca',
  },
  {
    id: 's-005',
    entrepreneurId: '6',
    name: 'SecureStack',
    tagline: 'Continuous security posture for SaaS teams.',
    sector: 'Cybersecurity',
    stage: 'Series B',
    location: 'Berlin',
  },
  {
    id: 's-006',
    entrepreneurId: '7',
    name: 'ClassCrafted',
    tagline: 'Skills-focused learning for schools.',
    sector: 'Edtech',
    stage: 'Seed',
    location: 'Lyon',
  },
];

export const STARTUP_CATALOG_BY_ID = Object.fromEntries(
  STARTUP_CATALOG.map((startup) => [startup.id, startup])
) as Record<string, StartupCatalogEntry>;

export function getEntrepreneurIdByStartup(startupId: string): string | null {
  const startup = STARTUP_CATALOG_BY_ID[startupId];
  return startup ? startup.entrepreneurId : null;
}

export function getStartupByEntrepreneurId(
  entrepreneurId: string
): StartupCatalogEntry | null {
  return STARTUP_CATALOG.find(
    (startup) => startup.entrepreneurId === entrepreneurId
  ) || null;
}
