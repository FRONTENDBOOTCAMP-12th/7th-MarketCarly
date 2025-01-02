import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/pages/cart/cart.css?inline';
import '/src/components/Cart/CartProduct.js';
import '/src/components/Cart/CartLocation.js';
import '/src/components/Cart/CartPrice.js';
import Swal from 'sweetalert2';

class Cart extends LitElement {
  static properties = {
    isAuth: { type: Boolean },
    isOpenDropdownRefrigerated: { type: Boolean },
    isOpenDropdownFreeze: { type: Boolean },
    isOpenDropdownRoom: { type: Boolean },
    isAllChecked: { type: Boolean },
    cartData: { type: Array },
    refrigeratedItems: { type: Array },
    frozenItems: { type: Array },
    roomTempItems: { type: Array },
    checkCount: { type: Number },
  };

  constructor() {
    super();
    this.isAuth = false;
    this.isOpenDropdownRefrigerated = true;
    this.isOpenDropdownFreeze = true;
    this.isOpenDropdownRoom = true;
    this.isAllChecked = true;
    this.cartData = [];
    this.refrigeratedItems = [];
    this.frozenItems = [];
    this.roomTempItems = [];
    this.checkCount = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getAuth();
    this.getCartData();
  }

  getAuth() {
    const auth = JSON.parse(localStorage.getItem('auth')) || '';
    this.isAuth = auth ? auth.isAuth : false;
  }

  getCartData() {
    this.cartData = JSON.parse(localStorage.getItem('cart')) || [];

    this.refrigeratedItems = this.cartData.filter((item) =>
      item.product_type?.includes('냉장')
    );

    this.frozenItems = this.cartData.filter((item) =>
      item.product_type?.includes('냉동')
    );

    this.roomTempItems = this.cartData.filter((item) =>
      item.product_type?.includes('상온')
    );

    this.checkCount = this.cartData.length;
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

    if (!isChecked) {
      this.cartData.forEach((data) => {
        data.isChecked = false;
      });

      this.checkCount = 0;
    } else {
      this.cartData.forEach((data) => {
        data.isChecked = true;
      });

      this.checkCount = this.cartData.length;
    }

    this.saveData();
    this.notifyCartUpdate();
  }

  handleProductCheckChange() {
    const checkArr = [];
    const cartProducts = this.shadowRoot.querySelectorAll('cart-product');

    let count = 0;

    cartProducts.forEach((product) => {
      const checkbox = product.shadowRoot.querySelector('#check-product');
      checkArr.push(checkbox.checked);
      if (checkbox.checked) {
        count += 1;
      }
    });

    this.checkCount = count;

    this.isAllChecked = checkArr.every((checkState) => checkState);

    const cartCheckbox = this.shadowRoot.querySelector('#cart__checkbox');
    cartCheckbox.checked = this.isAllChecked;

    this.cartData.forEach((data, index) => {
      data.isChecked = checkArr[index];
    });

    this.saveData();
    this.notifyCartUpdate();
  }

  handleDeleteCheck() {
    const cartProduct = this.shadowRoot.querySelectorAll('cart-product');

    cartProduct.forEach((product) => {
      const checkProduct = product.shadowRoot.querySelector('#check-product');

      if (checkProduct.checked) {
        product.remove();
      }
    });

    this.cartData = this.cartData.filter((data) => !data.isChecked);

    this.checkCount = this.cartData.filter((data) => data.isChecked).length;

    this.isAllChecked =
      this.checkCount > 0 && this.checkCount === this.cartData.length;

    const cartCheckbox = this.shadowRoot.querySelector('#cart__checkbox');

    if (cartCheckbox) {
      cartCheckbox.checked = this.isAllChecked;
    }

    this.saveData();
    this.notifyCartUpdate();
  }

  handleDeleteProduct(e) {
    const { productId } = e.detail;

    Swal.fire({
      text: '장바구니에서 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제하기',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartData = this.cartData.filter((data) => data.id !== productId);

        this.saveData();

        this.refrigeratedItems = this.cartData.filter((item) =>
          item.product_type.includes('냉장')
        );
        this.frozenItems = this.cartData.filter((item) =>
          item.product_type.includes('냉동')
        );
        this.roomTempItems = this.cartData.filter((item) =>
          item.product_type.includes('상온')
        );

        this.notifyCartUpdate();

        this.checkCount = this.cartData.length;
      }
    });
  }

  notifyCartUpdate() {
    window.dispatchEvent(new Event('cart-updated'));
  }

  saveData() {
    localStorage.setItem('cart', JSON.stringify(this.cartData));
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
                  >전체선택(${this.checkCount}/${this.cartData.length})</label
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
                        ${this.refrigeratedItems.map(
                          (item) => html`
                            <cart-product
                              .productData=${item}
                              @check-change=${this.handleProductCheckChange}
                              @product-click=${() =>
                                this.handleProductDetailClick(item)}
                              @delete=${this.handleDeleteProduct}
                            ></cart-product>
                          `
                        )}
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
                        ${this.frozenItems.map(
                          (item) => html`
                            <cart-product
                              .productData=${item}
                              @check-change=${this.handleProductCheckChange}
                              @delete=${this.handleDeleteProduct}
                              @product-click=${() =>
                                this.handleProductDetailClick(item)}
                            ></cart-product>
                          `
                        )}
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
                        ${this.roomTempItems.map(
                          (item) => html`
                            <cart-product
                              .productData=${item}
                              @check-change=${this.handleProductCheckChange}
                              @product-click=${() =>
                                this.handleProductDetailClick(item)}
                              @delete=${this.handleDeleteProduct}
                            ></cart-product>
                          `
                        )}
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
                    @click=${() => {
                      location.href = '/src/pages/login/';
                    }}
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
