# sent-hen.github.io

The rules for the site, then what each page is and where it lives. A static Jekyll site on GitHub Pages, with no libraries and no build step of its own.

## Rules

### Pages

- **About** (`/`) is the main page. **Now** (`/now/`) is what I'm doing and what I've made. They are the only two links in the nav.
- My name in the nav is plain text, not a link.
- Projects, Resume, and CV are reached from Now. A few of my favo(u)rite things (`/stuff/`) is reached from About. Quality of Life (`/quality-of-life/`) has no link to it.
- Old links keep working: `/about/`, `/output/`, `/experiments/`, and `/experience/` redirect.

### Words

- The line about work is the same everywhere: **Open to FDSE roles · Pacific Northwest / Texas preferred, open to relocation anywhere in the US**.
- Only `status: active` means I'm working on it now. Today that is the P&ID Digitizer alone.
- Project dates on the web are `YYYY MM`. The clocks are `YYYY-MM-DD HH:MM SS` plus the zone: Dallas-Fort Worth above the triangle, UTC below.

### Resume and CV

- The website's `/resume/` and `/cv/` say the same as the PDFs, word for word. The source is the [Resume repository](https://github.com/Sent-hen/Resume).
- The resume is one page, focused on Forward Deployed Software Engineer roles.
- The CV has every resume bullet word for word, plus more bullets and more projects. Any CV bullet can be put on the resume.
- Every bullet follows one pattern: what was achieved, how it was measured, how it was done.
- Within an entry, where the work used them, bullets run AI/ML, then Backend/Infra, then Cybersecurity. Projects run technical first, then non-technical.
- KloudGin facts come only from the internship recommendation letter.
- Skills are Languages, Frameworks, and Tools. Nothing like "fundamentals".
- The PDFs show my phone number. The web pages do not.

### Look

- Two themes: green roof by default for everyone, red brick from the switch. The switch is one square whose arrow flips, like a stock index.
- A drafting sheet: cream line art on the page color, tiles framed in dots, dotted rules, dashed column dividers, small grids of squares in the corners. No arrows after labels.
- Captions: Time is blocky uppercase. The banner, the tiramisu, and the formula are Gelasio italic, the only web font.
- Every animation runs one way, 0 to 1. The Hi / Lo switch shows it all as still line art.

### A few of my favo(u)rite things

- Every category is rows of paired posters: `item 1 / item 2`, then `item 3 / item 4`, and so on, with a dot below each poster and `title · lead · year` on hover. Each category runs oldest to newest, by release date.

### Keeping it small

- Adding a project or an item is a one-file change, in `_data/`.
- If nothing uses it, delete it. No libraries, and no feature kept just in case.

## Every page

The layout is `_layouts/default.html`: `_includes/head.html`, `_includes/nav.html`, the page, `_includes/footer.html`.

- **Fonts and caching.** `head.html` loads Gelasio; everything else uses the device's fonts. The stylesheet and the About scripts are linked with `?v=` plus the build time, so browsers fetch new files after every deploy.
- **Nav.** Each entry in `nav.html` is `Label:/url/`, then any other sections it should highlight for. `/` matches only the main page.

  ```liquid
  {% assign links = "About:/:/quality-of-life/:/stuff/,Now:/now/:/projects/:/cv/:/resume/" | split: "," %}
  ```

- **Color switch.** The choice is remembered in `localStorage` (`theme-choice`). `head.html` applies it before the page paints, and `footer.html` handles the click. Red only comes from `data-theme="dark"`.
- **Hi / Lo.** The choice is remembered (`motion-choice`). Until someone picks, a low-end device (2 GB of memory or 2 CPU cores or less) or a reduced-motion setting starts on Lo. Lo is the `still` class on the page.
- **Colors.** All are variables at the top of `assets/css/style.scss`, which is grouped by page.

## About

`index.md`

