// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './http';

import '@/styles/index.scss'


import App from './App'
import router from './router'
import store from './store'

import MetaInfo from 'vue-meta-info'

import './components/component/base/index'
import './icon'
import './permission.js'

import cal from './utils/calculation'

Vue.prototype.calc = cal;


Vue.use(ElementUI);

Vue.use(MetaInfo);

Vue.config.productionTip = false;

//解决ie不支持promise
require('es6-promise').polyfill();

/* eslint-disable no-new */

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = http;

var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  // mounted(){
  //   document.dispatchEvent(new Event('render-event'))
  // }
})


