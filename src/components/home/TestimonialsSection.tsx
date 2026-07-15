"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Emily Chen",
    role: "Travel Blogger",
    avatar: "https://i.pravatar.cc/150?img=9",
    content:
      "NestFinder made our family vacation absolutely perfect. The villa we booked in Miami was stunning and exactly as described. Will definitely use again!",
    rating: 5,
  },
  {
    name: "Michael Torres",
    role: "Business Traveler",
    avatar: "https://i.pravatar.cc/150?img=12",
    content:
      "As someone who travels frequently for work, I appreciate the quality and consistency of NestFinder listings. The search filters save me so much time.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Digital Nomad",
    avatar: "https://i.pravatar.cc/150?img=16",
    content:
      "I have been using NestFinder for my monthly relocations. The properties are always clean, well-maintained, and in great locations. Highly recommend!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">What Our Guests Say</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Real reviews from real travelers
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-border rounded-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <img
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="flex justify-center mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <span key={i} className="text-yellow-500 text-xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-lg text-dark mb-6 italic">
              &ldquo;{testimonials[current].content}&rdquo;
            </p>
            <div className="font-semibold text-dark">{testimonials[current].name}</div>
            <div className="text-muted text-sm">{testimonials[current].role}</div>
          </div>
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? "bg-primary" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
