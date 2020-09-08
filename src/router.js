import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import PublishArticle from './views/PublishArticle.vue';

import profileHomepage from './views/components/profileHomepage.vue';
import editProfile from './views/components/editProfile.vue'
import MessagesComponent from './views/components/Messages.vue'
import Article from './views/components/Article.vue'
import UploadImage from './views/components/uploadImage.vue'
import EditImage from './views/components/EditImage.vue'
import AssetTransfer from './views/components/AssetTransfer.vue'

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/editarticle",
      name: "editarticle",
      components: {
        header: AppHeader,
        default: PublishArticle,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
      children: [
        {
          path: '',
          name: "profilehome",
          components: {
            default: profileHomepage 
          }
        },
        {
          path: 'editProfile',
          name: 'edit',
          components: {
            default: editProfile
          }
        },
        {
          path: 'messages',
          name: 'message',
          components: {
            default: MessagesComponent
          }
        },
        {
          path: 'article/:id',
          name: 'article',
          components: {
            default: Article
          }
        },
        {
          path: 'image/:id',
          name: 'imageEditing',
          components: {
            default: EditImage
          }
        },
        {
          path: 'uploadImage',
          name: 'uploadImage',
          components: {
            default: UploadImage
          }
        },
        {
          path: 'assetTransfer',
          name: 'assetTransfer',
          components: {
            default: AssetTransfer
          }
        }
      ]
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
