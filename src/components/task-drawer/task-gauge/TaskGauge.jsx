import { Paper, Text, Group, Badge, Center, RingProgress } from "@mantine/core";

export const TaskGauge = ({ task }) => {
  const completionPercent =
    task && task.partitions && task.partitions.total > 0
      ? Math.round((task.partitions.completed / task.partitions.total) * 100)
      : 0;

  return (
    <Paper shadow="xs" p="md" radius="md" withBorder mt="md">
      <Text fw={700} mb="xs">סטטוס פרטישנים</Text>
      <Group spacing="md">
        <Badge color="blue" variant="filled">סה"כ: {task.partitions.total}</Badge>
        <Badge color="green" variant="filled">הושלמו: {task.partitions.completed}</Badge>
        <Badge color="yellow" variant="filled">בתהליך: {task.partitions.inProgress}</Badge>
        <Badge color="red" variant="filled">נכשלו: {task.partitions.failed}</Badge>
      </Group>
      <Center mt="md">
        <RingProgress
          size={120}
          thickness={14}
          roundCaps
          sections={[
            { value: completionPercent, color: "green" },
            { value: 100 - completionPercent, color: "gray" },
          ]}
          label={
            <Text c="green" fw={700} ta="center" size="lg">
              {completionPercent}%
            </Text>
          }
        />
      </Center>
    </Paper>
  );
}