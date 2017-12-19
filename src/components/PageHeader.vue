<template>
  <nav class="dt w-100 border-box ph3 pv3 pv3-ns ph4-m ph5-l center white bg-main-color shadow-4 catamaran">
    <span
      class="dtc f3 catamaran b" :class="{tc:!configObj.showBalance}">
      {{ configObj.title }}
    </span>
    <div class="hide-small">
      <div v-if="configObj.showBalance" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onBalanceClick()">
        Balance
      </div>
      <div v-if="configObj.showDeposit" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onDepositClick()">
        Deposit
      </div>
      <div v-if="configObj.showMembers" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onMembersClick()">
        Members
      </div>
      <div v-if="configObj.showTasks" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onTasksClick()">
        Tasks
      </div>
      <div v-if="configObj.showImport" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onImportClick()">
        Import
      </div>
    </div>
    <div v-if="configObj.showHamburger" class="show-small f3 hover-pointer" @click="configObj.onHamburgerClick()">
      &#9776;
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['configObj']
}
</script>
