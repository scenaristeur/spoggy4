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
import  '/node_modules/evejs/dist/eve.custom.js';
import { GraphAgent } from './agents/GraphAgent.js'
//import  '/node_modules/solid-file-client/solid-file-client.js';
import { SolidTools } from "./solid-tools.js"
import './spoggy-vis.js'

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidGraph extends LitElement {
  render() {
    return html`
    SOLID GRAPH
    <paper-input id="currentInput" label="Current Folder / Dossier Courant" value="${this.current.value.url}"></paper-input>
    <paper-button id="goBtn" raised   @click="${this.go}">Go</paper-button>
    <spoggy-vis current=${this.current}></spoggy-vis>
    `;
  }

  static get properties() {
    return {
      store: Object,
      fetcher: Object,
      context: {type: Object, value: {}},
      webId: Object,
      public: {type: String, notify: true},
      current: {type: Object},
      thing: {type: Object, value: {}}
    }
  }

  connectedCallback(){
    super.connectedCallback();
    var app = this;
    this.current = {value:{url:"",content:""}}
    //console.log( 'id : ', this.id);
    this.agentGraph = new GraphAgent("agentGraph", this);
    console.log(this.agentGraph);
    //this.agentVis.send('agentApp', {type: 'dispo', name: this.id });

    console.log(solid)
    console.log($rdf)
    app.thing={}
    //  this.fileclient = new SolidFileClient();
    this.st = new SolidTools();
    this.st.fileclient = new SolidFileClient();
    console.log("FILE CLIENT ", this.fileclient )
    // NAMESPACES : https://github.com/solid/solid-namespace/blob/master/index.js
    this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    this.SPACE = $rdf.Namespace('http://www.w3.org/ns/pim/space#');
    this.SOLID = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');
    this.RDFS = $rdf .Namespace('http://www.w3.org/2000/01/rdf-schema#');
    this.OWL = $rdf .Namespace('http://www.w3.org/2002/07/owl#');

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
      /*  app.context = null;
        //app.$.podInput.value = ""
        app.current = {}
        app.public = "https://smag0.solid.community/public/"
        app.thing = {}*/
      }
      else{
        console.log(`The user is ${session.webId}`)
      /*  app.context = {}
        app.context.wedId = session.webId;

        app.context.me = $rdf.sym(session.webId)
        app.store = $rdf.graph() // Make a Quad store
        app.fetcher = $rdf.fetcher(app.store) // Attach a web I/O module, store.fetcher
        app.store.updater = new $rdf.UpdateManager(app.store) // Add real-time live updates store.updater
        app.context.profileDocument = app.context.me.doc()
        console.log(app.context.me)
        console.log(app.fetcher)
        console.log(app.store)
        console.log("PROFILEDOC ",app.context.profileDocument)
        var wedIdSpilt = session.webId.split("/");
        this._webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
        console.log(this._webIdRoot);
        app.public = this._webIdRoot+"public/";*/

        //  this.loadProfileDocument();
      }

    })
  }

currentChanged(current){
  console.log(current)
  this.current = current;
}



}

window.customElements.define('solid-graph', SolidGraph);
