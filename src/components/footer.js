export function renderFooter(person) {
  return `
    <footer class="footer reveal reveal-delay-2">
      <div>
        <p>Designed for ${person.name}</p>
        <span>Built as a modular editorial portfolio.</span>
      </div>
      <a class="social-icon-link" href="${person.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6.94 8.5H3.89V20h3.05V8.5Zm-1.52-1.57c.98 0 1.78-.8 1.78-1.8 0-.99-.8-1.79-1.78-1.79-.99 0-1.79.8-1.79 1.79 0 1 .8 1.8 1.79 1.8ZM20.1 20h-3.04v-5.62c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.15 1.45-2.15 2.96V20H9.99V8.5h2.92v1.57h.04c.41-.78 1.43-1.61 2.95-1.61 3.15 0 3.73 2.07 3.73 4.76V20Z"/>
        </svg>
      </a>
    </footer>
  `;
}
