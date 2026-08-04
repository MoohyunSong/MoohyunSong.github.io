// BibTeX parsing and derivation for the publications data.
//
// Pure TypeScript on purpose: no Vite or React imports, so `scripts/check-pubs.ts`
// can run this file directly under Node.
//
// The parser supports the subset of BibTeX this site uses:
// `@type{key, field={value}, ...}` with nested braces, multi-line values, and
// bare (unbraced) values. It does NOT handle @string/@preamble/@comment,
// "quoted" values, `#` concatenation, or LaTeX escapes.

export interface BibEntry {
  /** Entry type, lowercased, e.g. "inproceedings" | "article". */
  type: string
  /** Citation key, e.g. "song2025callisto". */
  key: string
  /** Field name (lowercased) -> value (outer braces stripped, whitespace collapsed). */
  fields: Record<string, string>
  /** Exact source slice of the entry, for BibTeX display. */
  raw: string
}

export type Scope = "international" | "domestic"
export type Kind = "conference" | "journal"

export interface Publication {
  key: string
  year: string
  title: string
  /** "First Last" names; a trailing `*` marks equal contribution. */
  authors: string[]
  venue: string
  note?: string
  award?: string
  /** From the custom `category` bib field, comma-separated: "Full Paper", "Short Paper", "Oral", "Poster", ... */
  categories?: string[]
  link?: string
  scope: Scope
  kind: Kind
  bibtex: string
}

export interface PubCounts {
  internationalJournal: number
  internationalConference: number
  domesticJournal: number
  domesticConference: number
  total: number
  /** e.g. "5 international conferences, 1 domestic journal, 5 domestic conferences" */
  summary: string
}

export interface YearGroup {
  year: string
  items: Publication[]
}

export interface PubSection {
  heading: string
  scope: Scope
  kind: Kind
  years: YearGroup[]
}

export interface CvPubItem {
  date: string
  title: string
  sub: string
  note?: string
  /** Substring of `sub` to visually emphasize (the site owner's abbreviated name). */
  highlight?: string
}

export interface CvPubSection {
  heading: string
  items: CvPubItem[]
}

