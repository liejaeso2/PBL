import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] =
        useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const loadSession = async () => {
            const { data, error } =
                await supabase.auth.getSession();

            if (!isMounted) {
                return;
            }

            if (error) {
                console.error(
                    '로그인 상태 확인 실패:',
                    error.message
                );
            }

            setUser(data.session?.user ?? null);
            setAuthLoading(false);
        };

        void loadSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setAuthLoading(false);
            }
        );

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signUp = async (
        email: string,
        password: string
    ): Promise<string | null> => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        return error ? error.message : null;
    };

    const signIn = async (
        email: string,
        password: string
    ): Promise<string | null> => {
        const { error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        return error ? error.message : null;
    };

    const signOut = async (): Promise<string | null> => {
        const { error } = await supabase.auth.signOut();

        return error ? error.message : null;
    };

    return {
        user,
        authLoading,
        signUp,
        signIn,
        signOut,
    };
}