import db from '../utils/database'
import type { Employee } from '../utils/types'
import { AppError } from '../middleware/errorHandler'

export const employeeService = {
  async findAll(role?: string): Promise<Employee[]> {
    try {
      if (role) {
        return db.prepare(`
          SELECT * FROM employees WHERE role = ?
        `).all(role) as Employee[]
      }
      return db.prepare(`
        SELECT * FROM employees
      `).all() as Employee[]
    } catch (error) {
      throw new AppError(500, 'Failed to fetch employees')
    }
  },

  async findById(id: string): Promise<Employee> {
    try {
      const employee = db.prepare(`
        SELECT * FROM employees WHERE id = ?
      `).get(id) as Employee | undefined

      if (!employee) {
        throw new AppError(404, 'Employee not found')
      }

      return employee
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(500, 'Failed to fetch employee')
    }
  },

  async create(employee: Omit<Employee, 'id'>): Promise<Employee> {
    try {
      const stmt = db.prepare(`
        INSERT INTO employees (name, role) VALUES (?, ?)
      `)
      const info = stmt.run(employee.name, employee.role)
      return {
        id: Number(info.lastInsertRowid),
        ...employee
      }
    } catch (error) {
      throw new AppError(500, 'Failed to create employee')
    }
  },

  async update(id: string, employee: Omit<Employee, 'id'>): Promise<Employee> {
    try {
      const stmt = db.prepare(`
        UPDATE employees SET name = ?, role = ? WHERE id = ?
      `)
      const info = stmt.run(employee.name, employee.role, id)
      
      if (info.changes === 0) {
        throw new AppError(404, 'Employee not found')
      }

      return {
        id: Number(id),
        ...employee
      }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(500, 'Failed to update employee')
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const stmt = db.prepare(`
        DELETE FROM employees WHERE id = ?
      `)
      const info = stmt.run(id)
      
      if (info.changes === 0) {
        throw new AppError(404, 'Employee not found')
      }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError(500, 'Failed to delete employee')
    }
  }
} 