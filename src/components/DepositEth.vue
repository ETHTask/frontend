<template>
  <div class="pa3">
    <div v-if="registeredSmartContract">
      <div v-once class="mt5 f3 catamaran tc">
        Deposit ETH to the address below. This address is your EthTask Ethereum address, and will hold your balance.
      </div>
      <div class="main-color ba mt4 mw8 pa3 center br3 bw1 tl f1-ns f3 wb-bw">
        {{ contractAddress }}
      </div>
    </div>
    <div v-if="!registeredSmartContract" class="center">
      <button class="bg-main-color pa2 white br3 hover-pointer" @click="addOrganization()">
        <i class="fa fa-plus fa-lg" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
const Web3 = require('web3')
const contract = require('truffle-contract')
const organizationsArtifacts = require('../../static/contracts/build/contracts/Organizations.json')

export default {
  name: 'DepositEth',
  data () {
    return {
      showToast: false,
      web3: Web3,
      Organizations: contract(organizationsArtifacts),
      balance: 0,
      contractAddress: ''
    }
  },
  created () {
    this.checkAndInstatiateWeb3()
    this.onReady()
      .then(accs => {
        this.accounts = accs
        this.account = this.accounts[0]
      })
      .then(() => {
        if (this.registeredSmartContract) {
          this.getAddress()
          this.getBalance()
        }
      })
      .catch(err => {
        console.log(err, 'error fetching accounts')
      })
  },
  methods: {
    addOrganization: function () {
      this.Organizations
        .deployed()
        .then(instance => {
          return instance.addOrganization({
            from: this.account,
            gas: 100000
          })
        })
        .then(() => {
          this.$store.commit('setRegisteredSmartContract', true)
          this.getBalance()
          this.getAddress()
          return this.http.post('smart-contract/register')
        })
        .catch(e => {
          console.log(e)
        })
    },
    checkAndInstatiateWeb3: function () {
      if (typeof window.web3 !== 'undefined') {
        console.warn(
          'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
        )
        // Use Mist/MetaMask's provider
        this.web3 = new Web3(window.web3.currentProvider)
      } else {
        console.warn(
          'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
        )
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        this.web3 = new Web3(
          new Web3.providers.HttpProvider('http://localhost:8545')
        )
      }
    },
    getBalance: function () {
      this.Organizations
        .deployed()
        .then(instance => {
          return instance.getOrganizationBalance({
            from: this.account
          })
        })
        .then(balance => {
          console.log('balance', balance)
          this.balance = window.web3.fromWei(balance, 'ether')
        })
        .catch(e => {
          console.log(e)
        })
    },
    getAddress: function () {
      this.Organizations
        .deployed()
        .then(instance => {
          this.contractAddress = instance.address
        })
    },
    onReady: function () {
      // Bootstrap the Organization abstraction for Use.
      this.Organizations.setProvider(this.web3.currentProvider)

      // Get the initial account balance so it can be displayed.
      return new Promise(function (resolve, reject) {
        window.web3.eth.getAccounts(function (err, accounts) {
          if (err != null) {
            reject(err)
          } else {
            resolve(accounts)
          }
        })
      })
    }
  },
  computed: {
    ethAddress: function () {
      return this.$store.state.loggedInUser.ethAddress
    },
    registeredSmartContract: function () {
      return this.$store.state.loggedInUser.registeredSmartContract
    }
  }
}
</script>
