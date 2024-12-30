import { LitElement, html, css } from 'lit';
import resetCSS from '@/Layout/resetCSS';
import '../ProductCard/ProductCard.js';
import pb from '@/api/pocketbase.js';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export class TodayRecommendProducts extends LitElement {
  static get styles() {
    return [
      resetCSS,
      css`
        .today__inner {
          padding: 40px 0px;
          color: var(--content, #333);
          max-width: 1050px;
          margin: 0 auto;
        }

        .today__title {
          font-size: 24px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 28px;
          padding: 4px;
        }

        swiper-slide {
          height: auto;
          gap: 20px;
        }

        .today__content {
          position: relative;
          max-width: 1050px;
          margin: 0 auto;
        }

        swiper-container {
          padding: 0;
          margin: 0 auto;
        }

        .swiper-button {
          position: absolute;
          width: 60px;
          height: 60px;
          top: 35%;
          transform: translateY(-50%);
          padding: 0;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          background: white;
          z-index: 10;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s;
          display: flex;
        }

        .swiper-button-disabled {
          opacity: 0;
          pointer-events: none;
        }

        .swiper-button:hover {
          border-color: rgba(0, 0, 0, 0.4);
        }

        .swiper-button svg {
          width: 100%;
          height: 100%;
        }

        .swiper-button svg path:first-child {
          fill: white;
        }

        .swiper-button svg path:last-child {
          fill: #111;
        }

        .swiper-button[slot='button-prev'] {
          left: -40px;
        }

        .swiper-button[slot='button-next'] {
          right: -40px;
        }

        @media (max-width: 1024px) {
          .swiper-button[slot='button-prev'] {
            left: -20px;
          }
          .swiper-button[slot='button-next'] {
            right: -20px;
          }
        }

        @media (max-width: 768px) {
          .swiper-button[slot='button-prev'] {
            left: -20px;
          }
          .swiper-button[slot='button-next'] {
            right: 30px;
          }
        }
      `,
    ];
  }

  constructor() {
    super();
    this.sectionTitle = '이 상품 어때요?';
    this.firstPositionProducts = [];
    this.secondPositionProducts = [];
    this.isFetching = false;
    register();
  }

  static get properties() {
    return {
      id: { type: String },
      sectionTitle: { type: String },
      position: { type: String },
      firstPositionProducts: { type: Array },
      secondPositionProducts: { type: Array },
    };
  }

  async firstUpdated() {
    await this.setupSwiper();
  }

  async setupSwiper() {
    const swiperContainers =
      this.renderRoot.querySelectorAll('swiper-container');

    for (const swiperContainer of swiperContainers) {
      await customElements.whenDefined('swiper-container');
      await swiperContainer.initialize();

      const todayContent = swiperContainer.closest('.today__content');
      const prevButton = todayContent.querySelector('.swiper-button-prev');
      const nextButton = todayContent.querySelector('.swiper-button-next');

      swiperContainer.swiper.params.navigation = {
        prevEl: prevButton,
        nextEl: nextButton,
        disabledClass: 'swiper-button-disabled',
      };

      swiperContainer.swiper.navigation.init();
      swiperContainer.swiper.navigation.update();
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchData();
  }

  async handleButtonClick(event, direction) {
    const swiper = event.target
      .closest('.today__content')
      .querySelector('swiper-container');
    direction === 'prev'
      ? await swiper.swiper.slidePrev()
      : await swiper.swiper.slideNext();
  }

  async fetchData() {
    if (this.isFetching) return;
    this.isFetching = true;

    try {
      const response = await pb.collection('Products').getFullList();

      const isValidProduct = (product) => {
        return (
          product?.title &&
          product?.img &&
          typeof product?.price === 'number' &&
          product?.price >= 0 &&
          (!product.discount_rate ||
            (typeof product.discount_rate === 'number' &&
              product.discount_rate >= 0 &&
              typeof product.discount_price === 'number' &&
              product.discount_price >= 0))
        );
      };

      const firstPositionProducts = response
        .filter((product) => product.position.includes('first'))
        .filter(isValidProduct);

      const secondPositionProducts = response
        .filter((product) => product.position.includes('second'))
        .filter(isValidProduct);

      const mapProductsToCard = (products) => {
        return products.map((product) => ({
          id: product.id,
          delivery: product.delivery_type === '샛별 배송' ? '샛별 배송' : null,
          title: product.title,
          brand: product.brand,
          description: product.description,
          image: pb.files.getURL(product, product.img),
          price:
            product.discount_rate > 0 ? product.discount_price : product.price,
          originalPrice: product.discount_rate > 0 ? product.price : null,
          isDiscounted: product.discount_rate > 0,
          discount_rate: product.discount_rate || 0,
          badges: product.badges || [],
        }));
      };

      this.firstPositionProducts = mapProductsToCard(firstPositionProducts);
      this.secondPositionProducts = mapProductsToCard(secondPositionProducts);
    } catch (error) {
      if (!error.message.includes('autocancelled')) {
        console.error('데이터 가져오기 실패:', error);
      }
    } finally {
      this.isFetching = false;
    }
  }

  handleProductClick(product) {
    let recentProducts =
      JSON.parse(localStorage.getItem('recentProducts')) || [];
    recentProducts = recentProducts.filter((p) => p.title !== product.title);
    recentProducts.push(product);
    if (recentProducts.length > 4) {
      recentProducts = recentProducts.slice(-4);
    }
    localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
    window.dispatchEvent(new CustomEvent('recentProductsUpdated'));
  }

  renderProducts(products, position, sectionTitle) {
    return html`
      <section class="today" data-position="${position}">
        <div class="today__inner">
          <header class="today__header">
            <h2 class="today__title">${sectionTitle}</h2>
          </header>
          <div class="today__content">
            <button
              class="swiper-button swiper-button-prev"
              slot="button-prev"
              aria-label="이전 상품 보기"
              @click=${(e) => this.handleButtonClick(e, 'prev')}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M30 55C16.1929 55 5 43.8071 5 30C5 16.1929 16.1929 5 30 5C43.8071 5 55 16.1929 55 30C55 43.8071 43.8071 55 30 55Z"
                  fill="black"
                />
                <path
                  d="M32.715 38.699C32.5448 38.8731 32.3169 38.9792 32.0741 38.9972C31.8312 39.0153 31.5901 38.9441 31.396 38.797L31.301 38.715L23.301 30.898C23.1289 30.7298 23.0231 30.5051 23.0033 30.2652C22.9835 30.0253 23.0508 29.7862 23.193 29.592L23.273 29.496L30.996 21.314C31.1706 21.1289 31.4091 21.0173 31.663 21.0019C31.917 20.9865 32.1672 21.0684 32.3629 21.231C32.5585 21.3937 32.6848 21.6247 32.7161 21.8772C32.7473 22.1297 32.6811 22.3846 32.531 22.59L32.451 22.686L25.402 30.155L32.699 37.285C32.8732 37.4552 32.9792 37.6831 32.9972 37.926C33.0153 38.1688 32.9441 38.4099 32.797 38.604L32.715 38.699Z"
                  fill="white"
                />
              </svg>
            </button>

            <button
              class="swiper-button swiper-button-next"
              slot="button-next"
              aria-label="다음 상품 보기"
              @click=${(e) => this.handleButtonClick(e, 'next')}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z"
                  fill="black"
                />
                <path
                  d="M27.285 38.699C27.4552 38.8731 27.6831 38.9792 27.926 38.9972C28.1688 39.0153 28.4099 38.9441 28.604 38.797L28.699 38.715L36.699 30.898C36.8712 30.7298 36.9769 30.5051 36.9967 30.2652C37.0166 30.0253 36.9492 29.7862 36.807 29.592L36.727 29.496L29.004 21.314C28.8295 21.1289 28.591 21.0173 28.337 21.0019C28.0831 20.9865 28.1672 21.0684 28.3629 21.231C28.5585 21.3937 28.6848 21.6247 28.7161 21.8772C28.7473 22.1297 28.6811 22.3846 28.531 22.59L28.451 22.686L35.402 30.155L28.301 37.285C28.1269 37.4552 28.0208 37.6831 28.0028 37.926C27.9847 38.1688 28.0559 38.4099 28.203 38.604L28.285 38.699Z"
                  fill="white"
                />
              </svg>
            </button>
            <swiper-container
              slides-per-view="4"
              space-between="20"
              navigation='{
                "prevEl": ".swiper-button[slot=button-prev]",
                "nextEl": ".swiper-button[slot=button-next]"
              }'
              autoplay='{"delay": 2000, "disableOnInteraction": false}'
              breakpoints='{
                "320": {
                  "slidesPerView": 2,
                  "spaceBetween": 10
                },
                "768": {
                  "slidesPerView": 3,
                  "spaceBetween": 15
                },
                "1024": {
                  "slidesPerView": 4,
                  "spaceBetween": 20
                }
              }'
            >
              ${products.map(
                (product) => html`
                  <swiper-slide
                    @click=${() => this.handleProductClick(product)}
                  >
                    <product-card
                      .id=${product.id}
                      .image=${product.image}
                      .delivery=${product.delivery}
                      .titleLink=${'#'}
                      .title=${product.title}
                      .brand=${product.brand}
                      .description=${product.description}
                      .price=${product.price}
                      .originalPrice=${product.originalPrice}
                      .isDiscounted=${product.isDiscounted}
                      .discount_rate=${product.discount_rate}
                      .badges=${product.badges}
                    ></product-card>
                  </swiper-slide>
                `
              )}
            </swiper-container>
          </div>
        </div>
      </section>
    `;
  }

  render() {
    const firstSectionTitle = '이 상품 어때요?';
    const secondSectionTitle = '놓치면 후회할 가격';

    return html`
      ${this.renderProducts(
        this.firstPositionProducts,
        'first',
        firstSectionTitle
      )}
      <line-banner></line-banner>
      ${this.renderProducts(
        this.secondPositionProducts,
        'second',
        secondSectionTitle
      )}
    `;
  }
}

customElements.define('today-recommend-products', TodayRecommendProducts);
