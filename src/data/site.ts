import { makeCvPublicationsSection } from "./publications"

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

// To add a figure to a project: save the image as public/projects/<name>.png and set
// image: "/projects/<name>.png" (plus imageAlt) on the entry below.
export const PROJECTS: Project[] = [
  {
    title: "EdgeAgent",
    venue: "CCGRID 2026",
    desc: "Orchestrating WASM-based MCP tool runtimes for AI agents across the edge-cloud continuum, placing lightweight tool execution close to where agents need it.",
    links: [{ label: "PAPER", href: "https://ieeexplore.ieee.org/document/11619021" }],
  },
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
]

export interface CvItem {
  date: string
  title: string
  sub: string
  note?: string
  /** External link; when set, the item title becomes a hyperlink. */
  href?: string
  /** Substring of `sub` to render emphasized (used for the owner's name in citations). */
  highlight?: string
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
        sub: "Ph.D. in Artificial Intelligence · Seoul, South Korea",
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
  makeCvPublicationsSection(ME),
  {
    heading: "Honors & Awards",
    items: [
      {
        date: "May 2026",
        title: "CCGrid 2026 Student Travel Grant",
        sub: "26th IEEE International Symposium on Cluster, Cloud and Internet Computing",
        note: "Competitive travel grant supported by Western Sydney University, awarded with priority to students presenting accepted papers. Presented a first-author paper at CCGrid 2026 in Sydney, Australia.",
      },
      {
        date: "Jul. 2025",
        title: "Best Paper Award",
        sub: "KIISE Korea Computer Congress 2025 (KCC 2025)",
        note: "Received as first author for \"Callisto: Cost-Efficient AI Development Platform Using Spot Instances\" at KIISE KCC 2025.",
      },
      {
        date: "May 2024",
        title: "AWS Summit Seoul 2024 GameDay — Generative AI, 2nd Place (Round 2)",
        sub: "AWS Korea",
        href: "https://aws.amazon.com/ko/blogs/korea/aws-summit-seoul-2024-genai-gameday-winners/",
        note: "Team-based AWS competition building and operating generative AI services under live challenge scenarios; placed 2nd in Round 2 as team KMU_DDPSLAB.",
      },
      {
        date: "Dec. 2023",
        title: "AWS Rookie Championship 2023 — AWS JAM, 1st Place",
        sub: "AWS Korea",
        note: "1st place in AWS JAM, a timed hands-on challenge solving real-world AWS architecture, DevOps, and operations tasks.",
      },
      {
        date: "Oct. 2022",
        title: "Excellence Award (3rd Place), 4th ROKAF Creative & Innovative Idea Hackathon",
        sub: "Republic of Korea Air Force · IBK Industrial Bank of Korea",
        href: "https://rokaf.airforce.mil.kr/hackathon/698/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGaGFja2F0aG9uJTJGODklMkYzMzk3OSUyRmFydGNsVmlldy5kbyUzRmJic0NsU2VxJTNEJTI2aXNWaWV3TWluZSUzRGZhbHNlJTI2cGFnZSUzRDElMjZyZ3NFbmRkZVN0ciUzRCUyNmJic09wZW5XcmRTZXElM0QlMjZyZ3NCZ25kZVN0ciUzRCUyNnNyY2hXcmQlM0QlMjZwYXNzd29yZCUzRCUyNnNyY2hDb2x1bW4lM0QlMjY%3D",
        note: "Team OneShot-OneKill — missile defense operations analysis platform using AI and big-data technologies.",
      },
      {
        date: "Aug. 2020",
        title: "Industrial Service Medal (산업포장)",
        sub: "Republic of Korea",
        note: "State decoration of the Republic of Korea, conferred for the 4th-place finish in Cloud Computing at WorldSkills Kazan 2019.",
      },
      {
        date: "Aug. 2019",
        title: "Medallion for Excellence, Cloud Computing (4th Place)",
        sub: "WorldSkills Kazan 2019",
        note: "Represented South Korea in the Cloud Computing skill at the 45th WorldSkills Competition — widely known as the Skills Olympics — in Kazan, Russia, finishing 4th among national champions.",
      },
      {
        date: "Oct. 2018",
        title: "Silver Medal, IT Network System Administration",
        sub: "53rd WorldSkills Korea National Competition",
        note: "2nd place nationwide in IT Network Systems Administration at Korea's national selection for WorldSkills.",
      },
    ],
  },
]
