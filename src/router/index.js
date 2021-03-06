import Vue from 'vue'
import Router from 'vue-router'

import DepositEth from '@/components/DepositEth'
import TeamMembers from '@/components/TeamMembers'
import Tasks from '@/components/Tasks'
import Projects from '@/components/Projects'
import Teams from '@/components/Teams'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
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
    },
    {
      path: routeNameMappings.SignUp.path,
      name: routeNameMappings.SignUp.name,
      component: SignUp
    },
    {
      path: routeNameMappings.Projects.path,
      name: routeNameMappings.Projects.name,
      component: Projects
    },
    {
      path: routeNameMappings.Teams.path,
      name: routeNameMappings.Teams.name,
      component: Teams
    }
  ]
})
