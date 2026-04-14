const NAV_ITEMS = [
  { href: "#/", label: "Home" },
  { href: "#/blog", label: "Blog" },
  { href: "#/art", label: "Art" },
];

export function renderNavigation(currentRoute) {
  return `
    <nav class="site-nav" aria-label="Primary">
      ${NAV_ITEMS.map((item) => {
        const active = currentRoute === item.href.replace("#/", "") || (currentRoute === "home" && item.href === "#/");
        return `<a class="nav-link ${active ? "is-active" : ""}" href="${item.href}">${item.label}</a>`;
      }).join("")}
    </nav>
  `;
}
