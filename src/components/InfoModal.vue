<template>
  <transition name="modal">
    <div class="modal-mask catamaran" @click="configObj.onClose()">
      <div class="modal-container" @click.stop>
        <div :class="configObj.theme" class="white">
          <h3 class="f3 pa3 tc">{{ configObj.title }}</h3>
        </div>
        <div class="black ph3 pb3 lh-copy">
          {{ configObj.message }}
        </div>
        <div class="pa3 tc">
          <button class="bg-main-color pv2 ph3 white br3 f4 hover-pointer" @click="configObj.onClose()">
            Got it
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'InfoModal',
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
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 300px;
    margin: 40px auto 0;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
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
