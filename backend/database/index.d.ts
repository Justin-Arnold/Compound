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
      points_config: {
        Row: {
          archived: boolean
          color: string | null
          created_at: string
          description: string | null
          frequency: string
          goal_value: number | null
          icon: string | null
          id: string
          name: string
          reminder: string | null
          tags: string[] | null
          type: string
          user_id: string
        }
        Insert: {
          archived?: boolean
          color?: string | null
          created_at?: string
          description?: string | null
          frequency?: string
          goal_value?: number | null
          icon?: string | null
          id?: string
          name?: string
          reminder?: string | null
          tags?: string[] | null
          type: string
          user_id: string
        }
        Update: {
          archived?: boolean
          color?: string | null
          created_at?: string
          description?: string | null
          frequency?: string
          goal_value?: number | null
          icon?: string | null
          id?: string
          name?: string
          reminder?: string | null
          tags?: string[] | null
          type?: string
          user_id?: string
        }
      }
      points_data: {
        Row: {
          binary_value: boolean | null
          id: string
          numeric_value: number | null
          point_id: string
          recorded_at: string
          tally_value: number | null
          type: string
        }
        Insert: {
          binary_value?: boolean | null
          id?: string
          numeric_value?: number | null
          point_id: string
          recorded_at?: string
          tally_value?: number | null
          type: string
        }
        Update: {
          binary_value?: boolean | null
          id?: string
          numeric_value?: number | null
          point_id?: string
          recorded_at?: string
          tally_value?: number | null
          type?: string
        }
      }
    }
    Views: {
      aggregated_tally_values: {
        Row: {
          frequency: string | null
          name: string | null
          point_config_id: string | null
          total_tally: number | null
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

