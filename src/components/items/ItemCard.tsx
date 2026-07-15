"use client";

import Link from "next/link";
import Image from "next/image";
import { Item } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={item.images[0] || "/placeholder.jpg"}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {item.featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">Featured</Badge>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="primary">{item.category}</Badge>
          <span className="text-sm text-muted">{item.location}</span>
        </div>
        <h3 className="text-lg font-semibold text-dark mb-1 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-sm text-muted mb-3 line-clamp-2">
          {item.shortDescription}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted mb-3">
          <span>{item.bedrooms} bed</span>
          <span>{item.bathrooms} bath</span>
          <span>{item.guests} guests</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">
              ${item.price}
            </span>
            <span className="text-sm text-muted"> / night</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">
              {item.rating > 0 ? item.rating.toFixed(1) : "New"}
            </span>
            {item.numReviews > 0 && (
              <span className="text-sm text-muted">
                ({item.numReviews})
              </span>
            )}
          </div>
        </div>
        <Link
          href={`/items/${item._id}`}
          className="mt-3 block text-center bg-dark text-white py-2 rounded-xl hover:bg-slate-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}
