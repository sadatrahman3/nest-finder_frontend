import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find Your Perfect Nest?
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of happy travelers who have found their dream rental on NestFinder
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/explore"
            className="bg-white text-secondary px-8 py-3 rounded-xl text-lg font-medium hover:bg-slate-100 transition-colors"
          >
            Start Exploring
          </Link>
          <Link
            href="/register"
            className="border-2 border-white text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-white/10 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}
