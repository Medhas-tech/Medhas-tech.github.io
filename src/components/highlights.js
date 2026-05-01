function renderHighlightCard(item) {
  const points = item.points
    ? `<ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>`
    : "";

  return `
    <article class="panel panel-${item.tone}">
      <h2>${item.title}</h2>
      <p>${item.body}</p>
      ${points}
    </article>
  `;
}

export function renderHighlights(content, imageAsset) {
  return `
    <section class="grid reveal reveal-delay-2">
      ${content.map((item) => renderHighlightCard(item)).join("")}
      <article class="panel panel-photo">
        <img src="${imageAsset.src}" alt="${imageAsset.alt}" />
      </article>
    </section>
  `;
}
