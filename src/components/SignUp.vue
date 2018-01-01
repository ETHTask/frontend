<template>
  <div class="pt6 bg-bc ph3 vh-100">
    <div class="center pb4 mw6 shadow-2 catamaran bg-white br3">
      <div class="f3 pv4 br--top tc white br3 bg-main-color">Sign up to start using EthTask</div>
      <article class="pa4 ph5-l black-80">
        <fieldset class="ba b--transparent ph0 mh0">
          <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="company-name">Company name</label>
            <input :class="{'b--dark-red bw1': !isValidCompanyName(companyName)}" class="pa2 input-reset ba w-100 measure" type="email" name="company-name" v-model="companyName">
          </div>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="first-name">First name (optional)</label>
            <input class="pa2 input-reset ba w-100 measure" type="email" name="first-name" v-model="firstName">
          </div>
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
          <button @click="signUp()" class="b ph3 pv2 input-reset b--main-color br3 white bg-main-color grow pointer f5">Sign up</button>
        </div>
      </article>
      <div class="tc i f6">Already a member? <span @click="goLogin()" class="link main-color pointer">Login</span> </div>
      <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
    </div>
  </div>
</template>

<script>
import { getDefaultInfoModalConfigObj } from '../util/modal'
import routeNameMappings from '../router/route-name-mappings'
import { isValidName, isValidPassword, isValidEmail, isValidCompanyName } from '../util/validation'

export default {
  name: 'SignUp',
  data () {
    return {
      showModal: false,
      modalConfigObject: getDefaultInfoModalConfigObj(),
      isValidName,
      isValidPassword,
      isValidEmail,
      isValidCompanyName,
      firstName: null,
      companyName: null,
      email: null,
      password: null
    }
  },
  methods: {
    goLogin: function () {
      this.$router.push(routeNameMappings.Login)
    },
    signUp: function () {
      const self = this
      if (
        !this.isValidCompanyName(this.companyName) ||
        !this.isValidEmail(this.email) ||
        !this.isValidPassword(this.password) ||
        !this.companyName ||
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
      this.$http.post('/signUp', {
        companyName: this.companyName,
        firstName: this.firstName || '',
        lastName: '',
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
          this.$store.commit('setLoggedIn', true)
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
