import { type Tables } from '@/types/supabase';
import { create } from 'zustand';

interface ProfileStore {
    profile: Tables<'profile'> | undefined;
}

export const useProfile = create<ProfileStore>()(() => ({
    profile: undefined,
}));