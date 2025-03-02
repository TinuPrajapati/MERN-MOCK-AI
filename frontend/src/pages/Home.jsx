import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Award, Users } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';

const Home= () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Test Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Generate custom tests with our advanced AI technology. Perfect for students, professionals, and lifelong learners.
          </p>
          {authUser ? (
            <Link
              to="/dashboard"
              className="bg-white text-indigo-700 px-8 py-3 rounded-md font-medium text-lg hover:bg-indigo-100 transition-colors inline-block"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/signup"
              className="bg-white text-indigo-700 px-8 py-3 rounded-md font-medium text-lg hover:bg-indigo-100 transition-colors inline-block"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Brain size={48} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Generated Tests</h3>
            <p className="text-gray-600">
              Our advanced AI creates personalized tests based on your chosen topics and difficulty levels.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <BookOpen size={48} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Comprehensive Learning</h3>
            <p className="text-gray-600">
              Cover a wide range of subjects with detailed explanations and feedback on your answers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Award size={48} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Track Your Progress</h3>
            <p className="text-gray-600">
              Monitor your performance over time with detailed analytics and improvement suggestions.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "This platform has revolutionized how I prepare for my exams. The AI-generated tests are incredibly relevant and have helped me identify my weak areas."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center mr-4">
                  <Users size={24} className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-gray-500 text-sm">Computer Science Student</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "As a teacher, I use this platform to create custom tests for my students. It saves me hours of work and provides valuable insights into their progress."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center mr-4">
                  <Users size={24} className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold">Michael Rodriguez</p>
                  <p className="text-gray-500 text-sm">High School Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of students and professionals who are already improving their skills with our AI test platform.
        </p>
        {authUser ? (
          <Link
            to="/dashboard"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium text-lg hover:bg-indigo-700 transition-colors inline-block"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium text-lg hover:bg-indigo-700 transition-colors inline-block"
          >
            Create Free Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;