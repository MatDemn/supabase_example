import { type Tables } from '@/types/supabase';
import { type User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserStore {
    user: User | undefined;
}

export const useUser = create<UserStore>()(() => ({
    user: undefined,
}));