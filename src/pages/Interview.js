import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';

const Interview = () => {
  const navigate = useNavigate();
  const { selectedRole, currentQuestionIndex, submitAnswer, finishInterview } =
    useInterview();

  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRecording, setIsRecording] = useState(false);

  const currentQuestion = selectedRole?.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === selectedRole?.questions.length - 1;

  // Timer effect
  useEffect(() => {
    if (!currentQuestion) return;

    setTimeLeft(currentQuestion.timeLimit);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, currentQuestion]);

  const handleSubmit = () => {
    if (currentAnswer.trim()) {
      submitAnswer({
        questionIndex: currentQuestionIndex,
        text: currentAnswer,
        timestamp: new Date().toISOString(),
      });
      setCurrentAnswer('');
    }
  };

  const handleFinish = () => {
    finishInterview();
    navigate('/results');
  };

  if (!selectedRole) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-blue-300 to-cyan-300 p-4 py-8">
      {/* Background effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-5 w-32 h-32 bg-white opacity-10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-40 h-40 bg-blue-200 opacity-10 blur-3xl rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header with progress */}
        <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-6 mb-6 border border-white/30 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-1">
                {selectedRole.icon} {selectedRole.title}
              </h1>
              <p className="text-white/80">Interview Session</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">Question</p>
              <p className="text-3xl font-bold text-white drop-shadow-lg">
                {currentQuestionIndex + 1} / {selectedRole.questions.length}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden border border-white/30">
            <div
              className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / selectedRole.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="backdrop-blur-xl bg-white/15 rounded-3xl p-10 mb-6 border border-white/30 shadow-2xl">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block backdrop-blur bg-white/20 px-4 py-2 rounded-full text-white/90 text-sm font-semibold border border-white/30">
              {currentQuestion?.category}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg leading-tight">
            {currentQuestion?.text}
          </h2>

          {/* Timer */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`text-center px-6 py-3 rounded-full backdrop-blur bg-white/20 border border-white/30 ${
                timeLeft < 30 ? 'border-red-400 bg-red-500/20' : ''
              }`}
            >
              <p className={`text-sm text-white/80 mb-1`}>Time Remaining</p>
              <p className={`text-2xl font-bold ${timeLeft < 30 ? 'text-red-200' : 'text-white'}`}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </p>
            </div>

            {/* Recording indicator */}
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isRecording
                  ? 'bg-red-500/30 text-red-200 border border-red-400'
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
              }`}
            >
              <span className={isRecording ? 'animate-pulse text-lg' : 'text-lg'}>
                {isRecording ? '🎤' : '🎙️'}
              </span>
              {isRecording ? 'Recording...' : 'Start Recording'}
            </button>
          </div>
        </div>

        {/* Answer Input Area */}
        <div className="backdrop-blur-xl bg-white/15 rounded-3xl p-10 border border-white/30 shadow-2xl">
          <label className="block text-white font-semibold mb-4 text-lg drop-shadow-lg">
            Your Answer
          </label>

          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your response here or use the microphone to speak..."
            className="w-full h-40 bg-white/20 backdrop-blur text-white placeholder-white/50 rounded-xl p-4 border border-white/30 focus:outline-none focus:border-white/60 focus:bg-white/25 resize-none transition-all duration-300"
          />

          {/* Character count */}
          <div className="text-right text-white/70 text-sm mt-2">
            {currentAnswer.length} characters
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            {!isLastQuestion ? (
              <>
                <button
                  onClick={handleSubmit}
                  disabled={!currentAnswer.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transform transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg drop-shadow-lg"
                >
                  Next Question →
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-xl border border-white/30 transform transition-all duration-300 hover:scale-105"
                >
                  Exit Interview
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSubmit}
                  disabled={!currentAnswer.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transform transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg drop-shadow-lg"
                >
                  Submit Answer
                </button>
                <button
                  onClick={handleFinish}
                  className="flex-1 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg drop-shadow-lg"
                >
                  Finish & See Results ✓
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/30">
          <p className="text-white/80 text-sm">
            💡 <strong>Tip:</strong> Take your time to provide thoughtful, detailed answers. Focus on
            clarity, examples, and demonstrating your expertise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Interview;
