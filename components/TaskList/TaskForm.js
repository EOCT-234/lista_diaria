export function TaskForm(diaId) {
  return `
    <form class="task-form" data-dia="${diaId}">
      <input type="text" class="task-input" placeholder="Nueva actividad..." required />
      <button type="submit" class="task-button">+</button>
    </form>
  `;
}