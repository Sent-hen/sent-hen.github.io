# sent-hen.github.io

Every element of the site, where it lives, and its code.

## 1. Page shell

Every page is wrapped in the same head, nav, and footer.

`_layouts/default.html`

```html
<!DOCTYPE html>
<html lang="en">
{% include head.html %}
<body>
  {% include nav.html %}
  <main class="wrap">{{ content }}</main>
  {% include footer.html %}
</body>
</html>
```

## 2. Nav: Input · Stuff · Output

The links after the name. Each entry is `Label:/url/` plus any other sections it should highlight for.

`_includes/nav.html`

```liquid
{% assign links = "Input:/input/,Stuff:/stuff/,Output:/output/:/projects/:/experiments/:/experience/" | split: "," %}
```

## 3. Theme toggle

Light/dark switch in the nav. Follows the system setting until clicked, then remembers the choice.

`_includes/head.html` (applies the saved theme before paint), `_includes/footer.html` (the click handler)

```js
root.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
```

## 4. Footer

`_includes/footer.html`

```html
<a href="https://github.com/Sent-hen">GitHub</a> · <a href="https://www.linkedin.com/in/...">LinkedIn</a> · <a href="mailto:...">Email</a>
```

## 5. Colors (Flexoki)

All colors are variables at the top of the stylesheet, redefined for dark mode. The spiral and ripple use fixed Flexoki values; the cake inverts the page instead.

`assets/css/style.scss`

```scss
:root {
  --bg: var(--flexoki-paper);
  --tx: var(--flexoki-black);
  --yellow: var(--flexoki-yellow-600);
  --motion: reverse;   /* light mode plays the spiral and ripple backwards; dark sets normal */
}
```

## 6. Home: the cake

The Portal cake icon in its 3/4 perspective, drawn as a flat 2D vector (curved back on the left, striped cut face on the right, cherry on top), then shown as Matrix rain: columns of digits fall through the tile and are bright only where the drawing is. Light mode rains 0s, dark mode rains 1s, and the tile inverts the page (white on black in light mode, black on white in dark). Without JavaScript the plain drawing shows instead.

`_includes/cake.html` (the drawing, in `currentColor`), `assets/js/cake.js` (the rain), `assets/css/style.scss` (`.cake`, `--cake-bg`, `--cake-ink`, `--cake-digit`)

```html
<figure class="cake">
  {% include cake.html %}
</figure>
<script src="{{ '/assets/js/cake.js' | relative_url }}" defer></script>
```

```scss
:root { --cake-bg: var(--flexoki-black); --cake-ink: var(--flexoki-paper); --cake-digit: "0"; }  /* light */
/* dark: --cake-bg: paper; --cake-ink: black; --cake-digit: "1" */
```

```js
var CELL = 4.5;   // character size in CSS pixels (smaller = sharper cake)
var SPEED = 14;   // rows per second
```

## 7. Home: golden spiral

Fibonacci squares with the golden spiral, zooming into its eye forever (out of it in light mode). There is no rotation; the turning is the spiral's self-similarity. The drawing is generated; the speed is in the stylesheet.

`_includes/golden-spiral.html` (drawing and keyframes), `assets/css/style.scss` (speed and colors)

```scss
.golden-spiral .zoom { animation: golden-zoom 4s linear infinite var(--motion); }
.golden-spiral .sq-red { fill: var(--tint-red); }
```

## 8. Home: epigraph and the two halves

The Camus quote, then "Who I am" and "Who I want to be" side by side.

`index.md`

```html
<blockquote class="epigraph">…<cite>Albert Camus, <i>The Myth of Sisyphus</i> (1942)</cite></blockquote>
<div class="duality">
  <section><p class="label">Who I am</p> … </section>
  <section><p class="label">Who I want to be</p> … </section>
</div>
```

## 9. Home: 0 → 1 ripple

Circles that all touch at 0, each 1.17× the last; growing the group by 1.17× makes a seamless ripple: outward 0 → 1 in dark mode, inward 1 → 0 in light mode.

`_includes/ripples.html` (circles), `assets/css/style.scss` (animation)

