import React from 'react';
import Navinvmen from '../components/navinme';
import { Routes,Route } from 'react-router-dom';
import Appoinments from '../pages/appoinments';
import MentorProfileE from '../pages/mentorProfileE';

const MiRoute = () => {
  return (
    <Routes>
        <Route path="appoinments" element={<Appoinments/>}/>
        <Route path="/miprofile/:_id" element={<MentorProfileE />} />
    </Routes>
  )
}

export default MiRoute;