import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';

// WhyCarly Component
export class WhyCarly extends LitElement {
  static styles = [
    resetCSS,
    base,
    css`
      .why-carly {
        width: 65.625rem;
        margin: 0 auto;
        text-align: center;
      }

      .why-carly p {
        font-size: var(--text-3xl);
        font-weight: var(--font-bold);
        padding: 72px 40px 35px 0;
      }

      .why-carly__list {
        max-width: 61rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 auto;
      }

      .why-carly__list dl {
        padding: 0 27.5px 56px;
      }

      .why-carly__list dl:before {
        content: '';
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 auto;
        background-size: contain;
      }

      .why-carly__list dl:nth-child(1):before {
        background: url(/assets/icons/WhyCarlyCheck.svg) no-repeat;
      }

      .why-carly__list dl:nth-child(2):before {
        background: url(/assets/icons/WhyCarlyOnly.svg) no-repeat;
      }

      .why-carly__list dl:nth-child(3):before {
        background: url(/assets/icons/WhyCarlyCold.svg) no-repeat;
      }

      .why-carly__list dl:nth-child(4):before {
        background: url(/assets/icons/WhyCarlyPrice.svg) no-repeat;
      }

      .why-carly__list dl:nth-child(5):before {
        background: url(/assets/icons/WhyCarlyCheck.svg) no-repeat;
      }

      .why-carly__title {
        font-size: var(--text-xl);
        font-weight: var(--font-semibold);
        color: var(--primary);
        padding: 16px 0 24px;
      }

      .why-carly__description {
        line-height: var(--line-height-semirelaxed);
      }
    `
  ];

  render() {
    return html`
      <div class="why-carly">
        <p>WHY CARLY</p>

        <div class="why-carly__list">
          <dl>
            <dt class="why-carly__title">깐깐한 상품위원회</dt>
            <dd class="why-carly__description">
              나와 내 가족이 먹고 쓸 상품을 고르는<br />
              마음으로 매주 상품을 직접 먹어보고,<br />
              경험해보고 성분, 맛, 안정성 등 다각도의<br />
              기준을 통과한 상품만을 판매합니다.
            </dd>
          </dl>
          <dl>
            <dt class="why-carly__title">차별화된 Carly Only 상품</dt>
            <dd class="why-carly__description">
              전국 각지와 해외의 훌륭한 생산자가<br />
              믿고 선택하는 파트너,
              컬리.<br />
              3천여 개가 넘는 컬리 단독 브랜드, 스펙의<br />
              Carly Only 상품을 믿고 만나보세요.
            </dd>
          </dl>
          <dl>
            <dt class="why-carly__title">신선한 풀콜드체인 배송</dt>
            <dd class="why-carly__description">
              온라인 업계 최초로 산지에서 문 앞까지<br />
              상온, 냉장, 냉동 상품을 분리 포장 후<br />
              최적의 온도를 유지하는 냉장 배송 시스템,<br />
              풀콜드체인으로 상품을 신선하게 전해드립니다.
            </dd>
          </dl>
          <dl>
            <dt class="why-carly__title">고객, 생산자를 위한 최선의 가격</dt>
            <dd class="why-carly__description">
              매주 대형 마트와 주요 온라인 마트의 가격<br />
              변동 상황을 확인해 신선식품은 품질을<br />
              타협하지 않는 선에서 최선의 가격으로,<br />
              가공식품은 언제나 합리적인 가격으로<br />
              정기 조정합니다.
            </dd>
          </dl>
          <dl>
            <dt class="why-carly__title">환경을 생각하는 지속 가능한 유통</dt>
            <dd class="why-carly__description">
              친환경 포장재부터 생산자가 상품에만<br />
              집중할 수 있는 직매입 유통구조까지,<br />
              속 가능한 유통을 고민하며 컬리를 있게<br />
              하는 모든 환경(생산자, 커뮤니티, 직원)이<br />
              더 나아질 수 있도록 노력합니다.
            </dd>
          </dl>
        </div>
      </div>
    `;
  }
}
customElements.define('why-carly', WhyCarly);