<template>
  <div class="tc catamaran">
    <div class="f3 pa4">Import members and tasks from JIRA</div>
    <button class="bg-main-color pa3 white br4 f3 hover-pointer" @click="doImport()">
      <i class="fa fa-3x fa-arrow-circle-down" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
import routeNameMappings from '../router/route-name-mappings'

export default {
  name: 'Import',
  methods: {
    doImport: function () {
      this.$http.get('/jira/workers')
        .then(response => {
          return response.data
        })
        .then(workersFromAPI => {
          const workersFromStore = this.$store.state.loggedInUser.workers
          this.$store.commit('setWorkers', [workersFromAPI, workersFromStore])
        })
        .then(() => {
          return this.$http.get('/jira/tasks')
        })
        .then(response => {
          return response.data
        })
        .then(tasksFromAPI => {
          const tasksFromStore = this.$store.state.loggedInUser.tasks
          this.$store.commit('setTasks', [tasksFromAPI, tasksFromStore])
        })
        .then(() => {
          this.$router.push(routeNameMappings.TeamMembers)
        })
    }
  }
}
</script>
