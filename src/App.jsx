import React, { useState } from "react";
import { MantineProvider } from "@mantine/core";
import { Tasks } from "./components/tasks/Tasks";
import { FetchStatusChip } from "./components/fetch-status/FetchStatusChip";
import { TaskDrawer } from "./components/task-drawer/TaskDrawer";

function App() {
  const [tasks, setTasks] = useState([]);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setDrawerOpened(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpened(false);
    setSelectedTask(null);
  };

  const handleStopTask = () => {
    // Implement your stop logic here
    alert(`Stopping task: ${selectedTask?.title}`);
  };

  return (
    <MantineProvider>
      <FetchStatusChip onTasksFetched={setTasks} />
      <Tasks setDrawerOpened={handleTaskClick} tasks={tasks} />
      <TaskDrawer
        opened={drawerOpened}
        onClose={handleDrawerClose}
        task={selectedTask}
        onStop={handleStopTask}
      />
    </MantineProvider>
  );
}

export default App;