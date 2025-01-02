export interface Employee {
  id?: number
  name: string
  role: string
}

export interface Device {
  id?: number
  deviceName: string
  type: string
  ownerId: number | null
  ownerName?: string
} 