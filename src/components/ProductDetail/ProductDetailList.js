import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';

// ProductDetail Component
export class ProductDetailList extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product__detail-list {
				max-width: 560px;
        width: 100%;
        padding: 20px 0 0;
      }

      .product__detail-item:first-child {
        border-top: 1px solid var(--gray--100);
      }

      .product__detail-item {
        display: flex;
        border-bottom: 1px solid var(--gray--100);
        padding: 16px 0;
      }

      .product__detail-title {
        width: 128px;
        font-size: var(--text-xs);
        font-weight: var(--font-semibold);
        color: var(--gray--400);
        line-height: var(--line-height-normal);
      }

      .product__detail-info {
        width: 100%;
        font-size: var(--text-xs);
        font-weight: var(--font-semibold);
        padding-right: 4px;
        color: var(--gray--400);
        line-height: var(--line-height-normal);
      }

			.product__selection-wrapper {
				border: 1px solid var(--gray--100);
				padding: 12px 16px;
			}

      .product__selection {
        padding-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .product__price-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--gray--400);
        font-size: var(--text-sm);
      }

      .product__original-price {
        text-decoration: line-through;
        color: var(--gray--400);
        font-weight: var(--font-regular);
      }

      .product__final-price {
        text-decoration: none;
        color: var(--content);
        font-weight: var(--font-semibold);
      }

      .product__total {
        text-align: right;
        padding: 28px 0;
        line-height: var(--line-height-normal);
      }

      .product__total p {
        font-size: var(--text-base);
        font-weight: var(--font-semibold);
      }

      .product__total-price {
        font-size: var(--text-3xl);
        font-weight: var(--font-semibold);
        padding-inline-start: 17px;
      }

      .product__reward {
        line-height: var(--line-height-normal);
        padding-block-start: 8px;
      }

      .product__reward-icon {
        padding: 4px 8px;
        border-radius: 12px;
        background-color: var(--accent--yellow);
        color: var(--white);
        font-size: 0.625rem;
        font-family: var(--font-regular);
        vertical-align: middle;
      }

      .product__reward-text {
        font-weight: var(--font-semibold);
        vertical-align: middle;
      }
    `,
  ];

  static properties = {
    // productId: { type: String },
    product: { type: Object },
    quantity: { type: Number },
    totalPrice: { type: Number },
  };

  constructor() {
    super();
    // this.productId = '';
    this.product = {};
    this.quantity = 1;
    this.totalPrice = 0;
  }

  connectedCallback() {
    // 부모로부터 클래스의 메서드 호출
    super.connectedCallback();

    // 초기 데이터가 있을 경우 총 금액 계산
    if (this.product && Object.keys(this.product).length > 0) {
      this.totalPrice = this.calculateTotalPrice();
    }
  }

  handleQuantityChange(event) {
    this.quantity = event.detail.quantity;
    this.totalPrice = this.calculateTotalPrice();
  }

  // 총 금액 계산
  calculateTotalPrice() {
    const price = this.product.price || 0;
    return price * this.quantity;
  }

  updated(changedProperties) {
    // product 또는 quantity가 변경될 때만 총 금액 재계산
    if (changedProperties.has('product')) {
      this.totalPrice = this.calculateTotalPrice();
    }
  }

  render() {
    const details = [
      { title: '배송', info: this.product.delivery_type || '정보 없음' },
      { title: '판매자', info: this.product.seller || '정보 없음' },
      { title: '포장타입', info: this.product.product_type || '정보 없음' },
      { title: '판매단위', info: this.product.selling_unit || '정보 없음' },
      { title: '중량/용량', info: this.product.weight_volume || '정보 없음' },
      { title: '원산지', info: this.product.origin || '정보 없음' },
      { title: '알레르기정보', info: this.product.allergy || '정보 없음' },
    ];

    const price = this.product.price || 0;
    const originalPrice = this.product.discount_price || 0;

    return html`
      <ul class="product__detail-list">
        ${details.map(
          (detail) => html`
            <li class="product__detail-item">
              <dt class="product__detail-title">${detail.title}</dt>
              <dd class="product__detail-info">${detail.info}</dd>
            </li>
          `
        )}
        <li class="product__detail-item">
          <dt class="product__detail-title">상품선택</dt>
          <dd class="product__detail-info">
            <div class="product__selection-wrapper">
              <p>${this.product.brand} ${this.product.title}</p>
              <div class="product__selection">
                <product-quantity
                  .quantity="${this.quantity}"
                  @quantity-change="${this.handleQuantityChange}"
                ></product-quantity>
                <div class="product__price-wrapper">
                  <span class="product__original-price"
                    >${originalPrice.toLocaleString()}원</span
                  >
                  <span class="product__final-price"
                    >${price.toLocaleString()}원</span
                  >
                </div>
              </div>
            </div>
          </dd>
        </li>
      </ul>
      <div class="product__total">
        <p>
          총 상품금액:
          <span class="product__total-price"
            >${this.totalPrice.toLocaleString()} 원</span
          >
        </p>
        <div class="product__reward">
          <span class="product__reward-icon">적립</span>
          <span class="product__reward-text">로그인 후, 적립 혜택 제공</span>
        </div>
      </div>
    `;
  }
}
customElements.define('product-detail-list', ProductDetailList);
