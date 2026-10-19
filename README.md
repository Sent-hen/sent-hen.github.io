# sent-hen.github.io

My personal site, built with Jekyll and hosted on GitHub Pages.

The design borrows from stephango.com: the Flexoki palette, one narrow sans-serif column, a quiet nav and a light/dark toggle. The toggle follows `prefers-color-scheme` until you pick one, then remembers your choice in localStorage.

## Structure

- `index.md`, `projects.html`, `experience.md`: the home page and the two pages in the nav
- `_data/projects.yml`: every project on the Projects page (summary, bullets, tags). `_data/tag_popularity.yml` breaks ties when tags are sorted
- `_projects/`: one write-up page per finished project. The `project:` field has to match a slug in `_data/projects.yml`
- `_layouts/`, `_includes/`: page shell, nav and footer
- `assets/css/style.scss`: all the styling. Theme colors are in `:root` at the top
- `assets/img/icon.jpg`: favicon and header icon

## Run locally

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

GitHub Pages builds the site from `main` on every push, so there's no Actions workflow. `_site/` is local build output and is git-ignored.

## Adding a project

1. Add an entry at the top of `_data/projects.yml`.
2. If it's finished, set `writeup: true` and add `_projects/<slug>.md` with `project: <slug>` in the front matter.

## To do

- LinkedIn URL in `_includes/footer.html` and `about.md`
- The placeholder line in `about.md` about how I got into systems thinking
