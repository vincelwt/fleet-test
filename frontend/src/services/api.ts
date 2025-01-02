import type { Employee, Device } from '../types'

const API_URL = '/api'

async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch(`${API_URL}/employees`)
  return res.json()
}

async function createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
  const res = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  })
  return res.json()
}

async function updateEmployee(id: number, employee: Omit<Employee, 'id'>): Promise<Employee> {
  const res = await fetch(`${API_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  })
  return res.json()
}

async function fetchDevices(): Promise<Device[]> {
  const res = await fetch(`${API_URL}/devices`)
  return res.json()
}

async function createDevice(device: Omit<Device, 'id'>): Promise<Device> {
  const res = await fetch(`${API_URL}/devices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device)
  })
  return res.json()
}

async function updateDevice(id: number, device: Omit<Device, 'id'>): Promise<Device> {
  const res = await fetch(`${API_URL}/devices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device)
  })
  return res.json()
}

async function deleteEmployee(id: number): Promise<void> {
  await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE'
  })
}

async function deleteDevice(id: number): Promise<void> {
  await fetch(`${API_URL}/devices/${id}`, {
    method: 'DELETE'
  })
}

export const api = {
  employees: {
    fetch: fetchEmployees,
    create: createEmployee,
    update: updateEmployee,
    delete: deleteEmployee
  },
  devices: {
    fetch: fetchDevices,
    create: createDevice,
    update: updateDevice,
    delete: deleteDevice
  }
} 