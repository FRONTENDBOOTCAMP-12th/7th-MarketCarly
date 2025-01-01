import { LitElement, html, css } from 'lit';
import pb from '@/api/pocketbase.js';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';
import '../../components/ProductDetail/ProductDetailList';
import '../../components/ProductDetail/ProductQuantity';
import '../../components/ProductDetail/ProductActions';
import '../../components/ProductDetail/ProductNav';
import '../../components/ProductDetail/ProductCheckImages';
import '../../components/ProductDetail/ProductDescription';
import '../../components/ProductDetail/WhyCarly';
import { productState } from '../../components/ProductDetail/ProductState';

class ProductInfo extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product {
        max-width: 65.625rem;
        width: 100%;
        margin: 2.5rem auto 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .product__img img {
        max-width: 25rem;
        width: 100%;
        max-height: 32.125rem;
        height: 100%;
      }
      .product__info {
        max-width: 35rem;
        width: 100%;
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
    `,
  ];

  static properties = {
    product: { type: Object },
  };

  constructor() {
    super();
    this.product = {}; // 초기 상태
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ProductInfo: 컴포넌트 연결');
    this.fetchData();
  }

  async fetchData() {
    try {
      const productId = JSON.parse(
        localStorage.getItem('recentProducts')
      ).slice(-1)[0].id;
      console.log('상품 고유 ID 확인', productId);
      const product = await pb
        .collection('Products')
        .getFirstListItem(`id="${productId}"`);

      this.product = {
        id: product.id,
        product_id: product.product_id,
        delivery_type: product.delivery_type,
        title: product.title,
        description: product.description,
        discount_rate: product.discount_rate,
        price: product.price,
        original_price: product.original_price,
        // image: `${pb.baseURL}/api/files/product/${product.id}/${product.img}`,
        image: pb.files.getURL(product, product.img),
      };
    } catch (error) {
      console.error('에러', error); // 에러 원인 파악용
    }

    // 상태 변경 리스너
    this.handleProductChange = (product) => {
      console.log('ProductInfo: 리스너 호출, 받은 product:', product);
      this.product = product;
      this.requestUpdate(); // 강제 렌더링
    };

    productState.addListener(this.handleProductChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    productState.removeListener(this.handleProductChange);
  }

  render() {
    if (!this.product || Object.keys(this.product).length === 0) {
      return html`<p>상품 정보를 불러오는 중입니다...</p>`;
    }

    const {
      image = '',
      title = '상품명 없음',
      brand = '',
      delivery = '배송 정보 없음',
      description = '',
      price = 0,
      originalPrice = 0,
      discount_rate = 0,
    } = this.product;

    return html`
      <div class="product">
        <figure class="product__img">
          <img src="${image}" alt="${title}" />
        </figure>
        <div class="product__info">
          <p class="product__delivery">${delivery}</p>
          <h2 class="product__name">${brand} ${title}</h2>
          <p class="product__description">${description}</p>
          <div class="product__price-wrapper">
            <div>
              <span class="product__discount" aria-label="할인율"
                >${discount_rate}%</span
              >

              <span class="product__price" aria-label="할인가"
                >${price.toLocaleString()} 원</span
              >
            </div>
            <p class="product__original-price" aria-label="정상가">
              ${originalPrice
                ? originalPrice.toLocaleString()
                : '가격 정보 없음'}
              원
            </p>
          </div>
          <p class="product__login-benefit">
            로그인 후, 적립 혜택이 제공됩니다.
          </p>
          <product-detail-list
            productName="${this.product.title}"
            price="${this.product.price}"
            originalPrice="${this.product.original_price}"
          ></product-detail-list>
          <product-actions .product="${this.product}"></product-actions>
        </div>
      </div>
    `;
  }
}

customElements.define('product-info', ProductInfo);
