import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthProvider, useAuth } from './AuthContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import './App.css';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:5000/api';

function AppContent() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      if (error.response?.status === 401) {
        console.log('User not authenticated');
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updates);
      setTasks(tasks.map(task => task.id === taskId ? response.data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="App">
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="App">
        <div className="auth-wrapper">
          {authMode === 'login' ? (
            <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      
      <main className="App-main">
        <TaskForm onAddTask={addTask} />
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList 
            tasks={tasks} 
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;