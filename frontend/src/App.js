import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  StudentsRoute  from './routes/studentsRoute';
import SignUp from './components/SignUP';
import './css/style.css';
import Login from './components/Login';
import MiRoute from './routes/mi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />  
        <Route path='/students/*' element={<StudentsRoute />} />
        <Route path='/mi/*' element={<MiRoute />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
