function renderMetric(metric) {
  return `
    <article class="metric-card">
      <div class="metric-value">${metric.value}</div>
      <div class="metric-label">${metric.label}</div>
      <p>${metric.body}</p>
    </article>
  `;
}

function renderPrinciple(principle) {
  return `
    <article class="principle-card">
      <span>${principle.index}</span>
      <h3>${principle.title}</h3>
      <p>${principle.body}</p>
    </article>
  `;
}

export function renderHomePage(content) {
  return `
    <section class="hero hero-home reveal" id="top">
      <div class="hero-copy">
        <p class="eyebrow">Personal Website</p>
        <h1>${content.person.name.split(" ")[0]} <span>${content.person.name.split(" ")[1]}</span></h1>
        <p class="role">${content.person.role}</p>
        <p class="lead">
          ${content.person.description}
        </p>
        <div class="hero-actions">
          <a class="primary-link" href="#/blog">Read the blog</a>
          <a class="secondary-link" href="#/art">Explore the art room</a>
        </div>
      </div>

      <div class="hero-stage reveal reveal-delay-1" aria-label="Abstract creative composition">
        <div class="stage-ring"></div>
        <div class="stage-caption">
          <strong>${content.person.tagline}</strong>
          <span>${content.person.mission}</span>
        </div>
      </div>
    </section>

    <section class="statement reveal reveal-delay-1">
      <p>"${content.person.statement}"</p>
    </section>

    <section class="section-heading reveal reveal-delay-1">
      <div>
        <p class="section-kicker">What I bring</p>
        <h2>Design that feels calm, precise, and editorial.</h2>
      </div>
    </section>

    <section class="metrics-grid reveal reveal-delay-2">
      ${content.metrics.map((metric) => renderMetric(metric)).join("")}
    </section>

    <section class="principles-grid reveal reveal-delay-2">
      ${content.principles.map((principle, index) => renderPrinciple({ ...principle, index: String(index + 1).padStart(2, "0") })).join("")}
    </section>
  `;
}
