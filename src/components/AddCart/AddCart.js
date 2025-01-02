import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';
import baseCSS from '/src/Layout/base.ts';

class AddCart extends LitElement {
  static get styles() {
    return [
      resetCSS,
      baseCSS,
      css`
        .product-container {
          width: 24.75rem; 
          height: 18.25rem; 
          background-color: var(--white);
          border-radius: 0.625rem; 
          box-shadow: 0 0.25rem 0.625rem var(--gray--300);
          padding: 1.5rem 1.25rem; 
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          box-sizing: border-box;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem; 
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
          gap: 0.5rem;
        }

        .quantity-btn {
          width: 1.875rem;
          height: 1.875rem; 
          background-color: var(--gray--50);
          border: 0.063rem solid var(--gray--200); 
          font-size: var(--text-lg);
          cursor: pointer;
        }

        .total-container {
          display: flex;
          flex-direction: column;
          gap: 0.25rem; 
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
          gap: 0.25rem;
          align-items: center;
        }

        .reward-badge {
          background-color: var(--accent--yellow);
          color: var(--white);
          font-size: var(--text-xs);
          font-weight: var(--font-bold);
          padding: 0.125rem 0.313rem; 
          border-radius: 0.188rem; 
        }

        .reward-text {
          font-size: var(--text-xs);
          color: var(--content);
        }

        .button-container {
          display: flex;
          gap: 0.5rem;
        }

        .cancel-btn {
          flex: 1;
          height: 2.5rem; 
          border: none;
          font-size: var(--text-sm);
          font-weight: var(--font-bold);
          border-radius: 0.313rem; 
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
          height: 2.5rem;
          border: none;
          font-size: var(--text-sm);
          font-weight: var(--font-bold);
          border-radius: 0.313rem; 
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
      `,
    ];
  }

  constructor() {
    super();
    this.unitPrice = 4980;
    this.quantity = 1;
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
    this.remove();
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

customElements.define('add-cart', AddCart);