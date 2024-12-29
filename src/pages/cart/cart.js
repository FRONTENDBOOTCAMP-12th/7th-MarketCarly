import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/pages/cart/cart.css?inline';
import '/src/components/Cart/CartProduct.js';
import '/src/components/Cart/CartLocation.js';
import '/src/components/Cart/CartPrice.js';

class Cart extends LitElement {
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
                />
                <span class="cart__checkbox-icon"></span>
                <label for="cart__checkbox" class="cart__label"
                  >전체선택(3/3)</label
                >
                <span class="cart__separator" aria-hidden="true">/</span>
                <button class="cart__button-delete" aria-label="선택 삭제">
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
                    <button class="cart__button--dropdown">
                      <img
                        src="/assets/icons/cartArrow.svg"
                        alt="카테고리 열기 버튼"
                      />
                    </button>
                  </span>
                  <cart-product></cart-product>
                </div>

                <div class="cart__type-wrapper">
                  <span class="cart__type cart__type--temperature-freeze">
                    <img
                      src="/assets/icons/freeze.svg"
                      alt="냉동 식품 아이콘"
                      class="cart__type-image"
                    />
                    <span class="cart__type-name">냉동 식품</span>
                    <button class="cart__button--dropdown">
                      <img
                        src="/assets/icons/cartArrow.svg"
                        alt="카테고리 열기 버튼"
                      />
                    </button>
                  </span>
                  <cart-product></cart-product>
                </div>

                <div class="cart__type-wrapper">
                  <span class="cart__type cart__type--temperature-room">
                    <img
                      src="/assets/icons/roomTemperature.svg"
                      alt="상온 식품 아이콘"
                      class="cart__type-image"
                    />
                    <span class="cart__type-name">상온 식품</span>
                    <button class="cart__button--dropdown">
                      <img
                        src="/assets/icons/cartArrow.svg"
                        alt="카테고리 열기 버튼"
                      />
                    </button>
                  </span>
                  <cart-product></cart-product>
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
