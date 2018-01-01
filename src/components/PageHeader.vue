<template>
  <nav v-if="loggedIn()" class="dt w-100 border-box ph3 pv3 pv3-ns ph4-m ph5-l center white bg-main-color shadow-4 catamaran">
    <span
      class="dtc f3 catamaran b" :class="{tc:!loggedIn()}">
      {{ configObj.title }}
    </span>
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
  </nav>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['configObj'],
  methods: {
    loggedIn: function () {
      return this.$store.state.loggedIn
    },
    selectedProject: function () {
      return this.$store.state.selectedProject
    },
    selectedTeam: function () {
      return this.$store.state.selectedTeam
    }
  }
}
</script>
