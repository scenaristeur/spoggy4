/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidFoldermenu extends LitElement {
  render() {
    return html`

    ${this.session.webId}
    ${this.current}
    `;
  }

  static get properties() { return {
    connected: {type: Boolean},
    session: {type: Object}
  }};

  constructor() {
    super();
    this.connected = false;
    this.session = {};
  }
  connectedCallback(){
    super.connectedCallback();
    console.log(solid)
    console.log($rdf)
    //this.status = "inconnu"

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        this.connected = false;
        this.session = {};
        this.session.webId=null;
      }
      else{
        console.log(`The user is ${session.webId}`)
        this.connected = true;
        this.session = session;
      }
    })
  }

}

window.customElements.define('solid-foldermenu', SolidFoldermenu);
