---
title: DEXPI P&ID Viewer
experiment: dexpi-viewer   # must match the slug in _data/experiments.yml
written: "2026-10"   # YYYY-MM; orders /notes/
redirect_from: /projects/dexpi-viewer/
description: "A dependency-free browser viewer and validator for DEXPI 2.0.1 XML."
---

## The problem

DEXPI is the open exchange format for P&IDs, but a DEXPI file can describe a full plant model without any drawing coordinates. That makes it hard to look at, and hard to tell whether a file someone exported, or my own [P&ID Digitizer]({{ '/notes/pid-digitizer/' | relative_url }}) produced, is actually valid.

## How it works

Everything runs in a single HTML file with no dependencies. Files are parsed locally and nothing is uploaded.

- **Layout from topology.** The viewer follows pipe source and target references to build a graph, then lays it out. *Flow* is a Sugiyama-style layered layout, left to right in the pipe direction. *Network* uses stress majorization for meshes with arbitrary directions, such as digitized drawings. *Auto* chooses between them for each connected group.
- **Two levels of validation.** First the structure: well-formedness, ID syntax and uniqueness, and that every reference resolves. Then, with the generated metamodel loaded, every object is checked against the DEXPI Core and Plant 2.0.1 class definitions: does the class exist, is it abstract, are its properties declared with the right kind and target type, and are multiplicity bounds respected?
- **Tooling around it.** A Python script generates the compact metamodel table from the spec XML. A Python CLI runs the same checks plus XSD validation, for use in pipelines.

## Using it

Open `index.html`. It loads the official DEXPI reference P&ID by default. You can drag in your own file, click a symbol to see its data, references, and back-references, click a pipe to highlight its whole piping system, search by ID or tag, and export the view as SVG.

## What I learned

Laying out a diagram well when there are no coordinates is mostly about picking the right algorithm for each part of the graph. Process lines suit layers, and tangled meshes suit stress. Letting the viewer choose per connected group worked better than any single global setting.
