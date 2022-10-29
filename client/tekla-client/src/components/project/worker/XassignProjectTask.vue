<script setup>
import { ref,  onMounted } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import axios from 'axios'

import siteAlert from '../../ui/siteAlert.vue' 
import dCurrency from '../../ui/dCurrency.vue'


const props = defineProps({
  id: String,
  worker: null,
  unassignedTasks: Array,
  
  
})
const draggable = VueDraggableNext

const count = ref(0),
err = ref(),
//tasksIndex = ref(props.projectUnassignedTasks),
dragging = ref(false),
phase = ref("");

var isMetric = ref(false);
var workerTasks = ref([])


function log(event) {
   
        console.log('LOGGED', event.added)
}

function assign ( e ) {
  e.added.element.assigned = true
  e.added.element.assignedto = { 
    id: props.worker._id,
    name: props.worker.name
  }
  props.worker.tasks.push(e.added.element._id)
  console.log('ASSIGNED', e.added.element)
}

function clearWorkerTasks(){
  
    window.location.reload()
  
}

function loadWorkers(){
  function processE(item){
    return {
      label: item.id,
      value: item.added
    }
  }
 
}


</script>



<template>
  <div id="assign-project-task">
    <p class="text-sm text-red-600" v-if="err">{{err}}</p>   
      <p class="flex flex-row h-12 border rounded-md my-2 items-center bg-gray-400 relative">Assign Project Task 
        
        
      </p>
      <div class="flex flex-row">
       
        <div class="w-1/2 mx-5 "> 
            <p class="py-2 relative">Available Project Tasks <span class="mx-5 absolute right-2">search <input type="text" /></span></p>
            <draggable
            class="list-group overflow-y-auto h-96"
            :list="unassignedTasks"
            group="jobs"
            @change="log"
            itemKey="title"
            v-auto-animate="{ duration: 550 }"
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

        <!--div class="w-1/2 mx-5"> 
         
            <p class="py-2 relative">Worker Tasks <span class="mx-5 absolute right-2">search <input type="text" /></span></p>
            <draggable
            class="list-group overflow-y-auto h-96"
            :list="workerTasks"
            group="jobs"
            @change="assign"
            itemKey="title"
            v-auto-animate="{ duration: 250 }"
          >
          <div
                    class="list-group-item"
                    v-for="element in workerTasks"
                    :key="element._id"
                    v-auto-animate
                    
                    >
              <div class="list-group-item py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 relative"> 
                <span>{{ element._id }} {{element.title}}</span>
               
                <div class="dropdown" >
                  <label tabindex="0" class="btn btn-sm btn-primary m-1">Qty</label>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" v-if="isMetric">
                    <li><a>Metric Unit</a></li>
                    <li>UNIT {{ element.metric.unit}}</li>
                    <li>PRICE {{ element.metric.price}}</li>
                    <li v-if="element.metric.quantity">Quantity {{ element.metric.quantity}}</li>
                    <li v-else><input type="number" placeholder="Quantity" v-model.lazy.number="element.metric.quantity" class="w-44"/></li>
                    <li v-if="element.metric.quantity">Total {{element.metric.total = element.metric.quantity * element.metric.price}} </li>
                  </ul>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" v-else>
                    <li><a>Imperial Unit</a></li>
                    <li>UNIT {{ element.imperial.unit}}</li>
                    <li>PRICE {{ element.imperial.price}}</li>
                    <li v-if="element.imperial.quantity">Quantity {{ element.imperial.quantity}}</li>
                    <li v-else><input type="number" placeholder="Quantity" v-model.lazy.number="element.imperial.quantity" class="w-44"/></li>
                    <li v-if="element.imperial.quantity"> Total {{element.imperial.total = element.imperial.quantity * element.imperial.price}} </li>
                  </ul>
                </div>
                <div class="dropdown" >
                  <label tabindex="0" class="btn btn-sm btn-primary m-1">Manage</label>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" v-if="isMetric">
                    <li><a>State</a></li>
                    <li>{{element.state}}</li>
                    
                  </ul>
                 
                </div>
               
    
                <span class="absolute right-2">
                  <span class="flex flex-row ">
    
                    
    
                  <span class="flex flex-col text-xs">
                    <span class="mx-5 font-semibold">phase/category</span>
                    <span class="mx-5 tooltip tooltip-right" data-tip="Project Phase">({{ element.phase}})</span>
                    <span class="mx-5 tooltip tooltip-right" data-tip="Task Category">{{ element.category}}</span>
                   
                  </span>
    
                    <span class="flex flex-col text-xs  font-semibold">
                    <span class="mx-5">cost price</span>
                    <span class="mx-5" v-if="element.metric.total"><dCurrency :amount="element.metric.total" /></span>
                    <span class="mx-5" v-else><dCurrency :amount="element.imperial.total"></dCurrency></span>
                    </span>
                  </span>
                </span>
            </div>
    
            </div>
          </draggable>
        </div-->

      </div>


  </div>
  
  
    </template>
    