import { type Tables } from '@/types/supabase';
import { create } from 'zustand';

interface RoomProfilesStore {
    roomProfileList: Tables<'profile'>[];
    appendProfile: (newEntry: Tables<'profile'>) => void;
    removeProfile: (id: string) => void;
    setProfiles: (newEntries: Tables<'profile'>[]) => void;
}

export const useRoomProfiles = create<RoomProfilesStore>()((set) => ({
    roomProfileList: [],
    appendProfile: (newEntry: Tables<'profile'>) => {
        set((state) => ({ roomProfileList: [...state.roomProfileList.filter(p => p.id != newEntry.id), newEntry] }));
    },
    removeProfile: (id) => {
        set((state) => ({ roomProfileList: state.roomProfileList.filter(p => p.id != id) }));
    },
    setProfiles: (newEntries) => {
        set(() => ({ roomProfileList: newEntries}));
    }
}))