---
title: Notes
permalink: /notes/
description: "Notes by Senthen Velmurugan."
---

# Notes

<p class="muted">Short write-ups on systems, feedback, and things I'm learning. Newest first.</p>

<ul class="rows">
{% assign sorted_notes = site.notes | sort: 'date' | reverse %}
{% for note in sorted_notes %}
  <li><a href="{{ note.url | relative_url }}" class="plain"><span class="row"><span class="date">{{ note.date | date: '%Y · %m' }}</span><u>{{ note.title }}</u></span></a></li>
{% endfor %}
</ul>
