Vue.use(VueFormulate)

var newproject = Vue.component('newproject',{
    template: `<div>
        <label for="my-modal-5" class="btn modal-button btn-primary">New Project</label>

        <input type="checkbox" id="my-modal-5" class="modal-toggle" />
        <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <h3 class="font-bold text-lg">Create New Project</h3>
            <p class="text-red-500 text-xs font-semibold my-2 mx-5" v-if="err">{{err}}</p>
           <div class="flex flex-row w-full mx-5">
           <div class="flex flex-col w-1/3">
                <p class="text-lg text-center bg-gray-300 rounded py-2">Project Details</p>
                <div class="form-control w-full max-w-xs">
                <label class="label"><span class="label-text">Project Name</span></label>
                <input type="text" placeholder="Project name" class="input input-bordered w-full max-w-xs" v-model="project.name"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">Category</span></label>
                <input type="text" placeholder="Category" class="input input-bordered w-full max-w-xs" v-model="project.category"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <p class="text-lg text-center bg-gray-300 rounded py-2">Address Details</p>
                
                <label class="label"><span class="label-text">Lot number</span></label>
                <input type="text" placeholder="Lot" class="input input-bordered w-full max-w-xs" v-model="project.address.lot"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">Street </span></label>
                <input type="text" placeholder="Street" class="input input-bordered w-full max-w-xs" v-model="project.address.street"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">Town or District?</span></label>
                <input type="text" placeholder="Town" class="input input-bordered w-full max-w-xs" v-model="project.address.town"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">Parish </span></label>
                <input type="text" placeholder="Parish" class="input input-bordered w-full max-w-xs" v-model="project.address.parish"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

               
                </div>

            </div>

            <div class="flex flex-col w-1/3 mx-5">
                <div class="form-control w-full max-w-xs">

                <p class="text-lg text-center bg-gray-300 rounded py-2">Client/Owner's Information</p>
                <label class="label"><span class="label-text">Owner's name</span></label>
                <input type="text" placeholder="Owner's name" class="input input-bordered w-full max-w-xs" v-model="project.owner.name"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <p class="text-lg text-center bg-gray-300 rounded py-2">Contact Details</p>
                <label class="label"><span class="label-text">Telephone number</span></label>
                <input type="text" placeholder="Tel." class="input input-bordered w-full max-w-xs" v-model="project.owner.contact.tel"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text"> Mobile number</span></label>
                <input type="text" placeholder="Mobile" class="input input-bordered w-full max-w-xs" v-model="project.owner.contact.mobile"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">email address</span></label>
                <input type="text" placeholder="Email" class="input input-bordered w-full max-w-xs" v-model="project.owner.contact.email"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>
                


                </div>
            </div>

            <div class="flex flex-col w-1/3 mx-5">
            <p class="text-lg text-center bg-gray-300 rounded py-2">Project State</p>

            <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">Activate</span>
                <input type="checkbox" class="toggle toggle-primary" checked v-model="project.state.active"/>
            </label>
            </div>
           
        </div>
       
            </div>

            <button class="btn btn-primary" @click="submitHandler">Submit</button>
            
            <div class="modal-action">
            <label for="my-modal-5" class="btn">Exit </label>
            </div>
        </div>
        </div>
    </div>`,
    
    data()  { return {
        err: null,
        project: {
            name: "",
            category:"",
            address: {
                lot: "",
                street: "",
                town: "",
                parish: "",
                country: "Jamaica"
            },            
            owner: {
                name: "",
                contact: {
                  tel: "",
                  mobile: "",
                  email: ""
                },
                address: {
                  lot: "",
                  street: "",
                  town: "",
                  parish: "",
                  country: ""
                }
              },
              tasks: [],
              account: {
                ballance: 1,
                started: 0,
                updated: 0,
                transactions: {
                  deposit: [],
                  withdraw: []
                }
              },
              
              state: {
                active: true,
                completed: false,
                paused: false,
                terminated: false
              },
              event: {
                started: 0,
                completed: 0,
                paused: [],
                restart: [],
                terminated: 0
              },
              activity_log: []
              
        },
        result: {}
        
    }
    },
    methods: {
        submitHandler(){
            var url = '/newproject'
            axios.post(url, this.project)
            .then(response => {
                this.result = response.data
            })
            .catch(error => {
                this.err = error.message
            })
        }
    }
})


var npapp = new Vue({
    el: '#projectindex',
    components: {newproject},
    delimiters: ['<%', '%>'],
    
    data: {
        message: 'Hello New projects'
    },
    methods: {
        setDate(arg) {
            return new Date(arg).toDateString()
        }
    }
})