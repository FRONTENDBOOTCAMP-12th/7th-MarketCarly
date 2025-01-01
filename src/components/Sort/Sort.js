import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';
import baseCSS from '/src/Layout/base.ts';

class Sort extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get properties() {
    return {
      sortTitle: { type: String },
      isSelected: { type: Boolean },
    };
  }

  static get styles() {
    return [
      resetCSS, 
      baseCSS,
      css`
        button {
          font-family: 'Pretendard Variable', Pretendard, sans-serif;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }

        .sort-option {
          font-size: var(--text-base);
          font-weight: var(--font-semibold);
          color: var(--gray--300);

          &.isSelected {
            color: var(--content);
          }
        }
      `
    ];
  }

  handleClickSort() {
    this.dispatchEvent(
      new CustomEvent('sort-selected', {
        detail: {title: this.sortTitle},
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html`
      <button
        class="sort-option ${this.isSelected ? 'isSelected' : ''}"
        @click=${this.handleClickSort}
      >
        ${this.sortTitle}
      </button>
    `;
  }
}

customElements.define('sort-item', Sort);
