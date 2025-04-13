import { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="task-title-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task._id)}
            onClick={(e) => e.stopPropagation()}
          />
          <h3 className={task.completed ? 'completed-text' : ''}>{task.title}</h3>
        </div>
        <div className="task-meta">
          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <span className="task-due-date">{formatDate(task.dueDate)}</span>
          <button className="task-expand">
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="task-details">
          {task.description && (
            <div className="task-description">
              <p>{task.description}</p>
            </div>
          )}
          <div className="task-category">
            <span>Category: {task.category}</span>
          </div>
          <div className="task-actions">
            <button className="btn" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
