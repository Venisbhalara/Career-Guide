import { Link } from "react-router-dom";
import "../styles/pages/Blog.css";

const Blog = () => {
  // Mock data for blog posts with professional, career-oriented content
  const featuredPost = {
    id: 1,
    title: "The Future of Work: AI and Career Adaptability",
    excerpt:
      "As artificial intelligence reshapes industries, adaptability has become the most valuable skill. Learn how to future-proof your career and leverage AI tools to your advantage.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Future Trends",
    date: "May 12, 2025",
    readTime: "8 min read",
  };

  const blogPosts = [
    {
      id: 2,
      title: "Mastering the Art of Remote Collaboration",
      excerpt:
        "Remote work is here to stay. Discover essential strategies and tools to communicate effectively, build trust, and lead teams from anywhere in the world.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Workplace",
      date: "May 10, 2025",
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "Top 10 Soft Skills Employers Look For in 2025",
      excerpt:
        "Technical skills get you the interview, but soft skills get you the job. We break down the most in-demand interpersonal skills.",
      image:
        "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Career Advice",
      date: "May 08, 2025",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Navigating Career Transitions in Your 30s",
      excerpt:
        "Thinking about a career pivot? It's never too late. Insightful stories and practical steps for making a successful mid-career change.",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Guidance",
      date: "May 05, 2025",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Financial Wellness for Young Professionals",
      excerpt:
        "Managing your first salary, understanding taxes, and diverse investment strategies to build long-term wealth starting today.",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Finance",
      date: "May 01, 2025",
      readTime: "9 min read",
    },
    {
      id: 6,
      title: "Building a Personal Brand on LinkedIn",
      excerpt:
        "Your LinkedIn profile is your digital resume. Learn how to optimize your presence and attract recruiters with a compelling personal brand.",
      image:
        "https://images.unsplash.com/photo-1611926653458-09294b30825b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Networking",
      date: "Apr 28, 2025",
      readTime: "5 min read",
    },
    {
      id: 7,
      title: "Overcoming Imposter Syndrome",
      excerpt:
        "Feel like a fraud? You're not alone. Psychologists share techniques to build genuine confidence and own your achievements.",
      image:
        "https://images.unsplash.com/photo-1507537297725-add84caef8fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Wellness",
      date: "Apr 25, 2025",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="blog-page fade-in">
      <div className="container">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            Career Insights & News
          </div>
          <h1 className="blog-title">
            Unlock your potential with{" "}
            <span className="gradient-text-premium">expert guidance</span>
          </h1>
          <p className="blog-subtitle">
            Stay ahead of the curve with the latest career trends, interview
            tips, and professional development strategies.
          </p>
        </section>

        {/* Featured Post */}
        <section className="featured-post-section slide-in">
          <div className="featured-post-card">
            <div className="featured-image-container">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="featured-image"
              />
            </div>
            <div className="featured-content">
              <div className="post-meta">
                <span className="post-category text-accent">
                  {featuredPost.category}
                </span>
                <span className="post-separator">•</span>
                <span className="post-date">{featuredPost.date}</span>
                <span className="post-separator">•</span>
                <span className="post-time">{featuredPost.readTime}</span>
              </div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <Link to={`/blog/${featuredPost.id}`} className="btn btn-primary">
                Read Full Article
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Post Grid */}
        <section className="posts-grid">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="blog-card fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-content-premium">
                <div className="card-header">
                  <span className="card-category-text">{post.category}</span>
                  <span className="card-date">{post.date}</span>
                </div>
                <h3 className="card-title-premium">{post.title}</h3>
                <p className="card-excerpt-premium">{post.excerpt}</p>
                <div className="card-footer">
                  <span className="read-time">{post.readTime}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="read-more-link-premium"
                  >
                    Read Article
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-shape shape-1"></div>
          <div className="newsletter-shape shape-2"></div>
          <div className="newsletter-content">
            <h2 className="newsletter-title">Subscribe to our newsletter</h2>
            <p className="newsletter-text">
              Get the latest career insights delivered directly to your inbox.
              No spam, just value.
            </p>
            <form className="newsletter-form-large">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input-large"
                required
              />
              <button type="submit" className="btn btn-white-premium btn-lg">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
