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
      view_points_with_latest_event: {
        Row: {
          created_at: string | null
          frequency: string | null
          id: string | null
          latest_recorded_at: string | null
          latest_value: number | null
          name: string | null
          todays_value: number | null
          type: string | null
          user_id: string | null
        }
      }
      view_points_without_recent_events: {
        Row: {
          created_at: string | null
          frequency: string | null
          id: string | null
          name: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          frequency?: string | null
          id?: string | null
          name?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          frequency?: string | null
          id?: string | null
          name?: string | null
          type?: string | null
          user_id?: string | null
        }
      }
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

