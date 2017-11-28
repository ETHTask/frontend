<template>
  <div>
    <div class="black">
      {{ generatedEthTaskAddress }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepositEth',
  computed: {
    generatedEthTaskAddress: function () {
      return '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
    }
  }
}
</script>
