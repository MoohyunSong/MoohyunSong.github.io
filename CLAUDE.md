# CLAUDE.md

Personal academic website built on [al-folio](https://github.com/alshedivat/al-folio) (Jekyll + jekyll-scholar). Hosted at MoohyunSong.github.io.

## Local development

```bash
bundle install            # first time only
bundle exec jekyll serve  # dev server at http://localhost:4000, live reload
bundle exec jekyll build  # one-off build into _site/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `JEKYLL_ENV=production`, purges unused CSS, and publishes `_site/` to GitHub Pages.

Caveat: the workflow only triggers on changes to `assets/**`, `**.bib`, `**.html`, `**.js`, `**.liquid`, `**/*.md`, `**.yml`, and `Gemfile*`. It does NOT list `**.rb`, so editing only a file under `_plugins/` won't trigger a deploy on its own — pair it with a triggering change, or run the workflow manually (Actions → Deploy site → Run workflow).

## Adding a publication

Add a BibTeX entry to `_bibliography/papers.bib`. Nothing else needs editing — the section it lands in and the header count are both derived from the entry.

- Type: `@inproceedings` for conferences, `@article` for journals.
- Citation key convention: `{lastname}{year}{shortname}`, e.g. `song2026mcptool`.
- `keywords={international}` or `keywords={domestic}` is REQUIRED — it decides both the section on the publications page and whether the entry is counted. The section is (type × scope): e.g. `@inproceedings` + `international` → "International Conference".
- `bibtex_show={true}` shows the BibTeX button.
- Equal contribution: append `*` to each equal author's last name (`Song*, Moohyun`) and add `annotation={* Equal contribution}`.
- Homepage "selected papers": add `selected={true}`.
- Common fields: `title`, `author`, `year`, `booktitle` (or `journal`), `publisher`, `pages`, `doi`, `url`, `abstract`, `html` (external link), `series`, `isbn`, `note`.

Example:

```bibtex
@inproceedings{song2026example,
  author={Song, Moohyun and Lee, Kyungyong},
  title={A Great Paper Title},
  booktitle={Proceedings of Some Conference},
  year={2026},
  keywords={international},
  bibtex_show={true}
}
```

## Publication counts (automatic)

The "**N publications** (...)" line in `_pages/publications.md` is generated, not hand-written. Do not edit the numbers manually.

`_plugins/publication-counts.rb` parses `papers.bib` at build time and exposes `site.pub_counts`:

- `site.pub_counts.total` — total count
- `site.pub_counts.summary` — breakdown string (e.g. "4 international conferences, 1 domestic journal, 5 domestic conferences"), pluralized, omitting empty buckets
- per-bucket: `international_journal`, `international_conference`, `domestic_journal`, `domestic_conference`

It counts only `@article` / `@inproceedings` entries tagged `international` / `domestic`, so the header always matches what the page actually renders. Logic can be sanity-checked without a full build via a plain-Ruby harness that stubs `Jekyll::Generator` and calls `generate` on a fake site.

## Key files

- `_pages/about.md` — landing page: intro, affiliations (incl. DDPS Lab link `https://ddps.cloud`), profile sidebar.
- `_pages/publications.md` — publications list: auto count header + sections queried by keyword.
- `_bibliography/papers.bib` — every publication.
- `_data/cv.yml` — CV / resume content.
- `_config.yml` — site + jekyll-scholar config (`scholar.source`, `scholar.bibliography`).
- `_plugins/` — custom Ruby plugins (publication counts, scholar citation badges, etc.).
