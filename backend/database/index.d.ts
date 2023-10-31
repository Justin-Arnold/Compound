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
      events: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          point_id: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          point_id?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          point_id?: string | null
          user_id?: string | null
          value?: number | null
        }
      }
      points: {
        Row: {
          completed_at: string | null
          created_at: string | null
          description: string | null
          frequency: string | null
          id: string
          name: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          frequency?: string | null
          id?: string
          name?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          frequency?: string | null
          id?: string
          name?: string | null
          type?: string | null
          user_id?: string
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

