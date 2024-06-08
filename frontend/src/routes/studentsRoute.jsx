import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MentorList from '../pages/mentorlist';
import MentorProfile from '../pages/mentorProfile';
import StudentProfileE from '../pages/studentProfileE';
import InvestorList from '../pages/investorlist';

const StudentsRoute = () => {
  return (
    <Routes>
      <Route path='/mentorpage' element={<MentorList />} />
      <Route path='/investorpage' element={<InvestorList/>}/>
      <Route path="/investor/:_id" element={<MentorProfile />} />
      <Route path="/mentor/:_id" element={<MentorProfile />} />
      <Route path="/studentprofile/:_id" element={<StudentProfileE />} />
    </Routes>
  );
};

export default StudentsRoute;
