import React, { useState, useEffect } from "react";
import { Drawer, MantineProvider } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

import './App.css'
import { Tasks } from "./components/tasks/Tasks";
import { FetchStatusChip } from "./components/fetch-status/FetchStatusChip";

function App() {

  const [tasks, setTasks] = useState([]);

  return <>
    <MantineProvider>
      <FetchStatusChip onTasksFetched={setTasks} />
      <Tasks setDrawerOpened={() => {}} tasks={tasks}/>
    </MantineProvider>
  </>
}


export default App
