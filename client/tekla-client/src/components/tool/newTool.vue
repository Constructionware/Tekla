<script setup>
    import axios from 'axios'
    import { ref,  onMounted } from 'vue'

    var tool= ref({});
    var eids = ref([]);

    // Functions      
    function saveTool (){
        axios.get(`${this.http}newtools`)
        .then(res => {
            tool.value = res.data
           
        })
    }
    // Mounted Hook
   // onMounted(() => {  })

</script>
<template>
    <p class="h-12 bg-gray-400 text-lg font-bold relative">Registered tool
        
    </p>   
   

</template>