<template>
  <div class="pt6 bg-bc ph3 vh-100">
    <div class="center pb4 mw6 shadow-2 catamaran bg-white br3">
      <div class="f3 pv4 br--top tc white br3 bg-main-color">Login to start using EthTask</div>
      <article class="pa4 ph5-l black-80">
        <fieldset class="ba b--transparent ph0 mh0">
          <legend class="ph0 mh0 fw6 clip">Login</legend>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="email-address">Email address</label>
            <input :class="{'b--dark-red bw1': !isValidEmail(email)}" class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address" v-model="email">
          </div>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="password">Password</label>
            <input :class="{'b--dark-red bw1': !isValidPassword(password)}" class="b w-100 pa2 input-reset ba bg-transparent" type="password" name="password" v-model="password">
          </div>
        </fieldset>
        <div class="mt3">
          <button @click="login()" class="b ph3 pv2 input-reset b--main-color br3 white bg-main-color grow pointer f5">Login</button>
        </div>
      </article>
      <div class="tc i f6">Not yet a member? <span @click="goSignUp()" class="link main-color pointer">Sign up</span> </div>
    <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </div>
  </div>
</template>

<script>
import { getDefaultInfoModalConfigObj } from '../util/modal'
import routeNameMappings from '../router/route-name-mappings'
import { isValidPassword, isValidEmail } from '../util/validation'

export default {
  name: 'Login',
  data () {
    return {
      showModal: false,
      modalConfigObject: getDefaultInfoModalConfigObj(),
      isValidPassword,
      isValidEmail,
      email: null,
      password: null
    }
  },
  methods: {
    goSignUp: function () {
      this.$router.push(routeNameMappings.SignUp)
    },
    login: function () {
      const self = this
      if (
        !this.isValidEmail(this.email) ||
        !this.isValidPassword(this.password) ||
        !this.email ||
        !this.password
      ) {
        this.modalConfigObject = {
          title: 'Oops',
          message: 'Sorry, some inputs are still invalid. Fix them and give it another shot!',
          theme: 'bg-danger-color',
          onClose: () => {
            self.showModal = false
          }
        }
        self.showModal = true
        return
      }
      this.$http.post('/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        if (response.data.error) {
          this.modalConfigObject = {
            title: 'Oops',
            message: response.data.message,
            theme: 'bg-danger-color',
            onClose: () => {
              self.showModal = false
            }
          }
          self.showModal = true
        } else {
          this.$store.commit('setLoggedInUser', response.data)
          this.$router.push(routeNameMappings.DepositEth)
        }
      })
      .catch(() => {
        this.modalConfigObject = {
          title: 'Oops',
          message: 'Sorry, the server is currently down. Try again later!',
          theme: 'bg-danger-color',
          onClose: () => {
            self.showModal = false
          }
        }
        self.showModal = true
      })
    }
  }
}
</script>
