# Employee & Device Manager

A modern web application for managing employees and their assigned devices. 

Built with TypeScript, React, Express, and SQLite.

## Features

- Employee management (CRUD operations)
- Device inventory management
- Device assignment to employees
- Real-time search and filtering
- Modern, responsive UI

## Tech Stack

### Frontend
- **React**
- **Vite**: Modern React build tool for faster development and optimized production builds
- **Mantine**: Modern component library with clean default styling
- **Tabler Icons**: Simple SVG icons

### Backend
- **Bun**: Fast all-in-one JavaScript runtime & toolkit
  - Significantly faster than Node.js
  - Built-in TypeScript support
  - SQLite support out of the box
  - Supports all modern JavaScript features
- **Express**: Minimal web framework
- **SQLite**: Lightweight, file-based database perfect for small to medium applications

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test-fleet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
.
├── backend/             # Backend server
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Shared utilities
└── frontend/           # React frontend
    ├── src/
    │   ├── components/ # React components
    │   ├── constants/  # Shared constants
    │   ├── services/   # API services
    │   └── types/      # TypeScript types
```
