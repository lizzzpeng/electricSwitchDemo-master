import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
import element from './js/Element.js'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(element);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
