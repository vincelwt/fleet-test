import React, { useEffect, useState } from 'react'
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
  Text,
  Center,
  rem
} from '@mantine/core'
import { IconEdit, IconTrash, IconPlus, IconUsers } from '@tabler/icons-react'
import EmployeeForm from './EmployeeForm'
import { ROLE_TYPES } from '../constants'
import type { Employee } from '../types'
import EmptyState from './shared/EmptyState'
import NoResults from './shared/NoResults'

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filterRole, setFilterRole] = useState('')
  const [filterName, setFilterName] = useState('')
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchEmployees() {
    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3001/api/employees')
      const data = await res.json()
      setEmployees(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function handleDelete(id: number) {
    await fetch(`http://localhost:3001/api/employees/${id}`, {
      method: 'DELETE'
    })
    fetchEmployees()
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesRole = !filterRole || emp.role === filterRole
    const matchesName = !filterName || emp.name.toLowerCase().includes(filterName.toLowerCase())
    return matchesRole && matchesName
  })

  const showEmptyState = employees.length === 0
  const showNoResults = filteredEmployees.length === 0 && !showEmptyState

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <Title order={2}>Employees</Title>
        <Button
          leftSection={<IconPlus size={14} />}
          onClick={() => {
            setEditingEmployee(null)
            setShowForm(true)
          }}
        >
          Add Employee
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
              placeholder="Filter by role"
              data={ROLE_TYPES}
              value={filterRole}
              onChange={(value) => setFilterRole(value || '')}
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
            title="No employees yet"
            description="You haven't added any employees yet. Start by adding your first employee to manage your team."
            icon={<IconUsers size={rem(30)} stroke={1.5} color="var(--mantine-color-blue-filled)" />}
          />
        ) : showNoResults ? (
          <NoResults message="No matching employees found. Try adjusting your name or role filters." />
        ) : (
          <Table mt="md" striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th style={{ width: 100 }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredEmployees.map(emp => (
                <Table.Tr key={emp.id}>
                  <Table.Td>{emp.name}</Table.Td>
                  <Table.Td>{emp.role}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => {
                          setEditingEmployee(emp)
                          setShowForm(true)
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => emp.id && handleDelete(emp.id)}
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
        <EmployeeForm
          data={editingEmployee}
          onSaved={() => {
            setEditingEmployee(null)
            setShowForm(false)
            fetchEmployees()
          }}
          onCancel={() => {
            setEditingEmployee(null)
            setShowForm(false)
          }}
        />
      )}
    </Stack>
  )
}