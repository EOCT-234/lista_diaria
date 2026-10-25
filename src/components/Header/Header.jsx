import React from 'react';

export const Header = ({ onOpenAddTaskModal }) => {
  // Obtener la fecha actual
  const today = new Date();

  // Formatear el día de la semana y la fecha (ej: "Domingo, 25 de Octubre")
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = today.toLocaleDateString('es-ES', options);

  // Capitalizar la primera letra del día
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <header className="app-header">
      <div className="header-info">
        <h1>Mi Agenda</h1>
        <p className="today-date">
          Hoy es <span className="highlight-date">{capitalizedDate}</span>
        </p>
      </div>

      <button 
        className="btn-add-task" 
        onClick={onOpenAddTaskModal}
        aria-label="Agregar nueva actividad"
      >
        <span className="btn-icon">+</span>
        <span>Nueva Actividad</span>
      </button>

      {/* Estilos específicos del Header */}
      <style jsx>{`
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1rem;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .header-info h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .today-date {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .highlight-date {
          color: var(--accent-color);
          font-weight: 600;
        }

        .btn-add-task {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--accent-color);
          color: #ffffff;
          padding: 0.65rem 1.2rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .btn-add-task:hover {
          background-color: var(--accent-hover);
          transform: translateY(-2px);
        }

        .btn-add-task:active {
          transform: translateY(0);
        }

        .btn-icon {
          font-size: 1.2rem;
          line-height: 1;
        }

        @media (max-width: 600px) {
          .app-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .btn-add-task {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;