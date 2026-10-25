import { Header } from './components/Header/Header.js';
import { WeekSlider } from './components/WeekSlider/WeekSlider.js';
import { generarProximos7Dias } from './utils/dateHelpers.js';
import { reasignarTareasInconclusas } from './services/taskRollover.js';
import { obtenerTareas, guardarTareas } from './services/storage.js';

function renderApp() {
  const headerRoot = document.getElementById('header-root');
  const appRoot = document.getElementById('app');

  const dias = generarProximos7Dias();
  reasignarTareasInconclusas(dias);

  headerRoot.innerHTML = Header();
  appRoot.innerHTML = WeekSlider(dias);

  escucharFormularios();
}

function escucharFormularios() {
  const formularios = document.querySelectorAll('.task-form');

  formularios.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const diaId = form.getAttribute('data-dia');
      const input = form.querySelector('.task-input');
      const texto = input.value.trim();

      if (texto) {
        const tareas = obtenerTareas();
        if (!tareas[diaId]) tareas[diaId] = [];

        tareas[diaId].push({
          id: Date.now(),
          texto: texto,
          completada: false
        });

        guardarTareas(tareas);
        renderApp();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderApp);