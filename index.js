import { WeekSlider } from './components/WeekSlider/WeekSlider.js';

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function obtener7Dias() {
  const hoy = new Date();
  const dias = [];

  for (let i = 0; i < 7; i++) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + i);

    dias.push({
      nombreDia: i === 0 ? 'Hoy' : diasSemana[fecha.getDay()],
      fechaTexto: `${fecha.getDate()}/${fecha.getMonth() + 1}`,
      esHoy: i === 0
    });
  }

  return dias;
}

function initApp() {
  const appContainer = document.getElementById('app');
  const sieteDias = obtener7Dias();

  appContainer.innerHTML = WeekSlider(sieteDias);
}

document.addEventListener('DOMContentLoaded', initApp);