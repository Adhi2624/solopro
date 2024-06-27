import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MentorList from '../components/tables/mentorlist';
import MentorProfile from '../components/tables/mentorProfile';
import StudentProfileE from '../components/tables/studentProfileE';
import InvestorList from '../components/tables/investorlist';
import Blogs from '../components/blog/blog-cards';
import BlogDetail from '../components/blog/BlogDetails';
import StudentLandingPage from '../components/studentlandingpage';

const StudentsRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<StudentLandingPage/>}/>
      <Route path='/mentorpage' element={<MentorList />} />
      <Route path='/investorpage' element={<InvestorList/>}/>
      <Route path="/:role/:id" element={<MentorProfile />} />
      <Route path="/studentprofile/:_id" element={<StudentProfileE />} />
      <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:type/:id" element={<BlogDetail />} />
    </Routes>
  );
};

export default StudentsRoute;
