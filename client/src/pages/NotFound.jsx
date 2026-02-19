import { Link } from "react-router-dom";
import "../styles/pages/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="error-actions">
          <Link to="/" className="btn-primary">
            Go to Home
          </Link>
          <Link to="/explore" className="btn-secondary">
            Explore Careers
          </Link>
        </div>
        <div className="error-illustration">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" fill="#f3f4f6" />
            <path
              d="M70 85C70 80.5817 73.5817 77 78 77C82.4183 77 86 80.5817 86 85C86 89.4183 82.4183 93 78 93C73.5817 93 70 89.4183 70 85Z"
              fill="#6366f1"
            />
            <path
              d="M114 85C114 80.5817 117.582 77 122 77C126.418 77 130 80.5817 130 85C130 89.4183 126.418 93 122 93C117.582 93 114 89.4183 114 85Z"
              fill="#6366f1"
            />
            <path
              d="M70 120C70 120 85 110 100 110C115 110 130 120 130 120"
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
