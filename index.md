---
title: Home
description: "Senthen Velmurugan — computer scientist, OMSCS student."
---

<div class="intro">

Senthen Velmurugan

<p class="role">B.S. Computer Science, UTD &nbsp;·&nbsp; M.S. Computer Science (OMSCS), Georgia Tech — Computing Systems</p>

I'm a computer scientist based in Texas. I finished my B.S. in Computer Science at UT Dallas, and I'm currently working through Georgia Tech's OMSCS program, specializing in computing systems.

This site is where I keep a record of what I'm building and learning — replace this paragraph with a couple sentences about what you actually care about (systems, distributed computing, a specific stack, etc.).

</div>

<hr>

<p class="section-label">RECENT NOTES</p>

<ul class="entry-list notes-list">
{% assign sorted_notes = site.notes | sort: 'date' | reverse %}
{% for note in sorted_notes limit:3 %}
  <li class="entry">
    <div class="entry-title"><a href="{{ note.url | relative_url }}">{{ note.title }}</a></div>
    <div class="entry-meta">{{ note.date | date: '%b %Y' }}</div>
  </li>
{% endfor %}
</ul>

<p><a href="{{ '/notes/' | relative_url }}">All notes &rarr;</a></p>
