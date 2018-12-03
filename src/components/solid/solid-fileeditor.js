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
import  '/node_modules/evejs/dist/eve.custom.js';
import { FileeditorAgent } from './agents/FileeditorAgent.js'
import { SharedStyles } from '../shared-styles.js';
import { SolidStyles } from './solid-styles.js';
import '@granite-elements/ace-widget/ace-widget.js';
//import  '/node_modules/solid-file-client/solid-file-client.js';
import { SolidTools } from "./solid-tools.js"

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidFileditor extends LitElement {
  render() {
    return html`
    ${SharedStyles}
    ${SolidStyles}
    <style>
    :host {
      display: block;

      padding: 10px;
    }
    </style>

    <div class="card">
    <h1>IdeFileeditor</h1>
    <div>
    Current : ${this.file.url}   <a href="${this.file.url}" target="_blank"><img src="./assets/folder.png"></a>
    </div>
    <!--
    ***
    <ace-widget placeholder="Write something... Anything..." initial-focus>
    </ace-widget>***
    <ace-widget theme="ace/theme/eclipse" softtabs="true" wrap="true" value="This is a nice widget">
    </ace-widget>
    <ace-widget id="aceone" theme="ace/theme/ambiance" softtabs="true" wrap="true">
    This is a nice widget... and we are writing a long text here to show the effets of the \`wrap\` attribute.
    </ace-widget>-->

    <ace-widget
    id="acetwo"
    theme="ace/theme/monokai"
    mode="ace/mode/turtle"
    softtabs="true"
    wrap="true">

    </ace-widget>
    <paper-button id="save" @click="${() =>  this.save()}" raised>Save Edits / Enregistrer</paper-button>
    <paper-button id="undo" @click="${() =>  this.undo()}" raised>Undo / Annuler</paper-button>
    <p class="${this.myBool?'red':'green'}">${this.log}</p>

    <!--  <h1>Tutoriel</h1>
    <p>Modus commodo minimum eum te, vero utinam assueverit per eu.</p>
    <p>Ea duis bonorum nec, falli paulo aliquid ei eum.Has at minim mucius aliquam, est id tempor laoreet.Pro saepe pertinax ei, ad pri animal labores suscipiantur.</p>
    -6>    </div>

    <div class="card">
    <spoggy-input></spoggy-input><!--import "../spoggy/spoggy-input.js";-->
    <!--<solid-login id="solid-login"></solid-login>-->

    </div>
    `;
  }

  static get properties() {
    return {
      current: {type: Object, notify: true, observer: "currentChanged"},
      contenu: {type: String, value: "contenu de l'éditeur"},
      file: {type: Object},
      myBool: { type: Boolean },
      log: {type: String}
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.file = {},
    this.file.url = "";
    this.myBool = true;
    this.log = ""
    //  console.log("ACE ",ace)
    /*  var div = document.createElement('div');
    div.id="blop"
    var shadowRoot = div.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>';
    this.$.editor.appendChild(div)*/
    this.agentFileeditor = new FileeditorAgent("agentFileeditor", this);
    console.log(this.agentFileeditor);
    this.st = new SolidTools();
    this.st.fileclient = new SolidFileClient();
    console.log("FILE CLIENT ", this.fileclient )

  }

  currentChanged(current){
    this.current = current;
    console.log("CURRENT FILE :",this.current)

    this.file = this.current.value

    if(current.key == "file"){
      console.log('file')
      this.shadowRoot.getElementById('acetwo').editorValue = this.file.content;
    }else{
      console.log('folder')
      this.shadowRoot.getElementById('acetwo').editorValue = this.file.content;
    }
  }

  save(){
    var url = this.file.url;
    var newContent = this.shadowRoot.getElementById('acetwo').editorValue;
    console.log("saved :",newContent)
    console.log(url)
    this.st.fileclient.updateFile( url, newContent ).then( success => {
      if(!success) {
        console.log(this.st.fileclient.err)
        this.log = this.st.fileclient.err
        this.myBool = true}
        else {
          console.log( `Updated ${url}.`)
          this.log = "Updated "+url;
          this.myBool = false}
        })

      }

      undo(){
        console.log("UNDO nothing for the moment")
        console.log(this.file.content)
        //this.$.acetwo.value = this.file.content;
        this.shadowRoot.getElementById('acetwo').editorValue = this.file.content
        this.log = "Undo to original";
        this.myBool = false
      }



    }

    window.customElements.define('solid-fileeditor', SolidFileditor);
