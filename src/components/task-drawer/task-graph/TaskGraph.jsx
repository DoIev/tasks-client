import { Paper, Text } from "@mantine/core";
import { LineChart } from "@mantine/charts";

export const TaskGraph = ({ taskHistory, task }) => {
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

  // Get the latest velocity (use average or last value)
  const latestVelocity = velocityData.length > 0
    ? velocityData[velocityData.length - 1].velocity
    : 0;

  // Calculate partitions left
  const partitionsLeft = task && task.partitions
    ? task.partitions.total - task.partitions.completed
    : 0;

  // Calculate time left in seconds
  const timeLeftSeconds = latestVelocity > 0
    ? partitionsLeft / latestVelocity
    : null;

  // Format time left as hh:mm:ss
  function formatTimeLeft(seconds) {
    if (seconds === null || !isFinite(seconds)) return "לא ידוע";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(n => n.toString().padStart(2, "0")).join(":");
  }

  return (
    <Paper shadow="xs" p="md" radius="md" withBorder mt="md">
      <Text fw={700} mb="xs">מהירות (Velocity) - פרטישנים לשנייה</Text>
      <LineChart
        h={180}
        data={velocityData}
        dataKey="time"
        series={[{ name: "velocity", color: "blue" }]}
        curveType="linear"
      />
      <Text mt="md" mb="xs" fw={700}>
        זמן משוער לסיום: {formatTimeLeft(timeLeftSeconds)}
      </Text>
    </Paper>
  );
}