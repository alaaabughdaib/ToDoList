import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage'; 
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import TasksPage from './pages/TasksPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} /> 
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/task" element={<TasksPage />} />
   
      </Routes>
    </Router>
  );
}

export default App;