import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/components/Cart/CartLocation.css?inline';

class CartLocation extends LitElement {
  static properties = {
    authLocation: { type: String },
  };

  constructor() {
    super();
    this.authLocation = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.getLocation();
  }

  getLocation() {
    const auth = JSON.parse(localStorage.getItem('auth') || '');
    const { user } = auth;
    this.authLocation = user.address;
  }

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
        <p class="cart__location-detail">${this.authLocation}</p>
        <p class="cart__location-delivery">샛별배송</p>
        <button type="button" class="cart__button-location-change">
          배송지 변경
        </button>
      </div>
    `;
  }
}

customElements.define('cart-location', CartLocation);
