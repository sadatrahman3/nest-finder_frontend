import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Hidden Gem Destinations for 2024",
    excerpt:
      "Discover lesser-known travel destinations that offer incredible experiences without the crowds. From coastal villages to mountain retreats.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    author: "David Chen",
    date: "March 15, 2024",
    category: "Travel Tips",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Vacation Rental",
    excerpt:
      "Planning your next trip? Learn the essential factors to consider when booking a vacation rental to ensure a memorable stay.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    author: "Maria Rodriguez",
    date: "March 10, 2024",
    category: "Guides",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Remote Work-Friendly Rentals: What to Look For",
    excerpt:
      "With remote work here to stay, find out what amenities and features make a rental property perfect for working travelers.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    author: "James Wilson",
    date: "March 5, 2024",
    category: "Remote Work",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Sustainable Travel: Eco-Friendly Stays",
    excerpt:
      "Learn about sustainable travel practices and discover eco-friendly rental properties that minimize environmental impact.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
    author: "Emily Taylor",
    date: "February 28, 2024",
    category: "Sustainability",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Family-Friendly Vacation Rentals Guide",
    excerpt:
      "Traveling with kids? Discover the best practices for choosing family-friendly rentals that keep everyone happy and safe.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    author: "David Chen",
    date: "February 20, 2024",
    category: "Family Travel",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Tips, guides, and inspiration for your next adventure
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-sm text-muted">{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold text-dark mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary text-sm font-medium">
                              {post.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-dark">
                              {post.author}
                            </p>
                            <p className="text-xs text-muted">{post.date}</p>
                          </div>
                        </div>
                        <button className="text-primary hover:text-primary-dark font-medium text-sm">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-dark mb-4">Categories</h3>
              <div className="space-y-2">
                {["Travel Tips", "Guides", "Remote Work", "Sustainability", "Family Travel"].map(
                  (category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 text-muted hover:text-dark transition-colors"
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-dark mb-4">Newsletter</h3>
              <p className="text-muted text-sm mb-4">
                Get the latest travel tips delivered to your inbox
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary mb-3"
              />
              <button className="w-full bg-primary text-white py-2 rounded-xl hover:bg-primary-dark transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
