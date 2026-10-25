import { TaskItem } from '../TaskList/TaskItem.js';
import { TaskForm } from '../TaskList/TaskForm.js';

export function DayCard(dia, tareasDelDia = []) {
  const listaHTML = tareasDelDia.map(t => TaskItem(t)).join('');
  const claseHoy = dia.esHoy ? 'today' : '';

  return `
    <section class="day-card ${claseHoy}">
      <header class="day-card-header">
        <h2 class="day-title">${dia.nombreDia}</h2>
        <span class="day-date">${dia.fechaTexto}</span>
      </header>
      <div class="task-list">
        ${listaHTML}
      </div>
      ${TaskForm(dia.id)}
    </section>
  `;
}