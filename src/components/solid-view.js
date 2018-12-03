import { html } from '@polymer/lit-element/lit-element.js';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';

import  '/node_modules/solid-auth-client/dist-lib/solid-auth-client.bundle.js';
import  '/node_modules/rdflib/dist/rdflib.min.js';
import  '/node_modules/solid-file-client/solid-file-client.js';
import "./solid/solid-login.js";
import "./solid/solid-ide.js";

class SolidView extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <section>
    <p> status : ${this.status}</p>
    </section>
parcourir un pod public sans être connecté
    <section>
    <solid-login></solid-login>
    </section>
<!--
    <section>
    <solid-profile></solid-profile>
    </section>-->

    <section>
    <solid-ide></solid-ide>
    </section>
    `
  }

  static get properties() {
    return {
      status: String
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.status = "inconnu";
    solid.auth.trackSession(session => {
      if (!session){
        this.status = "deconnecté";
      }
      else{
        this.status = "connecté";
      }
    })
  }
}
window.customElements.define('solid-view', SolidView);
