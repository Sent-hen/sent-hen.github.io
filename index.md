---
title: Home
description: "Senthen Velmurugan: input, stuff, and output."
---

{% comment %} Banner: jumping spider photo, a purchased stock license. Credit is in README.md under "Credits". {% endcomment %}
<img class="banner" src="{{ '/assets/img/jumping-spider.webp' | relative_url }}" alt="A jumping spider on a green leaf, one leg raised">

<div class="intro">
  <div class="intro-side">
  <figure class="cake">
    {% include cake.html %}
  </figure>
  <script src="{{ '/assets/js/cake.js' | relative_url }}" defer></script>
  {% include golden-spiral.html %}
  {% include axes.html %}
  <script src="{{ '/assets/js/motion.js' | relative_url }}" defer></script>
  </div>
  <div class="intro-text">
  <p class="infinity-arrow" aria-label="From zero to one"><span>0</span>{% include ripples.html %}<span>1</span></p>
  <blockquote class="epigraph">
    <p>The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy.</p>
    <cite>Albert Camus, <i>The Myth of Sisyphus</i> (1942)</cite>
  </blockquote>
  <blockquote class="epigraph">
    <p>Love is wise, hatred is foolish. In this world, which is getting more and more closely interconnected, we have to learn to tolerate each other. We have to learn to put up with the fact that some people say things that we don't like. We can only live together in that way, and if we are to live together and not die together, we must learn a kind of charity and a kind of tolerance which is absolutely vital to the continuation of human life on this planet.</p>
    <cite>Bertrand Russell, <i>Face to Face</i>, BBC (1959)</cite>
  </blockquote>
  <div class="duality">
    <section>
      <p class="label">Who I am</p>
      <p>I'm Senthen <span class="t-ph">(SAYN-thuhn)</span>.</p>
      <p>I like contrasts.</p>
      <p>I am a Human-Centered Engineer.</p>
      <p class="iam">but also&hellip;</p>
      <ul class="iam-list">
        <li>autodidact</li>
        <li>entrepreneur</li>
        <li>scientist</li>
      </ul>
      <p>I like engaging in intense dialogue to let an answer emerge.</p>
      <p>I like bottom-up and top-down thinking.</p>
    </section>
    <section>
      <p class="label">Who am I</p>
      <p>Someone who uses technology to increase quality of life.</p>
      <p class="iam">Currently mastering&hellip;</p>
      <ul class="iam-list">
        <li>linguistics</li>
        <li>systems engineering</li>
        <li>piano</li>
      </ul>
      <p class="iam">Cannot master in my lifetime&hellip;</p>
      <ul class="iam-list">
        <li><span class="boxed">the human condition</span></li>
      </ul>
    </section>
  </div>
  <p class="muted small site-note">This is a site where I keep what I'm building and showcase things I like.</p>
  <div class="quotes">
    <blockquote class="epigraph">
      <p>Originality is the art of concealing your source.</p>
    </blockquote>
    <blockquote class="epigraph">
      <p>A jack of all trades, master of one, is oftentimes better than a master of none.</p>
    </blockquote>
  </div>
  </div>
</div>
