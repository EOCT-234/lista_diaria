import { obtenerTareas, guardarTareas } from './storage.js';

export function reasignarTareasInconclusas(dias) {
  const tareas = obtenerTareas();
  const idHoy = dias[0].id;

  if (!tareas[idHoy]) {
    tareas[idHoy] = [];
  }

  Object.keys(tareas).forEach(fechaId => {
    if (fechaId < idHoy) {
      const pendientes = tareas[fechaId].filter(t => !t.completada);
      if (pendientes.length > 0) {
        tareas[idHoy].push(...pendientes);
        tareas[fechaId] = tareas[fechaId].filter(t => t.completada);
      }
    }
  });

  guardarTareas(tareas);
}