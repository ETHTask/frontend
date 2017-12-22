<template>
  <div id="app">
    <page-header :configObj="headerConfigObj"></page-header>
    <router-view/>
    <info-modal v-show="showInfoModal" :configObj="infoModalConfigObject"></info-modal>
    <nav-modal v-show="showNavModal" :configObj="navModalConfigObject"></nav-modal>
  </div>
</template>

<script>
import {
  getTitle,
  getBalanceShowing,
  getDepositShowing,
  getTasksShowing,
  getWorkersShowing,
  getHamburgerShowing,
  getImportShowing,
  getLogoutShowing
} from './router/header-logic'
import routeNameMappings from './router/route-name-mappings'
import {
  getDefaultInfoModalConfigObj,
  getDefaultNavModalConfigObj
} from './util/modal'
import { getDefaultHeaderConfigObj } from './util/header'

export default {
  name: 'app',
  data () {
    return {
      showInfoModal: false,
      showNavModal: false,
      headerConfigObj: getDefaultHeaderConfigObj(),
      infoModalConfigObject: getDefaultInfoModalConfigObj(),
      navModalConfigObject: getDefaultNavModalConfigObj()
    }
  },
  methods: {
    onBalanceClick: function () {
      const self = this
      const balance = this.$store.state.loggedInUser.ethBalance
      this.infoModalConfigObject = {
        title: 'Your EthTask balance',
        message: `${balance} ETH`,
        theme: 'bg-main-color',
        messageClass: 'tc main-color f2',
        onClose: () => {
          self.showInfoModal = false
        }
      }
      this.showInfoModal = true
    },
    onHamburgerClick: function () {
      const self = this
      this.navModalConfigObject = {
        onBalanceClick: this.onBalanceClick,
        onDepositClick: this.onDepositClick,
        onWorkersClick: this.onWorkersClick,
        onTasksClick: this.onTasksClick,
        onImportClick: this.onImportClick,
        onLogoutClick: this.onLogoutClick,
        onClose: () => {
          self.showNavModal = false
        }
      }
      this.showNavModal = true
    },
    onDepositClick: function () {
      this.$router.push(routeNameMappings.DepositEth)
    },
    onWorkersClick: function () {
      this.$router.push(routeNameMappings.TeamMembers)
    },
    onTasksClick: function () {
      this.$router.push(routeNameMappings.Tasks)
    },
    onImportClick: function () {
      this.$router.push(routeNameMappings.Import)
    },
    onLogoutClick: function () {
      this.$http.get('/logout')
        .then(() => {
          this.$router.push(routeNameMappings.Login)
        })
    }
  },
  created () {
    this.headerConfigObj.title = getTitle(window.location.href)
    this.headerConfigObj.showBalance = getBalanceShowing(window.location.href)
    this.headerConfigObj.showDeposit = getDepositShowing(window.location.href)
    this.headerConfigObj.showTasks = getTasksShowing(window.location.href)
    this.headerConfigObj.showWorkers = getWorkersShowing(window.location.href)
    this.headerConfigObj.showHamburger = getHamburgerShowing(window.location.href)
    this.headerConfigObj.showImport = getImportShowing(window.location.href)
    this.headerConfigObj.showLogout = getLogoutShowing(window.location.href)
    this.headerConfigObj.onBalanceClick = this.onBalanceClick
    this.headerConfigObj.onDepositClick = this.onDepositClick
    this.headerConfigObj.onWorkersClick = this.onWorkersClick
    this.headerConfigObj.onTasksClick = this.onTasksClick
    this.headerConfigObj.onHamburgerClick = this.onHamburgerClick
    this.headerConfigObj.onImportClick = this.onImportClick
    this.headerConfigObj.onLogoutClick = this.onLogoutClick
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.headerConfigObj.title = getTitle(newRoute.path)
      this.headerConfigObj.showBalance = getBalanceShowing(newRoute.path)
      this.headerConfigObj.showDeposit = getDepositShowing(window.location.href)
      this.headerConfigObj.showTasks = getTasksShowing(window.location.href)
      this.headerConfigObj.showWorkers = getWorkersShowing(window.location.href)
      this.headerConfigObj.showHamburger = getHamburgerShowing(window.location.href)
      this.headerConfigObj.showImport = getImportShowing(window.location.href)
      this.headerConfigObj.showLogout = getLogoutShowing(window.location.href)
    }
  }
}
</script>