| Element | What it is | Where |
| --- | --- | --- |
| Banner | The jumping spider, with "To cultivate a sense of curiosity" | `assets/img/jumping-spider.webp` |
| Tiramisu | A slice in 3/4 view on a level plate, an impossible perspective on purpose. Hi draws the slice and plate as falling 0s and 1s, 0 at the top and 1 at the bottom. Lo, or no JavaScript, shows the line drawing | `_includes/cake.html`, `assets/js/cake.js` |
| Clocks | `YYYY-MM-DD HH:MM SS` plus the zone: Dallas-Fort Worth (CST or CDT) above the triangle, UTC below it; each names its zone in `data-zone` | `assets/js/clock.js` |
| Sierpinski triangle | Pointing down, zooming forever into its bottom point, after [lutanho.net](https://www.lutanho.net/fractal/sierpa.html) | `_includes/sierpinski.html` |
| Golden spiral | Fibonacci squares growing out of the eye, with the formula (a + b) / a = a / b as its caption | `_includes/golden-spiral.html` |
| 0 → 1 ripple | Circles that touch at 0, each 1.17× the last | `_includes/ripples.html` |
| Ripple, side view | The same circles edge-on, drawn as a wave, moving in step | `_includes/ripple-side.html` |
| Who I am | My name in Tamil, English, and pronunciation | `index.md` |
| Who am I | What I do, what I'm currently mastering (the empty box opens A few of my favo(u)rite things), and what I like | `index.md` |

To change the rain, edit `CELL` (digit size) and `SPEED` (rows per second) in `cake.js`. The files keep the old "cake" names.

## Quality of Life

`quality-of-life.html`. One graph: three dashed tracks, Strategy, Tactics, Operations, whose bars are always in flux, each on its own rhythm.

## A few of my favo(u)rite things

`stuff.html`, `_data/stuff.yml`, at `/stuff/`. A photo captioned "Taste?", a rule, a plain list of things I like doing written in the page, and a rule. Then each category (Cinema, Music, Games, Literature, Graphic Novels) as rows of paired posters, with a `/` between the two in a pair. There are no titles on the page: below each poster is a `·`, and hovering or tapping turns it into `title · lead · year`, centered. The lead is the director, artist, author, or band. Music shows albums; Blue Monday was a single, so it keeps its own name and floppy-disk sleeve.

Only Dark Souls II shifts between two covers. A poster with `also:` fades through its images, one every 6 seconds (`assets/js/stuff.js`), pausing while hovered or tapped; Lo holds the first.

Art is in `assets/img/stuff/`. Where to find high-resolution art, best source first:

| Category | Where to look | What you get |
| --- | --- | --- |
| Cinema | [The Movie Database](https://www.themoviedb.org/): the film's page, then Images, then Posters. Filter by language to see foreign editions. Full size: `https://image.tmdb.org/t/p/original/<file>.jpg` | Often 2000 × 3000 |
| Cinema, second choice | [Apple TV Movies Artwork Finder](https://bendodson.com/projects/apple-tv-movies-artwork-finder/) | Up to 2000 × 3000 |
| Music | [Apple Music Artwork Finder](https://bendodson.com/projects/apple-music-artwork-finder/), or the iTunes Search API (below) | 1000 × 1000 is plenty |
| Games | Steam's official cover: `https://cdn.akamai.steamstatic.com/steam/apps/<app id>/library_600x900_2x.jpg` (the app id is in the game's Steam URL) | 600 × 900 |
| Games, other designs | [SteamGridDB](https://www.steamgriddb.com/): search the game, then Grids, 600 × 900. Most of these are fan-made | 600 × 900 |
| Literature, Graphic Novels | Apple Books through the iTunes Search API (below) with `media=ebook` | About 660 × 1000 |
| Literature, Graphic Novels, specific editions | The publisher's or retailer's site, such as Simon & Schuster for Vagabond's VIZBIG cover | Up to about 1740 × 2588 |
| Literature, Graphic Novels, last resort | [Open Library](https://openlibrary.org/): `https://covers.openlibrary.org/b/isbn/<isbn>-L.jpg` | Only about 330 × 500, so it looks soft |

The iTunes Search API needs no account: `https://itunes.apple.com/search?term=<words>&media=music&entity=album` (or `media=ebook&entity=ebook`). In each result, change `100x100bb` in `artworkUrl100` to `1000x1000bb`. Check that the cover is the edition you meant, since an ISBN search can return a different one.

Posters display about 300 px wide, so aim for at least 600 px wide; 1000 × 1500 (or 1000 × 1000 for albums) is enough. Shrink anything larger before adding it, and keep posters near 2:3, because the page crops them to that shape. A cover with a different shape looks zoomed next to the others. Prefer covers with only the art, title, and author.

```yaml
- label: Music
  square: true                # square covers; the rest are 2:3 posters
  items:
    - { title: "The New Abnormal", creator: "The Strokes", year: 2020, art: the-new-abnormal.jpg }
```

## Now

`now.html`. The work line, then a highlighted panel, then links to Projects, Resume, and CV. The panel's groups and its starred projects (a green rule and title) are slugs in the front matter:

```yaml
highlight:
  - group: Actively working on
    projects: [pid-digitizer]
  - group: Showcase
    projects: [dexpi-viewer, word2eq, campbell-woodworks]
star: [pid-digitizer, dexpi-viewer]
```

## Projects

`projects.html`, `_data/projects.yml`. A timeline with `YYYY MM` on the left, and the title, one sentence, and Note / Site / Code on the right. Active projects come first with a trailing dash (`2026 10—`), then the rest; each newest first.

```yaml
- slug: my-project
  title: My Project
  start: "2026-10"
  status: active              # or done
  domains: [Backend/infra]    # shown on Now
  summary: One sentence, no period
  tags: [Python, Docker]      # most used first; the first five show on the resume and CV
  cv_title: "My Project: What It Is"
  cv:                         # all show on /cv/; resume: true also shows on /resume/
    - text: "..."
      resume: true
  repo: https://github.com/Sent-hen/my-project   # "" if private
  site: https://example.com   # optional
  bullets:                    # four, under Note: the idea, what stood against it, what I built, what's next
    - "..."
```

When a project's status changes, also change its date in the Resume repository (`2026 -- In Progress`).

## Resume and CV

- `resume.md` and `cv.md` list their projects by slug in the front matter. The CV also has `additional:`.
- `_includes/cv-core.html` holds the header, Education, and Experience. Bullets inside `{% if include.full %}` are on the CV only.
- `_includes/cv-project.html` draws one project from `cv_title:` and `cv:`.
- When a bullet changes, change it in both places: the Resume repository's `.tex` file and the site's file.

**PDFs.** Run this in the Resume repository to rebuild both and copy them to `assets/pdf/`, then commit them here:

```bash
bash build-public.sh
```

The Word resume stays in the Resume repository (`main/Resume.docx`) and is not on the site.

## Run and publish

```bash
bundle install
```

```bash
bundle exec jekyll serve
```

Open `http://localhost:4000`. Pushing to `main` publishes through GitHub Pages in about a minute.

## Credits

- Posters and covers (`assets/img/stuff/`): the artwork belongs to the artists, studios, and publishers.
- Banner (`assets/img/jumping-spider.webp`): a jumping spider on a leaf, a purchased stock photo used under its license. Photographer and source: _to fill in_.

## License

[MIT](LICENSE).
