import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';
import baseCSS from '/src/Layout/base.ts';

class Pagination extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.totalItems = 8;
    this.itemsPerPage = 6;
    this.currentPage = 1;
  }

  static get properties() {
    return {
      totalItems: { type: Number },
      itemsPerPage: { type: Number },
      currentPage: { type: Number },
    };
  }

  static get styles() {
    return [
      resetCSS, 
      baseCSS,
      css`
        .pagination-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .pagination {
          display: table;
          border-collapse: collapse;
        }

        a {
          display: table-cell;
          width: 2.125rem;
          height: 2.125rem;
          border: 0.0625rem solid var(--gray--100);
          text-align: center;
          align-content: center;
          color: var(--content);
          font-size: var(--text-xs);

          &:hover {
            background-color: var(--gray--200);
          }

          &.current {
            background-color: var(--gray--200);
            color: var(--primary);
          }
        }

        .pagination__to-first {
          background: url('/assets/icons/DoubleArrow-left.svg') no-repeat center;
        }

        .pagination__to-previous {
          background: url('/assets/icons/SingleArrow-left.svg') no-repeat center;
        }

        .pagination__to-next {
          background: url('/assets/icons/SingleArrow-right.svg') no-repeat center;
        }

        .pagination__to-last {
          background: url('/assets/icons/DoubleArrow-right.svg') no-repeat center;
        }
      `
    ];
  }

  handleClickPageNum(pageNum, e) {
    if (pageNum < 1 || pageNum > Math.ceil(this.totalItems / this.itemsPerPage))
      return;

    this.currentPage = pageNum;

    e.preventDefault();

    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: { currentPage: this.currentPage },
      bubbles: true,
      composed: true,
    }));
  }

  get paginationNumbers() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  render() {
    const pageNumbers = this.paginationNumbers;

    return html`
      <div class="pagination-container">
        <div class="pagination">
          <a 
            href="#" 
            class="pagination__to-first" 
            @click="${(e) => this.handleClickPageNum(1,e)}"
            aria-label="첫 페이지로 이동" 
            role="button"
            tabindex="0"
          ></a>
          <a 
            href="#" 
            class="pagination__to-previous" 
            @click="${(e) => this.handleClickPageNum(this.currentPage - 1,e)}"
            aria-label="이전 페이지로 이동" 
            role="button"
            tabindex="0"
          ></a>
          ${pageNumbers.map(page => html`
            <a 
              href="#" 
              class="${this.currentPage === page ? 'current' : ''}" 
              @click="${(e) => this.handleClickPageNum(page, e)}"
              aria-current="${this.currentPage === page ? 'page' : undefined}"
              aria-label="${page}페이지로 이동"
              role="button"
              tabindex="0"
            >
              ${page}
            </a>
          `)}
          <a 
            href="#" 
            class="pagination__to-next" 
            @click="${(e) => this.handleClickPageNum(this.currentPage + 1,e)}"
            aria-label="다음 페이지로 이동" 
            role="button"
            tabindex="0"
          ></a>
          <a 
            href="#" 
            class="pagination__to-last" 
            @click="${(e) => this.handleClickPageNum(this.totalPages,e)}"
            aria-label="마지막 페이지로 이동" 
            role="button"
            tabindex="0"
          ></a>
        </div>
      </div>
    `;
  }
}

customElements.define('pagination-section', Pagination);
