import { useState } from "react";
import { taskService } from "../services/task-service";

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

  const getTasks = async (fetchedTasks) => {
    console.log("Fetching tasks...");
    await taskService.getTasks()
    setTasks(fetchedTasks);
  };

  const createTask = async (form) => {
    await taskService.createTask(form);
    setTasks((prev) => [...prev, newTask]);
    setDrawerOpened(false);
  };

  const stopTask = () => {
    alert(`Stopping task: ${selectedTask?.title}`);
  };

  return {
    tasks,
    setTasks: getTasks,
    drawerOpened,
    openDrawerForTask,
    closeDrawer,
    selectedTask,
    createTask,
    stopTask,
  };
}