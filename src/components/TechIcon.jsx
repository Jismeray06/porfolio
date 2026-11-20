import {
  siCss, siEslint, siGit, siGithub, siGnubash, siGoogle, siHtml5, siJavascript,
  siNestjs, siNextdotjs, siNodedotjs, siPrettier, siPrisma, siReact,
  siTailwindcss, siTypescript, siVitest,
} from "simple-icons";

// Nom affiché dans data.js -> logo (simple-icons)
const LOGOS = {
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  HTML5: siHtml5,
  CSS3: siCss,
  JavaScript: siJavascript,
  NestJS: siNestjs,
  "Node.js": siNodedotjs,
  Prisma: siPrisma,
  "Authentification Google": siGoogle,
  Git: siGit,
  GitHub: siGithub,
  Vitest: siVitest,
  ESLint: siEslint,
  Prettier: siPrettier,
  Shell: siGnubash,
};

// Logos absents de simple-icons : pictogrammes génériques
const FALLBACKS = {
  "API REST": (
    <>
      <path d="M4 8h13M13 4l4 4-4 4" />
      <path d="M20 16H7M11 12l-4 4 4 4" />
    </>
  ),
  Nodemailer: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
};

// Les logos trop sombres (Next.js, GitHub, Prisma…) disparaîtraient sur le thème sombre :
// on les affiche dans la couleur du texte.
function isDark(hex) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.35;
}

export default function TechIcon({ name }) {
  const logo = LOGOS[name];
  if (logo) {
    return (
      <svg className="tech-ico" viewBox="0 0 24 24" aria-hidden="true" fill={isDark(logo.hex) ? "currentColor" : `#${logo.hex}`}>
        <path d={logo.path} />
      </svg>
    );
  }
  return (
    <svg
      className="tech-ico tech-ico--line"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {FALLBACKS[name]}
    </svg>
  );
}
