"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Item } from "@/types";
import AnalyticsChart from "@/components/charts/AnalyticsChart";

export default function ManageItemsPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const fetchItems = async () => {
    if (!token) return;
    try {
      const response = (await api.items.getMyItems(token)) as { data: Item[] };
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items");
    } finally {
      setItemsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchItems();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this item?")) return;
    setDeleting(id);
    try {
      await api.items.delete(token, id);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete item");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">Manage Properties</h1>
            <p className="text-muted">View and manage your listed properties</p>
          </div>
          <Link
            href="/items/add"
            className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            + Add Property
          </Link>
        </div>

        <div className="mb-8">
          <AnalyticsChart />
        </div>

        {itemsLoading ? (
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <p className="text-muted mb-4">You haven&apos;t listed any properties yet</p>
            <Link
              href="/items/add"
              className="text-primary hover:text-primary-dark font-medium"
            >
              Add your first property →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                      Property
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-dark">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-dark">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 text-muted">{item.category}</td>
                      <td className="px-6 py-4 text-muted">{item.location}</td>
                      <td className="px-6 py-4 text-dark font-medium">
                        ${item.price}/night
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-yellow-500">★</span>{" "}
                        {item.rating > 0 ? item.rating.toFixed(1) : "New"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/items/${item._id}`}
                            className="px-3 py-1.5 text-sm bg-slate-100 text-dark rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={deleting === item._id}
                            className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
                          >
                            {deleting === item._id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
