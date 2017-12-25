<template>
  <div class="pa3">
    <div v-once class="mt5 f3 catamaran tc">
      Deposit ETH to the address below. This address is your EthTask Ethereum address, and will hold your balance.
    </div>
    <div id="ethAddress" class="main-color ba mt4 mw8 pa3 center br3 bw1 tl f1-ns f3 wb-bw">
      {{ ethAddress }}
    </div>
    <div class="center tc pa3">
      <!-- <button v-clipboard:copy="aa" class="pa3 white bg-main-color br3 f3 hover-pointer">
        Copy
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepositEth',
  data () {
    return {
      showToast: false
    }
  },
  computed: {
    ethAddress: function () {
      return this.$store.state.loggedInUser.ethAddress
    }
  }
}
</script>
