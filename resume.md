---
title: Resume
permalink: /resume/
description: "Resume of Senthen Velmurugan, Forward Deployed Software Engineer"
---

<p class="small"><a href="{{ '/output/' | relative_url }}" class="muted">&larr; Output</a></p>

<!-- The one-page resume, focused on Forward Deployed Software Engineer roles. It mirrors main/Resume.tex in
     the Resume repository; the full record (every role and skill) is the CV at /cv/. -->

<header class="cv-head">
  <h1>Resume</h1>
  <p class="cv-name">Senthen Velmurugan</p>
  <p class="cv-contact small muted">Pacific Northwest / Texas · <a href="mailto:senthenvelmurugan@gmail.com">senthenvelmurugan@gmail.com</a> · <a href="https://github.com/Sent-hen">GitHub</a> · <a href="https://www.linkedin.com/in/senthen-velmurugan-989aa9222/">LinkedIn</a></p>
  <p class="cv-open">Open to FDSE roles in the Pacific Northwest / Texas</p>
  <p class="cv-pdf small"><a href="{{ '/assets/pdf/Senthen-Velmurugan-Resume.pdf' | relative_url }}">PDF</a> <span class="muted">· one page</span></p>
</header>

<h2 class="cv-section">Skills</h2>

<div class="entry-desc">
  <p><span class="muted">Languages</span> &nbsp;Python, JavaScript, Go, C/C++, SQL, Bash</p>
  <p><span class="muted">Frameworks</span> &nbsp;PyTorch, FastAPI, LangChain, OpenCV, pandas</p>
  <p><span class="muted">Tools</span> &nbsp;Linux (Debian), Git, Docker, Kubernetes, Terraform, PostgreSQL, Pinecone, CI/CD, Autodesk Fusion</p>
</div>

<h2 class="cv-section">Experience</h2>

<ul class="entries">
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">Machine Learning Engineering Intern</span>
      <span class="entry-when">2024 05 &ndash; 2024 08</span>
    </div>
    <div class="entry-sub">KloudGin · Remote</div>
    <div class="entry-desc">
      <ul>
        <li>Took the Generative AI team's open question, whether RAG could speed up customer case resolution, from proposal to production rollout, raising first-contact resolution 20% over 12 weeks of use by support engineers.</li>
        <li>Built a multi-source RAG system that retrieves similar past cases from the ticketing corpus and accepted solutions from the internal forum, then suggests next actions, with an ingestion pipeline (normalization, chunking, metadata tagging), hybrid vector + BM25 retrieval, and cross-encoder re-ranking.</li>
        <li>Measured it with offline retrieval metrics and an A/B feedback loop with support agents; when it overfit to long threads, retuned chunking and metadata filters to raise top-k precision.</li>
        <li>Added tenant-scoped search, PII scrubbing, and safe prompting, and exposed it through a documented API for other teams to integrate.</li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">Cybersecurity and Systems Intern</span>
      <span class="entry-when">2023 05 &ndash; 2023 08</span>
    </div>
    <div class="entry-sub">GBC Computers · Mabank, TX</div>
    <div class="entry-desc">
      <ul>
        <li>Improved client network performance by monitoring with PRTG and tracing bottlenecks in Wireshark captures.</li>
        <li>Hardened client infrastructure by writing pfSense firewall rules, adding Snort intrusion detection, and deploying endpoint protection.</li>
        <li>Found and patched critical risks by running Nessus vulnerability assessments and validating findings with OpenVAS and manual audits.</li>
      </ul>
    </div>
  </li>
</ul>

<h2 class="cv-section">Projects</h2>

<ul class="entries">
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">Campbell Woodworks: storefront for a family woodshop</span>
      <span class="entry-when">2026</span>
    </div>
    <div class="entry-sub">Jekyll, HTML, CSS, Python</div>
    <div class="entry-desc">
      <ul>
        <li>Delivered a live storefront for a family woodshop whose work lived only in Facebook posts behind a login, so buyers can browse between farmers-market days with nothing for the shop to run or pay for.</li>
        <li>Built the site around how they sell (by phone, not checkout): one Markdown file per piece drives the shop, gallery, and detail pages, with category filters and call and email buttons, covering 23 pieces.</li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">P&amp;ID Digitizer: scanned engineering drawings to graphs</span>
      <span class="entry-when">2026</span>
    </div>
    <div class="entry-sub">Python, PyTorch, OpenCV, FastAPI, Docker</div>
    <div class="entry-desc">
      <ul>
        <li>Turned raster piping and instrumentation diagrams, the drawings that hold a plant's process logic, into queryable graphs (GraphML, DEXPI 2.0.1 XML) at 0.915 edge F1 and 0.997 symbol mAP@0.5 on a 75-sheet test split.</li>
        <li>Detected small symbols on 7,000 px sheets by tiling into overlapping 1024² crops with class-aware box merging across seams, fine-tuning a Faster R-CNN in under 2 GPU-hours on a laptop GPU.</li>
        <li>Shipped it as a FastAPI job service in a non-root Docker image, with calibrated per-edge confidence feeding a review UI that sends only doubtful edges to a person; strict mypy typing and 99 pytest cases in CI.</li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">DEXPI P&amp;ID Viewer</span>
      <span class="entry-when">2026</span>
    </div>
    <div class="entry-sub">JavaScript, Python, XML, SVG</div>
    <div class="entry-desc">
      <ul>
        <li>Built a zero-dependency, single-page viewer and validator for DEXPI 2.0.1 plant models that lays out diagrams with no stored coordinates from topology alone, and checks structure and the Core and Plant metamodel in the browser.</li>
        <li>Gave data pipelines a headless path with a Python CLI validator (lxml) running both XSD and metamodel checks.</li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">Word2Eq: reproducible seq2seq training and inference platform</span>
      <span class="entry-when">2026</span>
    </div>
    <div class="entry-sub">Python, PyTorch, FastAPI, Prometheus</div>
    <div class="entry-desc">
      <ul>
        <li>Rebuilt a non-functional prototype into a train, evaluate, and serve platform for a 6.4M-parameter Transformer; grammar-constrained decoding took valid equations from 97.4% to 100% on 1,000 SVAMP problems.</li>
        <li>Served 150 requests per second at 73 ms p95 on one laptop CPU by micro-batching behind a bounded queue that sheds overload with a fast 503, and made training preemption-safe with bit-identical resumes.</li>
      </ul>
    </div>
  </li>
</ul>

<h2 class="cv-section">Education</h2>

<ul class="entries">
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">M.S. Computer Science</span>
      <span class="entry-when">In progress · part-time</span>
    </div>
    <div class="entry-sub">Georgia Institute of Technology (OMSCS)</div>
  </li>
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">B.S. Computer Science</span>
      <span class="entry-when">Completed</span>
    </div>
    <div class="entry-sub">University of Texas at Dallas</div>
  </li>
</ul>
