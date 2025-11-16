"use client";

import { useRef } from "react";
import { useStore } from "@/lib/store";
import type { TrackerState } from "@/lib/types";

export default function ImportExport() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const state = useStore((s) => ({ donations: s.donations, impact: s.impact }));
  const resetAll = useStore((s) => s.resetAll);

  function exportJson() {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orangeblossomalliance-donations.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as TrackerState;
        if (!data || !Array.isArray(data.donations) || !data.impact) throw new Error("Invalid file");
        localStorage.setItem("oba-track-impact", JSON.stringify({ state: data, version: 0 }));
        window.location.reload();
      } catch (e) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={exportJson} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50">Export JSON</button>
      <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50">Import JSON</button>
      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files && importJson(e.target.files[0])} />
      <button onClick={resetAll} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50">Reset demo data</button>
    </div>
  );
}
