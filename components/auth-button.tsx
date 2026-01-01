"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    const checkAuth = async () => {
      const { data } = await supabase.auth.getClaims();
      setIsAuthed(Boolean(data?.claims));
    };
    void checkAuth();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!mounted || !isAuthed) {
    return null;
  }

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      className="ml-4"
    >
      <LogOut className="h-4 w-4 mr-2" /> Logout
    </Button>
  );
}
