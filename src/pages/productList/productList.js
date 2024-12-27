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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('sort-changed', this.handleSortChanged.bind(this));
    this.removeEventListener('filter-changed', this.handleFilterChanged.bind(this));
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

    this.requestUpdate();
  }

  handleFilterChanged(event) {
    const { title, selectedCategories } = event.detail;
  
    // 필터 조건 저장
    this.activeFilters = this.activeFilters || {};
    this.activeFilters[title] = selectedCategories;
  
    // 필터링 로직
    this.filteredProducts = this.products.filter(product => {
      let isMatch = true; // 기본값: 모든 조건을 만족한다고 가정
  
      // 포장타입 필터
      if (this.activeFilters['포장타입']?.length > 0) {
        if (!this.activeFilters['포장타입'].includes(product.product_type)) {
          isMatch = false; // 포장타입 조건 미충족
        }
      }
  
      // 가격 필터
      if (this.activeFilters['가격']?.length > 0) {
        const price = product.discounted_price || product.price;
        const isPriceMatch = 
          (this.activeFilters['가격'].includes('6000원 미만') && price < 6000) ||
          (this.activeFilters['가격'].includes('6000원 ~ 30000원') && price >= 6000 && price <= 30000) ||
          (this.activeFilters['가격'].includes('30000원 이상') && price > 30000);
        if (!isPriceMatch) {
          isMatch = false; // 가격 조건 미충족
        }
      }
  
      // 배송 필터
      if (this.activeFilters['배송']?.length > 0) {
        if (!this.activeFilters['배송'].includes(product.delivery_type)) {
          isMatch = false; // 배송 조건 미충족
        }
      }
  
      // 혜택 필터 (할인상품)
      if (this.activeFilters['혜택']?.includes('할인상품')) {
        if (!product.discount_price) {
          isMatch = false; // 할인상품 조건 미충족
        }
      }
  
      return isMatch; // 모든 조건 통과
    });
  
    this.requestUpdate();
  }

  handleSortChanged(event) {
    const sortOption = event.detail.title;
    this.sortProducts(sortOption);
  }

  sortProducts(option) {
    if (option === '추천순') {
      this.filteredProducts = [...this.products];
    } else if (option === '낮은 가격순') {
      this.filteredProducts.sort((a, b) => (a.discounted_price || a.price) - (b.discounted_price || b.price));
    } else if (option === '높은 가격순') {
      this.filteredProducts.sort((a, b) => (b.discounted_price || b.price) - (a.discounted_price || a.price));
    } else if (option === '신상품순') {
      this.filteredProducts.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

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

          <div class="cards">
            <ul class="cards-list">
              ${this.filteredProducts.map(
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

          <pagination-section></pagination-section>

        </section>

      </div>
    `;
  }
}

customElements.define('product-list', ProductList);
