<template>
  <div>
    <div v-show="tasks.length" class="tl pa5-ns pa4 catamaran">
      <article class="cf f3">
        <div class="fl-ns bg-near-white tc mt2">
          Sync your tasks with Trello
        </div>
        <div class="fl-ns tc pa3 pa0-ns">
          <button class="ml2-ns bg-main-color pa2 white br3 hover-pointer" @click="importTasks()">
            <i class="fa fa-refresh fa-lg" aria-hidden="true"></i>
          </button>
        </div>
      </article>
      <div class="tc tl-ns ba pl3 pv3 bg-white mt4 b--black-10 shadow-4 cf" v-for="task in tasks">
        <div class="fl-ns pointer" @click="viewTask(task)">
          <div class="mb3 black-50">
            {{ task.name }}
          </div>
          <img src="static/assets/eye.png" class="mw3"/>
        </div>
        <div class="fl-ns pl4-ns w-80-ns pt3 pt0-ns">
          <div class="mb3-ns black-50">
            ETH reward
          </div>
          <input class="mt3-ns w-100-ns w-90 bt-0 bl-0 br-0 b--black-20 f3 main-color" v-model="task.reward"/>
        </div>
        <div class="fl-ns pl5-ns pt4 w-10-ns">
          <img v-show="!isValidReward(task.reward)" src="static/assets/x.png" class="mw2"/>
          <img v-show="isValidReward(task.reward)" src="static/assets/checkmark.png" class="mw2-5"/>
        </div>
      </div>
      <div class="tc">
        <button class="mt6 bg-main-color pv3 ph5 white br3 f3 hover-pointer" @click="setRewards()">
          Update task rewards
        </button>
      </div>
      <info-modal v-show="showModal" :configObj="modalConfigObject"></info-modal>
    </div>
    <div v-show="!tasks.length" class="tc catamaran">
      <div class="f3 pa4">You have no tasks to show. You can import {{ selectedProject.name }} tasks from Trello</div>
      <button class="bg-main-color pa3 white br4 f3 hover-pointer" @click="importTasks()">
        <i class="fa fa-3x fa-arrow-circle-down" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { isValidReward } from '../util/validation'
import { getDefaultInfoModalConfigObj } from '../util/modal'

export default {
  name: 'Tasks',
  data () {
    return {
      modalConfigObject: getDefaultInfoModalConfigObj(),
      showModal: false,
      selectedProject: this.$store.state.selectedProject
    }
  },
  created () {
    this.importTasks()
  },
  computed: {
    tasks: function () {
      return this.selectedProject.tasks
    },
    isFormValid: function () {
      return this.tasks.every(task => isValidReward(task.reward))
    },
    totalRewards: function () {
      return this.tasks.reduce((prev, curr) => {
        return prev + +curr.reward
      }, 0)
    }
  },
  methods: {
    isValidReward: isValidReward,
    viewTask: function (task) {
      window.open(task.url, '_blank')
    },
    setRewards: function () {
      const self = this
      const modalTitle = 'Oops'
      const modalTheme = 'bg-danger-color'

      if (!this.isFormValid) {
        this.modalConfigObject = {
          title: modalTitle,
          message: 'Sorry, some inputs are still invalid. Fix them and give it another shot!',
          theme: modalTheme,
          onClose: () => {
            self.showModal = false
          }
        }
        this.showModal = true
        return
      }

      if (this.totalRewards > this.$store.state.balance) {
        this.modalConfigObject = {
          title: modalTitle,
          message: 'Sorry, the total rewards you entered exceed your ETH balance! Lower the rewards or deposit more ETH :)',
          theme: modalTheme,
          onClose: () => {
            self.showModal = false
          }
        }
        this.showModal = true
        return
      }

      this.$http.post('/trello/tasks/update', {
        projectId: self.$store.state.selectedProject.trelloId,
        tasks: this.tasks
      })
        .then(response => {
          if (response.error) {
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
            this.modalConfigObject = {
              title: 'Addresses set!',
              message: 'Congratulations! Your workforce is good to go :)',
              theme: 'bg-main-color',
              onClose: () => {
                self.showModal = false
              }
            }
            this.showModal = true
          }
        })
    },
    importTasks: function () {
      this.$http.post('/trello/tasks', {
        projectId: this.selectedProject.trelloId,
        token: this.$store.state.trelloToken
      })
        .then(response => {
          return response.data
        })
        .then(tasksFromAPI => {
          const tasksFromStore = this.selectedProject.tasks
          this.$store.commit('setTasks', [tasksFromAPI, tasksFromStore])
          this.$store.commit('setDoneTasks', [tasksFromAPI, tasksFromStore])
        })
    }
  }
}
</script>
