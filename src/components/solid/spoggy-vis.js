
import {LitElement, html} from '@polymer/lit-element';
import  '/node_modules/evejs/dist/eve.custom.js';
import { VisAgent } from './agents/VisAgent.js'
import { GraphStyles } from './graph-styles.js';
import './vis-input.js';
import './vis-popup.js';


class SpoggyVis extends LitElement {

  render() {
    return html`
    ${GraphStyles}
    Spoggy Vis Web Components are <span class="mood">${this.mood}</span>!<br>
    <vis-input id="visInput" destinataire="${this.id}"></vis-input>
    <div id="mynetwork"></div>
    <vis-popup id="visPopup" parent="${this.id}"></vis-popup>
    `;
  }

  static get properties() {
    return {
      id: {type: String, value:""},
      mood: {type: String}
    };
  }

  constructor() {
    super();
    this.mood = 'Spoggy Vis';
  }

  firstUpdated(){
    var app = this;

    console.log( 'id : ', this.id);
    this.agentVis = new VisAgent(this.id, this);
    console.log(this.agentVis);
    //this.agentVis.send('agentApp', {type: 'dispo', name: this.id });


    var container = this.shadowRoot.getElementById('mynetwork');
    //  console.log(container)

    // create an array with nodes
    var nodes = new vis.DataSet([
      {id: "node1", label: 'Node 1'},
      {id: "node2", label: 'Node 2'},
      {id: "node3", label: 'Node 3'},
      {id: "node4", label: 'Node 4'},
      {id: "node5", label: 'Node 5'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
      {from: "node1", to: "node3", arrows:'to', label: "type"},
      {from: "node1", to: "node2", arrows:'to', label: "subClassOf"},
      {from: "node2", to: "node4", arrows:'to', label: "partOf"},
      {from: "node2", to: "node5", arrows:'to', label: "first"},
      {from: "node3", to: "node3", arrows:'to', label: "mange"}
    ]);


    var data = {
      nodes: nodes,
      edges: edges
    };

    var seed = 2;
    var options = {
      layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
      //  locale: this._root.querySelector('#locale').value,
      edges:{
        arrows: {
          to:     {enabled: true, scaleFactor:1, type:'arrow'},
          middle: {enabled: false, scaleFactor:1, type:'arrow'},
          from:   {enabled: false, scaleFactor:1, type:'arrow'}
        }},
        interaction:{
          navigationButtons: true,
          //  keyboard: true  //incompatible avec rappel de commande en cours d'implémentation
          multiselect: true,
        },
        manipulation: {
          addNode: function (data, callback) {
            // filling in the popup DOM elements
            //  app.shadowRoot.getElementById('node-operation').innerHTML = "Add Node";
            //  data.label =""
            //console.log(app.shadowRoot.getElementById('popup'));
            //  console.log(this.shadowRoot.getElementById('popup'));
            console.log("NETWORK ADD NODE ",data,callback)
            //app.editNode(data, app.clearNodePopUp, callback);
            app.agentVis.send('visPopup', {type: "addNode", data: data, callback: callback});

          },
          editNode: function (data, callback) {
            // filling in the popup DOM elements
            //app.shadowRoot.getElementById('node-operation').innerHTML = "Edit Node";
            console.log("NETWORK EDIT NODE ",data,callback)
            //  app.editNode(data, app.cancelNodeEdit, callback);
            app.agentVis.send('visPopup', {type: "editNode", data: data, callback: callback});
          },
          addEdge: function (data, callback) {
            console.log("NETWORK ADD EDGE ", data,callback)
            if (data.from == data.to) {
              var r = confirm("Souhaitez-vous connecter ce noeud sur lui-même?");
              if (r != true) {
                callback(null);
                return;
              }
            }
            //  app.shadowRoot.getElementById('edge-operation').innerHTML = "Add Edge";
            //app.editEdgeWithoutDrag(data, callback);
            app.agentVis.send('visPopup', {type: "addEdge", data: data, callback: callback});
          },
          editEdge: {
            //console.log("EDIT EDGE ", data,callback)
            editWithoutDrag: function(data, callback) {
              console.log("NETWORK EDIT WITHOUT DRAG ", data,callback)
              //  app.shadowRoot.getElementById('edge-operation').innerHTML = "Edit Edge";
              //  app.editEdgeWithoutDrag(data,callback);
              app.agentVis.send('visPopup', {type: "editEdgeWithoutDrag", data: data, callback: callback});
            }
          }
        }
      };

      app.network = new vis.Network(container, data, options);
      app.network.on("selectNode", function (params) {
        console.log('selectNode Event: ', params);
      });
      console.log(app.network)
    }


    savenode(data){
      this.popup = null;
      console.log("SAVENODE :",data)
    }



  /*  updated(changedProperties){
      super.updated(changedProperties)
      changedProperties.forEach((oldValue, propName) => {
        console.log(`${propName} changed. oldValue: ${oldValue}`);
        console.log("responseData UPDATED: ",this.responseData)
      });
    }

    attributeChangedCallback(name, oldval, newval) {
      console.log('attribute change: ', name, oldval, newval);
      super.attributeChangedCallback(name, oldval, newval);
    }*/

  }

  window.customElements.define('spoggy-vis', SpoggyVis);
