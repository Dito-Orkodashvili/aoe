export function Hero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-6">{children}</div>
      </div>
    </section>
  );
}