export function parseBibtex(src: string): BibEntry[] {
  const entries: BibEntry[] = []
  let i = 0
  for (;;) {
    const at = src.indexOf("@", i)
    if (at === -1) break
    const head = /^@\s*([A-Za-z]+)\s*\{/.exec(src.slice(at))
    if (!head) {
      i = at + 1
      continue
    }
    const type = head[1].toLowerCase()
    let j = at + head[0].length
    const comma = src.indexOf(",", j)
    if (comma === -1) break
    const key = src.slice(j, comma).trim()
    j = comma + 1

    const fields: Record<string, string> = {}
    while (j < src.length) {
      while (j < src.length && /[\s,]/.test(src[j])) j++
      if (j >= src.length) break
      if (src[j] === "}") {
        j++
        break
      }
      const nameMatch = /^[A-Za-z_][\w-]*/.exec(src.slice(j))
      if (!nameMatch) {
        j++
        continue
      }
      const name = nameMatch[0].toLowerCase()
      j += nameMatch[0].length
      while (j < src.length && /\s/.test(src[j])) j++
      if (src[j] !== "=") continue
      j++
      while (j < src.length && /\s/.test(src[j])) j++
      let value: string
      if (src[j] === "{") {
        let depth = 1
        j++
        const start = j
        while (j < src.length && depth > 0) {
          if (src[j] === "{") depth++
          else if (src[j] === "}") depth--
          j++
        }
        value = src.slice(start, j - 1)
      } else {
        let k = j
        while (k < src.length && src[k] !== "," && src[k] !== "}") k++
        value = src.slice(j, k)
        j = k
      }
      fields[name] = value.trim().replace(/\s+/g, " ")
    }
    entries.push({ type, key, fields, raw: src.slice(at, j) })
    i = j
  }
  return entries
}

const EQUAL_MARKERS = /[*†‡§¶‖]/g
const cleanBraces = (s: string) => s.replace(/[{}]/g, "")
const displayPages = (pages: string) => pages.replace(/--/g, "–")

/** "Song, Moohyun" -> "Moohyun Song"; "Kang*, Seokhyeon" -> "Seokhyeon Kang*". */
function displayAuthor(name: string): string {
  const starred = EQUAL_MARKERS.test(name)
  EQUAL_MARKERS.lastIndex = 0
  const clean = name.replace(EQUAL_MARKERS, "").trim()
  const comma = clean.indexOf(",")
  const display =
    comma === -1
      ? clean
      : `${clean.slice(comma + 1).trim()} ${clean.slice(0, comma).trim()}`
  return starred ? `${display}*` : display
}

/** "Son, Jae Gi" -> "J. G. Son"; "Kang*, Seokhyeon" -> "S. Kang*". */
function initialsAuthor(name: string): string {
  const starred = EQUAL_MARKERS.test(name)
  EQUAL_MARKERS.lastIndex = 0
  const clean = name.replace(EQUAL_MARKERS, "").trim()
  const comma = clean.indexOf(",")
  if (comma === -1) return starred ? `${clean}*` : clean
  const last = clean.slice(0, comma).trim()
  const initials = clean
    .slice(comma + 1)
    .trim()
    .split(/\s+/)
    .map((token) => `${token[0].toUpperCase()}.`)
    .join(" ")
  return starred ? `${initials} ${last}*` : `${initials} ${last}`
}

/** "Moohyun Song" -> "M. Song", for highlighting the owner in CV citations. */
function abbreviateOwner(displayName: string): string {
  const tokens = displayName.trim().split(/\s+/)
  if (tokens.length < 2) return displayName
  const initials = tokens
    .slice(0, -1)
    .map((token) => `${token[0].toUpperCase()}.`)
    .join(" ")
  return `${initials} ${tokens[tokens.length - 1]}`
}

/** Oxford-comma author list: "A", "A and B", "A, B, and C". */
function joinAuthors(authors: string[]): string {
  if (authors.length <= 1) return authors[0] ?? ""
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`
  return `${authors.slice(0, -1).join(", ")}, and ${authors[authors.length - 1]}`
}

function splitAuthors(field: string): string[] {
  return field.split(/\s+and\s+/).map((name) => name.trim())
}

/** Display venue for the Publications section: the conference name itself. */
function displayVenue(entry: BibEntry, kind: Kind): string {
  const f = entry.fields
  if (kind === "journal") return cleanBraces(f.journal ?? "")
  let base = cleanBraces(f.booktitle ?? "").replace(/^proceedings of (the )?/i, "")
  // Append the series abbreviation unless the booktitle already ends with one,
  // e.g. "... Cloud Computing (CLOUD)" must not become "... (CLOUD) (IEEE CLOUD 2026)".
  if (f.series && !/\([^)]*\)\s*$/.test(base)) base += ` (${f.series})`
  return base
}

/** Compact venue for the CV citation line, following the old cv-publications.rb rules. */
function cvVenue(entry: BibEntry, kind: Kind): string {
  const f = entry.fields
  let venue: string
  if (kind === "journal") {
    venue = cleanBraces(f.journal ?? "")
    if (f.volume) venue += `, vol. ${f.volume}`
    if (f.number) venue += `, no. ${f.number}`
  } else {
    const book = cleanBraces(f.booktitle ?? "")
    const abbr = /\(([^)]+)\)\s*$/.exec(book)
    if (f.series) venue = `Proc. ${f.series}`
    else if (abbr) venue = `Proc. ${abbr[1]} '${(f.year ?? "").slice(-2)}`
    else venue = book
  }
  if (f.pages) venue += `, pp. ${displayPages(f.pages)}`
  if (f.note) venue += ` (${f.note})`
  return venue
}

