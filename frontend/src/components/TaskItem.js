import React from 'react';

function TaskItem({ task, onUpdate, onDelete }) {
  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <small>Created: {new Date(task.created_at).toLocaleDateString()}</small>
      </div>
      <div className="task-actions">
        <button 
          onClick={handleToggleComplete}
          className={task.completed ? 'btn-complete' : 'btn-incomplete'}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;