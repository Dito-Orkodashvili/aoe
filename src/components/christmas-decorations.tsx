"use client";

import { useEffect, useState } from "react";

const Snowflake = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="fixed text-white pointer-events-none z-50 animate-fall"
    style={style}
  >
    ❄
  </div>
);

export const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<
    Array<{ id: number; style: React.CSSProperties }>
  >([]);

  useEffect(() => {
    const createSnowflake = () => {
      const id = Date.now() + Math.random();
      const left = Math.random() * 100;
      const animationDuration = 8 + Math.random() * 8;
      const fontSize = 10 + Math.random() * 15;
      const opacity = 0.4 + Math.random() * 0.6;

      const style: React.CSSProperties = {
        left: `${left}%`,
        fontSize: `${fontSize}px`,
        opacity,
        animation: `fall ${animationDuration}s linear forwards`,
      };

      setSnowflakes((prev) => [...prev, { id, style }]);

      // Remove snowflake after animation
      setTimeout(() => {
        setSnowflakes((prev) => prev.filter((s) => s.id !== id));
      }, animationDuration * 1000);
    };

    // Create initial snowflakes
    for (let i = 0; i < 15; i++) {
      setTimeout(createSnowflake, i * 200);
    }

    // Continue creating snowflakes
    const interval = setInterval(createSnowflake, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {snowflakes.map(({ id, style }) => (
        <Snowflake key={id} style={style} />
      ))}
    </>
  );
};
