// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import {store} from '@/store/store'

import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './toast'

import moment from 'moment'
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMM YYYY')
  }
});

Vue.filter('formatYear', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY')
  }
});

import customConsole from './console'
window.doconsole = customConsole.log

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'axios'
window.axios = require('axios');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
