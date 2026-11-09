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
  <p class="tile-caption tile-serif">professional tiramisu connoisseur</p>
  <script src="{{ '/assets/js/cake.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
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
  {% comment %}
    Mundaka Upanishad 3.1.6 in English, the transliteration, then the original, and
    Bertrand Russell on Face to Face.
  {% endcomment %}
  <div class="creed verse">
    <p><b>Truth alone triumphs; not falsehood.</b><br>
    Through truth the divine path is spread out<br>
    by which the sages whose desires have been completely fulfilled,<br>
    reach to where is that supreme treasure of Truth.</p>
    <p lang="sa-Latn" class="creed-src"><b>satyameva jayate nānṛtaṃ</b><br>
    satyena panthā vitato devayānaḥ<br>
    yenākramantyṛṣayo hyāptakāmā<br>
    yatra tat satyasya paramaṃ nidhānam</p>
    <p lang="sa" class="creed-src"><b>सत्यमेव जयते नानृतं</b> सत्येन पन्था विततो देवयानः।<br>
    येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम्॥</p>
  </div>
  <blockquote class="creed quote">
    <p>The moral thing I should wish to say to them is very simple. I should say, <b>&ldquo;Love is wise. Hatred is foolish.&rdquo;</b> In this world, which is getting more and more closely interconnected, we have to learn to tolerate each other.</p>
    <p>We have to learn to put up with the fact that some people say things that we don&rsquo;t like. We can only live together in that way. And if we are to live together and not die together, we must learn a kind of charity and a kind of tolerance, which is absolutely vital to the continuation of human life on this planet.</p>
  </blockquote>
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
      <p class="iam">Pursuing mastery of&hellip;</p>
      <ul class="iam-list">
        <li>system architecture</li>
        <li>strength training</li>
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
  </div>
</div>
