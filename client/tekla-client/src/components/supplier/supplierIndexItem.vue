<script setup>

const props = defineProps({
     record: {Object} 
}) 

</script>
<template>
    <div class="card w-full bg-base-100 shadow-xl mx-5 my-5">
    <div class="card-body">
        <h2 class="card-title">{{props.record.name}}</h2>
        <p class="flex-flex-row">
            <span>Tax ID. {{props.record.taxid}}</span>
            
         </p>       
        <div class="card-actions justify-end">
        <button class="badge badge-primary">See </button>
        </div>
    </div>
    </div>
    
</template>