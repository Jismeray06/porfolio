import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const EASE = [0.2, 0.7, 0.2, 1];

/* ---------- Apparition au scroll ---------- */
export function Reveal({ children, delay = 0, y = 28, x = 0, className, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Titre animé mot par mot ---------- */
export function SplitWords({ text, className, delay = 0, as: Tag = "span", inView = false, ready = true }) {
  const MotionTag = motion[Tag];
  const words = text.split(" ");
  const trigger = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-80px" } }
    : { initial: "hidden", animate: ready ? "show" : "hidden" };
  return (
    <MotionTag
      className={className}
      aria-label={text}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((w, i) => (
        <span key={i} className="word" aria-hidden="true">
          <motion.span
            className="word__inner"
            variants={{
              hidden: { y: "110%", rotate: 6, opacity: 0 },
              show: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}

/* ---------- Machine à écrire ---------- */
export function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      t = setTimeout(() => {
        setDeleting(false);
        setI((n) => (n + 1) % words.length);
      }, 200);
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 40 : 80
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter__caret" aria-hidden="true" />
    </span>
  );
}

/* ---------- Compteur animé ---------- */
export function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

/* ---------- Bouton magnétique ---------- */
export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Inclinaison 3D ---------- */
export function Tilt({ children, max = 10, className, style }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 16 });
  const sry = useSpring(ry, { stiffness: 160, damping: 16 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Carte avec halo qui suit la souris ---------- */
export function SpotlightCard({ children, className = "", delay = 0, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      ref={ref}
      className={`card spot ${className}`}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Icônes ---------- */
const P = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export const Icon = {
  github: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.63 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...P} aria-hidden="true" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  external: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...P} aria-hidden="true" {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...P} aria-hidden="true" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  monitor: (p) => (
    <svg viewBox="0 0 24 24" width="24" height="24" {...P} aria-hidden="true" {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  ),
  server: (p) => (
    <svg viewBox="0 0 24 24" width="24" height="24" {...P} aria-hidden="true" {...p}>
      <rect x="2" y="3" width="20" height="7" rx="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" />
      <path d="M6 6.5h.01M6 17.5h.01" />
    </svg>
  ),
  tool: (p) => (
    <svg viewBox="0 0 24 24" width="24" height="24" {...P} aria-hidden="true" {...p}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};
