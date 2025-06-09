import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAddTask(formData);
      setFormData({ title: '', description: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add New Task</h2>
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          placeholder="Task description (optional)"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;