import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';
import '../../components/ProductDetail/ProductDetailList';
import '../../components/ProductDetail/ProductQuantity';
import '../../components/ProductDetail/ProductActions';
import '../../components/ProductDetail/ProductNav';
import '../../components/ProductDetail/ProductCheckImages';
import '../../components/ProductDetail/ProductDescription';
import '../../components/ProductDetail/WhyCarly';
import { productState } from '../../components/ProductDetail/ProductState';

// ProductInfo Component + ProductDetailList
class ProductInfo extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product {
        max-width: 65.625rem;
        width: 100%;
        margin: 2.5rem auto 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .product__img img {
        width: 25rem;
        height: 32.125rem;
      }

      .product__info {
        max-width: 35rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .product__delivery {
        font-size: var(--text-xl);
        font-weight: var(--font-bold);
        color: var(--gray--500);
        line-height: var(--line-height-semitight);
      }

      .product__name {
        font-size: var(--text-3xl);
        font-weight: var(--font-semibold);
        color: var(--content);
        line-height: var(--line-height-normal);
      }

      .product__description {
        font-size: var(--text-base);
        font-weight: var(--font-regular);
        color: var(--gray--400);
        line-height: var(--line-height-semirelaxed);
      }

      .product__login-benefit {
        font-size: var(--text-base);
        font-weight: var(--font-semibold);
        color: var(--primary);
        line-height: var(--line-height-normal);
      }

      .product__price-wrapper .product__discount {
        font-size: var(--text-3xl);
        font-weight: var(--font-bold);
        margin-inline-end: 0.3rem;
        color: var(--accent--yellow);
        line-height: var(--line-height-normal);
      }

      .product__price-wrapper .product__price {
        font-size: var(--text-3xl);
        font-weight: var(--font-semibold);
        line-height: var(--line-height-normal);
      }

      .product__price-wrapper .product__original-price {
        text-decoration: line-through;
        color: var(--gray--400);
        line-height: var(--line-height-normal);
      }

      .product__price-wrapper .product__currency {
        font-size: var(--text-base);
        font-weight: var(--font-bold);
        line-height: var(--line-height-semitight);
      }
    `,
  ];

  // 컴포넌트에서 사용할 프로퍼티 정의
  static properties = {
    productId: { type: String }, // 상품 ID
    product: { type: Object }, // 상품 데이터
  };

  constructor() {
    super();
    // 상품 ID 초기화
    this.productId = '';
    // 상품 데이터를 초기화
    this.product = {};
  }

  // DOM에 컴포넌트가 연결될 때 호출되는 메서드
  connectedCallback() {
    super.connectedCallback();

    // URL에서 productId 추출
    const urlParts = window.location.pathname.split('/');
    const productId = urlParts[urlParts.length - 1]; // URL의 마지막 부분
    // console.log('현재 Product ID:', productId);

    if (productId && !isNaN(productId)) {
      this.productId = productId;
      productState.loadProduct(this.productId);
    } else {
      console.error('잘못된 productId:', productId);
    }

    // 상태 구독
    this.handleProductChange = (product) => {
      console.log('productState에서 넘겨 받은', product);
      this.product = product;
      this.requestUpdate();
    };

    productState.addListener(this.handleProductChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    productState.removeListener(this.handleProductChange);
  }

  render() {
    console.log('넘겨진 product 데이터', this.product);

    if (!this.product || Object.keys(this.product).length === 0) {
      return;
    }

    if (!this.product || !this.product.price) {
      return;
    }

    return html`
      <div class="product">
        <figure class="product__img">
          <img src="${this.product.img}" alt="${this.product.title}" />
        </figure>
        <div class="product__info">
          <p class="product__delivery">${this.product.delivery_type}</p>
          <h2 class="product__name">
            ${this.product.brand} ${this.product.title}
          </h2>
          <p class="product__description">${this.product.description}</p>
          <div class="product__price-wrapper">
            <div>
              <span class="product__discount"
                >${this.product.discount_rate}%</span
              >
              <span class="product__price"
                >${this.product.price.toLocaleString()} 원</span
              >
            </div>
            <p class="product__original-price">
              ${this.product.discount_price.toLocaleString()} 원
            </p>
          </div>
          <p class="product__login-benefit">
            로그인 후, 적립 혜택이 제공됩니다.
          </p>
          <product-detail-list .product="${this.product}"></product-detail-list>
          <product-actions .product="${this.product}"></product-actions>
        </div>
      </div>
    `;
  }
}
customElements.define('product-info', ProductInfo);
