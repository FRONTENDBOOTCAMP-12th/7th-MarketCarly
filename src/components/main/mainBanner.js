import { LitElement, html, css } from 'lit';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import pb from '@/api/pocketbase.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export class MainBanner extends LitElement {
  static properties = {
    bannerData: { type: Array, state: true },
    currentPage: { type: Number, state: true },
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .swiper {
      width: 100%;
      max-width: 1920px;
      height: 370px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
    }

    .swiper-wrapper {
      display: flex;
      max-width: 1920px;
      width: 100%;
      height: 100%;
    }

    .swiper-slide {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      position: relative;
      background: #f8f8f8;
    }

    .slide-image {
      max-width: 1920px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      transition: background-color 0.3s ease;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 24px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
    }

    .swiper-button-prev {
      left: 20px;
    }

    .swiper-button-next {
      right: 20px;
    }

    .swiper-button-prev:hover,
    .swiper-button-next:hover {
      border: none;
      background: rgba(0, 0, 0, 0.6);
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      display: none;
    }

    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.5);
      opacity: 1;
    }

    .swiper-pagination {
      position: absolute;
      bottom: 15%;
      right: 10%;
      color: #fff;
      border-radius: 12px;
      background: rgba(64, 64, 64, 0.3);
      padding: 1px 12px;
    }

    .swiper-pagination-bullet-active {
      background: #fff;
    }
  `;

  constructor() {
    super();
    this.bannerData = [];
    this.swiper = null;
    this.currentPage = 1;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchBannerData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    }
  }

  handlePrevClick = () => {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  };

  handleNextClick = () => {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  };

  async fetchBannerData() {
    try {
      const response = await pb.collection('banner').getFullList({
        sort: '-created',
      });
      console.log('Banner Data Response:', response);
      console.log('Response length:', response.length);
      this.bannerData = response;
      console.log('First item:', response[0]);
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  }
  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('bannerData')) {
      console.log('bannerData updated:', this.bannerData);
      if (this.swiper) {
        this.swiper.destroy();
        this.swiper = null;
      }

      const swiperContainer = this.shadowRoot?.querySelector('.swiper');
      if (!swiperContainer) return;

      this.swiper = new Swiper(swiperContainer, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 500,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: () => {
            if (this.swiper) {
              this.currentPage = this.swiper.realIndex + 1;
            }
          },
        },
      });
    }
  }

  render() {
    if (!this.bannerData) return html`Loading...`;

    return html`
      <div class="swiper">
        <div class="swiper-wrapper">
          ${this.bannerData.map((item) => {
            const fullUrl = `${pb.baseUrl}/api/files/banner/${item.id}/${item.banner_img}`;
            return html`
              <div class="swiper-slide">
                <img
                  class="slide-image"
                  src="${fullUrl}"
                  alt="${item.alt || 'Banner Image'}"
                  loading="lazy"
                />
              </div>
            `;
          })}
        </div>
          <div class="swiper-pagination">
            ${this.currentPage} / ${this.bannerData.length}
          </div>
          <div class="swiper-button-prev" @click="${this.handlePrevClick}">
           <img src="/assets/icons/PrevArrow.svg" alt="이전 이미지 넘기기 버튼" />
          </div>
          <div class="swiper-button-next" @click="${this.handleNextClick}">
           <img src="/assets/icons/NextArrow.svg" alt="다음 이미지 넘기기 버튼" />
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('main-banner', MainBanner);
