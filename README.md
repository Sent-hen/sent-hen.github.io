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

## 2. Nav: Output

The links after the name. Each entry is `Label:/url/` plus any other sections it should highlight for.

`_includes/nav.html`

```liquid
{% assign links = "Output:/output/:/experiments/:/cv/" | split: "," %}
```

## 3. Theme toggle

Red/green switch in the nav: a red ▼ on the red brick theme, a green ▲ on the green one, like a stock ticker.

The site starts green (light) for everyone, whatever their system setting; the switch changes to red (dark), and the choice is remembered (`localStorage`, key `theme-choice`). Red only ever comes from `data-theme="dark"`.

`_includes/head.html` (applies green, or the saved choice, before paint), `_includes/footer.html` (the click handler)

## 3a. Still mode

On a low-end device (2 GB of memory or 2 CPU cores or less), or when the visitor asks for reduced motion (on any network connection the animations run as normal), `_includes/head.html` adds the `still` class to the page. The drawings then show as still images: the tiramisu as its plain drawing (no digit rain), and the spiral, triangle, ripple, and quality-of-life bars without animation.

`_includes/head.html`, `assets/css/style.scss` (`.still`), `assets/js/cake.js`

## 4. Footer

`_includes/footer.html`

```html
<a href="https://github.com/Sent-hen">GitHub</a> · <a href="https://www.linkedin.com/in/...">LinkedIn</a> · <a href="mailto:...">Email</a>
```

## 5. Colors: green roof and red brick

Two earthy themes. Light mode is the green roof (a bottle/moss green page with cream text); dark mode is the red brick cottage (deep brick page, pale brick text). All colors are variables at the top of the stylesheet. The spiral and ripple use fixed Flexoki colors; the tiramisu and its digits invert the page.

`assets/css/style.scss`, `_includes/head.html` (the browser bar colors)

```scss
:root { --bg: var(--roof-900); --tx: var(--roof-cream); }               /* light: green roof */
@mixin dark { --bg: var(--brick-950); --tx: var(--brick-50); }          /* dark: red brick */
```

## 5a. Home: banner

