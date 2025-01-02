import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/components/Cart/CartProduct.css?inline';

class CartProduct extends LitElement {
  static properties = {
    count: { type: Number },
    isDisabled: { type: Boolean },
    isChecked: { type: Boolean },
    quantity: { type: Number },
    productData: { type: Array },
    cartData: { type: Array },
  };

  constructor() {
    super();
    this.count = this.quantity;
    this.isDisabled = false;
    this.isChecked = true;
    this.quantity = 0;
    this.productData = [];
    this.cartData = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.getData();
  }

  getData() {
    if (this.productData) {
      this.count = this.productData.quantity || 1;
      this.isChecked = this.productData.isChecked || false;
    }
  }

  handleCountMinus() {
    if (this.count > 1) {
      this.count -= 1;
    }

    this.isDisabled = this.count <= 1;

    this.productData.quantity = this.productData.quantity - 1;
    this.saveData();
    this.notifyCartUpdate();
  }

  handleCountPlus() {
    this.count += 1;
    this.isDisabled = this.count <= 1;

    this.productData.quantity = this.productData.quantity + 1;
    this.saveData();
    this.notifyCartUpdate();
  }

  handleDelete() {
    this.dispatchEvent(
      new CustomEvent('delete', {
        detail: {
          productId: this.productData.id,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleClick() {
    const event = new CustomEvent('product-click', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  handleCheckChange(e) {
    this.isChecked = e.target.checked;
    this.productData.isChecked = this.isChecked;

    this.dispatchEvent(
      new CustomEvent('check-change', {
        detail: { isChecked: this.isChecked },
        bubbles: true,
        composed: true,
      })
    );

    this.saveData();
    this.notifyCartUpdate();
  }

  notifyCartUpdate() {
    window.dispatchEvent(new Event('cart-updated'));
  }

  saveData() {
    this.cartData = JSON.parse(localStorage.getItem('cart')) || [];

    this.cartData = this.cartData.map((data) => {
      if (this.productData.id === data.id) {
        return {
          ...data,
          quantity: this.productData.quantity,
          isChecked: this.productData.isChecked,
        };
      }
      return data;
    });

    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  render() {
    return html`
      <style>
        ${resetCSS}
        ${style}
      </style>

      <li class="cart-product">
        <input
          type="checkbox"
          name="check-product"
          id="check-product"
          class="cart-product__checkbox"
          aria-label="장바구니 품목 선택"
          checked=${this.isChecked}
          @change=${this.handleCheckChange}
        />
        <span class="cart-product__checkbox-icon"></span>
        <label for="check-product" class="cart-product__label sr-only"
          >장바구니 품목 선택</label
        >

        <figure class="cart-product__figure" @click=${this.handleClick}>
          <a href="/src/pages/productDetail/" class="cart-product__detail-page">
            <img
              src=${this.productData.image}
              alt=${this.productData.title}
              class="cart-product__image"
            />
          </a>
          <a
            href="/src/pages/productDetail/"
            class="cart-product__detail-page cart-product__detail-page--desc"
          >
            <figcaption class="cart-product__desc">
              [${this.productData.brand}] ${this.productData.title}
            </figcaption>
          </a>
        </figure>

        <div class="cart-product__count-wrapper">
          <button
            type="button"
            class="cart-product__button-minus"
            aria-label="수량 줄이기"
            @click=${this.handleCountMinus}
            ?disabled=${this.isDisabled}
          >
            -
          </button>
          <span class="cart-product__product-number">${this.count}</span>
          <button
            type="button"
            class="cart-product__button-plus"
            @click=${this.handleCountPlus}
            aria-label="수량 늘리기"
          >
            +
          </button>
        </div>

        <span class="cart-product__product-price" aria-label="제품 가격"
          >${(this.productData.price * this.count).toLocaleString()}원</span
        >
        <del class="cart-product__product-price-original" aria-label="제품 가격"
          >${this.productData.originalPrice
            ? html`${(
                this.productData.originalPrice * this.count
              ).toLocaleString()}원`
            : ''}</del
        >

        <button class="cart-product__button-delete" @click=${this.handleDelete}>
          <img src="/assets/icons/Cancel.svg" alt="장바구니 품목 삭제 버튼" />
        </button>
      </li>
    `;
  }
}

customElements.define('cart-product', CartProduct);
