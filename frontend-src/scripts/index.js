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

var navItems = [{
  path: '/',
  content: 'Home',
},{
  path: '/projects',
  content: 'Projects',
},{
  path: '/about',
  content: 'About Me',
}];

const NavItems = ({ items, actions, location }) => {
  return items.map((item) => {
    var isCurrentRoute = false;

    if (item.path === location) {
      isCurrentRoute = true;
    } else if (location !== '/' && item.path !== '/' && location.includes(item.path)) {
      isCurrentRoute = true;
    }

    return (
      <li>
        <a 
          href={item.path} 
          class={`${isCurrentRoute ? 'active' : ''}`}
        >
          {item.content}
        </a>
      </li>
      );
  });
};

const AllPages = (state, actions, data, emit) => {
  return (
    <div class="view">
      <div class={`sidebar ${ state.menuOpen ? "sidebar--open" : "" }`}>
        <div class="sidebar__background" onclick={actions.toggleMenu} />
        <nav class="sidebar__nav">
          <div class="sidebar__nav__content">
            <div class="sidebar__nav__content__name">
              Cameron Zaas
            </div>
            <ul>
              <NavItems items={navItems} actions={actions} location={window.location.pathname} />
            </ul>
          </div>
        </nav>
      </div>
      <main loading={state.loading}>
        <div id="content-area" />
      </main>
      <a class="view__nav-button nowatch" onclick={actions.toggleMenu}>
        <svg width="42" height="42" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"/></svg>
      </a>
    </div>
  );
};

app({
  root: document.getElementById('mount'),
  mixins: [Router],

  state: {
    apiUrl: window.apiLocation,
    loading: true,
    menuOpen: false,
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

    toggleMenu: (state, actions, data) => {
      var status = !state.menuOpen;

      if (typeof data.forceStatus === 'boolean') {
        status = data.forceStatus;
      }

      state.menuOpen = status;
      return state;
    },
  },

  events: {
    loaded: (state, actions, data, emit) => {
      emit('getCurrentPage', window.location.pathname);
    },

    route: (state, actions, routeParams, emit) => {
      emit('getCurrentPage', window.location.pathname);
      window.scrollTo(0,0);
    },

    update: (state, actions, data, emit) => {
      var allATags = document.getElementsByTagName('a');

      for (var i = 0; i < allATags.length; i++) {
        allATags[i].removeEventListener('click', anchorLinkEventListener, true);
        allATags[i].addEventListener('click', anchorLinkEventListener, true);
      }

      function anchorLinkEventListener(e) {
        var href = (this.attributes.href) ? this.attributes.href.value : undefined;

        if (e && !this.attributes.target && !this.classList.contains('nowatch'))  { 
          e.preventDefault();

          if (window.location.pathname !== href) {
            actions.router.go(href);

            actions.toggleMenu({ forceStatus: false });
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