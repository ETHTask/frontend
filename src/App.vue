<template>
  <div id="app">
    <page-header :title="title"></page-header>
    <router-view/>
  </div>
</template>

<script>
import getTitle from './router/title-logic'

export default {
  name: 'app',
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.title = getTitle(window.location.href)
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.title = getTitle(newRoute.path)
    }
  }
}
</script>
