export interface ApiResponse {
  success: boolean
  timestamp: number
  READ_ME: string
  performance: number
  streams: Category[]
}

export interface Category {
  category: string
  id: number
  always_live: number
  streams: Stream[]
}

export interface Stream {
  id: number
  name: string
  tag?: string
  poster?: string
  uri_name: string
  starts_at: number
  ends_at: number
  always_live: number
  category_name: string
  iframe?: string
  viewers?: string
}
