/**
 * Obtiene la fecha actual en formato de cadena 'YYYY-MM-DD'.
 * @returns {string} Fecha formateada 'YYYY-MM-DD'
 */
export const getTodayString = () => {
  const today = new Date();
  return formatDateToYYYYMMDD(today);
};

/**
 * Convierte un objeto Date al formato de cadena 'YYYY-MM-DD'.
 * @param {Date} date 
 * @returns {string}
 */
export const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formatea una fecha en texto legible en español.
 * @param {Date|string} dateInput 
 * @returns {string} Ej: "Lunes, 25 de Octubre"
 */
export const formatReadableDate = (dateInput) => {
  const date = typeof dateInput === 'string' ? new Date(`${dateInput}T00:00:00`) : dateInput;
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formatted = date.toLocaleDateString('es-ES', options);
  
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

/**
 * Verifica si una fecha dada corresponde al día de hoy.
 * @param {string} dateString - Fecha en formato 'YYYY-MM-DD'
 * @returns {boolean}
 */
export const isToday = (dateString) => {
  return dateString === getTodayString();
};