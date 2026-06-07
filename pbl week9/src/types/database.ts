import type { Part } from './lion';

export type Database = {
    public: {
        Tables: {
            lions: {
                Row: {
                    id: number;
                    name: string;
                    part: Part;
                    age: number;
                    email: string;
                    image: string;
                    introduction: string;
                    created_at: number;
                };
                Insert: {
                    id: number;
                    name: string;
                    part: Part;
                    age: number;
                    email: string;
                    image: string;
                    introduction: string;
                    created_at: number;
                };
                Update: {
                    id?: number;
                    name?: string;
                    part?: Part;
                    age?: number;
                    email?: string;
                    image?: string;
                    introduction?: string;
                    created_at?: number;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};