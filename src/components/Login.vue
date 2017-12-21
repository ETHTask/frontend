<template>
  <div class="tc center pa4 mw6 shadow-4 mt6 catamaran">
    <div class="f3 pb4">Start using EthTask with your Facebook business account</div>
    <button class="bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="loginFb()">
      Join with Facebook
    </button>
    <div class="f4 mt5">Already a user?</div>
    <button class="mt3 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="loginFb()">
      Sign in with Facebook
    </button>
    <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </div>
</template>

<script>
import { getDefaultInfoModalConfigObj } from '../util/modal'
import routeNameMappings from '../router/route-name-mappings'

export default {
  name: 'Login',
  data () {
    return {
      showModal: false,
      modalConfigObject: getDefaultInfoModalConfigObj()
    }
  },
  methods: {
    loginFb: function () {
      return this.$http.get('/login/facebook')
        .then((response) => {
          return response.data.fbId
        })
        .then(fbId => {
          return this.$http.post('/login/findUser', {
            fbId
          })
        })
        .then(response => {
          this.$store.commit('setLoggedInUser', response.data)
          this.$router.push(routeNameMappings.DepositEth)
        })
    }
  }
}
</script>
