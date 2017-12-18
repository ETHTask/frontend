<template>
  <div class="tc center">
    <button class="mt6 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="loginFb()">
      Join with Facebook
    </button>
    <div class="f2 mt5">Already a user?</div>
    <button class="mt3 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="loginFb()">
      Sign in with Facebook
    </button>
    <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </div>
</template>

<script>
import { mockLoggedInUser } from '../mocks/login'
import { getDefaultInfoModalConfigObj } from '../util/modal'

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
      // this.$http.get('/login').then((response) => {
      //   if (mockLoginErrorResponse.error) {
      //     this.modalConfigObject = {
      //       title: 'Oops',
      //       message: mockLoginErrorResponse.error,
      //       theme: 'bg-danger-color',
      //       onClose: () => {
      //         self.showModal = false
      //       }
      //     }
      //     this.showModal = true
      //   }
      // })
      // if (mockLoginErrorResponse.data.error) {
      //   const self = this
      //   this.modalConfigObject = {
      //     title: 'Oops',
      //     message: mockLoginErrorResponse.data.error,
      //     theme: 'bg-danger-color',
      //     onClose: () => {
      //       self.showModal = false
      //     }
      //   }
      //   this.showModal = true
      // }
      this.$store.commit('setLoggedInUser', mockLoggedInUser.data)
    }
  }
}
</script>
