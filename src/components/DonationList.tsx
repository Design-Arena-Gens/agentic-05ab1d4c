"use client";

import { format } from "date-fns";
import { useStore } from "@/lib/store";

export default function DonationList() {
  const donations = useStore((s) => s.donations);
  const remove = useStore((s) => s.removeDonation);

  if (donations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No donations yet. Use the form above to add your first donation.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Donor</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Designation</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Notes</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {donations.map((d) => (
            <tr key={d.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{format(new Date(d.date), "MMM d, yyyy")}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{d.donorName}</td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">${d.amount.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{d.designation || "?"}</td>
              <td className="px-4 py-3 text-sm text-gray-700 max-w-[20ch] truncate" title={d.notes}>{d.notes || ""}</td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => remove(d.id)} className="rounded-md border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
