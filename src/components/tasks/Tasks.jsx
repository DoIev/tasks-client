import { Grid } from "@mantine/core";
import { Task } from "../task/Task";
import { NewTask } from "../new-task/NewTask";


export const Tasks = ({ setDrawerOpened, tasks }) => {

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