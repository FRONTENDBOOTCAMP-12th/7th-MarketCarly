import { LitElement, html, css } from 'lit';
import resetCSS from '@/Layout/resetCSS.ts';
import baseCSS from '@/Layout/base.ts';

class MenuCategory extends LitElement {
  static get styles() {
    return [
      resetCSS,
      baseCSS,
      css`
        .menu-container {
          display: none;
          width: 15.44rem;
          flex-direction: column;
          background-color: var(--white);
          border: 0.063rem solid var(--gray--100);
          border-radius: 0.5rem;
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
          height: 2.5rem;
          padding: 0.5rem;
          gap: 0.625rem;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          user-select: none;
        }

        .menu-item img {
          width: 24px;
          height: 24px;
          display: block;
          transition: filter 0.3s ease;
        }

        .menu-item:hover {
          background-color: var(--gray--50);
        }

        .menu-item span {
          color: var(--content);
        }

        .menu-item:hover span {
          color: var(--primary); 
        }

        .menu-item:hover img {
          filter: brightness(0) saturate(100%) invert(30%) sepia(70%) saturate(700%) hue-rotate(260deg) brightness(100%) contrast(95%);
        }
          
        .toggle-button {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        :host(:hover) .menu-container {
          display: flex;
        }
      `,
    ];
  }

  firstUpdated() {
    const root = this.renderRoot.host;
    const primaryColor = getComputedStyle(this).getPropertyValue('--primary').trim();
    const dynamicFilter = this.colorToFilter(primaryColor);

    root.style.setProperty('--dynamic-filter', dynamicFilter);
  }

  colorToFilter(color) {
    if (!color) return 'none';

    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const computedColor = getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    const rgb = computedColor
      .match(/\d+/g)
      .map((value) => parseInt(value, 10));

    const [r, g, b] = rgb;

    return `brightness(0) saturate(100%) invert(${r / 255 * 100}%) sepia(${g / 255 * 100}%) saturate(${b / 255 * 100}%)`;
  }

  render() {
    return html`
      <div class="toggle-button">
        <img src="/assets/icons/category.svg" alt="카테고리 버튼" />
      </div>
      <div class="menu-container">
        <div class="menu-item">
          <img src="/assets/icons/Gift.svg" alt="선물하기" />
          <span>선물하기</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Vegetable.svg" alt="채소" />
          <span>채소</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Fruit.svg" alt="과일 · 견과 · 쌀" />
          <span>과일 · 견과 · 쌀</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/SeaFood.svg" alt="수산 · 해산 · 건어물" />
          <span>수산 · 해산 · 건어물</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Meat.svg" alt="정육 · 계란" />
          <span>정육 · 계란</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Cook.svg" alt="국 · 반찬 · 메인요리" />
          <span>국 · 반찬 · 메인요리</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Salad.svg" alt="샐러드 · 간편식" />
          <span>샐러드 · 간편식</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Oil.svg" alt="면 · 양념 · 오일" />
          <span>면 · 양념 · 오일</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Coffee.svg" alt="생수 · 음료 · 우유 · 커피" />
          <span>생수 · 음료 · 우유 · 커피</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Snack.svg" alt="간식 · 과자 · 떡" />
          <span>간식 · 과자 · 떡</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Bread.svg" alt="베이커리 · 치즈 · 델리" />
          <span>베이커리 · 치즈 · 델리</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Health.svg" alt="건강식품" />
          <span>건강식품</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Wine.svg" alt="와인" />
          <span>와인</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/TraditionalLiquor.svg" alt="전통주" />
          <span>전통주</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Detergent.svg" alt="생활용품 · 리빙 · 캠핑" />
          <span>생활용품 · 리빙 · 캠핑</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Cosmetics.svg" alt="스킨케어 · 메이크업" />
          <span>스킨케어 · 메이크업</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/shampoo.svg" alt="헤어 · 바디 · 구강" />
          <span>헤어 · 바디 · 구강</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Food.svg" alt="주방용품" />
          <span>주방용품</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/HomeAppliances.svg" alt="가전제품" />
          <span>가전제품</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Dog.svg" alt="반려동물" />
          <span>반려동물</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Baby.svg" alt="베이비 · 키즈 · 완구" />
          <span>베이비 · 키즈 · 완구</span>
        </div>
        <div class="menu-item">
          <img src="/assets/icons/Travel.svg" alt="여행 · 티켓" />
          <span>여행 · 티켓</span>
        </div>
      </div>
    `;
  }
}

customElements.define('menu-category', MenuCategory);
