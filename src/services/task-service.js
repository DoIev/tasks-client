import axios from "axios";
import { TASKS_URL } from "../config";

let historyStore = {}; // { [taskId]: [{ timestamp, completed, total }] }

export const taskService = {
  async getTasksWithHistory() {
    const { data: tasks } = await axios.get(TASKS_URL);
    const now = Date.now();
    tasks.forEach(task => {
      if (!historyStore[task.id]) historyStore[task.id] = [];
      historyStore[task.id].push({
        timestamp: now,
        completed: task.partitions.completed,
        total: task.partitions.total,
      });
      if (historyStore[task.id].length > 10) {
        historyStore[task.id] = historyStore[task.id].slice(-10);
      }
    });
    return { tasks, historyStore };
  },

  async createTask(form) {
    const { data } = await axios.post(TASKS_URL, form);
    return data;
  },

  getTaskHistory(taskId) {
    return historyStore[taskId] || [];
  }
};
