const heroImage = new URL("../../Assets/image.png", import.meta.url).href;

function getLocalTime() {
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Toronto",
  }).format(new Date());

  const zone = new Intl.DateTimeFormat(undefined, {
    timeZone: "America/Toronto",
    timeZoneName: "shortOffset",
  })
    .format(new Date())
    .split(" ")
    .pop();

  return `${time} (${zone})`;
}

export function renderHomePage(content) {
  const featuredArt = content.art[0];
  const latestPost = content.blog.posts[0] || content.blog.featured;

  return `
    <section class="hero hero-home reveal" id="top">
      <div class="hero-copy">
        <p class="eyebrow">Personal Website</p>
        <h1>${content.person.name.split(" ")[0]} <span>${content.person.name.split(" ")[1]}</span></h1>
        <p class="role">${content.person.role}</p>
        <p class="lead">
          ${content.person.description}
        </p>
        <div class="hero-actions">
          <a class="primary-link" href="#/blog">Read the blog</a>
          <a class="secondary-link" href="#/art">Explore the art room</a>
        </div>
      </div>

      <div class="hero-stage reveal reveal-delay-1" aria-label="Abstract creative composition">
        <div class="stage-ring">
          <img class="stage-image" src="${heroImage}" alt="Portrait of Medha Saraiya" />
        </div>
        <div class="stage-caption">
          <strong>${content.person.tagline}</strong>
          <span>${content.person.mission}</span>
        </div>
      </div>
    </section>

    <section class="statement reveal reveal-delay-1">
      <p>"${content.person.statement}"</p>
    </section>

    <section class="section-heading reveal reveal-delay-1">
      <div>
        <p class="section-kicker">At a glance</p>
        <h2>What to explore next.</h2>
      </div>
    </section>

    <section class="home-meta-grid reveal reveal-delay-2">
      <article class="home-meta-card">
        <p class="section-kicker">Location</p>
        <h3>Toronto, Canada</h3>
        <p>Eastern Time zone base for collaborations and scheduling.</p>
      </article>

      <article class="home-meta-card">
        <p class="section-kicker">Current time</p>
        <h3>${getLocalTime()}</h3>
        <p>Live Toronto time (America/Toronto, GMT offset shown).</p>
      </article>

      <article class="home-meta-card home-meta-featured">
        <p class="section-kicker">Featured art</p>
        <h3>${featuredArt.title}</h3>
        <p>${featuredArt.description}</p>
        <a class="meta-link" href="#/art/${featuredArt.slug}">View artwork</a>
      </article>

      <article class="home-meta-card home-meta-featured">
        <p class="section-kicker">Latest blog post</p>
        <h3>${latestPost.title}</h3>
        <p>${latestPost.excerpt}</p>
        <a class="meta-link" href="#/blog/${latestPost.slug}">Read post</a>
      </article>

      <article class="home-meta-card home-meta-contact">
        <p class="section-kicker">Contact</p>
        <h3>Let&apos;s connect</h3>
        <p>For collaborations, speaking, or project conversations.</p>
        <a class="primary-link" href="${content.person.linkedin}" target="_blank" rel="noreferrer">Contact on LinkedIn</a>
      </article>
    </section>
  `;
}
