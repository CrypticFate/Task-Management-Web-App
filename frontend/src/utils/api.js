import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
      console.log(`Auth token added to request to ${config.url}:`, user.token);
    } else {
      console.log(`No auth token found for request to ${config.url}`);
    }
    console.log('Full request config:', {
      url: config.url,
      method: config.method,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response for ${response.config.url}:`, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error(`API Error for ${error.config?.url || 'unknown endpoint'}:`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Test function to verify basic API connectivity
export const testApi = async () => {
  try {
    const response = await api.get('/test');
    console.log('Test API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Test API error:', error);
    throw error;
  }
};

// Test function to verify task API connectivity without authentication
export const testTasksApi = async () => {
  try {
    const response = await axios.get('/api/test-tasks');
    console.log('Test tasks API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Test tasks API error:', error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    console.log('Fetching tasks...');
    const response = await api.get('/tasks');
    console.log('Tasks fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error.response?.status, error.response?.data, error.message);
    throw error;
  }
};

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export default api;
