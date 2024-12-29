import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/components/Cart/CartPrice.css?inline';

class CartPrice extends LitElement {
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
            <span class="cart__product-price-detail">40.680원</span>
          </div>

          <div class="cart__product cart__product-discount">
            <span class="cart__product-discount-label">상품할인금액</span>
            <span class="cart__product-discount-detail">-4,651원</span>
          </div>

          <div class="cart__product cart__product-delivery">
            <span class="cart__product-delivery-label">배송비</span>
            <span class="cart__product-delivery-detail">+3,000원</span>
          </div>
        </div>

        <div class="cart__total">
          <div class="cart__total-price">
            <span class="cart__total-price-label">결제예정금액</span>
            <span class="cart__total-price-detail">40,680원</span>
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
