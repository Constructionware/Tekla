<script setup>
    import axios from 'axios';
    import { ref,  onMounted } from 'vue'
    import { VueDraggableNext } from 'vue-draggable-next'
    
    // Utilities
    const draggable = VueDraggableNext;

    // Props
    const props = defineProps({
            id: String,
            workers: Array
        });  
    // Reactive Variables      
    var employeeIndex = ref([]);
    var addedWorkers = ref([])
    var eids = ref([]);
    var updateWorkers = ref(false)

    // Functions      
    function loadWorkers (){
       
        if (window.location.hostname == 'localhost'){
            var url = `http://127.0.0.1/workers`
            }else{ var url = `http://192.168.0.10/workers`}
        axios.get(url)
        .then(res => {
            employeeIndex.value = res.data.data.rows
           
        })
    }
    function log(event) { console.log('LOGGED', event) }

    function update(event) { 
        function removeItemOnce(arr, value) {
            var index = arr.indexOf(value);
            if (index > -1) {
                arr.splice(index, 1);
            }
            return arr;
        }

        event.added.element.value.added = Date.parse(new Date())
        
        if(eids.value.includes(event.added.element.id)) {  
            alert('The worker is already employed to the project')    
            
            removeItemOnce(props.workers, event.added.element)
          
        }else {
            setTimeout(() => {               
            
                addedWorkers.value.push(event.added.element)
                updateWorkers.value = true
              
            }, 200);
        }

    }
    function updateProjectWorkers() {
        if (window.location.hostname == 'localhost'){
            var url = `http://127.0.0.1/addworkers/${props.id}`
        }else{ var url = `http://192.168.0.10/addworkers/${props.id}`}
        
        axios.post(url, addedWorkers.value)
            .then(res => {
                if(res.status == 200){
                setTimeout(() => {  
                    window.location.reload()           
                    
                }, 1500);
            }

            })
       

    }

    function processIds(item){
        return item.id
    }

    // Calls
    eids.value = props.workers.map(processIds)

    // Mounted Hook
    onMounted(() => {
        
        setTimeout(() => {
            loadWorkers()
        }, 200);

        
    })
</script>
<template>
     <p>ADD PROJECT WORKER</p>
    

<div class="flex flex-row my-2 mx-5" v-if="employeeIndex.length > 0">
    <div class="w-1/2 bg-yellow-50 mr-2 "> 
        <p class="py-2 px-2 bg-gray-400 text-gray-50 font-semibold relative">CentryPlan Employees Index  <span class="mx-5 absolute right-2">search <input type="text" /></span></p>
        <draggable
        class="list-group overflow-y-auto h-96"
        :list="employeeIndex"
        group="people"
        @change="log"
        itemKey="id"
        v-auto-animate="{ duration: 250 }"
      >
      <div
                class="list-group-item"
                v-for="element in employeeIndex"
                :key="element.id"
               
                >
          <div class="list-group-item py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 relative">
            <span>({{ element.id }}) {{element.value.name}} {{element.value.occupation}} {{element.value.oc}}</span>
            
            
             <!--span class="font-semibold text-blue-800 absolute right-2">{{element.value.category}}</span--></div>
        </div>
      </draggable>

        
    </div>
    <div class="w-1/2 bg-blue-50 ml-2"> 
        <p class="bg-gray-400 text-gray-50 font-semibold py-2 px-2 relative">
            Project-{{id}}/ Employees 
            <span class="absolute right-1" v-if="updateWorkers">
                <span class="btn btn-sm" @click="updateProjectWorkers">Update</span>
            </span>
        </p>
        <draggable
        class="list-group overflow-y-auto h-96"
        :list="workers"
        group="people"
        @change="update"
        itemKey="title"
        v-auto-animate="{ duration: 250 }"
      >
      <div
                class="list-group-item"
                v-for="element in workers"
                :key="element.id"
                v-auto-animate
                >
          <div class="list-group-item py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 relative"> 
            <span>{{ element.id }} {{element.value.name}} {{element.value.occupation}}</span>
           
          
        </div>

        </div>
      </draggable> 
    </div>
</div>

</template>