export function toPublications(entries: BibEntry[]): Publication[] {
  const pubs: Publication[] = []
  for (const entry of entries) {
    const f = entry.fields
    const kind: Kind | undefined =
      entry.type === "article"
        ? "journal"
        : entry.type === "inproceedings" || entry.type === "conference"
          ? "conference"
          : undefined
    const keywords = (f.keywords ?? "").toLowerCase()
    const scope: Scope | undefined = keywords.includes("international")
      ? "international"
      : keywords.includes("domestic")
        ? "domestic"
        : undefined
    const year = /\d{4}/.exec(f.year ?? "")?.[0]
    if (!kind || !scope || !year) continue

    pubs.push({
      key: entry.key,
      year,
      title: cleanBraces(f.title ?? ""),
      authors: splitAuthors(f.author ?? "").map(displayAuthor),
      venue: displayVenue(entry, kind),
      note: f.note || undefined,
      award: f.award || undefined,
      categories: f.category
        ? f.category.split(",").map((c) => c.trim()).filter(Boolean)
        : undefined,
      link: f.html ?? f.url ?? (f.doi ? `https://doi.org/${f.doi}` : undefined),
      scope,
      kind,
      bibtex: entry.raw,
    })
  }
  return pubs.sort((a, b) => Number(b.year) - Number(a.year))
}

export function countPublications(pubs: Publication[]): PubCounts {
  const count = (scope: Scope, kind: Kind) =>
    pubs.filter((p) => p.scope === scope && p.kind === kind).length
  const buckets: Array<[number, string]> = [
    [count("international", "journal"), "international journal"],
    [count("international", "conference"), "international conference"],
    [count("domestic", "journal"), "domestic journal"],
    [count("domestic", "conference"), "domestic conference"],
  ]
  return {
    internationalJournal: buckets[0][0],
    internationalConference: buckets[1][0],
    domesticJournal: buckets[2][0],
    domesticConference: buckets[3][0],
    total: pubs.length,
    summary: buckets
      .filter(([n]) => n > 0)
      .map(([n, label]) => `${n} ${label}${n === 1 ? "" : "s"}`)
      .join(", "),
  }
}

function groupByYear(pubs: Publication[]): YearGroup[] {
  const years = [...new Set(pubs.map((p) => p.year))]
  return years.map((year) => ({ year, items: pubs.filter((p) => p.year === year) }))
}

export function groupSections(pubs: Publication[]): PubSection[] {
  const order: Array<[string, Scope, Kind]> = [
    ["International Journal", "international", "journal"],
    ["International Conference", "international", "conference"],
    ["Domestic Journal", "domestic", "journal"],
    ["Domestic Conference", "domestic", "conference"],
  ]
  return order
    .map(([heading, scope, kind]) => ({
      heading,
      scope,
      kind,
      years: groupByYear(pubs.filter((p) => p.scope === scope && p.kind === kind)),
    }))
    .filter((section) => section.years.length > 0)
}

/**
 * The auto-generated "Publications" section of the CV, one item per paper.
 * `owner` is the site owner's display name ("Moohyun Song"); when given, its
 * abbreviated form is attached as `highlight` for emphasis in the author list.
 */
export function toCvSection(
  entries: BibEntry[],
  pubs: Publication[],
  owner?: string,
): CvPubSection {
  const byKey = new Map(entries.map((entry) => [entry.key, entry]))
  const highlight = owner ? abbreviateOwner(owner) : undefined
  return {
    heading: "Publications",
    items: pubs.map((pub) => {
      const entry = byKey.get(pub.key)!
      const categories = pub.categories?.length ? ` (${pub.categories.join(", ")})` : ""
      return {
        date: pub.year,
        title: pub.title,
        sub: `${joinAuthors(splitAuthors(entry.fields.author ?? "").map(initialsAuthor))} · ${cvVenue(entry, pub.kind)}${categories}`,
        highlight,
      }
    }),
  }
}
