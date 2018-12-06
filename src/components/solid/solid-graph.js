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
<!--PB SUR LIGNE SUIVANTE  : attributeValue is null -->
    <paper-input id="currentInput" label="Current Folder / Dossier Courant" value="${this.current.value.url}"></paper-input>
    <spoggy-vis id="spoggy-vis" current=${this.current} data=${this.data}></spoggy-vis>
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
      thing: {type: Object, value: {}},
      data: {type: Object, value: {}}
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
    this.agentGraph.send('agentVis', {type: 'clear' });
    if (this.current.key == "folder"){
      this.folder2vis(this.current.value)
    }else if (this.current.key == "file"){
      this.file2vis(this.current)
    }else{
      console.log("Current.key inconnu",current.key)
    }
  }

  folder2vis(sfolder){
    var app = this;
    console.log('sfolder')
    console.log(sfolder)
    var name = sfolder.name;
    var url = sfolder.url;
    var parent = sfolder.parent;
    //  var folders = sfolder.folders||"Folders";
    //  var files = sfolder.files|| "Files";

    var nodes = [
      {id: url, label: name, type: "folder"},
      //  {id: "urlNode"+url, label: url},
      {id: parent, label: parent}/*,
      {id: "folderCluster", label: folders},
      {id: "fileCluster", label: files}*/
    ];

    // create an array with edges
    var edges = [
      //{from: url, to: "urlNode"+url, arrows:'to', label: "url"},
      {from: url, to: parent, arrows:'to', label: "parent"}/*,
      {from: url, to: "folderCluster", arrows:'to', label: "folders"},
      {from: url, to: "fileCluster", arrows:'to', label: "files"},*/
    ];

    if (sfolder.folders && sfolder.folders.length >0){
      nodes.push({id:'folders', label:"Folder"});
      sfolder.folders.forEach(function(fo){
        if(fo.name != ".."){
          app.folder2vis(fo)
          var node = {id:fo.url, label:fo.name, type: 'folder'}
          console.log(node)
          nodes.push(node);
          edges.push({from:url, to: fo.url, arrows: 'to', label:"folder"});
          edges.push({from:fo.url, to: 'folders', arrows: 'to', label:"type"});
        }
      })
    }
    if (sfolder.files && sfolder.files.length > 0){
      nodes.push({id:'files', label:"File"});
      sfolder.files.forEach(function(fi){
        console.log(fi)
        app.file2vis(fi)
        var node = {id:fi.url, label:fi.label, type: 'file'};
        console.log(node)
        nodes.push(node);
        edges.push({from:url, to: fi.url, arrows: 'to', label:"file"});
        edges.push({from:fi.url, to: 'files', arrows: 'to', label:"type"});
      })
    }

    var  data = {
      nodes: nodes,
      edges: edges
    };
    console.log(data)


    this.agentGraph.send('agentVis', {type: 'addToGraph', data: data });
  }

  file2vis(sfile){

    console.log('sfile',sfile)
  }

}

window.customElements.define('solid-graph', SolidGraph);
