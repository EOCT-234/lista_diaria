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

  useEffect(() => {
    if (selectedDateString) {
      setTargetDate(selectedDateString);
    } else if (availableDays && availableDays.length > 0) {
      setTargetDate(availableDays[0].dateString);
    }
  }, [selectedDateString, availableDays]);

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
    </div>
  );
};

export default AddTaskModal;