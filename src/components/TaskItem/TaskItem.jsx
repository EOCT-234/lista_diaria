import React from 'react';

export const TaskItem = ({ 
  task, 
  dateString, 
  onToggleTask, 
  onDeleteTask 
}) => {
  const { id, title, completed, isMigrated } = task;

  return (
    <li className={`task-item ${completed ? 'task-completed' : ''}`}>
      <label className="task-checkbox-container">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleTask(dateString, id)}
          aria-label={`Marcar "${title}" como completada`}
        />
        <span className="checkmark"></span>
      </label>

      <div className="task-content">
        <span className="task-title">{title}</span>
        {isMigrated && !completed && (
          <span className="badge-migrated" title="Pendiente de un día anterior">
            ↳ Pendiente
          </span>
        )}
      </div>

      <button
        className="btn-delete-task"
        onClick={() => onDeleteTask(dateString, id)}
        aria-label={`Eliminar tarea "${title}"`}
        title="Eliminar tarea"
      >
        &times;
      </button>
    </li>
  );
};

export default TaskItem;