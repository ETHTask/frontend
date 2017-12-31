<template>
  <div>
    <section v-show="teams.length" class="tl pa5-ns pa4 catamaran">
      <article class="cf f3">
        <div class="fl-ns bg-near-white tc mt2">
          Sync your teams with Trello
        </div>
        <div class="fl-ns tc pa3 pa0-ns">
          <button class="ml2-ns bg-main-color pa2 white br3 hover-pointer" @click="login()">
            <i class="fa fa-refresh fa-lg" aria-hidden="true"></i>
          </button>
        </div>
      </article>
      <ul class="list pl0 mt0 measure center">
        <li
          v-for="team in teams"
          class="flex items-center lh-copy pa3 ph0-l bb b--black-10 pointer"
          @click="viewTeam(team)">
            <div
              class="w2 h2 w3-ns h3-ns br-100"
              :style="{ backgroundColor: rc.randomColor() }">
            </div>
            <div class="pl3 flex-auto">
              <span class="f6 db black-70">{{ team.displayName }}</span>
            </div>
            <div>
              <button class="bg-main-color pa2 white br3 f5 hover-pointer" @click="selectTeam(team, $event)">
                Select
              </button>
            </div>
        </li>
      </ul>
    </section>
    <div v-show="!teams.length" class="tc catamaran">
      <div class="f3 pa4">You have no teams to show. You can import teams from Trello</div>
      <button class="bg-main-color pa3 white br4 f3 hover-pointer" @click="login()">
        <i class="fa fa-3x fa-arrow-circle-down" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
import rc from 'randomColor'
import routeNameMappings from '../router/route-name-mappings'

export default {
  name: 'Teams',
  data () {
    return {
      rc
    }
  },
  created () {
    this.login()
  },
  computed: {
    teams: function () {
      return this.$store.state.loggedInUser.teams
    }
  },
  methods: {
    login: function () {
      const self = this
      window.Trello.authorize({
        type: 'popup',
        name: 'EthTask',
        scope: {
          read: 'true',
          write: 'true'
        },
        expiration: 'never',
        success: function () {
          self.importTeams()
        },
        error: self.showErrorModal
      })
    },
    viewProject: function (project) {
      window.open(project.url, '_blank')
    },
    importTeams: function () {
      this.$store.commit('setToken', window.Trello.token())
      this.$http.post('/trello/teams', {
        token: window.Trello.token()
      })
        .then(response => {
          return response.data
        })
        .then(teamsFromAPI => {
          const teamsFromStore = this.$store.state.loggedInUser.teams
          this.$store.commit('setTeams', [teamsFromAPI, teamsFromStore])
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
    selectTeam: function (team, event) {
      event.stopPropagation()
      this.$store.commit('setSelectedTeam', team)
      this.$router.push(routeNameMappings.Projects)
    }
  }
}
</script>
