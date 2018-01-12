import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: GoodList
    },
    {
      path: '/GoodList',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
