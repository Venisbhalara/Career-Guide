import { pool } from "../config/db.js";

// @desc    Get career recommendations for user
// @route   GET /api/recommendations
// @access  Private
export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user profile
    const [users] = await pool.query(
      "SELECT education_level, current_status, interests FROM users WHERE id = ?",
      [userId],
    );

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    // Get assessment scores
    const [answers] = await pool.query(
      `SELECT aa.*, aq.question_type, aq.category
       FROM assessment_answers aa
       JOIN assessment_questions aq ON aa.question_id = aq.id
       WHERE aa.user_id = ?`,
      [userId],
    );

    if (answers.length === 0) {
      return res
        .status(400)
        .json({ error: "Please complete the assessment first" });
    }

    // Calculate category scores
    const categoryScores = {};
    answers.forEach((answer) => {
      if (answer.category) {
        if (!categoryScores[answer.category]) {
          categoryScores[answer.category] = 0;
        }
        categoryScores[answer.category] += answer.score || 0;
      }
    });

    // Get all careers
    const [careers] = await pool.query("SELECT * FROM careers");

    // Calculate match percentage for each career
    const careerMatches = [];

    for (const career of careers) {
      let matchScore = 0;
      let factors = [];

      // Factor 1: Field alignment with interests (30%)
      if (
        user.interests &&
        user.interests.toLowerCase().includes(career.field.toLowerCase())
      ) {
        matchScore += 30;
        factors.push(
          `Your interest in ${career.field} aligns with this career`,
        );
      }

      // Factor 2: Education level match (20%)
      if (career.education_required && user.education_level) {
        const educationMatch = career.education_required
          .toLowerCase()
          .includes(user.education_level.toLowerCase());
        if (educationMatch) {
          matchScore += 20;
          factors.push("Your education level matches the requirements");
        } else {
          matchScore += 10;
        }
      }

      // Factor 3: Assessment category scores (50%)
      // Map career fields to assessment categories
      const fieldCategoryMap = {
        IT: ["technology", "analytical", "problem_solving"],
        Engineering: ["analytical", "technical", "problem_solving"],
        Healthcare: ["helping", "science", "interpersonal"],
        Arts: ["creative", "artistic", "expressive"],
        Business: ["leadership", "communication", "analytical"],
        Education: ["teaching", "interpersonal", "communication"],
        Law: ["analytical", "communication", "detail_oriented"],
        Sports: ["physical", "competitive", "teamwork"],
      };

      const relevantCategories = fieldCategoryMap[career.field] || [];
      let categoryMatchScore = 0;
      let categoryCount = 0;

      relevantCategories.forEach((cat) => {
        if (categoryScores[cat]) {
          categoryMatchScore += categoryScores[cat];
          categoryCount++;
        }
      });

      if (categoryCount > 0) {
        const avgCategoryScore = categoryMatchScore / categoryCount;
        const normalizedScore = Math.min((avgCategoryScore / 10) * 50, 50);
        matchScore += normalizedScore;
        factors.push(
          "Your assessment scores indicate strong aptitude for this field",
        );
      }

      // Ensure match percentage is between 0-100
      const matchPercentage = Math.min(Math.max(matchScore, 0), 100);

      if (matchPercentage >= 40) {
        // Only include careers with 40%+ match
        careerMatches.push({
          career_id: career.id,
          career_title: career.title,
          career_field: career.field,
          match_percentage: matchPercentage.toFixed(2),
          reasoning: factors.join(". "),
          career_details: career,
        });
      }
    }

    // Sort by match percentage
    careerMatches.sort((a, b) => b.match_percentage - a.match_percentage);

    // Take top 10
    const topMatches = careerMatches.slice(0, 10);

    res.json({
      recommendations: topMatches,
      total: topMatches.length,
    });
  } catch (error) {
    console.error("Get recommendations error:", error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
};

// @desc    Get skill gap analysis for a career (DISABLED - career_skills table removed)
// @route   GET /api/recommendations/skill-gap/:careerId
// @access  Private
export const getSkillGap = async (req, res) => {
  res.status(503).json({
    error: "Skill gap analysis is currently unavailable",
    message: "This feature has been disabled due to database schema changes",
  });
};
