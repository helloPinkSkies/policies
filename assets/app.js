(function () {
  "use strict";

  const FORMSPREE_URL = "https://formspree.io/f/mjgpkvqw";

  const SUPPORT_TOPICS = [
    "General support",
    "Export data",
    "Something's not working",
    "App crashed or froze",
    "Issue with reflections or responses",
    "Something doesn't look right",
    "Other",
  ];

  const DOCS = {
    policies: {
      label: "Policies",
      hint: "Legal & transparency",
      items: [
        {
          slug: "privacy",
          title: "Privacy Policy",
          desc: "How we collect, use, store, and protect your personal data.",
          file: "raw_markdown/policies/privacy.md",
        },
        {
          slug: "terms_of_service",
          title: "Terms of Service",
          desc: "The terms that govern your use of the Pink Skies app.",
          file: "raw_markdown/policies/terms_of_service.md",
        },
        {
          slug: "ai_transparency",
          title: "AI Transparency",
          desc: "How AI is used inside Pink Skies, and where its limits lie.",
          file: "raw_markdown/policies/ai_transparency.md",
        },
      ],
    },
    guides: {
      label: "Guides",
      hint: "Step-by-step help",
      items: [
        {
          slug: "delete_user_steps",
          title: "Delete your account",
          desc: "Steps to permanently delete your Pink Skies user account.",
          file: "raw_markdown/guides/delete_user_steps.md",
        },
        {
          slug: "delete_data_steps",
          title: "Delete your data",
          desc: "Steps to permanently delete your journal entries and data.",
          file: "raw_markdown/guides/delete_data_steps.md",
        },
      ],
    },
  };

  const app = document.getElementById("app");
  const hero = document.getElementById("hero");
  const heroEyebrow = document.getElementById("hero-eyebrow");
  const heroHeading = document.getElementById("hero-heading");
  const heroSub = document.getElementById("hero-sub");

  document.getElementById("year").textContent = String(new Date().getFullYear());

  function findDoc(category, slug) {
    const cat = DOCS[category];
    if (!cat) return null;
    const doc = cat.items.find((d) => d.slug === slug);
    return doc ? { ...doc, category, categoryLabel: cat.label } : null;
  }

  function setHero({ eyebrow, heading, sub, compact }) {
    heroEyebrow.textContent = eyebrow;
    heroHeading.textContent = heading;
    heroSub.textContent = sub || "";
    heroSub.style.display = sub ? "" : "none";
    hero.classList.toggle("hero--compact", Boolean(compact));
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  function renderHome() {
    setHero({
      eyebrow: "Policies & Guides",
      heading: "All laid out for you",
      sub: "Read about how Pink Skies works, how we handle your data, and how to manage your account.",
    });
    document.title = "Pink Skies — Policies & Guides";

    const sections = Object.entries(DOCS)
      .map(([key, cat]) => {
        const cards = cat.items
          .map(
            (d) => `
            <a class="card" href="#/${key}/${d.slug}">
              <p class="card__kicker">${escapeHtml(cat.label)}</p>
              <h3 class="card__title">${escapeHtml(d.title)}</h3>
              <p class="card__desc">${escapeHtml(d.desc)}</p>
              <span class="card__cta">Read</span>
            </a>`
          )
          .join("");
        return `
          <section class="section" id="${key}">
            <div class="section__header">
              <h2 class="section__title">${escapeHtml(cat.label)}</h2>
              <span class="section__hint">${escapeHtml(cat.hint)}</span>
            </div>
            <div class="cards">${cards}</div>
          </section>`;
      })
      .join("");

    app.innerHTML = sections;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function renderCategory(category) {
    const cat = DOCS[category];
    if (!cat) return renderNotFound();
    setHero({
      eyebrow: cat.label,
      heading: cat.label,
      sub: cat.hint,
    });
    document.title = `${cat.label} — Pink Skies`;

    const cards = cat.items
      .map(
        (d) => `
        <a class="card" href="#/${category}/${d.slug}">
          <p class="card__kicker">${escapeHtml(cat.label)}</p>
          <h3 class="card__title">${escapeHtml(d.title)}</h3>
          <p class="card__desc">${escapeHtml(d.desc)}</p>
          <span class="card__cta">Read</span>
        </a>`
      )
      .join("");

    app.innerHTML = `
      <div class="crumbs">
        <a href="#/">Home</a>
        <span class="crumbs__sep">/</span>
        <span>${escapeHtml(cat.label)}</span>
      </div>
      <section class="section">
        <div class="cards">${cards}</div>
      </section>
    `;
    window.scrollTo({ top: 0 });
  }

  function renderSupport() {
    setHero({
      eyebrow: "Support",
      heading: "Contact Support",
      sub: "Tell us what's going on and we'll help.",
      compact: true,
    });
    document.title = "Contact Support — Pink Skies";

    const options = SUPPORT_TOPICS.map(
      (t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`
    ).join("");

    app.innerHTML = `
      <div class="crumbs">
        <a href="#/">Home</a>
        <span class="crumbs__sep">/</span>
        <span>Support</span>
      </div>
      <div class="support-panel">
        <form
          id="support-form"
          class="support-form"
          action="${FORMSPREE_URL}"
          method="POST"
        >
          <input type="hidden" name="_subject" value="Pink Skies support request" />
          <input type="text" name="_gotcha" class="support-form__honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />

          <div class="support-form__field">
            <label class="support-form__label" for="reason">How can we help?</label>
            <div class="support-form__select-wrap">
              <select class="support-form__select" id="reason" name="reason" required>
                <option value="" disabled selected>Select an option</option>
                ${options}
              </select>
            </div>
          </div>

          <div class="support-form__field">
            <label class="support-form__label" for="message">Tell us more:</label>
            <textarea
              class="support-form__textarea"
              id="message"
              name="message"
              rows="8"
              placeholder="Share the details..."
              required
            ></textarea>
          </div>

          <p class="support-form__note" id="support-form-status" role="status" aria-live="polite"></p>

          <button class="support-form__submit" type="submit" id="support-form-submit">Submit</button>
        </form>
      </div>`;

    bindSupportForm();
    window.scrollTo({ top: 0 });
  }

  function bindSupportForm() {
    const form = document.getElementById("support-form");
    if (!form || form.dataset.bound === "true") return;
    form.dataset.bound = "true";

    const status = document.getElementById("support-form-status");
    const submitBtn = document.getElementById("support-form-submit");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      status.className = "support-form__note";
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const detail = data.errors?.map((err) => err.message).join(" ") || "Something went wrong.";
          throw new Error(detail);
        }
        form.reset();
        status.textContent =
          "Thanks — your message has been sent. We'll get back to you as soon as we can.";
        status.classList.add("support-form__note--success");
      } catch (err) {
        status.textContent = String(err.message || err);
        status.classList.add("support-form__note--error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      }
    });
  }

  function renderNotFound() {
    setHero({
      eyebrow: "Not found",
      heading: "We couldn't find that page",
      sub: "The link may be broken or the page may have moved.",
      compact: true,
    });
    document.title = "Not found — Pink Skies";
    app.innerHTML = `
      <div class="article">
        <p>Try heading back to the <a href="#/">main page</a> to browse our policies and guides.</p>
      </div>`;
  }

  async function renderDoc(category, slug) {
    const doc = findDoc(category, slug);
    if (!doc) return renderNotFound();

    setHero({
      eyebrow: doc.categoryLabel,
      heading: doc.title,
      sub: "",
      compact: true,
    });
    document.title = `${doc.title} — Pink Skies`;

    app.innerHTML = `<div class="loading">Loading ${escapeHtml(doc.title)}…</div>`;

    try {
      const res = await fetch(doc.file, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      let md = await res.text();
      // Strip the first H1 "# Pink Skies" since hero shows the title
      md = md.replace(/^\s*#\s+Pink Skies\s*\n/i, "");
      // Strip the first H2 (doc title) since hero shows it
      md = md.replace(/^\s*##\s+.+\n/, "");

      if (!window.marked) {
        throw new Error("Markdown renderer not loaded");
      }
      window.marked.setOptions({ gfm: true, breaks: false });
      const html = window.marked.parse(md);

      app.innerHTML = `
        <div class="crumbs">
          <a href="#/">Home</a>
          <span class="crumbs__sep">/</span>
          <a href="#/${category}">${escapeHtml(doc.categoryLabel)}</a>
          <span class="crumbs__sep">/</span>
          <span>${escapeHtml(doc.title)}</span>
        </div>
        <article class="article">
          <div class="article-body">${html}</div>
          <a class="back-link" href="#/${category}">Back to ${escapeHtml(doc.categoryLabel)}</a>
        </article>
      `;
      window.scrollTo({ top: 0 });
    } catch (err) {
      const isFile = window.location.protocol === "file:";
      const message = isFile
        ? `Your browser blocked loading <code>${escapeHtml(doc.file)}</code> because the page is being opened directly from disk (<code>file://</code>). ` +
          `Serve the folder over HTTP to preview locally — e.g. run <code>python3 -m http.server 8000</code> from the project root and visit <code>http://localhost:8000</code>.`
        : `We couldn't load this document right now (${escapeHtml(
            String(err.message || err)
          )}). Please try again later.`;
      app.innerHTML = `
        <div class="crumbs">
          <a href="#/">Home</a>
          <span class="crumbs__sep">/</span>
          <a href="#/${category}">${escapeHtml(doc.categoryLabel)}</a>
        </div>
        <div class="article">
          <div class="error">${message}</div>
          <a class="back-link" href="#/${category}">Back to ${escapeHtml(doc.categoryLabel)}</a>
        </div>`;
    }
  }

  function route() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/").filter(Boolean);

    if (parts.length === 0) return renderHome();
    if (parts.length === 1 && parts[0] === "support") return renderSupport();
    if (parts.length === 1) return renderCategory(parts[0]);
    if (parts.length >= 2) return renderDoc(parts[0], parts[1]);
  }

  // SPA support: 404.html redirects unknown paths to ?p=<path>
  (function handleRedirect() {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    if (p) {
      const clean = p.replace(/^\/+/, "");
      history.replaceState(null, "", window.location.pathname + "#/" + clean);
    }
  })();

  window.addEventListener("hashchange", route);
  // Wait for marked to be available before first render of doc pages.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", route);
  } else {
    route();
  }
})();
