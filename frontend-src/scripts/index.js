if (module.hot) {
  module.hot.accept();
}

import '../styles/index.scss';

import { 
  app,
  h,
} from 'hyperapp';
import { Router } from 'hyperapp-router';
import 'whatwg-fetch';

var myHeaders = new Headers();

var fetchConfig = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               accessControlOrigin: '*',
               cache: 'default' };

const AllPages = (state, actions, data, emit) => {
  return (
    <div>
      <a href="/">Home</a> <a href="/about">About</a> <a href="/testing">Testing</a> <a href="/another">Another</a><br />
      <a href="/projects">Projects</a> <a href="/projects/test">Test Project</a>

      <main id="content-area" loading={state.loading} />
    </div>
  );
};

app({
  root: document.getElementById('mount'),
  mixins: [Router],

  state: {
    apiUrl: 'http://192.168.0.101:1111/api/v1/pages',
    loading: true,
  },

  actions: {
    updateCurrentPage: (state, actions, htmlString) => {
      var contentArea = document.getElementById('content-area');

      contentArea.innerHTML = htmlString;

      state.loading = false;

      return state;
    },
    updatePageMeta: (state, actions, meta) => {
      var titleTag = document.getElementById('meta-title');
      var descriptionTag = document.getElementById('meta-description');

      // Update meta title tag
      if (meta && meta.title) {
        titleTag.innerHTML = meta.title;
      } else {
        // get h1 and use as title
        var h1 = document.getElementsByTagName('h1');

        if (h1) {
          titleTag.innerHTML = h1[0].innerText;
        } else {
          titleTag.innerHTML = "Cameron Zaas | CZaas.com";
        }
      }

      // Update meta description tag
      if (meta && meta.description) {
        descriptionTag.attributes.content.value = meta.description;
      } else {
        descriptionTag.attributes.content.value = "";
      }
    },
  },

  events: {
    loaded: (state, actions, data, emit) => {
      emit('getCurrentPage', window.location.pathname);
    },

    route: (state, actions, routeParams) => {
      console.log(window.location.pathname);
    },

    update: (state, actions, data, emit) => {
      var allATags = document.getElementsByTagName('a');

      for (var i = 0; i < allATags.length; i++) {
        allATags[i].removeEventListener('click', anchorLinkEventListener, true);
        allATags[i].addEventListener('click', anchorLinkEventListener, true);
      }

      function anchorLinkEventListener(e) {
        var href = this.attributes.href.value;

        if (e && !this.attributes.target)  { 
          e.preventDefault();

          if (window.location.pathname !== href) {
            actions.router.go(href);
            emit('getCurrentPage', href);

            state.loading = true;
            return state;
          }
        }
      }
    },


    getCurrentPage: (state, actions, currentPath) => {
      fetch(`${state.apiUrl}?path=${currentPath}`, fetchConfig)
        .then((res) => {
          return res.json();
        }).then((pageResponse) => {
          if (pageResponse.success) {
            actions.updateCurrentPage(pageResponse.content.html);
            actions.updatePageMeta(pageResponse.content.meta);
          }
        });
    },
  },
  view: [
    ['*', AllPages]
  ],
});