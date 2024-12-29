import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/components/Cart/CartLocation.css?inline';

class CartLocation extends LitElement {
  render() {
    return html`
      <style>
        ${resetCSS}
        ${style}
      </style>
      <div class="cart__location">
        <div class="cart__location-info">
          <img
            src="/assets/icons/location.svg"
            alt="배송지 정보 아이콘"
            class="cart__location-image"
          />
          <span class="cart__location-title">배송지</span>
        </div>
        <p class="cart__location-detail">
          서울 중랑구 면목로 42길 11(행운빌딩) 603호
        </p>
        <p class="cart__location-delivery">샛별배송</p>
        <button type="button" class="cart__button-location-change">
          배송지 변경
        </button>
      </div>
    `;
  }
}

customElements.define('cart-location', CartLocation);
