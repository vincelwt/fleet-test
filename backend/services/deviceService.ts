import db from '../utils/database'
import type { Device } from '../utils/types'
import { AppError } from '../middleware/errorHandler'

export const deviceService = {
  async findAll(params?: { type?: string; ownerId?: string }): Promise<Device[]> {
    try {
      if (params?.type) {
        return db.prepare(`
          SELECT devices.*, employees.name AS ownerName
          FROM devices
          LEFT JOIN employees ON devices.ownerId = employees.id
          WHERE devices.type = ?
        `).all(params.type) as Device[]
      } else if (params?.ownerId) {
        return db.prepare(`
          SELECT devices.*, employees.name AS ownerName
          FROM devices
          LEFT JOIN employees ON devices.ownerId = employees.id
          WHERE devices.ownerId = ?
        `).all(params.ownerId) as Device[]
      }
      return db.prepare(`
        SELECT devices.*, employees.name AS ownerName
        FROM devices
        LEFT JOIN employees ON devices.ownerId = employees.id
      `).all() as Device[]
    } catch (error) {
      throw new AppError(500, 'Failed to fetch devices')
    }
  },

  async findById(id: string): Promise<Device> {
    try {
      const device = db.prepare(`
        SELECT devices.*, employees.name AS ownerName
        FROM devices
        LEFT JOIN employees ON devices.ownerId = employees.id
        WHERE devices.id = ?
      `).get(id) as Device | undefined

      if (!device) {
        throw new AppError(404, 'Device not found')
      }

      return device
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(500, 'Failed to fetch device')
    }
  },

  async create(device: Omit<Device, 'id' | 'ownerName'>): Promise<Device> {
    try {
      const stmt = db.prepare(`
        INSERT INTO devices (deviceName, type, ownerId) VALUES (?, ?, ?)
      `)
      const info = stmt.run(device.deviceName, device.type, device.ownerId || null)
      return {
        id: Number(info.lastInsertRowid),
        ...device,
        ownerName: undefined
      }
    } catch (error) {
      throw new AppError(500, 'Failed to create device')
    }
  },

  async update(id: string, device: Omit<Device, 'id' | 'ownerName'>): Promise<Device> {
    try {
      const stmt = db.prepare(`
        UPDATE devices SET deviceName = ?, type = ?, ownerId = ? WHERE id = ?
      `)
      const info = stmt.run(device.deviceName, device.type, device.ownerId || null, id)
      
      if (info.changes === 0) {
        throw new AppError(404, 'Device not found')
      }

      return {
        id: Number(id),
        ...device,
        ownerName: undefined
      }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(500, 'Failed to update device')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const stmt = db.prepare(`
        DELETE FROM devices WHERE id = ?
      `)
      const info = stmt.run(id)
      
      if (info.changes === 0) {
        throw new AppError(404, 'Device not found')
      }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(500, 'Failed to delete device')
    }
  }
} 