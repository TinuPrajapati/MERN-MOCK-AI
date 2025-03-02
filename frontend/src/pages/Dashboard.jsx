import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, PlusCircle } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';
import useTestStore from '../Store/useTestStore';
import useRecordStore from '../Store/useRecordStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    number: 5
  });


  const { authUser } = useAuthStore();
  const { generate, show, test, isLoading, getById } = useTestStore();
  const { record, allRecord } = useRecordStore();
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "number") {
      setFormData((prev) => ({ ...prev, [id]: Number(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleGenerateTest = (e) => {
    e.preventDefault();
    generate(formData)
  };

  const handleStartTest = (testId) => {
    getById(testId);
    navigate(`/test/${testId}`);
  }


  // Calculate stats
  const totalTestsTaken = record.length;
  const averageScore = totalTestsTaken > 0
    ? record.reduce((sum, result) => sum + (result.score / result.testId.questions.length) * 100, 0) / totalTestsTaken
    : 0;

  useEffect(() => {
    show();
    allRecord();
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome, {authUser?.name}!</h1>
          <p className="text-gray-600">
            Here's your personalized dashboard. Generate new tests or continue with your learning journey.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <BookOpen size={24} className="text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">Available Tests</h2>
            </div>
            <p className="text-3xl font-bold">{test.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CheckCircle size={24} className="text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">Tests Completed</h2>
            </div>
            <p className="text-3xl font-bold">{record.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Clock size={24} className="text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">Average Score</h2>
            </div>
            <p className="text-3xl font-bold">{averageScore.toFixed(1)}%</p>
          </div>
        </div>

        {/* Generate Test Button/Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle size={20} className="mr-2" />
              Generate New Test
            </button>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Generate AI Test</h2>
              <form onSubmit={handleGenerateTest} className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, React, Python"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    id="number"
                    value={formData.number}
                    onChange={handleChange}
                    min="5"
                    max="20"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      'Generate Test'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Available Tests */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Tests</h2>

          {test.length === 0 ? (
            <p className="text-gray-500">No tests available. Generate your first test!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {test.map((test) => (
                <div key={test.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{test.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">Test your knowledge on {test?.title} </p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{test.questions.length} questions</span>
                    <span>{test.timeLimit} min</span>
                  </div>
                  <button
                    onClick={() => handleStartTest(test._id)}

                    className="block w-full text-center py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Test History */}
        {record.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Test History</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {record.map((result) => {
                    return (
                      <tr key={result._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {result?.testId.title || 'Unknown Test'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {result.score}/{result.testId.questions.length} ({((result.score / result.testId.questions.length) * 100).toFixed(1)}%)
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(result.createdAt).toLocaleDateString("en-GB")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;