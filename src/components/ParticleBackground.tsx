"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let mx = 0, my = 0;
    const colors = ["#ff00aa", "#00ccff", "#8b5cf6", "#ff6600", "#ffffff"];

    const dots: { x: number; y: number; vx: number; vy: number; r: number; o: number; c: string; p: number; ps: number }[] = [];

    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    addEventListener("resize", resize);

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    addEventListener("mousemove", move);

    const N = Math.min(100, Math.round(innerWidth * innerHeight / 14000));
    for (let i = 0; i < N; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.4,
        o: Math.random() * 0.35 + 0.08,
        c: colors[Math.floor(Math.random() * colors.length)],
        p: Math.random() * Math.PI * 2,
        ps: 0.015 + Math.random() * 0.02,
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const d of dots) {
        d.p += d.ps;
        const pf = 0.6 + Math.sin(d.p) * 0.4;

        // mouse repel
        const dx = mx - d.x, dy = my - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const f = (180 - dist) / 180 * 0.015;
          d.vx -= (dx / dist) * f;
          d.vy -= (dy / dist) * f;
        }

        d.vx *= 0.995; d.vy *= 0.995;
        d.x += d.vx; d.y += d.vy;

        if (d.x < -20) d.x = canvas.width + 20;
        if (d.x > canvas.width + 20) d.x = -20;
        if (d.y < -20) d.y = canvas.height + 20;
        if (d.y > canvas.height + 20) d.y = -20;

        const co = d.o * pf;

        // outer glow
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 6);
        g.addColorStop(0, d.c);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = co * 0.15;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.globalAlpha = co;
        ctx.fillStyle = d.c;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * pf, 0, Math.PI * 2);
        ctx.fill();

        // white center
        ctx.globalAlpha = co * 0.5;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }

      // connections
      ctx.lineWidth = 0.4;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            const lg = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
            lg.addColorStop(0, dots[i].c);
            lg.addColorStop(1, dots[j].c);
            ctx.strokeStyle = lg;
            ctx.globalAlpha = 0.04 * (1 - d / 110);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("mousemove", move); };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}
