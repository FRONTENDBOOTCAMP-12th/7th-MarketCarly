class AddCartComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <link rel="stylesheet" href="./AddCart.css">
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
        const addToCartBtn = shadow.getElementById("add-to-cart");

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

        addToCartBtn.addEventListener("click", () => {
            alert(`장바구니에 ${quantity}개의 상품이 담겼습니다!`);
        });

        updateTotalPrice();
    }
}

customElements.define("add-cart", AddCartComponent);