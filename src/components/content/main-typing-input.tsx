"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";

const MainTypingInput = () => {
    const form = useForm();

    const onSubmit = (value) => {
        console.log(value);
    }
    return ( 
        <div className="w-full min-h-4 border-t-2 border:white p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <FormField
                        control={form.control}
                        name="sentence"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Type in a sentence from above as fast as you can!" {...field} 
                                    className="border:ring-0 focus-visible:ring-0"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>
                </form>
            </Form>
        </div>
     );
}
 
export default MainTypingInput;