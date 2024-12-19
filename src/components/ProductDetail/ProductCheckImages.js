import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';

// Product Check Images Component
export class ProductCheckImages extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product-check-images {
        text-align: center;
        margin-bottom: 96px;
				max-width: 65.625rem;
				margin: 2.5rem auto 0;
      }

      .desc-check-point {
        padding-block-end: 68px;
        text-align: center;
        position: relative;
      }

      .desc-check-point span {
        font-size: var(--text-5xl);
        font-weight: var(--font-bold);
        line-height: var(--line-height-semitight);
        padding-inline: 1rem;
        background-color: var(--white);
        z-index: 1;
        position: relative;
        left: 0;
        right: 0;
      }

      .desc-check-point::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #d9d9d9;
        position: absolute;
        bottom: 100px;
        z-index: 0;
      }

      .product-check-images img {
        display: flex;
        margin: 0 auto;
      }

			.line {
				height: 1px;
				background: var(--gray--100);
				margin-top: 16px;
			}
    `
  ];

  static properties = {
    checkPoint: { type: String },
    checkPointImage: { type: String },
    image2: { type: String },
    title: { type: String },
  };

  constructor() {
    super();
    this.checkPoint = "Carly's Check Point";
    this.checkPointImage = '/assets/images/product-detail-check-img.png';
    this.image2 = '/assets/images/product-detail-img03.png';
    this.title = '[풀무원] 탱탱쫄면';
  }

  render() {
    return html`
      <div class="product-check-images">
        <p class="desc-check-point">
          <span>${this.checkPoint}</span>
        </p>
        <img src="${this.checkPointImage}" alt="상품 체크 포인트" />
        <img id="detail" src="${this.image2}" alt="${this.title} 영양정보 이미지" />
			<div class="line" aria-hidden="true"></div>
      </div>
    `;
  }
}
customElements.define('product-check-images', ProductCheckImages);