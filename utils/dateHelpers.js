import { DIAS_SEMANA } from './constants.js';

export function generarProximos7Dias() {
  const hoy = new Date();
  const dias = [];

  for (let i = 0; i < 7; i++) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + i);

    const id = fecha.toISOString().split('T')[0];
    const nombreDia = i === 0 ? 'Hoy' : DIAS_SEMANA[fecha.getDay()];
    const fechaTexto = fecha.getDate() + '/' + (fecha.getMonth() + 1);

    dias.push({
      id: id,
      nombreDia: nombreDia,
      fechaTexto: fechaTexto,
      esHoy: i === 0
    });
  }

  return dias;
}