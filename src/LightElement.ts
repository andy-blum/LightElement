import { LitElement } from 'lit';

class LightElement extends LitElement {

  createRenderRoot() {
    return this;
  }

  update(changedProperties) {
    if (!this.__authoredChildNodes) {
      this.__authoredChildNodes = Array.from(this.childNodes);
    }
    super.update(changedProperties);
  }

  firstUpdated() {
    const { __authoredChildNodes } = this;

    __authoredChildNodes?.forEach(node => {
      switch (node.nodeType) {
        case Node.TEXT_NODE:
          this.querySelector('slot:not([name])')?.appendChild(node);
          break;

        case Node.ELEMENT_NODE:
          const targetSlot = node.getAttribute('slot');
          if (targetSlot) {
            this.querySelector(`slot[name="${targetSlot}"]`)?.appendChild(node);
          } else {
            this.querySelector('slot:not([name])')?.appendChild(node);
          }
          break;

        default:
          break;
      }
    })
  }
}

export default LightElement;
