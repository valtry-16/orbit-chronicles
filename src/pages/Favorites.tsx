import { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";

export default function Favorites() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id);

      setItems(data ?? []);
    }

    load();
  }, []);

  return (
    <div className="mt-24 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>

      {items.map((i) => (
        <div key={i.id} className="p-3 bg-card rounded mb-2">
          {i.mission_id}
        </div>
      ))}
    </div>
  );
}