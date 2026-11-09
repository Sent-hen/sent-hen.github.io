---
title: Home
redirect_from: /about/
description: "About Senthen Velmurugan"
---

{% comment %} Banner: jumping spider photo, a purchased stock license. Credit is in README.md under "Credits". {% endcomment %}
<figure class="banner-fig">
  <img class="banner" src="{{ '/assets/img/jumping-spider.webp' | relative_url }}" alt="A jumping spider on a green leaf, one leg raised">
  <figcaption class="banner-caption">To cultivate a sense of <span class="for-green">curiosity</span><span class="for-red">delight</span></figcaption>
</figure>

<div class="intro">
  <div class="intro-side">
  <canvas class="dot-coin" role="img" aria-label="A coin with a dot on one face, spinning faster until the dot seems always there"></canvas>
  <script src="{{ '/assets/js/dot-coin.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  <time class="clock" data-zone="UTC"></time>
  {% include sierpinski.html %}
  <time class="clock clock-below" data-zone="America/Chicago"></time>
  <p class="tile-caption">Time</p>
  <script src="{{ '/assets/js/clock.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  <figure class="cake">
    {% include cake.html %}
  </figure>
  <p class="tile-caption tile-serif">professional tiramisu connoisseur</p>
  <script src="{{ '/assets/js/cake.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  </div>
  <div class="intro-text">
  <p class="infinity-arrow" aria-label="From zero to one"><canvas class="ripples" data-view="top"></canvas></p>
  <p class="infinity-arrow" aria-hidden="true"><canvas class="ripples" data-view="side"></canvas></p>
  <script src="{{ '/assets/js/ripples.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  {% comment %} Mundaka Upanishad 3.1.6: English, the transliteration, then the original; the first line is highlighted in each. Sources at the bottom. {% endcomment %}
  <div class="creed verse">
    <p><mark class="creed-hl">Truth Alone Triumphs; not falsehood.</mark><br>
    Through truth the divine path is spread out<br>
    by which the sages whose desires have been completely fulfilled,<br>
    reach to where is that supreme treasure of Truth.</p>
    <p lang="sa-Latn" class="creed-src"><mark class="creed-hl">satyameva jayate nānṛtaṃ</mark><br>
    satyena panthā vitato devayānaḥ<br>
    yenākramantyṛṣayo hyāptakāmā<br>
    yatra tat satyasya paramaṃ nidhānam</p>
    <p lang="sa" class="creed-src"><mark class="creed-hl">सत्यमेव जयते नानृतं</mark> सत्येन पन्था विततो देवयानः।<br>
    येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम्॥</p>
  </div>
  <div class="duality">
    <section>
      <p class="label">Who I am</p>
      <p class="iam">I'm</p>
      <p class="name-rows">
        <span lang="ta">சேந்தன்</span>
        <span>Senthen</span>
        <span class="t-ph">SAYN-dhun</span>
      </p>
    </section>
    <section>
      <p class="label">Who am I</p>
      <p>Someone who uses technology to increase <a href="{{ '/quality-of-life/' | relative_url }}">Quality of Life</a>.</p>
      <p class="iam">Currently mastering&hellip;</p>
      <ul class="iam-list">
        <li>systems engineering</li>
        <li>linguistics</li>
        <li><a href="{{ '/stuff/' | relative_url }}" class="blank-box" aria-label="A few of my favo(u)rite things"></a></li>
      </ul>
      <p class="iam">I like&hellip;</p>
      <ul class="iam-list">
        <li>good food</li>
        <li>great conversations</li>
        <li>masterful storytelling</li>
      </ul>
    </section>
  </div>
  <p class="muted small site-note">Entrepreneur</p>
  <p class="small open-to">Open to FDSE roles · Pacific Northwest / Texas preferred, open to relocation anywhere in the US</p>
  <p class="muted small retired">Retired circa 2000</p>
  <div class="muted small sources">
    <p>Sources for the verse, Mundaka Upanishad 3.1.6:</p>
    <ul>
      <li>English: Swami Krishnananda, <a href="https://www.swami-krishnananda.org/mundak/mun_3-1.html">The Mundaka Upanishad: Third Mundaka, First Khanda</a></li>
      <li>Transliteration: Wisdom Library, <a href="https://www.wisdomlib.org/hinduism/book/mundaka-upanishad-shankara-bhashya/d/doc145127.html">The Mundaka Upanishad with Shankara's Commentary</a></li>
      <li>Devanagari: IIT Kanpur, <a href="https://web.archive.org/web/20200604085550/https://www.upanishads.iitk.ac.in/mundaka?language=dv&amp;field_chap_value=3&amp;field_sec_value=1&amp;field_mantra_no_value=6&amp;ecsiva=1&amp;etgb=1&amp;etsiva=1&amp;setgb=1&amp;choose=1">Mundaka Upanishad</a> (archived)</li>
    </ul>
  </div>
  </div>
</div>
