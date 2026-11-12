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
  <canvas class="helix" role="img" aria-label="Two double helixes seen from the side, one above the other, mirrored, their points touching in the middle, turning"></canvas>
  <script src="{{ '/assets/js/helix.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  <time class="clock clock-below" data-zone="UT1"></time>
  <p class="tile-caption">Time</p>
  <script src="{{ '/assets/js/clock.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  <figure class="cake">
    {% include cake.html %}
  </figure>
  <p class="tile-caption tile-serif tira-caption"><span class="tira-word">Tiramisù</span><span class="tira-split">tira = pull/pick<br>mi = me<br>su = up</span></p>
  <script src="{{ '/assets/js/cake.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  <model-viewer class="lion" src="{{ '/assets/models/lion-capital.glb' | relative_url }}" alt="The Lion Capital of Ashoka, a 3D scan, turning; drag it to spin it any way"
    camera-orbit="0deg 90deg 115%" min-camera-orbit="auto auto 0%" max-camera-orbit="auto auto 400%" interaction-prompt="none" shadow-intensity="0" loading="lazy"></model-viewer>
  <p class="tile-caption tile-serif"><a class="quiet-link" href="https://poly.cam/explore/capture/50D2865D-9569-4280-B91D-70D927985F72/Lion+Capital+of+Ashoka" title="3D scan by uttamg911 on Polycam">Lion Capital</a></p>
  <script src="{{ '/assets/js/lion.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  </div>
  <div class="intro-text">
  <p class="infinity-arrow" aria-label="From zero to one"><canvas class="ripples" data-view="top"></canvas></p>
  <p class="infinity-arrow" aria-hidden="true"><canvas class="ripples" data-view="side"></canvas></p>
  <script src="{{ '/assets/js/ripples.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
  {% comment %} Two mottos, each in English then the original: Sanskrit (Mundaka Upanishad 3.1.6), then Latin. {% endcomment %}
  <div class="creed verse">
    <p>Truth Alone Triumphs [Prevails]</p>
    <p lang="sa">सत्यमेव जयते</p>
    <p>Truth Conquers [Prevails]</p>
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
      <p>Someone who uses technology to improve locally and globally the <a href="{{ '/quality-of-life/' | relative_url }}">Quality of Life</a>.</p>
      <p class="iam">I&hellip;</p>
      {% comment %}
        Green: Create with an empty bracket, then & Trade with an empty bracket. Red: Create with an empty bracket, then & Trade
        [MONEY & TIME]. Only the & is a link, unmarked, to /stuff/.
      {% endcomment %}
      <ul class="iam-list only-green">
        <li>Create <span class="iam-why">[<span class="iam-gap"></span>]</span><br><a href="{{ '/stuff/' | relative_url }}" class="quiet-link" title="A few of my favo(u)rite things">&amp;</a></li>
        <li>Trade <span class="iam-why">[<span class="iam-gap"></span>]</span></li>
      </ul>
      <ul class="iam-list only-red">
        <li>Create <span class="iam-why">[<span class="iam-gap"></span>]</span><br><a href="{{ '/stuff/' | relative_url }}" class="quiet-link" title="A few of my favo(u)rite things">&amp;</a></li>
        <li>Trade <span class="iam-why">[MONEY &amp; TIME]</span></li>
      </ul>
      <p class="iam">I love&hellip;</p>
      <ul class="iam-list">
        <li>good food</li>
        <li>&amp;</li>
        <li>great conversations</li>
      </ul>
    </section>
  </div>
  <p class="small open-to">Open to tech roles · Texas preferred, open to relocation anywhere in the US</p>
  <p class="muted small retired">Retired circa 2000</p>
  </div>
</div>
