---
title: Curriculum Vitae
permalink: /cv/
redirect_from: /experience/
description: "Curriculum vitae of Senthen Velmurugan"
---

<p class="small"><a href="{{ '/output/' | relative_url }}" class="muted">&larr; Output</a></p>

<header class="cv-head">
  <h1>Curriculum Vitae</h1>
  <p class="cv-name">Senthen Velmurugan</p>
  <p class="cv-contact small muted">Pacific Northwest / Texas · <a href="mailto:senthenvelmurugan@gmail.com">senthenvelmurugan@gmail.com</a> · <a href="https://github.com/Sent-hen">GitHub</a> · <a href="https://www.linkedin.com/in/senthen-velmurugan-989aa9222/">LinkedIn</a></p>
  <p class="cv-open">Open to FDSE roles in the Pacific Northwest / Texas</p>
  <p class="cv-pdf small"><a href="{{ '/assets/pdf/Senthen-Velmurugan-CV.pdf' | relative_url }}">PDF</a> <span class="muted">· full record</span></p>
</header>

<!-- Keep entries newest first. Dates are YYYY MM. -->

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
        <li>Joined the Generative AI team for a three-month internship to explore whether retrieval-augmented generation (RAG) could speed up the resolution of incoming customer cases.</li>
        <li>Proposed and built a multi-source RAG system that retrieves similar historical cases from the ticketing corpus, mines accepted solutions and discussions from the internal forum, and suggests next actions for the support engineer.</li>
        <li>Built the ingestion pipeline (document normalization, chunking, metadata tagging) with hybrid retrieval (vector + keyword, with a BM25 fallback) and cross-encoder re-ranking.</li>
        <li>Framed baselines first and compared alternatives with data (chunking strategies, embedding models, re-rankers); when an early version overfit to long threads, diagnosed it and retuned chunking and metadata filters to improve top-k precision.</li>
        <li>Implemented a light evaluation harness: offline retrieval-quality metrics, spot checks of suggestion helpfulness, and an A/B feedback loop with support agents.</li>
        <li>Added guardrails for privacy (tenant-scoped search, PII scrubbing) and safe prompting, and exposed the system through a documented API so other teams could integrate it.</li>
        <li>Took it from proof of concept to rollout, raising first-contact resolution 20% over 12 weeks of use; wrote design notes and worked directly with stakeholders throughout.</li>
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

{% comment %} Every project in _data/projects.yml, newest first; add one there and it shows here and on /projects/. {% endcomment %}
{% assign all = site.data.projects | sort: "start" | reverse %}
<ul class="entries">
{% for p in all %}
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title"><a href="{{ '/projects/' | relative_url }}#{{ p.slug }}">{{ p.title }}</a></span>
      <span class="entry-when">{{ p.start | replace: "-", " " }}</span>
    </div>
    <div class="entry-sub">{{ p.tags | join: ", " }}</div>
    <div class="entry-desc"><p>{{ p.summary }}</p></div>
    {% include project-links.html p=p %}
  </li>
{% endfor %}
</ul>

<h2 class="cv-section">Organizations</h2>

<ul class="entries">
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">Mensa</span>
      <span class="entry-when">2013 &ndash; Present</span>
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
