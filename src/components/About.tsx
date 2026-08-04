import { CONTACTS } from "@/data/site"

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function OrcidIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
  )
}

function ScholarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  )
}

const contactLinkClass =
  "flex items-center gap-2 text-sm font-semibold text-body transition-colors hover:text-primary"

const inlineLinkClass = "font-semibold text-primary hover:underline"

export function About() {
  return (
    <section id="about" className="scroll-mt-[84px] border-b border-border pt-[72px] pb-16">
      <h1 className="mb-3 text-[36px] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[52px]">
        Moohyun Song{" "}
        <span className="text-[21px] font-semibold tracking-normal text-muted-foreground">
          송무현
        </span>
      </h1>
      <div className="mb-[30px] text-sm font-semibold text-primary">
        Ph.D. Student · Artificial Intelligence · Hanyang University
      </div>
      <div className="text-body [text-wrap:pretty]">
        <p className="mb-4">
          I am a Ph.D. student in Artificial Intelligence at{" "}
          <a
            href="https://www.hanyang.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClass}
          >
            Hanyang University
          </a>
          , where I am a member of the{" "}
          <a
            href="https://ddps.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClass}
          >
            Distributed Data Processing Systems Lab (DDPS Lab)
          </a>
          . I received my B.S.E. in Computer Science from{" "}
          <a
            href="https://www.kookmin.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkClass}
          >
            Kookmin University
          </a>
          .
        </p>
        <p>
          My research interests include{" "}
          <strong className="font-semibold text-foreground">Distributed Systems</strong>,{" "}
          <strong className="font-semibold text-foreground">Cloud Computing</strong>, and{" "}
          <strong className="font-semibold text-foreground">AI Platform</strong>.
        </p>
      </div>
      <div className="mt-9 flex flex-wrap gap-[22px]">
        <a href={`mailto:${CONTACTS.email}`} className={contactLinkClass}>
          <MailIcon />
          {CONTACTS.email}
        </a>
        <a
          href={CONTACTS.orcid}
          target="_blank"
          rel="noopener noreferrer"
          className={contactLinkClass}
        >
          <OrcidIcon />
          ORCID
        </a>
        <a
          href={CONTACTS.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className={contactLinkClass}
        >
          <ScholarIcon />
          Google Scholar
        </a>
        <a
          href={CONTACTS.github}
          target="_blank"
          rel="noopener noreferrer"
          className={contactLinkClass}
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          href={CONTACTS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={contactLinkClass}
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      </div>
    </section>
  )
}
