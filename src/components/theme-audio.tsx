"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const ThemeAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme-audio");
    if (saved === "on") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }

    localStorage.setItem("theme-audio", isPlaying ? "on" : "off");
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src="/audio/aoe-intro.mp3" preload="auto" />
      <button
        onClick={() => setIsPlaying((v) => !v)}
        className="fixed top-22 right-10 z-20 p-3 cursor-pointer rounded-full bg-white/10 border border-border hover:border-primary/40 backdrop-blur-sm transition-all duration-300 group"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 text-primary transition-colors" />
        )}
      </button>
      ;
    </>
  );
};
