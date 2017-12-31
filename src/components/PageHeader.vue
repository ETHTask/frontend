<template>
  <nav v-if="configObj.showBalance" class="dt w-100 border-box ph3 pv3 pv3-ns ph4-m ph5-l center white bg-main-color shadow-4 catamaran">
    <span
      class="dtc f3 catamaran b" :class="{tc:!configObj.showBalance}">
      {{ configObj.title }}
    </span>
    <div class="hide-small">
      <div v-if="configObj.showBalance" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onBalanceClick()">
        Balance
      </div>
      <div v-if="configObj.showDeposit" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onDepositClick()">
        Deposit
      </div>
      <div v-if="configObj.showTeams" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onTeamsClick()">
        My teams
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
      <div
        v-if="configObj.showProjects && selectedTeam() && selectedTeam().trelloId"
        class="dtc w-10 tr white f5 hover-pointer"
        @click="configObj.onProjectsClick()">
        Projects
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
    selectedProject: function () {
      return this.$store.state.loggedInUser.selectedProject
    },
    selectedTeam: function () {
      return this.$store.state.loggedInUser.selectedTeam
    }
  }
}
</script>
