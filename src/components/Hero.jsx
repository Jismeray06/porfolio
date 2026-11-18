import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GITHUB, NAME, ROLES } from "../data.js";
import { Icon, Magnetic, SplitWords, Tilt, Typewriter, EASE } from "./ui.jsx";

export default function Hero({ ready = true }) {
  const go = (v) => (ready ? v : undefined);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" id="accueil" ref={ref}>
      <div className="container hero__inner">
        <motion.div className="hero__text" style={{ y: textY, opacity: fade }}>
          <motion.span
            className="badge"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={go({ opacity: 1, y: 0, scale: 1 })}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          >
            <span className="badge__dot" /> Ouvert aux opportunités
          </motion.span>

          <h1 className="hero__title">
            <SplitWords ready={ready} text="Salut, je suis" delay={0.35} />
            <br />
            <SplitWords ready={ready} text={NAME} className="gradient-text" delay={0.55} />
          </h1>

          <motion.p
            className="hero__role"
            initial={{ opacity: 0 }}
            animate={go({ opacity: 1 })}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <span className="hero__prompt">&gt;</span> <Typewriter words={ROLES} />
          </motion.p>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={go({ opacity: 1, y: 0 })}
            transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
          >
            Je conçois et développe des applications web de bout en bout : des interfaces claires et
            accessibles côté client, des API fiables et sécurisées côté serveur.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={go({ opacity: 1, y: 0 })}
            transition={{ delay: 1.35, duration: 0.7, ease: EASE }}
          >
            <Magnetic>
              <a className="btn btn--primary" href="#projets">
                Voir mes projets <Icon.arrow />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost" href={GITHUB} target="_blank" rel="noopener noreferrer">
                <Icon.github /> Mon GitHub
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div className="hero__media" style={{ y: mediaY }}>
          <motion.div
            className="hero__media-in"
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={go({ opacity: 1, scale: 1, rotate: 0 })}
            transition={{ delay: 0.4, duration: 1, ease: EASE }}
          >
            <div className="hero__orbit" aria-hidden="true" />
            <Tilt max={9} className="photo-wrap">
              <div className="photo">
                <img
                  src="/jismeray.jpg"
                  alt={`Portrait de ${NAME}`}
                  width="1419"
                  height="1109"
                  fetchPriority="high"
                />
                <div className="photo__shine" aria-hidden="true" />
              </div>

              <div className="float-card float-card--a" aria-hidden="true">
                <span className="float-card__label">Stack</span>
                <strong>Next.js · NestJS</strong>
              </div>
              <div className="float-card float-card--b" aria-hidden="true">
                <span className="float-card__label">Langage</span>
                <strong>TypeScript</strong>
              </div>
              <div className="float-card float-card--c" aria-hidden="true">
                <span className="float-card__label">Base de données</span>
                <strong>Prisma</strong>
              </div>
            </Tilt>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#apropos"
        className="scroll-cue"
        aria-label="Défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={go({ opacity: 1 })}
        transition={{ delay: 2 }}
      >
        <span className="scroll-cue__mouse"><i /></span>
      </motion.a>
    </section>
  );
}
