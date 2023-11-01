export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      point_config: {
        Row: {
          created_at: string
          frequency: string
          id: string
          name: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          frequency?: string
          id?: string
          name?: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          frequency?: string
          id?: string
          name?: string
          type?: string
          user_id?: string
        }
      }
      point_event: {
        Row: {
          point_id: string
          recorded_at: string
          value: number
        }
        Insert: {
          point_id: string
          recorded_at: string
          value?: number
        }
        Update: {
          point_id?: string
          recorded_at?: string
          value?: number
        }
      }
      point_frequency: {
        Row: {
          frequency: string
        }
        Insert: {
          frequency: string
        }
        Update: {
          frequency?: string
        }
      }
      point_type: {
        Row: {
          type: string
        }
        Insert: {
          type: string
        }
        Update: {
          type?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

