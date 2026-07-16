const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface RequestOptions extends RequestInit {
  token?: string;
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (name: string, email: string, password: string) =>
      fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      }),
    getMe: (token: string) =>
      fetchAPI("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      }),
  },
  items: {
    getAll: (params?: Record<string, string>) => {
      const queryString = params
        ? "?" + new URLSearchParams(params).toString()
        : "";
      return fetchAPI(`/items${queryString}`);
    },
    getById: (id: string) => fetchAPI(`/items/${id}`),
    create: (token: string, data: Record<string, unknown>) =>
      fetchAPI("/items", {
        method: "POST",
        token,
        body: JSON.stringify(data),
      }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      fetchAPI(`/items/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: string) =>
      fetchAPI(`/items/${id}`, {
        method: "DELETE",
        token,
      }),
    getMyItems: (token: string) =>
      fetchAPI("/items/my-items", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    addReview: (token: string, id: string, data: Record<string, unknown>) =>
      fetchAPI(`/items/${id}/reviews`, {
        method: "POST",
        token,
        body: JSON.stringify(data),
      }),
  },
  stats: {
    get: () => fetchAPI("/stats"),
  },
  admin: {
    getAllUsers: (token: string) =>
      fetchAPI("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    deleteUser: (token: string, id: string) =>
      fetchAPI(`/admin/users/${id}`, {
        method: "DELETE",
        token,
      }),
    getAllItems: (token: string) =>
      fetchAPI("/admin/items", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    deleteReview: (token: string, itemId: string, reviewId: string) =>
      fetchAPI(`/admin/items/${itemId}/reviews/${reviewId}`, {
        method: "DELETE",
        token,
      }),
    toggleFeatured: (token: string, id: string) =>
      fetchAPI(`/admin/items/${id}/featured`, {
        method: "PATCH",
        token,
      }),
    toggleAvailable: (token: string, id: string) =>
      fetchAPI(`/admin/items/${id}/available`, {
        method: "PATCH",
        token,
      }),
  },
};
