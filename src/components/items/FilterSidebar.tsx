"use client";

import { useState } from "react";

interface FilterSidebarProps {
  onFilter: (filters: Record<string, string>) => void;
  initialFilters?: Record<string, string>;
}

const categories = [
  "Apartment",
  "House",
  "Villa",
  "Cabin",
  "Loft",
  "Condo",
  "Townhouse",
  "Studio",
];

const locations = [
  "New York",
  "Los Angeles",
  "Miami",
  "Chicago",
  "San Francisco",
  "Denver",
  "Austin",
  "Seattle",
];

export default function FilterSidebar({
  onFilter,
  initialFilters = {},
}: FilterSidebarProps) {
  const [category, setCategory] = useState(initialFilters.category || "");
  const [location, setLocation] = useState(initialFilters.location || "");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || "");
  const [minRating, setMinRating] = useState(initialFilters.minRating || "");

  const handleApply = () => {
    const filters: Record<string, string> = {};
    if (category) filters.category = category;
    if (location) filters.location = location;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (minRating) filters.minRating = minRating;
    onFilter(filters);
  };

  const handleClear = () => {
    setCategory("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    onFilter({});
  };

  return (
    <div className="bg-white border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-dark mb-4">Filters</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Minimum Rating
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className="flex-1 bg-primary text-white py-2 rounded-xl hover:bg-primary-dark transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-border rounded-xl hover:bg-slate-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
