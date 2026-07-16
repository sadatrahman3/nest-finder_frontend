"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Item } from "@/types";
import ItemForm from "@/components/items/ItemForm";

export default function EditItemPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [itemLoading, setItemLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = (await api.items.getById(params.id as string)) as {
          data: Item;
        };
        setItem(response.data);
      } catch (error) {
        console.error("Failed to fetch item");
        router.push("/items/manage");
      } finally {
        setItemLoading(false);
      }
    };
    if (params.id) fetchItem();
  }, [params.id, router]);

  if (loading || itemLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !item) return null;

  const isOwner = typeof item.owner === "object"
    ? item.owner._id === user._id
    : item.owner === user._id;

  if (!isOwner && user.role !== "admin") {
    router.push("/items/manage");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Edit Property</h1>
        <p className="text-muted mb-8">Update your property details</p>
        <div className="bg-white rounded-xl border border-border p-8">
          <ItemForm initialData={item as unknown as Record<string, unknown>} isEdit itemId={item._id} />
        </div>
      </div>
    </div>
  );
}
