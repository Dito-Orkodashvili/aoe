import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { getBuildOrderBySlug } from "@/lib/supabase/build-order/get-build-order-by-slug";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { BuildOrderStepType } from "@/lib/types/build-order.types";
import { cn, getCivById } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ageIconsMap: Record<BuildOrderStepType["age"], string> = {
  dark: "dark_age.webp",
  feudal: "feudal_age.webp",
  castle: "",
  imperial: "",
  dark_to_feudal: "",
  feudal_to_castle: "",
  castle_to_imperial: "",
};

const BuildOrderDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).normalize("NFC");

  const res = await getBuildOrderBySlug(slug);

  if (!res.ok || !res.data) {
    notFound();
  }

  const buildOrder = res.data;

  if (!buildOrder) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            სტრატეგია არ მოიძებნა
          </h1>
          <Button asChild>
            <Link href="/build-orders">
              <ArrowLeft className="w-4 h-4 mr-2" />
              სტრატეგიების სია
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  const {
    build_order_steps = [],
    description,
    title,
    civilization_ids,
    youtube_url,
  } = buildOrder;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link href="/build-orders">
            <ArrowLeft className="w-4 h-4 mr-2" />
            სტრატეგიების სია
          </Link>
        </Button>
        {description && (
          <Card className="mb-4">
            <CardTitle>
              <h2 className="font-semibold text-foreground text-lg text-center mb-4">
                {title}
              </h2>
              <div className="text-center">
                <p className="text-sm mb-2">რეკომენდირებული ცივები:</p>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {civilization_ids?.map((civ) => (
                    <Badge variant="success" className="text-xs" key={civ}>
                      {getCivById(civ)?.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardTitle>
            <CardContent>
              <div
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </CardContent>
          </Card>
        )}

        {youtube_url && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                ვიდეო დემონსტრაცია
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtube_url}`}
                  title="Build Order Video Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="w-2 text-center">age</TableHead>
                <TableHead>მუშა</TableHead>
                <TableHead> </TableHead>
                <TableHead>დავალება</TableHead>
                <TableHead>
                  <Image
                    width={50}
                    height={50}
                    src="/aoe/resources/wood.webp"
                    alt="ხე"
                  />
                </TableHead>
                <TableHead>
                  <Image
                    width={50}
                    height={50}
                    src="/aoe/resources/food.webp"
                    alt="საჭმელი"
                  />
                </TableHead>
                <TableHead>
                  <Image
                    width={50}
                    height={50}
                    src="/aoe/resources/gold.webp"
                    alt="ოქრო"
                  />
                </TableHead>
                <TableHead>
                  <Image
                    width={50}
                    height={50}
                    src="/aoe/resources/stone.webp"
                    alt="ქვა"
                  />
                </TableHead>
                <TableHead>მუშ. პოპ.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {build_order_steps!.map((step) => {
                return (
                  <TableRow
                    key={step.id}
                    className={cn(
                      "hover:bg-amber-500/5 border-border/30 transition-colors",
                      step.age === "dark_to_feudal" &&
                        "bg-green-300/10 hover:bg-green-300/5 border-green-400/30",
                      step.age === "feudal" &&
                        "bg-green-400/10 hover:bg-green-400/5 border-green-600/30",
                    )}
                  >
                    <TableCell className="w-2 text-center p-2">
                      {ageIconsMap[step.age] ? (
                        <Image
                          width={80}
                          height={80}
                          src={`/aoe/other/${ageIconsMap[step.age]}`}
                          alt={ageIconsMap[step.age]}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {step.villager_count || "-"}
                    </TableCell>
                    <TableCell className="p-2">
                      {step.icon && (
                        <Image
                          width={80}
                          height={80}
                          src={`/aoe/other/${step.icon}.webp`}
                          alt={step.icon}
                        />
                      )}
                    </TableCell>
                    <TableCell>{step.task}</TableCell>
                    <TableCell className="text-center">
                      {step.wood_vils || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {step.food_vils || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {step.gold_vils || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {step.stone_vils || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {step.population || "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default BuildOrderDetail;
