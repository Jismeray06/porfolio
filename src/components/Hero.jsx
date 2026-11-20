import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GITHUB, NAME, ROLES } from "../data.js";
import { Icon, Magnetic, Typewriter, EASE } from "./ui.jsx";

const [FIRST_NAME, ...REST] = NAME.split(" ");
const LAST_NAME = REST.join(" ");

export default function Hero({ ready = true }) {
  const go = (v) => (ready ? v : undefined);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" id="accueil" ref={ref}>
      {/* Portrait : photo de studio déjà finie (fond sombre + lueur bleue) */}
      <motion.div className="hero__portrait" style={{ y: portraitY }}>
        <motion.img
          src="/jismeray-hero.webp"
          alt={`Portrait de ${NAME}`}
          width="1306"
          height="816"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={go({ opacity: 1, scale: 1 })}
          transition={{ delay: 0.2, duration: 1.4, ease: EASE }}
        />
      </motion.div>

      {/* Nom géant, devant le buste */}
      <motion.h1 className="hero__name" aria-label={NAME} style={{ y: nameY }}>
        <span className="hero__first" aria-hidden="true">
          <motion.span
            initial={{ y: "100%" }}
            animate={go({ y: 0 })}
            transition={{ delay: 0.5, duration: 1, ease: EASE }}
          >
            {FIRST_NAME}
          </motion.span>
        </span>
        <motion.span
          className="hero__last"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={go({ opacity: 1 })}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {LAST_NAME}
        </motion.span>
      </motion.h1>

      <div className="container hero__top">
        <motion.div className="hero__left" style={{ opacity: fade }}>
          <motion.span
            className="badge"
            initial={{ opacity: 0, y: 16 }}
            animate={go({ opacity: 1, y: 0 })}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          >
            <span className="badge__dot" /> Ouvert aux opportunités
          </motion.span>

          <motion.p
            className="hero__role"
            initial={{ opacity: 0, y: 16 }}
            animate={go({ opacity: 1, y: 0 })}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
          >
            <span className="hero__prompt">&gt;</span> <Typewriter words={ROLES} />
          </motion.p>
        </motion.div>

        <motion.div
          className="hero__right"
          style={{ opacity: fade }}
          initial={{ opacity: 0, y: 20 }}
          animate={go({ opacity: 1, y: 0 })}
          transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
        >
          <p className="hero__lead">
            Je conçois des applications web de bout en bout : interfaces claires côté client, API
            fiables et sécurisées côté serveur.
          </p>
          <div className="hero__cta">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
