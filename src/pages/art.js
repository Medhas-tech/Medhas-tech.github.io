function renderArtPiece(piece) {
  return `
    <a class="art-piece art-piece-${piece.variant} art-link" href="#/art/${piece.slug}">
      <div class="art-piece-header">
        <span>${piece.label}</span>
        <strong>${piece.year}</strong>
      </div>
      <h3>${piece.title}</h3>
      <p>${piece.description}</p>
      <div class="art-piece-visual" aria-hidden="true"></div>
    </a>
  `;
}

export function renderArtPage(content) {
  return `
    <section class="page-banner reveal">
      <div>
        <p class="section-kicker">Art</p>
        <h1>Color studies and playful compositions.</h1>
      </div>
      <p class="page-banner-copy">
        This page turns the inspiration from the reference images into original abstract compositions: bold blocks, layered shadows, and polished contrast.
      </p>
    </section>

    <section class="art-grid reveal reveal-delay-1">
      ${content.art.map((piece) => renderArtPiece(piece)).join("")}
    </section>

    <section class="art-lab reveal reveal-delay-2">
      <div class="art-lab-copy">
        <p class="section-kicker">Palette Lab</p>
        <h2>Elegant saturation with a tactile, poster-like edge.</h2>
        <p>${content.artLab}</p>
      </div>
      <div class="palette-board" aria-hidden="true">
        ${content.palettes
          .slice(0, 3)
          .map(
            (palette) => `
              <div class="palette-chip">
                <strong>${palette.name}</strong>
                <span>${palette.accent}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}
