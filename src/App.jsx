import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import WeekSlider from './components/Slider/WeekSlider';
import AddTaskModal from './components/TaskModal/AddTaskModal';
import { useWeekDays } from './hooks/useWeekDays';
import { useTaskMigration } from './hooks/useTaskMigration';
import { getTodayString } from './utils/storage';

export const App = () => {
  const [tasksByDate, setTasksByDate] = useState(() => {
    const saved = localStorage.getItem('agenda_tasks');
    return saved ? JSON.parse(saved) : {};
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState('');

  // 1. Obtener la ventana de los 7 días (comenzando hoy)
  const weekDays = useWeekDays();
  const todayString = getTodayString();

  // 2. Persistir tareas en localStorage ante cualquier cambio
  useEffect(() => {
    localStorage.setItem('agenda_tasks', JSON.stringify(tasksByDate));
  }, [tasksByDate]);

  // 3. Migrar tareas incompletas de días pasados al día actual
  useTaskMigration(tasksByDate, setTasksByDate, todayString);

  // Unir la lista de días con sus respectivas tareas
  const daysWithTasks = weekDays.map((day) => ({
    ...day,
    tasks: tasksByDate[day.dateString] || [],
  }));

  // --- Mapeo de Handlers ---

  const handleToggleTask = (dateString, taskId) => {
    setTasksByDate((prev) => {
      const dayTasks = prev[dateString] || [];
      const updatedTasks = dayTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { ...prev, [dateString]: updatedTasks };
    });
  };

  const handleDeleteTask = (dateString, taskId) => {
    setTasksByDate((prev) => {
      const dayTasks = prev[dateString] || [];
      const updatedTasks = dayTasks.filter((task) => task.id !== taskId);
      return { ...prev, [dateString]: updatedTasks };
    });
  };

  const handleAddTask = (dateString, title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      isMigrated: false,
    };

    setTasksByDate((prev) => {
      const dayTasks = prev[dateString] || [];
      return { ...prev, [dateString]: [...dayTasks, newTask] };
    });
  };

  const handleOpenModal = (dateString = '') => {
    setSelectedDateForModal(dateString);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <Header onOpenAddTaskModal={() => handleOpenModal(todayString)} />

      <main>
        <WeekSlider
          days={daysWithTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onAddTaskForDay={(dateString) => handleOpenModal(dateString)}
        />
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
        availableDays={weekDays}
        selectedDateString={selectedDateForModal}
      />
    </div>
  );
};

export default App;