import { Fragment } from "react"

import { CV_SECTIONS } from "@/data/site"
import { withSupDaggers } from "@/lib/daggers"

/** Renders `text` with every occurrence of `highlight` emphasized. */
function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  const parts = text.split(highlight)
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <strong className="font-bold text-foreground">{highlight}</strong>}
          {withSupDaggers(part)}
        </Fragment>
      ))}
    </>
  )
}

export function Vitae() {
  return (
    <section id="cv" className="scroll-mt-[84px] pt-[72px] pb-24">
      <div className="mb-10 flex items-baseline justify-between gap-5">
        <h2 className="text-[26px] font-bold tracking-[-0.015em]">CV</h2>
      </div>

      {CV_SECTIONS.map((sec) => (
        <div
          key={sec.heading}
          className="grid grid-cols-1 gap-x-6 gap-y-4 border-t border-border py-7 sm:grid-cols-[200px_1fr]"
        >
          <h3 className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            {sec.heading}
          </h3>
          <div className="flex flex-col gap-5">
            {sec.items.map((item) => (
              <div key={item.title + item.date} className="flex flex-col gap-0.5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[15px] font-bold">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-primary"
                      >
                        {item.title} ↗
                      </a>
                    ) : (
                      item.title
                    )}
                  </span>
                  <span className="text-[11.5px] font-medium whitespace-nowrap text-muted-foreground">
                    {item.date}
                  </span>
                </div>
                <div className="text-[13.5px] text-subtle">
                  {item.highlight ? (
                    <HighlightedText text={item.sub} highlight={item.highlight} />
                  ) : (
                    item.sub
                  )}
                </div>
                {item.note && (
                  <div className="mt-[3px] text-sm text-body [text-wrap:pretty]">
                    {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
