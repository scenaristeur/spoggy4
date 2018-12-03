/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView1 extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <section>
    <h2>Spoggy.</h2>
    <h3>Un petit pas pour l'homme, un grand pas pour l'immortalité.</h3>

    </section>
    <section>
    <h2>Imaginez</h2>
    <p>Imaginez une application mobile dans laquelle vous pouvez directement
    stocker des informations concernant vos idées, vos rêves, vos problèmes,
    vos expériences et tout ce qui vous passe par la tête.
    </p>
    </section>

    <section>
    <h2>Partagez</h2>
    <p>
    Que vous puissiez à tout moment et très facilement revenir dessus, les modifier,
    les effacer, les relier, les partager,
    en transmettre une partie à un membre de votre famille, un collègue ou un ami...
    </p>
    </section>

    <section>
    <h2>Augmentez-vous</h2>
    <p>
    Ne seriez-vous pas un homme ou une femme augmenté(e), avec votre deuxième cerveau, un cerveau numérique cette fois?
    </p>
    </section>

    <section>
    <p>
    Imaginez que vous puissiez connecter ce cerveau numérique à d'autres cerveaux similaires...

    </p>
    </section>

    <section>
    <p>
    A celui de vos voisins pour vous accorder sur un point précis où à celui de vos collègues pour prendre en compte leur expertise après qu'ils vous aient partagé l'accès.
    </p>
    </section>

    <section>
    <p>
    Exposez à votre famille ou à quiconque voudra bien vous aider pour faire avancer vos projets, votre vision du monde, à vos enfants vos valeurs et votre expérience...
    </p>
    </section>

    <section>
    <p>
    <ul>
    <li>Transmission du savoir lors d'un départ à la retraite,</li>
    <li>Collaboration en temps réel,</li>
    <li>Connexion à Wikipédia et à un nombre croissant de bases de connaissances scientifiques et autres domaines (alimentation, botanique...),</li>
    <li>Échanges bi-directionnels avec les objets connectés et les robots (informations directement compréhensibles et inférables par les machines).</li>
    </ul>
    </p>
    </section>




    </br>

    </p>


    `;
  }
}

window.customElements.define('my-view1', MyView1);
