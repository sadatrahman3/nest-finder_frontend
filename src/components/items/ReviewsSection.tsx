"use client";

import { useState } from "react";
import { Review } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface ReviewsSectionProps {
  itemId: string;
  reviews: Review[];
  onReviewAdded: () => void;
}

export default function ReviewsSection({
  itemId,
  reviews,
  onReviewAdded,
}: ReviewsSectionProps) {
  const { user, token } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Please login to leave a review");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.items.addReview(token, itemId, { rating, comment });
      setRating(5);
      setComment("");
      onReviewAdded();
    } catch (err: any) {
      setError(err.message || "Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-dark mb-6">
        Reviews ({reviews.length})
      </h3>

      {user && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl p-6 mb-8">
          <h4 className="font-medium text-dark mb-4">Leave a Review</h4>
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl mb-4">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-2">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`text-2xl ${
                    value <= rating ? "text-yellow-500" : "text-slate-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Share your experience..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark disabled:opacity-50 transition-colors"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted text-center py-8">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-dark">{review.name}</div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-500 text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
