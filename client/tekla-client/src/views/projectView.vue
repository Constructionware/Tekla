<script>
import axios from 'axios'
import siteAlert from '../components/ui/siteAlert.vue' 
import stackTpl from '../components/tpl/stackTpl.vue' 

import ProjectAccount from '../components/project/account/ProjectAccount.vue'

import tTask from '../components/project/task/tTask.vue'
import AccountTransaction from '../components/project/account/accountTransaction.vue'
import Workers from '../components/project/worker/workers.vue'
import NewWorker from '../components/project/worker/newWorker.vue'
import projectWorker from '../components/project/worker/projectWorker.vue'
import Tasks from '../components/project/task/task.vue'
import manageTask from '../components/project/task/manageTask.vue'
import Inventory from '../components/project/inventory/inventory.vue'
import ttable from '../components/project/task/tTable.vue'
import AddWorker from '../components/project/worker/addWorker.vue'
import DCurrency from '../components/ui/dCurrency.vue';
import InvoiceRecord from '../components/project/invoice/invoiceRecord.vue'
import invoiceIndex from '../components/project/invoice/invoiceIndex.vue'
import projectInvoice from '../components/project/invoice/projectInvoice.vue'


export default {
    props: {
        id: {String}
    },
    inject: ['message'],
    data() { return {
        alert:{'message': `Project ${this.id} Stack View`, 'status': 'info'}, 
        err:null,      
        project: null,       
        isMetric: false,
        state: {
        state: null,
        setting: {
            inner: "flex flex-row h-12 border border-gray-300 my-2 mx-5 rounded-md min-w-full relative",
            outer: "flex flex-row items-inline space-x-2 border border-gray-300 " 
            },
        },
        show: {
            display: true,
            tasks: false,
            addtask: false,
            addworker: false,
            lsbar: {
                account: false,
                hr: false,
                jobs: false,
                hardware: true,
                inventory: false,
                tabs: {
                    acc: "tab tab-lifted tab-bordered tab-md text-gray-800",
                    hr: "tab tab-lifted text-gray-800",
                    jbs: "tab tab-lifted text-gray-800",
                    hrdwr: "tab tab-lifted tab-bordered tab-md tab-active text-blue-500 font-semibold",
                    invtry: "tab tab-lifted text-gray-800"

                }
            }

        },
        invoice: null,
        transaction: null,
        worker: null,
        task: null,
    }},
    components: {
        stackTpl,
        siteAlert,
        ProjectAccount,
        AccountTransaction,
        Workers,
        NewWorker,
        projectWorker,
        Tasks,
        tTask,
        manageTask,
        Inventory,
        ttable,
        AddWorker,
        DCurrency,
        InvoiceRecord,
        invoiceIndex,
        projectInvoice,
    },
    
    mounted(){
        this.getProject()
        setTimeout(() => {
            this.setSandard()
        }, 500);
    },
    watch: {
        isMetric(){ this.updateStandard() }
    },
    methods: {
        async getProject(){
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
        },
        lsDisplay(flag){
            switch(flag) {
            case 'account':                
                this.show.lsbar.hr = false
                this.show.lsbar.jobs = false
                this.show.lsbar.hardware= false
                this.show.lsbar.inventory= false
                this.show.lsbar.account = true  
                this.show.lsbar.tabs = {
                    acc: "tab tab-lifted tab-bordered tab-md tab-active text-blue-500 font-semibold",
                    hr: "tab tab-lifted text-gray-800",
                    jbs: "tab tab-lifted text-gray-800",
                    hrdwr: "tab tab-lifted text-gray-800",
                    invtry: "tab tab-lifted text-gray-800"

                }             
                
                break;
            case 'hr':
           
                this.show.lsbar.jobs = false
                this.show.lsbar.hardware= false
                this.show.lsbar.inventory= false
                this.show.lsbar.account = false 
                this.show.lsbar.hr = true   
                this.show.lsbar.tabs = {
                    acc: "tab tab-lifted text-gray-800",
                    hr: "tab tab-lifted tab-bordered tab-md tab-active text-blue-500 font-semibold",
                    jbs: "tab tab-lifted text-gray-800",
                    hrdwr: "tab tab-lifted text-gray-800",
                    invtry: "tab tab-lifted text-gray-800"

                }                   
                
                break;
            case 'jobs':
                
                this.show.lsbar.hardware= false
                this.show.lsbar.inventory= false
                this.show.lsbar.account = false 
                this.show.lsbar.hr = false 
                this.show.lsbar.jobs = true  
                this.show.lsbar.tabs = {
                    acc: "tab tab-lifted text-gray-800",
                    hr: "tab tab-lifted text-gray-800",
                    jbs: "tab tab-lifted tab-bordered tab-md tab-active text-blue-500 font-semibold",
                    hrdwr: "tab tab-lifted text-gray-800",
                    invtry: "tab tab-lifted text-gray-800"

                }    

                break;
            case 'hardware':
                
                this.show.lsbar.inventory= false
                this.show.lsbar.account = false 
                this.show.lsbar.hr = false 
                this.show.lsbar.jobs = false
                this.show.lsbar.hardware= true 
                this.show.lsbar.tabs = {
                    acc: "tab tab-lifted text-gray-800",
                    hr: "tab tab-lifted text-gray-800",
                    jbs: "tab tab-lifted text-gray-800",
                    hrdwr: "tab tab-lifted tab-bordered tab-md tab-active text-blue-500 font-semibold",
                    invtry: "tab tab-lifted text-gray-800"

                }    

                break;
            case 'inventory':               
             
                this.show.lsbar.account = false 
                this.show.lsbar.hr = false 
                this.show.lsbar.jobs = false
                this.show.lsbar.hardware= false
                this.show.lsbar.inventory= true
                this.show.lsbar.tabs = {
                    acc: "tab tab-lifted text-gray-800",
                    hr: "tab tab-lifted text-gray-800",
                    jbs: "tab tab-lifted text-gray-800",
                    hrdwr: "tab tab-lifted text-gray-800",
                    invtry: "tab tab-lifted tab-bordered tab-md tab-active text-blue-500 font-semibold"

                }    

                break;

            default:
                // code block
            } 
        },
        displayInvoice(invoice){
            this.invoice = invoice
        },
        clearInvoice(){
            this.invoice = null
        },
        accountTransaction(t){
            this.transaction = t
        },
        async displayWorker( w ) {
            this.worker = w
            const self = this;
            axios.get(`http://${location.hostname}/getworker/${w.id}`)
            .then(res => {                
                if( res.status == 200){
                    //alert('Loading Employeed Data ...')
                    self.worker = res.data
                }
            })
            .catch(error => { 
                self.err = error.message
            })

        },
        getJobTask (id){
            this.task = null
            function findTask(task){
                if(task._id == id){
                    return task
                }else{ return null }
            }
            this.task = this.project.tasks.find(findTask)
        },

           
    }
}  
      
