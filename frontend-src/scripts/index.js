'use strict';

if (module.hot) {
  module.hot.accept();
}

import '../styles/index.scss';

import { 
  app,
  h,
} from 'hyperapp';

import { Router } from 'hyperapp-router';

const AllPages = (state, actions, data, emit) => {
  return (
    <div>
      <h1>Hello world</h1>
      <a href="/testing">Testing</a>
      <a href="/another">Another</a>
      <a href="/">Home</a>
    </div>
  );
};

app({
  root: document.getElementById('mount'),
  mixins: [Router],

  state: {

  },

  actions: {

  },

  events: {
    route: (state, actions, routeParams) => {
      console.log(window.location.pathname);
    },

    update: (state, actions) => {
      var allATags = document.getElementsByTagName('a');

      for (var i = 0; i < allATags.length; i++) {
        allATags[i].removeEventListener('click', anchorLinkEventListener, true);
        allATags[i].addEventListener('click', anchorLinkEventListener, true);
      }

      function anchorLinkEventListener(e) {
        if (e) { e.preventDefault(); }
        var href = this.attributes.href.value;
        
        if (window.location.pathname !== href) {
          actions.router.go(href);
        }
      }
    }
  },
  view: [
    ['*', AllPages]
  ],
});