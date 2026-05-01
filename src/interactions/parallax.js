export function initParallaxCards() {
  const collage = document.querySelector(".hero-collage");
  const cards = Array.from(document.querySelectorAll(".parallax-card"));

  if (!collage || cards.length === 0) {
    return;
  }

  const baseRotations = new Map();
  cards.forEach((card) => {
    const className = card.className;
    const initial = className.includes("card-a") ? -6 : className.includes("card-b") ? 4 : -3;
    baseRotations.set(card, initial);
  });

  collage.addEventListener("pointermove", (event) => {
    const rect = collage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cards.forEach((card, index) => {
      const intensity = (index + 1) * 10;
      const base = baseRotations.get(card) || 0;
      card.style.transform = `translate(${x * intensity}px, ${y * intensity}px) rotate(${base + x * 3}deg)`;
    });
  });

  collage.addEventListener("pointerleave", () => {
    cards.forEach((card) => {
      card.style.removeProperty("transform");
    });
  });
}
