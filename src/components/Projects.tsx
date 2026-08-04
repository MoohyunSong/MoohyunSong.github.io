import { useState } from "react"

import { Button } from "@/components/ui/button"
import { PROJECTS, type Project } from "@/data/site"

function FigurePlaceholder() {
  return (
    <div className="flex h-[124px] w-full max-w-[200px] items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-black/25 bg-[#f2f1ef] text-[13px] text-[#6e6c66] dark:border-white/20 dark:bg-secondary dark:text-muted-foreground">
      Figure
    </div>
  )
}

function Figure({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-[124px] w-full max-w-[200px] items-center justify-center overflow-hidden rounded-[10px] border border-border bg-white p-1.5">
      <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
    </div>
  )
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-[200px_1fr] sm:gap-7">
      {project.image ? (
        <Figure src={project.image} alt={project.imageAlt ?? project.title} />
      ) : (
        <FigurePlaceholder />
      )}
      <div className="flex flex-col gap-2">
        <div className="text-[17px] font-bold tracking-[-0.01em]">{project.title}</div>
        <div className="text-[13px] font-semibold text-primary">{project.venue}</div>
        <div className="text-sm text-subtle [text-wrap:pretty]">{project.desc}</div>
        <div className="mt-0.5 flex flex-wrap gap-2.5">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href !== "#" && { target: "_blank", rel: "noopener noreferrer" })}
              className="rounded-md border border-primary-border px-2.5 py-[3px] text-[11px] font-semibold tracking-[0.04em] text-primary transition-colors hover:bg-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, 4)

  return (
    <section id="projects" className="scroll-mt-[84px] border-b border-border py-[72px]">
      <h2 className="mb-10 text-[26px] font-bold tracking-[-0.015em]">Projects</h2>
      <div className="flex flex-col gap-10">
        {visible.map((project) => (
          <ProjectItem key={project.title} project={project} />
        ))}
      </div>
      {PROJECTS.length > 4 && (
        <div className="mt-10 flex justify-center">
          {showAll ? (
            <Button
              variant="outline"
              onClick={() => setShowAll(false)}
              className="h-auto rounded-full border-border bg-transparent px-[22px] py-[9px] text-[13.5px] font-semibold text-muted-foreground hover:border-primary-border hover:bg-transparent hover:text-primary"
            >
              Show less ↑
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              className="h-auto rounded-full border-primary-border bg-transparent px-[22px] py-[9px] text-[13.5px] font-semibold text-primary hover:bg-accent hover:text-primary"
            >
              Learn more ↓
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
