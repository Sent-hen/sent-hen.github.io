# senthen-site

Personal site for Senthen Velmurugan, built with Jekyll for GitHub Pages.
Design: modeled on stephango.com — Flexoki palette, single narrow sans-serif column, muted nav, light/dark toggle (defaults to `prefers-color-scheme`, remembered in localStorage).

## Structure

- `index.md`, `about.md`, `projects.md`, `experience.md`, `notes.md` — the five pages in the nav
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

## Things to fill in before publishing

- `about.md` — real bio, interests
- `projects.md` — swap the two placeholder entries for your actual projects
- `experience.md` — add real work entries (or drop the Work section)
- `_notes/*.md` — replace the two sample notes with your own, or delete them
- Footer/about links in `_includes/footer.html` and `about.md` — point at your real GitHub/LinkedIn/email
- `_config.yml` — `url` and `baseurl`
