import { useState } from "react";
import { Drawer, Stack, TextInput, Button, Group, Text } from "@mantine/core";

export const TaskDrawer = ({ opened, onClose, task, onStop, onDelete, onCreate }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    progress: 0,
  });

  const [stopped, setStopped] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStop = () => {
    setStopped(true);
    if (onStop) onStop();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  const handleCreate = () => {
    if (onCreate) onCreate(form);
  };

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
          readOnly={!!task}
        />
        <TextInput
          label="תיאור"
          name="description"
          value={task ? task.description : form.description}
          onChange={handleInputChange}
          readOnly={!!task}
        />
        <TextInput
          label="סטטוס"
          name="status"
          value={task ? task.taskInfo?.status ?? "" : form.status}
          onChange={handleInputChange}
          readOnly={!!task}
        />
        <TextInput
          label="התקדמות"
          name="progress"
          value={task ? Math.round((task.taskInfo?.progress ?? 0) * 100) : form.progress}
          onChange={handleInputChange}
          readOnly={!!task}
          rightSection={task ? "%" : null}
        />

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