import { DayCard } from '../DayCard/DayCard.js';
import { obtenerTareas } from '../services/storage.js';

export function WeekSlider(dias) {
  const tareas = obtenerTareas();

  const tarjetas = dias.map(dia => {
    const tareasDelDia = tareas[dia.id] || [];
    return DayCard(dia, tareasDelDia);
  }).join('');

  return '<div class="week-slider-container">' +
    tarjetas +
  '</div>';
}