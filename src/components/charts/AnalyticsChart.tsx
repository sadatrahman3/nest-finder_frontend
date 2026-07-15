"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", bookings: 40, revenue: 2400 },
  { name: "Feb", bookings: 30, revenue: 1398 },
  { name: "Mar", bookings: 20, revenue: 9800 },
  { name: "Apr", bookings: 27, revenue: 3908 },
  { name: "May", bookings: 18, revenue: 4800 },
  { name: "Jun", bookings: 23, revenue: 3800 },
  { name: "Jul", bookings: 34, revenue: 4300 },
];

export default function AnalyticsChart() {
  return (
    <div className="bg-white border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-dark mb-4">Monthly Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="bookings" fill="#0d9488" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
