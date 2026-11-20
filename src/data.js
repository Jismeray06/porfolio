// Tout le contenu du portfolio est ici : modifie les textes sans toucher aux composants.

export const GITHUB = "https://github.com/Jismeray06";

export const NAME = "Jismeray ANDRIAFITSAHARANA";

// ============ CONTACT ============
// Remplis ce que tu veux afficher : les champs vides sont automatiquement masqués.
export const CONTACT = {
  email: "jismeray.06@gmail.com",      // "prenom.nom@gmail.com"
  whatsapp: "261339484976",   // numéro avec indicatif, sans espaces : "261340000000" (Madagascar = 261)
  facebook: "https://www.facebook.com/Jisme.06",   // lien du profil : "https://www.facebook.com/ton.profil"
  instagram: "@jisme06",  // "@ton_pseudo" ou lien du profil
  linkedin: "",   // "https://www.linkedin.com/in/ton-profil"
  tiktok: "",     // "@ton_pseudo" ou lien
  telegram: "",   // "@ton_pseudo" ou lien
};

export const ROLES = [
  "Développeur Fullstack",
  "Next.js & React",
  "NestJS & Prisma",
  "TypeScript",
];

export const NAV = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
];

export const MARQUEE = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "Node.js",
  "Prisma", "API REST", "Git", "GitHub", "Vitest", "HTML5", "CSS3", "JavaScript",
];

// Chiffres issus du cahier des charges de BOURSE_DEV
export const STATS = [
  { value: 6, label: "rôles utilisateurs gérés" },
  { value: 12, label: "contrôleurs d'API" },
  { value: 30, label: "migrations de base de données" },
  { text: "Multi", label: "établissements universitaires" },
];

export const ABOUT_POINTS = [
  "Conception d'API REST et modélisation de données",
  "Interfaces responsives avec React et Tailwind CSS",
  "Authentification, rôles et sécurité des accès",
];

export const SKILLS = [
  {
    title: "Frontend",
    icon: "monitor",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "Backend",
    icon: "server",
    tags: ["NestJS", "Node.js", "API REST", "Prisma", "Authentification Google", "Nodemailer"],
  },
  {
    title: "Outils & qualité",
    icon: "tool",
    tags: ["Git", "GitHub", "Vitest", "ESLint", "Prettier", "Shell"],
  },
];

export const PROJECTS = [
  {
    featured: true,
    pill: "Projet principal · Mémoire de Licence 3",
    title: "BOURSE_DEV — Plateforme de demande de bourse",
    text: "Application web qui dématérialise le dépôt et le traitement des dossiers de bourse à l'Université de Mahajanga, avec une architecture multi-établissements.",
    features: [
      "Dossier en ligne avec sauvegarde automatique en brouillon et dépôt des pièces justificatives",
      "Six rôles (étudiant, établissement, scolarité, administrateur…) avec espaces dédiés",
      "Décision Validé / Refusé motivée, notifications intégrées et par e-mail",
      "Journal d'audit, gestion des établissements et de la page d'accueil",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "NestJS", "Prisma", "TypeScript", "Vitest"],
    href: "https://github.com/Jismeray06/BOURSE_DEV",
  },
];
