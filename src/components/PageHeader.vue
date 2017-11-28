<template>
  <header class="bg-main-color fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l center tc">
    <span
      class="white f2 catamaran">
      {{ title }}
    </span>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['title']
}
</script>
