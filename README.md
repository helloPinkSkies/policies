# policies

Static website hosted on GitHub Pages at [policies.getpinkskies.com](https://policies.getpinkskies.com) that lets users browse Pink Skies' policies and guides.

## What's inside

- `index.html` — single-page app shell (hero, navigation, footer).
- `assets/styles.css` — theme (white background, `#20182A` overlay, `#C98A9A` splash).
- `assets/app.js` — hash-based router that fetches Markdown from `raw_markdown/` and renders it with [marked](https://marked.js.org/).
- `404.html` — GitHub Pages SPA fallback. Also redirects legacy paths (e.g. `/privacy` → `/#/policies/privacy`).
- `raw_markdown/` — source content.
  - `policies/` — privacy policy, terms of service, AI transparency.
  - `guides/` — step-by-step user guides.

## Adding or editing content

1. Edit or add a Markdown file under `raw_markdown/policies/` or `raw_markdown/guides/`.
2. Register it in the `DOCS` object at the top of `assets/app.js` (title, description, file path, slug).
3. Commit and push — GitHub Pages will deploy automatically.

Markdown files should start with `# Pink Skies` followed by `## Document Title`; both are stripped on render because the hero already shows the title.

## Local preview

Any static server works:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## URLs

- `/` — landing page (lists policies and guides).
- `/#/policies` — policies index.
- `/#/policies/privacy` — privacy policy.
- `/#/policies/terms_of_service` — terms of service.
- `/#/policies/ai_transparency` — AI transparency policy.
- `/#/guides/delete_user_steps` — delete account guide.
- `/#/guides/delete_data_steps` — delete data guide.
