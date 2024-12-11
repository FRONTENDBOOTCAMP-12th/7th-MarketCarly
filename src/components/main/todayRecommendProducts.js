// src/components/TodayRecommendProducts.js
import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';

export class TodayRecommendProducts extends LitElement {
  static get styles() {
    return [
      resetCSS,
      css`
        .today {
          width: 100%;
          padding: 3.75rem 0;
        }

        .today__inner {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        .today__header {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .today__title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #333;
        }

        .today__content {
          position: relative;
          margin-bottom: 3.75rem;
        }

        .today__list {
          display: flex;
          justify-content: center;
          gap: 3rem;
          list-style: none;
          flex-wrap: wrap;
          width: 100%;
        }

        .today__item {
          flex: 0 0 calc(25% - 1.25rem);
          min-width: 7.5rem;
          max-width: 10rem;
          padding: 0.25rem;
        }

        .today__figure {
          position: relative;
          width: 100%;
          height: 13rem;
          margin: 0;
          overflow: hidden;
          background: white;
        }

        .today__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .today__info {
          padding: 0.75rem 0;
        }

        .today__link {
          text-decoration: none;
          color: inherit;
        }

        .today__name {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .today__price-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .today__discount {
          color: #f86d7d;
          font-weight: 600;
        }

        .today__price {
          font-size: 1rem;
          font-weight: 600;
        }

        .today__original-price {
          color: #999;
          text-decoration: line-through;
          font-size: 0.75rem;
          display: block;
          margin-top: 0.25rem;
        }

        .today__cart-button {
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          width: 2rem;
          height: 2rem;
          border: none;
          background-color: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .today__cart-icon {
          width: 1.5rem;
          height: 1.5rem;
          background-color: transparent;
        }

        .today__badge-container {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .today__badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }

        .today__badge--kurly {
          color: #724cf9;
          background-color: rgba(114, 76, 249, 0.1);
        }

        .today__badge--limited {
          color: #fa622f;
          background-color: rgba(250, 98, 47, 0.1);
        }
      `,
    ];
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
              <li class="today__item">
                <figure class="today__figure">
                  <img
                    class="today__image"
                    src="/path/to/image1.jpg"
                    alt="[온더바디] 죠르디 시카 자석 선쿠션"
                  />
                  <button
                    type="button"
                    class="today__cart-button"
                    aria-label="장바구니 담기"
                  >
                    <img
                      class="today__cart-icon"
                      src="/src/assets/icons/Cart.svg"
                      ;
                      alt="장바구니 아이콘"
                    />
                  </button>
                </figure>

                <div class="today__info">
                  <h3 class="today__name">
                    <a href="/product/detail" class="today__link">
                      [온더바디] 죠르디 시카 자석 선쿠션
                    </a>
                  </h3>

                  <div class="today__price-wrap">
                    <strong class="today__discount" aria-label="할인율"
                      >24%</strong
                    >
                    <strong class="today__price" aria-label="판매가">
                      <data value="32500">32,500원</data>
                    </strong>
                  </div>

                  <del class="today__original-price" aria-label="정가">
                    <data value="42800">42,800원</data>
                  </del>

                  <div class="today__badge-container">
                    <span class="today__badge today__badge--kurly"
                      >Kurly Only</span
                    >
                    <span class="today__badge today__badge--limited"
                      >한정수량</span
                    >
                  </div>
                </div>
              </li>
              <li class="today__item">
                <figure class="today__figure">
                  <img
                    class="today__image"
                    src="/path/to/image1.jpg"
                    alt="[온더바디] 죠르디 시카 자석 선쿠션"
                  />
                  <button
                    type="button"
                    class="today__cart-button"
                    aria-label="장바구니 담기"
                  >
                    <img
                      class="today__cart-icon"
                      src="/src/assets/icons/Cart.svg"
                      alt="장바구니 아이콘"
                    />
                  </button>
                </figure>

                <div class="today__info">
                  <h3 class="today__name">
                    <a href="/product/detail" class="today__link">
                      [온더바디] 죠르디 시카 자석 선쿠션
                    </a>
                  </h3>

                  <div class="today__price-wrap">
                    <strong class="today__discount" aria-label="할인율"
                      >24%</strong
                    >
                    <strong class="today__price" aria-label="판매가">
                      <data value="32500">32,500원</data>
                    </strong>
                  </div>

                  <del class="today__original-price" aria-label="정가">
                    <data value="42800">42,800원</data>
                  </del>

                  <div class="today__badge-container">
                    <span class="today__badge today__badge--kurly"
                      >Kurly Only</span
                    >
                    <span class="today__badge today__badge--limited"
                      >한정수량</span
                    >
                  </div>
                </div>
              </li>
              <li class="today__item">
                <figure class="today__figure">
                  <img
                    class="today__image"
                    src="/path/to/image1.jpg"
                    alt="[온더바디] 죠르디 시카 자석 선쿠션"
                  />
                  <button
                    type="button"
                    class="today__cart-button"
                    aria-label="장바구니 담기"
                  >
                    <img
                      class="today__cart-icon"
                      src="/src/assets/icons/Cart.svg"
                      alt="장바구니 아이콘"
                    />
                  </button>
                </figure>

                <div class="today__info">
                  <h3 class="today__name">
                    <a href="/product/detail" class="today__link">
                      [온더바디] 죠르디 시카 자석 선쿠션
                    </a>
                  </h3>

                  <div class="today__price-wrap">
                    <strong class="today__discount" aria-label="할인율"
                      >24%</strong
                    >
                    <strong class="today__price" aria-label="판매가">
                      <data value="32500">32,500원</data>
                    </strong>
                  </div>

                  <del class="today__original-price" aria-label="정가">
                    <data value="42800">42,800원</data>
                  </del>

                  <div class="today__badge-container">
                    <span class="today__badge today__badge--kurly"
                      >Kurly Only</span
                    >
                    <span class="today__badge today__badge--limited"
                      >한정수량</span
                    >
                  </div>
                </div>
              </li>
              <li class="today__item">
                <figure class="today__figure">
                  <img
                    class="today__image"
                    src="/path/to/image1.jpg"
                    alt="[온더바디] 죠르디 시카 자석 선쿠션"
                  />
                  <button
                    type="button"
                    class="today__cart-button"
                    aria-label="장바구니 담기"
                  >
                    <img
                      class="today__cart-icon"
                      src="/src/assets/icons/Cart.svg"
                      alt="장바구니 아이콘"
                    />
                  </button>
                </figure>

                <div class="today__info">
                  <h3 class="today__name">
                    <a href="/product/detail" class="today__link">
                      [온더바디] 죠르디 시카 자석 선쿠션
                    </a>
                  </h3>

                  <div class="today__price-wrap">
                    <strong class="today__discount" aria-label="할인율"
                      >24%</strong
                    >
                    <strong class="today__price" aria-label="판매가">
                      <data value="32500">32,500원</data>
                    </strong>
                  </div>

                  <del class="today__original-price" aria-label="정가">
                    <data value="42800">42,800원</data>
                  </del>

                  <div class="today__badge-container">
                    <span class="today__badge today__badge--kurly"
                      >Kurly Only</span
                    >
                    <span class="today__badge today__badge--limited"
                      >한정수량</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('today-recommend-products', TodayRecommendProducts);
