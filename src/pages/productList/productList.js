import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';
import pb from '../../api/pocketbase.js';
// import baseCSS from '/src/Layout/base.ts';
import '/src/components/Sort/SortSection.js';
import '/src/components/Filter/FilterSection.js';
import '/src/components/Pagination/Pagination.js';
import '/src/components/ProductCard/ProductCard.js';

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
    this.addEventListener('category-changed', this.handleCategoryChanged.bind(this));
    this.addEventListener('page-changed', this.handlePageChanged.bind(this));

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
  
    switch (category) {
      case 'new':
        this.title = '신상품';
        this.sortOption = '신상품순';
        break;
      case 'best':
        this.title = '베스트';
        this.sortOption = '추천순';
        break;
      case 'sales':
        this.title = '알뜰쇼핑';
        this.sortOption = '낮은 가격순';
        break;
    }

    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('sort-changed', this.handleSortChanged.bind(this));
    this.removeEventListener('category-changed', this.handleCategoryChanged.bind(this));
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

  handleCategoryChanged(event) {
    const { title, selectedCategories, processed } = event.detail;
    if (processed) return;
  
    if (title) {
      if (!this.activeFilters[title]) {
        this.activeFilters[title] = [];
      }
  
      this.activeFilters[title] = selectedCategories;
  
      if (selectedCategories.length === 0) {
        delete this.activeFilters[title];
      }
    } else {
      this.activeFilters = {};
    }
  
    this.filteredProducts = this.products.filter(product => this.applyFilters(product));
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

    this.filteredProducts = this.products.filter(product => this.applyFilters(product));
    this.updatePaginatedProducts();

    const filterSection = this.shadowRoot.querySelector('filter-section');
    const filterItems = filterSection.shadowRoot.querySelectorAll('filter-item');

    filterItems.forEach((filterItem) => {
      if (filterItem.filterTitle === filterKey) {
        const categoryElements = filterItem.shadowRoot.querySelectorAll('.category');
        const categoryNames = filterItem.shadowRoot.querySelectorAll('.category__name');

        categoryNames.forEach((categoryName, index) => {
          if (categoryName.innerText === category) {
            categoryElements[index].classList.remove('isSelected');
            filterItem.selectedCategoryCount--;
          }
        });
      }
    });

    this.requestUpdate();
  }

  applyFilters(product) {
    return Object.entries(this.activeFilters).every(([filterKey, categories]) => {
      if (categories.length === 0) return true;
  
      if (filterKey === '포장타입') {
        return categories.some(category => category === product.product_type);
      }
      if (filterKey === '가격') {
        const price = product.discounted_price || product.price;
        return this.isPriceMatch(price, categories);
      }
      if (filterKey === '배송') {
        return categories.some(category => category === product.delivery_type);
      }
      if (filterKey === '혜택') {
        return categories.some(category => category === '할인상품' && product.discount_price);
      }
  
      return true;
    });
  }

  isPriceMatch(price, categories) {
    return (
      (categories.includes('6,000원 미만') && price < 6000) ||
      (categories.includes('6,000원 ~ 30,000원') && price >= 6000 && price < 30000) ||
      (categories.includes('30,000원 이상') && price >= 30000)
    );
  }

  
  handleSortChanged(event) {
    this.sortProducts(event.detail.title);
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
      <h1>${this.title}</h1>
  
      <div class="main-container">
        <filter-section></filter-section>
        <section class="products">
          <div class="sort">
            <span>총 ${this.filteredProducts.length}건</span>
            <sort-section aria-label="상품 정렬 옵션"></sort-section>
          </div>
            ${this.activeFilters && Object.keys(this.activeFilters).length > 0
              ? html`
                <div class="active-filters" aria-label="선택된 카테고리 리스트">
                  <div class="active-filter">
                    ${Object.entries(this.activeFilters).map(
                      ([filterKey, categories]) => categories.map(
                        (category) => html`
                          <span class="active-filter__name">${category}</span>
                          <button
                            class="active-filter__remove"
                            @click=${() => this.removeFilter(filterKey, category)}
                            aria-label="${category} 카테고리 선택 취소 버튼"
                          >
                            <img src="/assets/icons/Cancel.svg" alt="카테고리 선택 취소 아이콘" />
                          </button>
                        `
                      )
                    )}
                </div>
              `
            : ''}
          <div class="cards">
            <ul class="cards-list" aria-label="상품 리스트">
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
                      .discount_rate=${product.discount_rate || 0}
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
