import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/api';
import TaskForm from '../components/Tasks/TaskForm';
import TaskItem from '../components/Tasks/TaskItem';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchTasks();
  }, [user, navigate]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
      setIsFormVisible(false);
    } catch (error) {
      setError('Failed to create task');
      console.error(error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await updateTask(editingTask._id, taskData);
      setTasks(tasks.map(task => 
        task._id === editingTask._id ? updatedTask : task
      ));
      setEditingTask(null);
    } catch (error) {
      setError('Failed to update task');
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      setError('Failed to delete task');
      console.error(error);
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(task => task._id === id);
    try {
      const updatedTask = await updateTask(id, { 
        completed: !task.completed 
      });
      setTasks(tasks.map(task => 
        task._id === id ? updatedTask : task
      ));
    } catch (error) {
      setError('Failed to update task');
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setIsFormVisible(false);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Tasks</h1>
          {!isFormVisible ? (
            <button 
              className="btn" 
              onClick={() => setIsFormVisible(true)}
            >
              Add New Task
            </button>
          ) : (
            <button 
              className="btn btn-secondary" 
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        {isFormVisible && (
          <TaskForm 
            task={editingTask} 
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask} 
            onCancel={handleCancelEdit}
          />
        )}

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="no-tasks">
              <p>No tasks yet. Add your first task!</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
