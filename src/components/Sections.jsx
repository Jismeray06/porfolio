import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ABOUT_POINTS, CONTACT, GITHUB, MARQUEE, NAME, NAV, PROJECTS, SKILLS, STATS,
} from "../data.js";
import {
  CountUp, EASE, Icon, Magnetic, Reveal, SpotlightCard, SplitWords, Tilt,
} from "./ui.jsx";
import TechIcon from "./TechIcon.jsx";
import { buildContacts } from "../contacts.js";

/* ============ Bandeau technologies ============ */
export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-label="Technologies utilisées">
      <div className="marquee__track">
        {items.map((t, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= MARQUEE.length}>
            <i /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============ Chiffres ============ */
export function Stats() {
  return (
    <section className="stats" aria-label="Chiffres clés du projet principal">
      <div className="container stats__grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
            whileHover={{ y: -6 }}
          >
            <strong>{s.text ?? <CountUp to={s.value} />}</strong>
            <span>{s.label}</span>
          </motion.div>
        ))}
      </div>
      <Reveal className="stats__note container" delay={0.3}>Chiffres issus de mon projet BOURSE_DEV.</Reveal>
    </section>
  );
}

/* ============ À propos ============ */
const CODE_LINES = [
  [["k", "const"], ["v", " jismeray"], ["p", " = {"]],
  [["p", "  "], ["a", "role"], ["p", ": "], ["s", '"Développeur Fullstack"'], ["p", ","]],
  [["p", "  "], ["a", "front"], ["p", ": ["], ["s", '"Next.js"'], ["p", ", "], ["s", '"React"'], ["p", ", "], ["s", '"Tailwind"'], ["p", "],"]],
  [["p", "  "], ["a", "back"], ["p", ": ["], ["s", '"NestJS"'], ["p", ", "], ["s", '"Prisma"'], ["p", "],"]],
  [["p", "  "], ["a", "langage"], ["p", ": "], ["s", '"TypeScript"'], ["p", ","]],
  [["p", "  "], ["a", "github"], ["p", ": "], ["s", '"Jismeray06"'], ["p", ","]],
  [["p", "  "], ["a", "motivé"], ["p", ": "], ["k", "true"], ["p", ","]],
  [["p", "};"]],
];

function CodeCard() {
  return (
    <Tilt max={6} className="code">
      <div className="code__bar">
        <i /><i /><i />
        <span>jismeray.ts</span>
      </div>
      <pre className="code__body" aria-label="Résumé de profil en code">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="code__line"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.45, ease: EASE }}
          >
            <span className="code__n">{i + 1}</span>
            {line.map(([c, t], j) => (
              <span key={j} className={`t-${c}`}>{t}</span>
            ))}
          </motion.div>
        ))}
      </pre>
    </Tilt>
  );
}

export function About() {
  return (
    <section className="section" id="apropos">
      <div className="container about">
        <div className="about__left">
          <Reveal><span className="eyebrow">À propos</span></Reveal>
          <h2><SplitWords inView text="Du besoin réel au produit utilisable" /></h2>
          <Reveal delay={0.15}>
            <p>
              Je suis développeur fullstack, étudiant en Génie informatique. J'aime transformer un
              processus concret — ici, la demande de bourse sur papier — en une application web
              complète, pensée pour chaque type d'utilisateur.
            </p>
            <p>
              Mon approche : une architecture propre, des règles de gestion explicites, une
              documentation honnête de ce qui est fait et de ce qui reste à faire, et une interface
              qui reste simple à utiliser.
            </p>
          </Reveal>
          <ul className="about__points">
            {ABOUT_POINTS.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 * i, duration: 0.5, ease: EASE }}
              >
                <svg className="check" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" />
                  <motion.path
                    d="M7 12.5l3.2 3.2L17 9"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + 0.1 * i, duration: 0.6 }}
                  />
                </svg>
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
        <Reveal x={40} y={0} delay={0.1}><CodeCard /></Reveal>
      </div>
    </section>
  );
}

/* ============ Compétences ============ */
export function Skills() {
  return (
    <section className="section section--alt" id="competences">
      <div className="container">
        <div className="section__head">
          <Reveal><span className="eyebrow">Compétences</span></Reveal>
          <h2><SplitWords inView text="Ma boîte à outils" /></h2>
          <Reveal delay={0.2}><p className="section__sub">Les technologies que j'utilise dans mes projets.</p></Reveal>
        </div>

        <div className="skills">
          {SKILLS.map((s, i) => {
            const Ico = Icon[s.icon];
            return (
              <SpotlightCard key={s.title} className="skill" delay={i * 0.12} whileHover={{ y: -8 }}>
                <div className="skill__icon"><Ico /></div>
                <h3>{s.title}</h3>
                <motion.ul
                  className="tags"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 + i * 0.12 } } }}
                >
                  {s.tags.map((t) => (
                    <motion.li
                      key={t}
                      variants={{
                        hidden: { opacity: 0, scale: 0.6, y: 10 },
                        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 18 } },
                      }}
                      whileHover={{ y: -3, scale: 1.06 }}
                    >
                      <TechIcon name={t} />
                      {t}
                    </motion.li>
                  ))}
                </motion.ul>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ Projets ============ */
