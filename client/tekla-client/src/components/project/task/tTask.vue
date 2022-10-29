<script setup>
import { ref,  onMounted } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import axios from 'axios'

import siteAlert from '../../ui/siteAlert.vue' 
import dCurrency from '../../ui/dCurrency.vue'


const props = defineProps({
  id: String,
  standard: null,
  employees: null,
  projectTasks: Array,
  
  
})
const draggable = VueDraggableNext

const count = ref(0),
salert = ref(),
isMetric = ref(false),
tasks = ref(props.projectTasks),
workers = ref([]),
projectWorkers = ref([]),
dragging = ref(false),
phase = ref("");


var tasksIndex = ref([])

function loadTasks (){
    
    if (window.location.hostname == 'localhost'){
      var url = 'http://127.0.0.1/tasks'
    }else{ var url = `http://192.168.0.10/tasks`}
    axios.get(url)
    .then(res => {
        tasksIndex.value = res.data
        
    })
}
function log(event) {
    event.added.element.phase = phase.value
        //console.log('LOGGED', event.added)
}
function loadWorkers(){
  function processE(item){
    return {
      label: item.id,
      value: item.added
    }
  }
  var processedData = props.employees.map(processE)
  
}

// lifecycle hooks
onMounted(() => {
  loadWorkers()
  setTimeout(() => {
        loadTasks()
  }, 500);

  
})


</script>

<template>
<site-alert :msg="{message: 'Project Phase has to be set to proceed!', status:'warning'}" v-if="phase.length < 1" />
  <p class="flex flex-row h-12 border rounded-md my-2 items-center">
  <h1 v-if="standard == 'metric', isMetric=true ">Project Standard {{ standard }}</h1>
<span class="mx-2">
set project phase
</span>
<select class="select w-48 max-w-xs" v-model="phase" >
  <option disabled selected>Pick Project Phase</option>
  <option>Preliminary</option>
  <option>Substructure</option>
  <option>Superstructure</option>
  <option>Roofing</option>
  <option>Finishes</option>
</select>
</p>
<div v-if="phase.length > 2">
<div class="flex flex-row my-2 mx-5" v-if="tasksIndex.length > 0">
    <div class="w-1/2 bg-yellow-200 mr-2 "> 
        <p class="py-2 relative">Tasks Index  <span class="mx-5 absolute right-2">search <input type="text" /></span></p>
        <draggable
        class="list-group overflow-y-auto h-96"
        :list="tasksIndex"
        group="people"
        @change="log"
        itemKey="title"
        v-auto-animate="{ duration: 550 }"
      >
      <div
                class="list-group-item"
                v-for="element in tasksIndex"
                :key="element._id"
               
                >
          <div class="list-group-item py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 relative">
            <span>({{ element._id }}) {{element.title}}</span>
             <span class="text-xs mx-5">({{ element.category}})</span>
            
             <!--span class="font-semibold text-blue-800 absolute right-2">{{element.value.category}}</span--></div>
        </div>
      </draggable>

        
    </div>
    <div class="w-1/2 bg-blue-200 ml-2"> 
        <p>Project Tasks</p>
        <draggable
        class="list-group overflow-y-auto h-96"
        :list="tasks"
        group="people"
        @change="log"
        itemKey="title"
        v-auto-animate="{ duration: 250 }"
      >
      <div
                class="list-group-item"
                v-for="element in tasks"
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
              <label tabindex="0" class="btn btn-sm btn-primary m-1">Assign</label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" v-if="isMetric">
                <li><a>Workers</a></li>
                <li>
                  <FormKit
                v-model="workers"
                type="select"
                multiple
                label="Assign to task"
                name="country"
                :options="projectWorkers"
                help="control (C) to add."
              />
             
                </li>
               
                
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
    </div>
</div>
</div>

</template>
