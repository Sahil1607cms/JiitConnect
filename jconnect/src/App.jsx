import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import FindStudyBuddies from './Components/FindStudyBuddies';
import ClubsActivities from './Components/ClubsActivities';
import ClubLogin from './Components/ClubLogin';
import ActivitiesDashboard from './Components/ActivitiesDashboard';
import Auth from './Components/Auth';  // Add this path if it's in your structure

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/find-study-buddies" element={<FindStudyBuddies />} />
        <Route path="/clubs-activities" element={<ClubsActivities />} />

        {/* Club Representative Routes */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/activities-dashboard" element={<ActivitiesDashboard />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;

