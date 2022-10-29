<script setup>
import DCurrency from '../../ui/dCurrency.vue';
const props = defineProps({
     record: {Object} 
}) 

</script>
<template>
    <div class="card w-full bg-base-100 shadow-xl mx-5 my-5">
    <div class="card-body">
        <h2 class="card-title">{{props.record.supplier.name}}</h2>
        <p class="flex-flex-row">
            <span>Inv.No. {{props.record.invoiceno}}</span>
            <span class="mx-5">  {{new Date(props.record.datetime).toDateString()}} </span>
            <span>Total <DCurrency :amount="props.record.total" /></span>
         </p>       
        <div class="card-actions justify-end">
        <button class="badge badge-primary">See </button>
        </div>
    </div>
    </div>
    
</template>