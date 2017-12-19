import Vue from 'vue'
import Router from 'vue-router'

import DepositEth from '@/components/DepositEth'
import Import from '@/components/Import'
import TeamMembers from '@/components/TeamMembers'
import Tasks from '@/components/Tasks'
import Login from '@/components/Login'
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
      path: routeNameMappings.Import.path,
      name: routeNameMappings.Import.name,
      component: Import
    },
    {
      path: routeNameMappings.TeamMembers.path,
      name: routeNameMappings.TeamMembers.name,
      component: TeamMembers
    },
    {
      path: routeNameMappings.Tasks.path,
      name: routeNameMappings.Tasks.name,
      component: Tasks
    },
    {
      path: routeNameMappings.Reward.path,
      name: routeNameMappings.Reward.name,
      component: Reward
    },
    {
      path: routeNameMappings.Login.path,
      name: routeNameMappings.Login.name,
      component: Login
    }
  ]
})
