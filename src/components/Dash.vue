<template>
  <div class="catamaran br--bottom br3 bg-main-color f5 fr white">
    <div v-if="loggedIn()">
      <div class="pa4 br--bottom br3">
        <div
          @click="onProjectsClick()"
          v-show="selectedProject().name"
          class="grow pa2 pointer br3 mb2 tc center">
          {{ selectedProject().name }}
        </div>
        <div
          @click="onProjectsClick()"
          v-if="!selectedProject().name && selectedTeam().displayName"
          class="grow pointer br3 mb2 ba b--white pa3 br3">
          Select a project
        </div>
        <section class="grow pa2 pointer br3 mb2" @click="onTeamsClick()">
          <div
            v-show="selectedTeam().displayName"
            class="tc center">
            {{ selectedTeam().displayName }}
          </div>
          <div
            v-if="!selectedTeam().displayName"
            class="ba b--white pa3 br3">
            Select a team
          </div>
        </section>
        <div
          v-show="showBalance || balance()"
          class="pa2 br3 tc center">
          {{ balance() }} ETH
        </div>
        <div
          @click="onDepositClick()"
          v-if="!balance() && !showBalance"
          class="grow center pointer br3 mb2 ba b--white pa3 br3">
          Deposit ETH
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routeNameMappings from '../router/route-name-mappings'

export default {
  name: 'Dash',
  props: ['showBalance'],
  methods: {
    selectedTeam: function () {
      return this.$store.state.selectedTeam
    },
    loggedIn: function () {
      return this.$store.state.loggedIn
    },
    selectedProject: function () {
      return this.$store.state.selectedProject
    },
    balance: function () {
      return this.$store.state.balance
    },
    onProjectsClick: function () {
      this.$router.push(routeNameMappings.Projects)
    },
    onTeamsClick: function () {
      this.$router.push(routeNameMappings.Teams)
    },
    onDepositClick: function () {
      this.$router.push(routeNameMappings.DepositEth)
    }
  }
}
</script>
