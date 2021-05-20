import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'

import 'lib-flexible/flexible'
import {Cell,CellGroup,Tabbar,TabbarItem,Button, Row, Col,Swipe, SwipeItem,Lazyload,List,Field,NavBar,Tab,Tabs,PullRefresh,Stepper} from 'vant'
Vue.use(Cell).use(CellGroup).use(TabbarItem).use(Tabbar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(axios).use(Lazyload).use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Stepper)


Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
