# sent-hen.github.io

My personal site, built with Jekyll and hosted on GitHub Pages.

The design borrows from stephango.com: the Flexoki palette, one narrow sans-serif column, a quiet nav and a light/dark toggle. The toggle follows `prefers-color-scheme` until you pick one, then remembers your choice in localStorage.

## Structure

The site has three sections, plus a home page:

| Page | URL | Source | Content |
|---|---|---|---|
| Home | `/` | `index.md` | Cake GIF, Camus epigraph, two lines |
| Projects | `/projects/` | `projects.html` | List and filters, from `_data/projects.yml` |
| Project writeups | `/projects/<slug>/` | `_projects/<slug>.md` | One page per finished project |
| Experience | `/experience/` | `experience.md` | Work, education, skills (written inline) |
| Interests | `/interests/` | `interests.html` | Intro, score legend, current rotation (`rotation: in`, up to 3 per category), then links to every category |
| Interest category | `/interests/<key>/` | `interests/<key>.html` | Sortable list of that category's items |
| Interest item | `/interests/<key>/<slug>/` | `_interests/<key>/<slug>.md` | Metadata, score, and the note (the file body) |

Content lives in data files, so most edits never touch HTML:

- `_data/projects.yml`: every project (summary, six bullets, domains, tags, repo link, `writeup: true` if it has a page). `_data/tag_popularity.yml` breaks ties when ranking tags in the filter bar.
- `_interests/<category>/<slug>.md`: one file per interest item. Front matter holds `title`, `creator`, `year`, `year_label` (optional: `born`, `founded`), `form`, `source`, `score` (`-1` negative emotion, `0` neutral, `1` positive), `rotation: in` (shows it on /interests/), and `order` (default sort). The body is the note; `TODO` shows as a placeholder.
- `_data/interests.yml`: category names and order, and the score labels.

Templates and styling:

- `_layouts/default.html`: page shell. `_includes/head.html`, `nav.html`, `footer.html` are its parts. The nav links are listed in `nav.html`.
- `_layouts/project.html`: project writeup page. `_layouts/interest.html`: interest category page, including the sort control.
- `assets/css/style.scss`: all styling. Flexoki colors are defined in `:root` at the top; each domain gets its own accent (`.dom-*`).
- `assets/img/`: `icon.jpg` (favicon) and `cake.gif` (home page).

## Run locally

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

GitHub Pages builds the site from `main` on every push, so there's no Actions workflow. `_site/` is local build output and is git-ignored.

## Adding things

- **Project:** add an entry at the top of `_data/projects.yml`. If it's finished, set `writeup: true` and add `_projects/<slug>.md` with `project: <slug>` in the front matter.
- **Interest item:** add `_interests/<category>/<slug>.md` with the front matter above; write the note as the body.
- **Interest category:** add it to `order` and `categories` in `_data/interests.yml`, create `interests/<key>.html` with `layout: interest` and `category: <key>`, and add a `defaults` entry for `_interests/<key>` in `_config.yml`.
- **Nav link:** edit the list in `_includes/nav.html`.

## To do

- Scores and notes in `_interests/` (currently `TODO`)
