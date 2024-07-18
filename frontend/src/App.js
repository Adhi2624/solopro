import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import Blogs from "./components/blog/blog-cards";
import BlogDetail from "./components/blog/BlogDetails";
import AdminBlog from "./components/blog/AdminBlog";
import SignupQuestions from "./components/SignupQuestions";
import StudentsRoute from "./routes/studentsRoute";
import AdminRoute from "./routes/adminroute";
import MiRoute from "./routes/mi";
import NotFoundPage from "./components/404";
import GOOGLR from "./components/GOOGLR";
import PrivateRoute from "./routes/privateRoute/PrivateRoute";
import FirstPage from "./components/homepage/LandingPage/FirstPage";
import HomePage from "./pages/home/Home";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import CreateMeet from "./components/GOOGLR";
import List from "./pages/list/List";
import UserList from "./components/tables/userlist";
import ListMentors from "./pages/list/List-mentors";
import ListStudents from "./pages/list/List-students";
import ListEntrepreneur from "./pages/list/List-entre"; 

import ForgotPassword from "./components/forgotpassword";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    
    <Router>
      <div className={darkMode ? "app dark" : "app"}>
        <Routes>
        <Route path="/password-reset" element={<ForgotPassword />} />

          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignupQuestions />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:type/:id" element={<BlogDetail />} />
          <Route path="/adminblog" element={<AdminBlog />} />

          <Route element={<PrivateRoute allowedRoles={["Student"]} />}>
            <Route path="/student/*" element={<StudentsRoute />} />
          </Route>

          <Route
            element={<PrivateRoute allowedRoles={["Mentor", "Investor",'Entrepreneur']} />}
          >
            <Route path="/mi/*" element={<MiRoute />} />
          </Route>
          
          <Route
          element={<PrivateRoute allowedRoles={["Admin"]}/>}
          ><Route path="/dashboard" element={<HomePage />} /></Route>
          <Route path="/users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>
          <Route path="/students" element={<ListStudents />} />
          <Route path="/mentors" element={<ListMentors />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/investors" element={<List />} />
          <Route path="/Entrepreneur" element={<ListEntrepreneur />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
