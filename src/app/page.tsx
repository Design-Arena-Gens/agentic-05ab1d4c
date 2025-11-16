"use client";

import DonationForm from "@/components/DonationForm";
import DonationList from "@/components/DonationList";
import ImpactSettings from "@/components/ImpactSettings";
import ImportExport from "@/components/ImportExport";
import ImpactChart from "@/components/ImpactChart";
import { useStore, computeImpact } from "@/lib/store";
import { StatCard } from "@/components/StatCard";

export default function Page() {
  const donations = useStore((s) => s.donations);
  const impact = useStore((s) => s.impact);
  const stats = computeImpact(donations, impact);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Track Impact</h1>
          <p className="text-sm text-gray-600">Donation tracker for Orange Blossom Alliance</p>
        </div>
        <ImportExport />
      </section>

      <DonationForm />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total raised" value={`$${stats.total.toFixed(2)}`} />
        <StatCard label="Meals funded" value={Math.floor(stats.meals)} />
        <StatCard label="Shelter nights" value={Math.floor(stats.shelterNights)} />
        <StatCard label="Therapy sessions" value={Math.floor(stats.therapySessions)} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ImpactChart />
        </div>
        <ImpactSettings />
      </section>

      <DonationList />
    </div>
  );
}
