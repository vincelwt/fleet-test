import React, { useState, useEffect } from 'react'
import { TextInput, Select, type ComboboxItem } from '@mantine/core'
import BaseForm from './shared/BaseForm'
import { api } from '../services/api'
import { DEVICE_TYPES } from '../constants'
import type { Device, FormProps } from '../types'

export default function DeviceForm({ data: device, onSaved, onCancel }: FormProps<Device>) {
  const [deviceName, setDeviceName] = useState('')
  const [type, setType] = useState('')
  const [ownerId, setOwnerId] = useState<number | null>(null)
  const [owners, setOwners] = useState<ComboboxItem[]>([])

  useEffect(() => {
    if (device) {
      setDeviceName(device.deviceName)
      setType(device.type)
      setOwnerId(device.ownerId)
    } else {
      setDeviceName('')
      setType('')
      setOwnerId(null)
    }
  }, [device])

  useEffect(() => {
    async function fetchOwners() {
      const employees = await api.employees.fetch()
      setOwners(employees.map(emp => ({
        value: emp.id!.toString(),
        label: emp.name
      })))
    }
    fetchOwners()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    if (device?.id) {
      await api.devices.update(device.id, { deviceName, type, ownerId })
    } else {
      await api.devices.create({ deviceName, type, ownerId })
    }
    onSaved()
  }

  return (
    <BaseForm
      data={device}
      title="Device"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <TextInput
        label="Device Name"
        placeholder="Enter device name"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
        required
      />
      <Select
        label="Type"
        placeholder="Select device type"
        data={DEVICE_TYPES}
        searchable
        value={type}
        onChange={(value) => setType(value || '')}
        required
      />
      <Select
        label="Owner"
        placeholder="Select device owner"
        data={owners}
        value={ownerId?.toString()}
        onChange={(value) => setOwnerId(value ? parseInt(value) : null)}
        clearable
      />
    </BaseForm>
  )
}