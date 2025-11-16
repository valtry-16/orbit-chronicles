import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Mail, MessageSquare, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SubscriptionPreferences {
  email: string;
  phone: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  missions: string[];
  neoAlerts: boolean;
  spaceWeather: boolean;
  launchCountdowns: boolean;
}

export const AlertSubscriptions = () => {
  const [preferences, setPreferences] = useState<SubscriptionPreferences>({
    email: "",
    phone: "",
    emailEnabled: true,
    smsEnabled: false,
    missions: [],
    neoAlerts: true,
    spaceWeather: true,
    launchCountdowns: true
  });

  const availableMissions = [
    "Falcon 9", "JWST", "Perseverance", "ISS", "Juno", 
    "Parker Solar Probe", "Curiosity", "New Horizons"
  ];

  const handleMissionToggle = (mission: string) => {
    setPreferences(prev => ({
      ...prev,
      missions: prev.missions.includes(mission)
        ? prev.missions.filter(m => m !== mission)
        : [...prev.missions, mission]
    }));
  };

  const handleSave = () => {
    if (!preferences.email && !preferences.phone) {
      toast.error("Please provide at least one contact method");
      return;
    }

    // In a real app, this would send to your backend/Supabase
    toast.success("Subscription Preferences Saved!", {
      description: "You'll receive alerts based on your preferences"
    });
    
    console.log("Subscription preferences:", preferences);
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Cloud Integration Required</AlertTitle>
        <AlertDescription>
          To enable actual email/SMS delivery, connect to Lovable Cloud or Supabase and configure notification services.
          For now, preferences are saved locally.
        </AlertDescription>
      </Alert>

      <Card className="cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <Bell className="w-6 h-6" />
            Alert Subscription Service
          </CardTitle>
          <CardDescription>
            Get personalized notifications about missions, NEOs, and space events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={preferences.email}
                onChange={(e) => setPreferences(prev => ({ ...prev, email: e.target.value }))}
              />
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  checked={preferences.emailEnabled}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, emailEnabled: checked }))
                  }
                />
                <Label>Enable email notifications</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Phone Number (SMS)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={preferences.phone}
                onChange={(e) => setPreferences(prev => ({ ...prev, phone: e.target.value }))}
              />
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  checked={preferences.smsEnabled}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, smsEnabled: checked }))
                  }
                />
                <Label>Enable SMS notifications</Label>
              </div>
            </div>
          </div>

          {/* Alert Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Alert Categories</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div>
                  <Label>Near-Earth Object Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Asteroids and comets approaching Earth
                  </p>
                </div>
                <Switch
                  checked={preferences.neoAlerts}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, neoAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div>
                  <Label>Space Weather Events</Label>
                  <p className="text-sm text-muted-foreground">
                    Solar flares, geomagnetic storms, radiation
                  </p>
                </div>
                <Switch
                  checked={preferences.spaceWeather}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, spaceWeather: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                <div>
                  <Label>Launch Countdowns</Label>
                  <p className="text-sm text-muted-foreground">
                    Upcoming mission launches and critical phases
                  </p>
                </div>
                <Switch
                  checked={preferences.launchCountdowns}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, launchCountdowns: checked }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Mission-Specific Alerts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mission-Specific Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Select missions you want to receive updates about
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableMissions.map((mission) => (
                <div
                  key={mission}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 bg-card/50"
                >
                  <Checkbox
                    id={mission}
                    checked={preferences.missions.includes(mission)}
                    onCheckedChange={() => handleMissionToggle(mission)}
                  />
                  <Label htmlFor={mission} className="cursor-pointer">
                    {mission}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" size="lg">
            <Bell className="w-4 h-4 mr-2" />
            Save Subscription Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};