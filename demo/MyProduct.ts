import LightElement from "../src/LightElement";
import { css, html } from "lit";
import { property, state } from 'lit/decorators.js';
import { customElement } from "../src/custom-element";

@customElement('my-product')
export default class MyProduct extends LightElement {

  @property({ attribute: 'product-id' })
  productId;

  @state()
  productDetails;

  async connectedCallback() {
    super.connectedCallback();
    const { productId } = this;

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`)

    if (response.ok) {
      this.productDetails = await response.json();
    }
  }

  render() {
    const { productDetails } = this;
    const { title, price, image, description } = productDetails || {};

    return html`
      <div class="component-wrapper">
        <img src="${image}" alt="${description}" width="75" height="75">
        <h3>${title || '...'} ($${price || "??"})</h3>
        <div class="component-contents">
          <slot></slot>
        </div>
        <div class="component-cta">
          <a href="#!" class="button">Learn More</a>
          <button data-chatteam>Get Support</button>
        </div>
      </div>
    `
  }

  static styles = css`
    @scope (my-product) to (slot > * > *) {
      .component-wrapper {
        display: grid;
        gap: 1rem;
        grid-template-columns: 75px 400px;
        grid-template-rows: auto auto auto;
      }

      * {
        grid-column: 2;
      }

      img {
        grid-column: 1;
        grid-row: 1 / -1;
        background: #eee;
      }

      h3 {
        color: rebeccapurple;
        margin: 0;
      }

      p {
        margin: 0;
      }

      .component-cta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
      }
    }
  `
}
