"use client";

import React from "react";

export function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number | string;
  suffix?: string;
}) {
  const display = typeof value === "number" ? value.toLocaleString() : value;
  return (
    <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">
        {display}
        {suffix ? <span className="ml-1 text-base font-normal text-gray-500">{suffix}</span> : null}
      </div>
    </div>
  );
}
