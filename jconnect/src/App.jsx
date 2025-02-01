import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
// import FindStudyBuddies from './Components/FindStudyBuddies';
// import StudyRoom from './Components/StudyRoom';
// import Footer from './Components/Footer';

const App=()=>{
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          {/* <Route path="/find-study-buddies" component={FindStudyBuddies} />
          <Route path="/study-room" component={StudyRoom} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
