import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  StudentsRoute  from './routes/studentsRoute';
import './css/style.css';
import MiRoute from './routes/mi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/student/*' element={<StudentsRoute />} />
        <Route path='/mi/*' element={<MiRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
