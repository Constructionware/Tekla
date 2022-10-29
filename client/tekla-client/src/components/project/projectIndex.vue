<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


import { FormKitIcon } from '@formkit/vue'

const projectIndex = ref([])

async function getAllProjects () {  
    axios.get(`http://${window.location.hostname}/projects`)
    .then(res => {
        res.data.data.forEach(item => {
            if( !item.id.includes('_design') ){
                projectIndex.value.push(item)
            }
        })
    })
    .catch(err => {
      alert(err.message)
    })

}
function removeItem(toRemove) {
  projectIndex.value = items.value.filter((item) => item !== toRemove)
}

onMounted(() =>  {
    getAllProjects()
})

</script>

<style>
.formkit-icon {
  max-width: 1.5em;
}
</style>
<template>
   <p class="bg-gray-300 h-12 text-lg text-left font-semibold py-2 px-2 relative rounded-md my-5">Projects Index
            <span class="badge badge-primary absolute right-2">{{projectIndex.length}}</span>
        </p>
    <ul class="w-full min-w-full bg-base shadow-md">
        
    <li
      v-for="item in projectIndex"
      :key="item.id"
     
    >
      <div class="card w-full bg-base-100 shadow-xl  my-5">
        <div class="card-body">
            <h2 class="card-title">{{item.name}}</h2>
            <p class="flex-flex-row">
                <span>Project Id. {{item.id}}</span>
                
            </p>       
            <div class="card-actions justify-end">
              <span class="badge badge-outline ">{{item.category}}</span>
              <span class="flex-none tooltip tooltip-info" data-tip="Stacked View"> <router-link :to="`/project_view/${ item.id }`">
                <figure><FormKitIcon icon="link" /></figure>
              </router-link> </span>
              
            <span class="badge badge-primary"><router-link :to="`/project/${ item.id }`">  See</router-link> </span>
            
            </div>
        </div>
      </div>
    
    </li>
  </ul>

</template>