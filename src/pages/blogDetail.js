function renderSection(section, index) {
  return `
    <article class="detail-section">
      <span class="detail-section-index">0${index + 1}</span>
      <h3>${section.title}</h3>
      <p>${section.body}</p>
    </article>
  `;
}

export function renderBlogDetailPage(post, content) {
  if (!post) {
    return `
      <section class="page-banner reveal">
        <div>
          <p class="section-kicker">Blog</p>
          <h1>Post not found.</h1>
        </div>
        <p class="page-banner-copy">Return to the blog index to pick another essay.</p>
      </section>
    `;
  }

  return `
    <section class="detail-hero reveal">
      <div>
        <p class="section-kicker">Blog / ${post.category}</p>
        <h1>${post.title}</h1>
        <p class="detail-subhead">${post.excerpt}</p>
      </div>
      <div class="detail-meta-panel">
        <span>${post.date}</span>
        <span>${post.readTime}</span>
        <span>${post.tags.join(" · ")}</span>
      </div>
    </section>

    <section class="detail-layout reveal reveal-delay-1">
      <article class="detail-article">
        <p>
          ${post.body.intro}
        </p>
        ${post.body.sections.map((section, index) => renderSection(section, index)).join("")}
        <p class="detail-outro">${post.body.outro}</p>
        <a class="back-link" href="#/blog">Back to all posts</a>
      </article>

      <aside class="detail-aside">
        <div class="detail-note">
          <p class="section-kicker">Why it matters</p>
          <p>${post.callout}</p>
        </div>
        <div class="detail-note detail-note-secondary">
          <p class="section-kicker">More reading</p>
          <ul>
            ${content.blog.posts
              .filter((item) => item.slug !== post.slug)
              .slice(0, 2)
              .map((item) => `<li><a href="#/blog/${item.slug}">${item.title}</a></li>`)
              .join("")}
          </ul>
        </div>
      </aside>
    </section>
  `;
}
