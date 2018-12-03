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
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-item/paper-item.js';
import  '/node_modules/evejs/dist/eve.custom.js';
import { FoldermenuAgent } from './agents/FoldermenuAgent.js'
import { SharedStyles } from '../shared-styles.js';
import { SolidStyles } from './solid-styles.js';
import { SolidTools } from "./solid-tools.js"

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidFoldermenu extends LitElement {
  render() {
    return html`
    ${SharedStyles}
    ${SolidStyles}
    <style>
    p {
      font-family: Roboto;
    /*  font-size: 24px;
      font-weight: 500;*/
    }
    .red {
      color: red;
    }
    .green {
      color: green;
    }
    </style>
    <h1>Foldermenu</h1>


    <div class="card">
    <!--  <div class="circle">IdeFoldermenu</div>-->

    <button on-tap="manageResource(${this.folder})" class="docIcon" v-bind:class="canControl()">
    <img src="./assets/folder.png">
    </button>
    <button class="fileName" v-on:click="get(${this.folder})">
    <span id="currentFolder">${this.folder.name}</span>
    </button>
    <hr>

    <table border="1">
    <tr>
    <td>
    ${this.folder.folders.map(i => html`
      <paper-item raised @click="${(e) =>  this.get(i)}"> <img src="./assets/folder.png" />${i.name}</paper-item>
      `)}
      </td>

      <td>
      ${this.folder.files.map(i => html`
        <paper-item raised @click="${(e) =>  this.get(i)}" title="${i.type}"> <img src="./assets/document.png" />${i.label}</paper-item>
        `)}
        </td>

        <td>
        <paper-input id="nameInput" label="name of folder or file to create / nom du dossier ou du fichier a créer" ></paper-input>
        <paper-button raised  @click="${(e) =>  this.createFolder()}">Create Folder / creer un dossier</paper-button><br>
        <paper-button raised  @click="${(e) =>  this.createFile()}">Create File / creer un fichier</paper-button><br>
        <p class="${this.myBool?'red':'green'}">${this.log}</p>
        </td>
        </tr>
        </table>
        </div>

        `;
      }

      static get properties() {
        return {
          current: {type: Object, notify: true},
          folder: {type: Object, notify: true},
          myBool: { type: Boolean },
          log: {type: String}
        }
      }

      constructor(){
        super();
        this.myBool = true;
        this.log = "vide"
      }

      connectedCallback(){
        super.connectedCallback();
        this.agentFoldermenu = new FoldermenuAgent("agentFoldermenu", this);
        console.log(this.agentFoldermenu);
        this.st = new SolidTools();
        this.st.fileclient = new SolidFileClient();
        console.log("FILE CLIENT ", this.fileclient )
        console.log("CURRENT FOLDERMENU :",this.current);
        this.folder = {}
        this.folder.name = null
        this.folder.folders = []
        this.folder.files = []
        //  this.log = "";
      }
      currentChanged(current){
        console.log(current)
        this.current= current;
        if(current.key == "folder"){
          this.folder = current.value
          console.log("FOLDER NEW :",this.folder)
        }
      }

      async get(item){
        //  console.log("GET,", e.model.item)
        /*console.log(this.public)
        this.thing.url = this.public;*/
        var thing = item;
        console.log(thing)
        var res = await this.st.get(thing);
        console.log("RESULT : ",res)
        if (res.key == "folder"){
          this.folder = res.value;
        }else{
          console.log("traitement d'un fichier")
          this.current = res;
        }

      }

      createFile(){
        var newFile = this.folder.url+this.shadowRoot.getElementById('nameInput').value;
        console.log(newFile)
        this.st.fileclient.createFile( newFile ).then( success => {
          if(!success){
            console.log(this.st.fileclient.err)
            this.log = this.st.fileclient.err
            this.myBool = true
          }
          else {
            this.log = "Created file "+newFile;
            console.log( `Created file ${newFile}.`)
            this.myBool = false
          }
        })
      }

      createFolder(){
        var url = this.folder.url+this.shadowRoot.getElementById('nameInput').value;
        console.log(url)
        this.st.fileclient.createFolder( url ).then( success => {
          if(!success) {
            console.log(this.st.fileclient.err)
            this.log = this.st.fileclient.err
            this.myBool = true
          }
          else {
            this.log = "Created Folder "+url;
            console.log( `Created folder ${url}.`)
            this.myBool = false
          }
        })
      }


    }

    window.customElements.define('solid-foldermenu', SolidFoldermenu);
