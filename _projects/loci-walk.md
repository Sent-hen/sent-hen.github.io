---
title: Loci Walk
project: loci-walk
description: "A text-based memory palace for the first 18 elements, with spaced-repetition review."
---

## The problem

The method of loci, placing vivid images along a familiar route, is one of the most reliable memory techniques we know of, but building a good palace takes effort most learners never put in. I wanted a ready-made palace for one concrete subject, the first 18 elements, that guides you through learning it and then checks whether it stuck.

## How it works

- **Learn.** You walk a fixed 18-stop route around a home. At each stop, a short story places one absurd image, and a highlighted phrase reveals the image and what it encodes.
- **Recall.** You walk the route again from memory, then practice backward, jump, and reverse drills. A hint ladder gives you just enough to continue, and you rate yourself.
- **Review.** Leitner boxes schedule what's due today. Progress stays in the browser and can be exported and imported.
- **Make it yours.** Each stop can be renamed to a real place in your own home.

It's a static ES-module web app with no build step and no dependencies, and it works offline once loaded.

## Content pipeline

Stories were drafted with Gemini and images generated with DALL·E, then converted offline to 768 px WebP. A Python validator checks that every element has exactly one stop and every referenced file exists. Nothing in the code assumes 18 elements, so the palace grows by editing JSON. The pure modules for grading, scheduling, and story markup are unit-tested with `node --test`.

## What I learned

The hard part wasn't the code. It was getting images that are absurd enough to stick but still clearly encode the right fact. Keeping content as data, with a validator in front of it, made that rewriting loop cheap.