</script>
    
<template>
    <stack-tpl>
        <template v-slot:xalert><site-alert :msg="alert" /></template>

        <template v-slot:header>
           
            
            <div :class="state.setting.outer" v-if="project">
                <span>{{project.standard}}</span>

                <input type="checkbox" class="toggle mx-2 mt-2" v-model="isMetric"/>
            <div :class="state.setting.inner" v-if="project.state.active">
        
                
                    
                <span class="text-blue-600 text-xl text-center ">CentryPlan Project /{{project._id}}.</span><span class="mx-5">{{project.name}}</span>
                <span><span class="mx-5 badge badge-accent cursor-pointer" @click="updateProject"> Update Project</span></span>
                <span class="mx-5 badge badge-primary cursor-pointer" @click="pSwitch('display')" v-if="!show.display">Back to Project</span>
                
                <span class="absolute right-2 text-sm text-gray-700">Category {{project.category}}</span>
                
            
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
     
        </template>
        
        <template v-slot:lsbar>
            <div class="tabs mx-2 my-2">
            <a :class="show.lsbar.tabs.acc" @click="lsDisplay('account')">Accounts</a> 
            <a :class="show.lsbar.tabs.hr" @click="lsDisplay('hr')">HR</a> 
            <a :class="show.lsbar.tabs.jbs" @click="lsDisplay('jobs')">Jobs</a>
            <a :class="show.lsbar.tabs.hrdwr"  @click="lsDisplay('hardware')">Hardware</a>
            <a :class="show.lsbar.tabs.invtry"  @click="lsDisplay('inventory') ">Inventory</a>
            </div>
            <section id="account" class="flex flex-col w-full mx-2 bg-gray-50 border rounded-md shadow-md " v-if="show.lsbar.account">
                <p  class="bg-gray-400 h-12 items-center relative">
                
                        <h6>Account TD</h6> 
                        <DCurrency :amount="project.account.ballance" />
                
                    <span class="absolute space-x-2 right-1">
                        <InvoiceRecord :id="project._id"></InvoiceRecord>
                        <AccountTransaction ></AccountTransaction>
                    </span>
                </p>
                <ProjectAccount :id="project._id" :account="project.account" @accountTransaction="accountTransaction" v-if="project"/>
            </section>

        <section id="hr" class="flex flex-col w-full mx-2" v-if="show.lsbar.hr">
            <p class="bg-gray-400 h-12 relative">
                <span class="badge badge-primary my-2 mx-1" >{{project.workers.length}}</span>
                Workers
                <span class="absolute right-1 mt-2">
                    <NewWorker :id="project._id"/>
                    <span class="badge badge-secondary cursor-pointer mx-2" @click="pSwitch('addworker')">add</span>
                   
                </span>
               
            </p>
            <workers :id="project._id" :workers="project.workers" @displayworker="displayWorker"></workers>

        </section>
        <section id="jobs" class="flex flex-col w-full mx-2" v-if="show.lsbar.jobs">
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
            <tasks :id="project._id" :tasks="project.tasks" @getjobtask="getJobTask"></tasks>
        </section>

        <section id="inventory" class="flex flex-col w-full mx-2" v-if="show.lsbar.inventory">
            <p class="bg-gray-400 h-12 relative">
                <span class="badge badge-primary my-2 mx-1">{{project.inventory.length}}</span>
                Inventory</p>
            <Inventory :id="project._id" :inventory="project.inventory"></Inventory>
        </section>

        <section id="hardware" class="flex flex-col w-full mx-2" v-if="show.lsbar.hardware">
                <invoiceIndex :invoices="project.account.records.invoices" @displayinvoice="displayInvoice"  @clearInvoice="clearInvoice" v-if="project"/>
        </section>

        </template>

        <template v-slot:xdisplay>  

            <div class="flex flex-col w-3/4 mx-10 my-10" v-if="invoice">
            <projectInvoice :record="invoice"/>
            </div>  

            <div class="flex flex-col mx-5 my-10" v-if="transaction">
                <button class="btn btn-sm" @click="transaction = !transaction">Clear Transaction</button>
           {{transaction}}
          
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
            <section v-if="worker">
                <button class="btn btn-sm" @click="worker = !worker">Clear Employee</button>
                <projectWorker :employee="worker" :project="project" ></projectWorker>
              </section>  
              <section v-if="task">
                <button class="btn btn-sm" @click="task = !task">Clear Task</button>
                <manageTask :task="task" />
                
               
              </section> 
             
              <p class="text-red-500">{{message}}</p> 
        </template>
        <template v-slot:xfooter >
            <p>Welcome to CentryPlan Project Manager {{http}}</p>  
        </template>

    </stack-tpl>
</template>
    