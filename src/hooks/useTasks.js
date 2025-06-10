import { useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const openDrawerForTask = (task) => {
    setSelectedTask(task);
    setDrawerOpened(true);
  };

  const closeDrawer = () => {
    setDrawerOpened(false);
    setSelectedTask(null);
  };

  const fetchTasks = (fetchedTasks) => {
    setTasks(fetchedTasks);
  };

  const createTask = async (form) => {
    const res = await fetch('http://localhost:3001/api/tasks/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('Failed to create task');
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
    setDrawerOpened(false);
  };

  const stopTask = () => {
    alert(`Stopping task: ${selectedTask?.title}`);
  };

  return {
    tasks,
    setTasks: fetchTasks,
    drawerOpened,
    openDrawerForTask,
    closeDrawer,
    selectedTask,
    createTask,
    stopTask,
  };
}