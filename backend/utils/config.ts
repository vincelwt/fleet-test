export const config = {
  port: process.env['PORT'] ? parseInt(process.env['PORT']) : 3001,
  database: {
    path: process.env['DB_PATH'] || './database.sqlite'
  },
  cors: {
    origin: process.env['CORS_ORIGIN'] || 'http://localhost:5173'
  }
} as const 