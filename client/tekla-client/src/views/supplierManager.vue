<script setup>
import axios from 'axios'
import { ref } from 'vue'
//import siteAlert from '../components/ui/siteAlert.vue' 
import stackTpl from '../components/tpl/stackTpl.vue' 


import suppliersIndex from '../components/supplier/suppliersIndex.vue'
import supplierRecord from '../components/supplier/supplierRecord.vue'

var supplier = ref(null)
var err = ref(null)

async function getSupplier(id){
    axios.get(`http://${window.location.hostname}/supplier/${id}`)
    .then(res => {
        if ( res.status == 200 ){
            supplier.value = res.data
        } 
    }).catch(error => {
        err.value = error.message
    })
}

</script>
<template>
     <stack-tpl>
        

        <template v-slot:header>
        <p>Welcome to CentryPlan Suppliers Manager</p>    
        <p class="text-red-500 mx-5 my-5">{{err}}</p>   
      </template>

      <template v-slot:lsbar>        
          <suppliersIndex @getsupplier="getSupplier"></suppliersIndex>
      
      </template>

      <template v-slot:xdisplay>
        
        <section id="supplier" v-if="supplier">
            <p class="text-2xl text-center font-bold my-10">Supplier</p>
            <span><supplierRecord :record="supplier"/></span> 
        </section>
       

      </template>

      </stack-tpl>

</template>