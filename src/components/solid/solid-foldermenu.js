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
    <h1>Foldermenu</h1>


    <div class="card">
    <!--  <div class="circle">IdeFoldermenu</div>-->
    <div>  Folder.name : ${this.folder.name}</br>
    Current: ${this.current}

    <paper-input id="nameInput" label="name of folder or file / nom du dossier ou du fichier" value=${this.folder.name}></paper-input>
    <paper-button raised on-tap="createFolder">Create Folder / creer un dossier</paper-button>
    <paper-button raised on-tap="createFile">Create File / creer un fichier</paper-button>
    </div>

    <button on-tap="manageResource(${this.folder})" class="docIcon" v-bind:class="canControl()">
    <img src="./assets/folder.png">
    </button>
    <button class="fileName" v-on:click="get(${this.folder})">
    <span id="currentFolder">${this.folder.name}</span>
    </button>
    <hr>


    ${this.folder.folders.map(i => html`
      <paper-item raised @click="${(e) =>  this.get(i)}"> <img src="./assets/folder.png" />${i.name}</paper-item>
      `)}

      <!--<template is="dom-repeat" items="[[this.folder.folders]]">
      <paper-item raised on-tap="get"> <img src="./assets/folder.png" />[[item.name]]</paper-item>
      </template>-->

      <!--<ul>
      <li v-for="subFolder in folder.folders">
      <button class="docIcon">
      <img src="./assets/folder.png" />
      </button>
      <button class="fileName" v-on:click="get(subFolder)">
      <img src="./assets/folder.png" />
      {{subFolder.name}}
      </button>
      </li>
      </ul>-->
      <hr>

      <!--<template is="dom-repeat" items="[[this.folder.files]]">
      <paper-item raised on-tap="get" title="[[item.type]]"><img src="./assets/document.png"> [[item.label]] </paper-item>
      </template>-->

      ${this.folder.files.map(i => html`
        <paper-item raised @click="${(e) =>  this.get(i)}" title="${i.type}"> <img src="./assets/document.png" />${i.label}</paper-item>
        `)}
        <!--[download]-->
        <!--<ul>
        <li v-for="f in folder.files">
        <button v-on:click="rm(f)" class="docIcon" v-bind:class="canControl()">
        <img src="./assets/document.png">
        </button>
        <button class="fileName" v-on:click.right="download(f)" v-on:click="get([[f]])" v-bind:title="f.label+' '+f.type">
        {{f.label}}
        </button>
        </li>
        </ul>-->
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
          current: {type: Object, notify: true},
          folder: {type: Object, notify: true},
        }
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
        this.folder.name = "inconnu"
        this.folder.folders = []
        this.folder.files = []
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
        var newFile = this.folder.url+this.$.nameInput.value;
        console.log(newFile)
        this.st.fileclient.createFile( newFile ).then( success => {
          if(!success) console.log(this.st.fileclient.err)
          else console.log( `Created file ${newFile}.`)
        })
      }

      createFolder(){
        var url = this.folder.url+this.$.nameInput.value;
        console.log(url)
        this.st.fileclient.createFolder( url ).then( success => {
          if(!success) console.log(this.st.fileclient.err)
          else console.log( `Created folder ${url}.`)
        })
      }

    }

    window.customElements.define('solid-foldermenu', SolidFoldermenu);
