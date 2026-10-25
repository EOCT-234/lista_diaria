import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

export const DayCard = ({ 
  dayData, 
  onToggleTask, 
  onDeleteTask, 
  onAddTaskForDay 
}) => {
  const { date, dateString, dayName, dayNumber, isToday, tasks } = dayData;

  return (
    <article className={`day-card ${isToday ? 'is-today' : ''}`}>
      {/* Cabecera de la tarjeta del día */}
      <header className="day-card-header">
        <div className="day-info">
          <span className="day-name">{dayName}</span>
          <span className="day-number">{dayNumber}</span>
        </div>
        {isToday && <span className="today-badge">Hoy</span>}
      </header>

      {/* Lista de tareas pertenecientes a este día */}
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="no-tasks">Sin actividades programadas</p>
        ) : (
          <ul className="tasks-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                dateString={dateString}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Botón inferior para agregar tarea rápida a este día */}
      <footer className="day-card-footer">
        <button 
          className="btn-add-day-task"
          onClick={() => onAddTaskForDay(dateString)}
          aria-label={`Agregar tarea para el ${dayName}`}
        >
          + Agregar actividad
        </button>
      </footer>

      {/* Estilos específicos del DayCard */}
      <style jsx>{`
        .day-card {
          flex: 0 0 300px; /* Ancho fijo para cada tarjeta en el slider */
          scroll-snap-align: start;
          background-color: var(--bg-card);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 480px;
          padding: 1rem;
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }

        .day-card:hover {
          background-color: var(--bg-card-hover);
        }

        .day-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 0.75rem;
        }

        .day-info {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .day-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-primary);
          text-transform: capitalize;
        }

        .day-number {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .today-badge {
          background-color: var(--accent-color);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tasks-container {
          flex: 1;
          overflow-y: auto;
          padding-right: 0.25rem;
        }

        .tasks-container::-webkit-scrollbar {
          width: 4px;
        }

        .tasks-container::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: var(--radius-sm);
        }

        .tasks-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .no-tasks {
          color: var(--text-muted);
          font-size: 0.85rem;
          text-align: center;
          margin-top: 2rem;
          font-style: italic;
        }

        .day-card-footer {
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-color);
          margin-top: auto;
        }

        .btn-add-day-task {
          width: 100%;
          text-align: center;
          padding: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: var(--radius-sm);
          border: 1px dashed var(--border-color);
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }

        .btn-add-day-task:hover {
          background-color: rgba(99, 102, 241, 0.1);
          color: var(--accent-color);
          border-color: var(--accent-color);
        }
      `}</style>
    </article>
  );
};

export default DayCard;