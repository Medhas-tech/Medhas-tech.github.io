export function renderHeader(person) {
  return `
    <header class="topbar reveal">
      <div class="brand-stack">
        <div class="brand" aria-label="Medha Saraiya initials">MS</div>
        <div class="brand-copy">
          <strong>${person.name}</strong>
          <span>${person.role}</span>
        </div>
      </div>
      <nav class="top-actions" aria-label="Main actions">
        <button class="palette-toggle" type="button" aria-label="Switch color palette">
          Switch Palette
        </button>
      </nav>
    </header>
  `;
}
