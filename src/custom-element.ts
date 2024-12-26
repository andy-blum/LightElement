export const customElement = (tagName) => (componentClass) => {
  if (Object.create(componentClass.prototype) instanceof HTMLElement ) {
    try {
      customElements.define(tagName, componentClass);

      if (componentClass.styles) {
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(componentClass.styles.cssText);
        document.adoptedStyleSheets.push(stylesheet);
      }

    } catch (error) {
      console.error(error);
    }
  }
}
