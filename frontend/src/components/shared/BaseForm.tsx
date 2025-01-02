import React from 'react'
import { Modal, Stack, Group, Button } from '@mantine/core'
import type { BaseEntity } from '../../types'

interface BaseFormProps<T extends BaseEntity> {
  data: T | null
  title: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
}

export default function BaseForm<T extends BaseEntity>({
  data,
  title,
  children,
  onSubmit,
  onCancel
}: BaseFormProps<T>) {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(e)
  }

  return (
    <Modal
      opened={true}
      onClose={onCancel}
      title={data ? `Edit ${title}` : `Add New ${title}`}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {children}
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {data ? 'Save Changes' : 'Add'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
} 