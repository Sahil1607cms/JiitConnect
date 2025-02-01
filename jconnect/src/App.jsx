import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Auth from './Components/Auth';
import FindStudyBuddies from './Components/FindStudyBuddies';
import StudyRoom from './Components/StudyRoom';

const App=()=>{
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
}

export default App;
