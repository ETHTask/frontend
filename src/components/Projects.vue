<template>
  <div>
    <section v-show="projects.length" class="tl pa5-ns pa4 catamaran">
      <article class="cf f3">
        <div class="fl-ns bg-near-white tc mt2">
          Sync your projects with Trello
        </div>
        <div class="fl-ns tc pa3 pa0-ns">
          <button class="ml2-ns bg-main-color pa2 white br3 hover-pointer" @click="importProjects()">
            <i class="fa fa-refresh fa-lg" aria-hidden="true"></i>
          </button>
        </div>
      </article>
      <ul class="list pl0 mt0 measure center">
        <li
          v-for="project in projects"
          class="flex items-center lh-copy pa3 ph0-l bb b--black-10 pointer"
          @click="viewProject(project)">
            <div
              class="w2 h2 w3-ns h3-ns br-100"
              :style="{ backgroundColor: rc.randomColor() }">
            </div>
            <div class="pl3 flex-auto f6 db black-70">
              {{ project.name }} <span v-if="!unselected(project)">(selected)</span>
            </div>
            <div  v-if="unselected(project)">
              <button class="bg-main-color pa2 white br3 f5 hover-pointer" @click="selectProject(project, $event)">
                Select
              </button>
            </div>
        </li>
      </ul>
    </section>
    <div v-show="!projects.length" class="tc catamaran">
      <div class="f3 pa4">You have no projects to show. You can import projects from Trello</div>
      <button class="bg-main-color pa3 white br4 f3 hover-pointer" @click="importProjects()">
        <i class="fa fa-3x fa-arrow-circle-down" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
import rc from 'randomColor'
import routeNameMappings from '../router/route-name-mappings'

export default {
  name: 'Projects',
  data () {
    return {
      rc
    }
  },
  created () {
    this.importProjects()
  },
  computed: {
    projects: function () {
      return this.$store.state.loggedInUser.projects
    }
  },
  methods: {
    viewProject: function (project) {
      window.open(project.url, '_blank')
    },
    unselected: function (project) {
      return this.$store.state.selectedProject.trelloId !== project.trelloId
    },
    importProjects: function () {
      this.$store.commit('setToken', window.Trello.token())
      this.$http.post('/trello/projects', {
        token: this.$store.state.trelloToken,
        teamId: this.$store.state.selectedTeam.trelloName
      })
        .then(response => {
          return response.data
        })
        .then(projectsFromAPI => {
          const projectsFromDB = this.$store.state.projectsFromDB
          this.$store.commit('setProjects', [projectsFromAPI, projectsFromDB])
        })
    },
    showErrorModal: function () {
      const self = this
      this.modalConfigObject = {
        title: 'Oops',
        message: 'There was an error connecting to your Trello. Try again later! :)',
        theme: 'bg-danger-color',
        onClose: () => {
          self.showModal = false
        }
      }
      this.showModal = true
    },
    selectProject: function (project, event) {
      event.stopPropagation()
      this.$http.post('/trello/projects/update', {
        project: project
      })
        .then(res => {
          if (res.error) {
            this.modalConfigObject = {
              title: 'Oops',
              message: 'There was an error processing your request. Try again later! :)',
              theme: 'bg-danger-color',
              onClose: () => {
                self.showModal = false
              }
            }
            this.showModal = true
          } else {
            this.$store.commit('setSelectedProject', project)
          }
        })
        .then(() => {
          return this.$http.post('/trello/lists', {
            token: this.$store.state.trelloToken,
            projectId: project.trelloId
          })
        })
        .then(res => {
          this.$store.commit('setDoneTrelloId', res.data.id)
          this.$router.push(routeNameMappings.Tasks)
        })
    }
  }
}
</script>
