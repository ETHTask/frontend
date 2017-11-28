<template>
  <div id="app">
    <page-header :title="title"></page-header>
    <router-view/>
  </div>
</template>

<script>
import routeNameMappings from './router/route-name-mappings'

export default {
  name: 'app',
  data () {
    return {
      title: 'Deposit your ETH'
    }
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      switch (newRoute.name) {
        case routeNameMappings.DepositEth:
          this.title = 'Deposit your ETH'
          break
      }
    }
  }
}
</script>
