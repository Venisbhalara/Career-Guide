import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const {
    title,
    platform,
    description,
    duration,
    rating,
    difficulty_level,
    is_free,
    url,
  } = course;

  const handleEnroll = () => {
    window.open(url, "_blank");
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "badge-success";
      case "intermediate":
        return "badge-warning";
      case "advanced":
        return "badge-primary";
      default:
        return "badge-primary";
    }
  };

  return (
    <div className="card courses-card glass hover-effect">
      <div className="card-header">
        <div className="platform-badge">
          <span className="platform-icon">
            {platform === "Coursera"
              ? "🔵"
              : platform === "Udemy"
                ? "🔴"
                : "🎓"}
          </span>
          {platform}
        </div>
        <div className={`badge ${is_free ? "badge-success" : "badge-primary"}`}>
          {is_free ? "Free" : "Paid"}
        </div>
      </div>

      <h3 className="course-title">{title}</h3>
      <p className="course-description">{description}</p>

      <div className="course-meta">
        <div className="meta-item">
          <span>⏱️</span> {duration}
        </div>
        <div className="meta-item">
          <span>⭐</span> {rating}/5.0
        </div>
        <div className={`badge ${getDifficultyColor(difficulty_level)}`}>
          {difficulty_level}
        </div>
      </div>

      <button className="btn btn-primary full-width" onClick={handleEnroll}>
        Enroll Now
      </button>

      <style jsx>{`
        .courses-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .courses-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .platform-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .course-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          background: linear-gradient(
            135deg,
            var(--color-primary-dark),
            var(--color-primary)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .course-description {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        .course-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .full-width {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default CourseCard;
