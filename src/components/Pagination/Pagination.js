import { LitElement, html, css } from 'lit';
import resetCSS from '/src/Layout/resetCSS.ts';
import baseCSS from '/src/Layout/base.ts';

class Pagination extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.totalItems = 26;
    this.itemsPerPage = 12;
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
          width: 34px;
          height: 34px;
          border: 1px solid var(--gray--100);
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

  handleClickPageNum(pageNum) {
    this.currentPage = pageNum;
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
          <a href="/" class="pagination__to-first" @click="${() => this.handleClickPageNum(1)}"></a>
          <a href="/" class="pagination__to-previous" @click="${() => this.handleClickPageNum(this.currentPage - 1)}"></a>
          ${pageNumbers.map(page => html`
            <a 
              href="/" 
              class="${this.currentPage === page ? 'current' : ''}" 
              @click="${() => this.handleClickPageNum(page)}"
            >
              ${page}
            </a>
          `)}
          <a href="/" class="pagination__to-next" @click="${() => this.handleClickPageNum(this.currentPage + 1)}"></a>
          <a href="/" class="pagination__to-last" @click="${() => this.handleClickPageNum(this.totalPages)}"></a>
        </div>
      </div>
    `;
  }
}

customElements.define('pagination-section', Pagination);
