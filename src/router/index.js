import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import CustomerOrder from '@/components/pages/CustomerOrders'
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import Introduction from '@/components/pages/Introduction'
import Coupon from '@/components/pages/CouponPage'
import Checkout from '@/components/pages/Checkout'

Vue.use(Router)
Vue.use(VueAxios, axios);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/introduction',
      name: 'Introduction',
      component: Introduction
    },
    {
      path: '/coupon',
      name: 'Coupon',
      component: Coupon
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/customer_checkout/:orderId',
      name: 'CustomerCheckout',
      component: CustomerCheckout,
    },
  ]
})
