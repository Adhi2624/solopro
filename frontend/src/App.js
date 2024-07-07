import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login';
import Blogs from './components/blog/blog-cards';
import BlogDetail from './components/blog/BlogDetails';
import AdminBlog from './components/blog/AdminBlog';
import SignupQuestions from './components/SignupQuestions';
import StudentsRoute from './routes/studentsRoute';
import MiRoute from './routes/mi';
import NotFoundPage from './components/404';
import './css/style.css';
import GOOGLR from './components/GOOGLR';
import PrivateRoute from './routes/privateRoute/PrivateRoute';
import FirstPage from './components/homepage/LandingPage/FirstPage';
import CreateMeet from './components/GOOGLR';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignupQuestions />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:type/:id" element={<BlogDetail />} />
          <Route path="/adminblog" element={<AdminBlog />} />
          
          <Route element={<PrivateRoute allowedRoles={['Student']} />}>
            <Route path="/student/*" element={<StudentsRoute />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={['Mentor', 'Investor','entrepreneurs']} />}>
            <Route path="/mi/*" element={<MiRoute />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
    // <CreateMeet />
  );
}

export default App;
