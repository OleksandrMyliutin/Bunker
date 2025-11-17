import { motion, useScroll, useTransform } from "framer-motion";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particlesConfig } from "./ParticalsConfig";
import { useSmoke } from "./SmokeCanvas";
import radiation from "../../assets/radiation-sign.png";
import gasMask from "../../assets/gas-mask.png"
import "../../css/style.css";
import Hero from "../../components/Hero/Hero";

export default function LiveApocalypseBackground() {
  const smokeRef = useSmoke();
  const { scrollYProgress } = useScroll();

  // Паралакс анімація шарів
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -220]);

  const loadParticles = async (engine) => await loadSlim(engine);

  return (
    <div className="apocalypse-bg">
      {/* Canvas дим */}
      <canvas ref={smokeRef} className="smoke-canvas" />

      {/* Частинки */}
      <Particles
        id="particles"
        init={loadParticles}
        options={particlesConfig}
      />

      {/* Паралакс-шари */}
      <motion.img src={radiation} className="parallax-layer floating" alt="radiation"
        style={{  y: layer1Y, left: "10%", top: "20%", rotate: `${Math.random() * 30 - 15}deg`}} />

      <motion.img src={gasMask} className="parallax-layer floating"
        style={{ y: layer2Y, left: "47%", top: "37%" }} />

      <motion.img src={radiation} className="parallax-layer floating"
        style={{ y: layer3Y, left: "80%", top: "60%" }} />

      <motion.img src={gasMask} className="parallax-layer floating"
        style={{ y: layer1Y, left: "10%", top: "86%" }} />

      <motion.img src={radiation} className="parallax-layer floating"
        style={{ y: layer2Y, left: "90%", top: "12%" }} />

        <Hero/>
    </div>
  );
}
