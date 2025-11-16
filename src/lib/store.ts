"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { addDays, subDays } from "date-fns";
import type { Donation, ImpactSettings, TrackerState } from "@/lib/types";

const defaultImpact: ImpactSettings = {
  mealsPerDollar: 0.2,
  shelterNightsPerDollar: 0.01,
  therapySessionsPerDollar: 0.04,
};

const demoDonations = (): Donation[] => {
  const today = new Date();
  return [
    { id: uuidv4(), donorName: "Anonymous", amount: 50, date: subDays(today, 9).toISOString(), designation: "Meals" },
    { id: uuidv4(), donorName: "Riley M.", amount: 125, date: subDays(today, 7).toISOString(), designation: "Shelter" },
    { id: uuidv4(), donorName: "Jordan P.", amount: 25, date: subDays(today, 5).toISOString(), designation: "Therapy" },
    { id: uuidv4(), donorName: "Company Match", amount: 500, date: subDays(today, 2).toISOString() },
    { id: uuidv4(), donorName: "Anonymous", amount: 20, date: addDays(subDays(today, 1), 0).toISOString() },
  ];
};

export type Store = TrackerState & {
  addDonation: (input: Omit<Donation, "id">) => void;
  removeDonation: (id: string) => void;
  updateImpact: (impact: Partial<ImpactSettings>) => void;
  resetAll: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      donations: demoDonations(),
      impact: defaultImpact,
      addDonation: (input) =>
        set((s) => ({ donations: [{ id: uuidv4(), ...input }, ...s.donations] })),
      removeDonation: (id) =>
        set((s) => ({ donations: s.donations.filter((d) => d.id !== id) })),
      updateImpact: (impact) => set((s) => ({ impact: { ...s.impact, ...impact } })),
      resetAll: () => set({ donations: demoDonations(), impact: defaultImpact }),
    }),
    { name: "oba-track-impact" }
  )
);

export function computeImpact(donations: Donation[], impact: ImpactSettings) {
  const total = donations.reduce((sum, d) => sum + d.amount, 0);
  const meals = total * impact.mealsPerDollar;
  const shelterNights = total * impact.shelterNightsPerDollar;
  const therapySessions = total * impact.therapySessionsPerDollar;
  return {
    total,
    meals,
    shelterNights,
    therapySessions,
  };
}
