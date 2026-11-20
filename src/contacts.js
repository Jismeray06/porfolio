import {
  siFacebook, siGithub, siGmail, siInstagram, siTelegram, siTiktok, siWhatsapp,
} from "simple-icons";

// Le logo LinkedIn n'est plus dans simple-icons : tracé "in" à la main
const LINKEDIN_ICON = {
  hex: "0A66C2",
  path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
};

const isUrl = (v) => /^https?:\/\//i.test(v);
const handle = (v) => v.replace(/^@/, "").trim();

/**
 * Transforme la config de data.js en liste de boutons.
 * Les champs vides sont ignorés : rien ne s'affiche tant que tu ne les remplis pas.
 */
export function buildContacts(c, github) {
  const list = [];

  if (c.email) {
    list.push({ id: "email", label: "E-mail", hint: c.email, href: `mailto:${c.email.trim()}`, icon: siGmail });
  }
  if (c.whatsapp) {
    const digits = c.whatsapp.replace(/\D/g, "");
    if (digits) list.push({ id: "whatsapp", label: "WhatsApp", hint: "Envoyer un message", href: `https://wa.me/${digits}`, icon: siWhatsapp, external: true });
  }
  if (c.facebook) {
    list.push({ id: "facebook", label: "Facebook", hint: "Mon profil", href: c.facebook.trim(), icon: siFacebook, external: true });
  }
  if (c.instagram) {
    const href = isUrl(c.instagram) ? c.instagram.trim() : `https://instagram.com/${handle(c.instagram)}`;
    list.push({ id: "instagram", label: "Instagram", hint: isUrl(c.instagram) ? "Mon profil" : `@${handle(c.instagram)}`, href, icon: siInstagram, external: true });
  }
  if (c.linkedin) {
    list.push({ id: "linkedin", label: "LinkedIn", hint: "Mon profil", href: c.linkedin.trim(), icon: LINKEDIN_ICON, external: true });
  }
  if (c.tiktok) {
    const href = isUrl(c.tiktok) ? c.tiktok.trim() : `https://www.tiktok.com/@${handle(c.tiktok)}`;
    list.push({ id: "tiktok", label: "TikTok", hint: isUrl(c.tiktok) ? "Mon profil" : `@${handle(c.tiktok)}`, href, icon: siTiktok, external: true });
  }
  if (c.telegram) {
    const href = isUrl(c.telegram) ? c.telegram.trim() : `https://t.me/${handle(c.telegram)}`;
    list.push({ id: "telegram", label: "Telegram", hint: isUrl(c.telegram) ? "Écrire" : `@${handle(c.telegram)}`, href, icon: siTelegram, external: true });
  }

  // GitHub est toujours affiché
  list.push({ id: "github", label: "GitHub", hint: "github.com/Jismeray06", href: github, icon: siGithub, external: true });
  return list;
}
