<template>
  <div>
    <div v-show="teamMembers.length" class="tl pa5-ns pa4 catamaran">
      <div class="tc tl-ns ba pl3-ns pv3 mt4 b--black-10 shadow-4 cf" v-for="member in teamMembers">
        <div class="fl-ns">
          <div class="mb3 black-50">
            {{ member.name }}
          </div>
          <img :src="member.imageUrl" class="mw3"/>
        </div>
        <div class="fl-ns pl4-ns w-80-ns pt3 pt0-ns">
          <div class="mb3-ns black-50">
            ETH Address
          </div>
          <input class="mt3-ns w-100-ns w-90 bt-0 bl-0 br-0 b--black-20 f3 main-color" v-model="member.ethAddress"/>
        </div>
        <div class="fl-ns pl6-ns pt4 w-10-ns">
          <img v-if="!isValidAddress(member.ethAddress)" src="static/assets/x.png" class="mw2"/>
          <img v-if="isValidAddress(member.ethAddress)" src="static/assets/checkmark.png" class="mw2-5"/>
        </div>
      </div>
      <div class="tc">
        <button class="mt6 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="setAddresses()">
          Update ETH addresses
        </button>
      </div>
      <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
    </div>
    <div v-show="!teamMembers.length" class="tc catamaran">
      <div class="f3 pa4">You have no members to show. You can import members from JIRA</div>
      <button class="bg-main-color pa3 white br4 f3 hover-pointer" @click="importTeam()">
        <i class="fa fa-3x fa-arrow-circle-down" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { isValidAddress } from '../util/validation'
import { getDefaultInfoModalConfigObj } from '../util/modal'

export default {
  name: 'TeamMembers',
  data () {
    return {
      modalConfigObject: getDefaultInfoModalConfigObj(),
      showModal: false
    }
  },
  computed: {
    teamMembers: function () {
      return this.$store.state.jiraMembers
    },
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
    },
    importTeam: function () {
      this.$http.get('/jira/members')
        .then(response => {
          return response.data
        })
        .then(membersFromAPI => {
          const membersFromStore = this.$store.state.loggedInUser.workers
          this.$store.commit('setJiraMembers', [membersFromAPI, membersFromStore])
        })
    }
  }
}
</script>
