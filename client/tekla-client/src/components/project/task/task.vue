<script>
    export default {
        name: "task",
        props:{
            id: {String},
            tasks: {Array}
        }
    }

</script>
<template>
  
    <ul id="tasks" class="bg-gray-50 border border-1 border-gray-200 rounded shadow mx-5 my-5 h-96 overflow-y-auto">
       
        <li class="h-12 border rounded-sm cursor-pointer  py-2 relative" v-for="item of tasks" >
            <span @click="$emit('getjobtask', item._id)">
            <span class="ml-2 font-semibold text-gray-500">{{item.title}}</span>  
            <span class="flex flex-col text-xs absolute right-2 top-1">  
                <span>Id  {{item._id}}</span>
                <span class="text-gray-700">Category  <strong>{{item.category}}</strong></span>
               
            </span>  
            </span>
        </li>
    </ul>
   
    
</template>