import { useEffect } from 'react';

/**
 * Hook para migrar automáticamente tareas incompletas de días pasados al día actual.
 * 
 * @param {Object} tasksByDate - Objeto con el mapa de tareas { 'YYYY-MM-DD': [ { id, title, completed, isMigrated } ] }
 * @param {Function} setTasksByDate - Función setState para actualizar el objeto de tareas.
 * @param {string} todayString - Fecha de hoy en formato string 'YYYY-MM-DD'.
 */
export const useTaskMigration = (tasksByDate, setTasksByDate, todayString) => {
  useEffect(() => {
    if (!todayString || !tasksByDate) return;

    let hasChanges = false;
    const updatedTasks = { ...tasksByDate };
    const tasksToMigrate = [];

    // 1. Buscar en todos los días registrados que sean anteriores a hoy
    Object.keys(updatedTasks).forEach((dateKey) => {
      if (dateKey < todayString) {
        const dayTasks = updatedTasks[dateKey] || [];
        
        // Filtrar las tareas que NO se completaron
        const uncompleted = dayTasks.filter((task) => !task.completed);
        const completed = dayTasks.filter((task) => task.completed);

        if (uncompleted.length > 0) {
          hasChanges = true;
          
          // Preparar las tareas incompletas marcándolas como migradas
          const preparedTasks = uncompleted.map((task) => ({
            ...task,
            isMigrated: true,
          }));

          tasksToMigrate.push(...preparedTasks);

          // Dejar en el día pasado únicamente las tareas que sí se completaron
          updatedTasks[dateKey] = completed;
        }
      }
    });

    // 2. Mover las tareas pendientes recopiladas al array del día de hoy
    if (hasChanges && tasksToMigrate.length > 0) {
      const todayTasks = updatedTasks[todayString] || [];

      // Evitar duplicados por si el efecto se ejecuta más de una vez
      const existingIds = new Set(todayTasks.map((t) => t.id));
      const uniqueTasksToMigrate = tasksToMigrate.filter((t) => !existingIds.has(t.id));

      updatedTasks[todayString] = [...todayTasks, ...uniqueTasksToMigrate];

      // Actualizar el estado global con las tareas reubicadas
      setTasksByDate(updatedTasks);
    }
  }, [todayString, tasksByDate, setTasksByDate]);
};

export default useTaskMigration;