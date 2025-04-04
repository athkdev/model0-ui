// app/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [appName] = useState("model-0");
  const [description] = useState(
    "MLaaS platform to train and tune your ML, GPT models and use them in your applications ASAP"
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [letterSpacing, setLetterSpacing] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number>(0);

  function animate() {
    const time = Date.now() / 1000;
    setLetterSpacing(Math.sin(time) * 10);
    animationRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  function handleMouseMove(event: React.MouseEvent) {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }

  const gradientStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(68, 50, 168, 0.1), transparent 80%)`,
  };

  return (
    <section
      className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={gradientStyle}
      ></div>
      <div className="text-center relative z-10">
        <h1
          className="text-9xl font-bold text-gray-900 mb-4 transition-all duration-300 ease-in-out animate-float"
          style={{ letterSpacing: `${letterSpacing}px` }}
        >
          {appName}
        </h1>
        <p className="text-xl text-gray-600">{description}</p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/login">
            <Button>Take me to dashboard</Button>
          </Link>
          <Link href="/signup">
            <Button>I'm new to model-0</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
