export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
        Tables: {
            category: {
                Row: {
                    created_at: string;
                    id: number;
                    imageUrl: string;
                    name: string;
                    products: number[] | null;
                    slug: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    imageUrl: string;
                    name: string;
                    products?: number[] | null;
                    slug: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    imageUrl?: string;
                    name?: string;
                    products?: number[] | null;
                    slug?: string;
                };
                Relationships: [];
            };
            order: {
                Row: {
                    created_at: string;
                    description: string | null;
                    id: number;
                    slug: string;
                    status: string;
                    totalPrice: number;
                    user: string;
                };
                Insert: {
                    created_at?: string;
                    description?: string | null;
                    id?: number;
                    slug: string;
                    status: string;
                    totalPrice: number;
                    user: string;
                };
                Update: {
                    created_at?: string;
                    description?: string | null;
                    id?: number;
                    slug?: string;
                    status?: string;
                    totalPrice?: number;
                    user?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "order_user_fkey";
                        columns: ["user"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            order_item: {
                Row: {
                    created_at: string;
                    id: number;
                    order: number;
                    product: number;
                    quantity: number;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    order: number;
                    product: number;
                    quantity: number;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    order?: number;
                    product?: number;
                    quantity?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "order_item_order_fkey";
                        columns: ["order"];
                        isOneToOne: false;
                        referencedRelation: "order";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "order_item_product_fkey";
                        columns: ["product"];
                        isOneToOne: false;
                        referencedRelation: "product";
                        referencedColumns: ["id"];
                    }
                ];
            };
            product: {
                Row: {
                    category: number;
                    created_at: string;
                    heroImage: string;
                    id: number;
                    imagesUrl: string[];
                    maxQuantity: number;
                    price: number;
                    slug: string;
                    title: string;
                };
                Insert: {
                    category: number;
                    created_at?: string;
                    heroImage: string;
                    id?: number;
                    imagesUrl: string[];
                    maxQuantity: number;
                    price: number;
                    slug: string;
                    title: string;
                };
                Update: {
                    category?: number;
                    created_at?: string;
                    heroImage?: string;
                    id?: number;
                    imagesUrl?: string[];
                    maxQuantity?: number;
                    price?: number;
                    slug?: string;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "product_category_fkey";
                        columns: ["category"];
                        isOneToOne: false;
                        referencedRelation: "category";
                        referencedColumns: ["id"];
                    }
                ];
            };
            users: {
                Row: {
                    avatar_url: string;
                    created_at: string | null;
                    email: string;
                    expo_notification_token: string | null;
                    id: string;
                    stripe_customer_id: string | null;
                    type: string | null;
                };
                Insert: {
                    avatar_url: string;
                    created_at?: string | null;
                    email: string;
                    expo_notification_token?: string | null;
                    id: string;
                    stripe_customer_id?: string | null;
                    type?: string | null;
                };
                Update: {
                    avatar_url?: string;
                    created_at?: string | null;
                    email?: string;
                    expo_notification_token?: string | null;
                    id?: string;
                    stripe_customer_id?: string | null;
                    type?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            decrement_product_quantity: {
                Args: { product_id: number; quantity: number };
                Returns: undefined;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
    public: {
        Enums: {},
    },
} as const;
