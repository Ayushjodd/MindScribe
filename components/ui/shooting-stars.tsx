"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { useTheme } from "next-themes";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface BackgroundStar {
  id: number;
  x: number;
  y: number;
  scale: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
  backgroundStarCount?: number; // Number of background stars
}

const getRandomStartPoint = (): { x: number; y: number; angle: number } => {
  if (typeof window !== "undefined") {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;

    switch (side) {
      case 0:
        return { x: offset, y: 0, angle: 45 };
      case 1:
        return { x: window.innerWidth, y: offset, angle: 135 };
      case 2:
        return { x: offset, y: window.innerHeight, angle: 225 };
      case 3:
        return { x: 0, y: offset, angle: 315 };
      default:
        return { x: 0, y: 0, angle: 45 };
    }
  }
  return { x: 0, y: 0, angle: 45 };
};

// Generates random positions for static background stars
const generateBackgroundStars = (count: number): BackgroundStar[] =>
  Array.from({ length: count }, (_, id) => ({
    id,
    x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
    y: typeof window !== "undefined" ? Math.random() * window.innerHeight : 0,
    scale: 0.5 + Math.random() * 0.5, // Varying star sizes
  }));

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
  backgroundStarCount = 100, // Default number of background stars
}) => {
  const { theme } = useTheme();
  const [star, setStar] = useState<ShootingStar | null>(null);
  const [backgroundStars, setBackgroundStars] = useState<BackgroundStar[]>([]);
  const svgRef = useRef<SVGSVGElement>(null) as MutableRefObject<SVGSVGElement>;

  const backgroundStarColor = theme === "light" ? "#c11d84" : "#FFFFFF";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBackgroundStars(generateBackgroundStars(backgroundStarCount));

      const createStar = () => {
        const { x, y, angle } = getRandomStartPoint();
        const newStar: ShootingStar = {
          id: Date.now(),
          x,
          y,
          angle,
          scale: 1,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          distance: 0,
        };
        setStar(newStar);

        const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
        setTimeout(createStar, randomDelay);
      };

      createStar();
    }
  }, [minSpeed, maxSpeed, minDelay, maxDelay, backgroundStarCount]);

  useEffect(() => {
    if (typeof window !== "undefined" && star) {
      const moveStar = () => {
        setStar((prevStar) => {
          if (!prevStar) return null;
          const newX =
            prevStar.x +
            prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
          const newY =
            prevStar.y +
            prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
          const newDistance = prevStar.distance + prevStar.speed;
          const newScale = 1 + newDistance / 100;

          if (
            newX < -20 ||
            newX > (window?.innerWidth || 0) + 20 ||
            newY < -20 ||
            newY > (window?.innerHeight || 0) + 20
          ) {
            return null;
          }
          return {
            ...prevStar,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
        });
      };

      const animationFrame = requestAnimationFrame(moveStar);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [star]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0", className)}
    >
      {/* Background static stars */}
      {backgroundStars.map((backgroundStar) => (
        <circle
          key={backgroundStar.id}
          cx={backgroundStar.x}
          cy={backgroundStar.y}
          r={2 * backgroundStar.scale}
          fill={backgroundStarColor}
          opacity={0.8}
        />
      ))}

      {/* Shooting star */}
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      )}

      {/* Gradient definition for shooting star */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
