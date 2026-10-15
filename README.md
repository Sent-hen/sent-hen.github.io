# senthen-site

Personal site for Senthen Velmurugan, built with Jekyll for GitHub Pages.
Design: modeled on stephango.com — Flexoki palette, single narrow sans-serif column, muted nav, light/dark toggle (defaults to `prefers-color-scheme`, remembered in localStorage).

## Structure

- `index.md`, `about.md`, `projects.html`, `experience.md`, `notes.md` — the five pages in the nav
- `_data/projects.yml` — every project on the Projects page (summary, six STAR/XYZ bullets, tags); `_data/tag_popularity.yml` breaks ties when ranking tags
- `_projects/` — writeup pages for completed projects, one file per project (`project:` must match a slug in `_data/projects.yml`)
- `_notes/` — collection backing the Notes page; each file is one short note (add more the same way)
- `_layouts/`, `_includes/` — page shell, nav, footer
- `assets/css/style.scss` — all styling, theme colors in `:root` at the top
- `assets/img/icon.jpg` — your uploaded icon, used as favicon and in the header

## Run locally

```bash
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000`.

## Deploy to GitHub Pages

1. Push this folder to a new GitHub repo (e.g. `sent-hen.github.io` for a user site, or any repo name for a project site).
2. In the repo's Settings → Pages, set the source to the `main` branch (root).
3. If this is a **project** site (repo name isn't `<username>.github.io`), set `baseurl: "/your-repo-name"` in `_config.yml`.
4. Update `url:` in `_config.yml` to your actual GitHub Pages URL.
5. Push — GitHub Pages builds Jekyll sites automatically, no Actions config needed.

## Adding a project

1. Add an entry at the top of `_data/projects.yml`.
2. If it's complete, set `writeup: true` and add `_projects/<slug>.md` with `project: <slug>` in the front matter.

`_site/` is build output and is git-ignored; GitHub Pages builds the site itself.

## Still to fill in

- LinkedIn URL in `_includes/footer.html` and `about.md`
- The placeholder line in `about.md` about what pulled you toward systems thinking
- `_notes/*.md` — replace the two sample notes with your own, or delete them
