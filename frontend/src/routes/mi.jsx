import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Appoinments from '../components/tables/appoinments';
import MentorProfileE from '../components/tables/mentorProfileE';
import Blogs from '../components/blog/blog-cards';
import BlogDetail from '../components/blog/BlogDetails';
import UserList from '../components/tables/userlist';
import MiLandingPage from '../components/miandingpage';
import MentorProfile from '../components/tables/mentorProfile';
import StudentProfileE from '../components/tables/studentProfileE';

import Community from '../components/community/communityHome'
import CommunityHome from '../components/community/communityHome';
import PostForm from '../components/community/postCommunity';

import PostDetail from '../components/community/postDetails';
const MiRoute = () => {
  return (
    <Routes>
      <Route path='/*' element={<MiLandingPage />} />
      <Route path="/appoinments" element={<Appoinments />} />
      <Route path="/miprofile/:_id" element={<MentorProfileE />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:type/:id" element={<BlogDetail />} />
      <Route path='/alluser' element={<UserList />} />
      <Route path='/:role/:id' element={<MentorProfile />} />
      <Route path='/studentprofile/:_id' element={<StudentProfileE />} />
      <Route path='/community'>
        <Route index element={<CommunityHome />} />
        <Route path='post' element={<PostForm />} />
        <Route path='posts/:id' element={<PostDetail />} />
      </Route>
    </Routes>
  )
}

export default MiRoute;