```scss
.infinity-arrow .ripples .wave { animation: ripple-out 1.6s linear infinite var(--motion); }
@keyframes ripple-out { to { transform: scale(1.17); } }
```

## 10. Input

Raw sources. Shows active items, then every category with its count. Categories are found automatically.

`input.html`

```liquid
{% assign categories = site.pages | where: "layout", "category" | sort: "order", "last" %}
{% assign current = items | where: "status", "active" %}
```

## 11. Input category

One page per category, with sort and an "Active only" filter.

`input/<key>.html` (one per category), `_layouts/category.html` (the list), `_includes/category-items.html` (finds the items)

```yaml
---
layout: category
title: Music
creator_label: Artist   # label for the creator sort
order: 4                # position on /input/
---
```

```liquid
{% assign prefix = "_input/" | append: include.key | append: "/" %}
{% assign items = site.input | where_exp: "i", "i.relative_path contains prefix" | sort: "order", "last" %}
```

## 12. Input item

One file per item; the folder is its category. The body is the note.

`_input/<key>/<slug>.md`, `_layouts/item.html`

```markdown
---
title: "The Feast"          # English
original: "Le Festin"       # original language, only when different
lang: fr
phonetic: "luh fess-TAN"
creator: "Camille"
year: 2007
form: "Song"
order: 10
status: active              # optional
stuff: true                 # optional: also list it on /stuff/
---

The note, in Markdown.
```

## 13. Item title: original · English · phonetic

`_includes/item-title.html`

```liquid
{% if i.original and i.original != i.title %}<span class="t-orig">{{ i.original }}</span> · {% endif %}
<span class="t-en">{{ i.title }}</span>
{% if i.phonetic %} · <span class="t-ph">{{ i.phonetic }}</span>{% endif %}
```

## 14. Active tag

The only tag. Shows when `status: active`, on items, projects, and experiments.

`_includes/status.html`

```liquid
{% if include.value == "active" %}<span class="status-tag status-active">active</span>{% endif %}
```

## 15. Stuff

Stuff I didn't want to figure out: every Input item with `stuff: true`, sortable alphabetically or by year.

`stuff.html`

```liquid
{% assign stuff = site.input | where: "stuff", true | sort: "title" %}
```

## 15a. Alphabetical / Year sort

A sort control for simple lists (Stuff, Experiments). Each list item carries `data-title` and `data-year`.

`_includes/sort-bar.html`

```liquid
{% include sort-bar.html target="stuff-list" %}
<ul id="stuff-list">
  <li data-index="1" data-title="Vienna" data-year="1977">…</li>
</ul>
```

## 16. Output

Featured projects (the first 3 in the data file), then links to Projects, Experiments, and Experience.

`output.html`

```liquid
{% for p in site.data.projects limit: 3 %} … {% endfor %}
```

## 17. Projects

All projects in file order, with Domain and Tech filters, sort, and clickable tags. Filters build themselves from the data; `_data/tag_popularity.yml` breaks ties in the tag ranking.

`projects.html`, `_data/projects.yml`

```yaml
- slug: my-project
  title: My Project
  when: "2026"
  status: active
  domains: [Backend/infra]
  summary: One sentence.
  tags: [Python, Docker]
  repo: https://github.com/Sent-hen/my-project   # "" if private
  writeup: false            # true if _projects/my-project.md exists
  bullets:
    - "..."
```

## 18. Project writeup

`_projects/<slug>.md`, `_layouts/project.html`

```markdown
---
title: My Project
project: my-project          # must match the slug in _data/projects.yml
---

Writeup in Markdown.
```

## 19. Experiments

`experiments.html`, `_data/experiments.yml`

```yaml
- title: Name of the experiment
  when: "2026"
  status: active
  summary: One sentence on what I tried and what happened.
  link: https://...
```

## 20. Experience

Work, education, and skills, written directly in the page.

`experience.md`

## 21. Site settings

Title, the `input` and `projects` collections, and their layouts.

`_config.yml`

```yaml
collections:
  input:    { output: true, permalink: /input/:path/ }
  projects: { output: true, permalink: /projects/:path/ }
```

## Run and publish

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. Pushing to `main` publishes through GitHub Pages in about a minute.

## License

[MIT](LICENSE).
