export type Donation = {
  id: string;
  donorName: string;
  amount: number; // USD
  date: string; // ISO string
  designation?: string;
  notes?: string;
};

export type ImpactSettings = {
  mealsPerDollar: number; // e.g., 0.2 => $5 per meal
  shelterNightsPerDollar: number; // e.g., 0.01 => $100 per night
  therapySessionsPerDollar: number; // e.g., 0.04 => $25 per session
};

export type TrackerState = {
  donations: Donation[];
  impact: ImpactSettings;
};
