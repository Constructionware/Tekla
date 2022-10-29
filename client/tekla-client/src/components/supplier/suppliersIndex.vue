<script setup>
import axios from 'axios'
import {ref, onMounted } from 'vue'

import NewSupplier from './newSupplier.vue';
import SupplierIndexItem from './supplierIndexItem.vue';

var suppliersIndex = ref([])
var err = ref(null)

async function getSuppliers(){
    axios.get(`http://${window.location.hostname}/suppliers_name_index`)
    .then(res => {
        if ( res.status == 200 ){
            suppliersIndex.value = res.data
        } else{ suppliersIndex.value = []}

    }).catch(error => {
        err.value = error.message
    })
}
onMounted(
    getSuppliers()
)
</script>
<style>
#suppliers-index {height: 50%; }
</style>
<template>
    <p class="bg-gray-400 h-12 my-5 relative w-full ml-5 rounded">
        <span class="text-xl font-semibold py-2 px-2">Suppliers Index</span>
        <span class="absolute right-1 my-2"><new-supplier /> </span>
    </p>

    <ul id="suppliers-index" class="w-full overflow-y-auto p-2">
        <li class="cursor-pointer" v-for="record of suppliersIndex" @click="$emit('getsupplier', record._id)"><SupplierIndexItem :record="record"/></li>
    </ul>
</template>