const STATUSES = ["Brouillon", "Soumis", "Validé"];

function DossierMock() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % STATUSES.length), 1900);
    return () => clearInterval(t);
  }, []);
  const progress = ((i + 1) / STATUSES.length) * 100;

  return (
    <div className="mock">
      <div className="mock__bar"><i /><i /><i /></div>
      <div className="mock__body">
        <div className="mock__side"><b /><b /><b /><b /></div>
        <div className="mock__main">
          <div className="mock__head">
            <div className="mock__row mock__row--title" />
            <AnimatePresence mode="wait">
              <motion.span
                key={STATUSES[i]}
                className={`mock__status mock__status--${i}`}
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.8 }}
                transition={{ duration: 0.25 }}
              >
                {STATUSES[i]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mock__cards"><u /><u /><u /></div>
          <div className="mock__progress"><motion.i animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: EASE }} /></div>
          <div className="mock__row shimmer" />
          <div className="mock__row mock__row--short shimmer" />
        </div>
      </div>
    </div>
  );
}

function ExtLink({ href, primary, label, children }) {
  return (
    <Magnetic strength={0.2}>
      <a
        className={`btn btn--sm ${primary ? "btn--primary" : "btn--ghost"}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${children} : ${label} (nouvel onglet)`}
      >
        {children} <Icon.external />
      </a>
    </Magnetic>
  );
}

export function Projects() {
  const [main, ...others] = PROJECTS;
  return (
    <section className="section" id="projets">
      <div className="container">
        <div className="section__head">
          <Reveal><span className="eyebrow">Projets</span></Reveal>
          <h2><SplitWords inView text="Réalisations" /></h2>
          <Reveal delay={0.2}><p className="section__sub">Issus de mon GitHub. Le code source est consultable.</p></Reveal>
        </div>

        <SpotlightCard className="project project--featured">
          <div className="project__visual">
            <div className="project__orb" aria-hidden="true" />
            <Tilt max={8} className="project__tilt"><DossierMock /></Tilt>
          </div>
          <div className="project__content">
            <span className="pill">{main.pill}</span>
            <h3>{main.title}</h3>
            <p>{main.text}</p>
            <motion.ul
              className="project__features"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            >
              {main.features.map((f) => (
                <motion.li key={f} variants={{ hidden: { opacity: 0, x: -18 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}>
                  {f}
                </motion.li>
              ))}
            </motion.ul>
            <ul className="tags tags--sm">{main.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="project__links"><ExtLink primary href={main.href} label={main.title}>Voir le code</ExtLink></div>
          </div>
        </SpotlightCard>

        {others.map((p) => (
          <SpotlightCard key={p.title} className="project project--simple" delay={0.1} whileHover={{ y: -4 }}>
            <div className="project__content">
              <span className="pill pill--muted">{p.pill}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="tags tags--sm">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="project__links"><ExtLink href={p.href} label={p.title}>Voir le code</ExtLink></div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

/* ============ Contact ============ */
const CONTACTS = buildContacts(CONTACT, GITHUB);

// Les logos très sombres (GitHub, TikTok…) passent en clair pour rester visibles sur fond sombre
function brandColor(hex) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.3 ? "#eef0f6" : `#${hex}`;
}

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          className="cta"
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="cta__border" aria-hidden="true" />
          <div className="cta__inner">
            <div className="cta__orb cta__orb--1" aria-hidden="true" />
            <div className="cta__orb cta__orb--2" aria-hidden="true" />
            <span className="eyebrow">Contact</span>
            <h2><SplitWords inView text="Travaillons ensemble" /></h2>
            <p>Un projet, un stage ou une opportunité ? Choisis le moyen qui t'arrange, je réponds avec plaisir.</p>
            <ul className="contact-grid">
              {CONTACTS.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: EASE }}
                >
                  <a
                    className="contact-card"
                    style={{ "--brand": brandColor(c.icon.hex) }}
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`${c.label} : ${c.hint}${c.external ? " (nouvel onglet)" : ""}`}
                  >
                    <span className="contact-card__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d={c.icon.path} /></svg>
                    </span>
                    <span className="contact-card__text">
                      <strong>{c.label}</strong>
                      <small>{c.hint}</small>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} {NAME}. Tous droits réservés.</p>
        <nav className="footer__nav" aria-label="Pied de page">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
