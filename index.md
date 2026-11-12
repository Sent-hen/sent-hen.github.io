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
  <figure class="cake">
    {% include cake.html %}
  </figure>
  <p class="tile-caption tile-serif">Tiramisù</p>
  <script src="{{ '/assets/js/cake.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  <canvas class="compass" role="img" aria-label="A compass star, N E S W and NE SE SW NW, extruded into a drum and spinning"></canvas>
  <script src="{{ '/assets/js/compass.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  <time class="clock" data-zone="UTC"></time>
  {% include sierpinski.html %}
  <time class="clock clock-below" data-zone="America/Chicago"></time>
  <p class="tile-caption">Time</p>
  <script src="{{ '/assets/js/clock.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  </div>
  <div class="intro-text">
  <p class="infinity-arrow" aria-label="From zero to one"><canvas class="ripples" data-view="top"></canvas></p>
  <p class="infinity-arrow" aria-hidden="true"><canvas class="ripples" data-view="side"></canvas></p>
  <script src="{{ '/assets/js/ripples.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  {% comment %} Two mottos, each in English then the original: Sanskrit (Mundaka Upanishad 3.1.6), then Latin. {% endcomment %}
  <div class="creed verse">
    <p>Truth Alone Triumphs <span class="prevails">[Prevails]</span></p>
    <p lang="sa">सत्यमेव जयते</p>
    <p>Truth Conquers <span class="prevails">[Prevails]</span></p>
    <p lang="la">Veritas vincit</p>
    <p>Love is wise; Hatred is foolish.</p>
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
      <p class="iam">I&hellip;</p>
      {% comment %}
        Green: an empty bracket, then & Trade with an empty bracket. Red: Create with an empty bracket, then & Trade
        [MONEY + TIME]. From the first line through the & is one unmarked link to /stuff/.
      {% endcomment %}
      <ul class="iam-list only-green">
        <li><a href="{{ '/stuff/' | relative_url }}" class="quiet-link" title="A few of my favo(u)rite things"><span class="iam-why">[<span class="iam-gap"></span>]</span><span>&amp;</span></a></li>
        <li>Trade <span class="iam-why">[<span class="iam-gap"></span>]</span></li>
      </ul>
      <ul class="iam-list only-red">
        <li><a href="{{ '/stuff/' | relative_url }}" class="quiet-link" title="A few of my favo(u)rite things"><span>Create <span class="iam-why">[<span class="iam-gap"></span>]</span></span><span>&amp;</span></a></li>
        <li>Trade <span class="iam-why">[MONEY + TIME]</span></li>
      </ul>
      <p class="iam">I love&hellip;</p>
      <ul class="iam-list">
        <li>good food</li>
        <li>great dialogue</li>
      </ul>
      <p>Someone who uses technology to improve locally and globally the <a href="{{ '/quality-of-life/' | relative_url }}">Quality of Life</a>.</p>
    </section>
  </div>
  <p class="small open-to">Open to tech roles · Texas preferred, open to relocation anywhere in the US</p>
  <p class="muted small retired">Retired circa 2000</p>
  </div>
</div>
