import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';
import Instance from '../api/Instance';
import useRecordStore from '../Store/useRecordStore';

const TestPage = () => {
  const { id } = useParams();
  const { authUser: user } = useAuthStore();
  const { createRecrd } = useRecordStore();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const getTest = async (id) => {
    try {
      const res = await Instance.get(`/test/${id}`);
      setTest(res.data.test);
      // Initialize timeLeft once test is loaded
      if (res.data.test.timeLimit) {
        setTimeLeft(res.data.test.timeLimit * 60);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getTest(id);
    }
  }, [id]);

  useEffect(() => {
    // Only set up if test is loaded and has questions
    if (test && test.questions && test.questions.length > 0) {
      // Initialize selected answers array
      setSelectedAnswers(new Array(test.questions.length).fill(-1));

      // Set up timer
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTestCompletion();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (test && (!test.questions || test.questions.length === 0)) {
      // If no questions are available, navigate back
      navigate('/dashboard');
    }
  }, [test, navigate]);

  if (!test || !user) {
    return <div>Loading...</div>;
  }

  const currentQuestion = test.questions[currentQuestionIndex];

  const handleAnswerSelect = (index) => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = index;
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleTestCompletion = () => {
    // Calculate score
    let correctAnswers = 0;
    test.questions.forEach((question, index) => {
      if (question.options[selectedAnswers[index]] === question.answer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setIsCompleted(true);

    // Save test result
    createRecrd({
      testId: test._id,
      score: correctAnswers,
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const progressPercentage =
    ((currentQuestionIndex + 1) / test.questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">
              Test Completed!
            </h1>
            <p className="text-center text-gray-600 mb-8">
              You've completed the {test.title} test.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Results</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-gray-500 text-sm">Score</p>
                  <p className="text-2xl font-bold">
                    {score}/{test.questions.length}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-gray-500 text-sm">Percentage</p>
                  <p className="text-2xl font-bold">
                    {((score / test.questions.length) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    (score / test.questions.length) >= 0.7
                      ? 'bg-green-500'
                      : (score / test.questions.length) >= 0.4
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    width: `${(score / test.questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">{test.title}</h1>
            <div className="flex items-center text-gray-600">
              <Clock size={20} className="mr-2" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>
                Question {currentQuestionIndex + 1} of {test.questions.length}
              </span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">
            {currentQuestion.question}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-gray-400'
                    }`}
                  >
                    {selectedAnswers[currentQuestionIndex] === index && (
                      <span className="text-xs">✓</span>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 flex items-center text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} className="mr-2" />
            Previous
          </button>
          {currentQuestionIndex === test.questions.length - 1 ? (
            <button
              onClick={handleTestCompletion}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Finish Test
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 flex items-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Next
              <ArrowRight size={16} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
