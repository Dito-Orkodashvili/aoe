export const GlowingVs = () => {
  return (
    <span
      className="text-2xl md:text-4xl font-black tracking-wide text-purple-400 animate-[neonPulse_1.8s_ease-in-out_infinite]"
      style={{
        textShadow: `0 0 10px rgba(168,85,247,0.9),
                     0 0 30px rgba(168,85,247,0.8),
                     0 0 60px rgba(168,85,247,0.7),
                     0 0 120px rgba(147,51,234,0.6)`,
      }}
    >
      VS
    </span>
  );
};
