import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utilsMix from '@/mixins/utilsMix'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.mixin(utilsMix)
Vue.use(ElementUI);
 const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
