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
export const CV_PUBLICATIONS_SECTION = toCvSection(entries, PUBLICATIONS)
