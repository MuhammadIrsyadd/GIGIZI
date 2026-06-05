"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { DailyLog } from "@/data/mockCommunity";

export const WeeklyTrends = () => {
  const logs = useMemo(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("gigizi_weekly_logs");
    return stored ? (JSON.parse(stored) as DailyLog[]) : [];
  }, []);

  if (logs.length === 0) return null;

  const data = logs.map(log => ({
    ...log,
    day: new Date(log.date).toLocaleDateString("id-ID", { weekday: 'short' })
  }));

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-text-dark/5 shadow-sm mt-8">
      <h3 className="text-xl font-playfair font-bold text-text-dark mb-6 text-center">
        Tren 7 Hari Terakhir
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: '#f3f4f6' }}
              contentStyle={{ borderRadius: '1rem', border: 'none' }}
            />
            <Bar dataKey="totalCalories" fill="#3D6B4F" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
