<script>
   
    export default {
        name: "workers",
        props:{
            id: {String},
            workers: {Array}
        }
    }

</script>
<template>
    <p>Project Employees</p>
    <ul class="bg-white h-96 overflow-y-auto">
        <li class="h-12 border rounded-sm cursor-pointer py-2 relative" v-for="w of workers" :key="w._id" @click="$emit('displayworker', w)">
            <span class="ml-2 font-semibold text-gray-500">{{w.value.name}}</span>  
            <span class="badge badge-primary badge-outline mx-2">{{w.value.occupation}}</span>  
            <span class="absolute right-1 text-xs">Joined {{new Date(w.value.added).toDateString()}}</span>
        </li>
    </ul>

</template>