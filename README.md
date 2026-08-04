# MoohyunSong.github.io

Personal research site of Moohyun Song — live at [mhsong.cc](https://mhsong.cc).

Built with React 19, Vite, Tailwind CSS v4, and shadcn/ui. Design based on
[ty-kim7.github.io](https://github.com/ty-kim7/ty-kim7.github.io).

## Development

```bash
npm install
npm run dev        # dev server with HMR
npm run build      # type-check + production build into dist/
npm run lint       # oxlint
npm run check:pubs # sanity-check the papers.bib -> publications pipeline
```

Requires Node 22+.

## Content

- `src/data/papers.bib` — every publication (BibTeX; parsed at runtime, drives the
  Publications section, the counts header, and the CV publication list)
- `src/data/site.ts` — everything else: contacts, projects, CV sections
- `src/components/` — page sections (About, Publications, Projects, Vitae)

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci` → `npm run build` →
GitHub Pages artifact deploy of `dist/`. The custom domain `mhsong.cc` is configured in
the repository's Pages settings.
