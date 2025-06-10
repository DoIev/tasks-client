import { Card, Group, Button, Center } from "@mantine/core";

export const NewTask = ({ onClick }) => (
  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    style={{ background: "#f1f3f5", minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <Center style={{ width: "100%" }}>
      <Button
        variant="light"
        color="gray"
        size="xl"
        radius="xl"
        onClick={onClick}
        style={{ fontSize: 24 }}
      >
        משימה חדשה
      </Button>
    </Center>
  </Card>);