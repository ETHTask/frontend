<template>
  <nav v-if="loggedIn()" class="dt w-100 border-box ph3 pv3 pv3-ns ph4-m ph5-l center white bg-main-color shadow-4 catamaran">
    <span
      class="dtc f3 catamaran b" :class="{tc:!loggedIn()}">
      {{ configObj.title }}
    </span>
    <div v-show="!areTasksDone()" @click="onNoNotifClick()" class="dtc hover-pointer">
      <i class="fa fa-bell-slash fa-2x" aria-hidden="true"></i>
    </div>
    <div v-show="areTasksDone()" @click="onNotifClick" class="dtc hover-pointer">
      <i class="fa fa-bell fa-2x" aria-hidden="true"></i>
    </div>
    <div class="hide-small">
      <div v-if="configObj.showDeposit" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onDepositClick()">
        Deposit
      </div>
      <div
        v-if="configObj.showWorkers && selectedProject() && selectedProject().name"
        class="dtc w-10 tr white f5 hover-pointer"
        @click="configObj.onWorkersClick()">
        Members
      </div>
      <div
        v-if="configObj.showTasks && selectedProject() && selectedProject().name"
        class="dtc w-10 tr white f5 hover-pointer"
        @click="configObj.onTasksClick()">
        Tasks
      </div>
      <div v-if="configObj.showLogout" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onLogoutClick()">
        Logout
      </div>
    </div>
    <div v-if="configObj.showHamburger" class="show-small f3 hover-pointer" @click="configObj.onHamburgerClick()">
      &#9776;
    </div>
    <info-modal class="black" v-show="showModal" :configObj="modalConfigObject"></info-modal>
  </nav>
</template>

<script>
import { getDefaultInfoModalConfigObj } from '../util/modal'
import routeNameMappings from '../router/route-name-mappings'

export default {
  name: 'PageHeader',
  props: ['configObj'],
  data () {
    return {
      modalConfigObject: getDefaultInfoModalConfigObj(),
      showModal: false
    }
  },
  methods: {
    loggedIn: function () {
      return this.$store.state.loggedIn
    },
    selectedProject: function () {
      return this.$store.state.selectedProject
    },
    selectedTeam: function () {
      return this.$store.state.selectedTeam
    },
    areTasksDone: function () {
      return this.$store.state.doneTasks.length
    },
    onNotifClick: function () {
      this.$router.push(routeNameMappings.Reward)
    },
    onNoNotifClick: function () {
      const self = this
      this.modalConfigObject = {
        title: 'Notifications',
        message: 'Nothing to see here - You\'re all caught up!',
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
