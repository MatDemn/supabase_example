import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  get: privateProcedure
  .input(
    z.object({
      id: z.string()
    }))
  .query(async ({ ctx, input }) => {
    const {data, error} = await ctx.supabase.from("profile").select("*").eq("id", input.id).single();
    if(!data) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: error.message,
        })
    }
    return data;
  }),
  getProfilesByRoomId: privateProcedure
  .input(
    z.object({
      room_id: z.string()
    }))
  .query(async ({ ctx, input }) => {
    const {data, error} = await ctx.supabase.from("roomsprofiles").select("profile(*)").eq('room_id', input.room_id);
    if(!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: error.message,
        })
      }
    return data;
  }),
});