import Vue from 'vue'
//import App from './App.vue'
import TodoList from './components/TodoList.vue'

Vue.config.productionTip = false

//App.vue 컴포넌트를 화면에 담기위한 작업
//Vue 인스턴스 객체 생성
// new Vue({
//         render: h => h(App),
//     }).$mount('#app') //#app인 요소에 출력

new Vue({
    render: h => h(TodoList)
}).$mount('#app')