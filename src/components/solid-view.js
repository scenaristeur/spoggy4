import { html } from '@polymer/lit-element/lit-element.js';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';
import { plusIcon } from './my-icons.js';

class SolidView extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>Solid view</h2>
        <p>The page you're looking for doesn't seem to exist. Head back
           <a href="/">home</a> and try again?
        </p>
        <button  title="plus">${plusIcon}</button>
      </section>
    `
  }
}
window.customElements.define('solid-view', SolidView);
