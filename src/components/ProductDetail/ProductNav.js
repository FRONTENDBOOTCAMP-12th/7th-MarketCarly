import { LitElement, html, css } from 'lit';
import resetCSS from '../../Layout/resetCSS';
import base from '../../Layout/base';

// ProductNav Component
export class ProductNav extends LitElement {

	static get styles() {
    return [
      resetCSS,
      base,
      css`
				.product-nav {
					max-width: 65.625rem;
					width: 100%;
					margin: 2.5rem auto 0;
					position: sticky;
					top: 56px;
					z-index: 100;
					margin-inline: auto;
					font-size: var(--text-base);
				
					ul {
						display: flex;
				
						li {
							width: 100%;
							height: 3.375rem;
							background-color: var(--gray--50);
							border: 1px solid var(--gray--200);
				
							a {
								display: flex;
								justify-content: center;
								align-items: center;
								height: 100%;
								color: var(--content);
								text-decoration: none;
								font-weight: var(--font-semibold);
							}
						}
				
						li:not(:nth-child(1)) {
							border-left: none;
						}
				
						li:hover {
							background-color: var(--white);
							a {
								color: var(--primary);
							}
						}
					}
				}
      `,
    ];
  }

  render() {
    return html`
      <nav class="product-nav">
        <ul>
          <li><a href="#description">상품설명</a></li>
          <li><a href="#detail">상세정보</a></li>
          <li><a href="#">후기</a></li>
          <li><a href="#">문의</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('product-nav', ProductNav);