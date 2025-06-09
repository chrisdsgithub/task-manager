import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <p>Full Stack App: React + Flask + MySQL</p>
      </header>
      
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

export default App;