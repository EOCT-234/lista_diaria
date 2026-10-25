import React, { useRef } from 'react';
import DayCard from '../DayCard/DayCard';

export const WeekSlider = ({ 
  days, 
  onToggleTask, 
  onDeleteTask, 
  onAddTaskForDay 
}) => {
  const sliderRef = useRef(null);

  // Función para desplazarse hacia la izquierda o derecha en el slider
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 320; // Ancho aproximado de una tarjeta + gap
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Función para centrar la tarjeta del día actual
  const scrollToToday = () => {
    if (sliderRef.current) {
      const todayCard = sliderRef.current.querySelector('.is-today');
      if (todayCard) {
        todayCard.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  };

  return (
    <section className="slider-wrapper">
      {/* Barra de control superior del Slider */}
      <div className="slider-controls">
        <button 
          className="btn-today-shortcut"
          onClick={scrollToToday}
          title="Ir al día de hoy"
        >
          📍 Ir a Hoy
        </button>

        <div className="slider-arrows">
          <button 
            className="btn-arrow" 
            onClick={() => scroll('left')}
            aria-label="Días anteriores"
          >
            &#10094;
          </button>
          <button 
            className="btn-arrow" 
            onClick={() => scroll('right')}
            aria-label="Días siguientes"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Contenedor de las 7 ventanas deslizantes */}
      <div className="slider-container" ref={sliderRef}>
        {days.map((dayData) => (
          <DayCard
            key={dayData.dateString}
            dayData={dayData}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onAddTaskForDay={onAddTaskForDay}
          />
        ))}
      </div>

      {/* Estilos específicos para el Slider */}
      <style jsx>{`
        .slider-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          flex: 1;
        }

        .slider-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.5rem;
        }

        .btn-today-shortcut {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid var(--border-color);
          transition: background-color var(--transition-fast);
        }

        .btn-today-shortcut:hover {
          background-color: var(--bg-card);
          border-color: var(--accent-color);
        }

        .slider-arrows {
          display: flex;
          gap: 0.5rem;
        }

        .btn-arrow {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          border: 1px solid var(--border-color);
          transition: background-color var(--transition-fast), border-color var(--transition-fast);
        }

        .btn-arrow:hover {
          background-color: var(--accent-color);
          border-color: var(--accent-color);
        }

        /* Área de las 7 tarjetas con Scroll Snap */
        .slider-container {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0.5rem 0.25rem 1.5rem 0.25rem;
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default WeekSlider;