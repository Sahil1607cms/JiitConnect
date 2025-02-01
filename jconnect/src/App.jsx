import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import FindStudyBuddies from './Components/FindStudyBuddies';
import { ClubsActivities, ActivitiesDashboard } from './Components/ClubsActivities';

import ClubLogin from './Components/ClubLogin';
import Auth from './Components/Auth';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/find-study-buddies" element={<FindStudyBuddies />} />
        <Route path="/clubs-activities" element={<ClubsActivities />} />
        
        {/* Club-Specific Routes */}
        <Route path="/club-login" element={<ClubLogin />} />
        <Route path="/club/:clubId" element={<ActivitiesDashboard />} />
        
        {/* Authentication Route */}
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;