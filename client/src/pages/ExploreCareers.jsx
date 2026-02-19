import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/ExploreCareers.css";
import { CAREERS } from "../data/careerData";

const ExploreCareers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("All");
  const [careers, setCareers] = useState(CAREERS); // Initialize with data immediately

  const FILTERS = [
    "All",
    "Technology",
    "Data Science",
    "Management",
    "Marketing",
    "Finance",
    "Design",
    "Healthcare",
    "Engineering",
  ];

  const filtered = careers.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = selectedField === "All" || c.field === selectedField;
    return matchSearch && matchFilter;
  });

  return (
    <div className="explore-container">
      {/* --- HEADER --- */}
      <header className="explore-header">
        <div className="header-content container">
          <h1 className="page-title">Explore Careers</h1>
          <p className="page-desc">
            Discover 50+ premium career paths tailored for the Indian market.
            <br />
            Real salaries, growth insights, and expert roadmaps.
          </p>
        </div>
      </header>

      {/* --- STICKY CONTROLS --- */}
      <div className="sticky-controls">
        <div className="controls-inner container">
          {/* Search */}
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search careers (e.g. 'Developer')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filters */}
          <div className="filters-wrapper">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-chip ${selectedField === f ? "active" : ""}`}
                onClick={() => setSelectedField(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <main className="main-grid container">
        <div className="results-count">
          Showing {filtered.length} careers in{" "}
          <span className="highlight-field">{selectedField}</span>
        </div>

        {filtered.length > 0 ? (
          <div className="cards-layout">
            {filtered.map((career) => (
              <div key={career.id} className="career-card">
                <div className="card-top">
                  <div className="icon-wrapper">{career.icon}</div>
                  <div className="meta-badge" data-type={career.demand_level}>
                    {career.demand_level} Demand
                  </div>
                </div>

                <h3 className="card-title">{career.title}</h3>
                <span className="card-field">{career.field}</span>

                <p className="card-desc">{career.description}</p>

                <div className="card-stats">
                  <div className="stat">
                    <span className="label">Avg. Salary</span>
                    <span className="value-money">{career.salary}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Growth</span>
                    <span className="value-growth">{career.growth}</span>
                  </div>
                </div>

                <div className="card-companies">
                  <span className="companies-label">Top Employers:</span>
                  <div className="company-tags">
                    {career.companies.slice(0, 3).map((c, i) => (
                      <span key={i} className="company-tag">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to={`/careers/${career.id}`} className="view-btn">
                  View Roadmap ➝
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>No careers found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExploreCareers;
