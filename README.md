lista_diaria/
├── index.html                  # HTML principal de la aplicación
├── package.json                # Configuración y dependencias (si usas Node/npm)
├── README.md                   # Notas y descripción del proyecto
├── index.js                   
│
├── styles/                     # Estilos CSS
│   ├── global.css              # Reset, fuentes, variables de colores
│   ├── slider.css              # Estilos para las 7 ventanas deslizantes
│   └── day-card.css            # Estilos de cada tarjeta de día y sus tareas
│
├── components/                 # Componentes de la interfaz de usuario
│   ├── Header/                 # Muestra el día actual y título
│   │   └── Header.js
│   ├── WeekSlider/             # Contenedor deslizante (carrusel de 7 días)
│   │   └── WeekSlider.js
│   ├── DayCard/                # Ventana individual para un día
│   │   └── DayCard.js
│   └── TaskList/               # Formulario para añadir tareas y lista
│       ├── TaskItem.js
│       └── TaskForm.js
│
├── services/                   # Lógica de datos y almacenamiento
│   ├── storage.js              # Guarda y lee datos de LocalStorage
│   └── taskRollover.js         # Pasa tareas incompletas al siguiente día
│
└── utils/                      # Funciones auxiliares
    ├── dateHelpers.js          # Cálculos de fechas, día actual y rotación
    └── constants.js            # Nombres de días, meses y configuraciones