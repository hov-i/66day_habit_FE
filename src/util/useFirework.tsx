import { useEffect } from "react";
import confetti, { Options } from "canvas-confetti";

interface CustomConfettiOptions extends Options {
  startVelocity: number;
  spread: number;
  ticks: number;
  zIndex: number;
  particleCount?: number;
  origin: { x: number; y: number };
}

const useFirework = (): void => {
  useEffect(() => {
    const firework = (): void => {
      const duration = 15 * 100;
      const animationEnd = Date.now() + duration;
      const defaults: CustomConfettiOptions = {
        startVelocity: 25,
        spread: 360,
        ticks: 50,
        zIndex: 999,
        particleCount: 0,
        origin: { x: 0, y: 0 },
      };

      function randomInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    };

    firework();
  }, []);
};

export default useFirework;
