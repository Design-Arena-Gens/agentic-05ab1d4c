"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { format } from "date-fns";
import { useMemo } from "react";
import { useStore } from "@/lib/store";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function ImpactChart() {
  const donations = useStore((s) => s.donations);

  const { labels, cumulative } = useMemo(() => {
    const sorted = [...donations].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const labels = sorted.map((d) => format(new Date(d.date), "MMM d"));
    const cumulative: number[] = [];
    let running = 0;
    for (const d of sorted) {
      running += d.amount;
      cumulative.push(Math.round(running * 100) / 100);
    }
    return { labels, cumulative };
  }, [donations]);

  const data = {
    labels,
    datasets: [
      {
        label: "Cumulative Donations (USD)",
        data: cumulative,
        fill: true,
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Cumulative donations</h3>
      <div className="mt-3">
        <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { ticks: { callback: (v) => `$${v}` } } } }} />
      </div>
    </div>
  );
}
