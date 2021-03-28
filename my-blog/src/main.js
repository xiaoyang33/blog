import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './enums/elementui'
import utilsMix from './mixins/utilsMix'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(element)
Vue.config.productionTip = false
Vue.mixin(utilsMix)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
