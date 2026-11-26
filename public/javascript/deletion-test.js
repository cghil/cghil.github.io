/**
 * Deletion Test — dependency-free interactive Web Component.
 * Visualizes what happens when you delete a deep module vs. a shallow module.
 */
class DeletionTest extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.deleted = false;
  }

  connectedCallback() {
    this.render();
  }

  renderDeepSvg(deleted) {
    const callers = [
      { label: "Caller A", x: 8, cx: 50 },
      { label: "Caller B", x: 108, cx: 150 },
      { label: "Caller C", x: 208, cx: 250 },
    ];

    if (!deleted) {
      return `
        <svg viewBox="0 0 300 250" role="img" aria-label="Deep module before deletion: three callers depend on one business module that encapsulates validation, rules, and transformation.">
          ${callers
            .map(
              (c) => `
            <rect class="caller" x="${c.x}" y="14" width="84" height="36" rx="6" />
            <text class="label" x="${c.cx}" y="36">${c.label}</text>
            <path class="edge" d="M${c.cx} 50 V70 L150 100" />
          `
            )
            .join("")}
          <circle class="dot" cx="150" cy="100" r="2.6" />
          <g class="appear">
            <rect class="deep-box" x="72" y="100" width="156" height="114" rx="8" />
            <text class="module-title" x="150" y="123">Business module</text>
            <rect class="deep-pill" x="87" y="134" width="126" height="20" rx="3" />
            <text class="pill-text" x="150" y="148">Validate</text>
            <rect class="deep-pill" x="87" y="159" width="126" height="20" rx="3" />
            <text class="pill-text" x="150" y="173">Apply rules</text>
            <rect class="deep-pill" x="87" y="184" width="126" height="20" rx="3" />
            <text class="pill-text" x="150" y="198">Transform</text>
          </g>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 300 250" role="img" aria-label="Deep module after deletion: validation, rules, and transformation are duplicated inside every caller.">
        ${callers
          .map(
            (c) => `
          <g class="appear">
            <rect class="caller" x="${c.x}" y="14" width="84" height="116" rx="6" />
            <text class="label" x="${c.cx}" y="36">${c.label}</text>
            <rect class="spread-box" x="${c.x + 8}" y="48" width="68" height="72" rx="4" />
            <text class="spread-text" x="${c.cx}" y="67">Validate</text>
            <text class="spread-text" x="${c.cx}" y="87">Apply rules</text>
            <text class="spread-text" x="${c.cx}" y="107">Transform</text>
          </g>
        `
          )
          .join("")}
        <g class="appear">
          <rect class="deleted-ghost" x="72" y="154" width="156" height="68" rx="8" />
          <text class="deleted-label" x="150" y="186">Module deleted</text>
          <path class="deleted-strike" d="M116 196 H184" />
        </g>
      </svg>
    `;
  }

  renderShallowSvg(deleted) {
    const callers = [
      { label: "Caller A", x: 8, cx: 50 },
      { label: "Caller B", x: 108, cx: 150 },
      { label: "Caller C", x: 208, cx: 250 },
    ];

    if (!deleted) {
      return `
        <svg viewBox="0 0 300 250" role="img" aria-label="Shallow module before deletion: three callers go through a thin wrapper that simply forwards calls to an existing API.">
          ${callers
            .map(
              (c) => `
            <rect class="caller" x="${c.x}" y="14" width="84" height="36" rx="6" />
            <text class="label" x="${c.cx}" y="36">${c.label}</text>
            <path class="edge" d="M${c.cx} 50 V70 L150 100" />
          `
            )
            .join("")}
          <circle class="dot" cx="150" cy="100" r="2.6" />
          <g class="appear">
            <rect class="shallow-box" x="72" y="100" width="156" height="48" rx="8" />
            <text class="module-title" x="150" y="128">Thin wrapper</text>
            <path class="edge" d="M150 148 V196" />
            <circle class="dot" cx="150" cy="196" r="2.6" />
          </g>
          <rect class="caller" x="92" y="196" width="116" height="36" rx="6" />
          <text class="label" x="150" y="218">Existing API</text>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 300 250" role="img" aria-label="Shallow module after deletion: callers talk directly to the existing API with no extra layer.">
        ${callers
          .map(
            (c) => `
          <rect class="caller" x="${c.x}" y="14" width="84" height="36" rx="6" />
          <text class="label" x="${c.cx}" y="36">${c.label}</text>
          <path class="edge appear" d="M${c.cx} 50 V76 L150 196" />
        `
          )
          .join("")}
        <circle class="dot appear" cx="150" cy="196" r="2.6" />
        <rect class="caller" x="92" y="196" width="116" height="36" rx="6" />
        <text class="label" x="150" y="218">Existing API</text>
      </svg>
    `;
  }

  render() {
    const d = this.deleted;

    const trashIcon = `
      <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </svg>
    `;

    const resetIcon = `
      <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    `;

    const warnIcon = `
      <svg class="verdict-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    `;

    const checkIcon = `
      <svg class="verdict-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    `;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --dt-ink: var(--ink, #152028);
          --dt-mist: var(--mist, #f3f6f8);
          --dt-slate: var(--slate, #5c6b76);
          --dt-line: var(--line, #d5dee5);
          --dt-accent: var(--pacific, #1f6f8b);
          --dt-accent-deep: var(--pacific-deep, #15566c);
          --dt-surface: var(--salt, #ffffff);
          --dt-warn: #9a4728;
          --dt-warn-bg: rgba(180, 92, 52, 0.11);
          --dt-warn-border: rgba(180, 92, 52, 0.55);
          --dt-good: #23734b;
          --dt-font: var(--font-sans, "IBM Plex Sans", system-ui, -apple-system, sans-serif);
          color: var(--dt-ink);
          font-family: var(--dt-font);
          font-size: 0.95rem;
          line-height: 1.45;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        .frame {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          padding: 1rem 1.05rem;
          border: 1px solid var(--dt-line);
          border-radius: 4px;
          background: var(--dt-mist);
        }

        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .title {
          margin: 0;
          font-size: 1.08rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--dt-ink);
        }

        .badge {
          padding: 0.18rem 0.6rem;
          border-radius: 999px;
          background: rgba(92, 107, 118, 0.12);
          color: var(--dt-slate);
          font-size: 0.78rem;
          font-weight: 500;
        }

        .badge[data-state="deleted"] {
          background: rgba(31, 111, 139, 0.12);
          color: var(--dt-accent-deep);
        }

        .panels {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .panel {
          display: flex;
          flex-direction: column;
          padding: 0.85rem 0.9rem;
          border: 1px solid var(--dt-line);
          border-radius: 4px;
          background: var(--dt-surface);
          min-width: 0;
        }

        .panel h3 {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--dt-ink);
        }

        .sub {
          margin: 0.15rem 0 0.5rem;
          color: var(--dt-slate);
          font-size: 0.84rem;
        }

        .diagram {
          width: 100%;
          flex: 1;
        }

        svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        svg text {
          font-family: var(--dt-font);
          text-anchor: middle;
        }

        .label {
          fill: var(--dt-ink);
          font-size: 12px;
          font-weight: 400;
        }

        .module-title {
          fill: var(--dt-ink);
          font-size: 12px;
          font-weight: 600;
        }

        .pill-text {
          fill: var(--dt-ink);
          font-size: 11px;
        }

        .caller {
          fill: rgba(92, 107, 118, 0.05);
          stroke: #9aa7b2;
          stroke-width: 1.1;
        }

        .edge {
          fill: none;
          stroke: #8b98a3;
          stroke-width: 1.35;
        }

        .dot {
          fill: #8b98a3;
        }

        .deep-box {
          fill: rgba(31, 111, 139, 0.1);
          stroke: var(--dt-accent);
          stroke-width: 1.25;
        }

        .deep-pill {
          fill: rgba(31, 111, 139, 0.13);
        }

        .shallow-box {
          fill: rgba(92, 107, 118, 0.07);
          stroke: #8b98a3;
          stroke-width: 1.2;
          stroke-dasharray: 4 3;
        }

        .spread-box {
          fill: var(--dt-warn-bg);
          stroke: var(--dt-warn-border);
          stroke-width: 1.1;
        }

        .spread-text {
          fill: var(--dt-ink);
          font-size: 10.5px;
        }

        .deleted-ghost {
          fill: rgba(92, 107, 118, 0.03);
          stroke: var(--dt-line);
          stroke-width: 1.2;
          stroke-dasharray: 4 3;
        }

        .deleted-label {
          fill: var(--dt-slate);
          font-size: 11.5px;
          opacity: 0.78;
        }

        .deleted-strike {
          stroke: var(--dt-line);
          stroke-width: 1.2;
        }

        .verdict {
          margin-top: 0.45rem;
          min-height: 2.75rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.15rem;
        }

        .verdict-title {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.84rem;
          font-weight: 600;
        }

        .verdict-title.keep {
          color: var(--dt-warn);
        }

        .verdict-title.remove {
          color: var(--dt-good);
        }

        .verdict-icon {
          width: 0.92rem;
          height: 0.92rem;
          flex: none;
        }

        .verdict-note {
          margin: 0;
          color: var(--dt-slate);
          font-size: 0.84rem;
        }

        .toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          width: 100%;
          padding: 0.62rem 1rem;
          border: 1px solid var(--dt-accent);
          border-radius: 4px;
          background: var(--dt-accent);
          color: var(--dt-surface);
          font: inherit;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 140ms ease, border-color 140ms ease;
        }

        .toggle:hover {
          border-color: var(--dt-accent-deep);
          background: var(--dt-accent-deep);
        }

        .toggle:focus-visible {
          outline: 2px solid var(--dt-accent);
          outline-offset: 2px;
        }

        .btn-icon {
          width: 0.95rem;
          height: 0.95rem;
          flex: none;
        }

        .caption {
          margin: 0;
          text-align: center;
          color: var(--dt-slate);
          font-size: 0.86rem;
        }

        .appear {
          animation: dt-appear 260ms ease-out;
        }

        @keyframes dt-appear {
          from {
            opacity: 0.3;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 640px) {
          .panels {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .appear {
            animation: none;
          }
          .toggle {
            transition: none;
          }
        }
      </style>

      <div class="frame">
        <div class="head">
          <p class="title">The deletion test</p>
          <span class="badge" data-state="${d ? "deleted" : "original"}">${
            d ? "After deletion" : "Original architecture"
          }</span>
        </div>

        <div class="panels" aria-live="polite">
          <section class="panel">
            <h3>Deep module</h3>
            <p class="sub">Encapsulates complexity</p>
            <div class="diagram">${this.renderDeepSvg(d)}</div>
            <div class="verdict">
              ${
                d
                  ? `<span class="verdict-title keep">${warnIcon}Keep the module</span>
                     <p class="verdict-note">Complexity spreads to every caller.</p>`
                  : `<p class="verdict-note">Business logic lives in one place.</p>`
              }
            </div>
          </section>

          <section class="panel">
            <h3>Shallow module</h3>
            <p class="sub">Adds indirection</p>
            <div class="diagram">${this.renderShallowSvg(d)}</div>
            <div class="verdict">
              ${
                d
                  ? `<span class="verdict-title remove">${checkIcon}Remove the module</span>
                     <p class="verdict-note">The unnecessary layer disappears.</p>`
                  : `<p class="verdict-note">Calls are simply forwarded.</p>`
              }
            </div>
          </section>
        </div>

        <button class="toggle" type="button" aria-pressed="${d}">
          ${d ? resetIcon : trashIcon}
          <span>${d ? "Reset architecture" : "Run deletion test"}</span>
        </button>

        <p class="caption">
          ${
            d
              ? "The value of an abstraction is revealed by what happens when you remove it."
              : "What happens to the complexity if we delete each module?"
          }
        </p>
      </div>
    `;

    const button = this.shadowRoot.querySelector(".toggle");
    button.addEventListener("click", () => {
      this.deleted = !this.deleted;
      this.render();
      this.shadowRoot.querySelector(".toggle").focus();
    });
  }
}

if (!customElements.get("deletion-test")) {
  customElements.define("deletion-test", DeletionTest);
}
