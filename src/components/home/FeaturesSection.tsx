const features = [
  {
    icon: "🔍",
    title: "Easy Search",
    description: "Find properties by location, price, category, and more with our powerful search filters.",
  },
  {
    icon: "🏠",
    title: "Verified Listings",
    description: "Every property is verified by our team to ensure quality and accuracy.",
  },
  {
    icon: "💰",
    title: "Best Prices",
    description: "Competitive pricing with no hidden fees. Know exactly what you pay for.",
  },
  {
    icon: "🛡️",
    title: "Secure Booking",
    description: "Your payments and personal information are always protected.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">Why Choose NestFinder?</h2>
          <p className="text-muted max-w-2xl mx-auto">
            We make finding your perfect rental property simple, safe, and enjoyable
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-dark mb-2">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
