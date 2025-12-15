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
      donations: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          display_name: string | null
          id: string
          is_anonymous: boolean | null
          merchant_payment_id: string | null
          pay_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          display_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          merchant_payment_id?: string | null
          pay_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          display_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          merchant_payment_id?: string | null
          pay_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      players: {
        Row: {
          aoe_profile_id: string | null
          bio: string | null
          created_at: string | null
          fav_civ: number | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          last_name: string | null
          league: Database["public"]["Enums"]["player_rank"]
          name: string | null
          nickname: string
          picture_url: string | null
          playing_since: number | null
          region: string | null
          steam_id: string | null
          team: string | null
          tournament_elo: number | null
          twitch: string | null
          user_id: string | null
          youtube: string | null
        }
        Insert: {
          aoe_profile_id?: string | null
          bio?: string | null
          created_at?: string | null
          fav_civ?: number | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          last_name?: string | null
          league?: Database["public"]["Enums"]["player_rank"]
          name?: string | null
          nickname: string
          picture_url?: string | null
          playing_since?: number | null
          region?: string | null
          steam_id?: string | null
          team?: string | null
          tournament_elo?: number | null
          twitch?: string | null
          user_id?: string | null
          youtube?: string | null
        }
        Update: {
          aoe_profile_id?: string | null
          bio?: string | null
          created_at?: string | null
          fav_civ?: number | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          last_name?: string | null
          league?: Database["public"]["Enums"]["player_rank"]
          name?: string | null
          nickname?: string
          picture_url?: string | null
          playing_since?: number | null
          region?: string | null
          steam_id?: string | null
          team?: string | null
          tournament_elo?: number | null
          twitch?: string | null
          user_id?: string | null
          youtube?: string | null
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
      tournament_group_members: {
        Row: {
          group_number: number
          id: string
          participant_id: string
          stage_id: string
        }
        Insert: {
          group_number: number
          id?: string
          participant_id: string
          stage_id: string
        }
        Update: {
          group_number?: number
          id?: string
          participant_id?: string
          stage_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_group_members_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "tournament_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_group_members_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: []
      }
      tournament_maps: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean | null
          map_id: number
          map_order: number | null
          tournament_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          map_id: number
          map_order?: number | null
          tournament_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          map_id?: number
          map_order?: number | null
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_maps_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_match_games: {
        Row: {
          created_at: string
          duration_seconds: number | null
          game_number: number
          id: string
          map_id: number | null
          match_id: string
          metadata: Json | null
          player1_civ_id: number | null
          player2_civ_id: number | null
          replay_url: string | null
          twitch_url: string | null
          winner_id: string | null
          youtube_url: string | null
        }
        Insert: {
          created_at?: string
          duration_seconds?: number | null
          game_number: number
          id?: string
          map_id?: number | null
          match_id: string
          metadata?: Json | null
          player1_civ_id?: number | null
          player2_civ_id?: number | null
          replay_url?: string | null
          twitch_url?: string | null
          winner_id?: string | null
          youtube_url?: string | null
        }
        Update: {
          created_at?: string
          duration_seconds?: number | null
          game_number?: number
          id?: string
          map_id?: number | null
          match_id?: string
          metadata?: Json | null
          player1_civ_id?: number | null
          player2_civ_id?: number | null
          replay_url?: string | null
          twitch_url?: string | null
          winner_id?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_match_games_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "tournament_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_match_games_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "tournament_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_matches: {
        Row: {
          best_of: number
          completed_at: string | null
          created_at: string
          id: string
          match_number: number
          next_match_id: string | null
          next_match_slot: number | null
          participant1_id: string | null
          participant2_id: string | null
          round: number
          scheduled_at: string | null
          score_p1: number | null
          score_p2: number | null
          stage_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["tournament_match_status"]
          updated_at: string
          winner_id: string | null
        }
        Insert: {
          best_of?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          match_number: number
          next_match_id?: string | null
          next_match_slot?: number | null
          participant1_id?: string | null
          participant2_id?: string | null
          round: number
          scheduled_at?: string | null
          score_p1?: number | null
          score_p2?: number | null
          stage_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["tournament_match_status"]
          updated_at?: string
          winner_id?: string | null
        }
        Update: {
          best_of?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          match_number?: number
          next_match_id?: string | null
          next_match_slot?: number | null
          participant1_id?: string | null
          participant2_id?: string | null
          round?: number
          scheduled_at?: string | null
          score_p1?: number | null
          score_p2?: number | null
          stage_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["tournament_match_status"]
          updated_at?: string
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_matches_next_match_id_fkey"
            columns: ["next_match_id"]
            isOneToOne: false
            referencedRelation: "tournament_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_matches_participant1_id_fkey"
            columns: ["participant1_id"]
            isOneToOne: false
            referencedRelation: "tournament_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_matches_participant2_id_fkey"
            columns: ["participant2_id"]
            isOneToOne: false
            referencedRelation: "tournament_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_matches_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "tournament_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_participants: {
        Row: {
          id: string
          joined_at: string
          player_id: string
          seed: number | null
          team_id: number | null
          tournament_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          player_id: string
          seed?: number | null
          team_id?: number | null
          tournament_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          player_id?: string
          seed?: number | null
          team_id?: number | null
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
      tournament_stage_results: {
        Row: {
          advanced: boolean | null
          created_at: string
          extra: Json | null
          id: string
          losses: number | null
          participant_id: string
          points: number | null
          rank: number | null
          score_diff: number | null
          stage_id: string
          updated_at: string
          wins: number | null
        }
        Insert: {
          advanced?: boolean | null
          created_at?: string
          extra?: Json | null
          id?: string
          losses?: number | null
          participant_id: string
          points?: number | null
          rank?: number | null
          score_diff?: number | null
          stage_id: string
          updated_at?: string
          wins?: number | null
        }
        Update: {
          advanced?: boolean | null
          created_at?: string
          extra?: Json | null
          id?: string
          losses?: number | null
          participant_id?: string
          points?: number | null
          rank?: number | null
          score_diff?: number | null
          stage_id?: string
          updated_at?: string
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_stage_results_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "tournament_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_stage_results_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_stages: {
        Row: {
          config: Json
          created_at: string
          format: Database["public"]["Enums"]["tournament_stage_format"]
          id: string
          stage_number: number
          status: Database["public"]["Enums"]["tournament_stage_status"]
          tournament_id: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          format: Database["public"]["Enums"]["tournament_stage_format"]
          id?: string
          stage_number: number
          status?: Database["public"]["Enums"]["tournament_stage_status"]
          tournament_id: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          format?: Database["public"]["Enums"]["tournament_stage_format"]
          id?: string
          stage_number?: number
          status?: Database["public"]["Enums"]["tournament_stage_status"]
          tournament_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_stages_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          config: Json | null
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          default_best_of: number
          description: string | null
          end_date: string | null
          id: string
          is_registration_open: boolean
          max_participants: number | null
          organizer: string | null
          prize_pool: number | null
          registration_ends_at: string | null
          registration_starts_at: string | null
          slug: string
          start_date: string | null
          status: Database["public"]["Enums"]["tournament_status"]
          team_size: number
          title: string
          updated_at: string
          visibility: Database["public"]["Enums"]["tournament_visibility"]
        }
        Insert: {
          config?: Json | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          default_best_of?: number
          description?: string | null
          end_date?: string | null
          id?: string
          is_registration_open?: boolean
          max_participants?: number | null
          organizer?: string | null
          prize_pool?: number | null
          registration_ends_at?: string | null
          registration_starts_at?: string | null
          slug: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["tournament_status"]
          team_size?: number
          title: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["tournament_visibility"]
        }
        Update: {
          config?: Json | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          default_best_of?: number
          description?: string | null
          end_date?: string | null
          id?: string
          is_registration_open?: boolean
          max_participants?: number | null
          organizer?: string | null
          prize_pool?: number | null
          registration_ends_at?: string | null
          registration_starts_at?: string | null
          slug?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["tournament_status"]
          team_size?: number
          title?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["tournament_visibility"]
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
      gender_enum: "male" | "female"
      player_rank: "bronze" | "silver" | "gold"
      tournament_match_status:
        | "pending"
        | "scheduled"
        | "in_progress"
        | "completed"
        | "forfeit"
        | "bye"
      tournament_stage_format:
        | "groups"
        | "single_elimination"
        | "double_elimination"
        | "swiss"
        | "round_robin"
        | "showmatch"
      tournament_stage_status: "pending" | "active" | "completed"
      tournament_status:
        | "draft"
        | "registration"
        | "upcoming"
        | "active"
        | "completed"
        | "cancelled"
      tournament_visibility: "public" | "private" | "unlisted"
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
      gender_enum: ["male", "female"],
      player_rank: ["bronze", "silver", "gold"],
      tournament_match_status: [
        "pending",
        "scheduled",
        "in_progress",
        "completed",
        "forfeit",
        "bye",
      ],
      tournament_stage_format: [
        "groups",
        "single_elimination",
        "double_elimination",
        "swiss",
        "round_robin",
        "showmatch",
      ],
      tournament_stage_status: ["pending", "active", "completed"],
      tournament_status: [
        "draft",
        "registration",
        "upcoming",
        "active",
        "completed",
        "cancelled",
      ],
      tournament_visibility: ["public", "private", "unlisted"],
      user_role: ["user", "admin"],
    },
  },
} as const
