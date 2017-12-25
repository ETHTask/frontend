<template>
  <div class="tc catamaran pa4">
    <div class="ba bg-white b--main-color bw1 br3 pt3 pb2 mw6 center mt4">
      <div class="f3">Task ID: {{ taskID }}</div>
      <img src="static/assets/eye.png" class="mw3 mt3"/>
    </div>
    <div class="ba bg-white b--main-color pb2 mw6 mt4 center">
      <header class="bg-main-color w-100 ph2 pv2 pv2-ns ph2-m ph5-l center tc">
        <span
          class="white f3 catamaran">
          Hero
        </span>
      </header>
      <div class="f4 mt2">{{ hero.name }}</div>
      <img :src="hero.imageUrl" class="mw3 mt3"/>
    </div>
    <button class="mt6 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="reward()">
      Reward
    </button>
    <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </div>
</template>

<script>
import { getDefaultInfoModalConfigObj } from '../util/modal'

export default {
  name: 'Reward',
  data () {
    return {
      taskID: this.$store.state.finishedTask.id,
      hero: this.$store.state.finishedTask.hero,
      showModal: false,
      modalConfigObject: getDefaultInfoModalConfigObj()
    }
  },
  methods: {
    reward: function () {
      const self = this
      this.modalConfigObject = {
        title: 'Reward sent!',
        message: 'Congratulations! You just sent your hero a reward :)',
        theme: 'bg-main-color',
        onClose: () => {
          self.showModal = false
        }
      }
      self.showModal = true
    }
  }
}
</script>
