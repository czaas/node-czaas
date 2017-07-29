'use strict';

if (module.hot) {
  module.hot.accept();
}

import '../styles/index.scss';

import { 
  app,
  h,
} from 'hyperapp';

app({
  root: document.getElementById('mount'),

  state: {

  },

  actions: {

  },

  view: (state, actions) => (
    <main class="container">
      <h1>Zaas test package</h1>
    </main>
  ),
});