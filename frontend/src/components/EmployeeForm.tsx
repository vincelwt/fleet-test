import React, { useState, useEffect } from 'react'
import { TextInput, Select } from '@mantine/core'
import BaseForm from './shared/BaseForm'
import { api } from '../services/api'
import { ROLE_TYPES } from '../constants'
import type { Employee, FormProps } from '../types'

export default function EmployeeForm({ data: employee, onSaved, onCancel }: FormProps<Employee>) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    if (employee) {
      setName(employee.name)
      setRole(employee.role)
    } else {
      setName('')
      setRole('')
    }
  }, [employee])

  async function handleSubmit(e: React.FormEvent) {
    if (employee?.id) {
      await api.employees.update(employee.id, { name, role })
    } else {
      await api.employees.create({ name, role })
    }
    onSaved()
  }

  return (
    <BaseForm
      data={employee}
      title="Employee"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <TextInput
        label="Name"
        placeholder="Enter employee name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Select
        label="Role"
        placeholder="Select role"
        data={ROLE_TYPES}
        value={role}
        searchable
        onChange={(value) => setRole(value || '')}
        required
      />
    </BaseForm>
  )
}