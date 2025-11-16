"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useStore } from "@/lib/store";

export default function DonationForm() {
  const addDonation = useStore((s) => s.addDonation);
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [designation, setDesignation] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!isFinite(parsed) || parsed <= 0) return;
    addDonation({
      donorName: donorName || "Anonymous",
      amount: Math.round(parsed * 100) / 100,
      date: new Date(date).toISOString(),
      designation: designation || undefined,
      notes: notes || undefined,
    });
    setDonorName("");
    setAmount("");
    setDesignation("");
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 p-4 sm:grid-cols-2 lg:grid-cols-6">
      <input className="input" placeholder="Donor name" value={donorName} onChange={(e) => setDonorName(e.target.value)} />
      <input className="input" placeholder="Amount (USD)" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input className="input" placeholder="Designation (optional)" value={designation} onChange={(e) => setDesignation(e.target.value)} />
      <input className="input sm:col-span-2 lg:col-span-2" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit" className="btn-primary lg:col-span-1 sm:col-span-1">Add Donation</button>
      <style jsx global>{`
        .input { @apply w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-oba-primary focus:outline-none; }
        .btn-primary { @apply inline-flex items-center justify-center rounded-lg bg-oba-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 active:scale-[.99]; }
      `}</style>
    </form>
  );
}
