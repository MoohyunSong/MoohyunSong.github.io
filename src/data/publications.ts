import bibSource from "./papers.bib?raw"
import {
  countPublications,
  groupSections,
  parseBibtex,
  toCvSection,
  toPublications,
} from "./bib"

export type { PubCounts, Publication, PubSection, YearGroup } from "./bib"

const entries = parseBibtex(bibSource)

export const PUBLICATIONS = toPublications(entries)
export const PUB_COUNTS = countPublications(PUBLICATIONS)
export const PUB_SECTIONS = groupSections(PUBLICATIONS)

/** Called from site.ts with `ME` (avoids a circular import of site.ts here). */
export function makeCvPublicationsSection(owner: string) {
  return toCvSection(entries, PUBLICATIONS, owner)
}
