import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MentorList from '../components/tables/mentorlist';
import MentorProfile from '../components/tables/mentorProfile';
import StudentProfileE from '../components/tables/studentProfileE';
import InvestorList from '../components/tables/investorlist';

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
