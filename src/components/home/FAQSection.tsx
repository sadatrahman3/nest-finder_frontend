"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I book a property?",
    answer:
      "Simply browse our listings, find a property you love, and click 'View Details'. From there, you can check availability and follow the booking instructions. Our team will guide you through the process.",
  },
  {
    question: "Can I list my own property?",
    answer:
      "Yes! Anyone can list their property on NestFinder. Just create an account, click 'List Property', and fill out the required information. Your listing will go live after a quick review.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation policies vary by property. Most listings offer free cancellation up to 48 hours before check-in. You can find the specific cancellation policy on each property's detail page.",
  },
  {
    question: "Are the properties verified?",
    answer:
      "Yes, all properties on NestFinder go through a verification process. We check photos, descriptions, and amenities to ensure they match what is advertised.",
  },
  {
    question: "How do I contact the host?",
    answer:
      "Once you have made a booking, you can communicate directly with the host through our messaging system. You can also reach out before booking to ask questions about the property.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">Frequently Asked Questions</h2>
          <p className="text-muted">Got questions? We have answers</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <span className="font-medium text-dark">{faq.question}</span>
                <span className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-muted">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
