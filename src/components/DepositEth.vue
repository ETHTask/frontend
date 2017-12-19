<template>
  <div class="pa3">
    <div v-once class="mt5 f3 catamaran tc">
      Deposit ETH to the address below. This address is your EthTask Ethereum address, and will hold your balance.
    </div>
    <div id="ethAddress" class="main-color ba mt4 mw8 pa3 center br3 bw1 tl f1-ns f3 wb-bw">
      {{ ethTaskAddress }}
    </div>
    <div class="center tc pa3" @click="copyToClipboard()">
      <button class="pa3 bg-main-color br4 f3 hover-pointer">
        <img src="static/assets/clipboard.png" class="mw3">
      </button>
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
    ethTaskAddress: function () {
      return this.$store.state.loggedInUser.ethTaskAddress
    }
  },
  methods: {
    copyToClipboard: function () {
      if (document.selection) {
        const range = document.body.createTextRange()
        range.moveToElementText(document.getElementById('ethAddress'))
        range.select().createTextRange()
        document.execCommand('copy')
        this.showToast = true
      } else if (window.getSelection) {
        const range = document.createRange()
        range.selectNode(document.getElementById('ethAddress'))
        window.getSelection().addRange(range)
        document.execCommand('copy')
        this.showToast = true
      }
    }
  }
}
</script>
