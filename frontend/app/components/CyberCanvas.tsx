"use client";

import { useEffect, useRef } from "react";

export default function CyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.85 
          ? "rgba(6, 182, 212, 0.4)" // Cyan
          : Math.random() > 0.95 
            ? "rgba(239, 68, 68, 0.4)" // Red alert
            : "rgba(39, 39, 42, 0.3)"; // Zinc
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 75 }, () => new Particle());

    // Grid lines variables
    let scanLineY = 0;
    const gridSpacing = 60;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)"; // Trail effect
      ctx.fillRect(0, 0, width, height);

      // 1. Draw glowing cyber grid lines
      ctx.strokeStyle = "rgba(20, 20, 25, 0.5)";
      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw moving horizontal scanner beam
      scanLineY += 1.5;
      if (scanLineY > height) scanLineY = 0;

      const scanGrad = ctx.createLinearGradient(0, scanLineY - 80, 0, scanLineY + 2);
      scanGrad.addColorStop(0, "rgba(6, 182, 212, 0)");
      scanGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.05)");
      scanGrad.addColorStop(1, "rgba(6, 182, 212, 0.18)");

      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanLineY - 80, width, 82);

      // Light beam highlight line
      ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(width, scanLineY);
      ctx.stroke();

      // 3. Connect particles with digital thread lines
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            // Draw connecting lines with opacity based on proximity
            const alpha = (1 - dist / 130) * 0.15;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Subtle ambient lighting vignette
      const radGrad = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      radGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      radGrad.addColorStop(1, "rgba(0, 0, 0, 0.85)");
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-black"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
