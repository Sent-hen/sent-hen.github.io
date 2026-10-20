# sent-hen.github.io

## Structure

```
index.md                     Home  /
collection.html              Collection  /collection/
collection/<key>.html          category  /collection/<key>/
_collection/<key>/<slug>.md    item  /collection/<key>/<slug>/
projects.html                Projects  /projects/
_data/projects.yml             every project shown on /projects/
_data/tag_popularity.yml       tie-breaker when ranking tech tags
_projects/<slug>.md            writeup  /projects/<slug>/

_layouts/                    default (page shell), project, category, item
_includes/                   head, nav, footer, category-items (finds a category's items)
assets/css/style.scss        all styling; Flexoki colors in :root
assets/img/                  icon.jpg (favicon), cake.gif (home)
_config.yml                  collections, permalinks, layout defaults
```

## Use

### Run locally

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. Pushing to `main` publishes the site through GitHub Pages.

### Add a collection item

Create `_collection/<key>/<slug>.md`. The folder sets the category, so this is the only step:

```markdown
---
title: "American Pie"
creator: "Don McLean"
year: 1971
form: "Song"
source: "American Pie (United Artists)"
rotation: in         # optional: shows it on /collection/ (up to 3 per category)
order: 1             # optional: default sort position
---

The note, in Markdown.
```

### Add a collection category

Create `collection/<key>.html` and put its items in `_collection/<key>/`:

```yaml
---
layout: category
title: Music
creator_label: Artist   # label for the creator sort option
order: 4                # position on /collection/
---
```

### Add a project

Add an entry to `_data/projects.yml`, newest first:

```yaml
- slug: my-project            # anchor on /projects/ and writeup URL
  title: My Project
  when: "2026"
  status: in progress         # or complete
  domains: [Backend/infra]    # Backend/infra, Security, AI/ML, ...
  summary: One sentence.
  tags: [Python, Docker]      # most-used first
  repo: https://github.com/Sent-hen/my-project   # "" if private
  writeup: false              # true if _projects/my-project.md exists
  bullets:
    - "..."
```

For a writeup page, set `writeup: true` and add `_projects/my-project.md`:

```markdown
---
title: My Project
project: my-project
---

Writeup in Markdown.
```

### Edit the nav

Change the list in `_includes/nav.html`.
