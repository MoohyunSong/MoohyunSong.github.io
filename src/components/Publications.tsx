import { Badge } from "@/components/ui/badge"
import { PUB_COUNTS, PUB_SECTIONS, type Publication } from "@/data/publications"
import { ME } from "@/data/site"

function AuthorList({ authors }: { authors: string[] }) {
  return (
    <div className="text-[13.5px] text-subtle">
      {authors.map((name, i) => {
        const isMe = name.replace("*", "") === ME
        return (
          <span key={name} className={isMe ? "font-bold text-foreground" : undefined}>
            {name}
            {i < authors.length - 1 ? ", " : ""}
          </span>
        )
      })}
    </div>
  )
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-md border border-primary-border px-2.5 py-[3px] text-[11px] font-semibold tracking-[0.04em] text-primary transition-colors hover:bg-accent"
    >
      {label} ↗
    </a>
  )
}

function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <div className="flex flex-col gap-[5px] py-4">
      <div className="text-[16.5px] leading-[1.4] font-bold [text-wrap:pretty]">
        {pub.title}
      </div>
      <AuthorList authors={pub.authors} />
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
        <span className="text-[13.5px] font-semibold text-primary">{pub.venue}</span>
        {pub.note && (
          <span className="text-[11.5px] italic text-muted-foreground">{pub.note}</span>
        )}
        {pub.categories?.map((category) => (
          <Badge
            key={category}
            className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-subtle"
          >
            {category}
          </Badge>
        ))}
        {pub.award && (
          <Badge className="rounded bg-award-bg px-2 py-0.5 text-[11px] font-medium text-award">
            ★ {pub.award}
          </Badge>
        )}
        {pub.link && <LinkButton href={pub.link} label="PAPER" />}
        {pub.arxivLink && <LinkButton href={pub.arxivLink} label="ARXIV" />}
      </div>
    </div>
  )
}

export function Publications() {
  return (
    <section id="publications" className="scroll-mt-[84px] border-b border-border py-[72px]">
      <h2 className="mb-2 text-[26px] font-bold tracking-[-0.015em]">Publications</h2>
      <p className="mb-1 text-[13.5px] text-subtle">
        <strong className="font-semibold text-foreground">
          {PUB_COUNTS.total} publication{PUB_COUNTS.total === 1 ? "" : "s"}
        </strong>
        {PUB_COUNTS.summary && <> ({PUB_COUNTS.summary})</>}
      </p>
      <p className="mb-9 text-xs font-medium text-muted-foreground">* equal contribution</p>

      {PUB_SECTIONS.map((section) => (
        <div key={section.heading} className="mb-10 last:mb-0">
          <h3 className="mb-2 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            {section.heading}
          </h3>
          <div className="flex flex-col gap-3">
            {section.years.map((yg) => (
              <div
                key={yg.year}
                className="grid grid-cols-1 gap-x-6 border-t border-border pt-2.5 pb-1.5 sm:grid-cols-[96px_1fr]"
              >
                <div className="pt-3 text-[22px] font-extrabold tracking-[-0.02em]">
                  {yg.year}
                </div>
                <div className="flex flex-col">
                  {yg.items.map((pub) => (
                    <PublicationItem key={pub.key} pub={pub} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
