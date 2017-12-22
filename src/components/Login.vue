<template>
  <div class="center pa4 mw6 shadow-4 mt6 catamaran">
    <div v-if="signUpMode">
      <div class="f3 tc">Sign up to start using EthTask</div>
      <article class="pa4 black-80">
        <fieldset class="ba b--transparent ph0 mh0">
          <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="company-name">Company name</label>
            <input :class="{'b--dark-red': !isValidCompanyName(companyName)}" class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="company-name" v-model="companyName">
          </div>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="first-name">First name</label>
            <input :class="{'b--dark-red': !isValidName(firstName)}" class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="first-name" v-model="firstName">
          </div>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="last-name">Last name</label>
            <input :class="{'b--dark-red': !isValidName(lastName)}" class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="last-name" v-model="lastName">
          </div>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="email-address">Email address</label>
            <input :class="{'b--dark-red': !isValidEmail(email)}" class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address" v-model="email">
          </div>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="password">Password</label>
            <input :class="{'b--dark-red': !isValidPassword(password)}" class="b w-100 pa2 input-reset ba bg-transparent" type="password" name="password" v-model="password">
          </div>
        </fieldset>
        <div class="mt3">
          <button @click="signUp()" class="b ph3 pv2 input-reset b--main-color br3 white bg-main-color grow pointer f5">Sign up</button>
        </div>
      </article>
      <div class="tc i f6">Already a member? <span @click="signUpMode = false" class="link main-color pointer">Login</span> </div>
    </div>
    <div v-if="!signUpMode">
      <div class="f3 tc">Login to start using EthTask</div>
      <article class="pa4 black-80">
        <fieldset class="ba b--transparent ph0 mh0">
          <legend class="ph0 mh0 fw6 clip">Login</legend>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="email-address">Email address</label>
            <input :class="{'b--dark-red': !isValidEmail(email)}" class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address" v-model="email">
          </div>
          <div class="mt3">
            <label class="db fw4 lh-copy f6" for="password">Password</label>
            <input :class="{'b--dark-red': !isValidPassword(password)}" class="b w-100 pa2 input-reset ba bg-transparent" type="password" name="password" v-model="password">
          </div>
        </fieldset>
        <div class="mt3">
          <button @click="login()" class="b ph3 pv2 input-reset b--main-color br3 white bg-main-color grow pointer f5">Login</button>
        </div>
      </article>
      <div class="tc i f6">Not yet a member? <span @click="signUpMode = true" class="link main-color pointer">Sign up</span> </div>
    </div>
    <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </div>
</template>

<script>
import { getDefaultInfoModalConfigObj } from '../util/modal'
// import routeNameMappings from '../router/route-name-mappings'
import { isValidName, isValidPassword, isValidEmail, isValidCompanyName } from '../util/validation'

export default {
  name: 'Login',
  data () {
    return {
      showModal: false,
      modalConfigObject: getDefaultInfoModalConfigObj(),
      isValidName,
      isValidPassword,
      isValidEmail,
      isValidCompanyName,
      firstName: null,
      lastName: null,
      companyName: null,
      email: null,
      password: null,
      signUpMode: true
    }
  },
  methods: {
    signUp: function () {
      const self = this
      if (
        !this.isValidName(this.firstName) ||
        !this.isValidName(this.lastName) ||
        !this.isValidCompanyName(this.companyName) ||
        !this.isValidEmail(this.email) ||
        !this.isValidPassword(this.password) ||
        !this.firstName ||
        !this.lastName ||
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
      }
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
      }
    }
  }
}
</script>
