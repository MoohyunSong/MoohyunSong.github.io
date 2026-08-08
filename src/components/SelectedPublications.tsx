import { PublicationItem } from "@/components/Publications"
import { SELECTED_PUBLICATIONS } from "@/data/publications"

export function SelectedPublications() {
  if (SELECTED_PUBLICATIONS.length === 0) return null
  return (
    <section
      id="selected-publications"
      className="scroll-mt-[84px] border-b border-border py-[72px]"
    >
      <h2 className="mb-6 text-[26px] font-bold tracking-[-0.015em]">
        Selected Publications
      </h2>
      <div className="flex flex-col border-t border-border pt-1.5">
        {SELECTED_PUBLICATIONS.map((pub) => (
          <PublicationItem key={pub.key} pub={pub} />
        ))}
      </div>
    </section>
  )
}
