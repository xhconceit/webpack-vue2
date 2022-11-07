import Vue from "vue"
import App from './App.vue'

if(module.hot) {
    module.hot.accept()
}

const app = new Vue({
    render: h => h(App)
})
app.$mount('#app')