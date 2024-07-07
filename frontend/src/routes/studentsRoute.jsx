import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MentorList from '../components/tables/mentorlist';
import MentorProfile from '../components/tables/mentorProfile';
import StudentProfileE from '../components/tables/studentProfileE';
import InvestorList from '../components/tables/investorlist';
import Blogs from '../components/blog/blog-cards';
import BlogDetail from '../components/blog/BlogDetails';
import StudentLandingPage from '../components/studentlandingpage';
import Community from '../components/community/communityHome'
import CommunityHome from '../components/community/communityHome';
import PostForm from '../components/community/postCommunity';
import UserList from '../components/tables/userlist'
import PostDetail from '../components/community/postDetails';
const handleLogout = () => {
  // Remove items from localStorage

  localStorage.removeItem('user');

  // Redirect to login or home page
  // Example: Replace with your desired logout behavior
  window.location.href = '/'; // Redirect to login page after logout
};
const StudentsRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<StudentLandingPage />} />
      <Route path='/mentorpage' element={<MentorList />} />
      <Route path='/investorpage' element={<InvestorList />} />
      <Route path='/:role/:id' element={<MentorProfile />} />
      <Route path='/studentprofile/:_id' element={<StudentProfileE />} />
      <Route path='/alluser' element={<UserList />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/blogs/:type/:id' element={<BlogDetail />} />
      <Route path='/community'>
        <Route index element={<CommunityHome />} />
        <Route path='post' element={<PostForm />} />
        <Route path='posts/:id' element={<PostDetail/>}/>
      </Route>
    </Routes>

  );
};

export default StudentsRoute;
