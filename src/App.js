import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InterviewProvider } from './context/InterviewContext';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <InterviewProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </InterviewProvider>
  );
}

export default App;
