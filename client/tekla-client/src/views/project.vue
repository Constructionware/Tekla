<script>
import axios from 'axios'
import siteAlert from '../components/ui/siteAlert.vue' 
import workTpl from '../components/tpl/workTpl.vue' 

import ProjectAccount from '../components/project/account/ProjectAccount.vue'

import tTask from '../components/project/task/tTask.vue'
import AccountTransaction from '../components/project/account/accountTransaction.vue'
import Workers from '../components/project/worker/workers.vue'
import NewWorker from '../components/project/worker/newWorker.vue'
import Tasks from '../components/project/task/task.vue'
import Inventory from '../components/project/inventory/inventory.vue'
import ttable from '../components/project/task/tTable.vue'
import AddWorker from '../components/project/worker/addWorker.vue'
import DCurrency from '../components/ui/dCurrency.vue';
import InvoiceRecord from '../components/project/invoice/invoiceRecord.vue'
import invoiceIndex from '../components/project/invoice/invoiceIndex.vue'


export default {
    props: {
        id: {String}
    },
    inject: ['message'],
    data() { return {
        alert:{'message': `Welcome to CentryPlan Project/${this.id}`, 'status': 'info'},       
        project: null,
       
        isMetric: false,
        show: {
            display: true,
            tasks: false,
            addtask: false,
            addworker: false,

        }
    }},
    components: {
        workTpl,
        siteAlert,
        ProjectAccount,
        AccountTransaction,
        Workers,
        NewWorker,
        Tasks,
        tTask,
        Inventory,
        ttable,
        AddWorker,
        DCurrency,
        InvoiceRecord,
        invoiceIndex,
    },
    
    mounted(){
        this.getProject()
        setTimeout(() => {
            this.setSandard()
        }, 50);
    },
    watch: {
        isMetric(){ this.updateStandard() }
    },
    methods: {
        getProject(){
            const self = this          
           
            axios.get(`${self.http}jsonproject/${self.id}`)
            .then(res => {
                self.project = res.data
                self.alert = {'message': `Project ${self.id} was loaded successfully to your Desktop.`, 'status': 'success'}
            })
            .catch(err => {
                self.alert = {'message': err.message, 'status': 'error'}
            })
        },
        updateProject(){
            const self = this;
            axios.put(`${self.http}project/${self.id}`, self.project)
            .then(res => {
               self.alert = {'message': `${self.id} Updated Successfully!`, 'status': 'info'}
            })
            .catch(error => {
                self.alert = {'message': `${error.message}`, 'status': 'error'} 
            })
            window.location.reload()


        },
        setSandard() {
            if( this.project.standard == 'metric'){
                this.isMetric = true
            }else{ 
                this.project.standard = 'imperial'
                this.isMetric = false
            }
        },
        updateStandard(){
            if( this.isMetric){
                this.project.standard = 'metric'
            }
            else{
                this.project.standard = 'imperial'
            }
        },
        pSwitch(flag){
            switch(flag) {
            case 'display':
                this.show.tasks = false
                this.show.addtasks = false
                this.show.addworker = false
                this.show.display = true
                
                break;
            case 'task':
                this.show.display = false
                this.show.addtasks = false
                this.show.addworker = false
                this.show.tasks = true
                break;
            case 'addtask':
                this.show.display = false
                this.show.tasks = false
                this.show.addworker = false
                this.show.addtasks = true
                break;
            case 'addworker':
                this.show.display = false
                this.show.tasks = false
                this.show.addtasks = false
                this.show.addworker = true
                break;

            default:
                // code block
            } 
        }

           
    }
}  
      
</script>
    
