import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';

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
    `
  ];

  static properties = {
    descriptionData: { type: Object },
  };

  constructor() {
    super();
    this.descriptionData = {
      image1: '/assets/images/product-detail-img02.png',
      subDescription: '튀기지 않아 부담 없는 매콤함',
      title: '[풀무원] 탱탱쫄면',
      description: `쫄면의 진가는 매콤새콤한 양념과 탱탱한 면발에서 찾을 수 있지요. 풀무원은 이 맛을 더 부담 없이 즐길 수 있도록 튀기지 않고 만든 탱탱쫄면을 선보입니다. 밀가루와 감자 전분을 적절히 배합해 탄력이 좋고, 입에 넣었을 때는 찰지게 씹히죠. 고추장을 넣어 숙성한 비빔장은 자연스럽고 깊은 맛을 냅니다. 간단하게 조리해 마지막 한 가닥까지 탱탱한 식감을 즐겨보세요. 취향에 따라 다양한 고명을 올려 드셔도 좋아요.`,
    };
  }

  render() {
    return html`
      <div class="product__info-bottom">
        <img src="${this.descriptionData.image1}" alt="${this.descriptionData.title}" />

        <div class="desc-title-wrapper">
          <p class="desc-sub-description">${this.descriptionData.subDescription}</p>
          <p class="desc-title">${this.descriptionData.title}</p>
        </div>

        <div class="line" aria-hidden="true"></div>

        <p class="desc-description">
          ${this.descriptionData.description}
        </p>
      </div>
    `;
  }
}
customElements.define('product-description', ProductDescription);