function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(value, fallback = "item") {
  const slug = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function setByPath(target, path, value) {
  const parts = path.split(".");
  let cursor = target;

  for (let index = 0; index < parts.length - 1; index += 1) {
    const key = parts[index];
    cursor = cursor[key];
  }

  cursor[parts[parts.length - 1]] = value;
}

function getCardTitle(type, index, item) {
  if (type === "featured") {
    return "Featured essay";
  }

  return `${type === "blog" ? "Post" : "Artwork"} ${index + 1}: ${item.title || "Untitled"}`;
}

function renderField({ label, path, value, textarea = false, placeholder = "", rows = 3 }) {
  const control = textarea
    ? `<textarea class="admin-input" data-path="${path}" rows="${rows}" placeholder="${escapeHTML(placeholder)}">${escapeHTML(value)}</textarea>`
    : `<input class="admin-input" data-path="${path}" type="text" value="${escapeHTML(value)}" placeholder="${escapeHTML(placeholder)}" />`;

  return `
    <label class="admin-field">
      <span>${label}</span>
      ${control}
    </label>
  `;
}

function renderBlogSection(post, pathPrefix, type, index) {
  const sectionPath = `${pathPrefix}.body.sections`;
  return `
    <article class="admin-card">
      <header class="admin-card-head">
        <div>
          <p class="section-kicker">${type === "featured" ? "Featured" : `Blog ${index + 1}`}</p>
          <h3>${escapeHTML(getCardTitle(type, index, post))}</h3>
        </div>
        ${type === "featured" ? "" : `<button class="admin-mini-button" type="button" data-admin-remove-blog="${index}">Remove</button>`}
      </header>

      <div class="admin-grid admin-grid-2">
        ${renderField({ label: "Title", path: `${pathPrefix}.title`, value: post.title, placeholder: "Post title" })}
        ${renderField({ label: "Slug", path: `${pathPrefix}.slug`, value: post.slug, placeholder: "short-url-slug" })}
        ${renderField({ label: "Category", path: `${pathPrefix}.category`, value: post.category, placeholder: "Healthcare" })}
        ${renderField({ label: "Date", path: `${pathPrefix}.date`, value: post.date, placeholder: "Apr 14, 2026" })}
        ${renderField({ label: "Read time", path: `${pathPrefix}.readTime`, value: post.readTime, placeholder: "5 min read" })}
        ${renderField({ label: "Tags", path: `${pathPrefix}.tags`, value: Array.isArray(post.tags) ? post.tags.join(", ") : "", placeholder: "tag one, tag two" })}
      </div>

      ${renderField({ label: "Excerpt", path: `${pathPrefix}.excerpt`, value: post.excerpt, textarea: true, rows: 2, placeholder: "Short summary" })}
      ${renderField({ label: "Callout", path: `${pathPrefix}.callout`, value: post.callout, textarea: true, rows: 2, placeholder: "Short pull quote" })}
      ${renderField({ label: "Intro", path: `${pathPrefix}.body.intro`, value: post.body?.intro, textarea: true, rows: 3, placeholder: "Opening paragraph" })}

      <div class="admin-subgroup">
        <div class="admin-subgroup-head">
          <span>Body sections</span>
        </div>
        <div class="admin-stack">
          ${post.body?.sections?.map((section, sectionIndex) => `
            <div class="admin-subcard">
              ${renderField({ label: `Section ${sectionIndex + 1} title`, path: `${sectionPath}.${sectionIndex}.title`, value: section.title, placeholder: "Section title" })}
              ${renderField({ label: `Section ${sectionIndex + 1} body`, path: `${sectionPath}.${sectionIndex}.body`, value: section.body, textarea: true, rows: 3, placeholder: "Section copy" })}
            </div>
          `).join("")}
        </div>
      </div>

      ${renderField({ label: "Outro", path: `${pathPrefix}.body.outro`, value: post.body?.outro, textarea: true, rows: 3, placeholder: "Closing paragraph" })}
    </article>
  `;
}

function renderArtSection(piece, index) {
  const layerPath = `art.${index}.body.layers`;
  return `
    <article class="admin-card">
      <header class="admin-card-head">
        <div>
          <p class="section-kicker">Artwork ${index + 1}</p>
          <h3>${piece.title || "Untitled artwork"}</h3>
        </div>
        <button class="admin-mini-button" type="button" data-admin-remove-art="${index}">Remove</button>
      </header>

      <div class="admin-art-preview-wrap">
        ${piece.image
          ? `<img class="admin-art-preview" src="${escapeHTML(piece.image)}" alt="Preview of ${escapeHTML(piece.title || "artwork")}" />`
          : `<div class="admin-art-preview admin-art-preview-empty">No photo yet</div>`}
        <label class="admin-field">
          <span>Upload photo</span>
          <input class="admin-input" type="file" accept="image/*" data-upload-art="${index}" />
        </label>
      </div>

      <div class="admin-grid admin-grid-2">
        ${renderField({ label: "Title", path: `art.${index}.title`, value: piece.title, placeholder: "Artwork title" })}
        ${renderField({ label: "Slug", path: `art.${index}.slug`, value: piece.slug, placeholder: "short-url-slug" })}
        ${renderField({ label: "Label", path: `art.${index}.label`, value: piece.label, placeholder: "Series 04" })}
        ${renderField({ label: "Year", path: `art.${index}.year`, value: piece.year, placeholder: "2026" })}
        ${renderField({ label: "Variant", path: `art.${index}.variant`, value: piece.variant, placeholder: "a" })}
        ${renderField({ label: "Medium", path: `art.${index}.medium`, value: piece.medium, placeholder: "Digital artwork" })}
        ${renderField({ label: "Dimensions", path: `art.${index}.dimensions`, value: piece.dimensions, placeholder: "1200 × 1600" })}
        ${renderField({ label: "Photo URL", path: `art.${index}.image`, value: piece.image, placeholder: "https://... or leave blank" })}
      </div>

      ${renderField({ label: "Description", path: `art.${index}.description`, value: piece.description, textarea: true, rows: 2, placeholder: "Short description" })}
      ${renderField({ label: "Palette note", path: `art.${index}.palette`, value: piece.palette, textarea: true, rows: 2, placeholder: "Palette description" })}
      ${renderField({ label: "Intro", path: `art.${index}.body.intro`, value: piece.body?.intro, textarea: true, rows: 3, placeholder: "Opening note" })}

      <div class="admin-subgroup">
        <div class="admin-subgroup-head">
          <span>Layers</span>
        </div>
        <div class="admin-stack">
          ${piece.body?.layers?.map((layer, layerIndex) => `
            <div class="admin-subcard">
              ${renderField({ label: `Layer ${layerIndex + 1} title`, path: `${layerPath}.${layerIndex}.title`, value: layer.title, placeholder: "Layer title" })}
              ${renderField({ label: `Layer ${layerIndex + 1} body`, path: `${layerPath}.${layerIndex}.body`, value: layer.body, textarea: true, rows: 3, placeholder: "Layer copy" })}
            </div>
          `).join("")}
        </div>
      </div>

      ${renderField({ label: "Outro", path: `art.${index}.body.outro`, value: piece.body?.outro, textarea: true, rows: 3, placeholder: "Closing note" })}
    </article>
  `;
}

function createBlogTemplate(index) {
  const number = index + 1;
  return {
    slug: `new-blog-post-${number}`,
    category: "New category",
    title: `New blog post ${number}`,
    excerpt: "Write a short summary here.",
    date: "Apr 2026",
    readTime: "3 min read",
    tags: ["Tag one", "Tag two"],
    callout: "Add a short callout.",
    body: {
      intro: "Start the post here.",
      sections: [
        { title: "Section one", body: "Write the first section." },
        { title: "Section two", body: "Write the second section." },
        { title: "Section three", body: "Write the third section." },
      ],
      outro: "Finish with a short closing note.",
    },
  };
}

function createArtTemplate(index) {
  const number = index + 1;
  return {
    slug: `new-artwork-${number}`,
    variant: "a",
    label: `Series ${String(number).padStart(2, "0")}`,
    year: "2026",
    title: `New artwork ${number}`,
    medium: "Digital artwork",
    dimensions: "1200 × 1600",
    description: "Write a short description here.",
    palette: "Describe the palette here.",
    image: "",
    body: {
      intro: "Start the artwork note here.",
      layers: [
        { title: "Layer one", body: "Describe the first layer." },
        { title: "Layer two", body: "Describe the second layer." },
        { title: "Layer three", body: "Describe the third layer." },
      ],
      outro: "Finish with a closing note.",
    },
  };
}

function renderBlogTab(content) {
  return `
    <section class="admin-section" data-admin-panel="blog">
      <div class="admin-section-head">
        <div>
          <p class="section-kicker">Blog</p>
          <h3>Posts</h3>
        </div>
        <button class="admin-button" type="button" data-admin-action="add-blog">Add blog post</button>
      </div>
      ${renderBlogSection(content.blog.featured, "blog.featured", "featured", 0)}
      <div class="admin-list">
        ${content.blog.posts.map((post, index) => renderBlogSection(post, `blog.posts.${index}`, "blog", index)).join("")}
      </div>
    </section>
  `;
}

function renderArtTab(content) {
  return `
    <section class="admin-section" data-admin-panel="art">
      <div class="admin-section-head">
        <div>
          <p class="section-kicker">Art</p>
          <h3>Works</h3>
        </div>
        <button class="admin-button" type="button" data-admin-action="add-art">Add artwork</button>
      </div>
      <div class="admin-list">
        ${content.art.map((piece, index) => renderArtSection(piece, index)).join("")}
      </div>
    </section>
  `;
}

function buildEditorMarkup(content, activeTab, statusMessage) {
  return `
    <div class="admin-toolbar">
      <div>
        <p class="section-kicker">Live editor</p>
        <h2>Update what the site publishes.</h2>
        <p class="admin-note">Edits stay in your browser until you publish them.</p>
      </div>
      <div class="admin-tabs" role="tablist" aria-label="Admin sections">
        <button
          class="admin-tab ${activeTab === "blog" ? "is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${activeTab === "blog"}"
          data-admin-tab="blog"
        >
          Blog
        </button>
        <button
          class="admin-tab ${activeTab === "art" ? "is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${activeTab === "art"}"
          data-admin-tab="art"
        >
          Artwork
        </button>
      </div>
      <div class="admin-toolbar-actions">
        <button class="admin-button" type="button" data-admin-action="reset">Reset to defaults</button>
        <button class="admin-button admin-button-primary" type="button" data-admin-action="save">Publish changes</button>
      </div>
      <div class="admin-status" data-admin-status>${statusMessage}</div>
    </div>

    ${activeTab === "blog" ? renderBlogTab(content) : renderArtTab(content)}
  `;
}

export function mountAdminEditor(root, content, actions) {
  let draft = clone(content);
  let activeTab = "blog";
  let statusMessage = "Working locally.";

  const render = () => {
    root.innerHTML = buildEditorMarkup(draft, activeTab, statusMessage);
    bind();
  };

  const updateField = (event) => {
    const target = event.target;
    const path = target.dataset.path;

    if (!path) {
      return;
    }

    if (target.tagName === "TEXTAREA" || target.type === "text") {
      setByPath(draft, path, target.value);

      if (path.endsWith(".title")) {
        const slugPath = path.replace(/\.title$/, ".slug");
        const slugValue = slugify(target.value, "item");
        const currentSlug = slugPath.split(".").reduce((accumulator, key) => accumulator && accumulator[key], draft);

        if (!currentSlug || String(currentSlug).startsWith("new-")) {
          setByPath(draft, slugPath, slugValue);
        }
      }
    }

    if (target.dataset.path.endsWith(".tags")) {
      setByPath(
        draft,
        path,
        target.value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      );
    }
  };

  const handleFileChange = async (event) => {
    const target = event.target;
    const index = Number(target.dataset.uploadArt);
    const file = target.files && target.files[0];

    if (!Number.isInteger(index) || !file) {
      return;
    }

    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

    draft.art[index].image = dataUrl;
    render();
  };

  const addBlogPost = () => {
    draft.blog.posts.push(createBlogTemplate(draft.blog.posts.length));
    statusMessage = "Draft updated.";
    render();
  };

  const addArtwork = () => {
    draft.art.push(createArtTemplate(draft.art.length));
    statusMessage = "Draft updated.";
    render();
  };

  const removeBlogPost = (index) => {
    draft.blog.posts.splice(index, 1);
    statusMessage = "Draft updated.";
    render();
  };

  const removeArtwork = (index) => {
    draft.art.splice(index, 1);
    statusMessage = "Draft updated.";
    render();
  };

  const publish = () => {
    actions.save(clone(draft));
    statusMessage = "Published locally.";
    window.dispatchEvent(new Event("contentchange"));
  };

  const reset = () => {
    draft = clone(actions.reset());
    activeTab = "blog";
    statusMessage = "Reset to defaults.";
    render();
  };

  const switchTab = (tab) => {
    if (tab !== "blog" && tab !== "art") {
      return;
    }

    activeTab = tab;
    render();
  };

  function bind() {
    root.querySelectorAll("[data-path]").forEach((control) => {
      control.addEventListener("input", updateField);
    });

    root.querySelectorAll("[data-upload-art]").forEach((control) => {
      control.addEventListener("change", handleFileChange);
    });

    root.querySelectorAll("[data-admin-action='save']").forEach((button) => {
      button.addEventListener("click", publish);
    });

    root.querySelectorAll("[data-admin-action='reset']").forEach((button) => {
      button.addEventListener("click", reset);
    });

    root.querySelectorAll("[data-admin-action='add-blog']").forEach((button) => {
      button.addEventListener("click", addBlogPost);
    });

    root.querySelectorAll("[data-admin-action='add-art']").forEach((button) => {
      button.addEventListener("click", addArtwork);
    });

    root.querySelectorAll("[data-admin-remove-blog]").forEach((button) => {
      button.addEventListener("click", () => removeBlogPost(Number(button.dataset.adminRemoveBlog)));
    });

    root.querySelectorAll("[data-admin-remove-art]").forEach((button) => {
      button.addEventListener("click", () => removeArtwork(Number(button.dataset.adminRemoveArt)));
    });

    root.querySelectorAll("[data-admin-tab]").forEach((button) => {
      button.addEventListener("click", () => switchTab(button.dataset.adminTab));
    });
  }

  render();
}
