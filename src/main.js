import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import fastclick from 'fastclick'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui';
import MintUI from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css';

import 'mint-ui/lib/style.css'

import '../static/css/reset.scss'
import '../static/css/plugin.scss'

import { Toast, Loading } from '@/common/js/plugin';

fastclick.attach(document.body)
Vue.use(MintUI)
Vue.use(Toast);
Vue.use(Loading);
Vue.use(ElementUI)


//懒加载的默认图片 
import def_lazy_img from '../static/img/loading.gif'
//使用懒加载组件
Vue.use(VueLazyLoad,{
  loading: def_lazy_img
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
