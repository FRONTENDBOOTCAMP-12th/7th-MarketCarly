import { LitElement, html, css } from 'lit';
import resetCSS from '../resetCSS.ts';
import baseCSS from '../base.ts';
import '../../components/MenuCategory/MenuCategory';

export class HeaderNav extends LitElement {
  static get styles() {
    return [
      baseCSS,
      resetCSS,
      css`
        .nav {
          width: 100%;
          border-bottom: 1px solid var(--gray--100);
        }

        .nav__inner {
          max-width: 1050px;
          padding: 16px 0px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav__menu {
          display: flex;
          font-size: 1rem;

          & a {
            display: flex;
            width: 150px;
            padding: 8px 0px;
            justify-content: center;
            align-items: flex-end;
            gap: 4px;
            text-decoration: none;
            color: inherit;
          }
        }

        .nav__delivery-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--gray-300, #a6a6a6);
          border-radius: 16px;
          color: var(--gray--800);
          font-size: var(--text-sm);
          background-color: var(--white);
          font-weight: 400;
          font-size: 0.75rem;
          word-break: keep-all;
          white-space: nowrap;
        }

        .nav__delivery-info--highlight {
          color: var(--primary, #5f0080);
        }

        .nav__delivery-info--text {
          color: var(--gray-500, #6b6b6b);
        }

        @media (max-width: 760px) {
          .nav {
            overflow-x: scroll;
            scrollbar-width: none;
          }

          .nav::-webkit-scrollbar {
            width: 0;
            height: 0;
          }

          .nav__menu {
            font-size: var(--text-md);

            & a {
              word-break: keep-all;
              width: 100px;
              padding: 0px;
            }
          }
        }

        @media (max-width: 450px) {
          .nav__delivery-info {
            width: 90px;
            gap: 0.125rem;
            padding: 0.125rem 0.5rem;

            border: 1px solid var(--gray-300, #a6a6a6);
            border-radius: 16px;
            font-size: 0.625rem;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <nav class="nav">
        <div class="nav__inner">
          <menu-category></menu-category>
          <div class="nav__menu">
            <a href="/src/pages/productList/?category=new">신상품</a>
            <a href="/src/pages/productList/?category=best">베스트</a>
            <a href="/src/pages/productList/?category=sales">알뜰쇼핑</a>
            <a href="/special">특가/혜택</a>
          </div>
          <div class="nav__delivery-info">
            <span class="nav__delivery-info--highlight">샛별・낮</span>
            <span class="nav__delivery-info--text">배송안내</span>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('header-nav', HeaderNav);
