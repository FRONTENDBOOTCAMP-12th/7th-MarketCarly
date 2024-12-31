export class MenuCategory extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "/src/components/MenuCategory/MenuCategory.css");

        const toggleButton = document.createElement("div");
        toggleButton.classList.add("toggle-button");
        toggleButton.innerHTML = `
            <img src="/src/assets/icons/category.svg" alt="카테고리 버튼" width="84" height="24">
        `;

        const container = document.createElement("div");
        container.classList.add("menu-container");
        container.innerHTML = `
            <div class="menu-item"><img src="/src/assets/icons/Gift.svg" alt="선물하기"><span>선물하기</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Vegetable.svg" alt="채소"><span>채소</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Fruit.svg" alt="과일 · 견과 · 쌀"><span>과일 · 견과 · 쌀</span></div>
            <div class="menu-item"><img src="/src/assets/icons/SeaFood.svg" alt="수산 · 해산 · 건어물"><span>수산 · 해산 · 건어물</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Meat.svg" alt="정육 · 계란"><span>정육 · 계란</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Cook.svg" alt="국 · 반찬 · 메인요리"><span>국 · 반찬 · 메인요리</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Salad.svg" alt="샐러드 · 간편식"><span>샐러드 · 간편식</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Oil.svg" alt="면 · 양념 · 오일"><span>면 · 양념 · 오일</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Coffee.svg" alt="생수 · 음료 · 우유 · 커피"><span>생수 · 음료 · 우유 · 커피</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Snack.svg" alt="간식 · 과자 · 떡"><span>간식 · 과자 · 떡</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Bread.svg" alt="베이커리 · 치즈 · 델리"><span>베이커리 · 치즈 · 델리</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Health.svg" alt="건강식품"><span>건강식품</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Wine.svg" alt="와인"><span>와인</span></div>
            <div class="menu-item"><img src="/src/assets/icons/TraditionalLiquor.svg" alt="전통주"><span>전통주</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Detergent.svg" alt="생활용품 · 리빙 · 캠핑"><span>생활용품 · 리빙 · 캠핑</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Cosmetics.svg" alt="스킨케어 · 메이크업"><span>스킨케어 · 메이크업</span></div>
            <div class="menu-item"><img src="/src/assets/icons/shampoo.svg" alt="헤어 · 바디 · 구강"><span>헤어 · 바디 · 구강</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Food.svg" alt="주방용품"><span>주방용품</span></div>
            <div class="menu-item"><img src="/src/assets/icons/HomeAppliances.svg" alt="가전제품"><span>가전제품</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Dog.svg" alt="반려동물"><span>반려동물</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Baby.svg" alt="베이비 · 키즈 · 완구"><span>베이비 · 키즈 · 완구</span></div>
            <div class="menu-item"><img src="/src/assets/icons/Travel.svg" alt="여행 · 티켓"><span>여행 · 티켓</span></div>
        `;

        shadow.appendChild(linkElement);
        shadow.appendChild(toggleButton);
        shadow.appendChild(container);
    }
}

customElements.define("menu-category", MenuCategory);