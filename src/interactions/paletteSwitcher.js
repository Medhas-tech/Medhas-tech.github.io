const STORAGE_KEY = "medha-palette";

function applyPalette(palette) {
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

  toggleButton.innerHTML = palettes
    .map((palette) => `<option value="${palette.id}">${palette.name}</option>`)
    .join("");

  const saved = localStorage.getItem(STORAGE_KEY);
  let activeIndex = palettes.findIndex((item) => item.id === saved);

  if (activeIndex === -1) {
    activeIndex = 0;
  }

  applyPalette(palettes[activeIndex]);
  toggleButton.value = palettes[activeIndex].id;

  toggleButton.addEventListener("change", (event) => {
    const next = palettes.find((palette) => palette.id === event.target.value);

    if (!next) {
      return;
    }

    activeIndex = palettes.indexOf(next);
    applyPalette(next);
    localStorage.setItem(STORAGE_KEY, next.id);
  });
}
