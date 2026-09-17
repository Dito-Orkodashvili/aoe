import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

export function PlayerStatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
}) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        {icon}
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
