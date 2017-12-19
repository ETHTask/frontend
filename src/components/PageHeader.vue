<template>
  <nav class="dt w-100 border-box ph3 pv3 pv3-ns ph4-m ph5-l center white bg-main-color shadow-4 catamaran">
    <span
      class="dtc f3 catamaran b" :class="{tc:!configObj.showBalance}">
      {{ configObj.title }}
    </span>
    <div class="hide-small">
      <div v-show="configObj.showBalance" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onBalanceClick()">
        Balance
      </div>
      <div v-show="configObj.showDeposit" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onDepositClick()">
        Deposit
      </div>
      <div v-show="configObj.showMembers" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onMembersClick()">
        Members
      </div>
      <div v-show="configObj.showTasks" class="dtc w-10 tr white f5 hover-pointer" @click="configObj.onTasksClick()">
        Tasks
      </div>
    </div>
    <div v-show="configObj.showHamburger" class="show-small f3 hover-pointer" @click="configObj.onHamburgerClick()">
      &#9776;
    </div>
  </nav>
  <!-- <nav class="db dt-l w-100 border-box pa3 ph5-l">
  <a class="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="#" title="Home">
    <img src="http://tachyons.io/img/logo.jpg" class="dib w2 h2 br-100" alt="Site Name">
  </a>
  <div class="db dtc-l v-mid w-100 w-75-l tc tr-l">
    <a class="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Home">Home</a>
    <a class="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="How it Works">How it Works</a>
    <a class="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Blog">Blog</a>
    <a class="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Press">Press</a>
    <a class="link dim dark-gray f6 f5-l dib" href="#" title="Contact">Contact</a>
  </div>
</nav> -->
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['configObj']
}
</script>
