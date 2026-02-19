import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";
import CourseCard from "../components/CourseCard";
import "../styles/pages/Common.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    platform: "",
    difficulty: "",
    is_free: "all", // all, free, paid
  });

  const isInitialMount = useRef(true);
  const hasLoadedInitially = useRef(false);

  // Fetch courses on mount and when filters change
  useEffect(() => {
    const abortController = new AbortController();

    const fetchCourses = async () => {
      try {
        // Show loading only after initial load (during filter changes)
        if (hasLoadedInitially.current) {
          setLoading(true);
        }
        setError(null);

        // Build query params
        const params = new URLSearchParams();
        if (filters.search) params.append("search", filters.search);
        if (filters.platform) params.append("platform", filters.platform);
        if (filters.difficulty) params.append("difficulty", filters.difficulty);
        if (filters.is_free !== "all")
          params.append("is_free", filters.is_free === "free");

        const response = await api.get(`/courses?${params.toString()}`, {
          signal: abortController.signal,
        });

        // Only update state if request wasn't aborted
        if (!abortController.signal.aborted) {
          setCourses(response.data.courses);

          if (!hasLoadedInitially.current) {
            hasLoadedInitially.current = true;
          }
        }
      } catch (err) {
        // Ignore abort errors
        if (err.name === "AbortError" || err.name === "CanceledError") {
          return;
        }
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    // On initial mount, fetch immediately without debounce
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchCourses();
      return () => abortController.abort();
    }

    // For subsequent changes, debounce search
    const timeoutId = setTimeout(fetchCourses, 500);
    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      platform: "",
      difficulty: "",
      is_free: "all",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="page-container">
      <div className="container page-content">
        <header className="page-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Courses & Resources 📚</h1>
            <p className="subtitle">
              Curated learning paths from top platforms to accelerate your
              career growth.
            </p>
          </motion.div>
        </header>

        {/* Filters Section */}
        <section className="filters-section glass">
          <div className="filter-group search-group">
            <input
              type="text"
              name="search"
              placeholder="Search courses..."
              value={filters.search}
              onChange={handleFilterChange}
              className="form-input search-input"
            />
          </div>

          <div className="filter-group">
            <select
              name="platform"
              value={filters.platform}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All Platforms</option>
              <option value="Coursera">Coursera</option>
              <option value="Udemy">Udemy</option>
              <option value="EdX">EdX</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              name="is_free"
              value={filters.is_free}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="all">Any Price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="btn btn-secondary btn-sm"
            style={{ marginLeft: "auto" }}
          >
            Clear Filters
          </button>
        </section>

        {/* Courses Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading premium resources...</p>
          </div>
        ) : error ? (
          <div className="error-state glass">
            <p className="error-text">{error}</p>
            <button
              onClick={() => setFilters({ ...filters })}
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        ) : (
          <motion.div
            className="courses-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <motion.div key={course.id} variants={itemVariants}>
                    <CourseCard course={course} />
                  </motion.div>
                ))
              ) : hasLoadedInitially.current ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="empty-state glass"
                >
                  <div className="empty-icon">🔍</div>
                  <h3>No courses found</h3>
                  <p>Try adjusting your filters or search terms.</p>
                  <button
                    onClick={clearFilters}
                    className="btn btn-primary mt-4"
                  >
                    View All Courses
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <style>{`
        .page-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .subtitle {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          color: var(--color-text-secondary);
        }

        .filters-section {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-radius: var(--radius-xl);
          align-items: center;
        }

        .filter-group {
          flex: 1;
          min-width: 150px;
        }

        .search-group {
          flex: 2;
          min-width: 250px;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          color: var(--color-text-tertiary);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          border-radius: var(--radius-xl);
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .btn-secondary {
            width: 100%;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Courses;
