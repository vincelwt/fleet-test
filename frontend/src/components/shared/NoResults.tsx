import React from 'react'
import { Text } from '@mantine/core'

interface NoResultsProps {
  message?: string
}

export default function NoResults({ message = 'No matching results found. Try adjusting your filters.' }: NoResultsProps) {
  return (
    <Text c="dimmed" size="sm" ta="center" py="lg">
      {message}
    </Text>
  )
} 