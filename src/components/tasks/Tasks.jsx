import { Grid } from "@mantine/core";
import { Task } from "../task/Task";
import { NewTask } from "../new-task/NewTask";
import {useState, useEffect} from "react";


const cardStyle = { maxWidth: 380, minWidth: 320 };

export const Tasks = ({ setDrawerOpened, tasks }) => {
  return (
    <Grid justify="center" gutter="md">
      <Grid.Col span={3} style={cardStyle}>
        <NewTask onClick={() => setDrawerOpened(null)} />
      </Grid.Col>
      {tasks.map((task, key) => (
        <Grid.Col span={3} style={cardStyle} key={task.id || key}>
          <Task {...task} onClick={() => setDrawerOpened(task)} />
        </Grid.Col>
      ))}
    </Grid>
  );
};