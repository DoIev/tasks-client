import { useState } from "react";
import { taskService } from "../services/task-service";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const fetchTasks = async () => {
    const { tasks } = await taskService.getTasksWithHistory();
    setTasks(tasks);
    console.log("Tasks fetched:", tasks);
  };

  const createTask = async (form) => {
    await taskService.createTask(form);
    await fetchTasks();
    setDrawerOpened(false);
  };

  const openDrawerForTask = (task) => {
    setSelectedTaskId(task.id);
    setDrawerOpened(true);
  };

  const closeDrawer = () => {
    setDrawerOpened(false);
    setSelectedTaskId(null);
  };

  const stopTask = () => {
    const task = tasks.find(t => t.id === selectedTaskId);
    alert(`Stopping task: ${task?.title}`);
  };

  const selectedTask = tasks.find(t => t.id === selectedTaskId);
  const selectedTaskHistory = selectedTaskId
    ? taskService.getTaskHistory(selectedTaskId)
    : [];

  return {
    tasks,
    fetchTasks,
    drawerOpened,
    openDrawerForTask,
    closeDrawer,
    selectedTask,
    selectedTaskHistory,
    createTask,
    stopTask,
  };
}