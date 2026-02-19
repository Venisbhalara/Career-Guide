import { pool } from "../config/db.js";

// @desc    Get assessment questions
// @route   GET /api/assessment/questions
// @access  Private
export const getQuestions = async (req, res) => {
  try {
    const { type } = req.query; // interest, personality, aptitude

    let query =
      "SELECT id, question_text, question_type, category, options FROM assessment_questions";
    const params = [];

    if (type) {
      query += " WHERE question_type = ?";
      params.push(type);
    }

    query += " ORDER BY question_type, id";

    const [questions] = await pool.query(query, params);

    // Parse JSON fields
    const formattedQuestions = questions.map((q) => ({
      ...q,
      options:
        typeof q.options === "string" ? JSON.parse(q.options) : q.options,
    }));

    res.json({ questions: formattedQuestions });
  } catch (error) {
    console.error("Get questions error:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

// @desc    Submit assessment answers
// @route   POST /api/assessment/submit
// @access  Private
export const submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body; // Array of { question_id, answer }

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid answers format" });
    }

    // Delete previous answers for this user
    await pool.query("DELETE FROM assessment_answers WHERE user_id = ?", [
      req.user.id,
    ]);

    // Insert new answers
    for (const answer of answers) {
      const { question_id, answer: userAnswer } = answer;

      // Get question details for scoring
      const [questions] = await pool.query(
        "SELECT scoring_weights FROM assessment_questions WHERE id = ?",
        [question_id],
      );

      if (questions.length === 0) continue;

      const scoringWeights =
        typeof questions[0].scoring_weights === "string"
          ? JSON.parse(questions[0].scoring_weights)
          : questions[0].scoring_weights;

      // Calculate score based on answer
      const score =
        scoringWeights && scoringWeights[userAnswer]
          ? scoringWeights[userAnswer]
          : 0;

      await pool.query(
        "INSERT INTO assessment_answers (user_id, question_id, answer, score) VALUES (?, ?, ?, ?)",
        [req.user.id, question_id, userAnswer, score],
      );
    }

    res.json({ message: "Assessment submitted successfully" });
  } catch (error) {
    console.error("Submit assessment error:", error);
    res.status(500).json({ error: "Failed to submit assessment" });
  }
};

// @desc    Get assessment results
// @route   GET /api/assessment/results
// @access  Private
export const getResults = async (req, res) => {
  try {
    // Get user's answers with scores
    const [answers] = await pool.query(
      `SELECT aa.*, aq.question_type, aq.category
       FROM assessment_answers aa
       JOIN assessment_questions aq ON aa.question_id = aq.id
       WHERE aa.user_id = ?`,
      [req.user.id],
    );

    if (answers.length === 0) {
      return res
        .status(404)
        .json({
          error: "No assessment found. Please take the assessment first.",
        });
    }

    // Calculate scores by type and category
    const scoresByType = {};
    const scoresByCategory = {};

    answers.forEach((answer) => {
      // By type
      if (!scoresByType[answer.question_type]) {
        scoresByType[answer.question_type] = { total: 0, count: 0 };
      }
      scoresByType[answer.question_type].total += answer.score || 0;
      scoresByType[answer.question_type].count += 1;

      // By category
      if (answer.category) {
        if (!scoresByCategory[answer.category]) {
          scoresByCategory[answer.category] = { total: 0, count: 0 };
        }
        scoresByCategory[answer.category].total += answer.score || 0;
        scoresByCategory[answer.category].count += 1;
      }
    });

    // Calculate averages
    const results = {
      byType: {},
      byCategory: {},
      totalScore: 0,
      totalQuestions: answers.length,
    };

    for (const [type, data] of Object.entries(scoresByType)) {
      results.byType[type] = {
        score: data.total,
        average: (data.total / data.count).toFixed(2),
        count: data.count,
      };
      results.totalScore += data.total;
    }

    for (const [category, data] of Object.entries(scoresByCategory)) {
      results.byCategory[category] = {
        score: data.total,
        average: (data.total / data.count).toFixed(2),
        count: data.count,
      };
    }

    res.json({ results });
  } catch (error) {
    console.error("Get results error:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
};
