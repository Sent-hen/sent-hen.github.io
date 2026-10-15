---
title: P&ID Digitizer
project: pid-digitizer
description: "Converts raster P&ID drawings into GraphML and DEXPI graphs with calibrated confidence and a review UI."
---

## The problem

Plants have decades of piping and instrumentation diagrams (P&IDs) that exist only as scans. To query them, check them, or feed them into a digital twin, they have to become graphs: symbols and junctions as nodes, pipes and signal lines as edges. Doing that by hand takes hours per sheet.

## How it works

1. **Detect symbols.** Sheets are rescaled to 7,000 px and cut into 1024² tiles with 256 px overlap. A fine-tuned torchvision Faster R-CNN finds symbols in each tile, and a class-aware merge joins boxes that span tile seams.
2. **Extract lines.** The pipeline deskews the sheet, crops the frame, suppresses text, and pulls out orthogonal pipe and signal lines.
3. **Build the graph.** Lines become edges between symbols, crossings, and the ports where pipes enter symbols.
4. **Score it.** Each edge gets a confidence calibrated to observed accuracy, so a 0.8 means about 80% of those edges are right.
5. **Review and export.** A web UI colors the graph by confidence and filters down to the uncertain parts for fixing. Corrections go to an append-only log, and the graph exports as GraphML or DEXPI 2.0.1 XML.

The service is a FastAPI job API with SQLite job state, packaged as a non-root CPU Docker image. `make demo` processes a bundled sample from a clean start.

## Results

Evaluated on the public PID2Graph benchmark using its official graph metrics, with each test split run once:

| Test set | Symbol mAP@0.5 | Edge F1 |
|---|---|---|
| Dataset-PID (75 sheets) | 0.997 | 0.915 |
| Synthetic (38 sheets) | 0.991 | 0.915 |
| OPEN100, real drawings (8 sheets) | 0.666 | 0.486 |

## Limits and next steps

The two strong numbers come from generated sheets with clean renders. On the only real drawings, edge F1 drops to 0.49, mainly because real drawings don't connect lines where they cross and the pipeline assumes they do. On generated sheets, 80% of the remaining misses are nodes 2 to 4 px off, not wrong topology. Next I'd add a classifier that tells junctions from crossings, gather more labeled real sheets, and retrain from the reviewers' correction log.
