import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';
import { productState } from '../../components/ProductDetail/ProductState';
// ProductDescription Component
export class ProductDescription extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product__info-bottom {
        max-width: 65.625rem;
        margin: 2.5rem auto 0;
      }
      .desc-title-wrapper {
        text-align: center;
        padding: 76px 0 36px;
      }
      .desc-sub-description {
        font-size: var(--text-2xl);
        font-weight: var(--font-semibold);
        line-height: var(--line-height-normal);
      }
      .desc-title {
        font-size: var(--text-5xl);
        font-weight: var(--font-bold);
        line-height: var(--line-height-semitight);
      }
      .desc-description {
        font-size: var(--text-base);
        line-height: var(--line-height-semirelaxed);
        padding: 28px 0 96px;
      }
      .line {
        height: 1px;
        background: var(--gray--100);
        margin-top: 16px;
      }
    `,
  ];

  static properties = {
    product: { type: Object }, // productState에서 전달받는 데이터
  };

  constructor() {
    super();
    this.product = {}; // 초기화

    // 상태 변경 구독
    this.handleProductChange = (product) => {
      console.log('ProductDescription: 상태 변경 감지', product);
      this.product = product || {};
      this.requestUpdate();
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // productState 구독
    productState.addListener(this.handleProductChange);

    // 초기 상태 로드
    const initialProduct = productState.getProduct();
    if (initialProduct && Object.keys(initialProduct).length > 0) {
      this.handleProductChange(initialProduct);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // 구독 해제
    productState.removeListener(this.handleProductChange);
  }

  render() {
    // 데이터 확인 및 렌더링 처리
    const {
      image = '',
      title = '상품명 없음',
      brand = '',
      delivery = '배송 정보 없음',
      description = '상품 설명이 없습니다.',
    } = this.product;

    return html`
      <div class="product__info-bottom">
        <img src="${image}" alt="${title}" />
        <div class="desc-title-wrapper">
          <p class="desc-sub-description">${delivery}</p>
          <p class="desc-title">${brand} ${title}</p>
        </div>
        <div class="line" aria-hidden="true"></div>
        <p class="desc-description">${description}</p>
      </div>
    `;
  }
}
customElements.define('product-description', ProductDescription);
