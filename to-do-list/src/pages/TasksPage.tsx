import  { useState } from 'react';
import TaskItem from '../components/Task/TaskItem';
import Swal from 'sweetalert2'; 
import '../styles/TasksPage.css';

interface Task {
  id: number;
  title: string;
  description: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Task 1', description: 'Add your task here' },
    { id: 2, title: 'Task 2', description: 'How is this possible' },
    { id: 3, title: 'Task 3', description: 'It blows my mind' },
    { id: 4, title: 'Task 4', description: 'I can\'t believe I am doing this' },
    { id: 5, title: 'Task 5', description: 'How you make all of this so easy' },
  ]);

  const handleAddTask = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Task',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Title">' +
        '<textarea id="swal-input2" class="swal2-textarea" placeholder="Description"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const title = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const description = (document.getElementById('swal-input2') as HTMLTextAreaElement).value;
        if (!title || !description) {
          Swal.showValidationMessage('Please fill in both fields');
        }
        return { title, description };
      },
    });

    if (formValues) {
      const newTask: Task = {
        id: Date.now(),
        title: formValues.title,
        description: formValues.description,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleEditTask = (id: number, newTitle: string, newDescription: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="tasks-container">
      <h1>To-Do List</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
      <button className="add-task-button" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default TasksPage;