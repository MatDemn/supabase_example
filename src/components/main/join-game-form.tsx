"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { type User } from "@supabase/auth-js/dist/module/lib/types";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/lib/store/user";

const formSchema = z.object({
  invite_code: z.string( {errorMap: () => ({
    message: "Please enter a valid invite code"
  })}).min(1).max(100),
})

const JoinGameForm = () => {
    const [isCreating, setIsCreating] = useState(false);

    const user = useUser((state) => state.user);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invite_code: "",
        }
    });

    // const { mutate } = api.rooms.get.useQuery({room_id: }
    //     {
    //         onSuccess: (data) => {
    //             router.push(`/room/${data.room_id}`);
    //         },
    //         onError: (e) => {
    //             toast.error(e.data?.code);
    //             setIsCreating(false);
    //         },
    //     }
    // );

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if(!user) return;

        setIsCreating(true);
        router.push(`/room/${values.invite_code}`);
        //mutate({room_id: values.invite_code, user_id: user.id});
    }

    return ( 
        <Card className="flex-1">
            <CardHeader className="text-3xl text-center font-semibold">
                Join an existing game
            </CardHeader>
            <CardContent>
                <p>
                    If you want to join game your friend created, feel free to do so by using typing in invite code and click a button down below! This will join an existing lobby made by your friend! You will be a lobby user as well, like a boss!
                </p>
            </CardContent>
            <CardFooter>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto flex flex-col">
                    <FormField
                    control={form.control}
                    name="invite_code"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="invite code" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                        <Button type="submit" className="mx-auto" disabled={isCreating}>Join this game</Button>
                    </form>
                </Form>
            </CardFooter>
        </Card>
     );
}
 
export default JoinGameForm;