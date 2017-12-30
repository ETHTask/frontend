<template>
  <div>
    <div v-show="workers.length" class="tl pa5-ns pa4 catamaran">
      <article class="cf f3">
        <div class="fl-ns bg-near-white tc mt2">
          Sync your team with Trello
        </div>
        <div class="fl-ns tc pa3 pa0-ns">
          <button class="ml2-ns bg-main-color pa2 white br3 hover-pointer" @click="importWorkers()">
            <i class="fa fa-refresh fa-lg" aria-hidden="true"></i>
          </button>
        </div>
      </article>
      <div class="tc tl-ns ba pl3-ns bg-white pv3 mt4 b--black-10 shadow-4 cf" v-for="worker in workers">
        <div class="fl-ns">
          <div class="mb3 black-50">
            {{ worker.name }}
          </div>
          <img :src="'http://www.gravatar.com/avatar/' + worker.gravatarHash + '.jpg'" class="mw3"/>
        </div>
        <div class="fl-ns pl4-ns w-80-ns pt3 pt0-ns">
          <div class="mb3-ns black-50">
            ETH Address
          </div>
          <input class="mt3-ns w-100-ns w-90 bt-0 bl-0 br-0 b--black-20 f3 main-color" v-model="worker.ethAddress"/>
        </div>
        <div class="fl-ns pl6-ns pt4 w-10-ns">
          <img v-if="!isValidAddress(worker.ethAddress)" src="static/assets/x.png" class="mw2"/>
          <img v-if="isValidAddress(worker.ethAddress)" src="static/assets/checkmark.png" class="mw2-5"/>
        </div>
      </div>
      <div class="tc">
        <button class="mt6 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="setAddresses()">
          Update ETH addresses
        </button>
      </div>
      <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
    </div>
    <div v-show="!workers.length" class="tc catamaran">
      <div class="f3 pa4">You have no team members to show. You can import team members from Trello</div>
      <button class="bg-main-color pa3 white br4 f3 hover-pointer" @click="importWorkers()">
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
    workers: function () {
      return this.$store.state.loggedInUser.selectedProject.workers
    },
    isFormValid: function () {
      return this.workers.every(worker => isValidAddress(worker.ethAddress))
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

      this.$http.post('/trello/workers/update', {
        workers: this.workers,
        projectId: this.$store.state.loggedInUser.selectedProject.trelloId
      })
        .then(response => {
          this.modalConfigObject = {
            title: 'Addresses set!',
            message: 'Congratulations! Your workforce is good to go :)',
            theme: 'bg-main-color',
            onClose: () => {
              self.showModal = false
            }
          }
          this.showModal = true
        })
    },
    importWorkers: function () {
      this.$http.post('/trello/workers', {
        projectId: this.$store.state.loggedInUser.selectedProject.trelloId,
        token: this.$store.state.trelloToken
      })
        .then(response => {
          return response.data
        })
        .then(workersFromAPI => {
          const workersFromStore = this.$store.state.loggedInUser.selectedProject.workers
          this.$store.commit('setWorkers', [workersFromAPI, workersFromStore])
        })
    }
  }
}
</script>
