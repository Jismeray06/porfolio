import { useEffect, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import Background, { CursorGlow } from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import {
  About, Contact, Footer, Marquee, Projects, Skills, Stats,
} from "./components/Sections.jsx";
import { EASE } from "./components/ui.jsx";

function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="loader__logo"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        J
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        Jismeray · Portfolio
      </motion.p>
      <div className="loader__bar">
        <motion.i initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2, ease: EASE }} />
      </div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "dark");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f8f9fc" : "#0b0d12");
  }, [theme]);

  return (
    // reducedMotion="user" : les animations de mouvement sont désactivées si le système le demande
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <main>
        <Hero ready={!loading} theme={theme} />
        <Marquee />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
