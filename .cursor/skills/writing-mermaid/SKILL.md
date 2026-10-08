---
name: writing-mermaid
description: >-
  Embed and style Mermaid diagrams in cghil.github.io writing posts. Use when
  adding or editing Mermaid sequence/flow diagrams in writing/*.html, fixing
  diagram layout/fit, or wiring Mermaid scripts into an article page.
---

# Writing Mermaid diagrams

## Embed in a post

1. Put the diagram in `.article-body` as a `<pre class="mermaid">` block (not a fenced markdown code block).
2. Load Mermaid only on pages that need it, before `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({
    startOnLoad: true,
    theme: "neutral",
    sequence: {
      actorMargin: 40,
      width: 130,
      boxMargin: 8,
      messageMargin: 30,
      noteMargin: 10
    }
  });
</script>
```

3. `writing.css` has no Mermaid rules right now. Add these when a post needs a diagram, and do not restyle diagrams as code blocks:

```css
.article-body .mermaid {
  width: min(100vw - 2rem, 56rem);
  max-width: none;
  margin: 1.5rem 0;
  margin-left: 50%;
  transform: translateX(-50%);
  overflow-x: auto;
  font-family: var(--font-sans);
  text-align: center;
}

.article-body pre.mermaid {
  border: none;
  background: transparent;
  padding: 0.5rem 0;
}
```

## HTML pitfalls (critical)

Mermaid source lives in HTML. The browser parses tags **before** Mermaid runs.

- **Never** put raw `<br/>`, `<br>`, or other HTML tags in diagram text. They become real DOM nodes and corrupt the chart (labels mash together, e.g. `snapshot Salt…`).
- Prefer **single-line** message labels. If a line must wrap, use Mermaid’s `<br>` only after escaping it as `&lt;br&gt;` — single-line is usually better.
- Avoid unescaped `<` / `>` in labels (`a < b`). Prefer words or ASCII alternatives.

## Fit the article column

Article measure is ~40rem (~640px). Sequence diagrams with 4 participants often need ~900px.

- Prefer **≤4 participants**; shorten display names (`participant Doc as DocumentService`).
- Keep message text short: `PATCH test(S) replace(S+A)`, not multi-line `skillMap` prose.
- Span notes across the full cast when they are scene-setting: `Note over Client,Doc: …`
- Rely on `.article-body .mermaid` breakout (`min(100vw - 2rem, 56rem)`) rather than crushing text.
- After editing, hard-refresh and confirm notes/labels do not overlap; if cramped, shorten labels before adding more CSS.

## Sequence diagram conventions

Use for request/response, concurrency, and retry flows:

```text
sequenceDiagram
    autonumber
    participant Client
    participant A as Request A
    participant Doc as DocumentService

    Note over Client,Doc: Starting state

    par Path A
        Client->>A: POST /resource (A)
        A->>Doc: Read
        Doc-->>A: Snapshot S
    and Path B
        Client->>A: POST /resource (B)
    end

    A->>Doc: PATCH test(S) replace(S+A)
    Doc-->>A: 200 OK

    alt Retry on conflict
        A->>Doc: Read
        Doc-->>A: Snapshot S'
        A->>Doc: PATCH test(S') replace(S'+A)
        Doc-->>A: 200 OK
    else No retry
        A-->>Client: 409 Conflict
    end
```

- Solid arrows `->>` for calls; dashed `-->>` for replies.
- Use `par` / `and` / `end` for true concurrency; `alt` / `else` / `end` for branches.
- Status codes in replies: `200 OK`, `409 Conflict`.
- Keep prose around the diagram; the chart should not carry the full explanation.

## Checklist before finishing

- [ ] Diagram is `<pre class="mermaid">` inside `.article-body`
- [ ] Page loads Mermaid CDN + `mermaid.initialize` (theme `neutral`)
- [ ] No raw HTML tags inside the Mermaid source
- [ ] Labels are short enough to read at article width
- [ ] Hard-refresh shows no overlapping notes/labels
