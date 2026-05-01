export function renderAdminPage() {
  return `
    <section class="admin-page">
      <div class="admin-shell">
        <div class="admin-shell-copy">
          <p class="section-kicker">Admin</p>
          <h1>Manage blog posts and artworks.</h1>
          <p class="admin-intro">
            Edit existing content, add new posts, and update artwork images. Changes are saved locally and published to the site.
          </p>
        </div>
        <div class="admin-root" data-admin-root></div>
      </div>
    </section>
  `;
}
