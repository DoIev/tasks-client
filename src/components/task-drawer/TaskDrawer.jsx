import { useState, useMemo } from "react";
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

export const TaskDrawer = ({ opened, onClose, task, onStop, onDelete, onCreate }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateFrom: "",
    dateTo: "",
  });

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
  const dateFrom = task?.dates?.[0]?.dateFrom
    ? new Date(task.dates[0].dateFrom)
    : form.dateFrom || null;
  const dateTo = task?.dates?.[0]?.dateTo
    ? new Date(task.dates[0].dateTo)
    : form.dateTo || null;

  // Calculate completion percentage for the gauge
  const completionPercent =
    task && task.partitions && task.partitions.total > 0
      ? Math.round((task.partitions.completed / task.partitions.total) * 100)
      : 0;

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
          value={task ? task.title : form.title}
          onChange={handleInputChange}
          readOnly={isLiveTask}
          disabled={isLiveTask}
          style={inputStyle}
        />
        <TextInput
          label="תיאור"
          name="description"
          value={task ? task.description : form.description}
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