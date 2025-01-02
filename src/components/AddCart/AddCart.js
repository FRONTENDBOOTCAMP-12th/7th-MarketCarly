import { LitElement, html, css } from 'lit';

class AddCartComponent extends LitElement {
  static styles = css`
    .product-container {
      width: 396px;
      height: 292px;
      background-color: var(--white);
      border-radius: 10px;
      box-shadow: 0 4px 10px var(--gray--300);
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      box-sizing: border-box;
    }

    .product-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .product-title {
      margin: 0;
      font-size: var(--text-lg);
      color: var(--content);
    }

    .product-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-price {
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
      margin: 0;
    }

    .quantity-control {
      display: flex;
      gap: 8px;
    }

    .quantity-btn {
      width: 30px;
      height: 30px;
      background-color: var(--gray--50);
      border: 1px solid var(--gray--200);
      font-size: var(--text-lg);
      cursor: pointer;
    }

    .total-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
    }

    .label {
      font-size: var(--text-sm);
      color: var(--gray--600);
    }

    #total-price {
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      margin: 0;
    }

    .reward-info {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
      align-items: center;
    }

    .reward-badge {
      background-color: var(--accent--yellow);
      color: var(--white);
      font-size: var(--text-xs);
      font-weight: var(--font-bold);
      padding: 2px 5px;
      border-radius: 3px;
    }

    .reward-text {
      font-size: var(--text-xs);
      color: var(--content);
    }

    .button-container {
      display: flex;
      gap: 8px;
    }

    .cancel-btn {
      flex: 1;
      height: 40px;
      border: none;
      font-size: var(--text-sm);
      font-weight: var(--font-bold);
      border-radius: 5px;
      cursor: pointer;
      background-color: var(--gray--50);
      color: var(--gray--800);
      transition: background-color 0.3s ease;
    }

    .cancel-btn:hover {
      background-color: var(--gray--100);
    }

    .cart-btn {
      flex: 1;
      height: 40px;
      border: none;
      font-size: var(--text-sm);
      font-weight: var(--font-bold);
      border-radius: 5px;
      cursor: pointer;
      background-color: var(--primary);
      color: var(--white);
      transition: background-color 0.3s ease;
    }

    .cart-btn:hover {
      background-color: var(--secondary);
    }

    .cart-btn:active {
      background-color: var(--secondary);
    }
  `;

  constructor() {
    super();
    this.unitPrice = 4980;
    this.quantity = 1;
  }

  firstUpdated() {
    // base.css와 reset.css를 동적으로 추가
    const shadow = this.shadowRoot;
    const linkBase = document.createElement('link');
    linkBase.setAttribute('rel', 'stylesheet');
    linkBase.setAttribute('href', '/src/styles/base.css');
    
    const linkReset = document.createElement('link');
    linkReset.setAttribute('rel', 'stylesheet');
    linkReset.setAttribute('href', '/src/styles/reset.css');
    
    shadow.prepend(linkBase, linkReset);
  }

  updateTotalPrice() {
    const totalPrice = this.unitPrice * this.quantity;
    this.shadowRoot.querySelector('#total-price').innerHTML = `<strong>${totalPrice.toLocaleString()}원</strong>`;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.shadowRoot.querySelector('#quantity').textContent = this.quantity;
      this.updateTotalPrice();
    }
  }

  increaseQuantity() {
    this.quantity++;
    this.shadowRoot.querySelector('#quantity').textContent = this.quantity;
    this.updateTotalPrice();
  }

  closeComponent() {
    this.remove(); // 현재 컴포넌트를 DOM에서 제거
  }

  render() {
    return html`
      <div class="product-container">
        <div class="product-info">
          <h4 class="product-title">[풀무원] 탱탱쫄면 (4개입)</h4>
          <div class="product-controls">
            <p class="product-price"><strong>4,980원</strong></p>
            <div class="quantity-control">
              <button @click="${this.decreaseQuantity}" class="quantity-btn">-</button>
              <span id="quantity">1</span>
              <button @click="${this.increaseQuantity}" class="quantity-btn">+</button>
            </div>
          </div>
        </div>
        <div class="total-container">
          <div class="total-row">
            <p class="label">합계</p>
            <p id="total-price"><strong>4,980원</strong></p>
          </div>
          <div class="reward-info">
            <span class="reward-badge">적립</span>
            <span class="reward-text">구매 시 5원 적립</span>
          </div>
        </div>
        <div class="button-container">
          <button @click="${this.closeComponent}" class="cancel-btn">취소</button>
          <button id="add-to-cart" class="cart-btn">장바구니 담기</button>
        </div>
      </div>
    `;
  }
}

customElements.define('add-cart', AddCartComponent);
