<script setup>
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

defineProps({
  msg: String
})
const draggable = VueDraggableNext

const count = ref(0),
enabled = ref(true),
tasksIndex = ref([
          { name: 'John', id: 1 },
          { name: 'Joao', id: 2 },
          { name: 'Jean', id: 3 },
          { name: 'Gerard', id: 4 },
        ]),
tasks = ref([]),
dragging = ref(false);

function log(event) {
        console.log(event)
      }

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <h1 class="text-3xl text-teal-500 font-bold underline">
    Hello world! 
  </h1>
  <div class="dropdown">
  <label tabindex="0" class="btn m-1">Click</label>
  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
<div class="badge">neutral</div>
<div class="badge badge-primary">primary</div>
<div class="badge badge-secondary">secondary</div>
<div class="badge badge-accent">accent</div>
<div class="badge badge-ghost">ghost</div>


<div class="flex flex-row my-2">
    <div class="w-1/2 bg-yellow-200 mr-2 "> 
        <p class="py-2 relative">Tasks Index  <span class="mx-5 absolute right-2">search <input type="text"></span></p>
        <draggable
        class="list-group overflow-y-auto h-96"
        :list="tasksIndex"
        group="people"
        @change="log"
        itemKey="title"
      >
      <div
                class="list-group-item"
                v-for="element in tasksIndex"
                :key="element.id"
                >
          <div class="list-group-item py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 relative">
            {{ element }} <span class="text-xs mx-5">({{ element.id }})</span>
            <span>{{element}}</span>
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
      >
      <div
                class="list-group-item"
                v-for="element in tasks"
                :key="element.id"
                >
          <div class="list-group-item py-2 bg-gray-100 cursor-pointer hover:bg-gray-200">{{ element}}
          <!--span>{{element.value.metric.unit}}</span>
          <span class="text.xs text-red-300 font-semibold mx-2">{{element.value.metric.price}}</span--->
            <div class="dropdown">
              <label tabindex="0" class="btn btn-sm btn-primary m-1">Click</label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>{{ element.id}}</a></li>
              </ul>
            </div>
        </div>

        </div>
      </draggable>
    </div>
</div>
 
</template>
