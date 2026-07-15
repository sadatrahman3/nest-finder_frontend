"use client";

import Link from "next/link";

const categories = [
  { name: "Apartment", icon: "🏢", count: 150 },
  { name: "House", icon: "🏠", count: 120 },
  { name: "Villa", icon: "🏛️", count: 80 },
  { name: "Cabin", icon: "🛖", count: 65 },
  { name: "Loft", icon: "🏗️", count: 45 },
  { name: "Condo", icon: "🏙️", count: 90 },
  { name: "Townhouse", icon: "🏘️", count: 55 },
  { name: "Studio", icon: "🎨", count: 40 },
];

export default function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">Browse by Category</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Find the perfect property type for your next stay
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/explore?category=${category.name}`}
              className="bg-white border border-border rounded-xl p-6 text-center hover:border-primary hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-dark">{category.name}</h3>
              <p className="text-sm text-muted">{category.count} listings</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
