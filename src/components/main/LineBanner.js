import { LitElement, html, css } from 'lit';
import resetCSS from '@/Layout/resetCSS';

export class LineBanner extends LitElement {
  static get styles() {
    return [
      resetCSS,
      css`
        :host {
          display: block;
          width: 100%;
        }

        .line-banner {
          display: flex;
          justify-content: center;
          padding: 0.5rem 0;
          margin: 0 auto;
          max-width: 1050px;
          background-color: #ffffff;
        }

        .banner-container {
          max-width: 1050px;
          width: 100%;
          margin: 0 auto;
          padding: 0.5rem 0;
        }

        .banner-image {
          max-width: 100%;
          height: auto;
          aspect-ratio: 1050 / 139;
          display: block;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.imageUrl = '/assets/images/line-banner-1.webp';
    this.altText = '더 풍성해진 10월의 퍼플위크';
  }

  render() {
    return html`
      <div class="line-banner">
        <div class="banner-container">
          <img class="banner-image" src=${this.imageUrl} alt=${this.altText} />
        </div>
      </div>
    `;
  }
}

customElements.define('line-banner', LineBanner);
