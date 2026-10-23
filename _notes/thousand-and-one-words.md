---
title: The Thousand and One Words
experiment: thousand-and-one-words   # must match the slug in _data/experiments.yml
written: "2026-10"   # YYYY-MM; orders /notes/
redirect_from: /projects/thousand-and-one-words/
description: "A 100-chapter comic epic that teaches the 1,000 most-used SAT words."
---

## The problem

Vocabulary lists are the least memorable way to learn vocabulary. I wanted the 1,000 most-used SAT words to stick for 14 to 16 year olds, which meant giving each word a story, a picture, and a place.

## The story

Shahrazad told a thousand and one stories to save one life. Here a thousand words must be saved to save a city. A rooftop courier who can barely read, a scribe who's afraid of heights, and a djinn made of living ink race through the Round City of Baghdad to recapture word-sparks scattered by a villain called the Silencer. Each chapter covers one landmark, ten words, and ends on a cliff-hanger.

## Three memory methods on every page

| Method | For readers who remember… | On the page |
|---|---|---|
| Story | plots and characters | each word is spoken or acted out in a scene |
| Link | strange pictures | word pairs are chained with exaggerated, active images and a sound-alike hook |
| Loci | places | 100 landmarks on one route, each with the same 10 stations |

Every chapter's last word links to the next chapter's first, so all 1,000 words form one unbroken chain.

## How it's built

The script for all 100 chapters lives in plain text, and the words, meanings, and landmarks live in one JSON file. A Python build renders the 100 chapter pages, an image-prompt file for each chapter, and the combined script, so a one-line edit updates every page. The character sheets and city map are vector SVGs, also drawn in Python.
