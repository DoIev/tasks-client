import { Grid } from "@mantine/core";
import { Task } from "../task/Task";
import { NewTask } from "../new-task/NewTask";
import {useState, useEffect} from "react";

import axios from "axios";

export const Tasks = ({ setDrawerOpened }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (async () => {
            const tasksFetched = await axios.get("http://localhost:3001/api/tasks");
            setTasks(tasksFetched.data);
        })()
    }, [])

    return (
      <Grid justify="space-around">
        <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
          <NewTask onClick={() => setDrawerOpened(null)} />
        </Grid.Col>
        {tasks.map((task, key) => 
            <Grid.Col style={{maxWidth: 350}} sm={4} xs={4} key={task.id || key}>
                <Task {...task} onClick={() => setDrawerOpened(task)} />
            </Grid.Col>
        )}
      </Grid>
    );
        
}