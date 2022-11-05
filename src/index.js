import Vue from "vue"
console.log(Vue);

const app = new Vue({
    render: h => {
        return h('div', {}, 'hello Vue')
    }
})
app.$mount('#app')