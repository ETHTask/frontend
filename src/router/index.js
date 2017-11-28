import Vue from 'vue'
import Router from 'vue-router'
import DepositEth from '@/components/DepositEth'
import routeNameMappings from './route-name-mappings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: routeNameMappings.DepositEth,
      component: DepositEth
    }
  ]
})
