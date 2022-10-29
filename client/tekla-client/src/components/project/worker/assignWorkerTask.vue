<script>
    import { objectToString } from '@vue/shared';
    import axios from 'axios';
   
    export default {
        name: "assignWorkerTask",
        props: {
            worker: Object,
            unassignedTasks: Array
        },
        data () { return {
            err: null,
            dragging: false,
            taskIndex: [],
            workerTasks: []        
        }
        },
          // Mounted Hook
        mounted(){            
            setTimeout(() => {
                this.loadTaskIndex()
            }, 200);        
        },    
        methods: {
            loadTaskIndex() { 
                function sortTasks(o){
                    if( typeof o === 'object'){
                        return {  value: o._id, label: o.title,  help: o.description }
                    }else {
                        return {  value: '', label: '',  help: '' }
                    }
                }              
                this.taskIndex = this.unassignedTasks.map(sortTasks)
                 
            },
            log(event) { console.log('LOGGED', event) },
            update(event) { 
                function removeItemOnce(arr, value) {
                    var index = arr.indexOf(value);
                    if (index > -1) {
                        arr.splice(index, 1);
                    }
                    return arr;
                }

                event.added.element.value.added = Date.parse(new Date())
                
                if(props.worker.tasks.includes(event.added.element.id)) {  
                    alert('The task is already assigned to this  employee.')    
                    
                    removeItemOnce(props.worker.tasks, event.added.element)
                
                }else {
                    setTimeout(() => {               
                    
                        //addedWorkers.value.push(event.added.element)
                        //updateWorkers.value = true
                    
                    }, 200);
                }

            }
    


        }

    
    }

    
</script>
<template>
     <p>Assign Worker Task</p>
    <p>taskIndex {{taskIndex}}</p>

<div class="flex flex-row my-2 mx-5">
    <div class="w-1/2 bg-yellow-50 mr-2 "> 
        <p class="py-2 px-2 bg-gray-400 text-gray-50 font-semibold relative">Unassigned Tasks<span class="mx-5 absolute right-2">search <input type="text" /></span></p>
        <FormKit
            v-model="workerTasks"
            type="checkbox"
            label="Unassigned Tasks"
            :options="taskIndex"
            decorator-icon="happy"
            help="Assign one or more tasks to worker by selecting."
            validation="required|min:1"
        />
    </div>
    <div class="w-1/2 bg-blue-50 ml-2"> 
        <p class="bg-gray-400 text-gray-50 font-semibold py-2 px-2 relative">
            Employee-{{worker._id}}/ Tasks 
            <!--span class="absolute right-1" v-if="updateWorkers">
                <span class="btn btn-sm" @click="updateProjectWorkers">Update</span>
            </span-->
        </p>
        <pre wrap>{{ workerTasks }}</pre>
    </div>
</div>

</template>