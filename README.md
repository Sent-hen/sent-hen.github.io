# sent-hen.github.io

The rules for the site, then what each page is and where it lives. A static Jekyll site on GitHub Pages, with no libraries and no build step of its own.

## Rules

### Pages

- **About** (`/`) is the main page. **Now** (`/now/`) is what I'm doing and what I've made. They are the only two links in the nav.
- My name in the nav is plain text, not a link.
- Projects, Experiments, Resume, and CV are reached from Now. A few of my favo(u)rite things (`/stuff/`) and Quality of Life (`/quality-of-life/`) are reached from About.
- Old links keep working: `/about/`, `/output/`, and `/experience/` redirect.

### Words

- The line about work is the same everywhere: **Open to tech roles · Texas preferred, open to relocation anywhere in the US**.
- Only `status: active` means I'm working on it now. Today that is the P&ID Digitizer alone.
- Project dates on the web are `YYYY MM`. The clocks are `YYYY-MM-DD HH:MM SS` plus the zone: Dallas-Fort Worth, my own, above the helixes, and UTC, the global time, below.

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

- Two themes, both muted, never bright or cheery: green by default for everyone, red from the switch. Green is open ended and wishy-washy; red and black is deterministic, as far as I know how to make it. The switch is one square whose arrow flips, like a stock index.
- Green is a drafting sheet: cream line art (`#ECE9DC`) on forest green (`#2B5A45`), with the in-between roles as the cream laid over the green. Red is exact Flexoki values (see [Flexoki palette](#flexoki-palette)). Both use the same roles.
- No project stands out from another: the same colors and styles for all of them, with no highlights.
- A drafting sheet: line art in the text color on the page color, tiles framed in dots, dotted rules, dashed column dividers, small grids of squares in the corners. No arrows after labels.
- Captions: Time is blocky uppercase. The banner and the tiramisu are Gelasio italic, the only web font.
- Every animation runs one way, 0 to 1. Green moves; red holds it all still, as line art, except the coin, Sisyphus and the Time helixes.

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
  {% assign links = "About:/:/quality-of-life/:/stuff/,Now:/now/:/projects/:/experiments/:/cv/:/resume/" | split: "," %}
  ```

- **Color switch.** The choice is remembered in `localStorage` (`theme-choice`). `head.html` applies it before the page paints, and `footer.html` handles the click. Red only comes from `data-theme="dark"`.
- **Still on red.** There is no separate motion switch: red is the `still` class on the page, so every animation holds one frame, except the coin, the 0 → 1 drawings and the Time helixes, which keep moving. `head.html` sets it before the page paints and `footer.html` flips it with the color switch. A reduced-motion setting keeps green still too, and holds the coin, Sisyphus and the helixes as well. The clocks keep ticking on red.
- **Colors.** All are variables at the top of `assets/css/style.scss`, which is grouped by page.

## About

`index.md`

| Element | What it is | Where |
| --- | --- | --- |
| Banner | The jumping spider, with "To cultivate a sense of curiosity" in green and "To cultivate a sense of delight" in red | `assets/img/jumping-spider.webp` |
| Dot coin | A circle with a dot on one face and the other face blank, spinning about its upright axis. It starts slow enough to tell the faces apart, then speeds up until the dot looks like it's always there. It keeps time with the 0 → 1 ripple: it spins up over the ball's 8-second climb, reaches the steady dot as the ball reaches 1, and holds it through the ball's 3-second roll back. A ring around it is a speed gauge: it fills as the coin spins up and closes into a full circle at top speed, staying until the ball is back at 0. While the ball rolls back, the coin and the gauge flash with the ball and the mountain, like a stamina bar that needs rest. It starts again only when the ball is back at 0. It keeps spinning on red. Each switch to red tosses 50/50 whether the coin keeps its dot or spins with no dot at all (`data-coin="blank"` on the page); with no dot, the 0 → 1 drawings lose their ripples and only the ball moves. Green brings the dot back | `assets/js/dot-coin.js` |
| Tiramisu | A slice in 3/4 view on a level plate, an impossible perspective on purpose. Green draws the slice and plate as falling 0s and 1s, 0 at the top and 1 at the bottom. Red, or no JavaScript, shows the line drawing. It sits in the side column just below the coin, captioned "Tiramisù" | `_includes/cake.html`, `assets/js/cake.js` |
| Clocks | `YYYY-MM-DD HH:MM SS` plus the zone: Dallas-Fort Worth (CST or CDT), my own, above the helixes, and UTC, the global time, below it; each names its zone in `data-zone` | `assets/js/clock.js` |
| Lion Capital | Below the tiramisu, above Time: the Lion Capital of Ashoka, a 3D scan by uttamg911 on [Polycam](https://poly.cam/explore/capture/50D2865D-9569-4280-B91D-70D927985F72/Lion+Capital+of+Ashoka), exported as GLB (about 9 MB, loaded lazily) and shown with Google's `<model-viewer>` from jsDelivr. On green it turns slowly; red holds it facing us, as on the coins and notes. It can be dragged round by hand. The caption links to the scan | `assets/models/lion-capital.glb`, `assets/js/lion.js` |
| Helix | Between the clocks: two 3D double helixes, each two strands half a turn apart like DNA, three turns, stood upright and seen from the side, projected flat, each the size of one square tile. The lower one is full width at the bottom (UTC) and narrows to a point in the middle; the upper one is its mirror, full width at the top (CST), so their tips touch. They turn once every 6 seconds, so the lower coil climbs and the upper one sinks, meeting in the middle; the half of each turn behind is fainter. Between the two strands of each are base pairs, like the rungs of DNA, shrinking with the coil toward the middle; each half of a rung shows its base, in binary on green (A 00, C 01, G 10, T 11, so GC reads 10 01) and as the letter on red. The pairs are GC, AT, CG and TA. The whole figure also tumbles end over end about its horizontal axis, through the middle: over 10 seconds the ends swap places, top for bottom, then it slows, stops and turns back the other way, rocking. Like an hourglass, it has a round plinth capping one end, tumbling with it: on green a base under the lower (UTC) end, on red a top over the upper (CST) one; and sand that always trickles from top to bottom on the tile, whichever end is up: grains funnel in from above to the point in the middle and fall from there, faster and faster, to the end below. On red the sand runs the other way, bottom to top. It keeps moving on red too | `assets/js/helix.js` |
| 0 → 1 ripple | The Doppler effect on Sisyphus's mountain. The ball is the rock: it is pushed from 0 to 1 up the mountain (the uptime), which the side view draws as a slope that starts nearly flat and curves up steeper and steeper, about 1 up for 6 across, growing with the effort, and dropping a ripple each time the coin finishes a turn, so ripples start far apart and bunch up as the coin speeds up. Rings pack together ahead of the ball and stretch apart behind it, and each fades out by the time it spreads back to 0. Then it rolls straight back down to 0 (the downtime), slow at the top and faster and faster, and is pushed up again at once, with no rest at either end. In the corners, faint like a background, in the page's ink and UI font, a pair with an arrow between: 0 → 1 at the top left and Y → Z at the bottom right of the top drawing, A → B at the top left and 1 → 0 at the bottom right of the side one, under the summit. Going up every arrow points right; going down it flips to point left. The arrow and the mark it points at light up, fading in over a quarter second as each phase starts. Going down there are no ripples, only the ball. Spent, the ball and the mountain flash like a stamina bar that needs rest: they snap between a bright flash (`--flash`, the theme's 100 value) and nearly invisible, with little time on their usual color between, fast at the top and slower as they recover, and back on their usual color just as the ball reaches 0, and the cycle starts anew | `assets/js/ripples.js` |
| Ripple, side view | The same ball and ripples edge-on, as a wave on a line, with a crest wherever a ring is | `assets/js/ripples.js` |
| Verse | Below the Sisyphus drawings, above Who I am and Who am I, in italics, with no attribution: two mottos, each in English then the original: Truth Alone Triumphs [Prevails], सत्यमेव जयते (Sanskrit, Mundaka Upanishad 3.1.6); Truth Conquers [Prevails], Veritas vincit (Latin); then "Love is wise; Hatred is foolish.". On red, a toss of its own, 1 in 3, apart from the coin's dot, fades both [Prevails] away over 2.5 seconds; green brings them back | `index.md` |
| Retired | "Retired circa 2000", the last line of the page | `index.md` |
| Who I am | My name in Tamil, English, and pronunciation | `index.md` |
| Who am I | What I do (I… on green Create [ ], &, Trade [ ]; on red Create [ ], &, Trade [MONEY + TIME]; only the & is a link, unmarked, to A few of my favo(u)rite things), what I love (good food, great dialogue), and last, "Someone who uses technology to improve locally and globally the Quality of Life." | `index.md` |

To change the rain, edit `CELL` (digit size) and `SPEED` (rows per second) in `cake.js`. The files keep the old "cake" names.

## Quality of Life

`quality-of-life.html`, at `/quality-of-life/`. Under the title, in the muted color, "an oxymoron". Then a note in italics, "By the power of truth, I, while living, have conquered the universe", with the original Latin below it, "Vi veri veniversum vivus vici". Below that, centered on three lines: ~33.33% or 25%, then /, then ⅓ or ¼. On green the 3s keep coming, one every 120 ms, until they push "% or 25%" off the right edge; on red it holds still at ~33.33% or 25%, both in view. Then Strategy, Operations, and Tactics stacked as three boxes with the same frames, intent flowing down and feedback flowing back up. On green only Strategy and Operations show, and Tactics is all but invisible; on red, Tactics shows in full and Operations is all but invisible instead. The box is the same size in both. Below it, three boxes drawn as line art, each five words split by slashes. On green, Illusion / Logic / Reflection / Middleware / Spirit stands on the left between two pairs of side lines that run the full height of the dotted frame, with no top or bottom, and a square bracket opens out of it to the right, holding the loop, where Problem / Data / Conflict / Software / Mind and Solution / Action / Resolution / Hardware / Matter loop into each other. On red, Illusion, framed the same way, is pushed in between: Problem → Illusion → Solution, and back round to Problem.

## A few of my favo(u)rite things

`stuff.html`, `_data/stuff.yml`, at `/stuff/`. The title, A few of my favo(u)rite things, then a photo captioned "Can you hear the music?", a rule, then the heading Action (styled like Data) with Mind + Matter under it in both themes, and my favorite actions written in the page in four groups: Listening to the symphony of, followed by an empty dotted box that takes you to a random poster on the page (scrolled to the middle and focused, so its title shows); Illusions & Tea; Walking & Thinking, Writing & Thinking, Typing & Thinking; and Cooking & Eating. Then a rule. Then the heading Data, and below it each category as rows of paired posters, with a `/` between the two in a pair. There are no titles on the page: below each poster is a `·`, and hovering or tapping turns it into `title · lead · year`, centered. The lead is the director, artist, author, or band. Every category is headed by its name = Mind + Matter (Cinema = Mind + Matter, Music = Mind + Matter, and so on), the same in both themes. Music shows albums; Blue Monday was a single, so it keeps its own name and floppy-disk sleeve.

Only Dark Souls II shifts between two covers. A poster with `also:` fades through its images, one every 6 seconds (`assets/js/stuff.js`), pausing while hovered or tapped; red holds the first.

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

`now.html`. The work line, then a panel of projects, then links to Projects / Experiments, a rule, and Resume / CV. The panel's groups are slugs in the front matter:

```yaml
highlight:
  - group: Actively working on
    projects: [pid-digitizer]
  - group: Showcase
    projects: [dexpi-viewer, word2eq, campbell-woodworks]
```

## Experiments

`experiments.html`, at `/experiments/`. For now just the heading The Human Experiment.

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

## Flexoki palette

A reference for choosing colors, from [Flexoki](https://stephango.com/flexoki) by Steph Ango (MIT).

### Backgrounds and text

Eight roles carry every page. Flexoki's own light and dark themes are on the left; the two themes on this site are on the right.

| Role | Used for | Flexoki light | Flexoki dark | Green | Red |
| --- | --- | --- | --- | --- | --- |
| `bg` | Main background | paper | black | `#2B5A45` | black |
| `bg-2` | Secondary background | base-50 | base-950 | cream 6% | base-950 |
| `ui` | Borders | base-100 | base-900 | cream 15% | red-900 |
| `ui-2` | Hovered borders | base-150 | base-850 | cream 22% | red-850 |
| `ui-3` | Active borders | base-200 | base-800 | cream 30% | red-800 |
| `tx-3` | Faint text | base-300 | base-700 | cream 55% | red-700 |
| `tx-2` | Muted text | base-600 | base-500 | cream 80% | red-600 |
| `tx` | Primary text | black | base-200 | `#ECE9DC` | red-600 |

Accents use 600 on a light theme and 400 on a dark one. Base values can be blended with opacity; accents cannot, because that desaturates them.

### Extended palette

If you wish to use Flexoki for more complex applications beyond syntax highlighting and basic color schemes, the extended palette includes a complete set of values for every accent color from 50 to 950.

Paper (`#FFFCF0`) and black (`#100F0F`) are special values that represent the lightest and darkest colors in the palette, equivalent to 0 and 1000.

Flexoki emulates the feeling of pigment on paper by exponentially increasing intensity as colors get lighter or darker. This makes the colors feel vibrant and warm, like watercolor inks.

| Stop | Base | Red | Orange | Yellow | Green | Cyan | Blue | Purple | Magenta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 50 | `#F2F0E5` | `#FFE1D5` | `#FFE7CE` | `#FAEEC6` | `#EDEECF` | `#DDF1E4` | `#E1ECEB` | `#F0EAEC` | `#FEE4E5` |
| 100 | `#E6E4D9` | `#FFCABB` | `#FED3AF` | `#F6E2A0` | `#DDE2B2` | `#BFE8D9` | `#C6DDE8` | `#E2D9E9` | `#FCCFDA` |
| 150 | `#DAD8CE` | `#FDB2A2` | `#FCC192` | `#F1D67E` | `#CDD597` | `#A2DECE` | `#ABCFE2` | `#D3CAE6` | `#F9B9CF` |
| 200 | `#CECDC3` | `#F89A8A` | `#F9AE77` | `#ECCB60` | `#BEC97E` | `#87D3C3` | `#92BFDB` | `#C4B9E0` | `#F4A4C2` |
| 300 | `#B7B5AC` | `#E8705F` | `#EC8B49` | `#DFB431` | `#A0AF54` | `#5ABDAC` | `#66A0C8` | `#A699D0` | `#E47DA8` |
| 400 | `#9F9D96` | `#D14D41` | `#DA702C` | `#D0A215` | `#879A39` | `#3AA99F` | `#4385BE` | `#8B7EC8` | `#CE5D97` |
| 500 | `#878580` | `#C03E35` | `#CB6120` | `#BE9207` | `#768D21` | `#2F968D` | `#3171B2` | `#735EB5` | `#B74583` |
| 600 | `#6F6E69` | `#AF3029` | `#BC5215` | `#AD8301` | `#66800B` | `#24837B` | `#205EA6` | `#5E409D` | `#A02F6F` |
| 700 | `#575653` | `#942822` | `#9D4310` | `#8E6B01` | `#536907` | `#1C6C66` | `#1A4F8C` | `#4F3685` | `#87285E` |
| 800 | `#403E3C` | `#6C201C` | `#71320D` | `#664D01` | `#3D4C07` | `#164F4A` | `#163B66` | `#3C2A62` | `#641F46` |
| 850 | `#343331` | `#551B18` | `#59290D` | `#503D02` | `#313D07` | `#143F3C` | `#133051` | `#31234E` | `#4F1B39` |
| 900 | `#282726` | `#3E1715` | `#40200D` | `#3A2D04` | `#252D09` | `#122F2C` | `#12253B` | `#261C39` | `#39172B` |
| 950 | `#1C1B1A` | `#261312` | `#27180E` | `#241E08` | `#1A1E0C` | `#101F1D` | `#101A24` | `#1A1623` | `#24131D` |

## Credits

- Posters and covers (`assets/img/stuff/`): the artwork belongs to the artists, studios, and publishers.
- Banner (`assets/img/jumping-spider.webp`): a jumping spider on a leaf, a purchased stock photo used under its license. Photographer and source: _to fill in_.

## License

[MIT](LICENSE).
