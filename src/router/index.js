import Vue from 'vue'
import Router from 'vue-router'

import DepositEth from '@/components/DepositEth'
import ImportTeam from '@/components/ImportTeam'
import AddAddresses from '@/components/AddAddresses'
import AddRewards from '@/components/AddRewards'
import Reward from '@/components/Reward'
import routeNameMappings from './route-name-mappings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: routeNameMappings.DepositEth.path,
      name: routeNameMappings.DepositEth.name,
      component: DepositEth
    },
    {
      path: routeNameMappings.ImportTeam.path,
      name: routeNameMappings.ImportTeam.name,
      component: ImportTeam
    },
    {
      path: routeNameMappings.AddAddresses.path,
      name: routeNameMappings.AddAddresses.name,
      component: AddAddresses
    },
    {
      path: routeNameMappings.AddRewards.path,
      name: routeNameMappings.AddRewards.name,
      component: AddRewards
    },
    {
      path: routeNameMappings.Reward.path,
      name: routeNameMappings.Reward.name,
      component: Reward
    }
  ]
})
