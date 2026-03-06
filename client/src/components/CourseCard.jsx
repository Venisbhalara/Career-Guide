import "./CourseCard.css";

const CourseCard = ({ course }) => {
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
    </div>
  );
};

export default CourseCard;
