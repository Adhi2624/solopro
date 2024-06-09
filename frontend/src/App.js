import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './components/Login';
import SignUP from './components/SignUP';
import Blogs from './components/blog/blog-cards';
import BlogDetail from './components/blog/BlogDetails';
import AdminBlog from './components/blog/AdminBlog';
// import Dashboard from './pages/dashboard';
import Navbarr from './components/nav';

function App() {
    return (
        <Router>
            <div className="App">
                {/* <Navbarr /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUP />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:type/:id" element={<BlogDetail />} />
                    <Route path="/adminblog" element={<AdminBlog />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
