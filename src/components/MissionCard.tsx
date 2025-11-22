import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mission } from "@/data/missions";
import { useNavigate } from "react-router-dom";
import { Rocket } from "lucide-react";

// ⭐ Supabase client
import { supabase } from "@/supabase/client";

interface MissionCardProps {
  mission: Mission;
}

export const MissionCard = ({ mission }: MissionCardProps) => {
  const navigate = useNavigate();

  // ⭐ Add favorite using Supabase
  async function addToFavorites(e: any) {
    e.stopPropagation(); // prevent card click opening detail page

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login to save favorites.");
      return;
    }

    const { error } = await supabase.from("favorites").insert({
      user_id: user.id,
      mission_id: mission.name,
    });

    if (error) {
      alert("Could not add. Maybe already added.");
      return;
    }

    alert("Added to Favorites!");
  }

  return (
    <Card
      className="cursor-pointer overflow-hidden transition-smooth hover:scale-105 cosmic-glow hover:border-primary/50 group"
      onClick={() => navigate(`/mission/${mission.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={mission.thumbnail}
          alt={mission.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 text-primary">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">{mission.agency}</span>
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{mission.name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          Launched: {mission.launchDate}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-foreground/80 line-clamp-3">
          {mission.description}
        </p>

        {/* ⭐ ADD TO FAVORITES BUTTON */}
        <div className="mt-4">
          <button
            className="px-3 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
            onClick={addToFavorites}
          >
            ❤️ Add to Favorites
          </button>
        </div>
      </CardContent>
    </Card>
  );
};