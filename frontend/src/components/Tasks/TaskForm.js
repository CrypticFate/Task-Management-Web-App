import { useState, useEffect } from 'react';
import './TaskForm.css';

function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'general',
  });

  useEffect(() => {
    if (task) {
      // Format date to YYYY-MM-DD for input type="date"
      const formattedDate = task.dueDate 
        ? new Date(task.dueDate).toISOString().split('T')[0] 
        : '';
      
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: formattedDate,
        priority: task.priority || 'medium',
        category: task.category || 'general',
      });
    }
  }, [task]);

  const { title, description, dueDate, priority, category } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            rows="3"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={onChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={onChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn">
            {task ? 'Update Task' : 'Add Task'}
          </button>
          {onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
