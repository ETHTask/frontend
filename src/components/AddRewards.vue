<template>
  <div class="tl pa3 catamaran">
    <span class="f3">Your open tasks</span>
    <div class="ba pl3 pv3 mt4 b--black-10 shadow-4 cf" v-for="task in tasks">
      <div class="fl">
        <div class="mb3 black-50">
          Task ID: {{ task.id }}
        </div>
        <img src="static/assets/eye.png" class="mw3"/>
      </div>
      <div class="fl pl4 w-80-ns">
        <div class="mb3 black-50">
          ETH reward
        </div>
        <input class="mt3 w-100 bt-0 bl-0 br-0 b--black-20 f3 main-color" v-model="task.ethReward"/>
      </div>
      <div class="fl pl6 pt4 w-10-ns">
        <img v-if="!isValidReward(task.ethReward)" src="static/assets/x.png" class="mw2"/>
        <img v-if="isValidReward(task.ethReward)" src="static/assets/checkmark.png" class="mw2-5"/>
      </div>
    </div>
    <div class="tc">
      <button class="mt6 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="setRewards()">
        Done
      </button>
    </div>
    <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </div>
</template>

<script>
import { isValidReward } from '../util/validation'
import { getDefaultInfoModalConfigObj } from '../util/modal'

export default {
  name: 'AddRewards',
  data () {
    return {
      tasks: this.$store.state.jiraTasks,
      modalConfigObject: getDefaultInfoModalConfigObj(),
      showModal: false
    }
  },
  computed: {
    isFormValid: function () {
      return this.tasks.every(task => isValidReward(task.ethReward))
    },
    totalRewards: function () {
      return this.tasks.reduce((prev, curr) => {
        return prev + +curr.ethReward
      }, 0)
    }
  },
  methods: {
    isValidReward: isValidReward,
    setRewards: function () {
      const self = this
      const modalTitle = 'Oops'
      const modalTheme = 'bg-danger-color'

      if (!this.isFormValid) {
        this.modalConfigObject = {
          title: modalTitle,
          message: 'Sorry, some inputs are still invalid. Fix them and give it another shot!',
          theme: modalTheme,
          onClose: () => {
            self.showModal = false
          }
        }
        this.showModal = true
        return
      }

      if (this.totalRewards > this.$store.state.loggedInUser.ethTaskBalance) {
        this.modalConfigObject = {
          title: modalTitle,
          message: 'Sorry, the total rewards you entered exceed your ETH balance! Lower the rewards or deposit more ETH :)',
          theme: modalTheme,
          onClose: () => {
            self.showModal = false
          }
        }
        this.showModal = true
        return
      }

      this.modalConfigObject = {
        title: 'Rewards set!',
        message: 'Congratulations! You set your rewards. Now get stuff done :)',
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
