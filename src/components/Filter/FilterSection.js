import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';
import baseCSS from '/src/Layout/base.ts';
import '/src/components/Filter/Filter.js';

class FilterSection extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.filters = [
      {
        title: '배송',
        selectedCategoryCount: 0,
        categories: [
          { name: '샛별 배송', itemCount: '6' },
        ]
      },
      {
        title: '포장타입',
        selectedCategoryCount: 0,
        categories: [
          { name: '상온', itemCount: '3' },
          { name: '냉장', itemCount: '3' },
          { name: '냉동', itemCount: '2' },
        ]
      },
      {
        title: '가격',
        selectedCategoryCount: 0,
        categories: [
          { name: '6,000원 미만', itemCount: '3' },
          { name: '6,000원 ~ 30,000원', itemCount: '4' },
          { name: '30,000원 이상', itemCount: '1' },
        ]
      },
      {
        title: '혜택',
        selectedCategoryCount: 0,
        categories: [
          { name: '할인상품', itemCount: '4' },
        ]
      },
    ];
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

        .filters {
          display: flex;
          flex-direction: column;
          width: 13.75rem;
        }

        .filters__menu {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--gray--100);
          padding: 0.875rem 0;

          span {
            color: var(--content);
            font-size: var(--text-base);
            font-weight: var(--font-semibold);
          }
        }

        .reset {
          color: var(--gray--300);
          font-size: var(--text-xs);
        }
      `
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('filter-changed', this.handleFilterChanged.bind(this));
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('filter-changed', this.handleFilterChanged.bind(this));
  }
  
  handleFilterChanged(event) {
    const { title, selectedCategories } = event.detail;
  
    if (event.detail?.processed) return;
  
    this.dispatchEvent(new CustomEvent('filter-changed', {
      detail: { title, selectedCategories, processed: true },
      bubbles: true,
      composed: true,
    }));
  }
  
  handleClickReset() {
    const filterItems = this.shadowRoot.querySelectorAll('filter-item');

    filterItems.forEach(filterItem => filterItem.handleClickReset());

    window.location.reload();
  }

  render() {
    return html`
      <section class="filters">
        <div class="filters__menu">
          <span>필터</span>
          <button
            class="reset"
            @click=${this.handleClickReset}
          >초기화</button>
        </div>
        ${this.filters.map(
          filter => html`
            <filter-item
              .filterTitle=${filter.title}
              .selectedCategoryCount=${filter.selectedCategoryCount}
              .categories=${filter.categories}
            ></filter-item>
          `
        )}
      </section>
    `;
  }
}

customElements.define('filter-section', FilterSection);
