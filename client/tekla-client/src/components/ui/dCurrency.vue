<script setup>

defineProps([ 'amount' ])
</script>
<template>
   <span v-if="amount">{{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseFloat(amount))}}</span>
</template>