import { LitElement, html, css } from 'lit';

class MenuCategory extends LitElement {
  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Pretendard Variable', Pretendard, sans-serif;
    }

    .menu-container {
      display: none;
      width: 247px;
      flex-direction: column;
      background-color: var(--white);
      border: 1px solid var(--gray--100);
      border-radius: 8px;
      box-shadow: var(--below---low);
      overflow: hidden;
      position: absolute;
      z-index: 100;
    }

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 40px;
      padding: 8px;
      gap: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
      user-select: none;
    }

    .menu-item img {
      width: 24px;
      height: 24px;
      display: block;
      transition: fill 0.3s ease;
    }

    .menu-item span {
      font-size: var(--text-base);
      line-height: var(--line-height-normal);
      font-weight: var(--font-semibold);
      color: var(--content);
      display: block;
      transition: color 0.3s ease;
    }

    .menu-item:hover {
      background-color: var(--gray--50);
      border-radius: 8px;
    }

    .menu-item:hover img {
      filter: brightness(0) saturate(100%) invert(30%) sepia(70%) saturate(700%)
        hue-rotate(260deg) brightness(100%) contrast(95%);
    }

    .menu-item:hover span {
      color: var(--primary);
    }

    .toggle-button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 4px;
      width: auto;
      height: auto;
      position: relative;
    }

    :host(:hover) .menu-container {
      display: flex;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    const globalStyleBase = document.createElement('link');
    globalStyleBase.rel = 'stylesheet';
    globalStyleBase.href = '/src/styles/base.css';

    const globalStyleReset = document.createElement('link');
    globalStyleReset.rel = 'stylesheet';
    globalStyleReset.href = '/src/styles/reset.css';

    document.head.appendChild(globalStyleBase);
    document.head.appendChild(globalStyleReset);
  }

  render() {
    return html`
      <div class="toggle-button">
        <img src="/public/category.svg" alt="카테고리 버튼" width="84" height="24" />
      </div>
      <div class="menu-container">
        <div class="menu-item">
          <img src="/public/Gift.svg" alt="선물하기" />
          <span>선물하기</span>
        </div>
        <div class="menu-item">
          <img src="/public/Vegetable.svg" alt="채소" />
          <span>채소</span>
        </div>
        <div class="menu-item">
          <img src="/public/Fruit.svg" alt="과일 · 견과 · 쌀" />
          <span>과일 · 견과 · 쌀</span>
        </div>
        <div class="menu-item">
          <img src="/public/SeaFood.svg" alt="수산 · 해산 · 건어물" />
          <span>수산 · 해산 · 건어물</span>
        </div>
        <div class="menu-item">
          <img src="/public/Meat.svg" alt="정육 · 계란" />
          <span>정육 · 계란</span>
        </div>
        <div class="menu-item">
          <img src="/public/Cook.svg" alt="국 · 반찬 · 메인요리" />
          <span>국 · 반찬 · 메인요리</span>
        </div>
        <div class="menu-item">
          <img src="/public/Salad.svg" alt="샐러드 · 간편식" />
          <span>샐러드 · 간편식</span>
        </div>
        <div class="menu-item">
          <img src="/public/Oil.svg" alt="면 · 양념 · 오일" />
          <span>면 · 양념 · 오일</span>
        </div>
        <div class="menu-item">
          <img src="/public/Coffee.svg" alt="생수 · 음료 · 우유 · 커피" />
          <span>생수 · 음료 · 우유 · 커피</span>
        </div>
        <div class="menu-item">
          <img src="/public/Snack.svg" alt="간식 · 과자 · 떡" />
          <span>간식 · 과자 · 떡</span>
        </div>
        <div class="menu-item">
          <img src="/public/Bread.svg" alt="베이커리 · 치즈 · 델리" />
          <span>베이커리 · 치즈 · 델리</span>
        </div>
        <div class="menu-item">
          <img src="/public/Health.svg" alt="건강식품" />
          <span>건강식품</span>
        </div>
        <div class="menu-item">
          <img src="/public/Wine.svg" alt="와인" />
          <span>와인</span>
        </div>
        <div class="menu-item">
          <img src="/public/TraditionalLiquor.svg" alt="전통주" />
          <span>전통주</span>
        </div>
        <div class="menu-item">
          <img src="/public/Detergent.svg" alt="생활용품 · 리빙 · 캠핑" />
          <span>생활용품 · 리빙 · 캠핑</span>
        </div>
        <div class="menu-item">
          <img src="/public/Cosmetics.svg" alt="스킨케어 · 메이크업" />
          <span>스킨케어 · 메이크업</span>
        </div>
        <div class="menu-item">
          <img src="/public/shampoo.svg" alt="헤어 · 바디 · 구강" />
          <span>헤어 · 바디 · 구강</span>
        </div>
        <div class="menu-item">
          <img src="/public/Food.svg" alt="주방용품" />
          <span>주방용품</span>
        </div>
        <div class="menu-item">
          <img src="/public/HomeAppliances.svg" alt="가전제품" />
          <span>가전제품</span>
        </div>
        <div class="menu-item">
          <img src="/public/Dog.svg" alt="반려동물" />
          <span>반려동물</span>
        </div>
        <div class="menu-item">
          <img src="/public/Baby.svg" alt="베이비 · 키즈 · 완구" />
          <span>베이비 · 키즈 · 완구</span>
        </div>
        <div class="menu-item">
          <img src="/public/Travel.svg" alt="여행 · 티켓" />
          <span>여행 · 티켓</span>
        </div>
      </div>
    `;
  }
}

customElements.define('menu-category', MenuCategory);
