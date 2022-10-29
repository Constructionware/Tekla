<script setup>
    import axios from 'axios'
    import { ref,  onMounted } from 'vue'

    var toolIndex = ref([]);
    var eids = ref([]);

    // Functions      
    function loadTools (){
        
        if (window.location.hostname == 'localhost'){
            var url = 'http://centryplan-012/gettools'
                }else{ var url = `http://192.168.0.10/gettools`}
        axios.get(url)
        .then(res => {  
            //console.log(res)         
            toolIndex.value = res.data
           
        })
    }
    // Mounted Hook
    onMounted(() => {
        
        setTimeout(() => {
            loadTools()
        }, 150);

        
    })

</script>
<template>
    <div v-if="toolIndex.length > 0">
    <p class="h-12 bg-gray-400 text-lg font-bold relative">Registered tools
        <span class="badge badge-primary my-2 absolute right-1">{{toolIndex.length}}</span>
    </p>   
    <ul class="my-5 h-96 overflow-y-auto">

        <li class="h-12 w-full border-b border-gray-400 cursor-pointer relative" v-for="element of toolIndex" @click="$emit('gettool', element.id)">
            <span>{{ element.id }} {{element.name}}</span>
            
        </li>
    </ul>
   
    </div>
   
</template>