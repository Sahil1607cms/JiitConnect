import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import FindStudyBuddies from './Components/FindStudyBuddies';
import StudyRoom from './Components/StudyRoom';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/login" element={<Auth/>} />
          <Route path="/find-study-buddies" element={<FindStudyBuddies/>} />
          <Route path="/study-room" element={<StudyRoom/>} />
        </Routes>
      </div>
      

    </Router>
  );
};

export default App;
