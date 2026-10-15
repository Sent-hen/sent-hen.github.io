---
title: Word2Eq
project: word2eq
description: "A reproducible training pipeline and verified inference service for math word problems."
---

## The problem

Word2Eq began in 2024 as a prototype that didn't run. In 2026 I rebuilt it around one question: what does the system around a small model need so its outputs can be trusted, its training reproduced, and its service kept up under load?

```
"Paco had 26 cookies. He ate 9 of them. How many cookies are left?"
  → equation: 26 - 9   answer: 17   verified: true
```

## How it works

- **Model.** A 6.4M-parameter seq2seq Transformer translates the problem, with its numbers masked, into a prefix-notation equation. It trains in under 9 minutes on a CPU.
- **Valid by construction.** During decoding, a pushdown automaton tracks the equation grammar and masks any token that would make the output malformed or reference a number that isn't in the problem. Every answer is then computed and checked symbolically before it's returned.
- **Reproducible training.** Seeds are fixed, kernels deterministic, the data split is content-hashed, and batch order is derived from the seed and epoch. On SIGTERM the trainer checkpoints atomically mid-epoch, and a resumed run produces bit-identical weights.
- **Lineage.** Each artifact's model card records the config fingerprint, data SHA-256 hashes, git revision, and metrics.
- **Serving.** A FastAPI service micro-batches requests on a dedicated inference thread. A bounded queue sheds overload with a fast 503 and Retry-After, and deadlines propagate down to the batch.

## Results

| | Valid equations (unconstrained → constrained) | SVAMP answer accuracy |
|---|---|---|
| Base, 6.4M params | 97.4% → **100%** | 16.4% |
| Small, 1.4M params | 94.0% → **100%** | 15.6% |

SVAMP is an adversarial challenge set where the original paper reports about 20% for a vanilla Transformer. In-distribution validation accuracy is 73%. The model wasn't the goal; the system around it was.

On one laptop CPU the service holds 150 requests per second at 46 ms p50 and 73 ms p95.

## What's still open

The p99 at low load is about 330 ms, above the 250 ms SLO, and I haven't profiled it yet. Above 150 rps, client-side latency grows without bound, and I suspect the single-process load generator and GIL contention. I'm not counting the latency SLO as met until both are measured on Linux with a separate load host.
