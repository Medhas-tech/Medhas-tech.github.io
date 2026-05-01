const STORAGE_KEY = "medha-palette";

function getTrackedTokens(palettes) {
  return Array.from(
    new Set(
      palettes.flatMap((palette) => Object.keys(palette.values || {}))
    )
  );
}

function getDefaultValues(tokens) {
  const styles = getComputedStyle(document.documentElement);
  const defaults = {};

  tokens.forEach((token) => {
    defaults[token] = styles.getPropertyValue(token).trim();
  });

  return defaults;
}

function applyPalette(palette, defaults) {
  Object.entries(defaults).forEach(([token, value]) => {
    document.documentElement.style.setProperty(token, value);
  });

  Object.entries(palette.values).forEach(([token, value]) => {
    document.documentElement.style.setProperty(token, value);
  });
}

export function initPaletteSwitcher(palettes) {
  const toggleButton = document.querySelector(".palette-toggle");
  const paletteControl = document.querySelector(".palette-control");

  if (!toggleButton || !paletteControl || palettes.length === 0) {
    return;
  }

  const trackedTokens = getTrackedTokens(palettes);
  const defaultValues = getDefaultValues(trackedTokens);

  toggleButton.innerHTML = palettes
    .map((palette) => `<option value="${palette.id}">${palette.name}</option>`)
    .join("");

  const saved = localStorage.getItem(STORAGE_KEY);
  let activeIndex = palettes.findIndex((item) => item.id === saved);

  if (activeIndex === -1) {
    activeIndex = 0;
  }

  applyPalette(palettes[activeIndex], defaultValues);
  toggleButton.value = palettes[activeIndex].id;

  toggleButton.addEventListener("change", (event) => {
    const next = palettes.find((palette) => palette.id === event.target.value);

    if (!next) {
      return;
    }

    activeIndex = palettes.indexOf(next);
    applyPalette(next, defaultValues);
    localStorage.setItem(STORAGE_KEY, next.id);
  });
}
