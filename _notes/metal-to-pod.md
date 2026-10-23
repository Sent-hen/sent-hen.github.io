---
title: "Metal-to-Pod: self-hosted CI/CD"
experiment: metal-to-pod   # must match the slug in _data/experiments.yml
written: "2026-10"   # YYYY-MM; orders /notes/
redirect_from: /projects/metal-to-pod/
description: "A self-hosted path from VMware VMs to a running Kubernetes pod, with SLOs and automatic rollback."
---

## The problem

Managed platforms make deployment look like one button. I wanted to know what that button actually does, so I built the whole chain myself, hypervisor to running pod, with no public cloud at any layer, and made every step something I could explain and rebuild.

## How it works

```
Windows host ── VMware Workstation ── Vagrant
  └─ 4 Ubuntu VMs: cp1, worker1, worker2, ci
       └─ kubeadm cluster (containerd, Calico) + Prometheus
            └─ git push ─► post-receive hook ─► Jenkins (config as code)
                 └─ docker build (tests gate) ─► private TLS registry
                      └─ kubectl apply (image pinned to commit SHA)
                           └─ smoke test fails? ─► automatic rollback
```

- **Infrastructure** is sized and networked from one env file that Vagrant and the shell provisioners both read.
- **The cluster** is plain kubeadm, so control-plane setup and node joins aren't hidden. The fixes dual-NIC VMs always need (kubelet node IP, Calico interface detection) are explicit and commented.
- **The pipeline** deploys with a namespace-scoped ServiceAccount rather than cluster-admin, then checks from outside the cluster that the new commit is the one actually serving.
- **The app** is a real logistics service, not hello-world: `delivery-promise` picks which of 3 distribution centers ships an order and when it arrives, across 18 lanes with carrier cutoffs and holidays.

## Running it like production

The service has two SLOs: 99.5% availability and 99% of requests under 300 ms over 30 days. I chose 99.5% rather than 99.9% on purpose. A single-control-plane lab can't honestly promise more, and the first registry reboot would spend a 99.9% budget. Multi-window burn-rate alerts back both SLOs and are unit-tested with promtool. Five runbooks cover the failures I drilled: image pull errors, a node going NotReady, a pipeline that doesn't trigger, a failed rollout, and SLO burn.

## What I learned

Most of the work was in the seams between layers: node IPs on multi-NIC VMs, trusting a private CA from containerd, and giving the deployer just enough RBAC. I wrote each trade-off down as an ADR (seven in all), with what production would do instead.
