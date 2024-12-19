import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';

// ProductActions Component
export class ProductActions extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product__actions {
				max-width: 65.625rem;
  			margin: 2.5rem auto 0;
        display: flex;
        justify-content: flex-end;
        gap: 0.8rem;
      }

      .product__button-like {
        width: 56px;
        height: 56px;
        background-color: inherit;
        border: none;
        background-image: url(/assets/icons/Squre.svg);
        background-position: -8px -72px;
        cursor: pointer;
      }

      .product__button-bell {
        width: 56px;
        height: 56px;
        background-color: inherit;
        border: none;
        background-image: url(/assets/icons/Bell.svg);
        cursor: pointer;
      }

      .product__button-addcart {
        font-family: 'Pretendard Variable', Pretendard, sans-serif;
        width: 26.5rem;
        height: 54px;
        background-color: inherit;
        border: none;
        border-radius: 4px;
        background-color: var(--primary);
        color: var(--white);
        font-size: var(--text-base);
        font-weight: var(--font-semibold);
        cursor: pointer;
      }
    `
  ];

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="product__actions">
        <button type="button" class="product__button-like" aria-label="관심 상품 등록"></button>
        <button type="button" class="product__button-bell" disabled aria-label="재입고 알림"></button>
        <button type="button" class="product__button-addcart" aria-label="장바구니 담기">장바구니 담기</button>
      </div>
    `;
  }
}
customElements.define('product-actions', ProductActions);