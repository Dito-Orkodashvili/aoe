export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      maps: {
        Row: {
          description: string | null
          id: number
          name: string
          status: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
          status: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
          status?: string
        }
        Relationships: []
      }
      match_games: {
        Row: {
          game_number: number
          id: string
          map_id: number | null
          match_id: string
          replay_url: string | null
          winner_id: string | null
        }
        Insert: {
          game_number: number
          id?: string
          map_id?: number | null
          match_id: string
          replay_url?: string | null
          winner_id?: string | null
        }
        Update: {
          game_number?: number
          id?: string
          map_id?: number | null
          match_id?: string
          replay_url?: string | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_games_map_id_fkey"
            columns: ["map_id"]
            isOneToOne: false
            referencedRelation: "maps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_games_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_games_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          best_of: number | null
          completed_at: string | null
          id: string
          map_id: number | null
          player1_id: string | null
          player1_score: number | null
          player2_id: string | null
          player2_score: number | null
          round: string | null
          started_at: string | null
          tournament_id: string | null
          winner_id: string | null
        }
        Insert: {
          best_of?: number | null
          completed_at?: string | null
          id?: string
          map_id?: number | null
          player1_id?: string | null
          player1_score?: number | null
          player2_id?: string | null
          player2_score?: number | null
          round?: string | null
          started_at?: string | null
          tournament_id?: string | null
          winner_id?: string | null
        }
        Update: {
          best_of?: number | null
          completed_at?: string | null
          id?: string
          map_id?: number | null
          player1_id?: string | null
          player1_score?: number | null
          player2_id?: string | null
          player2_score?: number | null
          round?: string | null
          started_at?: string | null
          tournament_id?: string | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_map_id_fkey"
            columns: ["map_id"]
            isOneToOne: false
            referencedRelation: "maps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_player1_id_fkey"
            columns: ["player1_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_player2_id_fkey"
            columns: ["player2_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_stats: {
        Row: {
          aoe_profile_id: string | null
          elo_1v1: number | null
          elo_team: number | null
          games_played_1v1: number | null
          games_played_team: number | null
          id: string
          last_sync: string
          raw: Json | null
          win_streak_1v1: number | null
          win_streak_team: number | null
          wins_1v1: number | null
          wins_team: number | null
        }
        Insert: {
          aoe_profile_id?: string | null
          elo_1v1?: number | null
          elo_team?: number | null
          games_played_1v1?: number | null
          games_played_team?: number | null
          id?: string
          last_sync?: string
          raw?: Json | null
          win_streak_1v1?: number | null
          win_streak_team?: number | null
          wins_1v1?: number | null
          wins_team?: number | null
        }
        Update: {
          aoe_profile_id?: string | null
          elo_1v1?: number | null
          elo_team?: number | null
          games_played_1v1?: number | null
          games_played_team?: number | null
          id?: string
          last_sync?: string
          raw?: Json | null
          win_streak_1v1?: number | null
          win_streak_team?: number | null
          wins_1v1?: number | null
          wins_team?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_player_stats_profile"
            columns: ["aoe_profile_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["aoe_profile_id"]
          },
        ]
      }
      players: {
        Row: {
          aoe_profile_id: string | null
          created_at: string | null
          elo_local: number | null
          elo_official: number | null
          fav_civ: string | null
          id: string
          last_name: string | null
          league: Database["public"]["Enums"]["player_rank"]
          name: string | null
          nickname: string
          picture_url: string | null
          region: string | null
          user_id: string | null
        }
        Insert: {
          aoe_profile_id?: string | null
          created_at?: string | null
          elo_local?: number | null
          elo_official?: number | null
          fav_civ?: string | null
          id?: string
          last_name?: string | null
          league?: Database["public"]["Enums"]["player_rank"]
          name?: string | null
          nickname: string
          picture_url?: string | null
          region?: string | null
          user_id?: string | null
        }
        Update: {
          aoe_profile_id?: string | null
          created_at?: string | null
          elo_local?: number | null
          elo_official?: number | null
          fav_civ?: string | null
          id?: string
          last_name?: string | null
          league?: Database["public"]["Enums"]["player_rank"]
          name?: string | null
          nickname?: string
          picture_url?: string | null
          region?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      tournament_history: {
        Row: {
          created_at: string | null
          id: string
          snapshot: Json
          tournament_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          snapshot: Json
          tournament_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          snapshot?: Json
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_history_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_participants: {
        Row: {
          id: string
          joined_at: string | null
          player_id: string
          seed: number | null
          tournament_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          player_id: string
          seed?: number | null
          tournament_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          player_id?: string
          seed?: number | null
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_participants_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_participants_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          organizer: string | null
          participants_num_limit: number | null
          prize_pool: string | null
          start_date: string | null
          status: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          organizer?: string | null
          participants_num_limit?: number | null
          prize_pool?: string | null
          start_date?: string | null
          status: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          organizer?: string | null
          participants_num_limit?: number | null
          prize_pool?: string | null
          start_date?: string | null
          status?: string
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      player_rank: "bronze" | "silver" | "gold"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      player_rank: ["bronze", "silver", "gold"],
      user_role: ["user", "admin"],
    },
  },
} as const
