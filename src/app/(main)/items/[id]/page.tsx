"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { Item } from "@/types";
import Badge from "@/components/ui/Badge";
import ReviewsSection from "@/components/items/ReviewsSection";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const fetchItem = async () => {
    try {
      const response = (await api.items.getById(params.id as string)) as {
        data: Item;
      };
      setItem(response.data);
    } catch (error) {
      console.error("Failed to fetch item");
      router.push("/explore");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/explore"
          className="text-primary hover:text-primary-dark mb-4 inline-block"
        >
          ← Back to Explore
        </Link>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative">
              <div className="relative h-96 lg:h-full">
                <Image
                  src={item.images[selectedImage] || "/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {item.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  {item.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${
                        index === selectedImage
                          ? "border-primary"
                          : "border-white"
                      }`}
                    >
                      <Image
                        src={item.images[index]}
                        alt={`Image ${index + 1}`}
                        width={64}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary">{item.category}</Badge>
                {item.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-dark mb-2">
                {item.title}
              </h1>

              <p className="text-muted mb-4">{item.location}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">
                    {item.rating > 0 ? item.rating.toFixed(1) : "New"}
                  </span>
                  {item.numReviews > 0 && (
                    <span className="text-muted">
                      ({item.numReviews} reviews)
                    </span>
                  )}
                </div>
                <span className="text-muted">•</span>
                <span className="text-muted">{item.address}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <div className="text-lg font-semibold text-dark">
                    {item.bedrooms}
                  </div>
                  <div className="text-sm text-muted">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-dark">
                    {item.bathrooms}
                  </div>
                  <div className="text-sm text-muted">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-dark">
                    {item.guests}
                  </div>
                  <div className="text-sm text-muted">Guests</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-2">
                  ${item.price} / night
                </h3>
              </div>

              <p className="text-muted mb-6">{item.fullDescription}</p>

              {item.amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-dark mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 rounded-full text-sm text-dark"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ReviewsSection
            itemId={item._id}
            reviews={item.reviews}
            onReviewAdded={fetchItem}
          />
        </div>
      </div>
    </div>
  );
}
