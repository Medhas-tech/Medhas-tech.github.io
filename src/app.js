import { renderHeader } from "./components/header.js";
import { renderNavigation } from "./components/navigation.js";
import { renderFooter } from "./components/footer.js";
import { renderHomePage } from "./pages/home.js";
import { renderBlogPage } from "./pages/blog.js";
import { renderBlogDetailPage } from "./pages/blogDetail.js";
import { renderArtPage } from "./pages/art.js";
import { renderArtDetailPage } from "./pages/artDetail.js";
import { renderNotFoundPage } from "./pages/notFound.js";
import { renderAdminPage } from "./pages/admin.js";
import { initRevealAnimations } from "./interactions/reveal.js";
import { initPaletteSwitcher } from "./interactions/paletteSwitcher.js";
import { mountAdminEditor } from "./interactions/adminEditor.js";
import { loadContent, resetContent, saveContent } from "./data/contentStore.js";

function getRoute() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, "");
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const secondLastSegment = pathSegments[pathSegments.length - 2];
  const isAdminPath =
    lastSegment === "admin" ||
    (lastSegment === "index.html" && secondLastSegment === "admin");

  if (isAdminPath) {
    return { section: "admin", slug: "" };
  }

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
    case "admin":
      return renderAdminPage(content);
    default:
      return renderNotFoundPage();
  }
}

export function bootstrapApp(root, content) {
  if (!root) {
    throw new Error("Root element was not found");
  }

  let currentContent = loadContent(content);

  const paint = () => {
    const route = getRoute();
    root.innerHTML = `
      <div class="page-aurora" aria-hidden="true"></div>
      <div class="site-shell">
        ${renderHeader(currentContent.person)}
        ${route.section === "admin" ? "" : renderNavigation(route.section)}
        <main>
          ${renderPage(route, currentContent)}
        </main>
        ${route.section === "admin" ? "" : renderFooter(currentContent.person)}
      </div>
    `;

    initRevealAnimations();
    initPaletteSwitcher(currentContent.palettes);

    if (route.section === "admin") {
      const adminRoot = root.querySelector("[data-admin-root]");

      if (adminRoot) {
        mountAdminEditor(adminRoot, currentContent, {
          save: (nextContent) => {
            currentContent = nextContent;
            saveContent(nextContent);
          },
          reset: () => {
            resetContent();
            currentContent = loadContent(content);
            saveContent(currentContent);
            return currentContent;
          },
        });
      }
    }
  };

  paint();
  window.addEventListener("hashchange", paint);
  window.addEventListener("contentchange", () => {
    currentContent = loadContent(content);
    paint();
  });
}
