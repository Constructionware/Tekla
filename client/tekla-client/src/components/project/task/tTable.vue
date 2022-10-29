
<template>

    <div id="tble"></div>
</template>

<script>

import {Tabulator} from 'tabulator-tables';

import axios from 'axios'


export default {
    name: "ttable",
    data() { return {
        tasks: [],
        
    }},  
    mounted(){ 
        this.loadTasks ()
        setTimeout(() => {
            this.setTable() 
        }, 600);
        
    },
    methods: {
        loadTasks (){          
            axios.get(`${this.http}tasks`)
            .then(res => {
                this.tasks = res.data
                
            })
        },
        setTable(){
            var table = new Tabulator("#tble", {
                data: this.tasks,
                index:"_id", //set the index field to the "age" field.
                columns:[
                {title:"Id", field:"_id"},
                {title:"Title", field:"title"},
                {title:"Description", field:"description"},
                
            ],
        })
        
        }
    }
}

</script>