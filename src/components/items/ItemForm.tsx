"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface ItemFormProps {
  initialData?: Record<string, unknown>;
  isEdit?: boolean;
  itemId?: string;
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

export default function ItemForm({
  initialData,
  isEdit = false,
  itemId,
}: ItemFormProps) {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: (initialData?.title as string) || "",
    shortDescription: (initialData?.shortDescription as string) || "",
    fullDescription: (initialData?.fullDescription as string) || "",
    price: (initialData?.price as number) || 0,
    category: (initialData?.category as string) || "Apartment",
    location: (initialData?.location as string) || "",
    address: (initialData?.address as string) || "",
    bedrooms: (initialData?.bedrooms as number) || 1,
    bathrooms: (initialData?.bathrooms as number) || 1,
    guests: (initialData?.guests as number) || 2,
    images: ((initialData?.images as string[]) || []).join(", "),
    amenities: ((initialData?.amenities as string[]) || []).join(", "),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Please login to continue");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const data = {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        guests: Number(form.guests),
        images: form.images
          ? form.images.split(",").map((s) => s.trim())
          : [],
        amenities: form.amenities
          ? form.amenities.split(",").map((s) => s.trim())
          : [],
      };

      if (isEdit && itemId) {
        await api.items.update(token, itemId, data);
      } else {
        await api.items.create(token, data);
      }
      router.push("/items/manage");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter property title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Short Description *
        </label>
        <input
          type="text"
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          required
          maxLength={200}
          className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Brief description (max 200 chars)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Full Description *
        </label>
        <textarea
          name="fullDescription"
          value={form.fullDescription}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Detailed description of the property"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Price per Night ($) *
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min={0}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Category *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="City name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Address *
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Full address"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Bedrooms *
          </label>
          <input
            type="number"
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            required
            min={0}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Bathrooms *
          </label>
          <input
            type="number"
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            required
            min={0}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Guests *
          </label>
          <input
            type="number"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            required
            min={1}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Image URLs (comma separated)
        </label>
        <input
          type="text"
          name="images"
          value={form.images}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Amenities (comma separated)
        </label>
        <input
          type="text"
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="WiFi, Pool, Kitchen, Parking"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark disabled:opacity-50 transition-colors"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Property"
          : "Add Property"}
      </button>
    </form>
  );
}
