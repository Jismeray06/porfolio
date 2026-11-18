import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { GITHUB, NAV } from "../data.js";
import { Icon, EASE } from "./ui.jsx";

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const ids = NAV.map((n) => n.id);

export default function Navbar({ theme, onToggleTheme }) {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > 240 && y > prev && !open);
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "is-scrolled" : ""}`}
      animate={{ y: hidden ? "-110%" : 0 }}
      initial={{ y: "-110%" }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="container nav__inner">
        <a href="#accueil" className="nav__brand" aria-label="Accueil">
          <motion.span className="nav__logo" whileHover={{ rotate: 12, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            J
          </motion.span>
          <span className="nav__name">Jismeray</span>
        </a>

        <nav className="nav__links" aria-label="Navigation principale">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "is-active" : ""}>
              {active === n.id && (
                <motion.span
                  layoutId="navpill"
                  className="nav__pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="nav__label">{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <motion.button
            className="icon-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label="Changer de thème"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88, rotate: 20 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.22 }}
                style={{ display: "grid" }}
              >
                {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <a className="btn btn--primary btn--sm nav__cta" href={GITHUB} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>

          <button
            className={`icon-btn nav__burger ${open ? "is-open" : ""}`}
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="container mobile-menu__inner">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: EASE }}
                  className={active === n.id ? "is-active" : ""}
                >
                  {n.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
