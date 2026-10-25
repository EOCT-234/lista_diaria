import { useMemo } from 'react';

/**
 * Hook para generar una ventana flotante de 7 días comenzando desde la fecha actual.
 * @param {Date} [baseDate=new Date()] - Fecha de referencia (por defecto, hoy).
 * @returns {Array} Lista de los 7 objetos de días formateados.
 */
export const useWeekDays = (baseDate = new Date()) => {
  const days = useMemo(() => {
    const generatedDays = [];
    
    // Normalizar la fecha actual a las 00:00:00 para comparaciones precisas
    const today = new Date(baseDate);
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Clave única en formato YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;

      // Nombre corto del día (ej: "Lunes", "Martes")
      const rawDayName = currentDate.toLocaleDateString('es-ES', { weekday: 'long' });
      const dayName = rawDayName.charAt(0).toUpperCase() + rawDayName.slice(1);

      // Número y mes corto (ej: "25 Oct")
      const dayNumber = currentDate.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      });

      generatedDays.push({
        date: currentDate,
        dateString,
        dayName,
        dayNumber,
        isToday: i === 0, // El primer elemento siempre es la fecha actual
      });
    }

    return generatedDays;
  }, [baseDate]);

  return days;
};

export default useWeekDays;