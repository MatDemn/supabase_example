import { type Tables } from '@/types/supabase';
import { create } from 'zustand';

interface RoomStore {
    room: Tables<'room'> | undefined;
    setRoom: (room: Tables<'room'>) => void;
}

export const useRoom = create<RoomStore>()((set) => ({
    room: undefined,
    setRoom: (newRoom) => {
        set(() => ({room: newRoom }));
    },
}));