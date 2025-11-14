export const particlesConfig = {
  background: { color: "transparent" },
  fpsLimit: 60,
  particles: {
    number: { value: 25 },
    color: { value: ["#ffea00", "#ff3b2f", "#999", "#ffffff33"] },
    size: { value: 2 },
    opacity: { value: 0.4 },
    move: {
      enable: true,
      speed: 0.3,
      random: true,
      direction: "none",
      outModes: { default: "bounce" },
    },
  }
};
