import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import '../ProductCard/ProductCard.js';
import pb from '../../api/pocketbase.js';

export class TodayRecommendProducts extends LitElement {
  constructor() {
    super();
    this.sectionTitle = '이 상품 어때요?';
    this.firstPositionProducts = [];
    this.secondPositionProducts = [];
    this.isFetching = false;
  }

  static get properties() {
    return {
      sectionTitle: { type: String },
      position: { type: String },
      firstPositionProducts: { type: Array },
      secondPositionProducts: { type: Array },
    };
  }

  static get styles() {
    return [
      resetCSS,
      css`
        .today__inner {
          padding: 40px 0px;
          color: var(--content, #333);
        }
        .today__list {
          display: flex;
          gap: 1rem;
          list-style: none;
          padding: 0;
          justify-content: center;
        }
        .today__title {
          font-size: 24px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 28px;
          padding: 4px;
        }
      `,
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    if (this.isFetching) return;
    this.isFetching = true;

    try {
      const response = await pb.collection('Products').getFullList();

      const isValidProduct = (product) => {
        return (
          product?.title &&
          product?.img &&
          typeof product?.price === 'number' &&
          product?.price >= 0 &&
          (!product.discount_rate ||
            (typeof product.discount_rate === 'number' &&
              product.discount_rate >= 0 &&
              typeof product.discount_price === 'number' &&
              product.discount_price >= 0))
        );
      };

      const firstPositionProducts = response
        .filter((product) => product.position.includes('first'))
        .filter(isValidProduct);

      const secondPositionProducts = response
        .filter((product) => product.position.includes('second'))
        .filter(isValidProduct);

      const mapProductsToCard = (products) => {
        return products.map((product) => ({
          delivery: product.delivery_type === '샛별 배송' ? '샛별 배송' : null,
          title: product.title,
          brand: product.brand,
          description: product.description,
          image: pb.files.getURL(product, product.img),
          price:
            product.discount_rate > 0 ? product.discount_price : product.price,
          originalPrice: product.discount_rate > 0 ? product.price : null,
          isDiscounted: product.discount_rate > 0,
          discount_rate: product.discount_rate || 0,
          badges: product.badges || [],
        }));
      };

      this.firstPositionProducts = mapProductsToCard(firstPositionProducts);
      this.secondPositionProducts = mapProductsToCard(secondPositionProducts);
    } catch (error) {
      if (!error.message.includes('autocancelled')) {
        console.error('데이터 가져오기 실패:', error);
      }
    } finally {
      this.isFetching = false;
    }
  }

  handleProductClick(product) {
    let recentProducts =
      JSON.parse(localStorage.getItem('recentProducts')) || [];
    recentProducts = recentProducts.filter((p) => p.title !== product.title);
    recentProducts.push(product);
    if (recentProducts.length > 4) {
      recentProducts = recentProducts.slice(-4);
    }
    localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
    window.dispatchEvent(new CustomEvent('recentProductsUpdated'));
  }

  render() {
    const firstSectionTitle = '이 상품 어때요?';
    const secondSectionTitle = '놓치면 후회할 가격';

    const renderProducts = (products, position, sectionTitle) => html`
      <section class="today" data-position="${position}">
        <div class="today__inner">
          <header class="today__header">
            <h2 class="today__title">${sectionTitle}</h2>
          </header>
          <div class="today__content">
            <ul class="today__list">
              ${products.map((product) => {
                return html`
                  <li @click=${() => this.handleProductClick(product)}>
                    <product-card
                      .image=${product.image}
                      .delivery=${product.delivery}
                      .title=${product.title}
                      .brand=${product.brand}
                      .description=${product.description}
                      .price=${product.price}
                      .originalPrice=${product.originalPrice}
                      .isDiscounted=${product.isDiscounted}
                      .discount_rate=${product.discount_rate}
                      .badges=${product.badges}
                    ></product-card>
                  </li>
                `;
              })}
            </ul>
          </div>
        </div>
      </section>
    `;

    return html`
      ${renderProducts(this.firstPositionProducts, 'first', firstSectionTitle)}
      <line-banner></line-banner>
      ${renderProducts(
        this.secondPositionProducts,
        'second',
        secondSectionTitle
      )}
    `;
  }
}

customElements.define('today-recommend-products', TodayRecommendProducts);
