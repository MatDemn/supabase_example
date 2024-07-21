import { type Tables } from '@/types/supabase';
import { create } from 'zustand';

interface RoomProfilesStore {
    roomProfileList: Tables<'profile'>[];
    appendProfile: (profile: Tables<'profile'>) => void;
    removeProfile: (profile: Tables<'profile'>) => void;
}

export const useRoomProfiles = create<RoomProfilesStore>()((set) => ({
    roomProfileList: [],
    appendProfile: (profile: Tables<'profile'>) => {
        set((state) => ({ roomProfileList: [...state.roomProfileList.filter(p => p.id != profile.id), profile] }));
    },
    removeProfile: (profile: Tables<'profile'>) => {
        set((state) => ({ roomProfileList: state.roomProfileList.filter(p => p.id != profile.id) }));
    }
}))