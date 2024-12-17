import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';

// ProductButton Component
export class ProductQuantity extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product__quantity {
        width: 84px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
        border: 1px solid var(--gray--200);
      }

      .product__quantity--minus,
      .product__quantity--plus {
        width: 30px;
        height: 30px;
        background-color: inherit;
        border: none;
        cursor: pointer;
      }

      .product__quantity--minus {
        background-image: url(/assets/icons/Minus.svg);
        background-position: -8px -46px;
      }

      .product__quantity--plus {
        background-image: url(/assets/icons/Plus.svg);
        background-position: -8px -8px;
      }
    `
  ];

  static properties = {
    quantity: { type: Number },
  };

  constructor() {
    super();
    this.quantity = 1;
  }

  updateQuantity(change) {
    this.quantity = Math.max(1, this.quantity + change);
    this.dispatchEvent(
      new CustomEvent('quantity-change', {
        detail: { quantity: this.quantity },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="product__quantity">
        <button
          class="product__quantity--minus"
          type="button"
          aria-label="구매 상품 수량 빼기"
          @click="${() => this.updateQuantity(-1)}"
        ></button>
        <span aria-label="구매 상품 수량">${this.quantity}</span>
        <button
          class="product__quantity--plus"
          type="button"
          aria-label="구매 상품 수량 추가하기"
          @click="${() => this.updateQuantity(1)}"
        ></button>
      </div>
    `;
  }
}
customElements.define('product-quantity', ProductQuantity);