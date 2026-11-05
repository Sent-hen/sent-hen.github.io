# sent-hen.github.io

Every element of the site, where it lives, and its code.

## 1. Page shell

Every page is wrapped in the same head, nav, and footer.

`_includes/head.html` loads one web font, Gelasio italic from Google Fonts (a free serif drawn to Georgia's measurements), used as `--font-serif` for the italic captions: the banner, the tiramisu, and the golden-ratio formula. Everything else uses the device's own fonts (`--font-ui`, `--font-mono`). The stylesheet and the About page's scripts are linked with `?v=` plus the build time, so browsers fetch the new files after every deploy instead of showing a cached old version.

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

## 2. Nav: About and Now

My name is plain text, not a link. After it come two links, About (`/`, the main page) and Now (`/now/`). Each entry is `Label:/url/` plus any other sections it should highlight for; `/` is matched only on the main page itself.

`_includes/nav.html`

```liquid
{% assign links = "About:/:/quality-of-life/:/stuff/,Now:/now/:/projects/:/cv/:/resume/" | split: "," %}
```

## 3. Theme toggle

Red/green switch at the far right of the nav: one square block holding one arrow, like a stock index. A green ▲ for the green theme, a red ▼ for the red one; clicking flips the arrow in place.

The site starts green (light) for everyone, whatever their system setting; the switch changes to red (dark), and the choice is remembered (`localStorage`, key `theme-choice`). Red only ever comes from `data-theme="dark"`.

`_includes/head.html` (applies green, or the saved choice, before paint), `_includes/footer.html` (the click handler)

## 3a. Hi / Lo

A second switch, left of the color switch (where the color switch used to be): **Hi** animates everything, **Lo** shows still line art (the tiramisu as its plain line drawing, and the spiral, triangle, ripple, and quality-of-life bars without moving). The choice is remembered (`localStorage`, key `motion-choice`). Until someone picks, a low-end device (2 GB of memory or 2 CPU cores or less) or a reduced-motion setting starts on Lo; everyone else on Hi. Lo is the `still` class on the page.

`_includes/nav.html` (the switch), `_includes/head.html` (picks before paint), `_includes/footer.html` (the click handler), `assets/css/style.scss` (`.still`, `.motion-toggle`), `assets/js/cake.js` (starts and stops the rain)

## 4. Footer

`_includes/footer.html`

```html
<a href="https://github.com/Sent-hen">GitHub</a> · <a href="https://www.linkedin.com/in/...">LinkedIn</a> · <a href="mailto:...">Email</a>
```

## 5. Colors: green roof and red brick

Two earthy themes. Light mode is the green roof (a bottle/moss green page with cream text); dark mode is the red brick cottage (deep brick page, pale brick text). All colors are variables at the top of the stylesheet. The spiral, ripple, triangle, and tiramisu are drawn in the text color on the page.

`assets/css/style.scss`, `_includes/head.html` (the browser bar colors)

```scss
:root { --bg: var(--roof-900); --tx: var(--roof-cream); }               /* light: green roof */
@mixin dark { --bg: var(--brick-950); --tx: var(--brick-50); }          /* dark: red brick */
```

### Look

A drafting-sheet look: the drawings are cream line art on the page color, each tile framed in dots; labels and captions are small uppercase, with no arrows; rules are dotted, and the column dividers dashed; small grids of squares, some filled and some hollow, sit in the page's corners (`body::before`, `body::after`, `.site-footer::before`, `.site-footer::after`).

## 5a. About: banner

The jumping spider photo across the top of the About page, below the nav, shown whole at the column width, with the caption "To cultivate a sense of curiosity" below it in the italic serif (`.banner-caption`). Credit is under [Credits](#credits).

`assets/img/jumping-spider.webp`, `index.md`, `assets/css/style.scss` (`.banner`)

```html
<img class="banner" src="{{ '/assets/img/jumping-spider.webp' | relative_url }}" alt="…">
```

## 6. About: the tiramisu

A slice of tiramisu in 3/4 view on a round plate drawn level, three flat rings straight across (an impossible perspective on purpose), like a drafting sheet (stippled cocoa top, hatched ladyfinger layers, open mascarpone layers, a height dimension, and corner marks). In Lo that drawing is what shows. In Hi only the slice and plate become 0/1 rain, from a copy drawn as brightness (`.tira-solid`, hidden on the page): the slice bright with faint mascarpone layers, the plate dim and thin with a gap around the slice; the canvas is rebuilt whenever the tile size or pixel density changes (zooming in, another screen), so it stays sharp: columns of digits fall through the tile and are bright only where the drawing is. The digits are 0s at the top and 1s at the bottom, and the rain falls, turning 0 into 1 on the way down. The tile inverts the page. Without JavaScript the plain drawing shows instead. Under the tile, the caption "A plate of tiramisu" in italic serif (`.tile-serif`) (`.tile-caption`; the same captions read "Time" under the lower clock and the formula (a + b) / a = a / b, in stacked fractions (`.tile-formula`), under the golden spiral).

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

## 7. About: golden spiral

At the bottom of the left column (cake, UTC time, triangle, spiral). Fibonacci squares with the golden spiral, growing out of its eye forever. There is no rotation; the turning is the spiral's self-similarity. The drawing is generated; the speed is in the stylesheet. Like every animation on the About page it runs one way, 0 to 1, whatever the theme.

`_includes/golden-spiral.html` (drawing and keyframes), `assets/css/style.scss` (speed and colors)

```scss
.golden-spiral .zoom { animation: golden-zoom 4s linear infinite; }
.golden-spiral .sq-red { fill: var(--flexoki-red-600); }   /* earth tones: brick, verdigris (cyan-600), ochre, moss */
```

## 7a. About: Sierpinski triangle

Below the UTC time, after [lutanho.net/fractal/sierpa.html](https://www.lutanho.net/fractal/sierpa.html): a Sierpinski triangle pointing down, in the text colour on the page background, zooming forever into its bottom point in both themes. Each level is three half-size copies of the level below (8 levels), so zooming by 2 about the bottom point turns the bottom copy into the whole and the loop is seamless.

`_includes/sierpinski.html` (drawing and keyframes), `assets/css/style.scss` (`.sierpinski`)

```scss
.sierpinski { background: var(--bg); }
.sierpinski .zoom { transform-origin: 80px 160px; animation: sierpinski-zoom 3s linear infinite; }   /* always in */
.sierpinski .sier-fill { fill: var(--tx); }
```

## 7b. About: UTC clock

Above and below the triangle: the same current UTC time as `YYYY MM DD HH:MM SS`, with no label, ticking every second. Empty without JavaScript.

`assets/js/clock.js`, `index.md` (two `<time class="utc-clock">`), `assets/css/style.scss` (`.utc-clock`)

## 8. About: the two halves

The 0 → 1 ripple (section 9) sits first, then "Who I am" and "Who am I" side by side. "Who I am" shows my name in three rows: Tamil (சேந்தன்), English (Senthen), pronunciation (SAYN-dhun) (`.name-rows`). "Who am I" ends with the "Currently mastering…" list (`.iam`, `.iam-list`; each item stays on one line on every screen, shrinking with the screen on phones); the last item under Currently mastering is an empty box (`.blank-box`) that opens Stuff, followed by "I like great storytelling". The site note ("This is a site where I keep what I'm creating") and "Open to FDSE roles in the Pacific Northwest / Texas" (`.open-to`) close the column.

`index.md`

```html
<div class="duality">
  <section><p class="label">Who I am</p> … </section>
  <section><p class="label">Who am I</p> … </section>
</div>
```

## 9. About: 0 → 1 ripple

Circles that all touch at 0, each 1.17× the last; growing the group by 1.17× makes a seamless ripple, outward from 0 to 1.

`_includes/ripples.html` (circles), `assets/css/style.scss` (animation)

```scss
.infinity-arrow .ripples .wave { animation: ripple-out 1.6s linear infinite; }
@keyframes ripple-out { to { transform: scale(1.17); } }
```

## 9a. About: ripple, side view

Below the ripple: the same circles seen edge-on, drawn as a wave whose crests sit where each circle reaches its right edge. Its height grows with distance like the circles, so it uses the same `.wave` animation and moves in step with the ripple, 0 to 1.

`_includes/ripple-side.html` (generated wave), `index.md`

## 9b. Quality of life

"quality of life" in "Who am I" is underlined and opens "Quality of Life": just a graph, in the line-art look, of three dashed tracks, Strategy, Tactics, Operations, whose bars are always in flux, each on its own rhythm.

`quality-of-life.html`, `assets/css/style.scss` (`.qol`)

## 15. Stuff

Reached from the empty box on the About page, not the nav. A photo sits at the top (`assets/img/everyday-carry.jpg`), then each category from `_data/stuff.yml` (Cinema, Music, Games, Literature) with up to four items, left to right, in pairs: `1 / 2 · 3 / 4`. Creator and year show on hover. In Literature, The Ultimate Hitchhiker's Guide to the Galaxy and The Stormlight Archive stand for their whole series, without saying so. Then, under a rule, a plain list written in the page: Tea, Driving, Penmanship/Typing, Cooking, Woodworking, Piano.

To change an item, edit it in `_data/stuff.yml` (the order there is the order on the page). To add a category, add a `label` with its `items`.

`stuff.html`, `_data/stuff.yml`, `assets/css/style.scss` (`.showcase`, `.showcase-sep`)

```yaml
- label: Cinema
  items:
    - { title: "WALL-E", creator: "Andrew Stanton", year: 2008 }
- label: Music
  items: []                 # a category with no items shows its title alone
```

## 16. Now

`/now/` (old `/output/` links redirect here). Under the title, "Open to FDSE roles · Pacific Northwest / Texas preferred, open to relocation anywhere in the US". Then a highlighted panel (`.highlight`) with three groups: **Actively working on** (P&ID Digitizer), **Technical** (DEXPI P&ID Viewer, Word2Eq), and **Non-technical** (Campbell Woodworks, Thai Sizzle). P&ID Digitizer and DEXPI P&ID Viewer get the strongest highlight, a green rule and title (`.entry-star`). The groups and the starred projects are listed by slug in the front matter of `now.html`:

```yaml
highlight:
  - group: Actively working on
    projects: [pid-digitizer]
  - group: Technical
    projects: [dexpi-viewer, word2eq]
  - group: Non-technical
    projects: [campbell-woodworks, thai-sizzle]
star: [pid-digitizer, dexpi-viewer]
```

After the panel, the categories, each word on its own line: **Projects** (opens `/projects/`), a rule, then **Resume / CV** (open `/resume/` and `/cv/`).

`now.html`, `assets/css/style.scss` (`.highlight`, `.output-stack`)

## 17. Projects

A timeline: the date on the left as YYYY MM, the project on the right (title, one sentence, then Note / Site / Code), one row each with a dotted line between. Projects with `status: active` come first, with a trailing dash (`2026 10—`), then the rest; each newest first by `start`. "Note" opens the four bullets, which follow a pattern without labelling it: the idea, what stood against it, what I built, what's next. Old `/experiments/` links redirect here.

Set `status: active` on whatever I am working on now, and also change its date in `shared/fdse-core.tex` or `master-cv/CV.tex` in the Resume repository (`2026 -- In Progress`), since the CV and resume pages show "In progress" from the same status.

`projects.html`, `_data/projects.yml`

```yaml
- slug: my-project
  title: My Project
  start: "2026-10"          # YYYY-MM
  status: active            # active = In progress, done = Done
  domains: [Backend/infra]
  summary: One sentence, no period
  tags: [Python, Docker]
  repo: https://github.com/Sent-hen/my-project   # "" if private
  cv_title: "My Project: What It Is"   # its name on /resume/, /cv/, and in the PDFs
  cv:                       # 2-3 bullets, word for word as in the PDFs: what was achieved, how it was measured, how it was done
    - "..."
  bullets:                  # four: the idea, what stood against it, what I built, what's next
    - "..."
```

## 19. Curriculum Vitae

`/cv/` (old `/experience/` links redirect here). The CV is the resume word for word, plus the projects that have outgrown one page, in the same bullet pattern (what was achieved, how it was measured, how it was done). It matches `master-cv/CV.tex` in the Resume repository: header, Education, Experience, Projects, then Additional projects, Skills, and Organizations.

`cv.md` lists its projects by slug in its front matter (`projects:` for the resume's, `additional:` for the rest, technical first). Each project's name and bullets come from `cv_title:` and `cv:` in `_data/projects.yml`, drawn by `_includes/cv-project.html` with the first five tags and the start year (plus "In progress" while `status: active`).

`cv.md`, `_includes/cv-core.html`, `_includes/cv-project.html`, `assets/css/style.scss` (`.cv-head`, `.cv-section`)

## 19a. Resume

`/resume/`: the one-page resume, focused on Forward Deployed Software Engineer roles, the same as `main/Resume.tex`. The header, Education, Experience (KloudGin from the internship recommendation letter), and the five projects are `_includes/cv-core.html`, shared with `/cv/`, just as `shared/fdse-header.tex` and `shared/fdse-core.tex` are shared by the two PDFs. Change a bullet in both places: the `.tex` file and `_data/projects.yml` (or `cv-core.html` for experience). On Now, "Resume" comes first, then "CV".

**PDFs.** Each page links a PDF built from LaTeX in the Resume repository: `assets/pdf/Senthen-Velmurugan-Resume.pdf` (one page) and `assets/pdf/Senthen-Velmurugan-CV.pdf` (two pages). These copies have the phone number covered by a black bar (the digits are not in the files at all); the PDFs in the Resume repository keep it. To update them, run `bash build-public.sh` in the Resume repository, which builds both and writes them here. Skills on both pages are only Languages, Frameworks, and Tools.

`resume.md`

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