The jumping spider photo across the top of the home page, below the nav, shown whole at the column width, with the caption "To cultivate a sense of curiosity." below it (`.banner-caption`). Credit is under [Credits](#credits).

`assets/img/jumping-spider.webp`, `index.md`, `assets/css/style.scss` (`.banner`)

```html
<img class="banner" src="{{ '/assets/img/jumping-spider.webp' | relative_url }}" alt="…">
```

## 6. Home: the tiramisu

A slice of tiramisu in 3/4 view on a plate, drawn as a flat 2D vector (cocoa-dusted top, a cut face of mascarpone and coffee-soaked ladyfinger layers carried round the side), then shown as Matrix rain: columns of digits fall through the tile and are bright only where the drawing is. The digits are 0s at the top and 1s at the bottom, and the rain falls, turning 0 into 1 on the way down. The tile inverts the page. Without JavaScript the plain drawing shows instead. Under the tile, the caption "A plate of Tiramisu" (`.tile-caption`; the same captions read "Time" under the lower clock and "a + b is to a, as a is to b" under the golden spiral).

`_includes/cake.html` (the tiramisu drawing, in `currentColor`; the files keep the old "cake" names), `assets/js/cake.js` (the rain), `assets/css/style.scss` (`.cake`, `--cake-bg`, `--cake-ink`)

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
var CELL = 4.5;   // character size in CSS pixels (smaller = sharper tiramisu)
var SPEED = 14;   // rows per second
```

## 7. Home: golden spiral

At the bottom of the left column (cake, UTC time, triangle, spiral). Fibonacci squares with the golden spiral, growing out of its eye forever. There is no rotation; the turning is the spiral's self-similarity. The drawing is generated; the speed is in the stylesheet. Like every animation on the home page it runs one way, 0 to 1, whatever the theme.

`_includes/golden-spiral.html` (drawing and keyframes), `assets/css/style.scss` (speed and colors)

```scss
.golden-spiral .zoom { animation: golden-zoom 4s linear infinite; }
.golden-spiral .sq-red { fill: var(--flexoki-red-600); }   /* earth tones: brick, verdigris (cyan-600), ochre, moss */
```

## 7a. Home: Sierpinski triangle

Below the UTC time, after [lutanho.net/fractal/sierpa.html](https://www.lutanho.net/fractal/sierpa.html): a Sierpinski triangle pointing down, in the text colour on the page background, zooming forever into its bottom point in both themes. Each level is three half-size copies of the level below (8 levels), so zooming by 2 about the bottom point turns the bottom copy into the whole and the loop is seamless.

`_includes/sierpinski.html` (drawing and keyframes), `assets/css/style.scss` (`.sierpinski`)

```scss
.sierpinski { background: var(--bg); }
.sierpinski .zoom { transform-origin: 80px 160px; animation: sierpinski-zoom 3s linear infinite; }   /* always in */
.sierpinski .sier-fill { fill: var(--tx); }
```

## 7b. Home: UTC clock

Above and below the triangle: the same current UTC time as `YYYY MM DD HH:MM SS`, with no label, ticking every second. Empty without JavaScript.

`assets/js/clock.js`, `index.md` (two `<time class="utc-clock">`), `assets/css/style.scss` (`.utc-clock`)

## 8. Home: the two halves

The 0 → 1 ripple (section 9) sits first, then "Who I am" and "Who am I" side by side. "Who I am" shows my name in three rows: Tamil (சேந்தன்), English (Senthen), pronunciation (SAYN-dhun) (`.name-rows`). "Who am I" ends with the "Currently mastering…" list (`.iam`, `.iam-list`; each item stays on one line on every screen, shrinking with the screen on phones); the last item under Currently mastering is an empty box (`.blank-box`) that opens Stuff. The site note ("This is a site where I keep what I'm creating") and "Open to tech roles in the Pacific Northwest / Texas" (`.open-to`) close the column.

`index.md`

```html
<div class="duality">
  <section><p class="label">Who I am</p> … </section>
  <section><p class="label">Who am I</p> … </section>
</div>
```

## 9. Home: 0 → 1 ripple

Circles that all touch at 0, each 1.17× the last; growing the group by 1.17× makes a seamless ripple, outward from 0 to 1.

`_includes/ripples.html` (circles), `assets/css/style.scss` (animation)

```scss
.infinity-arrow .ripples .wave { animation: ripple-out 1.6s linear infinite; }
@keyframes ripple-out { to { transform: scale(1.17); } }
```

## 9a. Home: ripple, side view

Below the ripple: the same circles seen edge-on, drawn as a wave whose crests sit where each circle reaches its right edge. Its height grows with distance like the circles, so it uses the same `.wave` animation and moves in step with the ripple, 0 to 1.

`_includes/ripple-side.html` (generated wave), `index.md`

## 9b. Quality of life

"quality of life" in "Who am I" is underlined and opens a note, "Quality of Life": "My goal is a fulfilling life, and a finite one. I’m working toward alignment between strategy (where I’m going), tactics (how I get there), and operations (how I live each day)." Below it, three bars, Strategy, Tactics, Operations, move back and forth from lopsided to level.

`quality-of-life.html`, `assets/css/style.scss` (`.qol`)

## 15. Stuff

Reached from the empty box on the home page, not the nav. A photo sits at the top (`assets/img/everyday-carry.jpg`), then each category from `_data/stuff.yml` (Cinema, Music, Games, Literature) with up to four items, left to right, in pairs: `1 / 2 · 3 / 4`. Creator and year show on hover. In Literature, The Ultimate Hitchhiker's Guide to the Galaxy and The Stormlight Archive stand for their whole series, without saying so. Then, under a rule, a plain list written in the page: Tea, Driving, Penmanship/Typing, Cooking, Woodworking, Piano.

To change an item, edit it in `_data/stuff.yml` (the order there is the order on the page). To add a category, add a `label` with its `items`.

`stuff.html`, `_data/stuff.yml`, `assets/css/style.scss` (`.showcase`, `.showcase-sep`)

```yaml
- label: Cinema
  items:
    - { title: "WALL-E", creator: "Andrew Stanton", year: 2008 }
- label: Music
  items: []                 # a category with no items shows its title alone
```

## 16. Output

The three featured projects (`featured: 1` to `3` in `_data/experiments.yml`), then four categories stacked in two pairs, each word on its own line: **Projects / Experiments** (both open `/experiments/`), a rule, then **CV / Resume** (both open `/cv/`).

`output.html`, `assets/css/style.scss` (`.output-stack`)

## 17. Projects / Experiments

Everything I've built or tried, in two groups, In progress (`status: active`, a green tag) and Done (`status: done`, a grey box), each newest first by `start`. The tag is `_includes/progress.html`, also used on Output. Under each project, on both pages, "Note" opens its four bullets and "Code" links the repository (`_includes/project-links.html`). The four bullets follow a pattern without labelling it: the idea, what stood against it, what I built, what's next. Dates show as YYYY MM. Old `/projects/` links redirect here.

`experiments.html`, `_data/experiments.yml`

```yaml
- slug: my-experiment
  title: My Experiment
  start: "2026-10"          # YYYY-MM
  status: active            # active = In progress, done = Done
  featured: 1               # optional: 1-3 puts it on /output/ in that order
  domains: [Backend/infra]
  summary: One sentence, no period
  tags: [Python, Docker]
  repo: https://github.com/Sent-hen/my-experiment   # "" if private
  bullets:                  # four: the idea, what stood against it, what I built, what's next
    - "..."
```

## 19. Curriculum Vitae

`/cv/` (old `/experience/` links redirect here). A header with my name, Pacific Northwest / Texas, email, GitHub, LinkedIn, and "Open to tech roles in the Pacific Northwest / Texas", then Skills, Experience, Organizations, and Education, newest first, with dates as YYYY MM. Written directly in the page; section headings are `<h2 class="cv-section">`.

`cv.md`, `assets/css/style.scss` (`.cv-head`, `.cv-section`)

```html
<span class="entry-when">2024 05 &ndash; 2024 08</span>
```

## 20. Site settings

Title, the default layout, and the redirect plugin for old `/projects/` and `/experience/` links.

`_config.yml`

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
