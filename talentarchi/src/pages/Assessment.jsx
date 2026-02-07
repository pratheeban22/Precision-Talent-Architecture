import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Assessment = () => {
  const navigate = useNavigate();

  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  // ===============================
  // FETCH QUESTIONS FROM BACKEND
  // ===============================
  useEffect(() => {
    fetch('https://precision-talent-architect.onrender.com/api/assessment/questions')
      .then(res => res.json())
      .then(data => {
        const questions = data.assessmentQuestions || data;
        setAssessmentQuestions(questions);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ===============================
  // SAFETY: FIX INDEX OVERFLOW
  // ===============================
  useEffect(() => {
    if (
      assessmentQuestions.length > 0 &&
      currentQuestion >= assessmentQuestions.length
    ) {
      setCurrentQuestion(0);
    }
  }, [assessmentQuestions, currentQuestion]);

  // ===============================
  // TIMER
  // ===============================
  useEffect(() => {
    if (!started || assessmentQuestions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return assessmentQuestions[currentQuestion]?.timeLimit || 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, currentQuestion, assessmentQuestions]);

  // ===============================
  // LOADING STATE
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading assessment…
      </div>
    );
  }

  // ===============================
  // NO QUESTIONS
  // ===============================
  if (assessmentQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        No assessment questions available
      </div>
    );
  }

  // ===============================
  // HANDLERS
  // ===============================
  const handleAnswerSelect = (idx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: idx,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(
        assessmentQuestions[currentQuestion + 1]?.timeLimit || 30
      );
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setTimeLeft(
        assessmentQuestions[currentQuestion - 1]?.timeLimit || 30
      );
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    let score = 0;
    assessmentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 10;
      }
    });

    setTimeout(() => {
      setResults({
        score: Math.round(
          (score / (assessmentQuestions.length * 10)) * 100
        ),
        total: assessmentQuestions.length,
        correct: score / 10,
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const resetAssessment = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(30);
    setResults(null);
  };

  // ===============================
  // START SCREEN
  // ===============================
  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Skill Assessment</h1>
          <p className="text-gray-600 mb-6">
            Test your skills and identify improvement areas.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-2xl font-bold text-primary-600">
                {assessmentQuestions.length}
              </p>
              <p className="text-sm text-gray-500">Questions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">~15 min</p>
              <p className="text-sm text-gray-500">Duration</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">Multi</p>
              <p className="text-sm text-gray-500">Skills</p>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="btn-primary w-full"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // RESULT SCREEN
  // ===============================
  if (results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Assessment Complete</h1>
          <p className="text-5xl font-bold text-primary-600 mb-4">
            {results.score}%
          </p>
          <p className="text-gray-600 mb-6">
            Correct: {results.correct} / {results.total}
          </p>

          <div className="flex gap-4">
            <button
              onClick={resetAssessment}
              className="btn-secondary flex-1"
            >
              Retake
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary flex-1"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // QUESTION VIEW
  // ===============================
  const question = assessmentQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <p className="mb-2 text-sm text-gray-600">
          Question {currentQuestion + 1} of {assessmentQuestions.length}
        </p>

        <div className="card">
          <h2 className="text-xl font-semibold mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full p-4 text-left rounded-lg border ${
                  selectedAnswers[currentQuestion] === idx
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className="btn-secondary"
          >
            Previous
          </button>

          {currentQuestion === assessmentQuestions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="btn-primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;