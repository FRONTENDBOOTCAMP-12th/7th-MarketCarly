class AddCartComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <style>
                :root {
                    --container-shadow-color: rgba(0, 0, 0, 0.1);
                    --primary-hover-color: #6a2ecc;
                    --gray--50: #f9f9f9;
                    --white: #ffffff;
                    --content: #333333;
                    --font-bold: 700;
                    --gray--200: #e1e1e1;
                    --gray--600: #666666;
                    --gray--800: #333333;
                    --accent--yellow: #fa622f;
                    --primary: #7c3aed;
                }

                .product-container {
                    width: 396px;
                    height: 292px;
                    background-color: var(--white);
                    border-radius: 10px;
                    box-shadow: 0 4px 10px var(--container-shadow-color);
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
                    width: 356px;
                    height: auto;
                }

                .product-title {
                    margin: 0;
                    font-size: 16px;
                    color: var(--content);
                }

                .product-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .product-price {
                    font-size: 18px;
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
                    font-size: 18px;
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
                    font-size: 14px;
                    color: var(--gray--600);
                }

                #total-price {
                    font-size: 24px;
                    font-weight: var(--font-bold);
                    margin: 0;
                }

                .reward-info {
                    display: flex;
                    justify-content: flex-end;
                    gap: 4px;
                    align-items: center;
                    margin-top: 4px;
                }

                .reward-badge {
                    background-color: var(--accent--yellow);
                    color: var(--white);
                    font-size: 12px;
                    font-weight: var(--font-bold);
                    padding: 2px 5px;
                    border-radius: 3px;
                }

                .reward-text {
                    font-size: 12px;
                    color: var(--content);
                }

                .button-container {
                    display: flex;
                    gap: 8px;
                    width: 100%;
                }

                .cancel-btn {
                    flex: 1;
                    height: 40px;
                    border: none;
                    font-size: 14px;
                    font-weight: var(--font-bold);
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: var(--gray--50);
                    color: var(--gray--800);
                }

                .cart-btn {
                    flex: 1;
                    height: 40px;
                    border: none;
                    font-size: 14px;
                    font-weight: var(--font-bold);
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: var(--primary);
                    color: var(--white);
                }

                .cart-btn:hover {
                    background-color: var(--primary-hover-color);
                }
            </style>
            <div class="product-container">
                <div class="product-info">
                    <h4 class="product-title">[풀무원] 탱탱쫄면 (4개입)</h4>
                    <div class="product-controls">
                        <p class="product-price"><strong>4,980원</strong></p>
                        <div class="quantity-control">
                            <button id="decrease" class="quantity-btn">-</button>
                            <span id="quantity">1</span>
                            <button id="increase" class="quantity-btn">+</button>
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
                    <button class="cancel-btn">취소</button>
                    <button id="add-to-cart" class="cart-btn">장바구니 담기</button>
                </div>
            </div>
        `;

        const unitPrice = 4980;
        let quantity = 1;

        const decreaseBtn = shadow.getElementById("decrease");
        const increaseBtn = shadow.getElementById("increase");
        const quantityDisplay = shadow.getElementById("quantity");
        const totalPriceDisplay = shadow.getElementById("total-price");

        function updateTotalPrice() {
            const totalPrice = unitPrice * quantity;
            totalPriceDisplay.innerHTML = `<strong>${totalPrice.toLocaleString()}원</strong>`;
        }

        decreaseBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateTotalPrice();
            }
        });

        increaseBtn.addEventListener("click", () => {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateTotalPrice();
        });

        updateTotalPrice();
    }
}

customElements.define("add-cart", AddCartComponent);
