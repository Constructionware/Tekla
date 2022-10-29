<script>
    import axios from 'axios';
    import uploadProfile from './uploadProfile.vue';
    import UploadProfile from './uploadProfile.vue';

    import { FormKitIcon } from '@formkit/vue'
    import screenfull from 'screenfull';
 
    export default {
    name: "worker-view",
    props: {
        worker: {type:Object}
    },
    inject:['jobRoles'],
    data() {
        return {
            err: null,
            update: null,
            currentWorker: {
                occupation: null,
                contact: {},
                address: {},
                state: {},
                event: {},
                nok: {
                address: {},
                contact: {}
            }
            },
            display:{
                statusBar: "flex flex-row h-14 border border-gray-300 my-5 mx-5 rounded-md min-w-full relative",
                statusText: "w-62 text-gray-400 font-bold py-2",
                state: null,
                menuBar: {
                    menuText: "text-xs text-gray-700",
                    state: null
                },
                fullScreen: {
                    personal: false
                }
            },
                          
            switchCase:{
            occupation: false
            },
            show: {
                page: true
            },
            workerStatus: null,
        };
    },
    components: { UploadProfile, FormKitIcon },
    
    computed: {
        checkAvail(){
            return Object.keys(this.worker).length > 0
        },
        manageStatusBar(){
            this.display.statusBar = "flex flex-row h-14 border border-gray-300 my-5 mx-5 rounded-md min-w-full relative hover:bg-gray-50 bg-gray-100"
            this.display.statusText = "w-62 text-gray-600 font-bold py-2 px-2"
            this.display.state = 'JobStatus Unavailable!'
            this.display.menuBar.state = null

            if(Object.keys(this.worker).includes('state')){
                if(this.currentWorker.state.active){
                    this.display.statusBar =  "flex flex-row h-14 border border-green-400 my-5 mx-5 rounded-md min-w-full relative hover:bg-green-50 bg-green-100"
                    this.display.statusText = "w-62 text-teal-600 font-bold py-2 px-2"
                    this.display.state = 'JobStatus Active '
                }else if(this.currentWorker.state.terminated){
                    this.display.statusBar =  "flex flex-row h-14 border border-red-400 my-5 mx-5 rounded-md min-w-full relative hover:bg-red-50 bg-red-100"
                    this.display.statusText = "w-62 text-red-600 font-bold py-2 px-2"
                    this.display.state = 'JobStatus Terminated '

                    this.display.menuBar.menuText= "text-xs text-red-700 mx-5"
                    this.display.menuBar.state = `Services was terminated on ${new Date(this.currentWorker.event.terminated).toDateString()}`

                }else if(this.currentWorker.state.onleave){
                    this.display.statusBar =  "flex flex-row h-14 border border-blue-400 my-5 mx-5 rounded-md min-w-full relative hover:bg-blue-50 bg-blue-100"
                    this.display.statusText = "w-62 text-blue-600 font-bold py-2 px-2"
                    this.display.state = 'JobStatus OnLeave '

                    this.display.menuBar.menuText= "text-xs text-blue-700 mx-5"
                    this.display.menuBar.state = `Employee went on temporary Leave on ${new Date(this.currentWorker.event.leave).toDateString()}`

                }else if(this.currentWorker.state.quit){
                    this.display.statusBar =  "flex flex-row h-14 border border-slate-400 my-5 mx-5 rounded-md min-w-full relative hover:bg-slate-50 bg-slate-400"
                    this.display.statusText = "w-62 text-gray-50 font-bold py-2 px-2"
                    this.display.state = 'JobStatus Quitted '

                    this.display.menuBar.menuText= "text-xs text-purple-700 mx-5"
                    this.display.menuBar.state = `Employee Quitted on ${new Date(this.currentWorker.event.quited).toDateString()}`
                }
            }
            else {
                this.display.statusBar = "flex flex-row h-14 border border-gray-300 my-5 mx-5 rounded-md min-w-full relative hover:bg-gray-100"
                this.display.state = 'JobStatus Unavailable!'
            }
            return this.display.statusBar
        },
    },
    watch: {
        workerStatus(){ this.resetStatus() },
        worker(){ this.triggerLoadWorker()}
    },
    methods: {
        async fullScreenPersonal(){
            this.display.fullScreen.personal = !this.display.fullScreen.personal

            const element = document.getElementById('personal');
            
                if (screenfull.isEnabled) {
                    screenfull.request(element);
                }
          
        },
        async triggerLoadWorker(){
            await this.loadWorker()
        },
        async loadWorker(){
            const self = this;
            setTimeout(() => {
                self.currentWorker = self.worker
            }, 100);
            
        },    
        uploadProfileImage() {
            const self = this
            var url = `${self.url}uploadprofile`, payload = {
                _id: self.worker._id,
            };
            axios.put(url, payload)
                .then(res => { self.update = res.data; })
                .catch(error => {
                self.err = error.message;
            });
        },
        async saveWorkerData(){
            const self = this;
            axios.put(`http://${location.hostname}/worker/${self.currentWorker._id}`, self.currentWorker)
            .then(res => {                
                if( res.status == 200){
                    alert('Data Saved...')
                self.currentWorker = res.data
                }
            })
            .catch(error => { 
                self.err = error.message
            })
        },
        resetStatus(){
            const self = this;
            switch (self.workerStatus) {
                case 'active':
                    alert(' Employment status set to active!')
                   
                    self.currentWorker.state.terminated = false 
                    self.currentWorker.state.quit = false
                    self.currentWorker.state.onleave = false 
                    self.currentWorker.state.active = true               
                    break;
                case 'onleave':
                    alert(' Employment status set to onleave!')
                    self.currentWorker.state.active = false  
                    self.currentWorker.state.terminated = false 
                    self.currentWorker.state.quit = false
                    self.currentWorker.state.onleave = true
                    break;
                case 'quitted':
                    alert(' Employment status set to quitted!')
                    self.currentWorker.state.active = false  
                    self.currentWorker.state.terminated = false                     
                    self.currentWorker.state.onleave = false
                    self.currentWorker.state.quit = true
                    break;
                case 'terminated':
                    alert(' Employment status set to terminated!')
                    self.currentWorker.state.quit = false
                    self.currentWorker.state.onleave = false 
                    self.currentWorker.state.active = false
                    self.currentWorker.state.terminated = true
                    break;
            
                default:
                    break;
            }
        }
    },
   
}
</script>
<template>
    <div  id="personal">
    <div id="status-bar" :class="manageStatusBar" v-if="checkAvail">
        <span :class="display.statusText">{{display.state}}</span>
        <!--span class="w-62 text-yellow-600 bg-gray-900 font-bold">{{workerStatus}}</span-->
       

            <span class="absolute right-2">
                <button class="btn btn-primary" @click="saveWorkerData">Save</button>
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-md m-1">Manage State</label>
                    <div tabindex="0" class="dropdown-content card card-compact w-64 p-2 shadow bg-slate-300 ">
                        <div class="card-body">
                            <h4 class="card-title">Manage Employment Status!</h4>
                            <FormKit
                                v-model="workerStatus"
                                type="radio"
                                label="Employee Status"
                                :options="{
                                    active: 'Active',
                                    onleave: 'OnLeave',
                                    quitted: 'Quit',
                                    terminated: 'Terminate'
                                }"
                                help="Manage the worker employment status."
                            />
                                <pre wrap>{{workerStatus }}</pre>
                        </div>
                    </div>
                </div>
                <button class="btn gap-2 ">
                    Inbox
                    <div class="badge badge-secondary">+99</div>
                </button>


            </span>

          
    </div>

    <div class="card lg:card-side bg-base-100 shadow-xl" v-if="checkAvail">
        
        <figure class="flex flex-col"  v-if="currentWorker.imgurl">
                        <img :src="currentWorker.imgurl" alt="worker profile" />
                        <h1 class="text-sm text-center text-gray-600 font-semibold">{{currentWorker.oc}}</h1>
         </figure>
         <section class="mx-5 my-5" v-else>
            <UploadProfile :id="currentWorker._id"></UploadProfile>
        </section>


        <div class="card-body">
            <h2 class="card-title">{{currentWorker.name}}</h2>
            <div class="flex flex-row w-full">
                <section class="w-1/2">
                    <p >
                    Also Known as <strong>{{currentWorker.oc}}</strong>
                </p>
                <p class="flex flex-row space-x-2">
                    <span>Date of Birth</span>
                    <span>{{currentWorker.dob}}</span>
                    
    
                </p>
                <p class="flex flex-row space-x-2">                   
                    <span>Sex.</span>
                    <span>{{currentWorker.sex}}</span>
    
                </p>
                <p class="flex flex-row space-x-2">
                    <span>Id Type</span>
                    <span>{{currentWorker.id_type}}</span>
                    <span>No.</span>
                    <span>{{currentWorker.identity}}</span>
    
                </p>
                <p class="flex flex-row space-x-2">                   
                    <span>Occupation</span>
                    <span>{{currentWorker.occupation}}</span>
                   
                        <span class="cursor-pointer" v-if="checkAvail" @click="switchCase.occupation = true">{{currentWorker.occupation}}</span>
                        <span v-if="switchCase.occupation">
                            <FormKit
                                        id="occupation"
                                        v-model="currentWorker.occupation"
                                        type="select"
                                        label="Occupation"
                                        placeholder="Select Occupation"
                                        :options="jobRoles"
                                        
                                        />
                            <button class="btn btn-secondary" @click="saveWorkerData">Update</button>
                        
                        </span>
                </p>
                </section>
                <div class="divider lg:divider-horizontal"> 
                    <figure class="w-8"><FormKitIcon icon="link" /></figure>
                </div> 
                <section class="w-1/2">
                    <div tabindex="0" class="collapse"> 
                        <input type="checkbox" /> 
                        <div class="collapse-title text-xl font-medium">
                            Contact
                        </div>
                        <div class="collapse-content"> 
                           
                            <ul >
                                <li>
                                 <span class="font-semibold mx-5">Email</span> 
                                 <span v-if="currentWorker.contact.email">{{currentWorker.contact.email}}</span>
                                 <span class="text-yellow-4" v-else>
                                    <input 
                                    class="input input-sm input-primary"
                                     type="email"
                                     placeholder="@mail.com"                                    
                                     v-model.lazy="currentWorker.contact.email"
                                     />
                                </span>
                                </li>
                                <li>
                                 <span class="font-semibold mx-5">Tel.</span> 
                                 <span v-if="currentWorker.contact.tel">{{currentWorker.contact.tel}}</span>
                                 <span class="text-yellow-4" v-else>
                                    <input 
                                    class="input input-sm input-primary"
                                     type="tel"
                                     placeholder="xxx-xxx-xxxx"
                                     validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                                     v-model.lazy="currentWorker.contact.tel"
                                     />
                                </span>
                                </li>
                                <li>
                                 <span class="font-semibold mx-5">Mobile</span> 
                                 <span v-if="currentWorker.contact.mobile">{{currentWorker.contact.mobile}}</span>
                                 <span class="text-yellow-4" v-else>
                                    <input 
                                    class="input input-sm input-primary"
                                     type="tel"
                                     placeholder="xxx-xxx-xxxx"
                                     validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                                     v-model.lazy="currentWorker.contact.mobile"
                                     />
                                </span>
                                </li>
                            </ul>
                            <p class="text-xs bg-gray-200 rounded-md p-2">{{currentWorker.contact}}</p>
                           
                        </div>
                    </div>
                    <div tabindex="0" class="collapse"> 
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            Address
                        </div>
                        <div class="collapse-content"> 
                            
                           
                            <ul >
                                <li>
                                 <span class="font-semibold mx-5">Lot</span> 
                                 <span v-if="currentWorker.address.lot"> {{currentWorker.address.lot}} </span>
                                 <span class="text-yellow-4" v-else>
                                    <input type="text" placeholder="Lot" class="input input-sm input-bordered input-primary w-full max-w-xs" v-model.lazy="currentWorker.address.lot"/>
                                   
                                </span>
                                </li>
                                <li>
                                 <span class="font-semibold mx-5">Street</span> 
                                 <span v-if="currentWorker.address.street"> {{currentWorker.address.street}} </span>
                                 <span class="text-yellow-4" v-else>
                                    <input type="text" placeholder="Street you live on" class="input input-sm input-bordered input-primary w-full max-w-xs" v-model.lazy="currentWorker.address.street"/>
                                   
                                </span>
                                </li>
                                <li>
                                 <span class="font-semibold mx-5">Town</span> 
                                 <span v-if="currentWorker.address.town"> {{currentWorker.address.town}} </span>
                                 <span class="text-yellow-4" v-else>
                                    <input type="text" placeholder="Your Town" class="input input-sm input-bordered input-primary w-full max-w-xs" v-model.lazy="currentWorker.address.town"/>
                                   
                                </span>
                                </li>
                                <li>
                                 <span class="font-semibold mx-5">City or Parish</span> 
                                 <span v-if="currentWorker.address.city_parish"> {{currentWorker.address.city_parish}} </span>
                                 <span class="text-yellow-4" v-else>
                                    <input type="text" placeholder="Street you live on" class="input input-sm input-bordered input-primary w-full max-w-xs" v-model.lazy="currentWorker.address.city_parish"/>
                                   
                                </span>
                                </li>
                                <li>
                                 <span class="font-semibold mx-5">Country</span> 
                                 <span v-if="currentWorker.address.country"> {{currentWorker.address.country}} </span>
                                 <span class="text-yellow-4" v-else>
                                    <input type="text" placeholder="Country" class="input input-sm input-bordered input-primary w-full max-w-xs" v-model.lazy="currentWorker.address.country"/>
                                   
                                </span>
                                </li>
                            </ul>
                            <p class="text-xs bg-gray-200">{{currentWorker.address}}</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse"> 
                    <div class="collapse-title text-xl font-medium">
                        Next Of Kin
                    </div>
                    <div class="collapse-content"> 
                        <ul >

                        <li v-for="val, key of currentWorker.nok" :key="key">
                            <span v-if="key == 'contact'">
                                <span class="font-semibold">{{key}}:   </span>
                                <ul>
                                    <li v-for="v, k of val" :key="k">
                                        <span class="font-semibold text-gray-500">{{k}}:</span>
                                        
                                        <span v-if="v">{{v}}</span>
                                       <span class="text-yellow-4" v-else>Unavailable</span>
                                    </li>
                                </ul> 
                            </span>
                            <span v-else-if="key == 'address'">
                                <span class="font-semibold">{{key}}:   </span>
                                <ul>
                                    <li v-for="v, k of val" :key="k">
                                        <span class="font-semibold text-gray-500">{{k}}:</span>
                                        <span v-if="v">{{v}}</span>
                                       <span class="text-yellow-4" v-else>Unavailable</span>
                                    </li>
                                </ul> 
                            </span>
                            <span v-else>
                               <span class="font-semibold mx-5">{{key}}: </span> 
                               <span v-if="val">{{val}}</span>
                                 <span class="text-yellow-4" v-else>Unavailable</span>
                            </span>                           
                           
                        </li>
                    </ul>
                    </div>
                </div>

                </section>
            </div>
            <div class="divider"></div>
            <div class="card-actions justify-end text-xs text-gray-700">
                <span class="badge badge-secondary badge-sm cursor-pointer" @click="fullScreenPersonal">fullscreen</span>
                <span v-if="display.fullScreen.personal">Press Esc to Exit Fullscreen.</span>
                <span>Employed since </span><span>{{new Date(currentWorker.event.employed).toDateString()}}</span>
                <span :class="display.menuBar.menuText" v-if="display.menuBar.state">
                    {{display.menuBar.state}}

                </span>
               
        
           
            </div>
        </div>
    </div>

    <div class="flex flex-col mx-5 my-5" v-if="checkAvail">
            <section id="account">
                <div tabindex="0" class="collapse"> 
                    <div class="collapse-title text-xl font-medium">
                        Account
                    </div>
                    <div class="collapse-content"> 
                        <p>{{currentWorker.account}}</p>
                    </div>
                </div>

                <div tabindex="0" class="collapse"> 
                    <div class="collapse-title text-xl font-medium">
                        Job Tasks
                    </div>
                    <div class="collapse-content"> 
                        <p>{{currentWorker.tasks}}</p>
                    </div>
                </div>

                <div tabindex="0" class="collapse"> 
                    <div class="collapse-title text-xl font-medium">
                        Days Work
                    </div>
                    <div class="collapse-content"> 
                        <p>{{currentWorker.days}}</p>
                    </div>
                </div>
            </section>
            <section>
                <div tabindex="0" class="collapse"> 
                    <div class="collapse-title text-xl font-medium">
                        Reports
                    </div>
                    <div class="collapse-content"> 
                        <p>{{currentWorker.reports}}</p>
                    </div>
                </div>
               
            </section>
        </div>
      
    </div> 
</template>