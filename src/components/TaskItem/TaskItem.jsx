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

      {/* Estilos específicos para TaskItem */}
      <style jsx>{
        .task-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.8rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          transition: background-color var(--transition-fast), opacity var(--transition-fast);
        }

        .task-item:hover {
          border-color: var(--text-muted);
        }

        .task-checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .task-checkbox-container input {
          width: 18px;
          height: 18px;
          accent-color: var(--accent-color);
          cursor: pointer;
        }

        .task-content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
          overflow: hidden;
        }

        .task-title {
          font-size: 0.9rem;
          color: var(--text-primary);
          word-break: break-word;
        }

        .btn-delete-task {
          color: var(--text-muted);
          font-size: 1.2rem;
          line-height: 1;
          padding: 0 0.25rem;
          border-radius: 4px;
          opacity: 0.5;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }

        .btn-delete-task:hover {
          opacity: 1;
          color: #ef4444; /* Color rojo para eliminar */
        }
      }</style>
    </li>
  );
};

export default TaskItem;