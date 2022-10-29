
var projectransaction = Vue.component('projectransaction',{
    template: `<div>
   

    <!-- The button to open modal -->
    <label for="my-modal" class="btn btn-sm">Deposit/Withdraw</label>
    
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
      <p class="text-lg text-center bg-gray-300 rounded py-2">{{id}}/Transaction Details</p>
      <div class="form-control w-full max-w-xs">
      <label class="label"><span class="label-text">Date</span></label>
      <input type="date" placeholder="Date" class="input input-bordered w-full max-w-xs" v-model="transaction.date"/>
      <label class="label"><span class="label-text-alt">{{err}}</span></label>

      <label class="label"><span class="label-text">Transaction Type</span></label>
      <select class="select w-full max-w-xs" v-model="transaction.type">
          <option disabled selected></option>
          <option>Deposit</option>
          <option>Withdraw</option>
         
          </select>
      

      <label class="label"><span class="label-text">Amount</span></label>
      <input type="number" placeholder="Amount" class="input input-bordered w-full max-w-xs" v-model.number="transaction.amount"/>
      <label class="label"><span class="label-text-alt">{{err}}</span></label>

      <section v-if="transaction.type === 'Deposit'">
          <label class="label"><span class="label-text">Payee</span></label>
          <input type="text" placeholder="Payee" class="input input-bordered w-full max-w-xs" v-model="transaction.payee"/>
          <label class="label"><span class="label-text-alt">{{err}}</span></label>
      
      </section>
      <section v-if="transaction.type === 'Withdraw'">
          <label class="label"><span class="label-text">Recipient</span></label>
          <input type="text" placeholder="Recipient" class="input input-bordered w-full max-w-xs" v-model="transaction.recipient"/>
          <label class="label"><span class="label-text-alt">{{err}}</span></label>
      
      </section>
      <label class="label"><span class="label-text">Refference</span></label>
      <input type="text" placeholder="Refference" class="input input-bordered w-full max-w-xs" v-model="transaction.ref"/>
      <label class="label"><span class="label-text-alt">{{err}}</span></label>
  </div>
        <div class="modal-action">
        <button class="btn btn-primary" @click="submit">Submit</button>
          <label for="my-modal" class="btn">Exit</label>
        </div>
      </div>
    </div>

    </div>`,
    name: "projectransaction",
    props:['id'],
    data() {return {
        project: "",
        
        transaction:{
            id: null,
            date: null, 
            type:"",            
            amount: null, 
            ref: ""
        },
        result: {},
        err: null
    }},
    methods:{
        submit(){
            var url = `/transaction/${this.id}`
            this.transaction.date = Date.parse(new Date(this.transaction.date))
            
            
            axios.post(url, this.transaction)
            .then(result => {
                this.result = result.data
            })
            .catch(error => {
                this.err = error.message
            })
            window.location.reload()
        }
    }
})

var projectaccount = Vue.component('projectaccount',{
    props: ['account'],
    data() {
        return {
            
            message: "Centryplan Project Accounting",
            statement:null,
            err: null
        }
    },
    computed: {
        pa() {
            return this.account
        },

    },
    template: `<div class="text-xs">{{message}}
    
    
    
    </div>`
})

var addworker = Vue.component('addworker', {
    props: ['id'],
    data(){
        return {
            index: [],
            workers: []
        }
    },
    methods: {
        submitData(){
            console.log(workers)
        }
    },
    template: `<div><p>{{id}}</p>
    
    </div>`
})

