import { Database } from 'bun:sqlite'

const db = new Database('database.sqlite', { create: true })

// Create Employees table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL
  )
`)

// Create Devices table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deviceName TEXT NOT NULL,
    type TEXT NOT NULL,
    ownerId INTEGER,
    FOREIGN KEY (ownerId) REFERENCES employees(id) ON DELETE SET NULL
  )
`)

// Enable WAL mode for better performance
db.run('PRAGMA journal_mode = WAL;')

export default db