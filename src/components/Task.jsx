import {
  Card,
  Title,
  Text,
} from '@mantine/core';

export const Task = ({ id, title, description, status }) => {
    return (<Card key={id} shadow="sm" padding="md" radius="md" withBorder>
            <Title weight={500}>{title}</Title>
            <Text size="sm" color="dimmed">{description}</Text>
            <Text size="sm" color="dimmed">{status}</Text>
          </Card>);
}