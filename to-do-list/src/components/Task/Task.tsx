import '../../styles/Task.css'; 

interface TaskProps {
  name: string; 
  time: string; 
}

const Task: React.FC<TaskProps> = ({ name, time }) => {
  return (
    <div className="task">
      <div className="task-content">
        <h3>{name}</h3>
        <p>Due: {time}</p>
      </div>
      <button className="delete-button">Delete</button>
    </div>
  );
};

export default Task;