import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';

class Filter extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.filterTitle = '카테고리';
    this.selectedFilterCount = '1';
    this.filterName = '샐러드 · 간편식';
    this.filterItemCount = '65';
  }

  static get properties() {
    return {
      filterTitle: { type: String },
      selectedFilterCount: { type: Number },
      filterName: { type: String },
      filterItemCount: { type: Number },
    };
  }

  static get styles() {
    return [
      resetCSS,
      css`
        button {
          font-family: 'Pretendard Variable', Pretendard, sans-serif;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }

        .filters {
          width: 13.75rem;
          display: flex;
          flex-direction: column;
          border-bottom: 0.0625rem solid var(--gray--100);
        }

        .filter {
          display: flex;
          justify-content: space-between;
          padding: 0.875rem 0;
        }

        .filter__info {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          span {
            font-weight: var(--font-semibold);
          }
        }

        .name {
          color: var(--content);
          font-size: var(--text-base);
        }

        .items {
          color: var(--gray--300);
          font-size: var(--text-xs);
        }

        .filter__dropdown {
          display: inline-block;
          width: 1.125rem;
          height: 1.125rem;
          background: url('/assets/icons/Arrow-down.svg');
          transition: transform 0.2s ease-in-out;

          &.isActive {
            transform: rotate(-180deg);
          }
        }

        .categories {
          display: none;

          &.isActive {
            display: block;
          }

          li {
            margin-top: 0.5rem;
            margin-bottom: 1rem;
          }

        }
        
        .category {
          display: flex;
          align-items: center;
          cursor: pointer;

          &.isSelected {
            .category__icon-check {
              background: url('/assets/icons/isChecked=true.svg');
            }
          }
        }

        .category__checkbox {
          position: absolute;
          appearance: none;
        }

        .category__icon-check {
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          background: url('/assets/icons/isChecked=false.svg') no-repeat
            center/cover;
          margin-right: 0.5rem;
          cursor: pointer;
        }

        .category__name {
          color: var(--content);
          font-size: var(--text-base);
          margin-right: 0.25rem;

          &:hover {
            color: var(--secondary);
          }
        }

        .category__items {
          color: var(--gray--300);
          font-size: var(--text-xs);
        }

        .more-category {
          display: none;

          &.isActive {
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--gray--300);
            font-weight: var(--font-semibold);
            margin-top: 0.375rem;
            margin-bottom: 1.125rem;
          }
        }

        .more-category__arrow {
          display: inline-block;
          width: 1.125rem;
          height: 1.125rem;
          background: url('/assets/icons/Arrow-right.svg');
        }
      `,
    ];
  }

  handleClickFilter() {
    const dropdown = this.shadowRoot.querySelector('.filter__dropdown');
    const categoryList = this.shadowRoot.querySelector('.categories');
    const moreCategory = this.shadowRoot.querySelector('.more-category');

    dropdown.classList.toggle('isActive');
    categoryList.classList.toggle('isActive');
    moreCategory.classList.toggle('isActive');
  }

  handleClickCategory() {
    const category = this.shadowRoot.querySelector('.category');

    category.classList.toggle('isSelected');
  }

  render() {
    return html`
      <div class="filters">
        <button 
          class="filter" 
          @click=${this.handleClickFilter}
        >
          <div class="filter__info">
            <span class="name">${this.filterTitle}</span>
            <span class="items">${this.selectedFilterCount}</span>
          </div>
          <span class="filter__dropdown"></span>
        </button>
        <ul class="categories">
          <li>
            <div 
              class="category"
              @click=${this.handleClickCategory}
            >
              <input class="category__checkbox" type="checkbox" id="checkbox" />
              <label class="category__icon-check" for="checkbox"></label>
              <span class="category__name">${this.filterName}</span>
              <span class="category__items">${this.filterItemCount}</span>
            </div>
          </li>
        </ul>
        <button class="more-category">
          <span class="more-category__text">카테고리 더 보기</span>
          <span class="more-category__arrow"></span>
        </button>
      </div>
    `;
  }
}

customElements.define('filter-item', Filter);
