import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import TaskItem from '../components/Task/TaskItem';
import Swal from 'sweetalert2';
import '../styles/TasksPage.css';

interface Task {
  id: number;
  title: string;
  description: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser ? parsedUser.id : null;
    const token = storedToken || '';

    if (parsedUser) setUserName(parsedUser.name);

    if (!userId || !token) {
      console.log(' Missing credentials, fetchTasks not executed');
      return;
    }

    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:3000/csrf-token', {
          credentials: 'include',
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
        console.log(' CSRF Token retrieved:', data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF Token:', error);
      }
    };

    fetchCsrfToken();

    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'X-CSRF-Token': csrfToken || '',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch tasks');

        const data = await response.json();
        setTasks(data.tasks);
        console.log(' Retrieved Tasks:', data.tasks);
      } catch (error) {
        console.error(' Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!csrfToken) {
      console.error(' CSRF Token is missing!');
      return;
    }

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
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            title: formValues.title,
            description: formValues.description,
            userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null,
          }),
        });

        if (!response.ok) throw new Error('Failed to add task');

        const newTask = await response.json();
        setTasks([...tasks, newTask.task]);
        console.log(' Task added:', newTask.task);
      } catch (error) {
        console.error(' Error adding task:', error);
      }
    }
  };

  const handleUpdateTask = async (taskId: number, currentTitle: string, currentDescription: string) => {
    if (!csrfToken) {
      console.error('CSRF Token is missing!');
      return;
    }
  
    const { value: formValues } = await Swal.fire({
      title: 'Update Task',
      html:
        `<input id="swal-input1" class="swal2-input" value="${currentTitle}" placeholder="New Title">` +
        `<textarea id="swal-input2" class="swal2-textarea" placeholder="New Description">${currentDescription}</textarea>`,
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
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            title: formValues.title,
            description: formValues.description,
          }),
        });
  
        if (!response.ok) throw new Error('Failed to update task');
  
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, title: formValues.title, description: formValues.description } : task
          )
        );
  
        console.log(' Task updated:', formValues);
      } catch (error) {
        console.error(' Error updating task:', error);
      }
    }
  };
  

  const handleDeleteTask = async (taskId: number) => {
    if (!csrfToken) {
      console.error(' CSRF Token is missing!');
      return;
    }
  
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
  
    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'include',
        });
  
        if (!response.ok) throw new Error('Failed to delete task');
  
      
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  
        console.log(` Task ${taskId} deleted successfully`);
      } catch (error) {
        console.error(' Error deleting task:', error);
      }
    }
  };
  

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('csrfToken');
    alert('User signed out');
    setUserName(null);
  };

  const handleViewProfile = () => {
    navigate('/myprofile'); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="tasks-container">
      <header className="page-header">
        <div className="user-info">
          <span className="username" onClick={toggleDropdown}>
            {userName || 'Guest'} ▼
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleViewProfile}>
                View Profile
              </button>
              <button className="dropdown-item" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>
      <h1>To-Do List</h1>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEditTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
      <button className="add-task-button" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default TasksPage;