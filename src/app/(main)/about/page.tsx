import Link from "next/link";

const team = [
  {
    name: "David Chen",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Maria Rodriguez",
    role: "Head of Operations",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "James Wilson",
    role: "Lead Developer",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Emily Taylor",
    role: "Customer Success",
    image: "https://i.pravatar.cc/150?img=8",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About NestFinder</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Making travel accessible, affordable, and unforgettable since 2020
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-dark mb-6">Our Mission</h2>
            <p className="text-muted mb-4">
              At NestFinder, we believe everyone deserves to find their perfect home away from
              home. Our platform connects travelers with unique, high-quality rental properties
              that create lasting memories.
            </p>
            <p className="text-muted mb-4">
              We started with a simple idea: make finding great rental properties as easy as
              possible. Today, we have grown to offer thousands of verified listings across
              major cities in the United States.
            </p>
            <p className="text-muted">
              Every property on our platform is carefully vetted to ensure quality, accuracy,
              and safety. We are committed to providing an exceptional experience for both
              travelers and property owners.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                <div className="text-muted">Avg. Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-dark mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-dark mb-3">Trust & Safety</h3>
              <p className="text-muted">
                We verify every listing and review to maintain the highest standards of quality
                and trustworthiness.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-dark mb-3">Innovation</h3>
              <p className="text-muted">
                We continuously improve our platform with new features and technology to
                enhance the user experience.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-dark mb-3">Community</h3>
              <p className="text-muted">
                We support local communities and help property owners share their unique spaces
                with the world.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-dark mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl border border-border p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-dark">{member.name}</h3>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">Ready to Find Your Nest?</h2>
          <p className="text-muted mb-8">Join thousands of travelers who trust NestFinder</p>
          <Link
            href="/explore"
            className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}
