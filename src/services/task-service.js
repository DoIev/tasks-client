import { TASKS_URL } from "../config";
import axios from "axios";

export const TaskService = () => {
  const getTasks = async () => {
    const response = await axios.get(TASKS_URL);
    return response.data;
  };

  const createTask = async (form) => {
    const response = await axios.post(TASKS_URL, {
      body: JSON.stringify(form),
    });
    return response.data;
  };

  return { getTasks, createTask };
}

export const taskService = TaskService();
