import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';
import '../../components/ProductDetail/ProductDetailList';
import '../../components/ProductDetail/ProductQuantity';
import '../../components/ProductDetail/ProductActions';
import '../../components/ProductDetail/ProductNav';
import '../../components/ProductDetail/ProductCheckImages';
import '../../components/ProductDetail/ProductDescription';
import '../../components/ProductDetail/WhyCarly';
import pb from '../../api/pocketbase';

// ProductInfo Component + ProductDetailList
class ProductInfo extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product {
        max-width: 65.625rem;
        margin: 2.5rem auto 0;
        display: flex;
        justify-content: space-between;
      }

      .product__img img {
        width: 25rem;
        height: 32.125rem;
      }

      .product__info {
        width: 35rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .product__delivery {
        font-size: var(--text-xl);
        font-weight: var(--font-bold);
        color: var(--gray--500);
        line-height: var(--line-height-semitight);
      }

      .product__name {
        font-size: var(--text-3xl);
        font-weight: var(--font-semibold);
        color: var(--content);
        line-height: var(--line-height-normal);
      }

      .product__description {
        font-size: var(--text-base);
        font-weight: var(--font-regular);
        color: var(--gray--400);
        line-height: var(--line-height-semirelaxed);
      }

      .product__login-benefit {
        font-size: var(--text-base);
        font-weight: var(--font-semibold);
        color: var(--primary);
        line-height: var(--line-height-normal);
      }

      .product__price-wrapper .product__discount {
        font-size: var(--text-3xl);
        font-weight: var(--font-bold);
        margin-inline-end: 0.3rem;
        color: var(--accent--yellow);
        line-height: var(--line-height-normal);
      }

      .product__price-wrapper .product__price {
        font-size: var(--text-3xl);
        font-weight: var(--font-semibold);
        line-height: var(--line-height-normal);
      }

      .product__price-wrapper .product__original-price {
        text-decoration: line-through;
        color: var(--gray--400);
        line-height: var(--line-height-normal);
      }

      .product__price-wrapper .product__currency {
        font-size: var(--text-base);
        font-weight: var(--font-bold);
        line-height: var(--line-height-semitight);
      }
    `,
  ];

  static properties = {
    product: { type: Object },
  };

  constructor() {
    super();
    // this.product = {
    //   delivery: '샛별배송',
    //   name: '[풀무원] 탱탱쫄면 (4개입)',
    //   description: '튀기지 않아 부담 없는 매콤함',
    //   price: 4980,
    //   originalPrice: 9960,
    //   discount: 50,
    //   imageUrl: '/assets/images/product-detail-img01.png',
    // };
    this.product = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    try {
      const productId = 'RAMEN01';
      const product = await pb
        .collection('product')
        .getFirstListItem(`product_id="${productId}"`);
      console.log(product);

      this.product = {
        id: product.id,
        product_id: product.product_id,
        delivery_type: product.delivery_type,
        title: product.title,
        description: product.description,
        discount_rate: product.discount_rate,
        price: product.price,
        original_price: product.original_price,
        img: `${pb.baseURL}/api/files/product/${product.id}/${product.img}`,
      };
    } catch (error) {
      console.error('error!');
    }
  }

  render() {
    return html`
      <div class="product">
        <figure class="product__img">
          <img src="${this.product.img}" alt="${this.product.title}" />
        </figure>
        <div class="product__info">
          <p class="product__delivery">${this.product.delivery_type}</p>
          <h2 class="product__name">${this.product.title}</h2>
          <p class="product__description">${this.product.description}</p>
          <div class="product__price-wrapper">
            <div>
              <span class="product__discount"
                >${this.product.discount_rate}%</span
              >
              <span class="product__price"
                >${this.product.price.toLocaleString()} 원</span
              >
            </div>
            <p class="product__original-price">
              ${this.product.original_price.toLocaleString()} 원
            </p>
          </div>
          <p class="product__login-benefit">
            로그인 후, 적립 혜택이 제공됩니다.
          </p>
          <product-detail-list></product-detail-list>
        </div>
      </div>
    `;
  }
}
customElements.define('product-info', ProductInfo);
