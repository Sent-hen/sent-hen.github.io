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
  <div class="creed">
    <p>Truth alone prevails</p>
    <p lang="sa" class="creed-src">सत्यमेव जयते</p>
    <p>Love is wise; Hatred is foolish</p>
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
        <li>linguistics</li>
        <li>systems engineering</li>
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
  <p class="muted small site-note">This is a site where I keep what I'm creating</p>
  <p class="small open-to">Open to FDSE roles · Pacific Northwest / Texas preferred, open to relocation anywhere in the US</p>
  <p class="muted small retired">Retired circa 2000</p>
  </div>
</div>
