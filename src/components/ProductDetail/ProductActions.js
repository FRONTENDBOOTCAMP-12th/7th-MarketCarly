import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';
import { productState } from '../../components/ProductDetail/ProductState';
import Swal from 'sweetalert2';

// ProductActions Component
export class ProductActions extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .product__actions {
        max-width: 65.625rem;
        margin: auto 0;
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
        background-position: -8px -144px;
      }

      .product__button-bell {
        width: 56px;
        height: 56px;
        background-color: inherit;
        border: none;
        background-image: url(/assets/icons/Bell.svg);
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
      }

      .cart-tooltip {
        position: fixed;
        top: 100px;
        right: 2%;
        margin-inline-end: 21%;
        max-width: 284px;
        height: auto;
        padding: 20px;
        background-color: var(--white);
        border: 1px solid var(--gray--200);
        color: var(--content);
        font-size: var(--text-xs);
        font-weight: var(--font-semibold);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 200;
      }

      .cart-tooltip::before {
        content: '';
        display: block;
        border-color: var(--gray--200) transparent;
        border-style: solid;
        border-width: 0 6px 8px 6.5px;
        position: absolute;
        right: 15px;
        top: -8px;
        width: 0;
        z-index: 0;
      }

      .cart-tooltip::after {
        content: '';
        display: block;
        border-color: var(--white) transparent;
        border-style: solid;
        border-width: 0 6px 8px 6.5px;
        position: absolute;
        right: 15px;
        top: -7px;
        width: 0;
        z-index: 1;
      }

      .cart-tooltip img {
        width: 46px;
        height: 60px;
      }

      .cart-tooltip__info {
        display: flex;
      }

      .cart-tooltip__text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
        padding-left: 24px;
        overflow: hidden;
      }

      .cart-tooltip__title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--gray--300);
        font-weight: var(--font-semibold);
        line-height: var(--line-height-normal);
      }

      .cart-tooltip.show {
        display: block;
      }
    `,
  ];

  static properties = {
    product: { type: Object },
    tooltipVisible: { type: Boolean },
    tooltipMessage: { type: String },
    cartItems: { type: Object },
    isAddingToCart: { type: Boolean },
  };

  constructor() {
    super();

    this.isLiked = false; // 관심 상품 상태를 초기화
    this.tooltipVisible = false; // 툴팁 표시 상태를 초기화
    this.product = {}; // 상품 데이터를 초기화
    this.tooltipMessage = ''; // 툴팁 메시지를 초기화
    this.cartItems = {}; // 장바구니 아이템을 초기화
    this.isAddingToCart = false; // 중복 클릭 방지 상태

    this.handleProductChange = (product) => {
      this.product = product;
      this.requestUpdate();
    };
  }

  // DOM에 컴포넌트가 연결될 때 호출되는 메서드
  connectedCallback() {
    // 부모 클래스의 메서드 호출
    super.connectedCallback();

    // productState 구독
    productState.addListener(this.handleProductChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // productState 구독 해제
    productState.removeListener(this.handleProductChange);
  }

  // 로그인 여부 확인
  checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      Swal.fire({
        title: '로그인하셔야 본 서비스를 이용하실 수 있습니다.',
        text: '로그인 페이지로 이동합니다.',
        icon: 'warning',
        confirmButtonText: '확인',
      }).then(() => {
        window.location.href = '/login';
      });
      return false;
    }
    return true;
  }

  // 버튼 스타일과 속성을 업데이트하는 함수
  updateButtonState() {
    const likeButton = this.renderRoot.querySelector('.product__button-like');
    if (likeButton) {
      // aria-label 업데이트
      likeButton.setAttribute('aria-label', this.getAriaLabel());
      // background-position 업데이트
      likeButton.style.backgroundPosition = this.getBackgroundPosition();
    }
  }

  // 클릭 이벤트 핸들러
  handleLikeClick() {
    // 로그인 확인
    if (!this.checkLogin()) return;

    // 상태 변경
    this.isLiked = !this.isLiked;
    // 버튼 속성과 스타일 업데이트
    this.updateButtonState();
    console.log(`관심 상품 ${this.isLiked ? '등록' : '제거'}`);
  }

  // 현재 상태에 따라 버튼의 aria-label을 반환하는 함수
  getAriaLabel() {
    return this.isLiked ? '관심 상품에서 제거' : '관심 상품으로 추가';
  }

  // 현재 상태에 따라 버튼의 background-position을 반환하는 함수
  getBackgroundPosition() {
    return this.isLiked ? '-8px -72px' : '-8px -144px';
  }

  // 장바구니 담기 버튼 클릭 이벤트 핸들러
  handleAddToCart() {
    if (this.isAddingToCart) {
      return; // 중복 클릭 방지
    }

    this.isAddingToCart = true;

    const { id } = this.product;

    // 장바구니에 이미 존재하는 상품이라면 수량 추가
    if (this.cartItems[id]) {
      this.cartItems[id].quantity += 1;
      this.tooltipMessage = html`
        장바구니에 상품을 담았습니다.<br />
        이미 담은 상품의 수량을 추가했습니다.
      `;
    } else {
      // 새로운 상품을 장바구니에 추가
      this.cartItems[id] = { product: this.product, quantity: 1 };
      this.tooltipMessage = `장바구니에 상품을 담았습니다.`;
    }

    // 툴팁 표시
    this.tooltipVisible = true;
    this.requestUpdate();

    // 2초 후 툴팁 숨기기
    setTimeout(() => {
      this.tooltipVisible = false;
      this.isAddingToCart = false;
      // console.log('장바구니 작업 완료');
      this.requestUpdate();
    }, 2000);
  }

  render() {
    return html`
      <div class="product__actions">
        <button
          type="button"
          class="product__button-like"
          aria-label="${this.getAriaLabel()}"
          style="background-position: ${this.getBackgroundPosition()}"
          @click="${this.handleLikeClick}"
        ></button>
        <button
          type="button"
          class="product__button-bell"
          disabled
          aria-label="재입고 알림"
        ></button>
        <button
          type="button"
          class="product__button-addcart"
          @click="${this.handleAddToCart}"
          ?disabled="${this.isAddingToCart}"
        >
          장바구니 담기
        </button>
        <div class="cart-tooltip ${this.tooltipVisible ? 'show' : ''}">
          <div class="cart-tooltip__info">
            <img src="${this.product.image}" alt="${this.product.title}" />
            <div class="cart-tooltip__text">
              <p class="cart-tooltip__title">
                ${this.product.brand} ${this.product.title}
              </p>
              <p>${this.tooltipMessage}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('product-actions', ProductActions);
