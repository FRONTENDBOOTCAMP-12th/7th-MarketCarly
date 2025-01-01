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
        width: 560px;
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
    details: { attribute: true },
    productName: { type: String, attribute: true },
    price: { type: Number, attribute: true },
    originalPrice: { type: Number, attribute: true },
    quantity: { type: Number },
    totalPrice: { type: Number },
  };

  constructor() {
    super();
    this.details = [
      { title: '배송', info: '샛별배송' },
      { title: '판매자', info: '칼리' },
      { title: '포장타입', info: '상온 (종이포장)' },
      { title: '판매단위', info: '1봉' },
      { title: '중량/용량', info: '123g*4봉' },
      { title: '원산지', info: '상세페이지 별도표기' },
      { title: '알레르기정보', info: '대두, 밀, 쇠고기 함유' },
    ];
    this.productName = '[풀무원] 탱탱쫄면 (4개입)';
    this.price = 4580;
    this.originalPrice = 9960;
    this.quantity = 1;
    this.totalPrice = this.price;
  }

  handleQuantityChange(event) {
    this.quantity = event.detail.quantity;
    this.totalPrice = this.price * this.quantity;
    this.requestUpdate();
  }

  render() {
    return html`
      <ul class="product__detail-list">
        ${this.details.map(
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
            <p>${this.productName}</p>
            <div class="product__selection">
              <product-quantity
                .quantity="${this.quantity}"
                @quantity-change="${this.handleQuantityChange}"
              ></product-quantity>
              <div class="product__price-wrapper">
                <span class="product__original-price"
                  >${this.originalPrice.toLocaleString()}원</span
                >
                <span class="product__final-price"
                  >${(this.price * this.quantity).toLocaleString()}원</span
                >
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
