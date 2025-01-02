import React from 'react'
import { useEffect, useState } from 'react'
import {
  Table,
  TextInput,
  Select,
  Group,
  Button,
  Paper,
  Title,
  ActionIcon,
  Stack,
  type ComboboxItem,
  Center,
  Text,
  rem
} from '@mantine/core'
import { IconEdit, IconTrash, IconPlus, IconDeviceLaptop } from '@tabler/icons-react'
import DeviceForm from './DeviceForm'
import { DEVICE_TYPES } from '../constants'
import type { Device } from '../types'
import EmptyState from './shared/EmptyState'
import NoResults from './shared/NoResults'

export default function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([])
  const [filterName, setFilterName] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterOwnerId, setFilterOwnerId] = useState('')
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchDevices() {
    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3001/api/devices')
      const data = await res.json()
      setDevices(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  async function handleDelete(id: number) {
    await fetch(`http://localhost:3001/api/devices/${id}`, {
      method: 'DELETE'
    })
    fetchDevices()
  }

  const filteredDevices = devices.filter(dev => {
    const matchesName = !filterName || dev.deviceName.toLowerCase().includes(filterName.toLowerCase())
    const matchesType = !filterType || dev.type.toLowerCase().includes(filterType.toLowerCase())
    const matchesOwner = !filterOwnerId || (dev.ownerName && dev.ownerName.toLowerCase().includes(filterOwnerId.toLowerCase()))
    return matchesName && matchesType && matchesOwner
  })

  const ownerOptions: ComboboxItem[] = Array.from(
    new Set(devices.map(d => d.ownerName))
  )
    .filter(Boolean)
    .map(name => ({ value: name!, label: name! }))

  const showEmptyState = devices.length === 0
  const showNoResults = filteredDevices.length === 0 && !showEmptyState

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <Title order={2}>Device Management</Title>
        <Button
          leftSection={<IconPlus size={14} />}
          onClick={() => {
            setEditingDevice(null)
            setShowForm(true)
          }}
        >
          Add Device
        </Button>
      </Group>

      <Paper p="md" withBorder>
        {!showEmptyState && (
          <Group grow>
            <TextInput
              placeholder="Search by name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
            <Select
              placeholder="Select Type"
              data={DEVICE_TYPES}
              searchable
              value={filterType}
              onChange={(value) => setFilterType(value || '')}
              clearable
            />
            <Select
              placeholder="Select Owner"
              data={ownerOptions}
              value={filterOwnerId}
              onChange={(value) => setFilterOwnerId(value || '')}
              clearable
              searchable
            />
          </Group>
        )}

        {isLoading ? (
          <Center p="xl">
            <Text size="sm" c="dimmed">Loading...</Text>
          </Center>
        ) : showEmptyState ? (
          <EmptyState
            onAdd={() => setShowForm(true)}
            title="No devices yet"
            description="You haven't added any devices yet. Start by adding your first device to manage your inventory."
            icon={<IconDeviceLaptop size={rem(20)} stroke={1.5} color="var(--mantine-color-blue-filled)" />}
          />
        ) : showNoResults ? (
          <NoResults message="No matching devices found. Try adjusting your search criteria." />
        ) : (
          <Table mt="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Owner</Table.Th>
                <Table.Th style={{ width: 100 }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredDevices.map(dev => (
                <Table.Tr key={dev.id}>
                  <Table.Td>{dev.deviceName}</Table.Td>
                  <Table.Td>{dev.type}</Table.Td>
                  <Table.Td>{dev.ownerName || '-'}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => {
                          setEditingDevice(dev)
                          setShowForm(true)
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => dev.id && handleDelete(dev.id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Paper>

      {showForm && (
        <DeviceForm
          data={editingDevice}
          onSaved={() => {
            setEditingDevice(null)
            setShowForm(false)
            fetchDevices()
          }}
          onCancel={() => {
            setEditingDevice(null)
            setShowForm(false)
          }}
        />
      )}
    </Stack>
  )
}