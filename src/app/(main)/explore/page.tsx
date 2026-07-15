"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Item, Pagination } from "@/types";
import ItemGrid from "@/components/items/ItemGrid";
import FilterSidebar from "@/components/items/FilterSidebar";
import PaginationUI from "@/components/ui/Pagination";

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [filters, setFilters] = useState<Record<string, string>>({
    category: initialCategory,
  });
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const fetchItems = async (page = 1) => {
    setLoading(true);
    try {
      const params: Record<string, string> = {
        page: String(page),
        limit: "12",
        sort,
      };
      if (search) params.search = search;
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });

      const response = (await api.items.getAll(params)) as {
        data: Item[];
        pagination: Pagination;
      };
      setItems(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(1);
  }, [filters, sort]);

  const handleFilter = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchItems(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">
            Explore Properties
          </h1>
          <p className="text-muted">Find your perfect rental property</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or location..."
              className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar onFilter={handleFilter} initialFilters={filters} />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted">
                {pagination.total} properties found
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <ItemGrid items={items} loading={loading} />

            <PaginationUI
              page={pagination.page}
              pages={pagination.pages}
              onPageChange={fetchItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
