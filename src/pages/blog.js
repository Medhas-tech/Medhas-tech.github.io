function renderPost(post) {
  return `
    <a class="post-card post-link" href="#/blog/${post.slug}">
      <div class="post-meta">
        <span>${post.category}</span>
        <span>${post.readTime}</span>
      </div>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <div class="post-footer">
        <span>${post.date}</span>
        <span>${post.tags.join(" · ")}</span>
      </div>
    </a>
  `;
}

export function renderBlogPage(content) {
  const featured = content.blog.featured;
  return `
    <section class="page-banner reveal">
      <div>
        <p class="section-kicker">Blog</p>
        <h1>Notes on design, process, and creative systems.</h1>
      </div>
      <p class="page-banner-copy">
        A more personal layer of the site, built as an editorial space for thinking out loud about product design, visual rhythm, and making work with intention.
      </p>
    </section>

    <section class="featured-post reveal reveal-delay-1">
      <div class="featured-copy">
        <span class="featured-label">Featured essay</span>
        <h2>${featured.title}</h2>
        <p>${featured.excerpt}</p>
        <div class="featured-signature">
          <span>${featured.date}</span>
          <span>${featured.readTime}</span>
        </div>
        <a class="featured-link" href="#/blog/${featured.slug}">Read the featured essay</a>
      </div>
      <div class="featured-visual" aria-hidden="true">
        <div class="featured-shape featured-shape-a"></div>
      </div>
    </section>

    <section class="posts-grid reveal reveal-delay-2">
      ${content.blog.posts.map((post) => renderPost(post)).join("")}
    </section>
  `;
}
