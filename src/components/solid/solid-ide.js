import { LitElement, html } from '@polymer/lit-element';

import "./solid-current.js";
import "./solid-foldermenu.js";
import "./solid-filemanager.js";
import "./solid-foldermanager.js";
import "./solid-fileeditor.js";
import "spoggy-graph/spoggy-graph.js";


//import "./ide-current.js";
/*import "./ide-foldermenu.js";
import "./ide-filedisplay.js";
import "./ide-fileeditor.js";

import "./ide-commands.js";
import "./ide-filemanager.js";
import "./ide-foldermanager.js";
import "./ide-optionsmanager.js";
import "spoggy-graph/spoggy-graph.js";*/

class SolidIde extends LitElement {
  render() {
    return html`

    <section>
    <solid-current current=${this.current}></solid-current>
    </section>

    <section>
    <solid-foldermenu current=${this.current}></solid-foldermenu>
    <solid-fileeditor current=${this.current}></solid-fileeditor>
    <spoggy-graph current=${this.current}></spoggy-graph>
    <solid-filemanager current={{current}}></solid-filemanager>
    <solid-foldermanager current={{current}}></solid-foldermanager>
    </section>
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

window.customElements.define('solid-ide', SolidIde);
