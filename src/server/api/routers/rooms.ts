import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { Tables, type Enums } from "@/types/supabase";
import { TRPCError } from "@trpc/server";
import { uuid } from "uuidv4";

export const roomRouter = createTRPCRouter({
  create: privateProcedure.mutation(async ({ ctx }) => {
    // const { data, error } = await ctx.supabase
    //   .from("room")
    //   .insert({
    //     room_state: "NOT_STARTED",
    //   })
    //   .select()
    //   .single();
    // if (!data) {
    //   throw new TRPCError({
    //     code: "INTERNAL_SERVER_ERROR",
    //     message: error.message,
    //   });
    // }
    // await ctx.supabase.from("roomsprofiles").insert({
    //   user_id: ctx.user.id,
    //   room_id: data.id,
    // });
    // Room table is not needed for tests
    const returnData: Tables<'room'> = {
      id: uuid(),
      created_at: new Date().toString(),
      owner_id: "",
      room_state: "NOT_STARTED",
      sentence: "",
      updated_at: new Date().toString(),
    }
    return returnData;
  }),
  get: privateProcedure
    .input(
      z.object({
        room_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("room")
        .select("*")
        .eq("id", input.room_id)
        .single();
      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: error.message,
        });
      }
      return data;
    }),
  // addUser: privateProcedure
  //   .input(
  //     z.object({
  //       room_id: z.string(),
  //       user_id: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { data, error } = await ctx.supabase
  //       .from("roomsprofiles")
  //       .upsert([{ room_id: input.room_id, user_id: input.user_id }], {
  //         ignoreDuplicates: false,
  //         onConflict: "room_id, user_id",
  //       })
  //       .select()
  //       .single();
  //     if (!data) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: error.message,
  //       });
  //     }
  //     return data;
  //   }),
  // removeUser: privateProcedure
  //   .input(
  //     z.object({
  //       room_id: z.string(),
  //       user_id: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { data, error } = await ctx.supabase
  //       .from("roomsprofiles")
  //       .delete()
  //       .eq("room_id", input.room_id)
  //       .eq("user_id", input.user_id)
  //       .select()
  //       .single();
  //     if (!data) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: error.message,
  //       });
  //     }
  //     return data;
  //   }),
  startGame: privateProcedure
    .input(
      z.object({
        room_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("room")
        .update({ room_state: "IN_PROGRESS" })
        .eq("room_id", input.room_id)
        .select()
        .single();
      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: error.message,
        });
      }
      return data;
    }),
  endGame: privateProcedure
  .input(
    z.object({
      room_id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase
      .from("room")
      .update({ room_state: "COMPLETED"})
      .eq("id", input.room_id)
      .select();
    if (!!error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: error.message,
      });
    }
  }),
  updateOwner: privateProcedure
    .input(
      z.object({
        room_id: z.string(),
        owner_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("new owner id: ", input.owner_id);

      const { data, error } = await ctx.supabase
        .from("room")
        .update({ owner_id: input.owner_id })
        .eq("id", input.room_id)
        .select();
      if (!!error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: error.message,
        });
      }
    }),
  deleteRoom: privateProcedure
    .input(
      z.object({
        room_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from("room")
        .delete()
        .eq("id", input.room_id);
      if (!!error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: error.message,
        });
      }
    }),
});
