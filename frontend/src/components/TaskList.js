import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;