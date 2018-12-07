
import {LitElement, html} from '@polymer/lit-element';
import  '/node_modules/evejs/dist/eve.custom.js';
import { VisAgent } from './agents/VisAgent.js'
import { GraphStyles } from './graph-styles.js';
import './vis-input.js';
import './vis-popup.js';
import './import-export.js';



class SpoggyVis extends LitElement {

  render() {
    return html`
    ${GraphStyles}
    <vis-input id="visInput" destinataire="agentVis"></vis-input>
    <div id="mynetwork"></div>
    <vis-popup id="visPopup" parent="agentVis"></vis-popup>
    `;
  }

  static get properties() {
    return {
      id: {type: String, value:""},
    };
  }

  constructor() {
    super();
  }

  firstUpdated(){
    var app = this;

    //console.log( 'id : ', this.id);
    this.agentVis = new VisAgent("agentVis", this);
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

      app.network.on("selectNode", async function (params) {
        console.log('selectNode Event: ', params);
        var existNode = app.network.body.data.nodes.get({
          filter: function(node){
            return (node.id == params.nodes[0] );
          }
        });
        console.log(existNode);
      })



      app.network.on("doubleClick", async function (params) {
        console.log('selectNode Event: ', params);
        var id = params.nodes[0];
        var existNode;
        try{
          existNode = app.network.body.data.nodes.get({
            filter: function(node){
              return (node.id == id );
            }
          });
          console.log(existNode);
          if (existNode.length != 0){
            console.log("existe")
            app.agentVis.send('agentGraph', {type: "nodeChanged", node: existNode[0]});
            //  app.agentVis.send('agentFileeditor', {type: "nodeChanged", node: existNode[0]});
            //  app.agentVis.send('agentFoldermenu', {type: "nodeChanged", node: existNode[0]});
            //  network.body.data.nodes.add(data);
            //  var thing = this.thing;

          }else{

            console.log("n'existe pas")
            //  delete data.x;
            //  delete data.y
            //  network.body.data.nodes.update(data);

          }
        }
        catch (err){
          console.log(err);
        }
        //  app.agentVis.send('agentCurrent', {type: "urlChanged", url: params.nodes[0]});
      });
      console.log(app.network)
    }


    savenode(data){
      this.popup = null;
      console.log("SAVENODE :",data)
    }
    /////////
    clear(){
      this.network.body.data.nodes.clear();
      this.network.body.data.edges.clear();
    }
    addToGraph(data){
      console.log(data)

      this.network.body.data.nodes.update(data.nodes)
      this.network.body.data.edges.update(data.edges)
    }

    fileChanged(file){

      console.log(file);

      switch(file.value.type) {
        case "application/json":
        this.parseJson(file)
        break;
        case "text/turtle":
        this.parseTurtle(file)
        break;
        default:
        this.parseTurtle(file)
      }

    }

    parseJson(file){
      console.log("JSON\n\n")
      //  console.log(file.value.content)
      var data = JSON.parse(file.value.content);
      console.log(data)
      //  console.log(typeof data)
      this.network.body.data.nodes.update(data.nodes)
      this.network.body.data.edges.update(data.edges)
      /*  console.log(data.nodes)
      console.log(data.edges)
      data.nodes.forEach(function(n){
      console.log(n)
    })

    data.edges.forEach(function(e){
    console.log(e)
  })*/
}



parseTurtle(file){
  var app = this;
  //  console.log(file.value.content)
  //  ttl2Xml(file.value.content, this.network)
  /* TEST AVEC STORE+SPARQL, mais on a dejà les infos dans file.value.content */
  const store = $rdf.graph();
  console.log(store)
  const fetcher = new $rdf.Fetcher(store);
  console.log(fetcher)
  fetcher.load(file.value.url).then( response => {
    console.log(response)
    console.log(store)
    console.log(store.statements)
    var edges=[];
    store.statements.forEach(function (s){
      var nodeSujetTemp = {
        id: s.subject.value,
        label: s.subject.value,
        type: "node"
      };
      var nodeObjetTemp = {
        id:  s.object.value,
        label: s.object.value,
        type: "node"
      };
      addNodeIfNotExist(app.network, nodeSujetTemp)
      addNodeIfNotExist(app.network, nodeObjetTemp)
      edges.push({from:s.subject.value, to: s.object.value, arrows: 'to', label:s.predicate.value});
      console.log(edges)
      app.network.body.data.edges.update(edges)
    })
  })
  /*let name = store.any(person, VCARD(‘fn’));
  if (name) {
  label.textContent =  name.value; // name is a Literal object
}*/
}


// implementation of import-export.js utilities
newGraph(){
  newGraph(this.network)
}

exportTtl(){
  var output = exportTtl(this.network)
  this.agentVis.send('visPopup', {type:'exportTtl', ttlData : output});
}

exportJson(){
  exportJson(this.network)
}

importJson(){
  console.log("pas encore traité")
  this.agentVis.send('visPopup', {type: 'toggle', popup:'importPopUp'})
}
decortiqueFile(fichier, remplaceNetwork){
  decortiqueFile(fichier, remplaceNetwork, this.network)
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
