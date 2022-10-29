<script>
import axios from 'axios';

import {Tabulator} from 'tabulator-tables';

export default {
    name: 'task-view',
   
    data(){ 
        return {
            tasksIndex: null,
            error: null
        }
    },
    mounted(){
        this.getTasks()

        setTimeout(() => {
            this.setTasksTable()
        }, 500);
    },
    methods: {
        async getTasks() {
            const self = this;
            axios.get(`${self.http}tasks`)
                .then(res => {
                    self.tasksIndex = res.data
                })
                .catch(err => {
                    self.error = err.message
                })


        },
        setTasksTable(){
            var table = new Tabulator("#tasksindex", {
                placeholder: "Tasks Index",
                data: this.tasksIndex,               
                index:"_id", //set the index field to the "age" field.
                columns:[
                {title:"Id", field:"_id"},
                {title:"Category", field:"category"},
                {title:"Title", field:"title"},
                {title:"Description", field:"description"},
                {title:"Metric Unit", field: "metric.unit"},
                {title:"Output", field: "output.metric"},
                {title:"Price", field: "metric.price"},
                {title:"Imperial unit", field:"imperial.unit"},
                {title:"Output", field: "output.imperial"},
                {title:"Price", field: "imperial.price"},
                //{title:"Added", field: "timestamp", hozAlign:"center", sorter:"date", widthGrow:2},
                
                
            ],
            
        })
       
        
        }
        
    }

}
</script>
<template>
    <p class="text-red-500">{{error}}</p>
    <div id="tasksindex"></div>
   

</template>