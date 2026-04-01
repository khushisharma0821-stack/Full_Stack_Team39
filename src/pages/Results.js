import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';

const Results = () => {
  const navigate = useNavigate();
  const { selectedRole, scores, sessionHistory, resetInterview } = useInterview();

  if (!scores || !selectedRole) {
    navigate('/');
    return null;
  } //Check

  const getImprovementTips = () => {
    const tips = [];

    if (scores.communication < 75) {
      tips.push({
        icon: '🗣️',
        title: 'Improve Communication',
        suggestions: [
          'Use more concrete examples to illustrate your points',
          'Practice speaking more clearly and at a moderate pace',
          'Structure your answers with clear beginning, middle, and end',
        ],
      });
    }

    if (scores.technicalDepth < 75) {
      tips.push({
        icon: '🔧',
        title: 'Deepen Technical Knowledge',
        suggestions: [
          'Study advanced concepts in your field',
          'Work on real-world projects to gain practical experience',
          'Learn the "why" behind technologies, not just how to use them',
        ],
      });
    }

    if (scores.confidence < 75) {
      tips.push({
        icon: '💪',
        title: 'Build Confidence',
        suggestions: [
          'Practice more interviews to get comfortable with the format',
          'Reflect on your achievements and past successes',
          'Prepare stories that showcase your strengths',
        ],
      });
    }

    if (tips.length === 0) {
      tips.push({
        icon: '⭐',
        title: 'Excellent Performance!',
        suggestions: [
          'You demonstrated strong technical knowledge and communication skills',
          'Consider preparing for more advanced interview scenarios',
          'Keep practicing to maintain and improve your performance',
        ],
      });
    }

    return tips;
  };

  const getPerformanceLevel = (score) => {
    if (score >= 85) return { level: 'Excellent', color: 'from-green-400 to-emerald-400' };
    if (score >= 70) return { level: 'Good', color: 'from-blue-400 to-cyan-400' };
    if (score >= 55) return { level: 'Fair', color: 'from-yellow-400 to-orange-400' };
    return { level: 'Needs Improvement', color: 'from-red-400 to-pink-400' };
  };

  const improvementTips = getImprovementTips();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-red-300 p-4 py-8">
      {/* Background effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-5 w-32 h-32 bg-white opacity-10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-40 h-40 bg-pink-200 opacity-10 blur-3xl rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
            🎉 Interview Complete!
          </h1>
          <p className="text-white/80 text-lg">
            {selectedRole.icon} {selectedRole.title} Interview Results
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 rounded-3xl p-12 mb-8 border border-white/30 shadow-2xl">
          <div className="text-center mb-12">
            <p className="text-white/80 text-lg mb-4">Overall Performance</p>
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center border-4 border-white/40 shadow-xl">
                <div className={`text-center`}>
                  <div className="text-5xl font-bold text-white drop-shadow-lg mb-1">
                    {scores.overall}
                  </div>
                  <div className={`text-sm text-white/90 font-semibold`}>
                    {getPerformanceLevel(scores.overall).level}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full animate-pulse opacity-30 border-4 border-white/40"></div>
            </div>
          </div>

          {/* Score Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Communication Score */}
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/30 text-center">
              <p className="text-white/80 text-sm font-semibold mb-3 drop-shadow-md">COMMUNICATION</p>
              <div className="mb-4">
                <div className="text-4xl font-bold text-white drop-shadow-lg">
                  {scores.communication}
                </div>
                <p className="text-white/70 text-sm mt-2">{getPerformanceLevel(scores.communication).level}</p>
              </div>
              {/* Score bar */}
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full transition-all duration-500"
                  style={{ width: `${scores.communication}%` }}
                ></div>
              </div>
            </div>

            {/* Technical Depth Score */}
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/30 text-center">
              <p className="text-white/80 text-sm font-semibold mb-3 drop-shadow-md">TECHNICAL DEPTH</p>
              <div className="mb-4">
                <div className="text-4xl font-bold text-white drop-shadow-lg">
                  {scores.technicalDepth}
                </div>
                <p className="text-white/70 text-sm mt-2">{getPerformanceLevel(scores.technicalDepth).level}</p>
              </div>
              {/* Score bar */}
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-full transition-all duration-500"
                  style={{ width: `${scores.technicalDepth}%` }}
                ></div>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/30 text-center">
              <p className="text-white/80 text-sm font-semibold mb-3 drop-shadow-md">CONFIDENCE</p>
              <div className="mb-4">
                <div className="text-4xl font-bold text-white drop-shadow-lg">
                  {scores.confidence}
                </div>
                <p className="text-white/70 text-sm mt-2">{getPerformanceLevel(scores.confidence).level}</p>
              </div>
              {/* Score bar */}
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${scores.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Tips Section */}
        <div className="space-y-6 mb-8">
          {improvementTips.map((tip, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/15 rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{tip.icon}</span>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                    {tip.title}
                  </h3>
                  <ul className="space-y-3">
                    {tip.suggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <span className="text-xl mt-1">✓</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Session History */}
        {sessionHistory.length > 0 && (
          <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-8 border border-white/30 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">📈 Session History</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-4">
              {sessionHistory.slice().reverse().map((session, index) => (
                <div
                  key={session.id}
                  className="backdrop-blur-md bg-white/10 rounded-lg p-4 border border-white/20 flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-semibold">{session.role}</p>
                    <p className="text-white/70 text-sm">{session.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{session.scores.overall}/100</p>
                    <p className="text-white/70 text-sm">{session.totalQuestions} questions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={() => {
              resetInterview();
              navigate('/');
            }}
            className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg drop-shadow-lg"
          >
            🏠 Back to Home
          </button>
          <button
            onClick={() => {
              resetInterview();
              navigate('/interview');
            }}
            className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg drop-shadow-lg"
          >
            🔄 Practice Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
