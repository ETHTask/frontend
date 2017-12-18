<template>
  <nav class="dt w-100 border-box ph3 pv3 pv3-ns ph4-m ph5-l center main-color bw1 bg-white bb b--main-color">
    <span
      class="dtc f3 catamaran f2-ns" :class="{tc:!configObj.showBalance}">
      {{ configObj.title }}
    </span>
    <div v-show="configObj.showBalance" class="dtc w-25 tr" @click="configObj.onBalanceClick()">
      <button class="bg-main-color white pa2 ph4 br3 ba f4 f3-ns hover-pointer">
        Balance
      </button>
    </div>
    <div v-show="configObj.showDeposit" class="dtc w-25 tr" @click="configObj.onDepositClick()">
      <button class="bg-main-color white pa2 ph4 br3 ba f4 f3-ns hover-pointer">
        Deposit
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['configObj']
}
</script>