var projectworker = Vue.component('projectworker',{
    display: "Clone",
    order: 2,
    
    props: ['project'],
    data() {
        return {
            
            message: "Centryplan Employee Transfer ",
            statement:null,
            err: null,
            workersIndex: [],
            projectWorkers: [],
            response: {}
            
        }
    },
    mounted() {
        this.getLoadWorkers()
    },
    methods: {
        getLoadWorkers(){
            var url = "/workers"
            //this.projectWorkers = this.project.workers
            axios.get(url)
            .then( response => {
                this.workersIndex = response.data.data.rows
            })
            .catch(errors => {
                this.err = error.message
            })
        },
        log: function(evt) {
            window.console.log(evt);
          },
        submitHandler(){
            var data = []
            this.projectWorkers.forEach(element => {
                data.push(element.id)

                
            });
            var url = `/addworker/${this.project}`
            axios.post(url, data)
            .then(response => {
                this.response = response
            })
            .catch(error => {
                this.err = error.message
            })
            window.location.reload()
        }
    },
    
     
    template: `<div class="text-xs">
  
    <!-- The button to open modal -->
    <label for="add-worker" class="btn modal-button btn-sm">Add/Remove Worker</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="add-worker" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">
    
        <h3 class="font-bold text-lg">{{ message }}</h3>
        <p class="text-red-500 text-sm" v-if="err">{{err}}</p>
        
        <div class="flex flex-row mx-5">
            <div class="flex flex-col w-1/2">
                <h3>Workers Index</h3>
                <draggable
                    class="dragArea list-group"
                    :list="workersIndex"
                    :group="{ name: 'people', pull: 'clone', put: false }"
                    @change="log"
                >
                    <div
                    class="list-group-item"
                    v-for="element in workersIndex"
                    :key="element.id"
                    >
                    <button>
                    <span class="text-sm text-gray-500 cursor-pointer py-2 mx-2">{{ element.id }} {{element.value.name}}</span>
                    <span class="mx-5">{{element.value.occupation}}</span>
                    </button>
                    </div>
                </draggable>
            </div>

            <div class="flex flex-col w-1/2">
            <h3>Project Workers</h3>
            <draggable
                class="dragArea list-group"
                :list="projectWorkers"
                group="people"
                @change="log"
            >
                <div
                class="list-group-item"
                v-for="element in projectWorkers"
                :key="element.id"
                >
                {{ element.id }}
                </div>
            </draggable>
            </div>

        </div>
        
        <button class="btn btn-accent" @click="submitHandler">Submit</button>
        <div class="modal-action">
        <label for="add-worker" class="btn" >Exit!</label>
        </div>
    </div>
    </div>
    
  
       
    
    </div>`
})


var projectask = Vue.component('projectask',{
    props: ['project'],
    data() {
        return {            
            message: "Centryplan Task Transfer ",
            tasksIndex: null,
            tasks: [],
            statement:null,
            err: null,
            response: null
        }
    },
    
    mounted() {
        setTimeout(() => {
            this.getLoadTasks()            
        }, 500);
        
    },
    methods: {
        getLoadTasks(){
            var url = "/tasks",
                self = this;
            
            axios.get(url)
            .then( response => {
                self.tasksIndex = response.data
            })
            .catch(error => {
                self.err = error.message
            })
        },
        log: function(evt) {
            window.console.log(evt);
          },
        submitHandler(){
            
            var url = `/addtasks/${this.project}`
            axios.post(url, this.tasks)
            .then(response => {
                this.response = response
            })
            .catch(error => {
                this.err = error.message
            })
            window.location.reload()
        }
    },
    
    template: `<div class="text-xs">
    <!-- The button to open modal -->
   
    <label for="add-task" class="btn modal-button btn-sm">Add/Remove Tasks</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="add-task" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">{{message}}</h3>
       
        <div class="flex flex-row mx-5  w-full">
        <div class="flex flex-col w-1/2">
            <p class="bg-gray-300 text-lg text-center py-2 px-2 rounded-md">Tasks Index</p>
            <draggable
                class="dragArea list-group"
                :list="tasksIndex"
                :group="{ name: 'tasks', pull: 'clone', put: false }"
                @change="log"
            >
                <div
                class="list-group-item"
                v-for="element in tasksIndex"
                :key="element.id"
                >
                <button>
                <span class="text-sm text-gray-500 cursor-pointer py-2 mx-2">{{ element.id }} {{element.title}}</span>
                
                </button>
                </div>
            </draggable>
        </div>

        <div class="flex flex-col mx-2 w-1/2">
        <p class="bg-gray-300 text-lg text-center py-2 px-2 rounded-md">Project Tasks</p>
        <draggable
            class="dragArea list-group"
            :list="tasks"
            group="tasks"
            @change="log"
        >
            <div
            class="list-group-item"
            v-for="element in tasks"
            :key="element.id"
            >
            {{ element.title }}
            </div>
        </draggable>
        </div>

    </div>
    
    <button class="btn btn-accent" @click="submitHandler">Submit</button>
        <div class="modal-action">
        <label for="add-task" class="btn">Exit!</label>
        </div>
    </div>
    </div>
  
       
    
    </div>`
})


var projectinventory = Vue.component('projectinventory',{
    props: ['project'],
    data() {
        return {
            
            message: "Centryplan Project Inventory ",
            statement:null,
            err: null
        }
    },
    
    template: `<div class="text-xs">
    <!-- The button to open modal -->
    <label for="inventory" class="btn modal-button btn-sm">Add/Remove Product</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="inventory" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">{{message}}</h3>
       
        <div class="modal-action">
        <label for="inventory" class="btn">Exit!</label>
        </div>
    </div>
    </div>
  
       
    
    </div>`
})


var papp = new Vue({
    el: '#papp',
    delimiters: ['<%', '%>'],
    components: {
        projectransaction,
        projectaccount,
        projectworker,
        addworker,
        projectask,
        projectinventory
    },
    data() { return {
        message: 'Hello Vue!'

    }},
    methods: {
        setDate(arg) {
            return new Date(arg).toDateString()
        }

    }
})
