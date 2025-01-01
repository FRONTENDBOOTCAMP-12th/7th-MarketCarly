import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/components/Cart/CartPrice.css?inline';

class CartPrice extends LitElement {
  static properties = {
    cartData: { type: Array },
    price: { type: Number },
    discount: { type: Number },
  };

  constructor() {
    super();
    this.cartData = [];
    this.price = 0;
    this.discount = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updatePriceAndDiscount();
    window.addEventListener(
      'cart-updated',
      this.updatePriceAndDiscount.bind(this)
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      'cart-updated',
      this.updatePriceAndDiscount.bind(this)
    );
  }

  updatePriceAndDiscount() {
    this.cartData = JSON.parse(localStorage.getItem('cart')) || [];
    let newPrice = 0;
    let newDiscount = 0;

    this.cartData.forEach((data) => {
      if (data.isChecked) {
        newPrice += data.price * data.quantity;
        if (data.originalPrice) {
          newDiscount += (data.originalPrice - data.price) * data.quantity;
        }
      }
    });

    this.price = newPrice;
    this.discount = newDiscount;
  }

  render() {
    return html`
      <style>
        ${resetCSS}
        ${style}
      </style>
      <div class="cart__price">
        <div class="cart__price-detail">
          <div class="cart__product cart__product-price">
            <span class="cart__product-price-label">상품금액</span>
            <span class="cart__product-price-detail"
              >${this.price.toLocaleString()}원</span
            >
          </div>

          <div class="cart__product cart__product-discount">
            <span class="cart__product-discount-label">상품할인금액</span>
            <span class="cart__product-discount-detail"
              >-${this.discount.toLocaleString()}원</span
            >
          </div>

          <div class="cart__product cart__product-delivery">
            <span class="cart__product-delivery-label">배송비</span>
            <span class="cart__product-delivery-detail"
              >+${this.price === 0 ? '0' : '3000'}원</span
            >
          </div>
        </div>

        <div class="cart__total">
          <div class="cart__total-price">
            <span class="cart__total-price-label">결제예정금액</span>
            <span class="cart__total-price-detail"
              >${this.price === 0
                ? '0'
                : (this.price + 3000).toLocaleString()}원</span
            >
          </div>

          <p class="cart__total-description">
            쿠폰/적립금은 주문서에서 사용 가능합니다.
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('cart-price', CartPrice);
