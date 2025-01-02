import { LitElement, html, css } from 'lit';
import resetCSS from '../resetCSS.ts';
import baseCSS from '../base.ts';

export class SearchBar extends LitElement {
  static get styles() {
    return [
      baseCSS,
      resetCSS,
      css`
        .search__form {
          position: relative;
          width: 400px;
        }

        .search__input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid var(--primary, #5f0080);
          border-radius: 4px;
          font-size: var(--text-base);
        }

        .search__button {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          align-items: center;
        }

        @media (max-width: 876px) {
          .search__form {
            width: 300px;
          }
        }

        @media (max-width: 768px) {
          .search__form {
            width: 300px;
          }
        }
        @media (max-width: 600px) {
          .search__form {
            width: 220px;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <form class="search__form" role="search">
        <input
          id="searchInput"
          type="search"
          class="search__input"
          placeholder="검색어를 입력해주세요"
        />
        <button type="submit" class="search__button" aria-label="검색">
          <img src="/assets/icons/Search.svg" alt="" aria-hidden="true" />
        </button>
      </form>
    `;
  }
}

customElements.define('search-bar', SearchBar);
