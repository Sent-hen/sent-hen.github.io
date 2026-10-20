# sent-hen.github.io

## Structure

```
index.md                     Home  /
collection.html              Collection  /collection/
collection/<key>.html          category  /collection/<key>/
_collection/<key>/<slug>.md    item  /collection/<key>/<slug>/
projects.html                Projects  /projects/ (filter by domain, tech, status; sort)
_data/projects.yml             every project shown on /projects/
_data/tag_popularity.yml       tie-breaker when ranking tech tags
_projects/<slug>.md            writeup  /projects/<slug>/
experience.md                Experience  /experience/

_layouts/                    default (page shell), project, category, item
_includes/                   head, nav, footer, category-items (finds a category's items)
assets/css/style.scss        all styling; Flexoki colors in :root
assets/img/                  icon.jpg (favicon), cake.gif (home)
_config.yml                  collections, permalinks, layout defaults
```

## Use

### Run locally

Needs Ruby (3.x) and Bundler. Install once, then serve:

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. Edits rebuild automatically; restart the server after changing `_config.yml`.

### Publish

```bash
git add -A
git commit -m "Describe the change"
git push
```

GitHub Pages builds `main` in about a minute. If the live site doesn't update, check the repo's Actions tab: a failed "pages build and deployment" run shows the error (usually a YAML typo).

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

Add an entry to `_data/projects.yml`. The page shows projects in file order, so move an entry to reorder:

```yaml
- slug: my-project            # anchor on /projects/ and writeup URL
  title: My Project
  when: "2026"
  status: in progress         # or complete; the Status filter appears once both exist
  domains: [Backend/infra]    # appear in the Domain filter, most-used first
  summary: One sentence.
  tags: [Python, Docker]      # most-used first; appear in the Tech filter and are clickable
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

### Edit everything else

| To change | Edit |
|---|---|
| Home page text, quote, GIF | `index.md` |
| Collection intro line | `collection.html` |
| Experience (work, education, skills) | `experience.md` |
| Nav links and their order | the `links` list in `_includes/nav.html` |
| Footer links (GitHub, LinkedIn, Email) | `_includes/footer.html` |
| Colors | the `:root` variables at the top of `assets/css/style.scss` |
| A domain's color | the `.dom-*` rules in `assets/css/style.scss` (`Backend/infra` → `.dom-backend-infra`); domains without a rule are gray |
| Tag ranking ties | `_data/tag_popularity.yml` (earlier = shown first) |
| Site title and description | `_config.yml` |

YAML is indentation-sensitive: use spaces, not tabs, and quote values that contain `:` or start with a number you want kept as text (`title: "800"`).
