---
title: Notes
permalink: /notes/
description: "Notes by Senthen Velmurugan."
---

# Notes

<p class="lede">Short write-ups — things I'm learning, working through, or want to remember.</p>

<ul class="entry-list notes-list">
{% assign sorted_notes = site.notes | sort: 'date' | reverse %}
{% for note in sorted_notes %}
  <li class="entry">
    <div class="entry-title"><a href="{{ note.url | relative_url }}">{{ note.title }}</a></div>
    <div class="entry-meta">{{ note.date | date: '%b %-d, %Y' }}</div>
  </li>
{% endfor %}
</ul>
