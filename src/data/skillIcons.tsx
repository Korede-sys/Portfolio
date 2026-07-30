import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiReactrouter,
  SiTailwindcss,
  SiBootstrap,
  SiJson,
  SiAxios,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiPostman,
  SiNpm,
  SiYarn,
} from "react-icons/si";
import {
  Smartphone,
  Blocks,
  Accessibility,
  Gauge,
  Search,
  RefreshCw,
  Globe,
  Globe2,
  Wrench,
} from "lucide-react";

// Maps a skill's display name (case-insensitive, ignoring version suffixes
// like "(ES6+)") to an icon component. Falls back to a generic Wrench icon
// if nothing matches.
const iconMap: Record<string, IconType | React.ComponentType<{ size?: number }>> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  html5: SiHtml5,
  css3: SiCss,
  "react.js": SiReact,
  react: SiReact,
  "next.js": SiNextdotjs,
  "redux toolkit": SiRedux,
  redux: SiRedux,
  "react router": SiReactrouter,
  "tailwind css": SiTailwindcss,
  bootstrap: SiBootstrap,
  "rest apis": Globe,
  json: SiJson,
  axios: SiAxios,
  "node.js": SiNodedotjs,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
  figma: SiFigma,
  "vs code": Blocks,
  postman: SiPostman,
  npm: SiNpm,
  yarn: SiYarn,
  "responsive design": Smartphone,
  "mobile-first": Smartphone,
  "component architecture": Blocks,
  "accessibility (wcag)": Accessibility,
  "performance optimization": Gauge,
  "cross-browser compatibility": Globe2,
  seo: Search,
  "agile/scrum": RefreshCw,
};

export function getSkillIcon(name: string) {
  const key = name.toLowerCase().replace(/\s*\(es6\+\)/, "").trim();
  return iconMap[key] ?? Wrench;
}
