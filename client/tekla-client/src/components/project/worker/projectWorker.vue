<script>
import axios from 'axios'
import assignWorkerTask from './assignWorkerTask.vue'
import assignTask from './XassignTask.vue'

export default {
    name: 'projectWorker',
    props: {
        employee: Object,
        project: Object,
    },
    components: { assignTask },
    data () { return {
        err: null,        
        worker: null,
        task: null,
        unassignedTasks: null,
        updatedProject: null,
    }},
    mounted () {      
        this.processTasks()
    },       
    methods: {
        async saveAll(){
            try {
                await this.saveProjectData() // save project first
                await this.saveWorkerData() 
                }
            catch(e) {
                this.err = e.message
            }
        },
        async saveWorkerData(){
            const self = this;
            axios.put(`http://${location.hostname}/worker/${self.employee._id}`, self.worker)
            .then(res => {                
                if( res.status == 200){                   
                self.worker = res.data
                }
            })
            .catch(error => { 
                self.err = error.message
            })
        },
        async saveProjectData(){
            const self = this;
            axios.put(`http://${location.hostname}/project/${self.project._id}`, self.project)
            .then(res => {                
                if( res.status == 200){                   
                self.updatedProject = res.data
                }
            })
            .catch(error => { 
                self.err = error.message
            })        
        },
        processTasks(){
            function unassigned(item){
                if(!item.assignedto){
                    return item
                }
            }
            this.unassignedTasks = this.project.tasks.map(unassigned)           
        },
    }
}
</script>

<template>
     <p class="text-sm text-red-600" v-if="err">{{err}}</p>

    <p class="text-sm bg-green-300 text-green-800 rounded mx-5 my-5 h-12 relative">Prop {{employee._id}} {{employee.name}}
        <button class="btn btn-primary absolute right-0" @click="saveAll">Save</button>
    </p>
   
    <section v-if="unassignedTasks">    
        <assignTask :worker="employee" :unassignedTasks="unassignedTasks" />
    </section>
   
</template>