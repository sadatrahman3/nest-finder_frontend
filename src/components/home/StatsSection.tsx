"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Stats } from "@/types";

export default function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = (await api.stats.get()) as { data: Stats };
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { label: "Total Properties", value: stats?.totalItems || 0 },
    { label: "Locations", value: stats?.totalLocations || 0 },
    { label: "Categories", value: stats?.totalCategories || 0 },
    { label: "Avg. Price/Night", value: `$${stats?.avgPrice || 0}` },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">NestFinder in Numbers</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect stay
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
