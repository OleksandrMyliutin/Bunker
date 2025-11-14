import { useRef, useEffect } from "react";
import smokeTexture from "../../assets/smoke.png";

export function useSmoke() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Завантажуємо PNG текстуру
    const smokeImg = new Image();
    smokeImg.src = smokeTexture;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 300,
      speed: 0.3 + Math.random() * 0.5,
      size: 280 + Math.random() * 150,
      alpha: 0.08 + Math.random() * 0.05,
      drift: (Math.random() - 0.9) * 0.4,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;

        // Малюємо PNG хмарку диму
        ctx.drawImage(
          smokeImg,
          p.x - p.size / 2,
          p.y - p.size / 2,
          p.size,
          p.size
        );

        ctx.restore();

        p.y -= p.speed;
        p.x += p.drift;

        if (p.y < -200) {
          p.y = canvas.height + Math.random() * 200;
          p.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(draw);
    }

    smokeImg.onload = draw;

    return () => window.removeEventListener("resize", resize);
  }, []);

  return canvasRef;
}
