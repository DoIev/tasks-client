import {
  Card,
  Group,
  Badge,
  Button,
  Image,
  Text,
  Progress,
} from '@mantine/core';
import '@mantine/core/styles.css';

export const Task = ({ id, title, description, partitions = {}, onClick }) => {
  const { total = 0, completed = 0, failed = 0, inProgress = 0 } = partitions;
  const progress = total > 0 ? completed / total : 0;

  const getProgressColor = (progress) => {
    const r = Math.round(255 * (1 - progress));
    const g = Math.round(255 * progress);
    return `rgb(${r},${g},0)`;
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Group>
          <Badge color="pink">{`#${id}`}</Badge>
        </Group>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Group mt="md" mb="xs" align="center">
        <Progress value={progress * 100} style={{ flex: 1 }} color={getProgressColor(progress)} />
        <Text size="sm" ml="sm">{Math.round(progress * 100)}%</Text>
      </Group>
      
      <Button color="blue" mt="md" radius="md" onClick={onClick}>
        פרטים נוספים
      </Button>
    </Card>
  );
}