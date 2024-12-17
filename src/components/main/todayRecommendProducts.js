import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import '../ProductCard/ProductCard.js';

export class TodayRecommendProducts extends LitElement {
  @property({ type: Array })
  products = [];

  static get styles() {
    return css`
      .today__list {
        display: flex;
        gap: 1rem;
        list-style: none;
        padding: 0;
      }
    `;
  }

  render() {
    return html`
      <section class="today">
        <div class="today__inner">
          <header class="today__header">
            <h2 class="today__title">이 상품 어때요?</h2>
          </header>

          <div class="today__content">
            <ul class="today__list">
              ${this.products.map(
                (product) => html`
                  <li>
                    <product-card
                      .image=${product.image}
                      .delivery=${product.delivery}
                      .title=${product.title}
                      .price=${product.price}
                      .originalPrice=${product.originalPrice}
                      .isDiscounted=${product.isDiscounted}
                      .discount=${product.discount}
                      .badges=${product.badges}
                    ></product-card>
                  </li>
                `
              )}
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('today-recommend-products', TodayRecommendProducts);
