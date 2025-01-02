export interface BaseEntity {
  id?: number
}

export interface Employee extends BaseEntity {
  name: string
  role: string
}

export interface Device extends BaseEntity {
  deviceName: string
  type: string
  ownerId: number | null
  ownerName?: string | null
}

export interface FormProps<T> {
  data: T | null
  onSaved: () => void
  onCancel: () => void
} 