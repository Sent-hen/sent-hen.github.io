---
title: Home
description: "Senthen Velmurugan — student of computer science and systems thinking."
---

<p class="status">M.S. Computer Science student at Georgia Tech · open to SWE/SDE, FDE, SRE, MLE, DevOps, and MLOps roles</p>

<div class="intro">
  <img class="intro-gif" src="{{ '/assets/img/cake.gif' | relative_url }}" width="160" height="160" alt="Animated ASCII-art cake">
  <div class="intro-text">
  <p>I'm Senthen: a lifelong learner and an aspiring scientist, inventor, and engineer. You could argue I'm already all three. My work spans backend and infrastructure, security, and AI/ML, but what interests me most are the systems that tie them together.</p>
  <p>I'm based in Dallas, working on an M.S. in Computer Science at Georgia Tech after finishing my B.S. at UT Dallas. This site is where I keep what I'm building and what I'm learning along the way. And yes, <a href="{{ '/notes/the-cake-is-a-lie/' | relative_url }}">the cake is a lie</a>.</p>
  </div>
</div>

{% assign sorted_notes = site.notes | sort: 'date' | reverse %}
{% assign latest = sorted_notes | first %}
{% if latest %}
<hr>

<p class="label"><a href="{{ latest.url | relative_url }}">Latest</a></p>

<div class="latest">
  <a href="{{ latest.url | relative_url }}" class="plain">
    <h2>{{ latest.title }}</h2>
    <div class="meta muted small"><time datetime="{{ latest.date | date_to_xmlschema }}">{{ latest.date | date: '%B %-d, %Y' }}</time></div>
    <div class="muted small">{{ latest.content | strip_html | truncatewords: 24 }} Keep&nbsp;reading&nbsp;&rarr;</div>
  </a>
</div>
{% endif %}

<hr>

<p class="label"><a href="{{ '/about/' | relative_url }}">Interests</a></p>

<div class="topics">
{% assign topics = "systems thinking,distributed systems,operating systems,databases,software delivery" | split: "," %}
{% for t in topics %}<span>{{ t }}</span>{% unless forloop.last %}<span class="sep">, </span>{% endunless %}{% endfor %}
</div>

<hr>

<p class="label"><a href="{{ '/notes/' | relative_url }}">Notes</a></p>

<ul class="rows">
{% for note in sorted_notes %}
  <li><a href="{{ note.url | relative_url }}" class="plain"><span class="row"><span class="date">{{ note.date | date: '%Y · %m' }}</span><u>{{ note.title }}</u></span></a></li>
{% endfor %}
</ul>
