import React, { useState, useEffect } from 'react';

export const AddTaskModal = ({ 
  isOpen, 
  onClose, 
  onAddTask, 
  availableDays, 
  selectedDateString 
}) => {
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState(selectedDateString || '');

  // Sincronizar el día seleccionado por defecto cuando abre el modal
  useEffect(() => {
    if (selectedDateString) {
      setTargetDate(selectedDateString);
    } else if (availableDays && availableDays.length > 0) {
      setTargetDate(availableDays[0].dateString);
    }
  }, [selectedDateString, availableDays]);

  // Cierra el modal con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetDate) return;

    onAddTask(targetDate, title.trim());
    setTitle('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Nueva Actividad</h2>
          <button className="btn-close-modal" onClick={onClose} aria-label="Cerrar modal">
            &times;
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="task-title">Descripción de la actividad</label>
            <input
              id="task-title"
              type="text"
              placeholder="Ej: Ir al gimnasio, Terminar informe..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-date">Asignar al día</label>
            <select
              id="task-date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            >
              {availableDays.map((day) => (
                <option key={day.dateString} value={day.dateString}>
                  {day.dayName} ({day.dayNumber}) {day.isToday ? '- Hoy' : ''}
                </option>
              ))}
            </select>
          </div>

          <footer className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Guardar Actividad
            </button>
          </footer>
        </form>
      </div>

      {/* Estilos específicos para AddTaskModal */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 480px;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          animation: modalAppear 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .modal-header h2 {
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .btn-close-modal {
          font-size: 1.5rem;
          color: var(--text-muted);
          line-height: 1;
          transition: color var(--transition-fast);
        }

        .btn-close-modal:hover {
          color: var(--text-primary);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-group input,
        .form-group select {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.8rem;
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--accent-color);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .btn-cancel {
          padding: 0.6rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          transition: background-color var(--transition-fast);
        }

        .btn-cancel:hover {
          background-color: var(--bg-card);
        }

        .btn-submit {
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-sm);
          background-color: var(--accent-color);
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          transition: background-color var(--transition-fast);
        }

        .btn-submit:hover {
          background-color: var(--accent-hover);
        }
      `}</style>
    </div>
  );
};

export default AddTaskModal;