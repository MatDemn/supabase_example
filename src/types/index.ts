import { Database, Tables } from "./supabase";

export type RoomWithProfiles = Tables<"room"> & {
    Profile: Tables<"profile"> | null;
};