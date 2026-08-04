// Sanity checks for the papers.bib -> publications pipeline.
// Run with `npm run check:pubs` (Node's native TypeScript type-stripping; no deps).
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

import {
  countPublications,
  groupSections,
  parseBibtex,
  toCvSection,
  toPublications,
} from "../src/data/bib.ts"

const src = readFileSync(new URL("../src/data/papers.bib", import.meta.url), "utf8")
const entries = parseBibtex(src)
const pubs = toPublications(entries)
const counts = countPublications(pubs)
const sections = groupSections(pubs)
const cv = toCvSection(entries, pubs, "Moohyun Song")

const byKey = (key: string) => {
  const pub = pubs.find((p) => p.key === key)
  assert.ok(pub, `missing publication ${key}`)
  return pub
}

const excluded = entries.filter((e) => !pubs.some((p) => p.key === e.key))
for (const e of excluded) {
  console.warn(`WARNING: entry "${e.key}" excluded (type/keywords/year not recognized)`)
}

assert.equal(entries.length, pubs.length, "every bib entry should become a publication")

// Counts derived from the current file; preprints are visible but not counted.
const published = pubs.filter((p) => p.scope !== "preprint")
assert.equal(counts.total, published.length)
assert.equal(counts.preprints, pubs.length - published.length)
assert.equal(
  counts.summary,
  [
    counts.internationalJournal && `${counts.internationalJournal} international journal${counts.internationalJournal === 1 ? "" : "s"}`,
    counts.internationalConference && `${counts.internationalConference} international conference${counts.internationalConference === 1 ? "" : "s"}`,
    counts.domesticJournal && `${counts.domesticJournal} domestic journal${counts.domesticJournal === 1 ? "" : "s"}`,
    counts.domesticConference && `${counts.domesticConference} domestic conference${counts.domesticConference === 1 ? "" : "s"}`,
  ]
    .filter(Boolean)
    .join(", "),
)

// Equal-contribution stars move to the end of "First Last" names.
const hybridserve = byKey("kang2025hybridserve")
assert.equal(hybridserve.authors[0], "Seokhyeon Kang*")
assert.equal(hybridserve.authors[1], "Moohyun Song*")
assert.equal(hybridserve.link, "https://doi.org/10.1145/3774899.3775011")

// Song is NOT starred here even though co-authors are.
const multinode = byKey("cheon2025multinode")
assert.equal(multinode.authors[0], "Sungkyu Cheon*")
assert.ok(multinode.authors.includes("Moohyun Song"))

// Entries without html/url/doi get no link; note carries "To appear".
const ddd = byKey("kim2026ddd")
assert.equal(ddd.link, undefined)
assert.equal(ddd.note, "To appear")
// Series must not double an existing "(CLOUD)" abbreviation in the venue.
assert.ok(!ddd.venue.includes("(CLOUD) ("), `unexpected venue: ${ddd.venue}`)
assert.equal(
  byKey("song2026edgeagent").link,
  "https://ieeexplore.ieee.org/document/11619021",
)

// The only journal entry lands in the Domestic Journal section.
const kubevc = byKey("song2023kubevc")
assert.equal(kubevc.kind, "journal")
assert.equal(kubevc.venue, "IEMEK Journal of Embedded Systems and Applications")

// Custom award field surfaces on the badge.
assert.equal(byKey("song2025callisto").award, "Best Paper Award")

// Conference venues drop the "Proceedings of the" prefix.
assert.equal(byKey("song2025callisto").venue, "Korea Computer Congress (KCC)")
assert.ok(byKey("song2026edgeagent").venue.startsWith("26th IEEE/ACM"))
assert.equal(byKey("hwang2023spot").venue, "Korea Software Congress (KSC)")

// Within a year the bib file order is the display order (newest first);
// 2023 chronology per the author: Open-Source -> WoSC -> KSC poster -> KubEVC.
assert.deepEqual(
  pubs.filter((p) => p.year === "2023").map((p) => p.key),
  ["song2023kubevc", "hwang2023spot", "song2023serverless", "song2023kubernetes"],
)

// Oral/Full Paper is the default: entries without a category field get no badges;
// `category={Poster}` / `category={Short Paper}` mark the exceptions.
assert.equal(byKey("song2026edgeagent").categories, undefined)
assert.deepEqual(byKey("cheon2025multinode").categories, ["Poster"])
assert.deepEqual(byKey("hwang2023spot").categories, ["Poster"])

// Preprints: keywords={preprint} + arxiv={...} -> Under Review section, arXiv link.
const shuntserve = byKey("jeong2026shuntserve")
assert.equal(shuntserve.venue, "arXiv preprint arXiv:2606.18600")
assert.equal(shuntserve.link, "https://arxiv.org/abs/2606.18600")
assert.equal(shuntserve.note, "Under review")
assert.equal(sections[0].heading, "Under Review")
assert.equal(sections[0].years.flatMap((y) => y.items).length, 2)

// Section grouping: no empty sections, year-descending inside each.
for (const section of sections) {
  assert.ok(section.years.length > 0)
  const years = section.years.map((yg) => Number(yg.year))
  assert.deepEqual(years, [...years].sort((a, b) => b - a), section.heading)
}

// CV citation formatting: initials, Oxford comma, compact venue.
const cvOf = (key: string) => {
  const pub = byKey(key)
  const item = cv.items.find((i) => i.title === pub.title)
  assert.ok(item, `missing CV item for ${key}`)
  return item
}
assert.equal(
  cvOf("kang2025hybridserve").sub,
  "S. Kang*, M. Song*, T. Kim*, S. Lee, J. Han, H. Kim, and K. Lee · WoSC11 '25, pp. 1–6",
)
// Owner name is attached as the emphasis target; Song is unstarred where applicable.
assert.equal(cvOf("kang2025hybridserve").highlight, "M. Song")
assert.ok(cvOf("cheon2025multinode").sub.includes("M. Song,"))
assert.ok(cvOf("song2023kubevc").sub.endsWith("vol. 18, no. 6, pp. 293–301"))
assert.ok(cvOf("kim2026ddd").sub.endsWith("IEEE CLOUD 2026 (To appear)"))
assert.ok(cvOf("song2026edgeagent").sub.includes("J. G. Son"))
assert.ok(cvOf("song2025callisto").sub.endsWith("KCC '25, pp. 617–619"))
assert.ok(cvOf("song2025costnorm").sub.includes("Annual Conference of KIPS"))
assert.ok(cvOf("hwang2023spot").sub.endsWith("(Poster)"))
assert.ok(
  cvOf("kim2026spotvista").sub.endsWith("arXiv preprint arXiv:2604.24548 (Under review)"),
)

console.log(
  `OK: ${counts.total} publications (${counts.summary}) + ${counts.preprints} under review`,
)
console.log(`Sections: ${sections.map((s) => `${s.heading} [${s.years.flatMap((y) => y.items).length}]`).join(", ")}`)
