<template>
  <div class="tc catamaran">
    <div class="f3 pa4">Import members and tasks from JIRA</div>
    <button class="bg-main-color pa3 white br4 f3 hover-pointer" @click="doImport()">
      <i class="fa fa-3x fa-arrow-circle-down" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
import {
  mockTasksFromAPI,
  mockTasksFromDatabase,
  mockMembersFromAPI,
  mockMembersFromDatabase
} from '../mocks/jira'
import routeNameMappings from '../router/route-name-mappings'

export default {
  name: 'Import',
  methods: {
    doImport: function () {
      this.$store.commit('setJiraTasks', [mockTasksFromAPI, mockTasksFromDatabase])
      this.$store.commit('setJiraMembers', [mockMembersFromAPI, mockMembersFromDatabase])
      this.$router.push(routeNameMappings.TeamMembers)
    }
  }
}
</script>
