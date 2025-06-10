import { useState, useRef } from "react";
import { taskService } from "../services/task-service";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const historyRef = useRef({}); // { [taskId]: [{ timestamp, completed, total }] }

  const openDrawerForTask = (task) => {
    setSelectedTaskId(task.id);
    setDrawerOpened(true);
  };

  const closeDrawer = () => {
    setDrawerOpened(false);
    setSelectedTaskId(null);
  };

  // Call this on every fetch
  const updateTasks = (fetchedTasks) => {
    setTasks(fetchedTasks);
    const now = Date.now();
    fetchedTasks.forEach(task => {
      if (!historyRef.current[task.id]) historyRef.current[task.id] = [];
      historyRef.current[task.id].push({
        timestamp: now,
        completed: task.partitions.completed,
        total: task.partitions.total,
      });
      console.log(`Updated history for task ${task.id}:`, historyRef.current[task.id]);
      // Keep only last 10
      if (historyRef.current[task.id].length > 10) {
        historyRef.current[task.id] = historyRef.current[task.id].slice(-10);
      }
    });
  };

  const createTask = async (form) => {
    const newTask = await taskService.createTask(form);
    setTasks((prev) => [...prev, newTask]);
    setDrawerOpened(false);
  };

  const stopTask = () => {
    const task = tasks.find(t => t.id === selectedTaskId);
    alert(`Stopping task: ${task?.title}`);
  };

  // Always get the latest task object by id
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  // Get the last 10 iterations for the selected task
  const selectedTaskHistory = selectedTaskId ? historyRef.current[selectedTaskId] || [] : [];
  console.log(selectedTaskId)
  return {
    tasks,
    setTasks: updateTasks,
    drawerOpened,
    openDrawerForTask,
    closeDrawer,
    selectedTask,
    createTask,
    stopTask,
    selectedTaskHistory,
  };
}