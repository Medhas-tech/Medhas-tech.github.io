function renderPillars(pillars) {
  return pillars.map((pillar) => `<span>${pillar}</span>`).join("");
}

function renderCards(assets) {
  return assets
    .map(
      (asset) => `
        <img
          src="${asset.src}"
          alt="${asset.alt}"
          class="card ${asset.className} parallax-card"
        />
      `
    )
    .join("");
}

export function renderHero({ person, pillars, assets }) {
  return `
    <section class="hero reveal" id="top">
      <div class="hero-copy">
        <p class="eyebrow">Personal Website</p>
        <h1>${person.name.split(" ")[0]} <span>${person.name.split(" ")[1]}</span></h1>
        <p class="role">${person.role}</p>
        <p class="lead">
          Crafting thoughtful digital experiences with bold visual storytelling,
          strategic clarity, and human-centered design.
        </p>
        <div class="hero-tags">
          ${renderPillars(pillars)}
        </div>
      </div>

      <div class="hero-collage reveal reveal-delay-1" aria-label="Creative collage">
        ${renderCards(assets)}
      </div>
    </section>
  `;
}