<template>
    <work-tpl>
        <template v-slot:xalert><site-alert :msg="alert" /></template>

        <template v-slot:header>
            <p>Welcome to CentryPlan Project Manager {{http}}</p>       
        </template>


        <template v-slot:xdisplay>

          <div v-if="project">
        <div class="flex flex-row h-12 bg-green-300 text-sm mx-5 my-5 rounded-md" v-if="project.state.active">
       
          <span class="mx-5">Active Project</span>
        
        
      </div>
     
        <div class="flex flex-row h-12 bg-blue-300 text-sm mx-5 my-5 rounded-md" v-else-if="project.state.completed" >
       
          <span class="mx-5">Completed Project</span>
          <span>Completion Date {{project.event.completed}}</span>
        
      </div>

        
        <div 
        class="flex flex-row h-12 bg-gray-300 text-sm mx-5 my-5 rounded-md"
        v-else-if="project.state.paused"
        >
       
          <span class="mx-5">Paused Project</span>
          <span>Paused on {{project.event.paused[-1]}}</span>
          <span class="mx-5">Restart</span>
        
      </div>

       
        <div class="flex flex-row h-12 bg-red-300 text-sm mx-5 my-5 rounded-md" v-else>
       
          <span class="mx-5">Terminated Project</span>
          <span>Termination Date {{ project.event.terminated}}</span>
        
      </div>
    </div>  

        

    <p class="text-blue-600 text-3xl text-center font-bold mx-5 spacing-2 relative" v-if="project">
        <span class="flex flex-row text-2lg absolute left-2">
        <label >Project Units <span>{{project.standard}}</span></label>
        <input type="checkbox" class="toggle mx-5 mt-2" v-model="isMetric"/>
        </span>
      <span class="text-blue-600 text-xl text-center ">CentryPlan Project /{{project._id}}.</span><span class="mx-5">{{project.name}}</span>
      <span><span class="mx-5 badge badge-accent cursor-pointer" @click="updateProject"> Update Project</span></span>
      <span class="mx-5 badge badge-primary cursor-pointer" @click="pSwitch('display')" v-if="!show.display">Back to Project</span>
     
      <span class="absolute right-2 text-sm text-gray-700">Category {{project.category}}</span>
    </p>
    
    <div class="flex flex-row mx-5 bg-teal-50" v-if="show.display">
        <section class="flex flex-col w-1/4 mx-2 bg-gray-50 border rounded-md shadow-md " v-if="project">
            <p class="bg-gray-400 h-12 items-center relative">
               
                    <h6>Account TD</h6> 
                    <DCurrency :amount="project.account.ballance" />
              
                <span class="absolute space-x-2 right-1">
                    <InvoiceRecord :id="project._id"></InvoiceRecord>
                    <AccountTransaction ></AccountTransaction>
                </span>
            </p>
            <ProjectAccount :account="project.account" v-if="project"/>
        </section>
        <section class="flex flex-col w-1/4 mx-2" v-if="project">
            <p class="bg-gray-400 h-12 relative">
                <span class="badge badge-primary my-2 mx-1" >{{project.workers.length}}</span>
                Workers
                <span class="absolute right-1 mt-2">
                    <NewWorker :id="project._id"/>
                    <span class="badge badge-secondary cursor-pointer mx-2" @click="pSwitch('addworker')">add</span>
                   
                </span>
               
            </p>
            <workers :id="project._id" :workers="project.workers"></workers>

        </section>
        <section class="flex flex-col w-1/4 mx-2" v-if="project">
            <p class="bg-gray-400 h-12 relative">
                <span class="mx-2 text-xl font semibold">
                    <span class="badge badge-primary my-2 mx-1">{{project.tasks.length}}</span>
                    Tasks</span>  
                <span class="absolute space-x-2 right-1 mt-2"> 
                <span class="badge cursor-pointer" @click="pSwitch('task')">Index</span>
                <span class="badge badge-primary cursor-pointer">project</span>
                <span class="badge badge-secondary cursor-pointer" @click="pSwitch('addtask')">add</span>
                </span>
            </p>
            <tasks :id="project._id" :tasks="project.tasks"></tasks>
        </section>
        <section class="flex flex-col w-1/4 mx-2" v-if="project">
            <p class="bg-gray-400 h-12 relative">
                <span class="badge badge-primary my-2 mx-1">{{project.inventory.length}}</span>
                Inventory</p>
            <Inventory :id="project._id" :inventory="project.inventory"></Inventory>
        </section>
    </div>
    
   
            <section v-if="show.tasks">
                <ttable />
               
            </section> 
            <section v-if="show.addtasks">
                <tTask :id="project._id" :standard="project.standard" :employees="project.workers" :project-tasks="project.tasks"/>
               
            </section> 
            
            <section id="add-employee-console" v-if="show.addworker">
                <AddWorker :id="project._id" :workers="project.workers"/>

            </section>
            <section v-if="project">
              
              <!--ul>
                  <li v-for="(val, key) of project">
                    <span v-if="key === 'tasks'">
                     <strong >{{key}}</strong>
                      <section class="bg-gray-400 py-2 px-2 my-2 " v-for="item of val">{{item._id}} {{item.title}} {{item.description}}</section>
                    </span>
                    
                    </li>
                     
              </ul-->
              
              </section>   
              <section v-if="project">
                <invoiceIndex :invoices="project.account.records.invoices" />

                <p class="text-red-500">{{project.account.transactions.withdraw}}</p> 
              </section>
              <p class="text-red-500">{{message}}</p> 
        </template>

    </work-tpl>
</template>
    