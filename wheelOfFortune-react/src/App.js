


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Game from './pages/Game';
import Profile from './pages/Profile'
import Scores from './pages/Scores'
import { GlobalProvider } from './components/GlobalContext';

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;

