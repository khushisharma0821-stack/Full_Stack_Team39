import React, { createContext, useState, useContext } from 'react';

const InterviewContext = createContext();

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within InterviewProvider');
  }
  return context;
};

export const InterviewProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);

  const jobRoles = [
    {
      id: 1,
      title: 'Frontend Developer',
      icon: '💻',
      description: 'Build interactive web interfaces',
      questions: [
        {
          id: 1,
          text: 'Explain the difference between var, let, and const in JavaScript.',
          category: 'Technical Knowledge',
          timeLimit: 120,
        },
        {
          id: 2,
          text: 'How would you optimize the performance of a React application?',
          category: 'Technical Knowledge',
          timeLimit: 120,
        },
        {
          id: 3,
          text: 'Describe a challenging project you worked on and how you overcame obstacles.',
          category: 'Communication',
          timeLimit: 180,
        },
        {
          id: 4,
          text: 'How do you approach learning new technologies and frameworks?',
          category: 'Problem Solving',
          timeLimit: 120,
        },
        {
          id: 5,
          text: 'What is your experience with responsive design and CSS?',
          category: 'Technical Knowledge',
          timeLimit: 120,
        },
      ],
    },
    {
      id: 2,
      title: 'Data Analyst',
      icon: '📊',
      description: 'Analyze data and derive insights',
      questions: [
        {
          id: 1,
          text: 'Walk us through your approach to analyzing a new dataset.',
          category: 'Technical Knowledge',
          timeLimit: 120,
        },
        {
          id: 2,
          text: 'How do you handle missing or inconsistent data in your analysis?',
          category: 'Problem Solving',
          timeLimit: 120,
        },
        {
          id: 3,
          text: 'Tell us about a time you presented complex data to non-technical stakeholders.',
          category: 'Communication',
          timeLimit: 180,
        },
        {
          id: 4,
          text: 'What SQL queries or data visualization tools do you commonly use?',
          category: 'Technical Knowledge',
          timeLimit: 120,
        },
        {
          id: 5,
          text: 'Describe your experience with statistical analysis and hypothesis testing.',
          category: 'Technical Knowledge',
          timeLimit: 120,
        },
      ],
    },
    {
      id: 3,
      title: 'Product Manager',
      icon: '🎯',
      description: 'Define product strategy and roadmap',
      questions: [
        {
          id: 1,
          text: 'How do you prioritize features when working on a product roadmap?',
          category: 'Technical Knowledge',
          timeLimit: 120,
        },
        {
          id: 2,
          text: 'Tell us about a product you built or improved and the metrics that mattered.',
          category: 'Communication',
          timeLimit: 180,
        },
        {
          id: 3,
          text: 'How do you handle conflicting requirements from different stakeholders?',
          category: 'Problem Solving',
          timeLimit: 120,
        },
        {
          id: 4,
          text: 'What is your framework for making product decisions?',
          category: 'Technical Knowledge',
          timeLimit: 120,
        },
        {
          id: 5,
          text: 'How do you gather and incorporate user feedback into your product strategy?',
          category: 'Communication',
          timeLimit: 120,
        },
      ],
    },
  ];

  const startInterview = (roleId) => {
    const role = jobRoles.find((r) => r.id === roleId);
    setSelectedRole(role);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScores(null);
  };

  const submitAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const finishInterview = () => {
    const performance = calculateScores();
    setScores(performance);

    const sessionData = {
      id: Date.now(),
      role: selectedRole.title,
      date: new Date().toLocaleDateString(),
      scores: performance,
      totalQuestions: selectedRole.questions.length,
    };

    setSessionHistory([...sessionHistory, sessionData]);
  };

  const calculateScores = () => {
    const communication = Math.floor(Math.random() * 40) + 60;
    const technicalDepth = Math.floor(Math.random() * 40) + 60;
    const confidence = Math.floor(Math.random() * 40) + 60;
    const overall = Math.floor((communication + technicalDepth + confidence) / 3);

    return {
      communication,
      technicalDepth,
      confidence,
      overall,
    };
  };

  const resetInterview = () => {
    setSelectedRole(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScores(null);
  };

  const value = {
    jobRoles,
    selectedRole,
    currentQuestionIndex,
    answers,
    scores,
    sessionHistory,
    startInterview,
    submitAnswer,
    finishInterview,
    calculateScores,
    resetInterview,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};
