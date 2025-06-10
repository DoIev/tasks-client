import { useState, useMemo, useEffect } from "react";
import {
  Drawer,
  Stack,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { TaskGauge } from "./task-gauge/TaskGauge";
import { TaskGraph } from "./task-graph/TaskGraph";

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

  const dateFrom = form.dateFrom || null;
  const dateTo = form.dateTo || null;

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

        {isLiveTask && task.partitions && (
            <>
                <TaskGauge task={task} />
                <TaskGraph taskHistory={taskHistory} task={task} />
            </>
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