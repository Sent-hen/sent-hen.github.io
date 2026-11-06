---
title: Curriculum Vitae
permalink: /cv/
redirect_from: /experience/
description: "Curriculum vitae of Senthen Velmurugan"
# The CV has every resume bullet word for word, plus more bullets and the projects that have outgrown one page.
# Bullets are cv: in _data/projects.yml; keep both lists the same as master-cv/CV.tex in the Resume repository.
projects: [pid-digitizer, dexpi-viewer, word2eq, campbell-woodworks, thai-sizzle]
additional: [metal-to-pod, personal-vpn, cs2-tradeup-analysis, personal-website, thousand-and-one-words]
---

<p class="small"><a href="{{ '/now/' | relative_url }}" class="muted">&larr; Now</a></p>

{% include cv-core.html title="Curriculum Vitae" pdf="Senthen-Velmurugan-CV.pdf" note="the full record" projects=page.projects full=true %}

<h2 class="cv-section">Additional projects</h2>

<ul class="entries">
{% for slug in page.additional %}{% include cv-project.html slug=slug full=true %}
{% endfor %}
</ul>

<h2 class="cv-section">Skills</h2>

<div class="entry-desc">
  <p><span class="muted">Languages</span> &nbsp;Python, JavaScript, Go, C/C++, SQL, Bash, HTML, CSS, LaTeX</p>
  <p><span class="muted">Frameworks</span> &nbsp;PyTorch, FastAPI, LangChain, OpenCV, pandas, NumPy, SciPy, XGBoost, Gradio, NetworkX, pytest, Jekyll</p>
  <p><span class="muted">Tools</span> &nbsp;Linux (Debian), Git, Docker, Kubernetes, Terraform, PostgreSQL, Pinecone, CI/CD, Autodesk Fusion, Jenkins, Prometheus, AWS, GitHub Actions, WireGuard, nftables, pfSense, Snort, Nessus, Wireshark</p>
</div>

<h2 class="cv-section">Organizations</h2>

<ul class="entries">
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">Artificial Intelligence Society</span>
      <span class="entry-when">2024 01 &ndash; 2024 05</span>
    </div>
    <div class="entry-sub">Semester Project Mentorship</div>
    <div class="entry-desc">
      <ul>
        <li>Cut prediction error 15% in product pricing forecasts by designing and implementing XGBoost and SARIMAX models, with feature selection and hyperparameter tuning</li>
        <li>Delivered a Gradio-based predictive analytics web application by mentoring a team of 5 underclassmen through weekly meetings, technical guidance, and code reviews</li>
      </ul>
    </div>
  </li>
  <li class="entry">
    <div class="entry-head">
      <span class="entry-title">Mensa</span>
      <span class="entry-when">2013 &ndash; Present</span>
    </div>
  </li>
</ul>
