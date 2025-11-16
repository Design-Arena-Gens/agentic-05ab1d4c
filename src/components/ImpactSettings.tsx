"use client";

import { useStore } from "@/lib/store";

export default function ImpactSettings() {
  const impact = useStore((s) => s.impact);
  const update = useStore((s) => s.updateImpact);

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Impact multipliers</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-sm text-gray-600">Meals per $1
          <input className="input mt-1" type="number" step="0.01" value={impact.mealsPerDollar} onChange={(e) => update({ mealsPerDollar: Number(e.target.value) })} />
        </label>
        <label className="text-sm text-gray-600">Shelter nights per $1
          <input className="input mt-1" type="number" step="0.001" value={impact.shelterNightsPerDollar} onChange={(e) => update({ shelterNightsPerDollar: Number(e.target.value) })} />
        </label>
        <label className="text-sm text-gray-600">Therapy sessions per $1
          <input className="input mt-1" type="number" step="0.01" value={impact.therapySessionsPerDollar} onChange={(e) => update({ therapySessionsPerDollar: Number(e.target.value) })} />
        </label>
      </div>
    </div>
  );
}
