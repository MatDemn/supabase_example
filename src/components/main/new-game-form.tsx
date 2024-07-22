"use client";

import { Input } from "@/components/ui/input";
import {Form} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { type User } from "@supabase/auth-js/dist/module/lib/types";
import { useRouter } from "next/navigation";
import { uuid } from "uuidv4";
import { api } from "@/trpc/react";
import { useState } from "react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useUser } from "@/lib/store/user";

const NewGameForm = () => {
    const [isCreating, setIsCreating] = useState(false);

    const user = useUser((state) => state.user);

    const router = useRouter();

    

    const { mutate } = api.rooms.create.useMutation({
        onSuccess: (data) => {
            router.push(`/room/${data.id}`);
        },
        onError: (e) => {
          const errorMessage = e.data?.zodError?.fieldErrors.content;
          console.error("Error creating investment:", errorMessage);
          setIsCreating(false);
        },
      });

    const createGame = () => {
        setIsCreating(true);
        mutate();
    }

    return ( 
        <Card className="flex-1 flex flex-col">
            <CardHeader className="text-3xl text-center font-semibold">
                Host a new game
            </CardHeader>
            <CardContent>
                <p>
                    If you want to create a new game for your friends, feel free to do so by using a button down below! This will create a new lobby for your players to join in for a match. You will be a lobby master as well, like a real pro boss!
                </p>
            </CardContent>
            <CardFooter className="mt-auto">
                <Button className="mx-auto" onClick={createGame} disabled={isCreating}>Create a new game</Button>
            </CardFooter>
        </Card>
     );
}
 
export default NewGameForm;