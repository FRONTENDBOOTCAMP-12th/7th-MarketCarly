import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';
import baseCSS from '/src/Layout/base.ts';
import '/src/components/Sort/Sort.js';

class SortSection extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.sortOptions = ['추천순', '신상품순', '판매량순', '혜택순', '낮은 가격순', '높은 가격순'];
    this.selectedIndex = 0;
  }

  static get styles() {
    return [
      resetCSS, 
      baseCSS,
      css`
        .sort-options {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .divider {
          display: inline-block;
          width: 0.0625rem;
          height: 0.625rem;
          background-color: var(--gray--300);
        }
      `
    ];
  }

  handleSortSelected(e) {
    const selectedTitle = e.detail.title;
    const newIndex = this.sortOptions.indexOf(selectedTitle);

    if (newIndex !== this.selectedIndex) {
      this.selectedIndex = newIndex;
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="sort-options">
        ${this.sortOptions.map(
          (title, index) => html`
            <sort-item 
              sortTitle="${title}"
              .isSelected=${index === this.selectedIndex}
              @sort-selected=${this.handleSortSelected}
            ></sort-item>
            ${index < this.sortOptions.length - 1
              ? html`<span class="divider"></span>`
              : ''}
          `
        )}
      </div>
    `;
  }
}

customElements.define('sort-section', SortSection);
