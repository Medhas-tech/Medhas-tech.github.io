import { renderHeader } from "./components/header.js";
import { renderNavigation } from "./components/navigation.js";
import { renderFooter } from "./components/footer.js";
import { renderHomePage } from "./pages/home.js";
import { renderBlogPage } from "./pages/blog.js";
import { renderBlogDetailPage } from "./pages/blogDetail.js";
import { renderArtPage } from "./pages/art.js";
import { renderArtDetailPage } from "./pages/artDetail.js";
import { renderNotFoundPage } from "./pages/notFound.js";
import { initRevealAnimations } from "./interactions/reveal.js";
import { initPaletteSwitcher } from "./interactions/paletteSwitcher.js";

function getRoute() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [section = "home", slug = ""] = raw.split("/");
  return { section: section || "home", slug };
}

function renderPage(route, content) {
  switch (route.section) {
    case "home":
      return renderHomePage(content);
    case "blog":
      if (route.slug) {
        const post = [content.blog.featured, ...content.blog.posts].find((item) => item.slug === route.slug);
        return renderBlogDetailPage(post, content);
      }

      return renderBlogPage(content);
    case "art":
      if (route.slug) {
        const piece = content.art.find((item) => item.slug === route.slug);
        return renderArtDetailPage(piece, content);
      }

      return renderArtPage(content);
    default:
      return renderNotFoundPage();
  }
}

export function bootstrapApp(root, content) {
  if (!root) {
    throw new Error("Root element was not found");
  }

  const paint = () => {
    const route = getRoute();
    root.innerHTML = `
      <div class="page-aurora" aria-hidden="true"></div>
      <div class="site-shell">
        ${renderHeader(content.person)}
        ${renderNavigation(route.section)}
        <main>
          ${renderPage(route, content)}
        </main>
        ${renderFooter(content.person)}
      </div>
    `;

    initRevealAnimations();
    initPaletteSwitcher(content.palettes);
  };

  paint();
  window.addEventListener("hashchange", paint);
}
