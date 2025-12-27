import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Swords,
  Shield,
  Target,
  Castle,
  ChevronRight,
  Users,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { getBuildOrders } from "@/lib/supabase/build-order/get-build-orders";
import { getCivById } from "@/lib/utils";
import { PageHero } from "@/components/sections/hero";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Rush":
      return <Swords className="w-4 h-4" />;
    case "Boom":
      return <Users className="w-4 h-4" />;
    case "Defensive":
      return <Shield className="w-4 h-4" />;
    case "All-in":
      return <Target className="w-4 h-4" />;
    default:
      return <Castle className="w-4 h-4" />;
  }
};

const getCategoryVariant = (category: string) => {
  switch (category) {
    case "Rush":
      return "destructive";
    case "Boom":
      return "success";
    case "Defensive":
      return "secondary";
    case "All-in":
      return "destructive";
    default:
      return "outline";
  }
};

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "success";
    case "intermediate":
      return "secondary";
    case "advanced":
      return "destructive";
    default:
      return "outline";
  }
};

const BuildOrders = async () => {
  const buildOrdersResponse = await getBuildOrders();

  if (!buildOrdersResponse.ok) {
    return null;
  }

  const { data: buildOrders = [] } = buildOrdersResponse;

  return (
    <>
      <PageHero>
        <div className="text-center space-y-3">
          <Trophy className="w-16 h-16 text-primary mx-auto animate-fade-in" />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
            სტრატეგიები
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in">
            შეისწავლე ძირითადი სტრატეგიები და მნიშვნელოვნად გააუმჯობესე თამაში.
          </p>
        </div>
      </PageHero>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-4">
          {buildOrders.map((bo) => (
            <Link
              key={bo.id}
              href={`/build-orders/${bo.slug}`}
              className="block"
            >
              <Card className="hover:border-primary/50 transition-colors group p-0">
                <CardContent className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {bo.title}
                        </h3>
                        {bo.civs?.map((civ) => (
                          <Badge
                            variant="outline"
                            className="text-xs"
                            key={civ}
                          >
                            {getCivById(civ)?.name}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {bo.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {bo.strategy_type && (
                          <Badge
                            variant={getCategoryVariant(bo.strategy_type)}
                            className="text-xs"
                          >
                            {getCategoryIcon(bo.strategy_type)}
                            <span className="ml-1 capitalize">
                              {bo.strategy_type}
                            </span>
                          </Badge>
                        )}
                        {bo.difficulty && (
                          <Badge
                            variant={getDifficultyVariant(bo.difficulty)}
                            className="text-xs"
                          >
                            {bo.difficulty}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className="text-xs flex gap-2"
                          >
                            <Users className="w-3 h-3" />
                            {bo.feudal_click_pop} POP
                          </Badge>
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default BuildOrders;
