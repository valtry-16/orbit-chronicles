import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const nav = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setAllowed(true);
      else nav("/login");
    });
  }, []);

  if (!allowed) return null;
  return children;
}