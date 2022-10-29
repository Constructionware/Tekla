<script>
import { VueDraggableNext } from 'vue-draggable-next'
//import axios from 'axios'

const draggable = VueDraggableNext

export default {
    name: 'assignTask',
    display: "Two Lists",
    order: 1,
    components: {
        draggable
    },
    props: {
        worker: Object,
        unassignedTasks: Array
    },
    data(){ return {
        err: null,
        dragging: false,
        workerTasks: [],
    
    }},
    methods: {

        log(event) {   
            console.log('LOGGED', event.added)
        },

        assign ( e ) {
            e.added.element.assigned = true
            e.added.element.assignedto = { 
                id: this.worker._id,
                name: this.worker.name
            }
           this.worker.tasks.push(e.added.element._id)
            console.log('ASSIGNED', e.added.element)
        },

        clearWorkerTasks(){  
            window.location.reload()        
        }
    }

}

</script>

<template>
    <p class="text-sm text-red-600" v-if="err">{{err}}</p>   
   
   
   
    <div class="flex flex-row" v-if="unassignedTasks">
        <div class="flex flex-col w-1/2">
            <p class="mx-10 py-2 relative">Available Project Tasks <span class="mx-5 absolute right-2">search <input class="input input-xs input-bordered" type="text" /></span></p>
           
        <draggable
            class="list-group overflow-y-auto h-96"
            :list="unassignedTasks"
            group="tasks"
            @change="log"
            itemKey="title"
            v-auto-animate="{ duration: 250 }"
          >
          <div
              class="list-group-item"
              v-for="element in unassignedTasks"
              :key="element._id"                   
              >
              <div class="list-group-item py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 relative">
                <span>({{ element._id }}) {{element.title}}</span>
                 <span class="text-xs mx-5">({{ element.category}})</span>
                
                 
            </div>
            </div>
         
        </draggable>
        
    </div>
    <div class="flex flex-col w-1/2">
       
            <p class="py-2 relative">Worker Assigned Tasks</p>
        
        <draggable
            class="list-group overflow-y-auto h-96"
            :list="workerTasks"
            group="tasks"
            @change="log"
            itemKey="title"
            v-auto-animate="{ duration: 250 }"
        >
            <div
                class="list-group-item"
                v-for="element in workerTasks"
                :key="element._id"
                                  
            >
                <div class="list-group-item py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 relative"> 
                    <span>{{ element._id }} {{element.title}}</span>
                </div>
            </div>
        </draggable>

   
        
    </div>

    </div>

</template>