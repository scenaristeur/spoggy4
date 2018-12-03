<h1>  Spoggy.<h1>

<h2>  Un petit pas pour l'homme, un grand pas pour l'immortalité.</h2>

<p>
  Imaginez une application mobile dans laquelle vous pouvez directement stocker des informations concernant vos idées, vos rêves, vos problèmes, vos expériences et tout ce qui vous passe par la tête.
</br>
   Que vous puissiez à tout moment et très facilement revenir dessus, les modifier, les effacer, les relier, les partager, en transmettre une partie à un membre de votre famille, un collègue ou un ami...
</br>
  Ne seriez-vous pas un homme ou une femme augmenté(e), avec votre deuxième cerveau, un cerveau numérique cette fois?
</br>
  Imaginez que vous puissiez connecter ce cerveau numérique à d'autres cerveaux similaires...
</br>

  A celui de vos voisins pour vous accorder sur un point précis où à celui de vos collègues pour prendre en compte leur expertise après qu'ils vous aient partagé l'accès.
</br>

  Exposez à votre famille ou à quiconque voudra bien vous aider pour faire avancer vos projets, votre vision du monde, à vos enfants vos valeurs et votre expérience...
</p>

<ul>
<li>Transmission du savoir lors d'un départ à la retraite,</li>
<li>Collaboration en temps réel,</li>
<li>Connexion à Wikipédia et à un nombre croissant de bases de connaissances scientifiques et autres domaines (alimentation, botanique...),</li>
<li>Échanges bi-directionnels avec les objets connectés et les robots (informations directement compréhensibles et inférables par les machines).</li>
</ul>


# TODO
integrer le spoggy-graph de scenaristeur/heroku-spoggy/spoggy4



# Installation
installer [Nodejs LTS](https://nodejs.org/fr/download/)


```
git clone https://github.com/scenaristeur/spoggy4.git
cd spoggy4
npm install
polymer serve

```
-  builder evejs si ce n'est déjà fait
```
cd node_modules/evejs
browserify custom.js -o dist/eve.custom.js -s eve
```

Spoggy4 est alors accessible à l'adresse [http://127.0.0.1:8081](http://127.0.0.1:8081)



[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")
[![Build status](https://api.travis-ci.org/Polymer/pwa-starter-kit.svg?branch=template-responsive-drawer-layout)](https://travis-ci.org/Polymer/pwa-starter-kit)

# PWA Starter Kit -- `template-responsive-drawer-layout`

This sample app is a starting point for building PWAs. Out of the box, the template
gives you the following features:
- all the PWA goodness (manifest, service worker)
- a responsive layout
- application theming
- example of using Redux for state management
- offline UI
- simple routing solution
- fast time-to-interactive and first-paint through the PRPL pattern
- easy deployment to prpl-server or static hosting
- unit and integrating testing starting points
- documentation about other advanced patterns.

This template is very similar to the `master` template, in the sense that it keeps both Redux for state management, and all of the UI elements. The main difference is that the wide screen layout displays a persistent `app-drawer`, inline with the content.

### 📖 Head over to the [documentation site](https://polymer.github.io/pwa-starter-kit/) for more details or check out [how to get started](https://polymer.github.io/pwa-starter-kit/setup/)!

![pwa-starter-kit screenshot](https://user-images.githubusercontent.com/116360/39718020-dd60403e-51e9-11e8-9384-e019a6775841.png)

## TODOs

- [x] Setup Safari testing on Travis.
- [x] Deploy all templates as demos.
- [ ] Update to latest [Material Web Components](https://github.com/material-components/material-components-web-components).
