import { useNavigate } from 'react-router-dom';
import '../styles/StartPage.css'; 
import backgroundImage from '../assets/images/StartBg.jpg'; 

const StartPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <div className="start-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="start-box">
        <h1>Welcome to Our To-Do List App</h1>
        <p>
  Take control of your day with our simple and powerful to-do list app. 
  Organize your tasks, set priorities, and watch your productivity soar. 
  Every big accomplishment starts with a clear plan . let’s turn your goals into reality, one task at a time! 
  Stay focused, stay on track, and celebrate every small win along the way. 
  Ready to make the most of your time? Click below to get started and conquer your to-do list like a pro!
</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default StartPage;