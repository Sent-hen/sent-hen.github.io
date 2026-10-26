---
title: Home
description: "Senthen Velmurugan: output"
---

{% comment %} Banner: jumping spider photo, a purchased stock license. Credit is in README.md under "Credits". {% endcomment %}
<figure class="banner-fig">
  <img class="banner" src="{{ '/assets/img/jumping-spider.webp' | relative_url }}" alt="A jumping spider on a green leaf, one leg raised">
  <figcaption class="banner-caption">To cultivate a sense of curiosity</figcaption>
</figure>

<div class="intro">
  <div class="intro-side">
  <figure class="cake">
    {% include cake.html %}
  </figure>
  <script src="{{ '/assets/js/cake.js' | relative_url }}" defer></script>
  <time class="utc-clock"></time>
  {% include sierpinski.html %}
  <time class="utc-clock utc-clock-below"></time>
  {% include golden-spiral.html %}
  <script src="{{ '/assets/js/clock.js' | relative_url }}" defer></script>
  <script src="{{ '/assets/js/motion.js' | relative_url }}" defer></script>
  </div>
  <div class="intro-text">
  <div class="quotes">
    <blockquote class="epigraph">
      <p>Originality is the art of concealing your source</p>
    </blockquote>
  </div>
  <p class="infinity-arrow" aria-label="From zero to one"><span>0</span>{% include ripples.html %}<span>1</span></p>
  <p class="infinity-arrow" aria-hidden="true"><span>0</span>{% include ripple-side.html %}<span>1</span></p>
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
      <p>Someone who uses technology to increase quality of life</p>
      <p class="iam">Currently mastering&hellip;</p>
      <ul class="iam-list">
        <li>computational linguistics</li>
        <li>systems engineering</li>
        <li><a href="{{ '/stuff/' | relative_url }}" class="blank-box" aria-label="Stuff"></a></li>
      </ul>
    </section>
  </div>
  <p class="muted small site-note">This is a site where I keep what I'm creating</p>
  <p class="small open-to">Open to tech roles in the Pacific Northwest / Texas</p>
  </div>
</div>
