import { Grid } from "@mantine/core";
import { Task } from "../task/Task";
import {useState, useEffect} from "react";

import axios from "axios";

export const Tasks = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (async () => {
            const tasksFetched = await axios.get("http://localhost:3001/api/tasks");
            setTasks(tasksFetched.data);
        })()
    }, [])

    return <Grid justify="space-around">
        {tasks.map((task, key) => 
            <Grid.Col style={{maxWidth: 350}} sm={4} xs={4}>
                <Task task/>
            </Grid.Col>
        )}
        
    </Grid>
}