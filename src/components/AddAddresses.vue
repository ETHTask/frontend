<template>
  <div class="tl pa3">
    <span class="f3">Your team members</span>
    <div class="ba pl3 pv3 mt4 b--black-10 shadow-4 cf" v-for="member in teamMembers">
      <div class="fl">
        <div class="mb3 black-50">
          {{ member.name }}
        </div>
        <img :src="member.imageUrl" class="mw3"/>
      </div>
      <div class="fl pl4 w-80-ns">
        <div class="mb3 black-50">
          ETH Address
        </div>
        <input class="mt3 w-100 bt-0 bl-0 br-0 b--black-20 f3 main-color" v-model="member.ethAddress"/>
      </div>
      <div class="fl pl6 pt4 w-10-ns">
        <img v-if="!isValidAddress(member.ethAddress)" src="src/assets/x.png" class="mw2"/>
        <img v-if="isValidAddress(member.ethAddress)" src="src/assets/checkmark.png" class="mw2-5"/>
      </div>
    </div>
    <div class="tc">
      <button class="mt6 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="setAddresses()">
        Done
      </button>
    </div>
    <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </div>
</template>

<script>
import { isValidAddress } from '../util/validation'
import { getDefaultInfoModalConfigObj } from '../util/modal'

export default {
  name: 'AddAddresses',
  data () {
    return {
      teamMembers: this.$store.state.jiraMembers,
      modalConfigObject: getDefaultInfoModalConfigObj(),
      showModal: false
    }
  },
  computed: {
    isFormValid: function () {
      return this.teamMembers.every(task => isValidAddress(task.ethAddress))
    }
  },
  methods: {
    isValidAddress: isValidAddress,
    setAddresses: function () {
      const self = this

      if (!this.isFormValid) {
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

      this.modalConfigObject = {
        title: 'Addresses set!',
        message: 'Congratulations! Your workforce is good to go :)',
        theme: 'bg-main-color',
        onClose: () => {
          self.showModal = false
        }
      }
      this.showModal = true
    }
  }
}
</script>
