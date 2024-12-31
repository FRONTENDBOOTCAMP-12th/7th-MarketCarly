import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/pages/cart/cart.css?inline';
import '/src/components/Cart/CartProduct.js';
import '/src/components/Cart/CartLocation.js';
import '/src/components/Cart/CartPrice.js';

class Cart extends LitElement {
  static properties = {
    isAuth: { type: Boolean },
    isOpenDropdownRefrigerated: { type: Boolean },
    isOpenDropdownFreeze: { type: Boolean },
    isOpenDropdownRoom: { type: Boolean },
    isAllChecked: { type: Boolean },
  };

  constructor() {
    super();
    this.isAuth = false;
    this.isOpenDropdownRefrigerated = true;
    this.isOpenDropdownFreeze = true;
    this.isOpenDropdownRoom = true;
    this.isAllChecked = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getAuth();
  }

  getAuth() {
    const auth = JSON.parse(localStorage.getItem('auth')) || '';
    this.isAuth = auth ? auth.isAuth : false;
  }

  handleLoginDirect() {
    location.href = '/src/pages/login/';
  }

  handleDropDownRefrigerated() {
    this.isOpenDropdownRefrigerated = !this.isOpenDropdownRefrigerated;
  }

  handleDropDownFreeze() {
    this.isOpenDropdownFreeze = !this.isOpenDropdownFreeze;
  }

  handleDropDownRoom() {
    this.isOpenDropdownRoom = !this.isOpenDropdownRoom;
  }

  handleAllCheckChange(e) {
    const isChecked = e.target.checked;
    this.isAllChecked = isChecked;

    const cartProducts = this.shadowRoot.querySelectorAll('cart-product');
    cartProducts.forEach((product) => {
      const checkbox = product.shadowRoot.querySelector('#check-product');
      checkbox.checked = isChecked;
    });
  }

  handleProductCheckChange() {
    const checkArr = [];
    const cartProducts = this.shadowRoot.querySelectorAll('cart-product');
    cartProducts.forEach((product) => {
      const checkbox = product.shadowRoot.querySelector('#check-product');
      checkArr.push(checkbox.checked);
    });

    this.isAllChecked = checkArr.every((checkState) => checkState);

    const cartCheckbox = this.shadowRoot.querySelector('#cart__checkbox');
    if (this.isAllChecked) {
      cartCheckbox.checked = true;
    } else {
      cartCheckbox.checked = false;
    }
  }

  handleDeleteCheck() {
    const cartProduct = this.shadowRoot.querySelectorAll('cart-product');
    cartProduct.forEach((product) => {
      const checkProduct = product.shadowRoot.querySelector('#check-product');

      if (checkProduct.checked) {
        product.style.display = 'none';
      }
    });
  }

  handleDeleteProduct(e) {
    const cartProduct = e.target;
    cartProduct.style.display = 'none';
  }

  render() {
    return html`
      <style>
        ${resetCSS}
        ${style}
      </style>
      <form action="" class="cart">
        <fieldset class="cart__fieldset">
          <legend class="cart__legend">장바구니</legend>

          <div class="cart_container">
            <div class="cart__wrapper">
              <div class="cart__checkbox-wrapper">
                <input
                  type="checkbox"
                  name="cart__checkbox"
                  id="cart__checkbox"
                  class="cart__checkbox"
                  checked=${this.isAllChecked}
                  @change=${this.handleAllCheckChange}
                />
                <span class="cart__checkbox-icon"></span>
                <label for="cart__checkbox" class="cart__label"
                  >전체선택(3/3)</label
                >
                <span class="cart__separator" aria-hidden="true">/</span>
                <button
                  type="button"
                  class="cart__button-delete"
                  aria-label="선택 삭제"
                  @click=${this.handleDeleteCheck}
                >
                  선택삭제
                </button>
              </div>

              <div class="cart__type-container">
                <div class="cart__type-wrapper">
                  <span class="cart__type cart__type--temperature-refrigerated">
                    <img
                      src="/assets/icons/refrigerated.svg"
                      alt="냉장 식품 아이콘"
                      class="cart__type-image"
                    />
                    <span class="cart__type-name">냉장 식품</span>
                    <button
                      type="button"
                      class="cart__button--dropdown"
                      @click=${this.handleDropDownRefrigerated}
                    >
                      <img
                        src="/assets/icons/cartArrow.svg"
                        alt="카테고리 열기 버튼"
                        class="cart__img-dropdown"
                      />
                    </button>
                  </span>
                  ${this.isOpenDropdownRefrigerated
                    ? html`<ul>
                        <cart-product
                          @check-change=${this.handleProductCheckChange}
                          @delete=${this.handleDeleteProduct}
                        ></cart-product>
                      </ul>`
                    : ''}
                </div>

                <div class="cart__type-wrapper">
                  <span class="cart__type cart__type--temperature-freeze">
                    <img
                      src="/assets/icons/freeze.svg"
                      alt="냉동 식품 아이콘"
                      class="cart__type-image"
                    />
                    <span class="cart__type-name">냉동 식품</span>
                    <button
                      type="button"
                      class="cart__button--dropdown"
                      @click=${this.handleDropDownFreeze}
                    >
                      <img
                        src="/assets/icons/cartArrow.svg"
                        alt="카테고리 열기 버튼"
                        class="cart__img-dropdown"
                      />
                    </button>
                  </span>
                  ${this.isOpenDropdownFreeze
                    ? html`<ul>
                        <cart-product
                          @check-change=${this.handleProductCheckChange}
                          @delete=${this.handleDeleteProduct}
                        ></cart-product>
                      </ul>`
                    : ''}
                </div>

                <div class="cart__type-wrapper">
                  <span class="cart__type cart__type--temperature-room">
                    <img
                      src="/assets/icons/roomTemperature.svg"
                      alt="상온 식품 아이콘"
                      class="cart__type-image"
                    />
                    <span class="cart__type-name">상온 식품</span>
                    <button
                      type="button"
                      class="cart__button--dropdown"
                      @click=${this.handleDropDownRoom}
                    >
                      <img
                        src="/assets/icons/cartArrow.svg"
                        alt="카테고리 열기 버튼"
                        class="cart__img-dropdown"
                      />
                    </button>
                  </span>
                  ${this.isOpenDropdownRoom
                    ? html`<ul>
                        <cart-product
                          @check-change=${this.handleProductCheckChange}
                          @delete=${this.handleDeleteProduct}
                        ></cart-product>
                      </ul>`
                    : ''}
                </div>
              </div>
            </div>

            <div class="cart__components-wrapper">
              ${this.isAuth ? html`<cart-location></cart-location>` : ''}
              <cart-price></cart-price>
              ${this.isAuth
                ? html`<button
                    type="submit"
                    class="cart__button cart__button-submit"
                  >
                    결제하기
                  </button>`
                : html`<button
                    type="button"
                    class="cart__button cart__button-loginDirect"
                    @click=${this.handleLoginDirect}
                  >
                    로그인
                  </button>`}
            </div>
          </div>
        </fieldset>
      </form>
    `;
  }
}

customElements.define('cart-element', Cart);
