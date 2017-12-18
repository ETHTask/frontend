<template>
  <div id="app">
    <page-header :configObj="headerConfigObj"></page-header>
    <router-view/>
    <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </div>
</template>

<script>
import { getTitle, getBalanceShowing, getDepositShowing } from './router/header-logic'
import routeNameMappings from './router/route-name-mappings'
import { getDefaultInfoModalConfigObj } from './util/modal'
import { getDefaultHeaderConfigObj } from './util/header'

export default {
  name: 'app',
  data () {
    return {
      showModal: false,
      headerConfigObj: getDefaultHeaderConfigObj(),
      modalConfigObject: getDefaultInfoModalConfigObj()
    }
  },
  methods: {
    onBalanceClick: function () {
      const self = this
      const balance = this.$store.state.loggedInUser.ethTaskBalance
      this.modalConfigObject = {
        title: 'Your EthTask balance',
        message: `${balance} ETH`,
        theme: 'bg-main-color',
        messageClass: 'tc main-color f2',
        onClose: () => {
          self.showModal = false
        }
      }
      this.showModal = true
    },
    onDepositClick: function () {
      this.$router.replace(routeNameMappings.DepositEth)
    }
  },
  created () {
    this.headerConfigObj.title = getTitle(window.location.href)
    this.headerConfigObj.showBalance = getBalanceShowing(window.location.href)
    this.headerConfigObj.showDeposit = getDepositShowing(window.location.href)
    this.headerConfigObj.onBalanceClick = this.onBalanceClick
    this.headerConfigObj.onDepositClick = this.onDepositClick
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.headerConfigObj.title = getTitle(newRoute.path)
      this.headerConfigObj.showBalance = getBalanceShowing(newRoute.path)
      this.headerConfigObj.showDeposit = getDepositShowing(window.location.href)
    }
  }
}
</script>
