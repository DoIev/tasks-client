import { useState, useMemo, useEffect } from "react";
import {
  Drawer,
  Stack,
  TextInput,
  Button,
  Group,
  Text,
  Paper,
  Badge,
  Center,
  RingProgress,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { LineChart } from "@mantine/charts";

export const TaskDrawer = ({
  opened,
  onClose,
  task,
  onStop,
  onDelete,
  onCreate,
  taskHistory = [],
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateFrom: "",
    dateTo: "",
  });

  // Sync form with task fields when task changes
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        dateFrom: task.dates?.[0]?.dateFrom ? new Date(task.dates[0].dateFrom) : "",
        dateTo: task.dates?.[0]?.dateTo ? new Date(task.dates[0].dateTo) : "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        dateFrom: "",
        dateTo: "",
      });
    }
  }, [task]);

  const [stopped, setStopped] = useState(false);
  const isLiveTask = !!task;

  const inputStyle = useMemo(
    () =>
      isLiveTask
        ? { opacity: 0.8, cursor: "not-allowed", pointerEvents: "auto" }
        : {},
    [isLiveTask]
  );

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleStop = () => {
    setStopped(true);
    if (onStop) onStop();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  const handleCreate = () => {
    if (onCreate) {
      onCreate({
        title: form.title,
        description: form.description,
        dates: [{ dateFrom: form.dateFrom, dateTo: form.dateTo }],
        partitions: { total: 0, completed: 0, failed: 0, inProgress: 0 },
      });
    }
  };

  // Extract dates if task exists
  const dateFrom = form.dateFrom || null;
  const dateTo = form.dateTo || null;

  // Calculate completion percentage for the gauge
  const completionPercent =
    task && task.partitions && task.partitions.total > 0
      ? Math.round((task.partitions.completed / task.partitions.total) * 100)
      : 0;

  // Calculate velocity data for the chart
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
    console.log("taskHistory in drawer:", taskHistory);
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={task ? task.title : "משימה חדשה"}
      position="right"
      size="md"
    >
      <Stack>
        <TextInput
          label="כותרת"
          name="title"
          value={form.title}
          onChange={handleInputChange}
          readOnly={isLiveTask}
          disabled={isLiveTask}
          style={inputStyle}
        />
        <TextInput
          label="תיאור"
          name="description"
          value={form.description}
          onChange={handleInputChange}
          readOnly={isLiveTask}
          disabled={isLiveTask}
          style={inputStyle}
        />
        <DateTimePicker
          label="מתאריך"
          name="dateFrom"
          value={dateFrom}
          onChange={(value) => handleDateChange("dateFrom", value)}
          readOnly={isLiveTask}
          disabled={isLiveTask}
          style={inputStyle}
          clearable
          withSeconds
        />
        <DateTimePicker
          label="עד תאריך"
          name="dateTo"
          value={dateTo}
          onChange={(value) => handleDateChange("dateTo", value)}
          readOnly={isLiveTask}
          disabled={isLiveTask}
          style={inputStyle}
          clearable
          withSeconds
        />

        {task && task.partitions && (
          <Paper shadow="xs" p="md" radius="md" withBorder mt="md">
            <Text fw={700} mb="xs">סטטוס מחיצות</Text>
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
        )}

        {velocityData.length > 0 && (
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
        )}

        {!task && (
          <Button color="blue" onClick={handleCreate}>
            צור משימה
          </Button>
        )}

        {task && (
          <Group mt="md">
            <Button color="red" onClick={handleStop} disabled={stopped}>
              עצור משימה
            </Button>
            <Button color="dark" onClick={handleDelete} disabled={!stopped}>
              מחק משימה
            </Button>
          </Group>
        )}
      </Stack>
    </Drawer>
  );
};