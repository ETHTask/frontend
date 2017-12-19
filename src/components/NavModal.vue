<template>
  <transition name="modal">
    <div class="modal-mask catamaran white" @click="configObj.onClose()">
      <div class="modal-container pa4">
        <div class="pa3 f3 hover-pointer" @click="configObj.onBalanceClick()">Balance</div>
        <div class="pa3 f3 hover-pointer" @click="configObj.onDepositClick()">Deposit</div>
        <div class="pa3 f3 hover-pointer" @click="configObj.onMembersClick()">Members</div>
        <div class="pa3 f3 hover-pointer" @click="configObj.onTasksClick()">Tasks</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NavModal',
  props: ['configObj']
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(89, 145, 220, 1);
    transition: opacity .3s ease;
}

.modal-container {
    background-color: rgba(89, 145, 220, 0.8);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    height: 100%;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
