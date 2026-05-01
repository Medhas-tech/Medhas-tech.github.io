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
        <label class="palette-control" aria-label="Switch color palette">
          <select class="palette-toggle">
          </select>
          <span class="palette-arrow" aria-hidden="true">
            <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
              <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </label>
      </nav>
    </header>
  `;
}
 