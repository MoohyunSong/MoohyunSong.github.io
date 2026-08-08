# CLAUDE.md

Personal academic website of Moohyun Song. React 19 + Vite + Tailwind CSS v4 + shadcn/ui
single-page app (sections: About / Publications / Projects / CV). Live at
https://mhsong.cc (repo `MoohyunSong.github.io`). Rewritten in Aug 2026 from the previous
Jekyll/al-folio site; design based on ty-kim7.github.io.

## Local development

Node 22+ (CI uses 22).

```bash
npm install        # first time only
npm run dev        # dev server with HMR at http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run lint       # oxlint
npm run preview    # serve the production build locally
npm run check:pubs # sanity-check the papers.bib parsing pipeline
```

## Adding a publication

Add a BibTeX entry to `src/data/papers.bib`. Nothing else needs editing — the section it
lands in, the counts header, and the CV publication list are all derived at runtime
(`src/data/bib.ts` parses the file via a Vite `?raw` import; the dev server hot-reloads
on save).

- Type: `@inproceedings` for conferences, `@article` for journals, `@misc` +
  `keywords={preprint}` + `arxiv={2606.18600}` for preprints (rendered in a "Preprint"
  section first, linked to arXiv, and NOT counted in the publications total nor listed
  in the CV publication list; move to `@inproceedings`/`@article` on acceptance).
- Citation key convention: `{lastname}{year}{shortname}`, e.g. `song2026mcptool`.
- `keywords={international}` or `keywords={domestic}` is REQUIRED — it decides the
  section (type × scope, e.g. `@inproceedings` + `international` → "International
  Conference") and the counts header. Entries missing it are silently dropped
  (`npm run check:pubs` warns).
- Equal contribution: append `*` to each equal author's LAST name in the bib
  (`Song*, Moohyun`); it renders as a trailing `*` on the displayed name.
- Award badge: add `award={Best Paper Award}` to show a ★ badge on the entry.
- Selected publications: `selected={1}` (rank; lower shows first) puts a copy of the
  entry in the standalone "Selected Publications" section rendered above the
  Publications section, without year grouping; the entry still appears in its regular
  section.
- Paper/presentation type: Oral + Full Paper is the assumed default and gets NO badge.
  Mark only the exceptions with `category={Poster}` or `category={Short Paper}`
  (comma-separate if both apply). Each value renders as a gray badge and the set is
  appended to the CV citation line, e.g. "(Poster)".
- Link buttons: PAPER resolves `html` > `url` > `doi` (none → no PAPER button); an
  `arxiv` field adds an independent ARXIV button. An accepted paper with both a
  publisher link and an arXiv id shows both buttons side by side.
- `note={To appear}` renders as an italic note next to the venue and in the CV line.
- Venue display: `booktitle` (minus any "Proceedings of the" prefix), plus ` ({series})`
  appended unless the booktitle already ends with a parenthesized abbreviation. CV
  citation uses the compact form (`{series}` / `{ABBR} '{yy}` / full booktitle;
  journals get vol/no/pp).

After adding an entry, run `npm run check:pubs` (parser sanity assertions) and eyeball
the Publications section in `npm run dev`.

## Content locations

- `src/data/papers.bib` — every publication (single source of truth).
- `src/data/bib.ts` — BibTeX parser + derivations (pure TS, no Vite/React imports so the
  check script can run it under plain Node).
- `src/data/publications.ts` — glue: parses the bib once, exports `PUBLICATIONS`,
  `PUB_SECTIONS`, `PUB_COUNTS`, `CV_PUBLICATIONS_SECTION`.
- `src/data/site.ts` — everything else: `ME`, nav, contacts (email/ORCID/Scholar/
  GitHub/LinkedIn), projects, CV sections. The CV's Publications section is spliced in
  from `publications.ts` — never hand-edit publication data here.
- `src/components/` — About (bio/hero; prose lives in JSX), Publications, Projects,
  Vitae, Header, Footer. `src/components/ui/` — vendored shadcn primitives.
- `public/projects/` — optional project figures; set `image: "/projects/foo.png"` on a
  `PROJECTS` entry in `site.ts` (entries without an image get a dashed placeholder).
- No profile photo and no CV PDF by design (the Vitae download button was removed; if a
  PDF is added later, put it in `public/cv/` and restore the button in `Vitae.tsx`).

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`: Node 22 → `npm ci` →
`npm run build` → upload `dist/` as a Pages artifact → `actions/deploy-pages`. There are
NO path filters — every push builds and deploys (the old Jekyll workflow's path-filter
footgun is gone).

- Custom domain `mhsong.cc` is a repository **Pages setting** (Settings → Pages), not
  driven by `public/CNAME` (that file is informational under artifact deploys).
- Migration note (Aug 2026): Pages source was manually switched from "Deploy from a
  branch (gh-pages)" to "GitHub Actions". The legacy `gh-pages` branch is the old Jekyll
  site; rollback = flip the Pages source setting back to it. Once confident, it can be
  deleted (`git push origin --delete gh-pages`).
- If `npm ci` fails in CI after editing `package.json`, re-run `npm install` locally and
  commit the lockfile.
