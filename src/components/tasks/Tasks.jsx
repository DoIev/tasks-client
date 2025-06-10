import { Grid } from "@mantine/core";
import { Task } from "../task/Task";

export const Tasks = () => {
    return <Grid justify="space-around">
        <Grid.Col style={{maxWidth: 350}} sm={4} xs={4}>
            <Task/>
        </Grid.Col>
    </Grid>
}