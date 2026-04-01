import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';

const Home = () => {
  const navigate = useNavigate();
  const { jobRoles, startInterview } = useInterview();

  const handleSelectRole = (roleId) => {
    startInterview(roleId);
    navigate('/interview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 opacity-20 blur-3xl rounded-full animate-pulse"></div>

      <div className="w-full max-w-5xl">
        {/* Main content container with frosted glass effect */}
        <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-12 shadow-2xl border border-white/30">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              🎓 AI Mock Interview
            </h1>
            <p className="text-xl text-white/80 drop-shadow-md">
              Prepare for your dream job with AI-powered practice interviews
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {jobRoles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className="backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/30 group"
              >
                {/* Card Icon */}
                <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {role.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-2xl font-bold text-white text-center mb-3 drop-shadow-md">
                  {role.title}
                </h3>

                {/* Card Description */}
                <p className="text-white/80 text-center mb-6 drop-shadow-sm">
                  {role.description}
                </p>

                {/* Questions Count */}
                <div className="text-center">
                  <span className="inline-block backdrop-blur bg-white/20 px-4 py-2 rounded-full text-white/90 text-sm font-semibold border border-white/30">
                    {role.questions.length} Questions
                  </span>
                </div>

                {/* Hover Button Effect */}
                <div className="mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold transform hover:scale-110 transition-transform">
                    Start Interview
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/30 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">✨ Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🤖</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">AI-Powered Evaluation</h4>
                  <p className="text-white/70">Real-time assessment of your answers with detailed feedback</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Performance Scores</h4>
                  <p className="text-white/70">Get scores for communication, technical depth, and confidence</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">💡</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Personalized Tips</h4>
                  <p className="text-white/70">Receive improvement suggestions tailored to your performance</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">📈</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Session History</h4>
                  <p className="text-white/70">Track your progress with complete interview history</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:scale-105 shadow-xl drop-shadow-lg">
              👉 Select a Role Above to Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
