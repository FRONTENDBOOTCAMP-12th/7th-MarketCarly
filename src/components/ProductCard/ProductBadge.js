import { LitElement, html, css } from 'lit';
import baseCSS from '@/Layout/base';
import resetCSS from '@/Layout/resetCSS';

export class ProductBadge extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      text: { type: String },
    };
  }

  static get styles() {
    return [
      resetCSS,
      baseCSS,
      css`
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: var(--text-xs);
        }

        .badge--kurly-only {
          padding: 4px;
          background: var(--gray-100, #e1e1e1);
          color: var(--primary, #5f0080);
        }

        .badge--limit {
          padding: 4px;
          background: var(--gray-100, #e1e1e1);
          color: var(--content, #333333);
        }
      `,
    ];
  }

  render() {
    return html` <span class="badge badge--${this.type}">${this.text}</span> `;
  }
}

customElements.define('product-badge', ProductBadge);
