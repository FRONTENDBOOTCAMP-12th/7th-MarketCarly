import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';
import pb from '../../api/pocketbase.js';
// import baseCSS from '/src/Layout/base.ts';
import '/src/components/Sort/SortSection.js';
import '/src/components/Filter/FilterSection.js';
import '/src/components/Pagination/Pagination.js';
import '/src/components/ProductCard/ProductCard.js';
// import '/src/styles/base.css';

class ProductList extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isFetching = false;
    this.products = [];
    this.filteredProducts = [];
    this.paginatedProducts = [];
    this.currentPage = 1;
    this.itemsPerPage = 6;
    this.activeFilters = {};
  }

  static get styles() {
    return [
      resetCSS, 
      // baseCSS,
      css`
        h1 {
          margin: 3rem 0;
          text-align: center;
          font-size: var(--text-2xl);
          font-weight: var(--font-semibold);
          color: var(--black);
        }

        .main-container {
          display: grid;
          grid-template-columns: 1fr 3fr;
          gap: 2.9375rem;
          padding: 0 12.5rem;
          color: var(--content);
        }

        .products {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 5rem;
        }

        .sort {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--text-base);
          font-weight: var(--font-semibold);
        }

        .active-filter {
          display: flex;
          align-items: center;
          background-color: none;
          border: 0.0625rem solid var(--gray--100);
          padding: 1.25rem;
        }

        .active-filter__name {
          color: var(--secondary);
          font-size: var(--text-sm);
        }

        .active-filter__remove {
          width: 30px;
          height: 30px;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          margin-right: 1.25rem;
        }

        .cards-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          row-gap: 1.5rem;
        }
      `
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchProducts();
    this.addEventListener('sort-changed', this.handleSortChanged.bind(this));
    this.addEventListener('filter-changed', this.handleFilterChanged.bind(this));
    this.addEventListener('page-changed', this.handlePageChanged.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('sort-changed', this.handleSortChanged.bind(this));
    this.removeEventListener('filter-changed', this.handleFilterChanged.bind(this));
    this.removeEventListener('page-changed', this.handlePageChanged.bind(this));
  }

  async fetchProducts() {
    this.isFetching = true;
    const response = await pb.collection('products').getFullList();

    this.products = response.map((product) => ({
      ...product,
      image: pb.files.getURL(product, product.img),
    }));

    this.filteredProducts = [...this.products];
    this.isFetching = false;

    this.updatePaginatedProducts();

    this.requestUpdate();
  }

  handleFilterChanged(event) {
    const { title, selectedCategories, processed } = event.detail;

    if (processed) return;
  
    if (!this.activeFilters[title]) {
      this.activeFilters[title] = [];
    }

    selectedCategories.forEach((category) => {
      if (!this.activeFilters[title].includes(category)) {
        this.activeFilters[title].push(category);
      }
    });

    if (selectedCategories.length === 0) {
      delete this.activeFilters[title];
    }
  
    this.filteredProducts = this.products.filter(product => {
      let isMatch = true;
  
      if (this.activeFilters['포장타입']?.length > 0) {
        if (!this.activeFilters['포장타입'].includes(product.product_type)) {
          isMatch = false;
        }
      }
  
      if (this.activeFilters['가격']?.length > 0) {
        const price = product.discounted_price || product.price;
        const isPriceMatch = 
          (this.activeFilters['가격'].includes('6,000원 미만') && price < 6000) ||
          (this.activeFilters['가격'].includes('6,000원 ~ 30,000원') && price >= 6000 && price < 30000) ||
          (this.activeFilters['가격'].includes('30,000원 이상') && price >= 30000);
        if (!isPriceMatch) {
          isMatch = false;
        }
      }
  
      if (this.activeFilters['배송']?.length > 0) {
        if (!this.activeFilters['배송'].includes(product.delivery_type)) {
          isMatch = false;
        }
      }
  
      if (this.activeFilters['혜택']?.includes('할인상품')) {
        if (!product.discount_price) {
          isMatch = false;
        }
      }
  
      return isMatch;
    });
  
    this.currentPage = 1;
    this.updatePaginatedProducts();

    this.requestUpdate();
  }

  removeFilter(filterKey, category) {
    this.activeFilters[filterKey] = this.activeFilters[filterKey].filter(
      (item) => item !== category
    );

    if (this.activeFilters[filterKey].length === 0) {
      delete this.activeFilters[filterKey];
    }

    this.handleFilterChanged({
      detail: {
        title: filterKey,
        selectedCategories: this.activeFilters[filterKey] || [],
      },
    });
    
    this.requestUpdate();
  }
  
  handleSortChanged(event) {
    const sortOption = event.detail.title;
    this.sortProducts(sortOption);

    this.currentPage = 1;
    this.updatePaginatedProducts();
  }

  handlePageChanged(event) {
    this.currentPage = event.detail.currentPage;
    this.updatePaginatedProducts();
  }

  sortProducts(option) {
    if (option === '추천순') {
      this.filteredProducts = [...this.products];
    } else if (option === '낮은 가격순') {
      this.filteredProducts.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
    } else if (option === '높은 가격순') {
      this.filteredProducts.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
    } else if (option === '신상품순') {
      this.filteredProducts.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    this.updatePaginatedProducts();
    this.requestUpdate();
  }

  updatePaginatedProducts() {
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIdx, endIdx);
    this.requestUpdate();
  }

  render() {
    return html`
      <h1>베스트</h1>
  
      <div class="main-container">
        <filter-section></filter-section>
        <section class="products">
          <div class="sort">
            <span>총 ${this.filteredProducts.length}건</span>
            <sort-section></sort-section>
          </div>
            ${this.activeFilters && Object.keys(this.activeFilters).length > 0
              ? html`
                <div class="active-filters">
                  <div class="active-filter">
                    ${Object.entries(this.activeFilters).map(
                      ([filterKey, categories]) => categories.map(
                        (category) => html`
                          <span class="active-filter__name">${category}</span>
                          <button
                            class="active-filter__remove"
                            @click=${() => this.removeFilter(filterKey, category)}
                          >
                            <img src="/assets/icons/Cancel.svg" />
                          </button>
                        `
                      )
                    )}
                </div>
              `
            : ''}
          <div class="cards">
            <ul class="cards-list">
              ${this.paginatedProducts.map(
                (product) => html`
                  <li>
                    <product-card
                      .image=${product.image}
                      .delivery=${product.delivery_type}
                      .title=${`[${product.brand}] ${product.title}`}
                      .price=${product.discount_price || product.price || 0}
                      .originalPrice=${product.price || 0}
                      .isDiscounted=${!!product.discount_price}
                      .discount=${product.discount_rate || 0}
                      .description=${product.description}
                      .badges=${product.badges || []}
                    ></product-card>
                  </li>
                `
              )}
            </ul>
          </div>
          <pagination-section
            .totalItems=${this.filteredProducts.length}
            .itemsPerPage=${this.itemsPerPage}
            .currentPage=${this.currentPage}
            @page-changed=${this.handlePageChanged}
          ></pagination-section>
        </section>
      </div>
    `;
  }
  
}

customElements.define('product-list', ProductList);
