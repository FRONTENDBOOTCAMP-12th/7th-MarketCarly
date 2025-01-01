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
          position: relative;
        }

        .sort-options__icon {
          width: 0.875rem;
          height: 0.875rem;
          background: url('/assets/icons/Frame.svg') center no-repeat;
        }

        .sort-options__message {
          position: absolute;
          top: 1.875rem;
          width: 14.375rem;
          padding: 1.25rem;
          color: var(--gray--500);
          font-size: var(--text-xs);
          font-weight: var(--font-regular);
          background-color: var(--white);
          border: 0.0625rem solid var(--content);
          border-radius: 0.1875rem;
          z-index: 1;
          display: none;
        }

        .sort-options__icon:hover + .sort-options__message {
          display: block;
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

      this.dispatchEvent(new CustomEvent('sort-changed', {
        detail: { title: selectedTitle },
        bubbles: true,
        composed: true,
      }));

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
        
            ${title === '추천순'
              ? html`
                <span class="sort-options__icon"></span>
                <div class="sort-options__message">
                  소비자 인기도(판매량, 판매금액, 조회수 등), 상품 출시일, 수요 적합성, 상품 운영상 필요 등을 종합적으로 고려한 순서입니다.
                </div>
              `
              : ''
            }

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
