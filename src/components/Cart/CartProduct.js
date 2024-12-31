import { LitElement, html } from 'lit';
import resetCSS from '/src/styles/reset.css?inline';
import style from '/src/components/Cart/CartProduct.css?inline';

class CartProduct extends LitElement {
  static properties = {
    count: { type: Number },
    isDisabled: { type: Boolean },
    isChecked: { type: Boolean },
  };

  constructor() {
    super();
    this.count = 1;
    this.isDisabled = true;
    this.isChecked = true;
  }

  handleCountMinus() {
    if (this.count > 1) {
      this.count -= 1;
    }

    this.isDisabled = this.count <= 1;
  }

  handleCountPlus() {
    this.count += 1;
    this.isDisabled = this.count <= 1;
  }

  handleDelete() {
    this.dispatchEvent(
      new CustomEvent('delete', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleCheckChange(e) {
    this.isChecked = e.target.checked;
    this.dispatchEvent(
      new CustomEvent('check-change', {
        detail: { isChecked: this.isChecked },
        bubbles: true,
        composed: true,
      })
    );
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

        <figure class="cart-product__figure">
          <a href="/src/pages/productDetail/" class="cart-product__detail-page">
            <img
              src="/assets/images/product01.webp"
              alt="탱탱쫄면(상품명)"
              class="cart-product__image"
            />
          </a>
          <a
            href="/src/pages/productDetail/"
            class="cart-product__detail-page cart-product__detail-page--desc"
          >
            <figcaption class="cart-product__desc">
              [풀무원] 탱탱쫄면 (4개입)
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
          >4,980원</span
        >

        <button class="cart-product__button-delete" @click=${this.handleDelete}>
          <img src="/assets/icons/Cancel.svg" alt="장바구니 품목 삭제 버튼" />
        </button>
      </li>
    `;
  }
}

customElements.define('cart-product', CartProduct);
