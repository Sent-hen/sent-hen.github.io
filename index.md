---
title: Home
description: "Senthen Velmurugan — student of computer science and systems thinking."
---

<p class="status">Currently a student · M.S. Computer Science, Georgia Tech</p>

I'm Senthen. I study how systems behave as wholes: how feedback, structure, and delay produce the behavior we see, whether the system is a distributed program, an organization, or an ecosystem.

I'm working toward an M.S. in Computer Science at Georgia Tech (OMSCS), after a B.S. in Computer Science from UT Dallas. This site is where I keep what I'm building and learning.

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
{% assign topics = "systems thinking,cybernetics,feedback loops,control theory,system dynamics,complexity,emergence,resilience,distributed systems,operating systems" | split: "," %}
{% for t in topics %}<span>{{ t }}</span>{% unless forloop.last %}<span class="sep">, </span>{% endunless %}{% endfor %}
</div>

<hr>

<p class="label"><a href="{{ '/notes/' | relative_url }}">Notes</a></p>

<ul class="rows">
{% for note in sorted_notes %}
  <li><a href="{{ note.url | relative_url }}" class="plain"><span class="row"><span class="date">{{ note.date | date: '%Y · %m' }}</span><u>{{ note.title }}</u></span></a></li>
{% endfor %}
</ul>
