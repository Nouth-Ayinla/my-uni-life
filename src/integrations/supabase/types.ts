export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          priority: string | null
          target_audience: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          priority?: string | null
          target_audience?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          priority?: string | null
          target_audience?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_profiles: {
        Row: {
          created_at: string | null
          id: string
          license_expiry: string | null
          license_number: string
          rating: number | null
          total_rides: number | null
          user_id: string | null
          vehicle_color: string | null
          vehicle_plate_number: string | null
          vehicle_type: string | null
          verification_documents: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          license_expiry?: string | null
          license_number: string
          rating?: number | null
          total_rides?: number | null
          user_id?: string | null
          vehicle_color?: string | null
          vehicle_plate_number?: string | null
          vehicle_type?: string | null
          verification_documents?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          license_expiry?: string | null
          license_number?: string
          rating?: number | null
          total_rides?: number | null
          user_id?: string | null
          vehicle_color?: string | null
          vehicle_plate_number?: string | null
          vehicle_type?: string | null
          verification_documents?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      flagged_content: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          reason: string
          reported_by: string | null
          reviewed_by: string | null
          status: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          reason: string
          reported_by?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          reason?: string
          reported_by?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flagged_content_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flagged_content_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string | null
          created_at: string | null
          id: string
          product_id: string | null
          quantity: number
          status: Database["public"]["Enums"]["transaction_status"] | null
          total_amount: number
          vendor_id: string | null
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity: number
          status?: Database["public"]["Enums"]["transaction_status"] | null
          total_amount: number
          vendor_id?: string | null
        }
        Update: {
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          status?: Database["public"]["Enums"]["transaction_status"] | null
          total_amount?: number
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          comments_count: number | null
          content: string
          created_at: string | null
          flagged_count: number | null
          id: string
          likes_count: number | null
          media_urls: string[] | null
          post_type: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          user_id: string | null
        }
        Insert: {
          comments_count?: number | null
          content: string
          created_at?: string | null
          flagged_count?: number | null
          id?: string
          likes_count?: number | null
          media_urls?: string[] | null
          post_type?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          user_id?: string | null
        }
        Update: {
          comments_count?: number | null
          content?: string
          created_at?: string | null
          flagged_count?: number | null
          id?: string
          likes_count?: number | null
          media_urls?: string[] | null
          post_type?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          name: string
          price: number
          status: Database["public"]["Enums"]["content_status"] | null
          stock_quantity: number | null
          vendor_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          name: string
          price: number
          status?: Database["public"]["Enums"]["content_status"] | null
          stock_quantity?: number | null
          vendor_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          name?: string
          price?: number
          status?: Database["public"]["Enums"]["content_status"] | null
          stock_quantity?: number | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          department: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          profile_picture_url: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          student_id: string | null
          university_id: string | null
          updated_at: string | null
          user_status: Database["public"]["Enums"]["user_status"] | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          department?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          profile_picture_url?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          student_id?: string | null
          university_id?: string | null
          updated_at?: string | null
          user_status?: Database["public"]["Enums"]["user_status"] | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          profile_picture_url?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          student_id?: string | null
          university_id?: string | null
          updated_at?: string | null
          user_status?: Database["public"]["Enums"]["user_status"] | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      rides: {
        Row: {
          completion_time: string | null
          created_at: string | null
          destination: string
          driver_id: string | null
          fare: number | null
          id: string
          pickup_location: string
          pickup_time: string | null
          rating: number | null
          rider_id: string | null
          status: Database["public"]["Enums"]["ride_status"] | null
        }
        Insert: {
          completion_time?: string | null
          created_at?: string | null
          destination: string
          driver_id?: string | null
          fare?: number | null
          id?: string
          pickup_location: string
          pickup_time?: string | null
          rating?: number | null
          rider_id?: string | null
          status?: Database["public"]["Enums"]["ride_status"] | null
        }
        Update: {
          completion_time?: string | null
          created_at?: string | null
          destination?: string
          driver_id?: string | null
          fare?: number | null
          id?: string
          pickup_location?: string
          pickup_time?: string | null
          rating?: number | null
          rider_id?: string | null
          status?: Database["public"]["Enums"]["ride_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "rides_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          code: string
          created_at: string | null
          id: string
          location: string
          logo_url: string | null
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          location: string
          logo_url?: string | null
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          location?: string
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      user_bans: {
        Row: {
          ban_type: string | null
          banned_by: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          reason: string
          user_id: string | null
        }
        Insert: {
          ban_type?: string | null
          banned_by?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          reason: string
          user_id?: string | null
        }
        Update: {
          ban_type?: string | null
          banned_by?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          reason?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_bans_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_bans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_profiles: {
        Row: {
          business_category: string | null
          business_description: string | null
          business_name: string
          commission_rate: number | null
          created_at: string | null
          id: string
          total_sales: number | null
          user_id: string | null
          verification_documents: Json | null
        }
        Insert: {
          business_category?: string | null
          business_description?: string | null
          business_name: string
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          total_sales?: number | null
          user_id?: string | null
          verification_documents?: Json | null
        }
        Update: {
          business_category?: string | null
          business_description?: string | null
          business_name?: string
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          total_sales?: number | null
          user_id?: string | null
          verification_documents?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      content_status: "active" | "flagged" | "removed"
      ride_status:
        | "pending"
        | "accepted"
        | "in_progress"
        | "completed"
        | "cancelled"
      transaction_status: "pending" | "completed" | "failed" | "refunded"
      user_role: "student" | "vendor" | "driver" | "admin" | "super_admin"
      user_status: "active" | "suspended" | "banned"
      verification_status: "pending" | "approved" | "rejected" | "flagged"
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
      content_status: ["active", "flagged", "removed"],
      ride_status: [
        "pending",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      transaction_status: ["pending", "completed", "failed", "refunded"],
      user_role: ["student", "vendor", "driver", "admin", "super_admin"],
      user_status: ["active", "suspended", "banned"],
      verification_status: ["pending", "approved", "rejected", "flagged"],
    },
  },
} as const
