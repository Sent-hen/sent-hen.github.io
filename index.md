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
  {% include golden-spiral.html %}
  {% include sierpinski.html %}
  <script src="{{ '/assets/js/motion.js' | relative_url }}" defer></script>
  </div>
  <div class="intro-text">
  <div class="quotes">
    <blockquote class="epigraph">
      <p>Originality is the art of concealing your source</p>
    </blockquote>
    <blockquote class="epigraph">
      <p>A jack of all trades, master of one, is oftentimes better than a master of none</p>
    </blockquote>
  </div>
  <p class="infinity-arrow" aria-label="From zero to one"><span>0</span>{% include ripples.html %}<span>1</span></p>
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
        <li>linguistics</li>
        <li>systems engineering</li>
        <li><a href="{{ '/interests/' | relative_url }}" class="blank-box" aria-label="My interests"></a></li>
      </ul>
    </section>
  </div>
  <p class="muted small site-note">This is a site where I keep what I'm building</p>
  </div>
</div>
