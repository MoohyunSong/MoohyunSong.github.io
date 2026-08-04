import { CV_PUBLICATIONS_SECTION } from "./publications"

export const ME = "Moohyun Song"

export const NAV_ITEMS = [
  { label: "About", target: "about" },
  { label: "Publications", target: "publications" },
  { label: "Projects", target: "projects" },
  { label: "CV", target: "cv" },
] as const

export const CONTACTS = {
  email: "moohyunsong@hanyang.ac.kr",
  orcid: "https://orcid.org/0009-0003-9392-7808",
  scholar: "https://scholar.google.com/citations?user=P0rZYIQAAAAJ",
  github: "https://github.com/MoohyunSong",
  linkedin: "https://www.linkedin.com/in/moohyun-song-68b39a185/",
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  title: string
  venue: string
  desc: string
  links: ProjectLink[]
  /** Representative figure from the paper, served from public/projects/. */
  image?: string
  imageAlt?: string
}

export const PROJECTS: Project[] = [
  {
    title: "Callisto",
    venue: "KCC 2025 · BEST PAPER",
    desc: "Cost-efficient AI development platform using spot instances — reclaiming idle cloud capacity to provide affordable AI development environments. Best Paper Award at KCC 2025.",
    links: [
      {
        label: "PAPER",
        href: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12318265",
      },
    ],
  },
  {
    title: "HybridServe",
    venue: "WOSC11 2025",
    desc: "Adaptive WebAssembly-container runtime selection for edge serverless computing, cutting cold start latency by 91.9% versus container-only deployments.",
    links: [{ label: "PAPER", href: "https://doi.org/10.1145/3774899.3775011" }],
  },
  {
    title: "Edge-Cloud MCP Tool Runtimes",
    venue: "CCGRID 2026",
    desc: "Orchestrating WASM-based MCP tool runtimes for AI agents across the edge-cloud continuum, placing lightweight tool execution close to where agents need it.",
    links: [],
  },
  {
    title: "Spot Instance Availability",
    venue: "IEEE CLOUD 2026 · HPDC 2025",
    desc: "Peeking into spot instance availability (Ding-Dong Ditch) and a multi-node availability score collection system that extends Spotlake with public datasets.",
    links: [{ label: "PAPER", href: "https://doi.org/10.1145/3731545.3735122" }],
  },
  {
    title: "KubEVC-Agent",
    venue: "IEMEK JOURNAL 2023",
    desc: "Kubernetes edge vision cluster agent for optimal DNN inference and operation on resource-constrained edge devices.",
    links: [
      {
        label: "PAPER",
        href: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003027702",
      },
    ],
  },
  {
    title: "CostNorm",
    venue: "KIPS 2025",
    desc: "LLM-based cloud cost optimization AI agent that analyzes cloud usage and autonomously applies cost-saving actions.",
    links: [
      {
        label: "PAPER",
        href: "https://koreascience.or.kr/article/CFKO202520950404978.page",
      },
    ],
  },
]

export interface CvItem {
  date: string
  title: string
  sub: string
  note?: string
}

export interface CvSection {
  heading: string
  items: CvItem[]
}

export const CV_SECTIONS: CvSection[] = [
  {
    heading: "Education",
    items: [
      {
        date: "Mar. 2026 – present",
        title: "Hanyang University",
        sub: "Ph.D. Student in Artificial Intelligence · Seoul, South Korea",
      },
      {
        date: "Mar. 2020 – Feb. 2026",
        title: "Kookmin University",
        sub: "B.S.E. in Computer Science · Seoul, South Korea",
        note: "Including 2 years of military service (ROKAF, 2021–2023).",
      },
    ],
  },
  {
    heading: "Experience",
    items: [
      {
        date: "Jul. 2025 – Aug. 2025",
        title: "ETRI (Electronics and Telecommunications Research Institute)",
        sub: "Research Intern · Daejeon, South Korea",
        note: "Built distributed training and MLOps environments on containerized (Kubernetes) infrastructure managing 100+ GPU clusters; researched efficient LLM training with Data Parallelism and FSDP, and efficient fine-tuning with LoRA/QLoRA and quantization.",
      },
    ],
  },
  {
    heading: "Teaching Experience",
    items: [
      {
        date: "Jun. 2025",
        title: "Software Architect: Cloud Computing",
        sub: "Teaching Assistant, Samsung Electronics",
        note: "Assisted a professor in teaching the course to 83 Samsung developers. Topics included AWS Cloud, Kubernetes, and Serverless Computing.",
      },
    ],
  },
  CV_PUBLICATIONS_SECTION,
  {
    heading: "Honors & Awards",
    items: [
      {
        date: "Jul. 2025",
        title: "Best Paper Award",
        sub: "KIISE Korea Computer Congress 2025 (KCC 2025)",
      },
      {
        date: "May 2024",
        title: "AWS Summit Seoul 2024 GameDay — Generative AI, 2nd Place (Round 2)",
        sub: "AWS Korea",
      },
      {
        date: "Dec. 2023",
        title: "AWS Rookie Championship 2023 — AWS JAM, 1st Place",
        sub: "AWS Korea",
      },
      {
        date: "Aug. 2020",
        title: "Industrial Service Medal (산업포장)",
        sub: "Republic of Korea",
      },
      {
        date: "Aug. 2019",
        title: "Medallion for Excellence, Cloud Computing (4th Place)",
        sub: "WorldSkills Kazan 2019",
      },
      {
        date: "Oct. 2018",
        title: "Silver Medal, IT Network System Administration",
        sub: "53rd WorldSkills Korea National Competition",
      },
    ],
  },
]
