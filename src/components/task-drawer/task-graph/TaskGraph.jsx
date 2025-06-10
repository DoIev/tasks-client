import { Paper, Text } from "@mantine/core";
import { LineChart } from "@mantine/charts";

export const TaskGraph = ({ taskHistory }) => {
  const velocityData = [];
  for (let i = 1; i < taskHistory.length; i++) {
    const prev = taskHistory[i - 1];
    const curr = taskHistory[i];
    const dt = (curr.timestamp - prev.timestamp) / 1000;
    const dCompleted = curr.completed - prev.completed;
    const velocity = dt > 0 ? dCompleted / dt : 0;
    velocityData.push({
      time: new Date(curr.timestamp).toLocaleTimeString(),
      velocity,
    });
  }

  if (velocityData.length === 0) return null;

  return (
    <Paper shadow="xs" p="md" radius="md" withBorder mt="md">
      <Text fw={700} mb="xs">מהירות (Velocity) - מחיצות לשנייה</Text>
      <LineChart
        h={180}
        data={velocityData}
        dataKey="time"
        series={[{ name: "velocity", color: "blue" }]}
        curveType="linear"
      />
    </Paper>
  );
}