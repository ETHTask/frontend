// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard'

import App from './App'
import router from './router'
import PageHeader from '@/components/PageHeader'
import InfoModal from '@/components/InfoModal'
import NavModal from '@/components/NavModal'
import { state, mutations } from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.component('page-header', PageHeader)
Vue.component('info-modal', InfoModal)
Vue.component('nav-modal', NavModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: new Vuex.Store({
    state,
    mutations
  }),
  template: '<App/>',
  components: { App }
})
