import { Drawer, Stack, Text, Button } from "@mantine/core";

export const TaskDrawer = ({ opened, onClose, task, onStop }) => (
  <Drawer
    opened={opened}
    onClose={onClose}
    title={task ? task.title : "משימה חדשה"}
    position="right"
    size="md"
  >
    {task ? (
      <Stack>
        <Text>תיאור: {task.description}</Text>
        <Text>סטטוס: {task.taskInfo?.status}</Text>
        <Text>התקדמות: {Math.round((task.taskInfo?.progress ?? 0) * 100)}%</Text>
        <Button color="red" onClick={onStop}>
          עצור משימה
        </Button>
      </Stack>
    ) : (
      <Stack>
        <Text>יצירת משימה חדשה</Text>
        {/* Place your new task form here */}
      </Stack>
    )}
  </Drawer>
);