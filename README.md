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
{% assign links = "Input:/input/,Stuff:/stuff/,Output:/output/:/experiments/:/notes/:/experience/" | split: "," %}
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

## 5a. Home: banner

The jumping spider photo across the top of the home page, below the nav, shown whole at the column width. Credit is under [Credits](#credits).

`assets/img/jumping-spider.webp`, `index.md`, `assets/css/style.scss` (`.banner`)

```html
<img class="banner" src="{{ '/assets/img/jumping-spider.webp' | relative_url }}" alt="…">
```

## 6. Home: the cake

The Portal cake icon in its 3/4 perspective, drawn as a flat 2D vector (curved back on the left, striped cut face on the right, cherry on top), then shown as Matrix rain: columns of digits fall through the tile and are bright only where the drawing is. The digits are 0s at the top and 1s at the bottom: in dark mode the rain falls, turning 0 into 1 on the way down; in light mode it rises, turning 1 into 0 on the way up (it follows `--motion`). The tile inverts the page (white on black in light mode, black on white in dark). Without JavaScript the plain drawing shows instead.

`_includes/cake.html` (the drawing, in `currentColor`), `assets/js/cake.js` (the rain), `assets/css/style.scss` (`.cake`, `--cake-bg`, `--cake-ink`, `--motion`)

```html
<figure class="cake">
  {% include cake.html %}
</figure>
<script src="{{ '/assets/js/cake.js' | relative_url }}" defer></script>
```

```scss
:root { --cake-bg: var(--flexoki-black); --cake-ink: var(--flexoki-paper); }  /* light */
/* dark: --cake-bg: paper; --cake-ink: black */
```

```js
var CELL = 4.5;   // character size in CSS pixels (smaller = sharper cake)
var SPEED = 14;   // rows per second
```

## 7. Home: golden spiral

Fibonacci squares with the golden spiral, zooming into its eye forever (out of it in light mode). There is no rotation; the turning is the spiral's self-similarity. The drawing is generated; the speed is in the stylesheet. Switching the theme flips the direction from the current frame instead of restarting; `assets/js/motion.js` does this for the spiral and the ripple by setting each animation's playback rate to 1 or -1.

`_includes/golden-spiral.html` (drawing and keyframes), `assets/css/style.scss` (speed and colors), `assets/js/motion.js` (direction)

```scss
.golden-spiral .zoom { animation: golden-zoom 4s linear infinite var(--motion); }
.golden-spiral .sq-red { fill: var(--tint-red); }
```

## 7a. Home: axes

Below the spiral: a grid with an x axis through the middle, arrowheads on both ends, and a cyan dot moving left and right along it.

`_includes/axes.html` (drawing), `assets/css/style.scss` (`.axes`, colors and speed)

```scss
.axes-dot-x { animation: axes-sway 2.4s ease-in-out infinite alternate; }   /* left and right */
```

## 8. Home: epigraph and the two halves

The 0 → 1 ripple (section 9) sits first, then the Camus and Russell quotes, then "Who I am" and "Who am I" side by side. "Who am I" ends with "Currently mastering…" and "Cannot master in my lifetime…" lists (`.iam`, `.iam-list`). The site note and a `.quotes` block of two more quotes close the column.

`index.md`

```html
<blockquote class="epigraph">…<cite>Albert Camus, <i>The Myth of Sisyphus</i> (1942)</cite></blockquote>
<div class="duality">
  <section><p class="label">Who I am</p> … </section>
  <section><p class="label">Who am I</p> … </section>
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

One file per item; the folder is its category. This is a public site, so items carry no notes, commentary, or ratings: just the facts below. A body is only for the work itself, such as a poem's text.

`_input/<key>/<slug>.md`, `_layouts/item.html`

```markdown
---
title: "The Feast"          # English
original: "Le Festin"       # original language, only when different
lang: fr
phonetic: "luh fess-TAN"
creator: "Camille"
year: 2007
form: "Music"
order: 10
status: active              # optional
stuff: true                 # optional: also list it on /stuff/
---
```

## 13. Item title: original · English · phonetic

`_includes/item-title.html`

```liquid
{% if i.original and i.original != i.title %}<span class="t-orig">{{ i.original }}</span> · {% endif %}
<span class="t-en">{{ i.title }}</span>
{% if i.phonetic %} · <span class="t-ph">{{ i.phonetic }}</span>{% endif %}
```

## 14. Active tag

The only tag. Shows when `status: active`, on Input items.

`_includes/status.html`

```liquid
{% if include.value == "active" %}<span class="status-tag status-active">active</span>{% endif %}
```

## 15. Stuff

Every Input item with `stuff: true`, sorted by category (Cinema, then Music, ...) and title, or alphabetically, or by year.

`stuff.html`

```liquid
{% assign stuff = site.input | where: "stuff", true | sort: "title" %}
```

## 15a. Alphabetical / Year sort

A sort control for simple lists (Stuff). Each list item carries `data-title` and `data-year`, and `data-category` when `category=true` adds the Category sort (then the default).

`_includes/sort-bar.html`

```liquid
{% include sort-bar.html target="stuff-list" category=true %}
<ul id="stuff-list">
  <li data-index="1" data-category="music" data-title="Vienna" data-year="1977">…</li>
</ul>
```

## 16. Output

Featured experiments, then links to Experiments, Notes, and Experience (in that order).

`output.html`

```liquid
{% assign featured = site.data.experiments | where_exp: "p", "p.featured" | sort: "featured" %}
```

## 17. Experiments

Everything I've built or tried, in two groups, In progress (`status: active`, a green tag) and Done (`status: done`, a grey box), each newest first by `start`. The tag is `_includes/progress.html`, also used on Output and on notes. Dates show as YYYY MM. Domain and Tech filters build themselves from the data; `_data/tag_popularity.yml` breaks ties in the tag ranking. Old `/projects/` links redirect here.

`experiments.html`, `_data/experiments.yml`

```yaml
- slug: my-experiment
  title: My Experiment
  start: "2026-10"          # YYYY-MM
  status: active            # active = In progress, done = Done
  featured: 1               # optional: 1-3 puts it on /output/ in that order
  domains: [Backend/infra]
  summary: One sentence.
  tags: [Python, Docker]
  repo: https://github.com/Sent-hen/my-experiment   # "" if private
  note: false               # true if _notes/my-experiment.md exists
  bullets:
    - "..."
```

## 18. Notes

Writing about the experiments, newest first by `written`. Each note page shows its experiment's summary, tags, and bullets. Old `/projects/<slug>/` links redirect to `/notes/<slug>/`.

`notes.html` (the list), `_notes/<slug>.md` (one per note), `_layouts/note.html`

```markdown
---
title: My Experiment
experiment: my-experiment   # must match the slug in _data/experiments.yml
written: "2026-10"          # YYYY-MM
description: "One line, shown on /notes/."
---

The note, in Markdown.
```

## 19. Experience

Work, education, skills, and organizations, newest first, with dates as YYYY MM, written directly in the page.

`experience.md`

```html
<span class="entry-when">2024 05 &ndash; 2024 08</span>
```

## 20. Site settings

Title, the `input` and `notes` collections, their layouts, and the redirect plugin for old links.

`_config.yml`

```yaml
collections:
  input:    { output: true, permalink: /input/:path/ }
  notes:    { output: true, permalink: /notes/:path/ }
```

## Run and publish

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. Pushing to `main` publishes through GitHub Pages in about a minute.

## Credits

- Home banner (`assets/img/jumping-spider.webp`): jumping spider on a leaf, a purchased stock photo used under its license. Photographer and source: _to fill in_.

## License

[MIT](LICENSE).
