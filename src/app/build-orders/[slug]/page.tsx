import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Clock,
  Users,
  Swords,
  Shield,
  Target,
  Castle,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "rush":
      return <Swords className="w-4 h-4" />;
    case "boom":
      return <Users className="w-4 h-4" />;
    case "defensive":
      return <Shield className="w-4 h-4" />;
    case "all-in":
      return <Target className="w-4 h-4" />;
    default:
      return <Castle className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "rush":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "boom":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "defensive":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "all-in":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    default:
      return "";
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-500/10 text-green-500";
    case "intermediate":
      return "bg-yellow-500/10 text-yellow-500";
    case "advanced":
      return "bg-red-500/10 text-red-500";
    default:
      return "";
  }
};

const BuildOrderDetail = () => {
  const id = 4;

  const buildOrder = {};

  /* if (!buildOrder) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Build Order Not Found
          </h1>
          <Button asChild>
            <Link href="/build-orders">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Build Orders
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/!* Back Button *!/}
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link href="/build-orders">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Build Orders
          </Link>
        </Button>

        {/!* Header *!/}
        <div className="mb-8">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <h1 className="text-3xl font-bold text-foreground">
              {buildOrder.name}
            </h1>
            {buildOrder.civilization && (
              <Badge variant="outline">{buildOrder.civilization}</Badge>
            )}
          </div>
          <p className="text-muted-foreground mb-4">{buildOrder.description}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge
              variant="outline"
              className={getCategoryColor(buildOrder.category)}
            >
              {getCategoryIcon(buildOrder.category)}
              <span className="ml-1 capitalize">{buildOrder.category}</span>
            </Badge>
            <Badge
              variant="secondary"
              className={getDifficultyColor(buildOrder.difficulty)}
            >
              {buildOrder.difficulty}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="w-4 h-4" />
              {buildOrder.popCount} pop up
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {buildOrder.upTime}
            </span>
          </div>
        </div>

        {details ? (
          <div className="space-y-8">
            {/!* Build Order Steps *!/}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Build Order Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {details.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 py-2 border-b border-border last:border-0"
                    >
                      <Badge
                        variant="outline"
                        className="min-w-[60px] justify-center font-mono"
                      >
                        {step.pop}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-foreground">{step.action}</p>
                        {step.note && (
                          <p className="text-sm text-primary mt-1">
                            {step.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/!* Tips *!/}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {details.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/!* Counters *!/}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Counters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {details.counters.map((counter, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Shield className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{counter}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/!* Transitions *!/}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Swords className="w-5 h-5 text-primary" />
                  Transitions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {details.transitions.map((transition, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span className="text-muted-foreground">
                        {transition}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Detailed steps coming soon!
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );*/
};

export default BuildOrderDetail;
