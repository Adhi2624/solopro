import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login';
import SignUP from './components/SignUP';
import Blogs from './components/blog/blog-cards';
import BlogDetail from './components/blog/BlogDetails';
import AdminBlog from './components/blog/AdminBlog';
// import Dashboard from './pages/dashboard';
import Navbarr from './components/nav';
import SignupQuestions from './components/SignupQuestions';
import StudentsRoute from './routes/studentsRoute';
import './css/style.css';
import MiRoute from './routes/mi';
import NotFoundPage from './components/404';
function App() {

    return (
        <Router>
            <div className="App">
                {/* <Navbarr /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/student/*' element={<StudentsRoute />} />
                    <Route path='/mi/*' element={<MiRoute />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/newReg" element={<SignUP />} />
                    <Route path="/signUp" element={<SignupQuestions />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:type/:id" element={<BlogDetail />} />
                    <Route path="/adminblog" element={<AdminBlog />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route path="*" element={<NotFoundPage />}/>
                </Routes>
            </div>
        </Router>
    );

}

export default App;
