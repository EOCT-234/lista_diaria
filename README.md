mi-agenda-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/                # Imágenes, íconos (SVG) y estilos globales
│   │   ├── icons/             # Flechas de deslizamiento, checks, etc.
│   │   └── styles/
│   │       └── main.css       # Estilos globales y variables CSS
│   │
│   ├── components/            # Componentes reutilizables de la interfaz (UI)
│   │   ├── Header/            # Encabezado con la fecha actual
│   │   │   └── Header.jsx
│   │   ├── Slider/            # Contenedor deslizante principal
│   │   │   └── WeekSlider.jsx
│   │   ├── DayCard/           # La "ventana" de cada día de la semana
│   │   │   ├── DayCard.jsx
│   │   │   └── DayCard.module.css
│   │   ├── TaskItem/          # Cada actividad dentro del día
│   │   │   └── TaskItem.jsx
│   │   └── TaskModal/         # Formulario emergente para ingresar actividades
│   │       └── AddTaskModal.jsx
│   │
│   ├── hooks/                 # Lógica personalizada (Lógica de la app)
│   │   ├── useWeekDays.js     # Controla la rotación continua de los 7 días
│   │   └── useTaskMigration.js# Lógica que pasa tareas pendientes al día siguiente
│   │
│   ├── utils/                 # Funciones auxiliares y de fecha
│   │   ├── dateHelpers.js     # Formatear fechas, detectar el día de hoy
│   │   └── storage.js         # Guardar y cargar datos (LocalStorage / API)
│   │
│   ├── App.jsx                # Componente principal donde se une todo
│   └── main.jsx               # Punto de entrada de la aplicación
│
├── .gitignore
├── package.json
└── README.md