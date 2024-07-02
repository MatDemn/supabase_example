import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ContentHeader from "@/components/content/ContentHeader";

export default async function AuthButton() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  

  return (
    <div className="bg-slate-400 h-screen">
      <div className="">

        
      </div>
      
    </div>
  );
}