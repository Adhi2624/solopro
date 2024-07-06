import React, { useContext } from 'react';
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
import GOOGLR from './components/GOOGLR';
import PrivateRoute from './routes/privateRoute/PrivateRoute';
import FirstPage from './components/homepage/LandingPage/FirstPage';
import HomePage from "./pages/home/Home";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import CreateMeet from './components/GOOGLR';
import List from "./pages/list/List";
import ListMentors from "./pages/list/List-mentors";
import ListStudents from "./pages/list/List-students";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
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
          
          <Route element={<PrivateRoute allowedRoles={['Mentor', 'Investor']} />}>
            <Route path="/mi/*" element={<MiRoute />} />
          </Route>
          
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
          </Route>
          <Route path="/students" element={<ListStudents />} />
          <Route path="/mentors" element={<ListMentors />} />
          <Route path="/investors" element={<List />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
