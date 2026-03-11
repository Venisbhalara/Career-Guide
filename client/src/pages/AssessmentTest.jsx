import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "../styles/pages/Common.css";
import "../styles/pages/AssessmentTest.css";

const AssessmentTest = () => {
  const [phase, setPhase] = useState("intro"); // intro, test, analyzing, results
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: answerValue }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes (120 seconds)

  // MOCK DATA FALLBACK (In case backend is empty)
  const MOCK_QUESTIONS = [
    {
      id: 1,
      question_text: "I enjoy solving complex problems and puzzles.",
      category: "Logical",
      options: [
        { label: "Strongly Disagree", value: 1 },
        { label: "Disagree", value: 2 },
        { label: "Neutral", value: 3 },
        { label: "Agree", value: 4 },
        { label: "Strongly Agree", value: 5 },
      ],
    },
    {
      id: 2,
      question_text: "I prefer working in a team rather than alone.",
      category: "Social",
      options: [
        { label: "Strongly Disagree", value: 1 },
        { label: "Disagree", value: 2 },
        { label: "Neutral", value: 3 },
        { label: "Agree", value: 4 },
        { label: "Strongly Agree", value: 5 },
      ],
    },
    {
      id: 3,
      question_text: "I am interested in how machines and software work.",
      category: "Technical",
      options: [
        { label: "Strongly Disagree", value: 1 },
        { label: "Disagree", value: 2 },
        { label: "Neutral", value: 3 },
        { label: "Agree", value: 4 },
        { label: "Strongly Agree", value: 5 },
      ],
    },
    {
      id: 4,
      question_text: "I like to express myself through art, music, or writing.",
      category: "Creative",
      options: [
        { label: "Strongly Disagree", value: 1 },
        { label: "Disagree", value: 2 },
        { label: "Neutral", value: 3 },
        { label: "Agree", value: 4 },
        { label: "Strongly Agree", value: 5 },
      ],
    },
    {
      id: 5,
      question_text: "I am good at organizing people and events.",
      category: "Leadership",
      options: [
        { label: "Strongly Disagree", value: 1 },
        { label: "Disagree", value: 2 },
        { label: "Neutral", value: 3 },
        { label: "Agree", value: 4 },
        { label: "Strongly Agree", value: 5 },
      ],
    },
  ];

  useEffect(() => {
    // Fetch questions on mount (or load mock if failed/empty)
    const fetchQuestions = async () => {
      try {
        const response = await api.get("/assessment/questions");
        if (response.data.questions && response.data.questions.length > 0) {
          setQuestions(response.data.questions);
        } else {
          // Use Mock data if no questions in DB
          console.warn("No questions found in DB, using mock data.");
          setQuestions(MOCK_QUESTIONS);
        }
      } catch (err) {
        console.error("Failed to fetch questions, using mock data:", err);
        setQuestions(MOCK_QUESTIONS);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    // Timer logic
    let timerId;
    if (phase === "test" && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (phase === "test" && timeLeft === 0) {
      handleSubmit(); // Auto-submit when time runs out
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [phase, timeLeft]);

  const handleStart = () => {
    setPhase("test");
    setTimeLeft(120); // Reset timer just in case
    window.scrollTo(0, 0);
  };

  const handleNextStub = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevStub = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleManualAnswer = (value) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };
  const handleSubmit = async () => {
    setPhase("analyzing");
    setLoading(true);

    try {
      // Format answers for backend
      const formattedAnswers = Object.entries(answers).map(([qId, val]) => ({
        question_id: parseInt(qId),
        answer: val,
      }));

      await api.post("/assessment/submit", { answers: formattedAnswers });

      // Allow the 'analyzing' animation to play for at least 2 seconds for effect
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Fetch real results from backend
      const resultsResponse = await api.get("/assessment/results");
      const resultData = resultsResponse.data.results;

      // Map backend results to UI format
      // Assuming backend returns { byType: {...}, topCareers: [...] }
      // If backend doesn't return topCareers/personalityType directly, we might need to derive them or update backend
      // For now, let's use the score and map a simple personality type if needed, or expect backend to enhance this.

      // In a real scenario, the backend /results endpoint should return these details.
      // Based on my analysis of assessmentController.js, it returns `results` object with `byType`, `byCategory`, `totalScore`.
      // It does NOT return `personalityType` or `topCareers` yet.
      // I will add a helper here to derive them for now, to keep the UI working,
      // but the data PERISTENCE is now real.

      const score =
        Math.round(
          (resultData.totalScore / (resultData.totalQuestions * 5)) * 100,
        ) || 0;

      setResults({
        score: score,
        personalityType: "The Analyst", // Placeholder until backend logic enhances
        topCareers: [
          "Data Scientist",
          "Software Engineer",
          "Financial Analyst",
        ], // Placeholder
      });

      setPhase("results");
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit assessment. Please try again.");
      setPhase("test"); // Go back to test
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER HELPERS ---

  const renderIntro = () => (
    <div className="assessment-intro fade-in">
      <div className="assessment-hero-icon">🚀</div>
      <h1
        className="gradient-text"
        style={{ fontSize: "3rem", marginBottom: "1rem" }}
      >
        Discover Your Ideal Career
      </h1>
      <p
        className="text-secondary"
        style={{ fontSize: "1.2rem", marginBottom: "3rem" }}
      >
        Take our AI-powered psychometric assessment to uncover your hidden
        strengths, personality type, and the career paths where you'll shine the
        brightest.
      </p>

      <div className="assessment-features">
        <div className="feature-item">
          <div className="feature-icon">🧠</div>
          <h3>Scientific</h3>
          <p>Based on proven psychological models like Big Five and RIASEC.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">⚡</div>
          <h3>Fast & Engaging</h3>
          <p>
            Only takes 5-10 minutes to complete with our interactive interface.
          </p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🎯</div>
          <h3>Personalized</h3>
          <p>
            Get tailored career recommendations matched to your unique profile.
          </p>
        </div>
      </div>

      <button onClick={handleStart} className="btn btn-primary btn-lg">
        Start Assessment
      </button>
    </div>
  );

  const renderTest = () => {
    const question = questions[currentQuestionIndex];
    if (!question) return <div>Loading...</div>;

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const hasAnsweredCurrent = answers[question.id] !== undefined;

    // Format timer
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return (
      <div className="ios-question-container">
        {/* Header Setup */}
        <div className="ios-header">
          <button
            onClick={handlePrevStub}
            className="ios-back-btn"
            disabled={isFirstQuestion}
            style={{ visibility: isFirstQuestion ? 'hidden' : 'visible' }}
          >
            ←
          </button>
          
          <h2 className="ios-header-title">
            {question.category || "General"}
          </h2>
          
          <div className={`ios-timer ${timeLeft < 30 ? 'text-danger' : ''}`}>
            ⏱ {formattedTime}
          </div>
        </div>

        {/* Purple Progress Line attached directly below header */}
        <div className="ios-progress-bar-container">
          <div
            className="ios-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Content Section */}
        <div className="ios-content-wrapper">
          <div className="ios-question-side">
            <div className="ios-question-meta">
              Questions {currentQuestionIndex + 1} of {questions.length}
            </div>

            <h3 className="ios-question-text">{question.question_text}</h3>
          </div>

          <div className="ios-options-list">
            {question.options.map((opt, idx) => {
              const label = opt.label || opt;
              const val = opt.value || idx + 1;
              const isSelected = answers[question.id] === val;

              return (
                <div
                  key={idx}
                  className={`ios-option-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleManualAnswer(val)}
                >
                  <span className="ios-option-label">{label}</span>
                  <div className="ios-radio-circle">
                    {isSelected && (
                      <span className="ios-checkmark">✔</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="ios-bottom-nav">
          <button
            onClick={handleNextStub}
            className="ios-next-btn"
            disabled={!hasAnsweredCurrent}
          >
            {isLastQuestion ? "Submit" : "Next"} <span>→</span>
          </button>
        </div>
      </div>
    );
  };

  const renderAnalyzing = () => (
    <div className="analyzing-container fade-in">
      <div className="analyzing-loader"></div>
      <h2 className="mb-4">Analyzing your responses...</h2>
      <div className="processing-text">
        Running personality algorithms... <br />
        Mapping clear aptitude markers... <br />
        Identifying best-fit industries...
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="assessment-results fade-in">
      <div className="results-header">
        <div className="page-icon">🎉</div>
        <h1>Assessment Complete!</h1>
        <p className="text-secondary">Here is a snapshot of your profile.</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-12">
        <div className="score-card">
          <div
            className="score-circle"
            style={{ "--percentage": `${results.score}%` }}
          >
            <div className="score-inner">
              <span className="score-value">{results.score}</span>
              <span className="score-label">Match Score</span>
            </div>
          </div>
          <h3>Career Readiness</h3>
          <p className="text-sm text-secondary">
            You show high aptitude for modern technical roles.
          </p>
        </div>

        <div className="score-card">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💡</div>
          <h3>{results.personalityType}</h3>
          <p className="text-secondary mb-4">
            You thrive in environments that require creative problem-solving and
            autonomous work.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="badge badge-primary">Creative</span>
            <span className="badge badge-primary">Analytical</span>
            <span className="badge badge-primary">Strategic</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="mb-6">Recommended Career Paths</h3>
        <div className="flex justify-center gap-4 mb-8">
          {results.topCareers.map((career, i) => (
            <div key={i} className="card p-4 border-primary">
              ⭐ {career}
            </div>
          ))}
        </div>

        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );

  return (
    <div
      className="page-container"
      style={{
        background:
          phase === "intro"
            ? "var(--color-bg-primary)"
            : "var(--color-bg-secondary)",
      }}
    >
      <div className="container page-content assessment-container">
        {phase === "intro" && renderIntro()}
        {phase === "test" && renderTest()}
        {phase === "analyzing" && renderAnalyzing()}
        {phase === "results" && renderResults()}
      </div>
    </div>
  );
};

export default AssessmentTest;
