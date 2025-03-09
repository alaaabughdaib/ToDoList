import { useState } from 'react';
import '../../styles/TaskItem.css';

interface TaskItemProps {
  task: { id: number; title: string; description: string };
  onEditTask: (id: number, newTitle: string, newDescription: string) => void;
  onDeleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
    if (isEditing) {
      onEditTask(task.id, editedTitle, editedDescription);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-textarea"
          />
        </div>
      ) : (
        <div className="task-content">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      )}
      <div className="task-actions">
        <button onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;