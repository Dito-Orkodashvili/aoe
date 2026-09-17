"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-16 max-w-xl">
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <TriangleAlert className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">შეცდომა</h1>
          <p className="text-muted-foreground">
            გვერდის ჩატვირთვა ვერ მოხერხდა. სცადე ხელახლა.
          </p>
          <div className="flex gap-2 justify-center pt-2">
            <Button onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              ხელახლა ცდა
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">მთავარი</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
