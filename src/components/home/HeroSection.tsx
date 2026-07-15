"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Find Your Perfect Nest",
    subtitle: "Discover amazing rental properties across the United States",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600",
  },
  {
    title: "Luxury Living Awaits",
    subtitle: "From cozy cabins to stunning penthouses",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600",
  },
  {
    title: "Your Home Away From Home",
    subtitle: "Book unique stays in top destinations",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-dark/60" />
        </div>
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {slides[current].title}
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl">
          {slides[current].subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/explore"
            className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Explore Properties
          </Link>
          <Link
            href="/register"
            className="bg-white text-dark px-8 py-3 rounded-xl text-lg font-medium hover:bg-slate-100 transition-colors"
          >
            List Your Property
          </Link>
        </div>
        <div className="flex space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current ? "bg-primary" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
