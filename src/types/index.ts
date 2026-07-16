export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt?: string;
}

export interface Review {
  _id: string;
  user: User;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Item {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  location: string;
  address: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  rating: number;
  numReviews: number;
  reviews: Review[];
  owner: User;
  featured: boolean;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

export interface Stats {
  totalItems: number;
  totalLocations: number;
  totalCategories: number;
  avgPrice: number;
}
