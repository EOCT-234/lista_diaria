import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from './DayCard.module.css';

export const DayCard = ({ 
  dayData, 
  onToggleTask, 
  onDeleteTask, 
  onAddTaskForDay 
}) => {
  const { dateString, dayName, dayNumber, isToday, tasks } = dayData;

  return (
    <article className={`${styles.dayCard} ${isToday ? 'is-today' : ''}`}>
      {/* Cabecera de la tarjeta del día */}
      <header className={styles.dayCardHeader}>
        <div className={styles.dayInfo}>
          <span className={styles.dayName}>{dayName}</span>
          <span className={styles.dayNumber}>{dayNumber}</span>
        </div>
        {isToday && <span className={styles.todayBadge}>Hoy</span>}
      </header>

      {/* Lista de tareas pertenecientes a este día */}
      <div className={styles.tasksContainer}>
        {tasks.length === 0 ? (
          <p className={styles.noTasks}>Sin actividades programadas</p>
        ) : (
          <ul className={styles.tasksList}>
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
      <footer className={styles.dayCardFooter}>
        <button 
          className={styles.btnAddDayTask}
          onClick={() => onAddTaskForDay(dateString)}
          aria-label={`Agregar tarea para el ${dayName}`}
        >
          + Agregar actividad
        </button>
      </footer>
    </article>
  );
};

export default DayCard;