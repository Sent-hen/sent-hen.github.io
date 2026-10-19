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
| Interests | `/interests/` | `interests.html` | Links to each category |
| Interest category | `/interests/<key>/` | `interests/<key>.html` | Sortable list, from `_data/interests.yml` |

Content lives in data files, so most edits never touch HTML:

- `_data/projects.yml`: every project (summary, six bullets, domains, tags, repo link, `writeup: true` if it has a page). `_data/tag_popularity.yml` breaks ties when ranking tags in the filter bar.
- `_data/interests.yml`: one block per category (`music`, `cinema`, `books`, `products`, `people`, `excerpts`). Each item has `title`, `creator`, `year`, `form`, `source`, `rating` (1–7), and `note`. Products also have `rotation` (`in` or `out`). `year_label` (such as `born` or `founded`) is printed before the year when set. `TODO` shows as a placeholder on the page.

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
- **Interest item:** add an entry under its category in `_data/interests.yml`. Order in the file is the default "Added" order.
- **Interest category:** add a block to `_data/interests.yml`, create `interests/<key>.html` with `layout: interest` and `category: <key>`, and add the key to the list in `interests.html`.
- **Nav link:** edit the list in `_includes/nav.html`.

## To do

- Ratings, notes, and product rotation in `_data/interests.yml` (currently `TODO`)
