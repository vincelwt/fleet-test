import { Router } from 'express'
import chalk from 'chalk'
import type { Employee } from '../utils/types'
import { employeeService } from '../services/employeeService'
import { asyncHandler } from '../middleware/errorHandler'

const router = Router()

// Get all employees, optionally filtered by role
router.get('/', asyncHandler<{}, Employee[], {}, { role?: string }>(async (req, res) => {
  const { role } = req.query
  const employees = await employeeService.findAll(role)
  console.log(chalk.blue('Fetching employees'))
  res.json(employees)
}))

// Get single employee by ID
router.get('/:id', asyncHandler<{ id: string }, Employee>(async (req, res) => {
  const { id } = req.params
  const employee = await employeeService.findById(id)
  console.log(chalk.grey(`Fetching employee with ID ${id}`))
  res.json(employee)
}))

// Create a new employee
router.post('/', asyncHandler<{}, Employee, Employee>(async (req, res) => {
  const { name, role } = req.body
  if (!name || !role) {
    res.status(400).json({ error: 'Missing employee data' } as any)
    return
  }
  const employee = await employeeService.create({ name, role })
  console.log(chalk.green(`Created new employee ID ${employee.id}`))
  res.status(201).json(employee)
}))

// Update an employee
router.put('/:id', asyncHandler<{ id: string }, Employee, Employee>(async (req, res) => {
  const { id } = req.params
  const { name, role } = req.body
  if (!name || !role) {
    res.status(400).json({ error: 'Missing updated employee data' } as any)
    return
  }
  const employee = await employeeService.update(id, { name, role })
  console.log(chalk.yellow(`Updated employee with ID ${id}`))
  res.json(employee)
}))

// Delete an employee
router.delete('/:id', asyncHandler<{ id: string }, { success: true }>(async (req, res) => {
  const { id } = req.params
  await employeeService.delete(id)
  console.log(chalk.red(`Deleted employee with ID ${id}`))
  res.json({ success: true })
}))

export default router