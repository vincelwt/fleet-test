import { Router } from 'express'
import chalk from 'chalk'
import type { Device } from '../utils/types'
import { deviceService } from '../services/deviceService'
import { asyncHandler } from '../middleware/errorHandler'

const router = Router()

// Get devices, optionally filtered by type or owner
router.get('/', asyncHandler<{}, Device[], {}, { type?: string; ownerId?: string }>(async (req, res) => {
  const { type, ownerId } = req.query
  const devices = await deviceService.findAll({ type, ownerId })
  console.log(chalk.blue('Fetching devices'))
  res.json(devices)
}))

// Get single device by ID
router.get('/:id', asyncHandler<{ id: string }, Device>(async (req, res) => {
  const { id } = req.params
  const device = await deviceService.findById(id)
  console.log(chalk.grey(`Fetching device with ID ${id}`))
  res.json(device)
}))

// Create a new device
router.post('/', asyncHandler<{}, Device, Omit<Device, 'id' | 'ownerName'>>(async (req, res) => {
  const { deviceName, type } = req.body
  if (!deviceName || !type) {
    res.status(400).json({ error: 'Missing device data' } as any)
    return
  }
  const device = await deviceService.create(req.body)
  console.log(chalk.green(`Created new device ID ${device.id}`))
  res.status(201).json(device)
}))

// Update a device
router.put('/:id', asyncHandler<{ id: string }, Device, Omit<Device, 'id' | 'ownerName'>>(async (req, res) => {
  const { id } = req.params
  const { deviceName, type } = req.body
  if (!deviceName || !type) {
    res.status(400).json({ error: 'Missing updated device data' } as any)
    return
  }
  const device = await deviceService.update(id, req.body)
  console.log(chalk.yellow(`Updated device with ID ${id}`))
  res.json(device)
}))

// Delete a device
router.delete('/:id', asyncHandler<{ id: string }, { success: true }>(async (req, res) => {
  const { id } = req.params
  await deviceService.delete(id)
  console.log(chalk.red(`Deleted device with ID ${id}`))
  res.json({ success: true })
}))

export default router