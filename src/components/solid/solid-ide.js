import { LitElement, html } from '@polymer/lit-element';

import "./solid-current.js";
import "./solid-foldermenu.js";
import "./solid-filemanager.js";
//import "./solid-foldermanager.js";
import "./solid-fileeditor.js";
import "./solid-graph.js";
import 'paper-collapse-item/paper-collapse-item.js';
import { SharedStyles } from '../shared-styles.js';

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
    ${SharedStyles}


    <section>
    <paper-collapse-item header="Current" opened>

    <solid-current current=${this.current}></solid-current>

    </paper-collapse-item>
    </section>

    <section>
    <paper-collapse-item header="Graph" opened>

    <solid-graph id="spoggy-graph" current=${this.current}></solid-graph>

    </paper-collapse-item>
    </section>

    <section>
    <paper-collapse-item header="FolderMenu" >

    <solid-foldermenu current=${this.current}></solid-foldermenu>

    </paper-collapse-item>
    </section>
    <section>
    <paper-collapse-item header="Editor" >
    
    <solid-fileeditor current=${this.current}></solid-fileeditor>

    </paper-collapse-item>
    </section>
    <!--  <solid-filemanager current={{current}}></solid-filemanager>
    <solid-foldermanager current={{current}}></solid-foldermanager>-->


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
