// ── FALLBACK CONTENT ────────────────────────────────────────────────
// These are the defaults shown if Supabase is unreachable (offline dev,
// misconfigured env vars, etc). The live, editable copy lives in the
// `site_content` Supabase table — edit it via /admin, not here.

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string; // digits only, e.g. "2348012345678" — used in wa.me link
  calUsername: string;
};

export type Skill = {
  category: string;
  items: string[];
};

export type Project = {
  name: string;
  status: "live" | "archived";
  description: string;
  stack: string[];
  href?: string;
  repo?: string;
  private?: boolean;
  imageUrl?: string;
};

export type SiteContent = {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
};

export const defaultContent: SiteContent = {
  profile: {
    name: "Korede Taofeek Jamiu",
    role: "Front-End Developer | React & TypeScript Engineer",
    tagline:
      "I'm a Front-End Developer with 8 years of experience building scalable, accessible, and high-performance web applications using React, TypeScript, and modern JavaScript. I enjoy solving complex UI challenges, integrating APIs, optimizing application performance, and delivering exceptional user experiences across fintech, e-commerce, and enterprise platforms.",
    location: "Abuja, Nigeria",
    availability: "Open to remote opportunities",
    email: "contacttechkorede@gmail.com",
    github: "https://github.com/Korede-sys",
    linkedin: "https://www.linkedin.com/in/korede-jamiu-294293239",
    whatsapp: "2348146660231",
    calUsername: "your-cal-username",
  },
  skills: [
    { category: "languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
    {
      category: "frameworks",
      items: ["React.js", "Next.js", "Redux Toolkit", "React Router", "Tailwind CSS", "Bootstrap"],
    },
    { category: "apis_backend", items: ["REST APIs", "JSON", "Axios", "Node.js"] },
    { category: "tools", items: ["Git", "GitHub", "Vercel", "Figma", "VS Code", "Postman", "npm", "Yarn"] },
    {
      category: "practices",
      items: [
        "Responsive Design",
        "Mobile-First",
        "Component Architecture",
        "Accessibility (WCAG)",
        "Performance Optimization",
        "Cross-Browser Compatibility",
        "SEO",
        "Agile/Scrum",
      ],
    },
  ],
  projects: [
    {
      name: "AccessBET Betting Platform",
      status: "live",
      private: true,
      description:
        "Developed and maintained production-grade frontend features for a high-traffic betting platform. Improved UI performance, resolved transaction and payment-related issues, integrated APIs, and collaborated with cross-functional teams to deliver reliable customer-facing features.",
      stack: ["React", "JavaScript", "REST APIs", "Git", "CSS"],
    },
    {
      name: "Fintech Wallet Application",
      status: "live",
      description:
        "Built a secure wallet interface with real-time transaction handling, API integration, and responsive UI. Improved transaction reliability by debugging state management and frontend data flow.",
      stack: ["React", "TypeScript", "REST APIs", "CSS", "Git"],
    },
    {
      name: "E-commerce Platform",
      status: "live",
      description:
        "Developed reusable UI components and optimized checkout and payment experiences while improving accessibility, SEO, and overall application performance.",
      stack: ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
    },
  ],
};
