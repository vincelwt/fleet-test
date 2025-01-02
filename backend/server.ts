import express from 'express'
import type { Application } from 'express'
import chalk from 'chalk'
import employeesRouter from './routes/employees'
import devicesRouter from './routes/devices'
import cors from 'cors'
import { config } from './utils/config'
import { errorHandler } from './middleware/errorHandler'

const app: Application = express()

app.use(cors(config.cors))
app.use(express.json())

// Routes
app.use('/api/employees', employeesRouter)
app.use('/api/devices', devicesRouter)

// Error handling
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(chalk.magenta(`Server running on port ${config.port}`))
})