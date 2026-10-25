import { STORAGE_KEY } from '../utils/constants.js';

export function obtenerTareas() {
  const datos = localStorage.getItem(STORAGE_KEY);
  return datos ? JSON.parse(datos) : {};
}

export function guardarTareas(tareas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}