import { MantineProvider, Button, Group, createTheme } from '@mantine/core';
import { Tasks } from "./components/tasks/Tasks";
import { FetchStatusChip } from "./components/fetch-status/FetchStatusChip";
import { TaskDrawer } from "./components/task-drawer/TaskDrawer";
import { useTasks } from "./hooks/useTasks";

const lightTheme = createTheme({ primaryColor: 'blue', colorScheme: 'light' });
const darkTheme = createTheme({ primaryColor: 'blue', colorScheme: 'dark' });

function App() {
  const {
    tasks,
    setTasks,
    drawerOpened,
    openDrawerForTask,
    closeDrawer,
    selectedTask,
    selectedTaskHistory,
    createTask,
    stopTask,
  } = useTasks();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <FetchStatusChip onTasksFetched={setTasks} />
      <Tasks setDrawerOpened={openDrawerForTask} tasks={tasks} />
      // in App.jsx
      <TaskDrawer
        opened={drawerOpened}
        onClose={closeDrawer}
        task={selectedTask}
        taskHistory={selectedTaskHistory}
        onStop={stopTask}
        onCreate={createTask}
      />
    </MantineProvider>
  );
}

export default App;