function renderLayer(layer, index) {
  return `
    <article class="detail-section">
      <span class="detail-section-index">0${index + 1}</span>
      <h3>${layer.title}</h3>
      <p>${layer.body}</p>
    </article>
  `;
}

export function renderArtDetailPage(piece, content) {
  if (!piece) {
    return `
      <section class="page-banner reveal">
        <div>
          <p class="section-kicker">Art</p>
          <h1>Artwork not found.</h1>
        </div>
        <p class="page-banner-copy">Return to the art page to browse the collection.</p>
      </section>
    `;
  }

  return `
    <section class="detail-hero reveal">
      <div>
        <p class="section-kicker">Art / ${piece.label}</p>
        <h1>${piece.title}</h1>
        <p class="detail-subhead">${piece.description}</p>
      </div>
      <div class="detail-meta-panel">
        <span>${piece.year}</span>
        <span>${piece.medium}</span>
        <span>${piece.dimensions}</span>
      </div>
    </section>

    <section class="detail-layout reveal reveal-delay-1">
      <article class="detail-article">
        <div class="art-detail-canvas art-detail-${piece.variant}" aria-hidden="true"></div>
        <p>${piece.body.intro}</p>
        ${piece.body.layers.map((layer, index) => renderLayer(layer, index)).join("")}
        <p class="detail-outro">${piece.body.outro}</p>
        <a class="back-link" href="#/art">Back to the art collection</a>
      </article>

      <aside class="detail-aside">
        <div class="detail-note">
          <p class="section-kicker">Palette cue</p>
          <p>${piece.palette}</p>
        </div>
        <div class="detail-note detail-note-secondary">
          <p class="section-kicker">Related pieces</p>
          <ul>
            ${content.art
              .filter((item) => item.slug !== piece.slug)
              .slice(0, 2)
              .map((item) => `<li><a href="#/art/${item.slug}">${item.title}</a></li>`)
              .join("")}
          </ul>
        </div>
      </aside>
    </section>
  `;
}
