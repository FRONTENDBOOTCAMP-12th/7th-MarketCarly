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
          { name: '샛별배송', itemCount: '1' },
        ]
      },
      {
        title: '포장타입',
        selectedCategoryCount: 0,
        categories: [
          { name: '상온', itemCount: '1' },
          { name: '냉장', itemCount: '1' },
          { name: '냉동', itemCount: '1' },
        ]
      },
      {
        title: '가격',
        selectedCategoryCount: 0,
        categories: [
          { name: '6000원 미만', itemCount: '114' },
          { name: '6000원 ~ 30000원', itemCount: '116' },
          { name: '30000원 이상', itemCount: '116' },
        ]
      },
      {
        title: '혜택',
        selectedCategoryCount: 0,
        categories: [
          { name: '할인상품', itemCount: '379' },
        ]
      },
      {
        title: '유형',
        selectedCategoryCount: 0,
        categories: [
          { name: 'Kurly Only', itemCount: '379' },
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

    this.dispatchEvent(new CustomEvent('filter-changed', {
      detail: { title, selectedCategories },
      bubbles: true,
      composed: true,
    }));
  }
  
  handleClickReset() {
    const filterItems = this.shadowRoot.querySelectorAll('filter-item');

    filterItems.forEach(filterItem => filterItem.handleClickReset());
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
