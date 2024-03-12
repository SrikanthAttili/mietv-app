export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      custom_settings: {
        Row: {
          created_at: string
          id: number
          key: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: number
          key: string
          value: string
        }
        Update: {
          created_at?: string
          id?: number
          key?: string
          value?: string
        }
        Relationships: []
      }
      episode: {
        Row: {
          created_at: string
          episode_number: number
          id: number
          name: string
          poster_path: string
          season_id: number
          season_name: string | null
          show_title: string | null
          storyline: string | null
          video_link: string
        }
        Insert: {
          created_at?: string
          episode_number: number
          id?: number
          name: string
          poster_path: string
          season_id: number
          season_name?: string | null
          show_title?: string | null
          storyline?: string | null
          video_link: string
        }
        Update: {
          created_at?: string
          episode_number?: number
          id?: number
          name?: string
          poster_path?: string
          season_id?: number
          season_name?: string | null
          show_title?: string | null
          storyline?: string | null
          video_link?: string
        }
        Relationships: [
          {
            foreignKeyName: 'episode_season_id_fkey'
            columns: ['season_id']
            isOneToOne: false
            referencedRelation: 'season'
            referencedColumns: ['id']
          },
        ]
      }
      person: {
        Row: {
          biography: string
          birthday: string | null
          created_at: string
          id: number
          known_for_department: string | null
          name: string
          place_of_birth: string | null
          profile_path: string | null
        }
        Insert: {
          biography: string
          birthday?: string | null
          created_at?: string
          id?: number
          known_for_department?: string | null
          name: string
          place_of_birth?: string | null
          profile_path?: string | null
        }
        Update: {
          biography?: string
          birthday?: string | null
          created_at?: string
          id?: number
          known_for_department?: string | null
          name?: string
          place_of_birth?: string | null
          profile_path?: string | null
        }
        Relationships: []
      }
      season: {
        Row: {
          created_at: string
          id: number
          name: string
          season_number: number | null
          show_id: number
          show_title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          season_number?: number | null
          show_id: number
          show_title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          season_number?: number | null
          show_id?: number
          show_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'season_show_id_fkey'
            columns: ['show_id']
            isOneToOne: false
            referencedRelation: 'show'
            referencedColumns: ['id']
          },
        ]
      }
      show: {
        Row: {
          backdrop_path: string
          created_at: string
          id: number
          language: string
          overview: string
          poster_path: string | null
          title: string
          trailer_path: string | null
        }
        Insert: {
          backdrop_path: string
          created_at?: string
          id?: number
          language: string
          overview: string
          poster_path?: string | null
          title: string
          trailer_path?: string | null
        }
        Update: {
          backdrop_path?: string
          created_at?: string
          id?: number
          language?: string
          overview?: string
          poster_path?: string | null
          title?: string
          trailer_path?: string | null
        }
        Relationships: []
      }
      show_tags_junction: {
        Row: {
          created_at: string
          id: number
          show_id: number
          show_title: string | null
          tag_id: number
          tag_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          show_id: number
          show_title?: string | null
          tag_id: number
          tag_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          show_id?: number
          show_title?: string | null
          tag_id?: number
          tag_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_show_tags_junction_show_fkey'
            columns: ['show_id']
            isOneToOne: false
            referencedRelation: 'show'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_show_tags_junction_tags_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_related_shows: {
        Args: {
          show_id: number
        }
        Returns: {
          backdrop_path: string
          created_at: string
          id: number
          language: string
          overview: string
          poster_path: string | null
          title: string
          trailer_path: string | null
        }[]
      }
      get_season_name_for_episode: {
        Args: {
          season_id: number
        }
        Returns: string
      }
      get_show_title_for_episode: {
        Args: {
          season_id: number
        }
        Returns: string
      }
      get_show_title_for_season: {
        Args: {
          show_id: number
        }
        Returns: string
      }
      get_show_title_for_show_tags_junction: {
        Args: {
          show_id: number
        }
        Returns: string
      }
      get_tag_name_for_show_tags_junction: {
        Args: {
          tag_id: number
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (Database['public']['Tables'] & Database['public']['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
  Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
  Database['public']['Views'])
    ? (Database['public']['Tables'] &
    Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof Database['public']['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof Database['public']['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof Database['public']['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
