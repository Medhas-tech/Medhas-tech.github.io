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
        <h1>Quiet studies in color and form.</h1>
      </div>
      <p class="page-banner-copy">
        Abstract pieces shaped by care, clarity, and restraint.
      </p>
    </section>

    <section class="art-grid reveal reveal-delay-1">
      ${content.art.map((piece) => renderArtPiece(piece)).join("")}
    </section>

    <section class="art-lab reveal reveal-delay-2">
      <div class="art-lab-copy">
        <p class="section-kicker">Palette Lab</p>
        <h2>Heritage tones with modern accents.</h2>
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
