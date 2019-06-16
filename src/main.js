import Vue from 'vue'
import App from './App.vue'
import { compact } from 'lodash'
import './assets/main.styl'

Vue.config.productionTip = false


Object.defineProperty(Vue.prototype, '$http', { value: 'contact-list-vuejs' })
Object.defineProperty(Vue.prototype, '$compact', { value: compact })

new Vue({
  render: h => h(App),
}).$mount('#app')
