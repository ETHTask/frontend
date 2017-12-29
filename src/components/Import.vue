<template>
  <div class="tc catamaran">
    <div class="f3 pa4">Import members and projects from Trello</div>
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
      this.$http.get('/trello/workers')
        .then(response => {
          return response.data
        })
        .then(workersFromAPI => {
          const workersFromStore = this.$store.state.loggedInUser.workers
          this.$store.commit('setWorkers', [workersFromAPI, workersFromStore])
        })
        .then(() => {
          return this.$http.get('/trello/projects')
        })
        .then(response => {
          return response.data
        })
        .then(projectsFromAPI => {
          const projectsFromStore = this.$store.state.loggedInUser.projects
          this.$store.commit('setProjects', [projectsFromAPI, projectsFromStore])
        })
        .then(() => {
          this.$router.push(routeNameMappings.Projects)
        })
    }
  }
}
</script>
