// app/(auth)/layout.tsx
import React from "react";
import { createClientServer } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const supabase = createClientServer(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }
  return (
    <>
      <Link href={"/"} className="absolute left-6 top-4 shrink-0 lg:left-14">
        <h1 className="text-accent-foreground text-2xl font-bold">Typeracer</h1>
      </Link>
      {children}
    </>
  );
};

export default RootLayout;