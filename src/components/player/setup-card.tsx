import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  Gamepad2,
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
} from "lucide-react";

const setup = {
  nickname: "Lucipher",
  image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800",
  hardware: {
    monitor: 'ASUS ROG Swift PG279QM 27" 240Hz',
    keyboard: "SteelSeries Apex Pro TKL",
    mouse: "Logitech G Pro X Superlight",
    headset: "HyperX Cloud II Wireless",
    mousepad: "SteelSeries QcK Heavy XXL",
    pc: "Custom Build: RTX 4080, i9-13900K, 64GB DDR5",
    chair: "Secretlab Titan Evo 2022",
  },
};

export const SetupCard = () => {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-primary" />
          Gaming Setup
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Setup Image */}

          {/* Hardware List */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Hardware & Peripherals
            </h4>

            {setup.hardware.monitor && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Monitor
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {setup.hardware.monitor}
                  </p>
                </div>
              </div>
            )}

            {setup.hardware.keyboard && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Keyboard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Keyboard
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {setup.hardware.keyboard}
                  </p>
                </div>
              </div>
            )}

            {setup.hardware.mouse && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mouse className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Mouse
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {setup.hardware.mouse}
                  </p>
                </div>
              </div>
            )}

            {setup.hardware.headset && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Headset
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {setup.hardware.headset}
                  </p>
                </div>
              </div>
            )}

            {setup.hardware.pc && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    PC Build
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {setup.hardware.pc}
                  </p>
                </div>
              </div>
            )}

            {setup.hardware.mousepad && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <div className="w-5 h-5 flex items-center justify-center text-primary text-xs font-bold">
                    MP
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Mousepad
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {setup.hardware.mousepad}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
