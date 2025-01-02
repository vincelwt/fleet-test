import React from 'react'
import { Center, Stack, Title, Text, Button, rem, ThemeIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

interface EmptyStateProps {
  onAdd: () => void
  title: string
  description: string
  icon: React.ReactNode
}

export default function EmptyState({ onAdd, title, description, icon }: EmptyStateProps) {
  return (
    <Center p="xl">
      <Stack align="center" gap="md">
        <ThemeIcon size={rem(64)} variant='filled' >
          {icon}
        </ThemeIcon>
        <Title order={3}>{title}</Title>
        <Text c="dimmed" size="sm" ta="center" maw={400}>
          {description}
        </Text>
        <Button onClick={onAdd} leftSection={<IconPlus size={14} />}>
          Add {title.replace('No ', '')}
        </Button>
      </Stack>
    </Center>
  )
} 