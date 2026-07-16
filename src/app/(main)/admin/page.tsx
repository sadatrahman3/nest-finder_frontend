"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Item, User } from "@/types";
import Badge from "@/components/ui/Badge";

type Tab = "properties" | "users";

export default function AdminPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("properties");
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [user, loading, router]);

  const fetchItems = async () => {
    if (!token) return;
    try {
      const response = (await api.admin.getAllItems(token)) as { data: Item[] };
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items");
    } finally {
      setItemsLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const response = (await api.admin.getAllUsers(token)) as { data: User[] };
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchItems();
      fetchUsers();
    }
  }, [token]);

  const handleDeleteItem = async (id: string) => {
    if (!token || !confirm("Delete this property and all its reviews?")) return;
    setActionLoading(id);
    try {
      await api.items.delete(token, id);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete item");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!token || !confirm("Delete this user and all their properties?")) return;
    setActionLoading(id);
    try {
      await api.admin.deleteUser(token, id);
      setUsers(users.filter((u) => u._id !== id));
      setItems(items.filter((item) => {
        const owner = typeof item.owner === "object" ? item.owner : null;
        return owner?._id !== id;
      }));
    } catch (error) {
      console.error("Failed to delete user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    if (!token) return;
    setActionLoading(id);
    try {
      const response = (await api.admin.toggleFeatured(token, id)) as { data: Item };
      setItems(items.map((item) =>
        item._id === id ? { ...item, featured: response.data.featured } : item
      ));
    } catch (error) {
      console.error("Failed to toggle featured");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleAvailable = async (id: string) => {
    if (!token) return;
    setActionLoading(id);
    try {
      const response = (await api.admin.toggleAvailable(token, id)) as { data: Item };
      setItems(items.map((item) =>
        item._id === id ? { ...item, available: response.data.available } : item
      ));
    } catch (error) {
      console.error("Failed to toggle availability");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Admin Panel</h1>
          <p className="text-muted">Full control over properties and users</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("properties")}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "properties"
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-dark"
            }`}
          >
            Properties ({items.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "users"
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-dark"
            }`}
          >
            Users ({users.length})
          </button>
        </div>

        {activeTab === "properties" && (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {itemsLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              </div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center text-muted">No properties found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        Property
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        Owner
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-dark">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.map((item) => {
                      const owner = typeof item.owner === "object" ? item.owner : null;
                      return (
                        <tr key={item._id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-dark">{item.title}</div>
                            <div className="text-sm text-muted">{item.location}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted">
                            {owner?.name || "Unknown"}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="primary">{item.category}</Badge>
                          </td>
                          <td className="px-6 py-4 text-dark font-medium">
                            ${item.price}/night
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleToggleFeatured(item._id)}
                                disabled={actionLoading === item._id}
                                className="text-left"
                              >
                                <Badge variant={item.featured ? "secondary" : "default"}>
                                  {item.featured ? "Featured" : "Not Featured"}
                                </Badge>
                              </button>
                              <button
                                onClick={() => handleToggleAvailable(item._id)}
                                disabled={actionLoading === item._id}
                                className="text-left"
                              >
                                <Badge variant={item.available ? "success" : "danger"}>
                                  {item.available ? "Available" : "Unavailable"}
                                </Badge>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/items/${item._id}`}
                                className="px-3 py-1.5 text-sm bg-slate-100 text-dark rounded-lg hover:bg-slate-200 transition-colors"
                              >
                                View
                              </Link>
                              <Link
                                href={`/items/${item._id}/edit`}
                                className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDeleteItem(item._id)}
                                disabled={actionLoading === item._id}
                                className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
                              >
                                {actionLoading === item._id ? "..." : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {usersLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center text-muted">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-dark">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-dark">{u.name}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">{u.email}</td>
                        <td className="px-6 py-4">
                          <Badge variant={u.role === "admin" ? "secondary" : "default"}>
                            {u.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">
                          {new Date(u.createdAt || "").toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {u.role !== "admin" ? (
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              disabled={actionLoading === u._id}
                              className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
                            >
                              {actionLoading === u._id ? "..." : "Delete"}
                            </button>
                          ) : (
                            <span className="text-sm text-muted">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
