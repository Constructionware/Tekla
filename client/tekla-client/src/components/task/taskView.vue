<script>
import axios from 'axios';

export default {
    name: 'task-view',
    props: {
        id: String,
    },
    data(){return{
        error: null,
        title: 'CentryPlan Task Capture Console',
        task: {
            "title": null,
            "description": null,
            "metric": {
                "unit": null,
                "price": 0,
                "quantity": 0,
                "total": null
            },
            "imperial": {
                "unit": null,
                "price": 0,
                "quantity": 0,
                "total": null
            },
            "state": {
                "active": false,
                "complete": false,
                "pause": false,
                "terminate": false
            },
            "event": {
                "started": null,
                "completed": null,
                "paused": [],
                "restart": [],
                "terminated": null
            },
            "assigned": false,
            "assignedto": null,
            "phase": null,
            "paid": null,
            "timestamp": Date.parse(new Date()),
            "comments": [],
            "progress": 0,
            "output": {
                "metric": 0,
                "imperial": 0
            },
            "category": null

        }
    }},
    computed: {
        covertUnit(){
            
            switch (this.task.metric.unit) {
                case 'm':
                      this.task.imperial.unit = 'ft'                 
                    break;
                case 'm2':
                    this.task.imperial.unit = 'ft2'                 
                break;
                case 'm3':
                      this.task.imperial.unit = 'ft3'                 
                    break;
            
                default:
                    break;
            }
            
        },
    },
   
    methods: {
        
        submitForm(){
            
            const self = this;
           
            axios.post(`${this.http}savetask`, self.task)
            .then(res => {
                console.log('Submitted', res)
                if(res.status == 200){
                    window.location.reload()
                }
                
            }).catch(err => {
                self.error= err.message
            })

        },
        printForm() {
          // this.$printJs('invoice-rec')
            alert('This Feature is being tested! Use with caution.')
           printJS({ 
            printable: 'task-form', 
            type: 'html',
            targetStyles: ['*'],
            footer: `__ &reg CentryPlan Building Services __`
         });

          
            
        }
        
    }

}
</script>
<template>
<div>
    
    <!-- The button to open modal -->
<label for="new-task" class="btn btn-secondary btn-sm modal-button">New Task</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="new-task" class="modal-toggle" />
<label for="new-task" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">{{title}}</h3>
    <p class="text-red-500 my-2" v-if="error">{{error}}</p>
    <div  id="task-form" class="px-5 py-4">
        <p class="text-2xl text-gray-700 font-semibold text-center">CentryPlan Building Services </p>
        <p class="text-lg text-gray-600 font-semibold text-center">Task Capture Form</p>
        <FormKit type="form" @submit="submitForm">
            <FormKit type="text" v-model="task.title" label="Title" />
            <FormKit type="text" v-model="task.description" label="Description" />
            <FormKit type="text" v-model="task.category" label="Category" />
            <div class="divider">Metric Propertiec </div>
            <div class="flex flex-row">
                <FormKit type="text" v-model="task.metric.unit" label="Unit" />
                <FormKit type="number" v-model.number="task.metric.price" label="Price" />
                <FormKit type="number" v-model.number="task.output.metric" label="Daily Output" />
            </div>
            <div class="divider">Imperial Propertiec </div>
            <div class="flex flex-row">
                <FormKit type="text" v-model="task.imperial.unit" label="Unit" :value="covertUnit" />
                <FormKit type="number" v-model.number="task.imperial.price" label="Price" />
                <FormKit type="number" v-model.number="task.output.imperial" label="Daily Output" />
            </div>
        </FormKit>
       
    </div>
    <button class="btn btn-primary" @click="printForm">Print Form</button>
  </label>
 
</label>



</div>
</template>