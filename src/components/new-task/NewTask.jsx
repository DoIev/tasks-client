import { Card, Group, Button, Center, Text } from "@mantine/core";

export const NewTask = ({ onClick }) => (
  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    style={{
      background: "#f1f3f5",
      minHeight: 350,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      
    }}
    onClick={onClick}
  >
    <Center style={{ width: "100%" }}>
        <Text size="xl" weight="500" mb="md">
          צור משימה חדשה    
          </Text>
    </Center>
  </Card>
);